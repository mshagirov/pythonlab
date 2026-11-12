import { resolve } from '$app/paths';
import { goto } from '$app/navigation';

/** Capture a section target before reactive navigation updates the link's href. */
export function navigateStep(event: MouseEvent): void {
	if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
		return;
	const link = event.currentTarget;
	if (!(link instanceof HTMLAnchorElement)) return;
	const target = new URL(link.href);
	if (
		target.origin !== location.origin ||
		target.pathname !== location.pathname ||
		target.search !== location.search ||
		!target.hash
	)
		return;

	// SvelteKit updates page.url before native fragment navigation completes.
	// A reactive Next/Previous href can then change before the default action.
	event.preventDefault();
	void goto(target, { reset: false });
}

/**
 * Turn a nav path (`''`, `introduction/`, `introduction/02`) into a link URL,
 * honouring the configured base path and the section-index trailing slash.
 */
export function href(path: string): string {
	return resolve('') + path;
}

/** Turn a resolved pathname such as `/pythonlab/introduction/02` into a nav path. */
export function toNavPath(pathname: string): string {
	const base = resolve('');
	return pathname.startsWith(base) ? pathname.slice(base.length) : pathname.slice(1);
}
