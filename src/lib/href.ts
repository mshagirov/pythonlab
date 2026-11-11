import { resolve } from '$app/paths';

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
