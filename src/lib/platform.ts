/** True on macOS and iOS, where shortcuts use ⌘ instead of Ctrl. Browser-only. */
export function isApple(): boolean {
	return /Mac|iPhone|iPad/.test(navigator.platform);
}
