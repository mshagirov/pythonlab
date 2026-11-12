<script lang="ts">
	import { href } from '#lib/href.ts';
</script>

<div class="launch">
	<a href={href('terminal/')} data-sveltekit-reload
		>Launch Python<span class="cursor" aria-hidden="true"></span></a
	>
	<blockquote><p>Click "Launch Python" to start Python shell in your browser.</p></blockquote>
</div>

<style>
	.launch {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1rem;
	}

	a {
		padding: 0.5rem 0.9rem;
		border: 1px solid #000;
		border-radius: 4px;
		background: #000;
		color: #0f0;
		font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace;
		font-size: 16px;
		white-space: nowrap;
		text-decoration: none;
		text-shadow:
			0 0 5px #0f0,
			0 0 10px #0f0,
			0 0 20px #0f0,
			0 0 40px #0f0;
	}

	.cursor {
		position: relative;
		top: 2px;
		display: inline-block;
		width: 8px;
		height: 18px;
		margin-left: 2px;
		background-color: #0f0;
		box-shadow:
			0 0 5px #0f0,
			0 0 10px #0f0,
			0 0 20px #0f0;
		vertical-align: top;
		animation: blink 1s step-end infinite;
	}

	@keyframes blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.cursor {
			animation-duration: 2s;
		}
	}

	blockquote {
		flex: 1;
		min-width: 12rem;
		margin: 0;
	}

	blockquote p {
		margin: 0;
	}
</style>
