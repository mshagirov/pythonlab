import type { Attachment } from 'svelte/attachments';

/**
 * Marks an element whose text is too long for its box with a `data-clipped` attribute,
 * so CSS can fade out the end of only those. Pass whatever else the overflow depends on
 * (the text, a bold state), so the check runs again when that changes without resizing
 * the box.
 */
export function clipped(_key?: unknown): Attachment<HTMLElement> {
	return (element) => {
		// A ResizeObserver also reports once when it starts observing.
		const observer = new ResizeObserver(() =>
			element.toggleAttribute('data-clipped', element.scrollWidth > element.clientWidth),
		);
		observer.observe(element);
		return () => observer.disconnect();
	};
}
