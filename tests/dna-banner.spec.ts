import { expect, test } from '@playwright/test';

for (const viewport of [
	{ width: 1280, height: 900 },
	{ width: 390, height: 844 },
]) {
	test(`Lab 1 DNA banner matches the home banner at ${viewport.width}px`, async ({ page }) => {
		await page.setViewportSize(viewport);
		await page.goto('./');
		const homeBanner = page.getByRole('img', { name: 'Python Lab', exact: true });
		await expect(homeBanner).toBeVisible();
		const homeBounds = await homeBanner.boundingBox();

		await page.goto('lab1/');
		const dnaBanner = page.getByRole('img', { name: 'DNA pattern from the banner.py example' });
		await expect(dnaBanner).toBeVisible();
		const dnaBounds = await dnaBanner.boundingBox();
		expect(homeBounds).not.toBeNull();
		expect(dnaBounds).not.toBeNull();
		expect(dnaBounds!.width).toBeCloseTo(homeBounds!.width, 0);
		expect(dnaBounds!.height).toBeCloseTo(homeBounds!.height, 0);
		const titleBounds = await page.getByRole('heading', { level: 1 }).boundingBox();
		expect(titleBounds).not.toBeNull();
		expect(dnaBounds!.y + dnaBounds!.height).toBeLessThanOrEqual(titleBounds!.y);

		await expect(dnaBanner).toHaveJSProperty('tagName', 'IMG');
		await expect(dnaBanner).toHaveJSProperty('naturalWidth', 3312);
		await expect(dnaBanner).toHaveJSProperty('naturalHeight', 576);
		expect(await page.evaluate(() => document.body.scrollWidth <= window.innerWidth)).toBe(true);
	});
}

test('DNA banner scales continuously across viewport widths', async ({ page }) => {
	await page.goto('lab1/');
	const banner = page.getByRole('img', { name: 'DNA pattern from the banner.py example' });
	const widths = [
		...new Set([...Array.from({ length: 71 }, (_, i) => 320 + i * 16), 639, 640, 641]),
	].sort((a, b) => a - b);
	let previous: { viewport: number; width: number; height: number } | undefined;

	for (const width of widths) {
		await page.setViewportSize({ width, height: 900 });
		const bounds = await banner.boundingBox();
		expect(bounds).not.toBeNull();
		if (previous) {
			expect(bounds!.width).toBeGreaterThanOrEqual(previous.width);
			expect(bounds!.height).toBeGreaterThanOrEqual(previous.height);
			// The steepest fluid segment is the mobile 21:8 aspect ratio.
			expect(bounds!.height - previous.height).toBeLessThanOrEqual(
				((width - previous.viewport) * 8) / 21 + 0.1,
			);
		}
		expect(await page.evaluate(() => document.body.scrollWidth <= innerWidth)).toBe(true);
		previous = { viewport: width, width: bounds!.width, height: bounds!.height };
	}
});
