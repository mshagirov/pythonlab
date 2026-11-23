<script lang="ts">
	import { untrack } from 'svelte';
	import { clipped } from '#lib/clipped.ts';
	import { href } from '#lib/href.ts';
	import type { NavLink } from '#lib/nav.ts';

	let {
		sequence,
		index,
	}: {
		/** The section's index page followed by its lesson pages. */
		sequence: NavLink[];
		/** Position of the current page in `sequence`. */
		index: number;
	} = $props();

	/** Space between neighbouring titles, in rem. */
	const GAP = 2.25;

	let carousel = $state<HTMLElement>();
	let track = $state<HTMLElement>();
	/**
	 * Left edge of each title within the scrollable track. Edge padding keeps the
	 * first and last titles clear of the fade without empty scrolling space.
	 */
	let positions = $state.raw<number[]>();
	let animate = $state(false);
	let dragging = $state(false);

	function scrollControls(viewport: HTMLElement) {
		let startX = 0;
		let startScroll = 0;
		let pointer: number | undefined;
		let moved = false;

		function wheel(event: WheelEvent) {
			// Trackpad horizontal gestures remain native; map a regular wheel to this axis.
			if (event.ctrlKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;
			const unit =
				event.deltaMode === WheelEvent.DOM_DELTA_LINE
					? parseFloat(getComputedStyle(viewport).lineHeight) || 16
					: event.deltaMode === WheelEvent.DOM_DELTA_PAGE
						? viewport.clientWidth
						: 1;
			const delta = event.deltaY * unit;
			const limit = viewport.scrollWidth - viewport.clientWidth;
			const target = Math.max(0, Math.min(limit, viewport.scrollLeft + delta));
			if (target === viewport.scrollLeft) return;
			event.preventDefault();
			viewport.scrollTo({ left: target, behavior: 'instant' });
		}

		function pointerDown(event: PointerEvent) {
			if (event.pointerType !== 'mouse' || event.button !== 0) return;
			pointer = event.pointerId;
			startX = event.clientX;
			startScroll = viewport.scrollLeft;
			moved = false;
		}

		function pointerMove(event: PointerEvent) {
			if (event.pointerId !== pointer) return;
			const delta = event.clientX - startX;
			if (!moved && Math.abs(delta) < 5) return;
			if (!moved) viewport.setPointerCapture(event.pointerId);
			moved = true;
			dragging = true;
			viewport.scrollTo({ left: startScroll - delta, behavior: 'instant' });
		}

		function pointerEnd(event: PointerEvent) {
			if (event.pointerId !== pointer) return;
			if (viewport.hasPointerCapture(event.pointerId)) {
				viewport.releasePointerCapture(event.pointerId);
			}
			pointer = undefined;
			dragging = false;
		}

		function click(event: MouseEvent) {
			if (!moved) return;
			// Releasing a drag over a link must not navigate.
			event.preventDefault();
			event.stopPropagation();
			moved = false;
		}

		function dragStart(event: DragEvent) {
			event.preventDefault();
		}

		viewport.addEventListener('wheel', wheel, { passive: false });
		viewport.addEventListener('pointerdown', pointerDown);
		viewport.addEventListener('pointermove', pointerMove);
		window.addEventListener('pointerup', pointerEnd);
		window.addEventListener('pointercancel', pointerEnd);
		viewport.addEventListener('click', click, true);
		viewport.addEventListener('dragstart', dragStart);
		return () => {
			viewport.removeEventListener('wheel', wheel);
			viewport.removeEventListener('pointerdown', pointerDown);
			viewport.removeEventListener('pointermove', pointerMove);
			window.removeEventListener('pointerup', pointerEnd);
			window.removeEventListener('pointercancel', pointerEnd);
			viewport.removeEventListener('click', click, true);
			viewport.removeEventListener('dragstart', dragStart);
		};
	}

	$effect(() => {
		if (!track || !carousel) return;
		const viewport = carousel;
		const content = track;
		// Runs again for a new section (`sequence`) and for a new page (`index`): the
		// current title is bold, so the widths change with it.
		const count = sequence.length;
		const current = index;
		const items = [...track.children] as HTMLElement[];
		if (items.length !== count || !items[current]) return;

		function measure() {
			const gap = GAP * parseFloat(getComputedStyle(document.documentElement).fontSize);
			const widths = items.map((item) => item.offsetWidth);
			const padding = viewport.clientWidth * 0.05;
			const total = widths.reduce((sum, width) => sum + width, 0) + gap * (count - 1);
			// Centre the whole sequence if it fits; otherwise stop at the outer titles.
			const left: number[] = [Math.max(padding, (viewport.clientWidth - total) / 2)];
			for (let i = 1; i < count; i++) left[i] = left[i - 1] + widths[i - 1] + gap;
			positions = left;
			const width = Math.max(viewport.clientWidth, left[count - 1] + widths[count - 1] + padding);
			// Apply the width before scrolling, so the browser uses the new scroll range.
			content.style.width = `${width}px`;
			viewport.scrollTo({
				left: Math.max(
					0,
					Math.min(
						width - viewport.clientWidth,
						left[current] + widths[current] / 2 - viewport.clientWidth / 2,
					),
				),
				behavior:
					untrack(() => animate) && !matchMedia('(prefers-reduced-motion: reduce)').matches
						? 'smooth'
						: 'instant',
			});
		}

		measure();
		// Only animate later moves, not the initial placement after page load.
		const frame = requestAnimationFrame(() => (animate = true));
		// Transforms don't change offsetWidth, so this only fires for real size changes
		// such as web fonts loading.
		const observer = new ResizeObserver(measure);
		observer.observe(viewport);
		for (const item of items) observer.observe(item);
		return () => {
			cancelAnimationFrame(frame);
			observer.disconnect();
		};
	});
</script>

{#if sequence.length > 1}
	<nav class="page-carousel" aria-label="Lesson pages">
		<div class="carousel" class:dragging bind:this={carousel} {@attach scrollControls}>
			<div class="track" class:animate class:measured={!!positions} bind:this={track}>
				{#each sequence as item, position (item.path)}
					{@const offset = position - index}
					{@const current = offset === 0}
					<a
						class="item"
						class:current
						href={href(item.path)}
						aria-current={current ? 'page' : undefined}
						style:--x={`${positions?.[position] ?? 0}px`}
						{@attach clipped(current)}>{item.label}</a
					>
				{/each}
			</div>
		</div>
	</nav>
{/if}

<style>
	.page-carousel {
		position: relative;
		flex-shrink: 0;
		margin-bottom: 0.3rem;
	}

	.item:focus-visible {
		outline: 2px solid var(--link);
		outline-offset: -2px;
	}

	.item:is(:hover, :focus-visible) {
		filter: blur(0);
	}

	.carousel {
		position: relative;
		height: 3.3rem;
		overflow-x: auto;
		overflow-y: hidden;
		overscroll-behavior-x: none;
		scrollbar-width: none;
		mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
		user-select: none;
		cursor: grab;
	}

	.carousel.dragging,
	.carousel.dragging .item {
		cursor: grabbing;
	}

	.carousel::-webkit-scrollbar {
		display: none;
	}

	.track {
		position: relative;
		height: 100%;
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
		top: 50%;
		left: 0;
		max-width: 12rem;
		overflow: hidden;
		color: var(--muted);
		font-size: 0.85rem;
		text-decoration: none;
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

	@media (prefers-reduced-motion: reduce) {
		.animate .item {
			transition: none;
		}
	}
</style>
