import { expect, test } from '@playwright/test';

for (const banner of [
	{ route: './', name: /^Python Lab$/ },
	{ route: 'introduction/', name: /^Python learning journey:/ },
	{ route: 'lab1/', name: /^DNA pattern from the banner.py example$/ },
]) {
	test(`${banner.route} uses a PNG with the home logo colours`, async ({ page }) => {
		await page.goto(banner.route);
		const image = page.getByRole('img', { name: banner.name });
		await expect(image).toHaveJSProperty('tagName', 'IMG');
		await expect(image).toHaveAttribute('src', /\.png$/);
		const palette = await image.evaluate(async (element: HTMLImageElement) => {
			await element.decode();
			const canvas = document.createElement('canvas');
			canvas.width = element.naturalWidth;
			canvas.height = element.naturalHeight;
			const context = canvas.getContext('2d')!;
			context.drawImage(element, 0, 0);
			const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
			const result = { blue: false, yellow: false, transparent: false };
			for (let i = 0; i < data.length; i += 4) {
				if (data[i + 3] === 0) result.transparent = true;
				if (data[i + 3] !== 255) continue;
				if (data[i] === 55 && data[i + 1] === 118 && data[i + 2] === 171) {
					result.blue = true; // #3776ab
				}
				if (data[i] === 224 && data[i + 1] === 169 && data[i + 2] === 0) {
					result.yellow = true; // #e0a900
				}
			}
			return result;
		});
		expect(palette).toEqual({ blue: true, yellow: true, transparent: true });
	});
}
