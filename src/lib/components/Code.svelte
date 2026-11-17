<script lang="ts">
	import { highlight, trimBlankLines } from '#lib/highlight.ts';
	import type { Lang } from '#lib/highlight.ts';
	import CopyButton from './CopyButton.svelte';

	let { code, lang = 'text' }: { code: string; lang?: Lang } = $props();

	const html = $derived(highlight(trimBlankLines(code), lang));
</script>

<div class="code-block">
	{@html html}
	<div class="copy">
		<CopyButton text={trimBlankLines(code)} />
	</div>
</div>

<style>
	.code-block {
		position: relative;
	}

	.copy {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		opacity: 0;
	}

	.code-block:hover .copy,
	.code-block:focus-within .copy {
		opacity: 1;
	}

	@media (hover: none) {
		.copy {
			opacity: 1;
		}
	}
</style>
