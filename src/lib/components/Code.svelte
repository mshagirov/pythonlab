<script lang="ts">
	import { highlight, trimBlankLines } from '#lib/highlight.ts';
	import type { Lang } from '#lib/highlight.ts';

	let { code, lang = 'text' }: { code: string; lang?: Lang } = $props();

	const html = $derived(highlight(trimBlankLines(code), lang));
</script>

{@html html}
