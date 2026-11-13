<script lang="ts">
	import type { Snippet } from 'svelte';
	import { clipped } from '#lib/clipped.ts';
	import { href, navigateStep } from '#lib/href.ts';
	import type { NavLink } from '#lib/nav.ts';
	import { isApple } from '#lib/platform.ts';

	let {
		previous,
		next,
		children,
	}: {
		previous?: NavLink;
		next?: NavLink;
		/** Shown centred between the buttons, e.g. the section track. */
		children?: Snippet;
	} = $props();

	/** Modifier key shown in the shortcut tooltips; Ctrl until we know we're on a Mac. */
	let modifier = $state('Ctrl');
	$effect(() => {
		if (isApple()) modifier = '⌘';
	});

	/** Ctrl/Cmd+, and Ctrl/Cmd+. follow the Previous and Next links. */
	function onkeydown(event: KeyboardEvent) {
		if (!event.ctrlKey && !event.metaKey) return;
		const id = event.key === ',' ? 'previous' : event.key === '.' ? 'next' : '';
		const link = document.getElementById(id);
		if (!link) return;
		event.preventDefault();
		link.click();
	}
</script>

{#if previous || next}
	<nav class="prevnext">
		{#if children}
			<div class="middle">{@render children()}</div>
		{/if}
		{#if previous}
			<a
				id="previous"
				href={href(previous.path)}
				onclick={navigateStep}
				aria-keyshortcuts="Control+Comma Meta+Comma"
			>
				<span class="arrow" aria-hidden="true">←</span>
				<span class="title" {@attach clipped(previous.label)}>{previous.label}</span>
				<span class="tooltip" aria-hidden="true">Previous <kbd>{modifier}</kbd><kbd>,</kbd></span>
			</a>
		{/if}
		{#if next}
			<a
				id="next"
				href={href(next.path)}
				onclick={navigateStep}
				aria-keyshortcuts="Control+Period Meta+Period"
			>
				<span class="title" {@attach clipped(next.label)}>{next.label}</span>
				<span class="arrow" aria-hidden="true">→</span>
				<span class="tooltip" aria-hidden="true">Next <kbd>{modifier}</kbd><kbd>.</kbd></span>
			</a>
		{/if}
	</nav>
{/if}

<svelte:window {onkeydown} />

<style>
	.prevnext {
		container-type: inline-size;
		display: grid;
		/* Both side columns are always this wide, even without a button, so the middle stays centred. */
		--title-width: min(14rem, calc(50vw - 5rem));
		--side: calc(var(--title-width) + 1.75rem + 0.6rem);
		grid-template-columns: var(--side) minmax(0, 1fr) var(--side);
		align-items: center;
		gap: 0.25rem 1rem;
	}

	.middle {
		grid-row: 1;
		grid-column: 2;
		display: flex;
		justify-content: center;
		min-width: 0;
	}

	/* No room between the buttons: put the middle on its own row below them. */
	@container (width < 44rem) {
		.middle {
			grid-row: 2;
			grid-column: 1 / -1;
		}
	}

	#previous,
	#next {
		/* Above the page title, so the shortcut tooltip isn't drawn underneath it. */
		position: relative;
		z-index: 1;
		grid-row: 1;
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		min-width: 0;
		padding-block: 0.4em;
		border-radius: 4px;
		text-decoration: none;
		opacity: 0.6;
		transition: opacity 0.15s;
	}

	:is(#previous, #next):is(:hover, :focus-visible) {
		opacity: 1;
	}

	#previous {
		grid-column: 1;
		justify-self: start;
	}

	#next {
		grid-column: 3;
		justify-self: end;
	}

	#previous .tooltip {
		left: 0;
	}

	#next .tooltip {
		right: 0;
	}

	.arrow {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 1.75rem;
		height: 1.75rem;
		border: 1px solid var(--border);
		border-radius: 4px;
		transition: translate 0.15s;
	}

	#previous:hover .arrow {
		translate: -0.15em 0;
	}

	#next:hover .arrow {
		translate: 0.15em 0;
	}

	.title {
		width: var(--title-width);
		overflow: hidden;
		white-space: nowrap;
	}

	#next .title {
		text-align: right;
	}

	.title:global([data-clipped]) {
		mask-image: linear-gradient(to right, black calc(100% - 4em), transparent);
	}
</style>
