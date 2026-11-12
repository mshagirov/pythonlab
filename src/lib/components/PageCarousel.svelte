<script lang="ts">
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

	/** 3D look of a carousel title `offset` steps away from the current one. */
	function look(offset: number): string {
		const distance = Math.min(Math.abs(offset), VISIBLE + 1);
		const side = Math.sign(offset);
		return [
			`--turn: ${-side * 30}deg`,
			// The current title is enlarged a little; neighbours shrink with distance.
			`--scale: ${distance === 0 ? 1.1 : 0.85 ** distance}`,
			`--blur: ${distance * 0.8}px`,
			`--fade: ${Math.max(0, 1 - distance * 0.25)}`,
			// Shrink toward the centre so neighbours stay close to the current title.
			`transform-origin: ${side < 0 ? 'right' : side > 0 ? 'left' : 'center'} center`,
		].join('; ');
	}

	let track = $state<HTMLElement>();
	/** Horizontal shift that centres the current title; null until first measured. */
	let shift = $state<number | null>(null);
	let animate = $state(false);

	$effect(() => {
		const element = track;
		const position = index;
		if (!element) return;

		function measure() {
			const current = element?.children[position];
			if (!(current instanceof HTMLElement)) return;
			shift = current.offsetLeft + current.offsetWidth / 2;
		}

		measure();
		// Only animate later moves, not the initial placement after page load.
		const frame = requestAnimationFrame(() => (animate = true));
		const observer = new ResizeObserver(measure);
		observer.observe(element);
		return () => {
			cancelAnimationFrame(frame);
			observer.disconnect();
		};
	});
</script>

{#if sequence.length > 1}
	<nav class="page-carousel" aria-label="Lesson pages">
		<div class="carousel" aria-hidden="true">
			<div
				class="track"
				class:animate
				class:measured={shift !== null}
				style:--shift={`${shift ?? 0}px`}
				bind:this={track}
			>
				{#each sequence as item, position (item.path)}
					{@const offset = position - index}
					<span
						class="item"
						class:current={offset === 0}
						class:before={offset < 0}
						class:after={offset > 0}
						style={look(offset)}>{item.label}</span
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
		margin-top: 3rem;
		padding-top: 0.5rem;
		border-top: 1px solid var(--border);
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
		opacity: max(var(--fade), 0.6);
	}

	.carousel {
		position: relative;
		height: 2.75rem;
		overflow: hidden;
		perspective: 40rem;
		mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
		pointer-events: none;
		user-select: none;
	}

	.track {
		position: absolute;
		top: 50%;
		left: 50%;
		display: flex;
		align-items: center;
		gap: 2.5rem;
		transform-style: preserve-3d;
		transform: translate(calc(-1 * var(--shift)), -50%);
		visibility: hidden;
	}

	.track.measured {
		visibility: visible;
	}

	.item {
		flex-shrink: 0;
		max-width: 12rem;
		overflow: hidden;
		color: var(--muted);
		font-size: 0.85rem;
		white-space: nowrap;
		text-overflow: ellipsis;
		opacity: var(--fade);
		filter: blur(var(--blur));
		transform: rotateY(var(--turn)) scale(var(--scale));
	}

	.animate,
	.animate .item {
		transition:
			transform 0.4s ease,
			opacity 0.4s ease,
			filter 0.4s ease,
			color 0.4s ease;
	}

	.item.current {
		color: var(--fg);
		font-weight: 600;
	}

	@media (prefers-reduced-motion: reduce) {
		.animate,
		.animate .item {
			transition: none;
		}
	}
</style>
