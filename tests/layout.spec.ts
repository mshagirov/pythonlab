import { expect, test } from '@playwright/test';

for (const width of [390, 1920]) {
	test(`site chrome fills the viewport at ${width}px`, async ({ page }) => {
		await page.setViewportSize({ width, height: 900 });
		await page.goto('lab1/02#install-zed');
		await expect(page.locator('.page-carousel .track')).toHaveClass(/measured/);

		for (const selector of ['header', 'footer', '.page-carousel', '.prevnext']) {
			const box = await page.locator(selector).boundingBox();
			expect(box).not.toBeNull();
			expect(box!.x).toBeCloseTo(4, 0);
			expect(box!.width).toBeCloseTo(width - 8, 0);
		}

		for (const selector of ['h1', '.lesson-content']) {
			const box = await page.locator(selector).boundingBox();
			expect(box).not.toBeNull();
			expect(box!.width).toBeCloseTo(Math.min(width - 8, 72 * 16), 0);
			expect(box!.x).toBeCloseTo((width - box!.width) / 2, 0);
		}

		const title = await page.locator('#next .title').boundingBox();
		expect(title).not.toBeNull();
		if (width > 1152) {
			expect(title!.width).toBeGreaterThan(14 * 16);
			// Titles beyond the third neighbour stay available on wide screens.
			await expect(page.locator('.page-carousel .item').nth(6)).toHaveCSS('opacity', '0.7');
		} else {
			expect(title!.width).toBeLessThanOrEqual(14 * 16);
		}

		expect(
			await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
		).toBe(true);
	});
}

test('carousel titles link directly to their pages', async ({ page }) => {
	await page.setViewportSize({ width: 1920, height: 900 });
	await page.goto('lab1/02#install-zed');
	await expect(page.locator('.page-carousel .track')).toHaveClass(/measured/);

	for (const path of ['lab1/04', 'lab1/02']) {
		const item = page.locator(`.page-carousel a[href="/pythonlab/${path}"]`);
		await item.click();
		await expect(page).toHaveURL(new URL(path, test.info().project.use.baseURL).href);
		await expect(item).toHaveAttribute('aria-current', 'page');
	}

	const item = page.locator('.page-carousel a[href="/pythonlab/lab1/03"]');
	await item.focus();
	await page.keyboard.press('Enter');
	await expect(page).toHaveURL(new URL('lab1/03', test.info().project.use.baseURL).href);
	await expect(item).toHaveAttribute('aria-current', 'page');
});
