/**
 * playwright.config.ts
 * Playwright configuration for UX workflow validation.
 * Tests run against the static E2E harness served on port 6007.
 * In CI, the harness is bundled by esbuild then served by Python's http.server.
 */

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
  use: {
    baseURL: 'http://localhost:6007',
    trace: 'on-first-retry',
    actionTimeout: 15_000,
  },
  expect: { timeout: 15_000 },
  timeout: 60_000,
  webServer: {
    command: 'python3 -m http.server 6007 --directory e2e/harness',
    url: 'http://localhost:6007',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
