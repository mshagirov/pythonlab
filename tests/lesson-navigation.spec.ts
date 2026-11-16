import { expect, test } from '@playwright/test';
import { locate, sections } from '../src/lib/nav';

for (const section of sections) {
	for (const lesson of section.pages) {
		if (!lesson.steps?.length) continue;

		test(`${lesson.path}: sections hydrate and navigation displays the target`, async ({
			page,
		}) => {
			const errors: string[] = [];
			page.on('pageerror', (error) => errors.push(error.message));
			page.on('console', (message) => {
				if (/hydration/i.test(message.text())) errors.push(message.text());
			});

			for (const step of lesson.steps!) {
				// Reload each deep link to exercise server/client agreement, including optional steps.
				await page.goto(`${lesson.path}#${step.id}`);
				// This class is set by a client-side effect, so SSR alone cannot pass the assertions.
				await expect(page.locator('.page-carousel .track')).toHaveClass(/measured/);
				await expect(page.locator('.lesson-content > section:not([hidden])')).toHaveCount(1);
				await expect(page.locator(`section[id="${step.id}"]`)).toBeVisible();
				await expect(page.locator('h1')).toHaveText(lesson.title);

				const next = locate(lesson.path, `#${step.id}`)?.next;
				if (next) {
					await page.locator('#next').click();
					await expect(page).toHaveURL(new URL(next.path, test.info().project.use.baseURL).href);
					const target = next.path.split('#')[1];
					if (target) {
						await expect(page.locator('.lesson-content > section:not([hidden])')).toHaveCount(1);
						await expect(page.locator(`section[id="${target}"]`)).toBeVisible();
					}
				}
			}

			expect(errors).toEqual([]);
		});
	}
}

test('Zed offers an optional VS Code path while Next skips it', async ({ page }) => {
	await page.goto('lab1/02#install-zed');
	await expect(page.locator('.page-carousel .track')).toHaveClass(/measured/);
	await expect(page.locator('#next')).toHaveAttribute('href', '/pythonlab/lab1/03#terminal');
	await expect(page.locator('.step-track a[href="#install-vscode"]')).toHaveCount(0);
	await page.getByRole('link', { name: 'optional VS Code installation instructions' }).click();
	await expect(page.locator('#install-vscode')).toBeVisible();
	await expect(page.locator('.step-track li:not(.reached)')).toHaveCount(0);
	await page.locator('#next').click();
	await expect(page.locator('#terminal')).toBeVisible();
});
