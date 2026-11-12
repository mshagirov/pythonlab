<script lang="ts">
	import { onMount, untrack } from 'svelte';
	import { highlight } from '#lib/highlight.ts';
	import { isApple } from '#lib/platform.ts';
	import { cells } from '#lib/python/client.ts';
	import type { Stream } from '#lib/python/client.ts';

	let { code, maxLoopIterations }: { code: string; maxLoopIterations?: number } = $props();

	onMount(() => {
		// Warm the shared worker while the reader studies the lesson, not on the first Run.
		void cells.ready.catch(() => {
			// A failed preload is silent; Run will retry and show any loading error.
		});
	});

	interface Chunk {
		text: string;
		stream: Stream;
	}

	/** Mirrors the message `client.ts` rejects with when a worker is terminated. */
	const RESTARTED = 'Python was restarted';

	// Strip leading and trailing blank lines only, keeping the first line's indentation.
	// The cell only ever uses the initial value of `code`, so untrack it on purpose.
	const initial = untrack(() =>
		code.replace(/^(?:[ \t]*\r?\n)+/, '').replace(/(?:\r?\n[ \t]*)+$/, ''),
	);

	let source = $state(initial);
	let output = $state<Chunk[]>([]);
	let running = $state(false);
	let status = $state('');
	let typing = $state(false);
	let textarea = $state<HTMLTextAreaElement | null>(null);
	/** Shift key name for the Run tooltip; the PC name until we know we're on a Mac. */
	let shift = $state('Shift');
	$effect(() => {
		if (isApple()) shift = '⇧';
	});

	// Shiki emits nothing for a final empty line; one more character keeps heights equal.
	const highlighted = $derived(highlight(source.endsWith('\n') ? `${source} ` : source, 'python'));

	function append(text: string, stream: Stream): void {
		output = [...output, { text, stream }];
	}

	async function run(): Promise<void> {
		if (running) return;
		running = true;
		output = [];
		status = 'Loading Python…';

		try {
			await cells.ready;
		} catch (error) {
			status = '';
			running = false;
			const message = error instanceof Error ? error.message : String(error);
			append(
				message === RESTARTED ? message : 'Could not load Python (are you offline?)',
				'stderr',
			);
			return;
		}
		status = '';

		try {
			await cells.run(source, append, { maxLoopIterations });
		} catch (error) {
			append(error instanceof Error ? error.message : String(error), 'stderr');
		} finally {
			running = false;
		}
	}

	function stop(): void {
		cells.restart();
	}

	function reset(): void {
		source = initial;
		output = [];
	}

	function insertTab(): void {
		const element = textarea;
		if (!element) return;
		const start = element.selectionStart ?? 0;
		const end = element.selectionEnd ?? 0;
		element.value = `${element.value.slice(0, start)}    ${element.value.slice(end)}`;
		element.selectionStart = element.selectionEnd = start + 4;
		source = element.value;
	}

	function onkeydown(event: KeyboardEvent): void {
		if (event.key === 'Tab') {
			event.preventDefault();
			typing = true;
			insertTab();
			return;
		}
		if (event.key === 'Enter' && event.shiftKey) {
			event.preventDefault();
			void run();
		}
	}
</script>

<div class="cell">
	<div class="frame" class:typing class:running role="group" onpointermove={() => (typing = false)}>
		<div class="editor">
			<div class="highlight" aria-hidden="true">{@html highlighted}</div>
			<textarea
				bind:this={textarea}
				bind:value={source}
				class="code"
				aria-label="Python code"
				spellcheck="false"
				autocapitalize="off"
				autocomplete="off"
				wrap="off"
				rows="1"
				aria-keyshortcuts="Shift+Enter"
				oninput={() => (typing = true)}
				onblur={() => (typing = false)}
				{onkeydown}></textarea>
		</div>

		<div class="actions">
			<button type="button" class="icon" onclick={reset} aria-label="Reset" title="Reset">
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
					<path d="M3 3v5h5" />
				</svg>
			</button>
			<button
				type="button"
				class="icon toggle"
				class:stop={running}
				onclick={running ? stop : () => void run()}
				aria-label={running ? 'Stop' : 'Run'}
			>
				{#if running}
					<svg viewBox="0 0 16 16" aria-hidden="true">
						<rect x="4" y="4" width="8" height="8" fill="currentColor" />
					</svg>
				{:else}
					<svg viewBox="0 0 16 16" aria-hidden="true">
						<path d="M4 2.5v11l9-5.5z" fill="currentColor" />
					</svg>
				{/if}
				<span class="tooltip" aria-hidden="true">
					{#if running}
						Stop
					{:else}
						Run <kbd>{shift}</kbd><kbd>Enter</kbd>
					{/if}
				</span>
			</button>
		</div>
	</div>

	{#if status}
		<div class="status">{status}</div>
	{/if}

	{#if output.length > 0}
		<pre class="output" aria-live="polite">{#each output as chunk}<span
					class:stderr={chunk.stream === 'stderr'}>{chunk.text}</span
				>{/each}</pre>
	{/if}
</div>

<style>
	.cell {
		margin: 1.5rem 0;
	}

	.editor {
		display: grid;
		overflow-x: auto;
		border: 1px solid var(--border);
		border-radius: 6px;
		background: var(--code-bg);
		font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace;
		font-size: 1rem;
		line-height: 1.45;
		tab-size: 4;
	}

	.editor:focus-within {
		outline: 2px solid var(--link);
		outline-offset: 1px;
	}

	/* Both layers sit in the same grid cell, so they always line up and scroll together. */
	.editor > * {
		grid-area: 1 / 1;
	}

	.highlight {
		pointer-events: none;
		user-select: none;
	}

	.editor :global(pre.shiki) {
		margin: 0;
		padding: 1rem;
		border: 0;
		border-radius: 0;
		background: transparent;
		overflow: visible;
		font: inherit;
		white-space: pre;
		tab-size: inherit;
	}

	.code {
		margin: 0;
		padding: 1rem;
		border: 0;
		border-radius: 0;
		background: transparent;
		color: transparent;
		caret-color: var(--fg);
		resize: none;
		overflow: hidden;
		white-space: pre;
		font: inherit;
		outline: none;
	}

	.code::selection {
		background: Highlight;
		color: light-dark(HighlightText, var(--fg));
	}

	.frame {
		position: relative;
	}

	.actions {
		position: absolute;
		top: 0.4rem;
		right: 0.4rem;
		z-index: 1;
		display: flex;
		gap: 0.25rem;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.15s;
	}

	.frame:hover .actions,
	.actions:focus-within {
		opacity: 1;
		pointer-events: auto;
	}

	.frame.typing .actions {
		opacity: 0;
		pointer-events: none;
	}

	.frame.running .actions {
		opacity: 1;
		pointer-events: auto;
	}

	@media (hover: none) {
		.actions {
			opacity: 1;
			pointer-events: auto;
		}
	}

	.actions button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.75rem;
		height: 1.75rem;
		padding: 0;
		border: 1px solid var(--border);
		border-radius: 6px;
		background: var(--bg);
		color: var(--muted);
	}

	.actions button.toggle {
		position: relative;
		color: light-dark(#1a7f37, #3fb950);
	}

	.tooltip {
		position: absolute;
		top: calc(100% + 0.3rem);
		right: 0;
		display: flex;
		align-items: center;
		gap: 0.3rem;
		padding: 0.3rem 0.5rem;
		border: 1px solid var(--border);
		border-radius: 4px;
		background: var(--code-bg);
		color: var(--fg);
		font-size: 0.8rem;
		white-space: nowrap;
		pointer-events: none;
		opacity: 0;
		translate: 0 -0.25rem;
		transition:
			opacity 0.15s,
			translate 0.15s;
	}

	.toggle:hover .tooltip,
	.toggle:focus-visible .tooltip {
		opacity: 1;
		translate: 0 0;
		/* A short delay so the tooltip doesn't flash while the pointer passes by. */
		transition-delay: 0.3s;
	}

	.actions button.toggle.stop {
		color: light-dark(#cf222e, #ff7b72);
	}

	.actions svg {
		width: 16px;
		height: 16px;
		display: block;
	}

	.status {
		margin-top: 0.5rem;
		color: var(--muted);
		font-size: 0.9rem;
	}

	.output {
		margin: 0.75rem 0 0;
		max-height: 20rem;
		overflow-y: auto;
		overscroll-behavior-y: contain;
		white-space: pre-wrap;
		overflow-wrap: anywhere;
	}

	.output .stderr {
		color: light-dark(#b3261e, #ff7b72);
	}

	@media (max-width: 40rem) {
		.editor {
			font-size: 0.8125rem;
		}

		.editor :global(pre.shiki),
		.code {
			padding: 0.625rem;
		}
	}
</style>
