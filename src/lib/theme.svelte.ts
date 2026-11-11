import { browser } from '$app/env';

export type Theme = 'system' | 'light' | 'dark';

const KEY = 'theme';

function read(): Theme {
	if (!browser) return 'system';
	try {
		const stored = localStorage.getItem(KEY);
		return stored === 'light' || stored === 'dark' ? stored : 'system';
	} catch {
		return 'system';
	}
}

let current: Theme = $state(read());

function apply(theme: Theme): void {
	if (!browser) return;
	try {
		if (theme === 'system') {
			delete document.documentElement.dataset.theme;
			localStorage.removeItem(KEY);
		} else {
			document.documentElement.dataset.theme = theme;
			localStorage.setItem(KEY, theme);
		}
	} catch {}
}

/** The current theme. Reactive when read inside an effect or derived. */
export function getTheme(): Theme {
	return current;
}

export function cycleTheme(): void {
	current = current === 'system' ? 'light' : current === 'light' ? 'dark' : 'system';
	apply(current);
}
