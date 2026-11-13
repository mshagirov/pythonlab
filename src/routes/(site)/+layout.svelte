<script lang="ts">
	import { asset } from '$app/paths';
	import { page } from '$app/state';
	import PageCarousel from '#lib/components/PageCarousel.svelte';
	import PrevNext from '#lib/components/PrevNext.svelte';
	import SectionNavigation from '#lib/components/SectionNavigation.svelte';
	import ThemeToggle from '#lib/components/ThemeToggle.svelte';
	import { href, toNavPath } from '#lib/href.ts';
	import { locate } from '#lib/nav.ts';

	let { children } = $props();

	const current = $derived(locate(toNavPath(page.url.pathname), page.url.hash));
	const steps = $derived(current?.steps ?? []);
	// The home page, contents pages and lessons with steps fit the viewport and scroll
	// inside it; only a lesson without steps scrolls as a whole page.
	const viewportReader = $derived(steps.length > 0 || !current || current.index === 0);
</script>

<svelte:head>
	<title>{current ? `${current.title} | Python Lab` : 'Python Lab'}</title>
</svelte:head>

<header>
	<a class="home" href={href('')}>
		<img src={asset('pythonlab-icon.svg')} alt="" width="288" height="288" />
		Python Lab
	</a>
	<ThemeToggle />
</header>

<main
	class="site-main"
	class:viewport-reader={viewportReader}
	class:section-reader={steps.length > 0}
>
	{#if current}
		<PageCarousel
			sequence={current.sequence}
			index={current.index}
			previousPage={current.previousPage}
			nextPage={current.nextPage}
		/>
		<PrevNext previous={current.previous} next={current.next}>
			{#if steps.length > 0}
				<SectionNavigation {steps} active={current.active} />
			{/if}
		</PrevNext>
		<h1>{current.title}</h1>
	{/if}

	<div class="lesson-content">
		{@render children()}
	</div>
</main>

<footer>
	<span>Copyright © 2025 Murat Shagirov</span>
	<span aria-hidden="true">|</span>
	<a href="https://github.com/mshagirov/pythonlab">
		<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
			<path
				d="M12 .297a12 12 0 0 0-3.793 23.385c.6.111.82-.261.82-.577v-2.234c-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.323 3.301 1.23a11.52 11.52 0 0 1 6.006 0c2.291-1.553 3.297-1.23 3.297-1.23.654 1.652.243 2.873.119 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.216.694.825.576A12.001 12.001 0 0 0 12 .297Z"
			/>
		</svg>
		mshagirov/pythonlab
	</a>
</footer>

<style>
	.home {
		display: inline-flex;
		align-items: center;
		gap: 0.4em;
	}

	.home img {
		width: 1.2em;
		height: 1.2em;
	}

	footer {
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	footer a {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
	}

	:global(body:has(.site-main)) {
		max-width: 72rem;
		padding: 0.5rem 0.25rem;
	}

	:global(body:has(.viewport-reader)) {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		height: 100dvh;
		overflow: hidden;
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
		/* Span the whole viewport width, not just the centred content column. */
		inset: auto calc(50% - 50vw) 0;
		height: 8rem;
		pointer-events: none;
		backdrop-filter: blur(4px);
		background: linear-gradient(to bottom, transparent, var(--more-below));
		mask-image: linear-gradient(to bottom, transparent, black);
	}

	/* The scrolling box: the visible section, or the whole content when there are none. */
	.viewport-reader:not(.section-reader) .lesson-content,
	.section-reader :global(.lesson-content > section:not([hidden])) {
		overflow-y: auto;
		overscroll-behavior-y: contain;
		scrollbar-gutter: stable;
		scrollbar-width: thin;
		scrollbar-color: var(--muted) transparent;
		padding: 0 0.25rem;
	}

	.section-reader :global(.lesson-content > section:not([hidden])) {
		flex: 1;
		min-height: 0;
	}

	.section-reader :global(.lesson-content > section > :first-child) {
		margin-top: 0.5rem;
	}

	.section-reader :global(.lesson-content > section > :last-child) {
		margin-bottom: 0.5rem;
	}

	.viewport-reader :global(.prevnext) {
		flex-shrink: 0;
	}

	:global(body:has(.viewport-reader)) footer {
		flex-shrink: 0;
		border-top: 0;
		margin-block: 0.25rem 0;
		padding-block: 0.5rem 0;
	}
</style>
