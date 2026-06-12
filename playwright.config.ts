/**
 * playwright.config.ts
 * Playwright configuration for UX workflow validation.
 * Tests run against a locally-served Storybook static build.
 * In CI, Storybook is built first then the static output is served on port 6007.
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
  // Increase expect() assertion timeout for CI — toBeAttached() default is 5 s
  expect: { timeout: 10_000 },
  use: {
    baseURL: 'http://localhost:6007',
    trace: 'on-first-retry',
    // Prevent locator.evaluate() from hanging 30s when element is not in DOM
    actionTimeout: 10_000,
  },
  webServer: {
    command: 'npx serve e2e/harness -l 6007',
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
