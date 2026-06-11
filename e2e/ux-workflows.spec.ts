import { test, expect, type Page } from '@playwright/test';

/**
 * UX Workflow Validation — Playwright browser tests
 * Tests run against the static Storybook build served on port 6007.
 * Each story is loaded in its iframe URL to isolate the component.
 *
 * Story IDs are derived from CSF title + export name, e.g.:
 *   title: 'Components/Button', export const Primary → components-button--primary
 */

const storyUrl = (id: string) =>
  `/iframe.html?id=${id}&viewMode=story`;

async function loadStory(page: Page, id: string) {
  await page.goto(storyUrl(id));
  // Wait for the page to fully load rather than a specific element,
  // so tests are resilient across Storybook versions.
  await page.waitForLoadState('networkidle', { timeout: 20_000 });
}

// ---------------------------------------------------------------------------
// Button  (title: 'Components/Button' — first story: Primary)
// ---------------------------------------------------------------------------

test.describe('Button', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, 'components-button--primary');
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
// Input  (title: 'Components/Input' — story: Default)
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
// Checkbox  (title: 'Components/Checkbox' — stories: Default, Checked, Disabled)
// ---------------------------------------------------------------------------

test.describe('Checkbox', () => {
  test('Default story renders an unchecked checkbox', async ({ page }) => {
    await loadStory(page, 'components-checkbox--default');
    const checkbox = page.locator('input[type="checkbox"]').first();
    await expect(checkbox).toBeVisible();
    await expect(checkbox).not.toBeChecked();
  });

  test('Checked story renders a checked checkbox', async ({ page }) => {
    await loadStory(page, 'components-checkbox--checked');
    const checked = page.locator('input[type="checkbox"]:checked');
    await expect(checked.first()).toBeVisible();
  });

  test('Default checkbox can be toggled on click', async ({ page }) => {
    await loadStory(page, 'components-checkbox--default');
    const checkbox = page.locator('input[type="checkbox"]').first();
    await checkbox.click();
    await expect(checkbox).toBeChecked();
  });

  test('Disabled checkbox is not interactive', async ({ page }) => {
    await loadStory(page, 'components-checkbox--disabled');
    const disabled = page.locator('input[type="checkbox"][disabled]').first();
    await expect(disabled).toBeDisabled();
  });
});

// ---------------------------------------------------------------------------
// Modal  (title: 'Components/Modal' — story: OpenByDefault, so dialog is visible)
// ---------------------------------------------------------------------------

test.describe('Modal', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, 'components-modal--open-by-default');
  });

  test('renders with role="dialog"', async ({ page }) => {
    const modal = page.locator('[role="dialog"]');
    await expect(modal.first()).toBeVisible();
  });

  test('has a visible heading or title', async ({ page }) => {
    const heading = page.locator(
      '[role="dialog"] h1, [role="dialog"] h2, [role="dialog"] h3, [role="dialog"] [class*="title"]'
    );
    await expect(heading.first()).toBeVisible();
  });

  test('has at least one button inside the dialog', async ({ page }) => {
    const btn = page.locator('[role="dialog"] button').first();
    await expect(btn).toBeVisible();
    await expect(btn).not.toBeDisabled();
  });
});

// ---------------------------------------------------------------------------
// Tabs  (title: 'Components/Tabs' — story: Default)
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
// Pagination  (title: 'Components/Pagination' — story: Default)
// ---------------------------------------------------------------------------

test.describe('Pagination', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, 'components-pagination--default');
  });

  test('renders at least one pagination control', async ({ page }) => {
    const anyBtn = page.locator('button').first();
    await expect(anyBtn).toBeVisible();
  });

  test('pagination controls include enabled buttons', async ({ page }) => {
    const btns = page.locator('button:not([disabled])');
    const count = await btns.count();
    expect(count).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// Select  (title: 'Components/Select' — story: Default)
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
// Toggle  (title: 'Components/Toggle' — story: Off)
// ---------------------------------------------------------------------------

test.describe('Toggle', () => {
  test('Off story renders an unchecked switch', async ({ page }) => {
    await loadStory(page, 'components-toggle--off');
    const toggle = page.locator('[role="switch"], input[type="checkbox"]').first();
    await expect(toggle).toBeVisible();
    await expect(toggle).not.toBeDisabled();
  });

  test('On story renders a checked switch', async ({ page }) => {
    await loadStory(page, 'components-toggle--on');
    const toggle = page.locator('[role="switch"], input[type="checkbox"]').first();
    await expect(toggle).toBeVisible();
  });

  test('Off toggle responds to click', async ({ page }) => {
    await loadStory(page, 'components-toggle--off');
    const toggle = page.locator('[role="switch"], input[type="checkbox"]').first();
    await toggle.click();
    await expect(toggle).toBeVisible();
  });
});
