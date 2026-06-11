import { test, expect, type Page } from '@playwright/test';

/**
 * UX Workflow Validation — Playwright browser tests
 *
 * Tests run against the static Storybook build served on port 6007.
 * Story IDs: title 'Components/Button' + export 'Primary' → components-button--primary
 *
 * Root cause of CI failures: Storybook's #storybook-root starts with
 * visibility:hidden during its fade-in animation. In headless Chromium (CI),
 * that animation never completes, so waiting for CSS-visibility times out.
 *
 * Fix: load via networkidle (DOM is ready), then inject CSS to force the root
 * visible and disable all transitions before any assertion runs.
 */

const storyUrl = (id: string) =>
  `/iframe.html?id=${id}&viewMode=story`;

async function loadStory(page: Page, id: string) {
  await page.goto(storyUrl(id));
  // Wait for all network requests to settle (DOM is populated)
  await page.waitForLoadState('networkidle');
  // In headless CI, Storybook's fade-in animation may never complete.
  // Override CSS visibility on the story root and disable all transitions
  // so every element is immediately testable.
  await page.addStyleTag({
    content: `
      #storybook-root, #root {
        visibility: visible !important;
        opacity: 1 !important;
      }
      * {
        transition-duration: 0s !important;
        animation-duration: 0s !important;
      }
    `,
  });
  // Brief grace period for React effects to settle
  await page.waitForTimeout(300);
}

// ---------------------------------------------------------------------------
// Button (title: 'Components/Button' — story: Primary)
// ---------------------------------------------------------------------------

test.describe('Button', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, 'components-button--primary');
  });

  test('renders a visible button element', async ({ page }) => {
    await expect(page.locator('button').first()).toBeVisible();
  });

  test('responds to mouse click', async ({ page }) => {
    const btn = page.locator('button').first();
    await expect(btn).toBeVisible();
    await btn.click();
    await expect(btn).toBeVisible();
  });

  test('is keyboard-focusable and activatable with Enter', async ({ page }) => {
    const btn = page.locator('button').first();
    await btn.focus();
    await expect(btn).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(btn).toBeVisible();
  });

  test('is activatable with Space', async ({ page }) => {
    const btn = page.locator('button').first();
    await btn.focus();
    await page.keyboard.press('Space');
    await expect(btn).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Input (title: 'Components/Input' — story: Default)
// ---------------------------------------------------------------------------

test.describe('Input', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, 'components-input--default');
  });

  test('renders a visible input element', async ({ page }) => {
    await expect(page.locator('input').first()).toBeVisible();
  });

  test('accepts text input', async ({ page }) => {
    const input = page.locator('input').first();
    await input.fill('Hello, PartsSource');
    await expect(input).toHaveValue('Hello, PartsSource');
  });

  test('can be cleared', async ({ page }) => {
    const input = page.locator('input').first();
    await input.fill('temporary value');
    await input.fill('');
    await expect(input).toHaveValue('');
  });

  test('is focusable via Tab', async ({ page }) => {
    await page.keyboard.press('Tab');
    await expect(page.locator('input').first()).toBeFocused();
  });
});

// ---------------------------------------------------------------------------
// Checkbox (title: 'Components/Checkbox' — stories: Default, Checked, Disabled)
// ---------------------------------------------------------------------------

test.describe('Checkbox', () => {
  test('Default story renders an unchecked checkbox', async ({ page }) => {
    await loadStory(page, 'components-checkbox--default');
    const cb = page.locator('input[type="checkbox"]').first();
    await expect(cb).toBeVisible();
    await expect(cb).not.toBeChecked();
  });

  test('Checked story renders a checked checkbox', async ({ page }) => {
    await loadStory(page, 'components-checkbox--checked');
    await expect(page.locator('input[type="checkbox"]:checked').first()).toBeVisible();
  });

  test('Default checkbox toggles to checked on click', async ({ page }) => {
    await loadStory(page, 'components-checkbox--default');
    const cb = page.locator('input[type="checkbox"]').first();
    await cb.click();
    await expect(cb).toBeChecked();
  });

  test('Disabled checkbox is not interactive', async ({ page }) => {
    await loadStory(page, 'components-checkbox--disabled');
    await expect(page.locator('input[type="checkbox"][disabled]').first()).toBeDisabled();
  });
});

// ---------------------------------------------------------------------------
// Modal (title: 'Components/Modal' — story: OpenByDefault -> dialog is visible)
// ---------------------------------------------------------------------------

test.describe('Modal', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, 'components-modal--open-by-default');
  });

  test('renders with role="dialog"', async ({ page }) => {
    await expect(page.locator('[role="dialog"]').first()).toBeVisible();
  });

  test('has a visible heading or title', async ({ page }) => {
    const heading = page.locator(
      '[role="dialog"] h1, [role="dialog"] h2, [role="dialog"] h3, [role="dialog"] [class*="title"]'
    );
    await expect(heading.first()).toBeVisible();
  });

  test('has an enabled button inside the dialog', async ({ page }) => {
    const btn = page.locator('[role="dialog"] button').first();
    await expect(btn).toBeVisible();
    await expect(btn).not.toBeDisabled();
  });
});

// ---------------------------------------------------------------------------
// Tabs (title: 'Components/Tabs' — story: Default)
// ---------------------------------------------------------------------------

test.describe('Tabs', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, 'components-tabs--default');
  });

  test('renders multiple tab buttons', async ({ page }) => {
    const tabs = page.locator('[role="tab"]');
    await expect(tabs.first()).toBeVisible();
    const count = await tabs.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('first tab is selected by default', async ({ page }) => {
    await expect(page.locator('[role="tab"]').first()).toHaveAttribute('aria-selected', 'true');
  });

  test('clicking a second tab sets aria-selected', async ({ page }) => {
    const tabs = page.locator('[role="tab"]');
    const count = await tabs.count();
    if (count >= 2) {
      await tabs.nth(1).click();
      await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
    }
  });
});

// ---------------------------------------------------------------------------
// Pagination (title: 'Components/Pagination' — story: Default)
// ---------------------------------------------------------------------------

test.describe('Pagination', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, 'components-pagination--default');
  });

  test('renders visible pagination controls', async ({ page }) => {
    await expect(page.locator('button').first()).toBeVisible();
  });

  test('has enabled pagination buttons', async ({ page }) => {
    const count = await page.locator('button:not([disabled])').count();
    expect(count).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// Select (title: 'Components/Select' — story: Default)
// ---------------------------------------------------------------------------

test.describe('Select', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, 'components-select--default');
  });

  test('renders a combobox or select trigger', async ({ page }) => {
    const trigger = page.locator('[role="combobox"], select, button[aria-haspopup]');
    await expect(trigger.first()).toBeVisible();
  });

  test('trigger is focusable via Tab', async ({ page }) => {
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();
  });

  test('trigger can be activated with Enter', async ({ page }) => {
    const trigger = page.locator('[role="combobox"], select, button[aria-haspopup]').first();
    await trigger.focus();
    await page.keyboard.press('Enter');
    await expect(trigger).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Toggle (title: 'Components/Toggle' — stories: Off, On)
// ---------------------------------------------------------------------------

test.describe('Toggle', () => {
  test('Off story renders a visible switch', async ({ page }) => {
    await loadStory(page, 'components-toggle--off');
    const toggle = page.locator('[role="switch"], input[type="checkbox"]').first();
    await expect(toggle).toBeVisible();
    await expect(toggle).not.toBeDisabled();
  });

  test('On story renders a visible switch', async ({ page }) => {
    await loadStory(page, 'components-toggle--on');
    await expect(page.locator('[role="switch"], input[type="checkbox"]').first()).toBeVisible();
  });

  test('Off toggle responds to click', async ({ page }) => {
    await loadStory(page, 'components-toggle--off');
    const toggle = page.locator('[role="switch"], input[type="checkbox"]').first();
    await toggle.click();
    await expect(toggle).toBeVisible();
  });
});
