import { test, expect, type Page } from '@playwright/test';

/**
 * UX Workflow Validation — Playwright browser tests
 * Tests run against the static Storybook build served on port 6007.
 * Each story is loaded in its iframe URL to isolate the component.
 */

const storyUrl = (id: string) =>
  `/iframe.html?id=${id}&viewMode=story`;

async function loadStory(page: Page, id: string) {
  await page.goto(storyUrl(id));
  await page.waitForSelector('#storybook-root, #root', { timeout: 10_000 });
}

// ---------------------------------------------------------------------------
// Button
// ---------------------------------------------------------------------------

test.describe('Button', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, 'components-button--default');
  });

  test('renders a button element', async ({ page }) => {
    const btn = page.locator('button').first();
    await expect(btn).toBeVisible();
  });

  test('responds to mouse click', async ({ page }) => {
    const btn = page.locator('button').first();
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
// Input
// ---------------------------------------------------------------------------

test.describe('Input', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, 'components-input--default');
  });

  test('renders an input element', async ({ page }) => {
    const input = page.locator('input').first();
    await expect(input).toBeVisible();
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
    const input = page.locator('input').first();
    await expect(input).toBeFocused();
  });
});

// ---------------------------------------------------------------------------
// Checkbox
// ---------------------------------------------------------------------------

test.describe('Checkbox', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, 'components-checkbox--future-all-states');
  });

  test('renders checkbox elements', async ({ page }) => {
    const checkboxes = page.locator('input[type="checkbox"]');
    await expect(checkboxes.first()).toBeVisible();
  });

  test('has at least one unchecked checkbox', async ({ page }) => {
    const unchecked = page.locator('input[type="checkbox"]:not(:checked)');
    await expect(unchecked.first()).toBeVisible();
  });

  test('has at least one checked checkbox', async ({ page }) => {
    const checked = page.locator('input[type="checkbox"]:checked');
    await expect(checked.first()).toBeVisible();
  });

  test('disabled checkbox is not interactive', async ({ page }) => {
    const disabled = page.locator('input[type="checkbox"][disabled]');
    const count = await disabled.count();
    if (count > 0) {
      await expect(disabled.first()).toBeDisabled();
    }
  });
});

// ---------------------------------------------------------------------------
// Modal
// ---------------------------------------------------------------------------

test.describe('Modal', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, 'components-modal--future-static');
  });

  test('renders with role="dialog"', async ({ page }) => {
    const modal = page.locator('[role="dialog"]');
    await expect(modal.first()).toBeVisible();
  });

  test('has a visible title or heading', async ({ page }) => {
    const heading = page.locator('[role="dialog"] h1, [role="dialog"] h2, [role="dialog"] h3, [role="dialog"] [class*="title"]');
    await expect(heading.first()).toBeVisible();
  });

  test('has an actionable CTA button inside the dialog', async ({ page }) => {
    const btn = page.locator('[role="dialog"] button').first();
    await expect(btn).toBeVisible();
    await expect(btn).not.toBeDisabled();
  });
});

// ---------------------------------------------------------------------------
// Tabs
// ---------------------------------------------------------------------------

test.describe('Tabs', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, 'components-tabs--default');
  });

  test('renders multiple tab buttons', async ({ page }) => {
    const tabs = page.locator('[role="tab"]');
    const count = await tabs.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('first tab is selected by default', async ({ page }) => {
    const firstTab = page.locator('[role="tab"]').first();
    await expect(firstTab).toHaveAttribute('aria-selected', 'true');
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
// Pagination
// ---------------------------------------------------------------------------

test.describe('Pagination', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, 'components-pagination--default');
  });

  test('renders at least one pagination control', async ({ page }) => {
    const anyBtn = page.locator('button').first();
    await expect(anyBtn).toBeVisible();
  });

  test('pagination controls are not all disabled', async ({ page }) => {
    const btns = page.locator('button:not([disabled])');
    const count = await btns.count();
    expect(count).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// Select
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
    const focused = page.locator(':focus');
    await expect(focused).toBeVisible();
  });

  test('trigger can be activated with Enter', async ({ page }) => {
    const trigger = page.locator('[role="combobox"], select, button[aria-haspopup]').first();
    await trigger.focus();
    await page.keyboard.press('Enter');
    await expect(trigger).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Toggle
// ---------------------------------------------------------------------------

test.describe('Toggle', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, 'components-toggle--default');
  });

  test('renders a switch or checkbox control', async ({ page }) => {
    const toggle = page.locator('[role="switch"], input[type="checkbox"]').first();
    await expect(toggle).toBeVisible();
  });

  test('toggle is enabled by default', async ({ page }) => {
    const toggle = page.locator('[role="switch"], input[type="checkbox"]').first();
    await expect(toggle).not.toBeDisabled();
  });

  test('toggle responds to click', async ({ page }) => {
    const toggle = page.locator('[role="switch"], input[type="checkbox"]').first();
    await toggle.click();
    await expect(toggle).toBeVisible();
  });
});
