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

/** Escape sequences the editor understands, longest first. */
const BINDINGS: ReadonlyArray<readonly [sequence: string, key: string]> = [
	[`${ESC}[1~`, 'home'],
	[`${ESC}[3~`, 'delete'],
	[`${ESC}[4~`, 'end'],
	[`${ESC}[A`, 'up'],
	[`${ESC}[B`, 'down'],
	[`${ESC}[C`, 'right'],
	[`${ESC}[D`, 'left'],
	[`${ESC}[F`, 'end'],
	[`${ESC}[H`, 'home'],
	[`${ESC}OA`, 'up'],
	[`${ESC}OB`, 'down'],
	[`${ESC}OC`, 'right'],
	[`${ESC}OD`, 'left'],
	[`${ESC}OF`, 'end'],
	[`${ESC}OH`, 'home'],
];

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
	private draft: string[] = [];
	/** Input waiting for the next `prompt()`: leftover from a paste, or typed while a line ran. */
	private queue: string[] = [];

	constructor(options: LineEditorOptions) {
		this.options = options;
	}

	/** Print the prompt and start accepting a new line. */
	prompt(text: string): void {
		this.promptText = text;
		this.buffer = [];
		this.cursor = 0;
		this.historyIndex = this.history.length;
		this.draft = [];
		this.active = true;
		this.options.write(text);

		if (this.queue.length > 0) {
			const pending = this.queue.join('');
			this.queue = [];
			this.feed(pending);
		}
	}

	/** Feed raw input from the terminal's `onData`. */
	input(data: string): void {
		this.feed(stripPasteMarkers(data));
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
			this.applyCharacter(char);
		}
	}

	private applyCharacter(char: string): void {
		switch (char) {
			case '\x7f':
			case '\b':
				this.deleteBackward();
				return;
			case '\x01':
				this.moveHome();
				return;
			case '\x05':
				this.moveEnd();
				return;
			case '\x15':
				this.killBefore();
				return;
			case '\x0b':
				this.killAfter();
				return;
			case '\x0c':
				this.options.write(`${ESC}[2J${ESC}[H`);
				this.redraw();
				return;
			case '\x04':
				// Ctrl-D only deletes at the cursor; on an empty line it does nothing.
				if (this.buffer.length > 0) this.deleteForward();
				return;
			case '\t':
				this.insert(INDENT);
				return;
			default: {
				const code = char.codePointAt(0) ?? 0;
				if (code >= 0x20 && code !== 0x7f) this.insert(char);
			}
		}
	}

	/** Handle the escape sequence at `chars[start]` and return how many code points it used. */
	private consumeEscape(chars: string[], start: number): number {
		const rest = chars.slice(start).join('');
		for (const [sequence, key] of BINDINGS) {
			if (!rest.startsWith(sequence)) continue;
			this.applyKey(key);
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

	private applyKey(key: string): void {
		switch (key) {
			case 'left':
				if (this.cursor > 0) {
					this.cursor -= 1;
					this.redraw();
				}
				return;
			case 'right':
				if (this.cursor < this.buffer.length) {
					this.cursor += 1;
					this.redraw();
				}
				return;
			case 'home':
				this.moveHome();
				return;
			case 'end':
				this.moveEnd();
				return;
			case 'up':
				this.historyUp();
				return;
			case 'down':
				this.historyDown();
				return;
			case 'delete':
				this.deleteForward();
				return;
		}
	}

	private insert(text: string): void {
		const chars = Array.from(text);
		this.buffer = [
			...this.buffer.slice(0, this.cursor),
			...chars,
			...this.buffer.slice(this.cursor),
		];
		this.cursor += chars.length;
		this.redraw();
	}

	private deleteBackward(): void {
		if (this.cursor === 0) return;
		this.buffer.splice(this.cursor - 1, 1);
		this.cursor -= 1;
		this.redraw();
	}

	private deleteForward(): void {
		if (this.cursor >= this.buffer.length) return;
		this.buffer.splice(this.cursor, 1);
		this.redraw();
	}

	private moveHome(): void {
		if (this.cursor === 0) return;
		this.cursor = 0;
		this.redraw();
	}

	private moveEnd(): void {
		if (this.cursor === this.buffer.length) return;
		this.cursor = this.buffer.length;
		this.redraw();
	}

	private killBefore(): void {
		if (this.cursor === 0) return;
		this.buffer = this.buffer.slice(this.cursor);
		this.cursor = 0;
		this.redraw();
	}

	private killAfter(): void {
		if (this.cursor === this.buffer.length) return;
		this.buffer = this.buffer.slice(0, this.cursor);
		this.redraw();
	}

	private historyUp(): void {
		if (this.history.length === 0 || this.historyIndex === 0) return;
		if (this.historyIndex === this.history.length) this.draft = [...this.buffer];
		this.historyIndex -= 1;
		this.buffer = Array.from(this.history[this.historyIndex]);
		this.cursor = this.buffer.length;
		this.redraw();
	}

	private historyDown(): void {
		if (this.historyIndex >= this.history.length) return;
		this.historyIndex += 1;
		this.buffer =
			this.historyIndex === this.history.length
				? [...this.draft]
				: Array.from(this.history[this.historyIndex]);
		this.cursor = this.buffer.length;
		this.redraw();
	}

	private submit(): void {
		const line = this.buffer.join('');
		this.active = false;
		this.buffer = [];
		this.cursor = 0;
		this.draft = [];
		this.options.write('\r\n');

		if (line.length > 0 && this.history[this.history.length - 1] !== line) {
			this.history.push(line);
		}
		this.historyIndex = this.history.length;
		this.options.onLine(line);
	}

	private interrupt(): void {
		this.active = false;
		this.buffer = [];
		this.cursor = 0;
		this.draft = [];
		this.queue = [];
		this.options.onInterrupt();
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

function stripPasteMarkers(data: string): string {
	return data.split(PASTE_START).join('').split(PASTE_END).join('');
}
