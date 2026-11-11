import type { Request, ResponseMessage, Stream } from '#lib/python/protocol.ts';

/**
 * Pyodide is not an npm dependency: it is downloaded from the CDN on first use.
 * The version lives here so both URLs stay in step.
 */
const PYODIDE_VERSION = '314.0.7';
const PYODIDE_INDEX_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;
const PYODIDE_URL = `${PYODIDE_INDEX_URL}pyodide.mjs`;

/* Minimal description of the parts of the Pyodide API this file uses. */

interface PyProxy {
	destroy(): void;
}

interface WriteHandler {
	write(buffer: Uint8Array): number;
}

interface RunOptions {
	globals?: PyProxy;
}

interface PyodideAPI {
	readonly version: string;
	readonly globals: PyProxy;
	setStdout(handler: WriteHandler): void;
	setStderr(handler: WriteHandler): void;
	runPython(code: string, options?: RunOptions): unknown;
	runPythonAsync(code: string): Promise<unknown>;
}

interface PyodideModule {
	loadPyodide(options: { indexURL: string }): Promise<PyodideAPI>;
}

interface ConsoleFuture extends PyProxy {
	readonly syntax_check: 'incomplete' | 'syntax-error' | 'complete';
	readonly formatted_error: string | null;
}

interface Console extends PyProxy {
	push(line: string): ConsoleFuture;
}

/** Resolves with the Python `repr` of the result, or `undefined` for `None`. */
type AwaitFuture = (future: ConsoleFuture) => Promise<unknown>;

/** Drops the console's half-entered block. */
type ResetConsole = (console: Console) => void;

interface Runtime {
	pyodide: PyodideAPI;
	console: Console;
	awaitFut: AwaitFuture;
	resetConsole: ResetConsole;
}

/* Talking to the page. */

interface WorkerScope {
	onmessage: ((event: MessageEvent<Request>) => void) | null;
	postMessage(message: ResponseMessage): void;
}

const scope = globalThis as unknown as WorkerScope;

function post(message: ResponseMessage): void {
	scope.postMessage(message);
}

/* Standard output. */

let activeId: number | null = null;

const decoders: Record<Stream, TextDecoder> = {
	stdout: new TextDecoder(),
	stderr: new TextDecoder(),
};

function resetDecoders(): void {
	decoders.stdout = new TextDecoder();
	decoders.stderr = new TextDecoder();
}

function emit(id: number, text: string, stream: Stream): void {
	if (text) post({ type: 'output', id, text, stream });
}

/** Called by Pyodide with the bytes written to stdout/stderr. */
function write(stream: Stream, buffer: Uint8Array): number {
	// A streaming decoder keeps partial lines and split characters intact.
	const text = decoders[stream].decode(buffer, { stream: true });
	if (activeId !== null) emit(activeId, text, stream);
	return buffer.length;
}

/** Decode whatever is left in the decoders (e.g. a truncated character). */
function endStreams(): void {
	for (const stream of ['stdout', 'stderr'] as const) {
		const text = decoders[stream].decode();
		if (activeId !== null) emit(activeId, text, stream);
	}
}

/** Python buffers a partial line (`print("a", end="")`) until it is flushed. */
function flushStreams(pyodide: PyodideAPI): void {
	try {
		pyodide.runPython("__import__('sys').stdout.flush(); __import__('sys').stderr.flush()");
	} catch {
		// A broken stream must not swallow the `done` message.
	}
}

/* Errors. */

function errorText(error: unknown): string {
	return error instanceof Error ? error.message : String(error);
}

/**
 * Pyodide evaluates async code through `_pyodide/_base.py`, which puts its own
 * frames in front of the user's frames. Drop them when they are there.
 */
function tracebackText(error: unknown): string {
	const text = errorText(error);
	const lines = text.split('\n');
	const start = lines.findIndex((line) => line.startsWith('  File "<exec>"'));
	const header = start > 0 ? lines.lastIndexOf('Traceback (most recent call last):', start) : -1;
	const trimmed = header >= 0 ? [lines[header], ...lines.slice(start)].join('\n') : text;
	return `${trimmed.replace(/\n+$/, '')}\n`;
}

/* Loading. */

let runtimePromise: Promise<Runtime> | null = null;

async function loadRuntime(): Promise<Runtime> {
	try {
		const { loadPyodide } = (await import(/* @vite-ignore */ PYODIDE_URL)) as PyodideModule;
		const pyodide = await loadPyodide({ indexURL: PYODIDE_INDEX_URL });

		pyodide.setStdout({ write: (buffer) => write('stdout', buffer) });
		pyodide.setStderr({ write: (buffer) => write('stderr', buffer) });

		// `input()` needs SharedArrayBuffer to block, which a worker does not have.
		pyodide.runPython(`
import builtins


def _input_not_supported(*args, **kwargs):
    raise RuntimeError("input() is not supported in the browser")


builtins.input = _input_not_supported
del _input_not_supported
`);

		// One console for the whole worker. Its globals are Pyodide's globals, so
		// names cross between `run` and `push` as they would in a notebook.
		const console = pyodide.runPython(`
from pyodide.console import PyodideConsole
PyodideConsole(globals())
`) as Console;

		// Awaiting a future inside Python avoids the JavaScript `await` unwrapping
		// async results, and lets `repr` run on the Python object itself.
		const namespace = pyodide.runPython('dict()') as PyProxy;
		const awaitFut = pyodide.runPython(
			`
import builtins
from pyodide.ffi import to_js


async def await_fut(future):
    result = await future
    if result is not None:
        builtins._ = result
        return to_js([repr(result)])
    return to_js([None])


await_fut
`,
			{ globals: namespace },
		) as unknown as AwaitFuture;
		namespace.destroy();

		// A half-entered block only lives in the console's `buffer` list.
		const resetNamespace = pyodide.runPython('dict()') as PyProxy;
		const resetConsole = pyodide.runPython(
			`
def reset_console(console):
    console.buffer.clear()


reset_console
`,
			{ globals: resetNamespace },
		) as unknown as ResetConsole;
		resetNamespace.destroy();

		const pythonVersion = String(pyodide.runPython("__import__('sys').version.split()[0]"));
		post({ type: 'ready', banner: `Python ${pythonVersion} (Pyodide ${pyodide.version})` });

		return { pyodide, console, awaitFut, resetConsole };
	} catch (error) {
		post({ type: 'error', message: errorText(error) });
		throw error;
	}
}

function getRuntime(): Promise<Runtime> {
	if (!runtimePromise) {
		runtimePromise = loadRuntime().catch((error: unknown) => {
			// Let a later request try again instead of caching the failure.
			runtimePromise = null;
			throw error;
		});
	}
	return runtimePromise;
}

/* Requests. */

async function runProgram(runtime: Runtime, id: number, code: string): Promise<void> {
	activeId = id;
	resetDecoders();

	let failure: string | null = null;
	try {
		await runtime.pyodide.runPythonAsync(code);
	} catch (error) {
		failure = tracebackText(error);
	}

	flushStreams(runtime.pyodide);
	endStreams();
	if (failure !== null) emit(id, failure, 'stderr');
	activeId = null;
	post({ type: 'done', id });
}

async function pushLine(runtime: Runtime, id: number, line: string): Promise<void> {
	activeId = id;
	resetDecoders();

	const future = runtime.console.push(line);

	if (future.syntax_check === 'incomplete') {
		activeId = null;
		post({ type: 'done', id, more: true });
		return;
	}

	if (future.syntax_check === 'syntax-error') {
		const message = future.formatted_error ?? 'Syntax error\n';
		emit(id, `${message.replace(/\n+$/, '')}\n`, 'stderr');
		activeId = null;
		post({ type: 'done', id, more: false });
		return;
	}

	let printed: string | null = null;
	let failure: string | null = null;
	try {
		const [text] = (await runtime.awaitFut(future)) as [string | undefined];
		printed = text ?? null;
	} catch (error) {
		failure = future.formatted_error ?? tracebackText(error);
	}

	flushStreams(runtime.pyodide);
	endStreams();
	if (failure !== null) emit(id, `${failure.replace(/\n+$/, '')}\n`, 'stderr');
	else if (printed !== null) emit(id, `${printed}\n`, 'stdout');
	activeId = null;
	post({ type: 'done', id, more: false });
}

/** Throw away a half-entered block, so the prompt goes back to `>>> `. */
function resetBlock(runtime: Runtime, id: number): void {
	runtime.resetConsole(runtime.console);
	post({ type: 'done', id, more: false });
}

async function handle(runtime: Runtime, request: Request): Promise<void> {
	try {
		if (request.type === 'run') await runProgram(runtime, request.id, request.code);
		else if (request.type === 'reset') resetBlock(runtime, request.id);
		else await pushLine(runtime, request.id, request.line);
	} catch (error) {
		// Never leave the page waiting: always answer with `done`.
		activeId = null;
		emit(request.id, tracebackText(error), 'stderr');
		post({ type: 'done', id: request.id, more: false });
	}
}

const queue: Request[] = [];
let busy = false;

/** Process requests strictly one at a time, in arrival order. */
async function pump(): Promise<void> {
	if (busy) return;
	busy = true;
	try {
		while (queue.length > 0) {
			const request = queue.shift();
			if (!request) break;

			let runtime: Runtime;
			try {
				runtime = await getRuntime();
			} catch {
				// Loading failed and the client has already been told with `error`;
				// drop the rest of the queue rather than running it later.
				queue.length = 0;
				break;
			}
			await handle(runtime, request);
		}
	} finally {
		busy = false;
	}
}

scope.onmessage = (event: MessageEvent<Request>): void => {
	queue.push(event.data);
	void pump();
};

// Start downloading as soon as the worker starts; the client only creates the
// worker on first use, so nothing is loaded until then.
getRuntime().catch(() => {
	// Reported to the page as an `error` message by `loadRuntime`.
});
