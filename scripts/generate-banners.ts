import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import { journeyArt } from './journey-art.ts';

// The exact solid colours in pythonlab-banner.png and pythonlab-icon.svg.
const PYTHON_BLUE = '#3776ab';
const PYTHON_YELLOW = '#e0a900';
const INK = '#0550ae';
const HEIGHT = 576;
const DESKTOP_WIDTH = 3312;
const MOBILE_WIDTH = 1512;
const font = "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace";

function journeySvg(compact: boolean): string {
	const lines = journeyArt(compact);
	const columns = compact ? 80 : 192;
	const head = (compact ? 36 : 40) - 6;
	const snakeBottom = Array.from({ length: columns }, (_, x) =>
		lines.reduce(
			(bottom, line, y) =>
				y >= 14 && x >= 2 && x <= head + 3 && (line[x] === '●' || line[x] === '○') ? y : bottom,
			-1,
		),
	);
	const rows = lines.map((line, y) => {
		const cells = [...line].map((symbol, x) => {
			const isSnake = y >= 14 && x >= 2 && x <= head + 3 && (symbol === '●' || symbol === '○');
			const colour = isSnake
				? y === snakeBottom[x] && lines[y - 1]?.[x] === '●'
					? PYTHON_YELLOW
					: PYTHON_BLUE
				: INK;
			return `<tspan fill="${colour}">${symbol}</tspan>`;
		});
		return `<text x="0" y="${y + 0.85}" textLength="${columns}" lengthAdjust="spacingAndGlyphs">${cells.join('')}</text>`;
	});
	return `<svg xmlns="http://www.w3.org/2000/svg" width="${compact ? MOBILE_WIDTH : DESKTOP_WIDTH}" height="${HEIGHT}" viewBox="0 0 ${columns} 32"><style>text{font-family:${font};font-size:1px;white-space:pre}</style>${rows.join('')}</svg>`;
}

function dnaSvg(): string {
	const templates = ['⬭       o ', '| ⬭   o | ', '| | ⬭ | | ', '| o   ⬭ | ', 'o       ⬭ '];
	const rows = templates.map((template, row) => {
		const cells = [...template.repeat(5)].map((symbol, index) => {
			const column = index % template.length;
			const blue = symbol === '⬭' || (symbol === '|' && (row === 3 ? column >= 6 : column <= 4));
			return `<tspan fill="${blue ? PYTHON_BLUE : PYTHON_YELLOW}">${symbol}</tspan>`;
		});
		return `<text x="48" y="${88 + row * 112}" textLength="3216" lengthAdjust="spacingAndGlyphs">${cells.join('')}</text>`;
	});
	return `<svg xmlns="http://www.w3.org/2000/svg" width="${DESKTOP_WIDTH}" height="${HEIGHT}" viewBox="0 0 ${DESKTOP_WIDTH} ${HEIGHT}"><style>text{fill:${INK};font-family:${font};font-size:104px;white-space:pre}</style>${rows.join('')}</svg>`;
}

const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL });
try {
	for (const image of [
		{ name: 'dna-banner.png', width: DESKTOP_WIDTH, svg: dnaSvg() },
		{ name: 'python-journey-banner.png', width: DESKTOP_WIDTH, svg: journeySvg(false) },
		{ name: 'python-journey-banner-mobile.png', width: MOBILE_WIDTH, svg: journeySvg(true) },
	]) {
		const page = await browser.newPage({
			viewport: { width: image.width, height: HEIGHT },
			deviceScaleFactor: 1,
		});
		await page.setContent(
			`<!doctype html><html><head><style>html,body{margin:0;background:transparent}svg{display:block}</style></head><body>${image.svg}</body></html>`,
		);
		await page.evaluate(() => document.fonts.ready);
		const path = fileURLToPath(new URL(`../static/${image.name}`, import.meta.url));
		await page.screenshot({ path, omitBackground: true });
		await page.close();
		console.log(`Generated ${image.name}`);
	}
} finally {
	await browser.close();
}
