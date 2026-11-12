import type { Request, RequestBody, ResponseMessage } from '#lib/python/protocol.ts';

export type Stream = 'stdout' | 'stderr';
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

const RESTARTED = 'Python was restarted';

interface PendingRequest {
	onOutput: OutputHandler;
	settle: (more: boolean) => void;
	fail: (error: Error) => void;
}

class Session implements PythonSession {
	#worker: Worker | null = null;
	#ready: Promise<string> | null = null;
	#resolveReady: ((banner: string) => void) | null = null;
	#rejectReady: ((error: Error) => void) | null = null;
	#pending = new Map<number, PendingRequest>();
	#nextId = 1;
	/** Bumped by `restart()`, so a request between `ready` and `postMessage` can notice. */
	#generation = 0;

	get ready(): Promise<string> {
		return this.#whenReady();
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
		this.#generation += 1;
		const worker = this.#worker;
		const rejectReady = this.#rejectReady;
		this.#worker = null;
		this.#ready = null;
		this.#resolveReady = null;
		this.#rejectReady = null;
		worker?.terminate();

		const pending = [...this.#pending.values()];
		this.#pending.clear();
		rejectReady?.(new Error(RESTARTED));
		for (const request of pending) request.fail(new Error(RESTARTED));
	}

	async #request(body: RequestBody, onOutput: OutputHandler): Promise<boolean> {
		const generation = this.#generation;
		await this.#whenReady();
		if (generation !== this.#generation) throw new Error(RESTARTED);

		const worker = this.#worker;
		if (!worker) throw new Error(RESTARTED);

		const id = this.#nextId++;
		const request: Request = { ...body, id };
		return await new Promise<boolean>((settle, fail) => {
			this.#pending.set(id, { onOutput, settle, fail });
			worker.postMessage(request);
		});
	}

	#whenReady(): Promise<string> {
		if (this.#ready) return this.#ready;

		const worker = this.#spawn();
		worker.addEventListener('message', (event: MessageEvent<ResponseMessage>) => {
			this.#receive(worker, event.data);
		});
		worker.addEventListener('error', (event: ErrorEvent) => {
			this.#fail(worker, new Error(event.message || 'The Python worker failed to start'));
		});

		const ready = new Promise<string>((resolve, reject) => {
			this.#resolveReady = resolve;
			this.#rejectReady = reject;
		});
		// A restart or a failed load may reject this while nobody listens.
		ready.catch(() => {});
		this.#ready = ready;
		return ready;
	}

	#spawn(): Worker {
		if (this.#worker) return this.#worker;
		const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });
		this.#worker = worker;
		return worker;
	}

	#receive(worker: Worker, message: ResponseMessage): void {
		if (worker !== this.#worker) return;

		switch (message.type) {
			case 'ready': {
				const resolve = this.#resolveReady;
				this.#resolveReady = null;
				this.#rejectReady = null;
				resolve?.(message.banner);
				break;
			}
			case 'output': {
				this.#pending.get(message.id)?.onOutput(message.text, message.stream);
				break;
			}
			case 'done': {
				const request = this.#pending.get(message.id);
				if (!request) break;
				this.#pending.delete(message.id);
				request.settle(message.more === true);
				break;
			}
			case 'error': {
				this.#fail(worker, new Error(message.message));
				break;
			}
		}
	}

	/** The worker is unusable: forget it and reject everything that was waiting. */
	#fail(worker: Worker, error: Error): void {
		if (worker !== this.#worker) return;

		this.#generation += 1;
		this.#worker = null;
		this.#ready = null;
		const rejectReady = this.#rejectReady;
		this.#resolveReady = null;
		this.#rejectReady = null;
		worker.terminate();

		const pending = [...this.#pending.values()];
		this.#pending.clear();
		rejectReady?.(error);
		for (const request of pending) request.fail(error);
	}
}

/** Creates an independent session with its own worker. The worker is only created on first use of ready/run/push. */
export function createSession(): PythonSession {
	return new Session();
}

/** The single session shared by all code cells. */
export const cells: PythonSession = createSession();
