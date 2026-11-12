<script lang="ts">
	import { href, navigateStep } from '#lib/href.ts';
	import type { NavLink } from '#lib/nav.ts';

	let { previous, next }: { previous?: NavLink; next?: NavLink } = $props();

	function click(id: string): boolean {
		const link = document.getElementById(id);
		if (!(link instanceof HTMLAnchorElement)) return false;
		link.click();
		return true;
	}

	function onkeydown(event: KeyboardEvent) {
		if (!event.ctrlKey && !event.metaKey) return;

		if (event.key === ',') {
			if (click('previous')) event.preventDefault();
		} else if (event.key === '.') {
			if (click('next')) event.preventDefault();
		}
	}
</script>

{#if previous || next}
	<nav class="prevnext">
		{#if previous}
			<a id="previous" href={href(previous.path)} onclick={navigateStep}>{previous.label}</a>
		{/if}
		{#if next}
			<a id="next" href={href(next.path)} onclick={navigateStep}>{next.label}</a>
		{/if}
	</nav>
{/if}

<svelte:window {onkeydown} />

<style>
	.prevnext {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		margin-top: 3rem;
		padding-top: 1rem;
		border-top: 1px solid var(--border);
	}

	#next {
		margin-left: auto;
		text-align: right;
	}
</style>
