import { codeToTokensBase, codeToTokensWithThemes, createShikiPrimitive } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import python from 'shiki/langs/python.mjs';
import bash from 'shiki/langs/bash.mjs';
import githubLight from 'shiki/themes/github-light.mjs';
import githubDark from 'shiki/themes/github-dark.mjs';

export type Lang = 'python' | 'bash' | 'text';

// The primitive leaves out Shiki's HTML renderer: `highlight` writes the little HTML this site
// needs itself. The full grammars stay until the precompiled ones highlight identically, which
// they do not yet for Python and Bash (shikijs/shiki#918).
const shiki = createShikiPrimitive({
	langs: [python, bash],
	themes: [githubLight, githubDark],
	engine: createJavaScriptRegexEngine(),
});

const THEMES = { light: 'github-light', dark: 'github-dark' } as const;
const FG = { light: shiki.getTheme(THEMES.light).fg, dark: shiki.getTheme(THEMES.dark).fg };

/** Strip leading and trailing blank lines only, keeping the first line's indentation. */
export function trimBlankLines(code: string): string {
	return code.replace(/^(?:[ \t]*\r?\n)+/, '').replace(/(?:\r?\n[ \t]*)+$/, '');
}

/**
 * Highlight code with the light and dark theme colours the stylesheet picks between.
 * `tabindex="0"` lets keyboard users scroll a wide block; `focusable = false` is for the editor's
 * decorative highlight layer.
 */
export function highlight(code: string, lang: Lang, focusable = true): string {
	const lines = codeToTokensWithThemes(shiki, code, { lang, themes: THEMES }).map((line) => {
		const runs: { style: string; text: string }[] = [];
		for (const token of line) {
			const light = token.variants.light.color;
			const dark = token.variants.dark.color;
			const plain =
				(!light || light.toLowerCase() === FG.light) && (!dark || dark.toLowerCase() === FG.dark);
			const style = plain ? '' : `--shiki-light:${light};--shiki-dark:${dark}`;
			const last = runs.at(-1);
			if (last && (!token.content.trim() || last.style === style)) last.text += token.content;
			else runs.push({ style, text: token.content });
		}
		const content = runs
			.map(({ style, text }) =>
				style ? `<span style="${style}">${escapeHtml(text)}</span>` : escapeHtml(text),
			)
			.join('');
		return `<span class="line">${content}</span>`;
	});

	const tabindex = focusable ? ' tabindex="0"' : '';
	const style = `--shiki-light:${FG.light};--shiki-dark:${FG.dark}`;
	return `<pre class="shiki" style="${style}"${tabindex}><code>${lines.join('\n')}</code></pre>`;
}

/** Python source as text coloured with ANSI true-colour escapes, for the terminal. */
export function highlightAnsi(code: string, dark: boolean): string {
	const theme = dark ? THEMES.dark : THEMES.light;
	const defaultFg = FG[dark ? 'dark' : 'light'].toLowerCase();

	return codeToTokensBase(shiki, code, { lang: 'python', theme })
		.map((line) =>
			line
				.map((token) => {
					const color = token.color?.toLowerCase();
					if (!color || color === defaultFg) return token.content;
					const rgb = parseHexColor(color);
					return rgb
						? `\x1b[38;2;${rgb[0]};${rgb[1]};${rgb[2]}m${token.content}\x1b[39m`
						: token.content;
				})
				.join(''),
		)
		.join('\n');
}

function escapeHtml(text: string): string {
	return text.replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

/** Parse `#RRGGBB` into RGB channels; every colour in both themes is of that form. */
function parseHexColor(color: string): [number, number, number] | null {
	const hex = /^#([0-9a-f]{6})$/i.exec(color)?.[1];
	if (!hex) return null;
	const value = Number.parseInt(hex, 16);
	return [(value >> 16) & 0xff, (value >> 8) & 0xff, value & 0xff];
}
