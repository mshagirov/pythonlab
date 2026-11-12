<script lang="ts">
	import { page } from '$app/state';
	import PrevNext from '#lib/components/PrevNext.svelte';
	import SectionNavigation from '#lib/components/SectionNavigation.svelte';
	import ThemeToggle from '#lib/components/ThemeToggle.svelte';
	import { href, toNavPath } from '#lib/href.ts';
	import { neighbours } from '#lib/nav.ts';

	let { children } = $props();

	const current = $derived(neighbours(toNavPath(page.url.pathname), page.url.hash));
	const viewportReader = $derived(
		Boolean(current?.steps?.length) ||
			['', 'introduction/', 'lab-01/'].includes(toNavPath(page.url.pathname)),
	);
	const active = $derived(
		Math.max(0, current?.steps?.findIndex((step) => `#${step.id}` === page.url.hash) ?? 0),
	);
</script>

<svelte:head>
	<title>{current ? `${current.title} | Python Lab` : 'Python Lab'}</title>
</svelte:head>

<header>
	<a href={href('')}>🐍 Python Lab</a>
	<ThemeToggle />
</header>

<main
	class="site-main"
	class:viewport-reader={viewportReader}
	class:section-reader={current?.steps?.length}
>
	{#if current}
		<h1>{current.title}</h1>
	{/if}

	<div class="lesson-content">
		{#if current?.steps?.length}
			<SectionNavigation steps={current.steps} {active} />
		{/if}
		{@render children()}
	</div>

	{#if current}
		<PrevNext previous={current.previous} next={current.next} />
	{/if}
</main>

<footer>Python Lab — Python workshops and tutorials</footer>

<style>
	:global(body:has(.site-main)) {
		max-width: 72rem;
		padding: 0.5rem 0.25rem;
	}

	:global(body:has(.viewport-reader)) {
		box-sizing: border-box;
		max-width: 72rem;
		display: flex;
		flex-direction: column;
		height: 100dvh;
		overflow: hidden;
		padding: 0.5rem 0.25rem;
	}

	:global(body:has(.viewport-reader)) header {
		flex-shrink: 0;
		margin-bottom: 0.25rem;
		padding-bottom: 0.25rem;
	}

	.viewport-reader {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-height: 0;
	}

	.viewport-reader h1 {
		flex-shrink: 0;
		margin-block: 0.25rem;
	}

	.viewport-reader .lesson-content {
		flex: 1;
		min-height: 0;
	}

	.section-reader .lesson-content {
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.section-reader .lesson-content:global(.more-below)::after {
		content: '';
		position: absolute;
		inset: auto 0 0;
		height: 7rem;
		pointer-events: none;
		backdrop-filter: blur(2px);
		background: linear-gradient(to bottom, transparent, var(--bg));
		mask-image: linear-gradient(to bottom, transparent, black);
	}

	.viewport-reader:not(.section-reader) .lesson-content,
	.section-reader :global(.lesson-content > section:not([hidden])) {
		scrollbar-width: thin;
		scrollbar-color: var(--muted) transparent;
	}

	.viewport-reader:not(.section-reader) .lesson-content {
		overflow-y: auto;
		overscroll-behavior-y: contain;
		scrollbar-gutter: stable;
		padding: 0 0.25rem;
	}

	.section-reader :global(.section-navigation) {
		flex-shrink: 0;
		margin-block: 0.25rem 0.375rem;
	}

	.section-reader :global(.lesson-content > section:not([hidden])) {
		flex: 1;
		min-height: 0;
		overflow-y: auto;
		overscroll-behavior-y: contain;
		scrollbar-gutter: stable;
		padding: 0 0.25rem;
	}

	.section-reader :global(.lesson-content > section > :first-child) {
		margin-top: 0.5rem;
	}

	.section-reader :global(.lesson-content > section > :last-child) {
		margin-bottom: 0.5rem;
	}

	.viewport-reader :global(.prevnext) {
		flex-shrink: 0;
		border-top: 0;
		margin-top: 0.375rem;
		padding-top: 0.25rem;
	}

	:global(body:has(.viewport-reader)) footer {
		flex-shrink: 0;
		border-top: 0;
		margin-block: 0.375rem 0;
		padding-block: 0.25rem 0;
	}
</style>
