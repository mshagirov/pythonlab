<script lang="ts">
	let { text }: { text: string } = $props();
	let message = $state('');

	$effect(() => {
		if (!message) return;
		const timer = setTimeout(() => (message = ''), 2000);
		return () => clearTimeout(timer);
	});

	async function copy() {
		try {
			await navigator.clipboard.writeText(text);
			message = 'Copied!';
		} catch {
			message = 'Copy failed';
		}
	}
</script>

<button type="button" onclick={copy} aria-label="Copy code" title={message || 'Copy code'}>
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		{#if message === 'Copied!'}
			<path d="m5 12 4 4L19 6" />
		{:else}
			<rect x="9" y="9" width="12" height="12" rx="2" />
			<path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
		{/if}
	</svg>
</button>
<span class="announcement" role="status">{message}</span>

<style>
	button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: var(--fg);
		background: var(--code-bg);
		border: 1px solid var(--border);
		border-radius: 4px;
		padding: 0.25rem 0.5rem;
		cursor: pointer;
		font: inherit;
		font-size: 0.8rem;
	}

	.announcement {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
	}
</style>
