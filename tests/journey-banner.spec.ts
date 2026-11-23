import { expect, test } from '@playwright/test';
import { journeyArt } from '../scripts/journey-art.ts';

test('journey artwork uses only the requested symbols', () => {
	for (const compact of [false, true]) {
		const lines = journeyArt(compact);
		expect(lines).toHaveLength(32);
		for (const line of lines) {
			expect(line).toHaveLength(compact ? 80 : 192);
			expect(line).toMatch(/^[●○⋅■□▪ ]+$/u);
		}
	}
});

test('the N in Python has a compact, connected diagonal', () => {
	for (const compact of [false, true]) {
		const x = compact ? 22 : 26;
		expect(
			journeyArt(compact)
				.slice(2, 7)
				.map((row) => row.slice(x, x + 4)),
		).toEqual(['▪  ▪', '▪▪ ▪', '▪▪ ▪', '▪ ▪▪', '▪  ▪']);
	}
});

for (const width of [390, 639, 640, 641, 768, 1280]) {
	test(`journey banner matches the DNA banner at ${width}px`, async ({ page }) => {
		const errors: string[] = [];
		page.on('pageerror', (error) => errors.push(error.message));
		await page.setViewportSize({ width, height: 900 });
		await page.goto('lab1/');
		const dnaBounds = await page
			.getByRole('img', { name: 'DNA pattern from the banner.py example' })
			.boundingBox();

		await page.goto('introduction/');
		const banner = page.getByRole('img', { name: /^Python learning journey:/ });
		await expect(banner).toBeVisible();
		const bounds = await banner.boundingBox();
		const titleBounds = await page.getByRole('heading', { level: 1 }).boundingBox();
		expect(bounds).not.toBeNull();
		expect(dnaBounds).not.toBeNull();
		expect(titleBounds).not.toBeNull();
		expect(bounds!.width).toBeCloseTo(dnaBounds!.width, 2);
		expect(bounds!.height).toBeCloseTo(dnaBounds!.height, 2);
		expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(titleBounds!.y);
		await expect(banner).toHaveJSProperty('tagName', 'IMG');
		await expect(banner).toHaveJSProperty('naturalWidth', 3312);
		await expect(banner).toHaveJSProperty('naturalHeight', 576);
		expect(await page.evaluate(() => document.body.scrollWidth <= innerWidth)).toBe(true);
		expect(errors).toEqual([]);
	});
}

test('the painted journey image scales continuously, not just its layout box', async ({ page }) => {
	await page.goto('introduction/');
	const banner = page.getByRole('img', { name: /^Python learning journey:/ });
	const widths = [
		...new Set([...Array.from({ length: 81 }, (_, i) => 320 + i * 16), 639, 640, 641]),
	].sort((a, b) => a - b);
	let previous: { viewport: number; width: number; height: number; source: string } | undefined;

	for (const width of widths) {
		await page.setViewportSize({ width, height: 900 });
		const painted = await banner.evaluate(async (image: HTMLImageElement) => {
			await image.decode();
			const bounds = image.getBoundingClientRect();
			const scale = Math.min(
				bounds.width / image.naturalWidth,
				bounds.height / image.naturalHeight,
			);
			return {
				width: image.naturalWidth * scale,
				height: image.naturalHeight * scale,
				source: image.currentSrc,
			};
		});
		if (previous) {
			expect(painted.source).toBe(previous.source);
			expect(painted.width).toBeGreaterThanOrEqual(previous.width - 0.1);
			expect(painted.height).toBeGreaterThanOrEqual(previous.height - 0.1);
			expect(painted.width - previous.width).toBeLessThanOrEqual(width - previous.viewport + 0.1);
			expect(painted.height - previous.height).toBeLessThanOrEqual(
				((width - previous.viewport) * 4) / 23 + 0.1,
			);
		}
		expect(await page.evaluate(() => document.body.scrollWidth <= innerWidth)).toBe(true);
		previous = { viewport: width, ...painted };
	}
});
