<script lang="ts">
	import { highlight } from '#lib/highlight.ts';
	import type { Lang } from '#lib/highlight.ts';

	let { code, lang = 'text' }: { code: string; lang?: Lang } = $props();

	// Strip leading and trailing blank lines only, keeping the first line's indentation.
	const trimmed = $derived(code.replace(/^(?:[ \t]*\r?\n)+/, '').replace(/(?:\r?\n[ \t]*)+$/, ''));
	const html = $derived(highlight(trimmed, lang));
</script>

{@html html}
