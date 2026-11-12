/** Messages exchanged between the page and the Python worker. */

export type Stream = 'stdout' | 'stderr';

/** Run a whole program, like a script. */
export interface RunRequest {
	type: 'run';
	id: number;
	code: string;
	maxLoopIterations?: number;
}

/** Feed one line to the interactive console. */
export interface PushRequest {
	type: 'push';
	id: number;
	line: string;
}

/** Discard a half-entered block in the interactive console. */
export interface ResetRequest {
	type: 'reset';
	id: number;
}

export type Request = RunRequest | PushRequest | ResetRequest;

/** A request without its id, as handed to the worker by `client.ts`. */
export type RequestBody =
	Omit<RunRequest, 'id'> | Omit<PushRequest, 'id'> | Omit<ResetRequest, 'id'>;

/** Python has loaded; `banner` names the Python and Pyodide versions. */
export interface ReadyMessage {
	type: 'ready';
	banner: string;
}

/** A chunk of text written by the running code. */
export interface OutputMessage {
	type: 'output';
	id: number;
	text: string;
	stream: Stream;
}

/** The request finished. `more` is only used by `push`. */
export interface DoneMessage {
	type: 'done';
	id: number;
	more?: boolean;
}

/** Python could not be loaded (for example when offline). */
export interface ErrorMessage {
	type: 'error';
	message: string;
}

export type ResponseMessage = ReadyMessage | OutputMessage | DoneMessage | ErrorMessage;
