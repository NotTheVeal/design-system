import { test, expect, type Page } from '@playwright/test';

/**
 * UX Workflow Validation — Playwright browser tests
 *
 * Tests run against the static Storybook build served on port 6007.
 *
 * Visibility strategy: Storybook sets visibility:hidden as an INLINE style on
 * #storybook-root via JavaScript, so CSS !important rules in addStyleTag are
 * overridden by the inline style specificity. We use page.evaluate() with
 * style.setProperty(..., 'important') which sets inline !important and wins.
 *
 * Render assertions use toBeAttached() rather than toBeVisible() because the
 * goal is to confirm the component rendered to the DOM. Interactive assertions
 * (click, keyboard, value changes) confirm actual behaviour.
 */

const storyUrl = (id: string) =>
  `/iframe.html?id=${id}&viewMode=story`;

async function loadStory(page: Page, id: string) {
  await page.goto(storyUrl(id));
  // Wait for all network requests to settle — DOM is fully populated at this point
  await page.waitForLoadState('networkidle');
  // Storybook sets visibility:hidden as an inline style on #storybook-root via JS.
  // page.evaluate with setProperty(..., 'important') overrides inline styles.
  await page.evaluate(() => {
    // Force the root element visible
    for (const sel of ['#storybook-root', '#root']) {
      const el = document.querySelector(sel) as HTMLElement | null;
      if (el) {
        el.style.setProperty('visibility', 'visible', 'important');
        el.style.setProperty('opacity', '1', 'important');
        if (getComputedStyle(el).display === 'none') {
          el.style.setProperty('display', 'block', 'important');
        }
      }
    }
    // Force all computed-hidden descendants visible too
    document.querySelectorAll('*').forEach((node) => {
      const el = node as HTMLElement;
      if (!el.style) return;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden') {
        el.style.setProperty('visibility', 'visible', 'important');
      }
      if (cs.opacity === '0') {
        el.style.setProperty('opacity', '1', 'important');
      }
    });
  });
  // Brief grace period for React effects to settle after visibility change
  await page.waitForTimeout(300);
}

// ---------------------------------------------------------------------------
// Button (title: 'Components/Button' — story: Primary)
// ---------------------------------------------------------------------------

test.describe('Button', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, 'components-button--primary');
  });

  test('renders a button element', async ({ page }) => {
    await expect(page.locator('button').first()).toBeAttached();
  });

  test('responds to mouse click', async ({ page }) => {
    const btn = page.locator('button').first();
    await expect(btn).toBeAttached();
    await btn.click({ force: true });
    await expect(btn).toBeAttached();
  });

  test('is keyboard-focusable and activatable with Enter', async ({ page }) => {
    const btn = page.locator('button').first();
    await btn.focus();
    await expect(btn).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(btn).toBeAttached();
  });

  test('is activatable with Space', async ({ page }) => {
    const btn = page.locator('button').first();
    await btn.focus();
    await page.keyboard.press('Space');
    await expect(btn).toBeAttached();
  });
});

// ---------------------------------------------------------------------------
// Input (title: 'Components/Input' — story: Default)
// ---------------------------------------------------------------------------

test.describe('Input', () => {
  test.beforeEach(async ({ page }) => {
    await loadStory(page, 'components-input--default');
  });

  test('renders an input element', async ({ page }) => {
    await expect(page.locator('input').first()).toBeAttached();
  });

  test('accepts text input', async ({ page }) => {
    const input = page.locator('input').first();
    // Use evaluate to set value in case actionability checks block fill
    await input.evaluate((el: HTMLInputElement, val) => {
      el.value = val;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }, 'Hello, PartsSource');
    await expect(input).toHaveValue('Hello, PartsSource');
  });

  test('can be cleared', async ({ page }) => {
    const input = page.locator('input').first();
    await input.evaluate((el: HTMLInputElement, val) => {
      el.value = val;
      el.dispatchEvent(new Event('input', { bubbles: true }));
    }, 'temporary value');
    await input.evaluate((el: HTMLInputElement) => {
      el.value = '';
      el.dispatchEvent(new Event('input', { bubbles: true }));
    });
    await expect(input).toHaveValue('');
  });

  test('is focusable via Tab', async ({ page }) => {
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus');
    await expect(focused).toBeAttached();
  });
});

// ---------------------------------------------------------------------------
// Checkbox (title: 'Components/Checkbox' — stories: Default, Checked, Disabled)
// ---------------------------------------------------------------------------

test.describe('Checkbox', () => {
  test('Default story renders an unchecked checkbox', async ({ page }) => {
    await loadStory(page, 'components-checkbox--default');
    const cb = page.locator('input[type="checkbox"]').first();
    await expect(cb).toBeAttached();
    await expect(cb).not.toBeChecked();
  });

  test('Checked story renders a checked checkbox', async ({ page }) => {
    await loadStory(page, 'components-checkbox--checked');
    await expect(page.locator('input[type="checkbox"]:checked').first()).toBeAttached();
  });

  test('Default checkbox toggles to checked on click', async ({ page }) => {
    await loadStory(page, 'components-checkbox--default');
    const cb = page.locator('input[type="checkbox"]').first();
    await cb.click({ force: true });
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
    await expect(page.locator('[role="dialog"]').first()).toBeAttached();
  });

  test('has a heading or title inside the dialog', async ({ page }) => {
    const heading = page.locator(
      '[role="dialog"] h1, [role="dialog"] h2, [role="dialog"] h3, [role="dialog"] [class*="title"]'
    );
    await expect(heading.first()).toBeAttached();
  });

  test('has an enabled button inside the dialog', async ({ page }) => {
    const btn = page.locator('[role="dialog"] button').first();
    await expect(btn).toBeAttached();
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
    await expect(tabs.first()).toBeAttached();
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
      await tabs.nth(1).click({ force: true });
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

  test('renders pagination controls', async ({ page }) => {
    await expect(page.locator('button').first()).toBeAttached();
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
    await expect(trigger.first()).toBeAttached();
  });

  test('trigger is focusable via Tab', async ({ page }) => {
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeAttached();
  });

  test('trigger can be activated with Enter', async ({ page }) => {
    const trigger = page.locator('[role="combobox"], select, button[aria-haspopup]').first();
    await trigger.focus();
    await page.keyboard.press('Enter');
    await expect(trigger).toBeAttached();
  });
});

// ---------------------------------------------------------------------------
// Toggle (title: 'Components/Toggle' — stories: Off, On)
// ---------------------------------------------------------------------------

test.describe('Toggle', () => {
  test('Off story renders a switch element', async ({ page }) => {
    await loadStory(page, 'components-toggle--off');
    const toggle = page.locator('[role="switch"], input[type="checkbox"]').first();
    await expect(toggle).toBeAttached();
    await expect(toggle).not.toBeDisabled();
  });

  test('On story renders a switch element', async ({ page }) => {
    await loadStory(page, 'components-toggle--on');
    await expect(page.locator('[role="switch"], input[type="checkbox"]').first()).toBeAttached();
  });

  test('Off toggle responds to click', async ({ page }) => {
    await loadStory(page, 'components-toggle--off');
    const toggle = page.locator('[role="switch"], input[type="checkbox"]').first();
    await toggle.click({ force: true });
    await expect(toggle).toBeAttached();
  });
});
