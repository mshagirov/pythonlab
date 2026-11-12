<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { toNavPath } from '#lib/href.ts';
	import { neighbours } from '#lib/nav.ts';

	let { id, children }: { id: string; children: Snippet } = $props();
	const steps = $derived(neighbours(toNavPath(page.url.pathname), page.url.hash)?.steps ?? []);
	const active = $derived(steps.find((step) => `#${step.id}` === page.url.hash) ?? steps[0]);
	const title = $derived(steps.find((step) => step.id === id)?.title);
</script>

<!-- Keep editors mounted so edits and output survive section changes. -->
<section {id} hidden={active?.id !== id} aria-label={title}>
	{@render children()}
</section>
