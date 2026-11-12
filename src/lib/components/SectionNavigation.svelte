<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { href, toNavPath } from '#lib/href.ts';
	import { neighbours } from '#lib/nav.ts';

	let { steps, active }: { steps: { id: string; title: string }[]; active: number } = $props();
	const current = $derived(neighbours(toNavPath(page.url.pathname), page.url.hash));

	function resetReadingFocus(section: HTMLElement | null): void {
		const focused = document.activeElement;
		if (focused !== document.body && (!focused || !section?.contains(focused))) return;

		// Gecko can focus a scroll frame while reporting BODY as activeElement.
		// Explicitly focus a neutral target before blurring to clear that state too.
		const body = document.body;
		const tabindex = body.getAttribute('tabindex');
		body.setAttribute('tabindex', '-1');
		body.focus({ preventScroll: true });
		body.blur();
		if (tabindex === null) body.removeAttribute('tabindex');
		else body.setAttribute('tabindex', tabindex);
	}

	onMount(() => {
		let frame: number;
		function resetAfterLoad() {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				const sectionId = steps[active]?.id;
				resetReadingFocus(sectionId ? document.getElementById(sectionId) : null);
			});
		}

		// Native fragment focus and restored form focus may arrive after hydration.
		window.addEventListener('load', resetAfterLoad);
		window.addEventListener('pageshow', resetAfterLoad);
		if (document.readyState === 'complete') resetAfterLoad();
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('load', resetAfterLoad);
			window.removeEventListener('pageshow', resetAfterLoad);
		};
	});

	$effect(() => {
		const url = page.url.href;
		const sectionId = steps[active]?.id;
		// Run after native hash scrolling and the new section's DOM update.
		const frame = requestAnimationFrame(() => {
			if (page.url.href === url) {
				if (sectionId) {
					const section = document.getElementById(sectionId);
					resetReadingFocus(section);
					section?.scrollTo({ top: 0, left: 0, behavior: 'instant' });
				}
				window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
			}
		});
		return () => cancelAnimationFrame(frame);
	});

	$effect(() => {
		const sectionId = steps[active]?.id;
		const section = sectionId ? document.getElementById(sectionId) : null;
		const container = section?.parentElement;
		if (!section || !container) return;

		function updateOverflow() {
			if (!section || !container) return;
			const remaining = section.scrollHeight - section.clientHeight - section.scrollTop;
			container.classList.toggle('more-below', remaining > 2);
		}

		// Watch content as well as the panel: running code can add or resize output.
		const observer = new ResizeObserver(updateOverflow);
		observer.observe(section);
		for (const child of section.children) observer.observe(child);
		section.addEventListener('scroll', updateOverflow, { passive: true });
		updateOverflow();

		return () => {
			observer.disconnect();
			section.removeEventListener('scroll', updateOverflow);
			container.classList.remove('more-below');
		};
	});
</script>

<nav class="section-navigation" aria-label="Lesson sections">
	<div class="section-controls">
		<span class="section-count" aria-live="polite">
			<span class="current-number">{active + 1}</span> / {steps.length}
		</span>
		<a
			class="arrow"
			href={current?.previous ? href(current.previous.path) : undefined}
			aria-label={current?.previous?.label ?? 'Previous'}
			aria-disabled={!current?.previous}
			data-sveltekit-noscroll>←</a
		>
		<a
			class="arrow"
			href={current?.next ? href(current.next.path) : undefined}
			aria-label={current?.next?.label ?? 'Next'}
			aria-disabled={!current?.next}
			data-sveltekit-noscroll>→</a
		>
	</div>
	<ol class="step-track">
		{#each steps as step, index}
			<li class:reached={index <= active}>
				<a
					href={`#${step.id}`}
					aria-label={`Section ${index + 1} of ${steps.length}: ${step.title}`}
					aria-current={index === active ? 'step' : undefined}
					title={step.title}
					data-sveltekit-noscroll><span class="node"></span></a
				>
			</li>
		{/each}
	</ol>
</nav>

<style>
	.section-navigation {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
		align-items: center;
		gap: 0.4rem 0.5rem;
		margin: -0.5rem 0 1.5rem;
		width: 100%;
		max-width: 100%;
	}

	.section-controls {
		grid-column: 3;
		grid-row: 1;
		justify-self: end;
		display: flex;
		flex-shrink: 0;
		align-items: center;
		gap: 0.5rem;
	}

	.section-count {
		margin-right: 0.5rem;
		color: var(--muted);
		font-size: 0.875rem;
		font-variant-numeric: tabular-nums;
	}

	.current-number {
		color: var(--fg);
		font-weight: 650;
	}

	.arrow {
		display: grid;
		place-items: center;
		width: 2rem;
		height: 2rem;
		border: 1px solid var(--border);
		border-radius: 50%;
		text-decoration: none;
	}

	.arrow[aria-disabled='true'] {
		color: var(--muted);
		opacity: 0.4;
	}

	.step-track {
		grid-column: 2;
		grid-row: 1;
		justify-self: center;
		display: flex;
		flex-shrink: 0;
		max-width: 100%;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	@media (max-width: 44rem) {
		.section-navigation {
			grid-template-columns: minmax(0, 1fr);
		}

		.section-controls {
			grid-column: 1;
		}

		.step-track {
			grid-column: 1;
			grid-row: 2;
		}
	}

	.step-track li {
		position: relative;
		min-width: 0;
		display: flex;
		align-items: center;
	}

	.step-track li + li::before {
		content: '';
		position: absolute;
		right: calc(50% + 0.375rem);
		width: calc(100% - 0.75rem);
		height: 2px;
		background: var(--border);
		pointer-events: none;
	}

	.step-track li.reached + li.reached::before {
		background: var(--link);
	}

	.step-track a {
		display: grid;
		place-items: center;
		width: 1.75rem;
		max-width: 100%;
		height: 2rem;
		border-radius: 4px;
	}

	.node {
		width: 0.5rem;
		height: 0.5rem;
		border: 2px solid var(--border);
		border-radius: 50%;
		background: var(--bg);
	}

	.reached .node {
		border-color: var(--link);
		background: var(--link);
	}

	[aria-current='step'] .node {
		outline: 2px solid var(--link);
		outline-offset: 3px;
	}

	a:focus-visible {
		outline: 2px solid var(--link);
		outline-offset: 3px;
	}

	.arrow[href]:hover,
	.step-track a:hover {
		background: var(--code-bg);
	}
</style>
