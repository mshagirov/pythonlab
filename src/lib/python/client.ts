import type { Request, RequestBody, ResponseMessage, Stream } from '#lib/python/protocol.ts';

export type { Stream };
export type OutputHandler = (text: string, stream: Stream) => void;

export interface RunOptions {
	maxLoopIterations?: number;
}

export interface PythonSession {
	/** Resolves with the banner once Python has loaded. Rejects if loading fails (e.g. offline). */
	readonly ready: Promise<string>;
	/** Run a whole program. Resolves when it has finished; Python errors are reported through onOutput as stderr, they do not reject. */
	run(code: string, onOutput: OutputHandler, options?: RunOptions): Promise<void>;
	/** REPL: feed one line. Resolves true when more input is needed (continuation). */
	push(line: string, onOutput: OutputHandler): Promise<boolean>;
	/** REPL: discard a half-entered block, as Ctrl-C at the continuation prompt does. */
	reset(): Promise<void>;
	/** Terminate the worker (stops running code, loses all variables). Pending run/push promises reject with an Error whose message is 'Python was restarted'. A new worker starts lazily on the next use. */
	restart(): void;
}

/** Message of the error that pending work is rejected with when a session restarts. */
export const RESTARTED = 'Python was restarted';

interface PendingRequest {
	onOutput: OutputHandler;
	settle: (more: boolean) => void;
	fail: (error: Error) => void;
}

/** Everything that belongs to one worker; replaced as a whole when Python restarts. */
interface Connection {
	worker: Worker;
	/** Resolves with the banner once Python has loaded. */
	ready: Promise<string>;
	rejectReady: (error: Error) => void;
	pending: Map<number, PendingRequest>;
}

class Session implements PythonSession {
	#connection: Connection | null = null;
	#nextId = 1;

	get ready(): Promise<string> {
		return this.#connect().ready;
	}

	async run(code: string, onOutput: OutputHandler, options: RunOptions = {}): Promise<void> {
		await this.#request(
			{ type: 'run', code, maxLoopIterations: options.maxLoopIterations },
			onOutput,
		);
	}

	async push(line: string, onOutput: OutputHandler): Promise<boolean> {
		return await this.#request({ type: 'push', line }, onOutput);
	}

	async reset(): Promise<void> {
		await this.#request({ type: 'reset' }, () => {});
	}

	restart(): void {
		this.#close(new Error(RESTARTED));
	}

	async #request(body: RequestBody, onOutput: OutputHandler): Promise<boolean> {
		const connection = this.#connect();
		await connection.ready;
		if (connection !== this.#connection) throw new Error(RESTARTED);

		const id = this.#nextId++;
		const request: Request = { ...body, id };
		return await new Promise<boolean>((settle, fail) => {
			connection.pending.set(id, { onOutput, settle, fail });
			connection.worker.postMessage(request);
		});
	}

	/** The connection in use, or a fresh worker with its listeners. */
	#connect(): Connection {
		if (this.#connection) return this.#connection;

		const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });
		let resolve!: (banner: string) => void;
		let reject!: (error: Error) => void;
		const ready = new Promise<string>((res, rej) => {
			resolve = res;
			reject = rej;
		});
		// A restart or a failed load may reject this while nobody listens.
		ready.catch(() => {});

		const connection: Connection = { worker, ready, rejectReady: reject, pending: new Map() };
		this.#connection = connection;

		worker.addEventListener('message', (event: MessageEvent<ResponseMessage>) => {
			if (this.#connection !== connection) return; // A stale worker.
			const message = event.data;
			switch (message.type) {
				case 'ready': {
					resolve(message.banner);
					break;
				}
				case 'output': {
					connection.pending.get(message.id)?.onOutput(message.text, message.stream);
					break;
				}
				case 'done': {
					const request = connection.pending.get(message.id);
					if (!request) break;
					connection.pending.delete(message.id);
					request.settle(message.more === true);
					break;
				}
				case 'error': {
					this.#close(new Error(message.message));
					break;
				}
			}
		});
		worker.addEventListener('error', (event: ErrorEvent) => {
			if (this.#connection !== connection) return; // A stale worker.
			this.#close(new Error(event.message || 'The Python worker failed to start'));
		});

		return connection;
	}

	/** The worker is gone: forget it and reject everything that was waiting. */
	#close(error: Error): void {
		const connection = this.#connection;
		if (!connection) return;

		this.#connection = null;
		connection.worker.terminate();
		connection.rejectReady(error);
		for (const request of connection.pending.values()) request.fail(error);
	}
}

/** Creates an independent session with its own worker. The worker is only created on first use of ready/run/push. */
export function createSession(): PythonSession {
	return new Session();
}

/** The single session shared by all code cells. */
export const cells: PythonSession = createSession();
