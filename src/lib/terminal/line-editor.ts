/**
 * A small readline-style line editor for a single terminal prompt.
 *
 * The editor is DOM-free: it writes the prompt and redraws through `write`,
 * reports completed lines through `onLine`, and reports Ctrl-C through
 * `onInterrupt`. It knows nothing about the thing consuming the lines, so
 * `input()` can receive a whole pasted block at once and queue the remaining
 * lines, and keys typed while no prompt is active are queued too, all until
 * the consumer calls `prompt()` again.
 */

export interface LineEditorOptions {
	/** Write raw text or escape sequences to the terminal. */
	write(text: string): void;
	/** The user pressed Enter; the line may be empty. */
	onLine(line: string): void;
	/** The user pressed Ctrl-C, whether or not a prompt was active. */
	onInterrupt(): void;
	/** Returns the line with zero-width colour escapes; must not change the visible characters. */
	highlight?(line: string): string;
}

const ESC = '\x1b';
const PASTE_START = `${ESC}[200~`;
const PASTE_END = `${ESC}[201~`;
const INDENT = '    ';

/** What a key does; control characters and escape sequences share these actions. */
type Action =
	| 'left'
	| 'right'
	| 'home'
	| 'end'
	| 'up'
	| 'down'
	| 'deleteBackward'
	| 'deleteForward'
	| 'killBefore'
	| 'killAfter'
	| 'clear'
	| 'indent';

/**
 * Every key the editor understands. No entry is the start of another one, so the order in which
 * escape sequences are tried does not matter.
 */
const KEYS: Readonly<Record<string, Action>> = {
	'\x7f': 'deleteBackward',
	'\b': 'deleteBackward',
	'\x01': 'home',
	'\x05': 'end',
	'\x15': 'killBefore',
	'\x0b': 'killAfter',
	'\x0c': 'clear',
	'\x04': 'deleteForward',
	'\t': 'indent',
	[`${ESC}[1~`]: 'home',
	[`${ESC}[3~`]: 'deleteForward',
	[`${ESC}[4~`]: 'end',
	[`${ESC}[A`]: 'up',
	[`${ESC}[B`]: 'down',
	[`${ESC}[C`]: 'right',
	[`${ESC}[D`]: 'left',
	[`${ESC}[F`]: 'end',
	[`${ESC}[H`]: 'home',
	[`${ESC}OA`]: 'up',
	[`${ESC}OB`]: 'down',
	[`${ESC}OC`]: 'right',
	[`${ESC}OD`]: 'left',
	[`${ESC}OF`]: 'end',
	[`${ESC}OH`]: 'home',
};

export class LineEditor {
	private readonly options: LineEditorOptions;
	private promptText = '';
	private active = false;
	/** Current input as code points, so astral characters stay intact. */
	private buffer: string[] = [];
	private cursor = 0;
	private readonly history: string[] = [];
	/** `history.length` means "editing the line in progress". */
	private historyIndex = 0;
	/** The line in progress, restored when walking back down through history. */
	private draft = '';
	/** Input waiting for the next `prompt()`: leftover from a paste, or typed while a line ran. */
	private queue: string[] = [];

	constructor(options: LineEditorOptions) {
		this.options = options;
	}

	/** Print the prompt and start accepting a new line. */
	prompt(text: string): void {
		this.promptText = text;
		this.reset();
		this.active = true;
		this.historyIndex = this.history.length;
		this.options.write(text);
		// Input typed while the previous line ran is replayed now.
		if (this.queue.length > 0) this.feed(this.queue.splice(0).join(''));
	}

	/** Feed raw input from the terminal's `onData`. */
	input(data: string): void {
		this.feed(data.replaceAll(PASTE_START, '').replaceAll(PASTE_END, ''));
	}

	private feed(text: string): void {
		const chars = Array.from(text);

		for (let i = 0; i < chars.length;) {
			const char = chars[i];

			if (char === '\x03') {
				i += 1;
				this.interrupt();
				continue;
			}

			if (!this.active) {
				const rest = chars.slice(i);
				const last = rest.lastIndexOf('\x03');
				if (last === -1) {
					// Nothing can be edited yet, so keep it for the next prompt.
					this.queue.push(rest.join(''));
					return;
				}
				// A Ctrl-C still interrupts at once; only what follows it survives.
				this.interrupt();
				i += last + 1;
				continue;
			}

			if (char === '\r' || char === '\n') {
				i += 1;
				if (char === '\r' && chars[i] === '\n') i += 1;
				this.submit();
				// The rest of a multi-line paste waits for the next prompt.
				if (i < chars.length) this.queue.push(chars.slice(i).join(''));
				return;
			}

			if (char === ESC) {
				i += this.consumeEscape(chars, i);
				continue;
			}

			i += 1;
			// Every control key is in `KEYS`, so whatever is left and printable is text.
			const action = KEYS[char];
			if (action) this.act(action);
			else if ((char.codePointAt(0) ?? 0) >= 0x20) this.insert(char);
		}
	}

	/** Handle the escape sequence at `chars[start]` and return how many code points it used. */
	private consumeEscape(chars: string[], start: number): number {
		const rest = chars.slice(start).join('');
		for (const [sequence, action] of Object.entries(KEYS)) {
			if (!rest.startsWith(sequence)) continue;
			this.act(action);
			return sequence.length;
		}

		// Unknown escapes must never be inserted as text: swallow the whole sequence.
		const second = chars[start + 1];
		if (second !== '[') return Math.min(2, chars.length - start);

		let length = 2;
		while (start + length < chars.length) {
			const code = chars[start + length].codePointAt(0) ?? 0;
			length += 1;
			if (code >= 0x40 && code <= 0x7e) break;
			if (code < 0x20 || code > 0x3f) break;
		}
		return length;
	}

	/**
	 * Run one key action. An edit redraws only when it actually applies; typing and switching to
	 * a history line always redraw, even when the visible text stays the same.
	 */
	private act(action: Action): void {
		switch (action) {
			case 'left':
				if (this.cursor > 0) this.update(this.buffer, this.cursor - 1);
				return;
			case 'right':
				if (this.cursor < this.buffer.length) this.update(this.buffer, this.cursor + 1);
				return;
			case 'home':
				if (this.cursor > 0) this.update(this.buffer, 0);
				return;
			case 'end':
				if (this.cursor < this.buffer.length) this.update(this.buffer, this.buffer.length);
				return;
			case 'deleteBackward':
				if (this.cursor === 0) return;
				this.update(this.buffer.toSpliced(this.cursor - 1, 1), this.cursor - 1);
				return;
			case 'deleteForward':
				// Ctrl-D and Delete alike: at the end of the line there is nothing to delete.
				if (this.cursor === this.buffer.length) return;
				this.update(this.buffer.toSpliced(this.cursor, 1), this.cursor);
				return;
			case 'killBefore':
				if (this.cursor === 0) return;
				this.update(this.buffer.slice(this.cursor), 0);
				return;
			case 'killAfter':
				if (this.cursor === this.buffer.length) return;
				this.update(this.buffer.slice(0, this.cursor), this.cursor);
				return;
			case 'clear':
				this.options.write(`${ESC}[2J${ESC}[H`);
				this.redraw();
				return;
			case 'indent':
				this.insert(INDENT);
				return;
			case 'up':
				if (this.historyIndex === 0) return;
				if (this.historyIndex === this.history.length) this.draft = this.buffer.join('');
				this.historyIndex -= 1;
				this.showText(this.history[this.historyIndex]);
				return;
			case 'down':
				if (this.historyIndex === this.history.length) return;
				this.historyIndex += 1;
				if (this.historyIndex === this.history.length) this.showText(this.draft);
				else this.showText(this.history[this.historyIndex]);
				return;
		}
	}

	private insert(text: string): void {
		const chars = Array.from(text);
		this.update(this.buffer.toSpliced(this.cursor, 0, ...chars), this.cursor + chars.length);
	}

	/** Show `text` as the current line, with the cursor at its end. */
	private showText(text: string): void {
		const chars = Array.from(text);
		this.update(chars, chars.length);
	}

	/** Replace the line and the cursor, then repaint. */
	private update(buffer: string[], cursor: number): void {
		this.buffer = buffer;
		this.cursor = cursor;
		this.redraw();
	}

	private submit(): void {
		const line = this.buffer.join('');
		this.reset();
		this.options.write('\r\n');

		if (line.length > 0 && this.history.at(-1) !== line) this.history.push(line);
		this.historyIndex = this.history.length;
		this.options.onLine(line);
	}

	private interrupt(): void {
		this.reset();
		this.queue = [];
		this.options.onInterrupt();
	}

	/** Forget the line in progress; the editor stops accepting input until the next `prompt()`. */
	private reset(): void {
		this.active = false;
		this.buffer = [];
		this.cursor = 0;
		this.draft = '';
	}

	/** Simple single-row redraw: rewrite the line and put the cursor back. */
	private redraw(): void {
		const line = this.buffer.join('');
		const body = this.coloredLine(line);
		this.options.write(`\r${this.promptText}${body}${ESC}[K`);
		const back = this.buffer.length - this.cursor;
		if (back > 0) this.options.write(`${ESC}[${back}D`);
	}

	/** Colour the buffer for display; a broken highlighter must not eat the line. */
	private coloredLine(line: string): string {
		if (!this.options.highlight) return line;
		try {
			return this.options.highlight(line);
		} catch {
			return line;
		}
	}
}
