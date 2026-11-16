import { defineConfig } from '@playwright/test';
import process from 'node:process';

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:5174/pythonlab/';

export default defineConfig({
	testDir: './tests',
	use: {
		baseURL,
		browserName: 'chromium',
		channel: process.env.PLAYWRIGHT_CHANNEL,
	},
	webServer: process.env.PLAYWRIGHT_BASE_URL
		? undefined
		: {
				command: 'npm run dev -- --port 5174 --strictPort',
				url: baseURL,
				reuseExistingServer: false,
			},
});
