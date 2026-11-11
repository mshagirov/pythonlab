<script lang="ts">
	import '@wterm/dom/css';
	import { onMount } from 'svelte';
	import type { WTerm } from '@wterm/dom';
	import type { GhosttyCore } from '@wterm/ghostty';
	import { href } from '#lib/href.ts';
	import ThemeToggle from '#lib/components/ThemeToggle.svelte';
	import { highlightAnsi } from '#lib/highlight.ts';
	import { createSession } from '#lib/python/client.ts';
	import type { Stream } from '#lib/python/client.ts';
	import { LineEditor } from '#lib/terminal/line-editor.ts';

	const PROMPT = '>>> ';
	const CONTINUATION = '... ';
	const HINT = 'Ctrl-C restarts Python. input() is not available in the browser.\r\n';

	type Phase = 'starting' | 'idle' | 'running';

	let host = $state<HTMLDivElement>();
	let toggle = $state<HTMLSpanElement>();
	let term: WTerm | null = null;

	function focusTerminal(): void {
		// Leave a text selection made by dragging inside the terminal alone.
		if (window.getSelection()?.isCollapsed === false) return;
		term?.focus();
	}

	function prefersDark(): boolean {
		const forced = document.documentElement.dataset.theme;
		if (forced === 'dark') return true;
		if (forced === 'light') return false;
		return window.matchMedia('(prefers-color-scheme: dark)').matches;
	}

	/** The terminal needs CRLF for a new line; leave existing CRLF pairs alone. */
	function toTerminalText(text: string): string {
		return text.replace(/\r?\n/g, '\r\n');
	}

	onMount(() => {
		if (!host) return;
		const element = host;

		let disposed = false;
		let core: GhosttyCore | null = null;
		let editor: LineEditor | null = null;
		let phase: Phase = 'starting';
		/** The prompt to show when a line finishes: `>>> ` or the continuation prompt. */
		let nextPrompt = PROMPT;

		const session = createSession();

		function write(text: string): void {
			term?.write(text);
		}

		function showError(message: string): void {
			write(`\x1b[31m${toTerminalText(message)}\x1b[0m\r\n`);
		}

		function onOutput(text: string, stream: Stream): void {
			const body = toTerminalText(text);
			write(stream === 'stderr' ? `\x1b[31m${body}\x1b[0m` : body);
		}

		async function startPython(first: boolean): Promise<void> {
			if (first) write('Loading Python…\r\n');
			try {
				const banner = await session.ready;
				if (disposed) return;
				write(`${banner}\r\n`);
				if (first) write(HINT);
				phase = 'idle';
				nextPrompt = PROMPT;
				editor?.prompt(PROMPT);
			} catch {
				if (disposed) return;
				write('Could not load Python (are you offline?)\r\n');
			}
		}

		function runLine(line: string): void {
			if (phase !== 'idle') return;
			phase = 'running';
			void session.push(line, onOutput).then(
				(more: boolean) => {
					if (disposed) return;
					nextPrompt = more ? CONTINUATION : PROMPT;
					phase = 'idle';
					editor?.prompt(nextPrompt);
				},
				(error: unknown) => {
					if (disposed) return;
					// Ctrl-C during execution restarts Python, and that path prompts again.
					if (error instanceof Error && error.message === 'Python was restarted') return;
					phase = 'idle';
					nextPrompt = PROMPT;
					showError(error instanceof Error ? error.message : String(error));
					editor?.prompt(nextPrompt);
				},
			);
		}

		function interrupt(): void {
			if (phase === 'running') {
				session.restart();
				write('\r\nKeyboardInterrupt — Python restarted\r\n');
				phase = 'starting';
				void startPython(false);
				return;
			}
			if (phase === 'starting') return;
			write('^C\r\n');
			if (nextPrompt === PROMPT) {
				editor?.prompt(PROMPT);
				return;
			}
			// A half-entered block must be discarded inside Python too, or the
			// console would keep asking for more lines.
			phase = 'running';
			void session.reset().then(
				() => {
					if (disposed) return;
					nextPrompt = PROMPT;
					phase = 'idle';
					editor?.prompt(PROMPT);
				},
				(error: unknown) => {
					if (disposed) return;
					// Ctrl-C during execution restarts Python, and that path prompts again.
					if (error instanceof Error && error.message === 'Python was restarted') return;
					nextPrompt = PROMPT;
					phase = 'idle';
					showError(error instanceof Error ? error.message : String(error));
					editor?.prompt(PROMPT);
				},
			);
		}

		void (async () => {
			const [{ WTerm: Terminal }, { GhosttyCore: Core }] = await Promise.all([
				import('@wterm/dom'),
				import('@wterm/ghostty'),
			]);
			if (disposed) return;

			const dark = prefersDark();
			const loadedCore = await Core.load({
				foregroundColor: dark ? '#e6e6e6' : '#1f2328',
				backgroundColor: dark ? '#16181c' : '#ffffff',
			});
			if (disposed) {
				loadedCore.dispose();
				return;
			}

			core = loadedCore;
			const wt = new Terminal(element, {
				core: loadedCore,
				autoResize: true,
				cursorBlink: true,
				onData: (data) => editor?.input(data),
			});
			term = wt;
			editor = new LineEditor({
				write,
				onLine: runLine,
				onInterrupt: interrupt,
				highlight: (line) => highlightAnsi(line, prefersDark()),
			});
			await wt.init();
			if (disposed) return;
			wt.focus();
			void startPython(true);
		})().catch((error: unknown) => {
			if (disposed) return;
			const detail = error instanceof Error ? error.message : String(error);
			if (term) showError(`Could not start the terminal (${detail})`);
			else element.textContent = `Could not start the terminal (${detail})`;
		});

		element.addEventListener('click', focusTerminal);
		toggle?.addEventListener('click', focusTerminal);

		return () => {
			disposed = true;
			element.removeEventListener('click', focusTerminal);
			toggle?.removeEventListener('click', focusTerminal);
			term?.destroy();
			term = null;
			core?.dispose();
			session.restart();
		};
	});
</script>

<svelte:head>
	<title>Python Shell | Python Lab</title>
</svelte:head>

<div class="shell">
	<div class="bar">
		<span bind:this={toggle}><ThemeToggle /></span>
		<a href={href('')}>🐍 back to pythonlab</a>
	</div>
	<div class="screen" bind:this={host} aria-label="Python shell"></div>
</div>

<style>
	.shell {
		position: fixed;
		inset: 0;
		display: flex;
		flex-direction: column;
		background: light-dark(#ffffff, #16181c);
		color: light-dark(#1f2328, #e6e6e6);
	}

	.bar {
		display: flex;
		flex: 0 0 auto;
		justify-content: flex-end;
		align-items: center;
		gap: 0.75rem;
		padding: 0.25rem 0.75rem;
		border-bottom: 1px solid light-dark(#d1d9e0, #30363d);
		font-size: 0.85rem;
	}

	.bar a {
		color: light-dark(#0550ae, #6cb6ff);
		text-decoration: none;
	}

	.screen {
		flex: 1 1 0;
		min-height: 0;
	}

	.screen:global(.wterm) {
		flex: 1 1 0;
		min-height: 0;
		--term-bg: light-dark(#ffffff, #16181c);
		--term-fg: light-dark(#1f2328, #e6e6e6);
		--term-cursor: light-dark(#0550ae, #6cb6ff);
		--term-color-0: light-dark(#24292f, #484f58);
		--term-color-1: light-dark(#cf222e, #ff7b72);
		--term-color-2: light-dark(#116329, #7ee787);
		--term-color-3: light-dark(#953800, #d29922);
		--term-color-4: light-dark(#0550ae, #79c0ff);
		--term-color-5: light-dark(#8250df, #d2a8ff);
		--term-color-6: light-dark(#1b7c83, #56d4dd);
		--term-color-7: light-dark(#6e7781, #c9d1d9);
		--term-color-8: light-dark(#6e7781, #8b949e);
		--term-color-9: light-dark(#cf222e, #ffa198);
		--term-color-10: light-dark(#116329, #56d364);
		--term-color-11: light-dark(#953800, #e3b341);
		--term-color-12: light-dark(#0550ae, #a5d6ff);
		--term-color-13: light-dark(#8250df, #d2a8ff);
		--term-color-14: light-dark(#1b7c83, #56d4dd);
		--term-color-15: light-dark(#24292f, #f0f6fc);
		padding: 12px 16px 16px;
		border-radius: 0;
		box-shadow: none;
	}
</style>
