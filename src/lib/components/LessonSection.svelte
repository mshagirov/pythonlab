<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { toNavPath } from '#lib/href.ts';
	import { activeStep, findPage } from '#lib/nav.ts';

	let { id, children }: { id: string; children: Snippet } = $props();

	const steps = $derived(findPage(toNavPath(page.url.pathname))?.steps ?? []);
	const active = $derived(steps[activeStep(steps, page.url.hash)]?.id === id);
	const title = $derived(steps.find((step) => step.id === id)?.title);

	function resetFocus(section: HTMLElement): void {
		const focused = document.activeElement;
		if (focused !== document.body && (!focused || !section.contains(focused))) return;

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

	/** Runs while this is the section being read. */
	function reading(section: HTMLElement) {
		// Start at the top, after native hash scrolling and the section's DOM update.
		const start = requestAnimationFrame(() => {
			resetFocus(section);
			section.scrollTo({ top: 0, left: 0, behavior: 'instant' });
			window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
		});

		// Native fragment focus and restored form focus may arrive after hydration.
		let loaded = 0;
		function onload() {
			cancelAnimationFrame(loaded);
			loaded = requestAnimationFrame(() => resetFocus(section));
		}
		window.addEventListener('load', onload);
		window.addEventListener('pageshow', onload);

		// The layout shows a haze over the bottom edge while there is more to scroll to.
		const container = section.parentElement;
		function updateOverflow() {
			const remaining = section.scrollHeight - section.clientHeight - section.scrollTop;
			container?.classList.toggle('more-below', remaining > 2);
		}
		// Watch content as well as the panel: running code can add or resize output.
		// A ResizeObserver also reports once when it starts observing.
		const observer = new ResizeObserver(updateOverflow);
		observer.observe(section);
		for (const child of section.children) observer.observe(child);
		section.addEventListener('scroll', updateOverflow, { passive: true });

		return () => {
			cancelAnimationFrame(start);
			cancelAnimationFrame(loaded);
			window.removeEventListener('load', onload);
			window.removeEventListener('pageshow', onload);
			observer.disconnect();
			section.removeEventListener('scroll', updateOverflow);
			container?.classList.remove('more-below');
		};
	}
</script>

<!-- Keep editors mounted so edits and output survive section changes. -->
<section {id} hidden={!active} aria-label={title} {@attach active && reading}>
	{@render children()}
</section>
