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

interface PyDict extends PyProxy {
	get(name: string): unknown;
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

type RunLimitedProgram = (
	code: string,
	globals: PyProxy,
	maxLoopIterations: number,
) => Promise<unknown>;

interface Runtime {
	pyodide: PyodideAPI;
	console: Console;
	awaitFut: AwaitFuture;
	resetConsole: ResetConsole;
	runLimitedProgram: RunLimitedProgram;
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

/** Flush what Python still buffers, then report the request's final text. */
function finish(runtime: Runtime, id: number, text: string, stream: Stream): void {
	flushStreams(runtime.pyodide);
	endStreams();
	emit(id, text, stream);
}

/** Text ending in exactly one newline. */
function endWithNewline(text: string): string {
	return `${text.replace(/\n+$/, '')}\n`;
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
	return endWithNewline(trimmed);
}

/* Loading. */

/**
 * Every helper lives in one private namespace, so its names never show up in the
 * user's globals. The console's globals are Pyodide's globals (`__main__`), which
 * keeps names crossing between `run` and `push` as they would in a notebook.
 */
const SETUP = String.raw`
import ast
import builtins
import inspect
import sys
from pyodide.console import PyodideConsole
from pyodide.ffi import to_js


# input() needs SharedArrayBuffer to block, which a worker does not have.
def input_not_supported(*args, **kwargs):
    raise RuntimeError("input() is not supported in the browser")


builtins.input = input_not_supported

console = PyodideConsole(sys.modules["__main__"].__dict__)
version = sys.version.split()[0]


# Awaiting a future inside Python avoids the JavaScript await unwrapping async
# results, and lets repr run on the Python object itself.
async def await_fut(future):
    result = await future
    if result is not None:
        builtins._ = result
        return to_js([repr(result)])
    return to_js([None])


# A half-entered block only lives in the console's buffer list.
def reset_console(console):
    console.buffer.clear()


# Instrument only opted-in cells, leaving their source and shared globals intact.
async def run_limited_program(source, namespace, limit):
    if not isinstance(limit, int) or limit < 1:
        raise ValueError("The loop iteration limit must be a positive integer")

    tree = ast.parse(source, filename="<exec>")
    guard_name = "__pythonlab_loop_guard"
    while guard_name in namespace or guard_name in source:
        guard_name += "_"

    counts = {}

    def check_iteration(loop_id):
        count = counts.get(loop_id, 0)
        if count >= limit:
            raise RuntimeError(f"Loop iteration limit exceeded ({limit} iterations)")
        counts[loop_id] = count + 1

    # Check the body, not the condition: a terminating loop may test its
    # condition 101 times while executing its body only 100 times.
    for loop_id, node in enumerate(list(ast.walk(tree))):
        if isinstance(node, (ast.While, ast.For, ast.AsyncFor)):
            check = ast.Expr(value=ast.Call(
                func=ast.Name(id=guard_name, ctx=ast.Load()),
                args=[ast.Constant(value=loop_id)],
                keywords=[],
            ))
            node.body.insert(0, ast.copy_location(check, node.body[0]))

    ast.fix_missing_locations(tree)
    program = compile(tree, "<exec>", "exec", flags=ast.PyCF_ALLOW_TOP_LEVEL_AWAIT)
    namespace[guard_name] = check_iteration
    try:
        result = eval(program, namespace)
        if inspect.isawaitable(result):
            await result
    finally:
        namespace.pop(guard_name, None)
`;

async function loadRuntime(): Promise<Runtime> {
	const { loadPyodide } = (await import(/* @vite-ignore */ PYODIDE_URL)) as PyodideModule;
	const pyodide = await loadPyodide({ indexURL: PYODIDE_INDEX_URL });

	pyodide.setStdout({ write: (buffer) => write('stdout', buffer) });
	pyodide.setStderr({ write: (buffer) => write('stderr', buffer) });

	const helpers = pyodide.runPython('dict()') as PyDict;
	pyodide.runPython(SETUP, { globals: helpers });
	const console = helpers.get('console') as Console;
	const awaitFut = helpers.get('await_fut') as AwaitFuture;
	const resetConsole = helpers.get('reset_console') as ResetConsole;
	const runLimitedProgram = helpers.get('run_limited_program') as RunLimitedProgram;
	const version = String(helpers.get('version'));
	helpers.destroy();

	post({ type: 'ready', banner: `Python ${version} (Pyodide ${pyodide.version})` });

	return { pyodide, console, awaitFut, resetConsole, runLimitedProgram };
}

/* Requests. */

/** Runs a whole program: its output first, then the traceback if it failed. */
async function runProgram(
	runtime: Runtime,
	id: number,
	code: string,
	maxLoopIterations?: number,
): Promise<void> {
	let failure = '';
	try {
		if (maxLoopIterations === undefined) {
			await runtime.pyodide.runPythonAsync(code);
		} else {
			await runtime.runLimitedProgram(code, runtime.pyodide.globals, maxLoopIterations);
		}
	} catch (error) {
		failure = tracebackText(error);
	}
	finish(runtime, id, failure, 'stderr');
}

/** Feeds one line to the console; returns true when the block is still open. */
async function pushLine(runtime: Runtime, id: number, line: string): Promise<boolean> {
	const future = runtime.console.push(line);

	if (future.syntax_check === 'incomplete') return true;

	if (future.syntax_check === 'syntax-error') {
		emit(id, endWithNewline(future.formatted_error ?? 'Syntax error\n'), 'stderr');
		return false;
	}

	try {
		const [text] = (await runtime.awaitFut(future)) as [string | null | undefined];
		finish(runtime, id, text == null ? '' : `${text}\n`, 'stdout');
	} catch (error) {
		finish(runtime, id, endWithNewline(future.formatted_error ?? tracebackText(error)), 'stderr');
	}
	return false;
}

async function handle(runtime: Runtime, request: Request): Promise<void> {
	activeId = request.id;
	resetDecoders();

	let more = false;
	try {
		if (request.type === 'run') {
			await runProgram(runtime, request.id, request.code, request.maxLoopIterations);
		} else if (request.type === 'push') {
			more = await pushLine(runtime, request.id, request.line);
		} else {
			// Throw away a half-entered block, so the prompt goes back to `>>> `.
			runtime.resetConsole(runtime.console);
		}
	} catch (error) {
		// Never leave the page waiting: always answer with `done`.
		emit(request.id, tracebackText(error), 'stderr');
	}
	activeId = null;
	post({ type: 'done', id: request.id, more });
}

// Start downloading as soon as the worker starts; the client only creates the worker
// on first use, so nothing is loaded until then.
const loading = loadRuntime();
// The client terminates this worker when loading fails, so there is nothing to retry.
loading.catch((error: unknown) => post({ type: 'error', message: errorText(error) }));

/** Requests run strictly one at a time, in arrival order. */
let last: Promise<unknown> = loading;

scope.onmessage = (event: MessageEvent<Request>): void => {
	last = last.then(async () => handle(await loading, event.data)).catch(() => {});
};
