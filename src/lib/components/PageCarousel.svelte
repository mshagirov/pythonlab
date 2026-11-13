<script lang="ts">
	import { clipped } from '#lib/clipped.ts';
	import { href } from '#lib/href.ts';
	import type { NavLink } from '#lib/nav.ts';

	let {
		sequence,
		index,
		previousPage,
		nextPage,
	}: {
		/** The section's index page followed by its lesson pages. */
		sequence: NavLink[];
		/** Position of the current page in `sequence`. */
		index: number;
		previousPage?: NavLink;
		nextPage?: NavLink;
	} = $props();

	/** How many neighbours stay visible on each side of the current title. */
	const VISIBLE = 3;

	/** Space between neighbouring titles, in rem. */
	const GAP = 2.25;

	let track = $state<HTMLElement>();
	/**
	 * Left edge of each title, relative to the carousel's centre, so that the titles sit
	 * side by side around the current one. All movement is then a transform, which
	 * animates in one smooth transition. Unset until first measured.
	 */
	let positions = $state.raw<number[]>();
	let animate = $state(false);

	$effect(() => {
		if (!track) return;
		// Runs again for a new section (`sequence`) and for a new page (`index`): the
		// current title is bold, so the widths change with it.
		const count = sequence.length;
		const current = index;
		const items = [...track.children] as HTMLElement[];
		if (items.length !== count || !items[current]) return;

		function measure() {
			const gap = GAP * parseFloat(getComputedStyle(document.documentElement).fontSize);
			const widths = items.map((item) => item.offsetWidth);
			// Work outwards from the current title, which is centred.
			const left: number[] = [];
			left[current] = -widths[current] / 2;
			for (let i = current + 1; i < count; i++) left[i] = left[i - 1] + widths[i - 1] + gap;
			for (let i = current - 1; i >= 0; i--) left[i] = left[i + 1] - gap - widths[i];
			positions = left;
		}

		measure();
		// Only animate later moves, not the initial placement after page load.
		const frame = requestAnimationFrame(() => (animate = true));
		// Transforms don't change offsetWidth, so this only fires for real size changes
		// such as web fonts loading.
		const observer = new ResizeObserver(measure);
		for (const item of items) observer.observe(item);
		return () => {
			cancelAnimationFrame(frame);
			observer.disconnect();
		};
	});
</script>

{#if sequence.length > 1}
	<nav class="page-carousel" aria-label="Lesson pages">
		<div class="carousel" aria-hidden="true">
			<div class="track" class:animate class:measured={!!positions} bind:this={track}>
				{#each sequence as item, position (item.path)}
					{@const offset = position - index}
					{@const current = offset === 0}
					<span
						class="item"
						class:current
						class:before={offset < 0}
						class:after={offset > 0}
						class:hidden={Math.abs(offset) > VISIBLE}
						style:--x={`${positions?.[position] ?? 0}px`}
						{@attach clipped(current)}>{item.label}</span
					>
				{/each}
			</div>
		</div>
		<!-- Each half of the carousel jumps a whole page: back to the previous page's
	     last section, or on to the next page's first section. -->
		{#if previousPage}
			<a
				class="half go-previous"
				href={href(previousPage.path)}
				aria-label={`Previous page: ${previousPage.label}`}
			></a>
		{/if}
		{#if nextPage}
			<a class="half go-next" href={href(nextPage.path)} aria-label={`Next page: ${nextPage.label}`}
			></a>
		{/if}
	</nav>
{/if}

<style>
	.page-carousel {
		position: relative;
		flex-shrink: 0;
		margin-bottom: 0.3rem;
	}

	.half {
		position: absolute;
		inset-block: 0;
		width: 50%;
		border-radius: 4px;
	}

	.go-previous {
		left: 0;
	}

	.go-next {
		right: 0;
	}

	.half:focus-visible {
		outline: 2px solid var(--link);
		outline-offset: -2px;
	}

	/* Bring the side being pointed at into focus, without changing its colour. */
	.page-carousel:has(.go-previous:hover, .go-previous:focus-visible) .item.before,
	.page-carousel:has(.go-next:hover, .go-next:focus-visible) .item.after {
		filter: blur(0);
	}

	.carousel {
		position: relative;
		height: 3.3rem;
		overflow: hidden;
		mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
		pointer-events: none;
		user-select: none;
	}

	.track {
		position: absolute;
		top: 50%;
		left: 50%;
		visibility: hidden;
	}

	.track.measured {
		visibility: visible;
	}

	/* Titles are placed by the script (--x) and move by transform only, so the layout
	   never changes while animating. All titles share one font size; scaling or turning
	   them distorts the text. */
	.item {
		position: absolute;
		top: 0;
		left: 0;
		max-width: 12rem;
		overflow: hidden;
		color: var(--muted);
		font-size: 0.85rem;
		white-space: nowrap;
		/* Every neighbour shares one opacity and blur; only the current title is sharp. */
		opacity: 0.7;
		filter: blur(0.8px);
		transform: translate(var(--x), -50%);
	}

	.animate .item {
		transition:
			transform 0.4s ease,
			opacity 0.4s ease,
			filter 0.4s ease,
			color 0.4s ease;
	}

	/* A title longer than max-width fades out at its end instead of showing an ellipsis. */
	.item:global([data-clipped]) {
		mask-image: linear-gradient(to right, black calc(100% - 2.5rem), transparent);
	}

	.item.current {
		color: var(--fg);
		font-weight: 600;
		opacity: 1;
		filter: blur(0);
	}

	.item.hidden {
		opacity: 0;
	}

	@media (prefers-reduced-motion: reduce) {
		.animate .item {
			transition: none;
		}
	}
</style>
