import { createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import python from 'shiki/langs/python.mjs';
import bash from 'shiki/langs/bash.mjs';
import githubLight from 'shiki/themes/github-light.mjs';
import githubDark from 'shiki/themes/github-dark.mjs';

export type Lang = 'python' | 'bash' | 'text';

const highlighter = await createHighlighterCore({
	langs: [python, bash],
	themes: [githubLight, githubDark],
	engine: createJavaScriptRegexEngine(),
});

export function highlight(code: string, lang: Lang): string {
	return highlighter.codeToHtml(code, {
		lang,
		themes: { light: 'github-light', dark: 'github-dark' },
		defaultColor: false,
	});
}

/** Python source as text coloured with ANSI true-colour escapes, for the terminal. */
export function highlightAnsi(code: string, dark: boolean): string {
	const theme = dark ? 'github-dark' : 'github-light';
	const defaultFg = highlighter.getTheme(theme).fg.toLowerCase();

	return highlighter
		.codeToTokensBase(code, { lang: 'python', theme })
		.map((line) =>
			line
				.map((token) => {
					const rgb = parseHexColor(token.color);
					if (!rgb || token.color?.toLowerCase() === defaultFg) return token.content;
					return `\x1b[38;2;${rgb[0]};${rgb[1]};${rgb[2]}m${token.content}\x1b[39m`;
				})
				.join(''),
		)
		.join('\n');
}

/** Parse `#RGB`, `#RGBA`, `#RRGGBB` or `#RRGGBBAA` into RGB channels, ignoring alpha. */
function parseHexColor(color: string | undefined): [number, number, number] | null {
	const hex = /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.exec(color ?? '')?.[1];
	if (!hex) return null;
	const digits = hex.length <= 4 ? hex.slice(0, 3).replace(/./g, (c) => c + c) : hex.slice(0, 6);
	const value = Number.parseInt(digits, 16);
	return [(value >> 16) & 0xff, (value >> 8) & 0xff, value & 0xff];
}
