## [1.2.0] - 2026-06-09

### Breaking Changes
- **Orange fully removed** — all `colorScheme='current'` variants now render PS Blue `#005BA6` instead of orange `#FF9505` (ADA non-compliant, 2.9:1). The `current` prop value is still accepted for API compatibility but now maps to blue.

### Fixed (ADA Compliance — WCAG AA)
- `cart.tsx` — `current` hover `#E88800` → `#004A84`
- `productCard.tsx` — `current` primary hover `#E88800` → `#004A84` (2 instances)
- `checkbox.tsx` — `current` fill `#FF9505` → `#005BA6`, focus ring updated
- `toggle.tsx` — `current` on-color `#FF9505` → `#005BA6`, focus ring updated
- `radio.tsx` — `current` fill `#FF9505` → `#005BA6`, focus ring updated
- `modal.tsx` — `current` hover `#E88800` → `#004A84`
- `badge.tsx` — orange variant `#FF9505` → `#005BA6`

### Fixed (Token JSON)
- `tokens/ps-tokens/component/checkbox.json` — 5 orange values replaced
- `tokens/ps-tokens/component/radio.json` — 4 orange values replaced
- `tokens/ps-tokens/component/button.json` — 6 orange values replaced
- `tokens/ps-tokens/component/input.json` — 4 orange values replaced
- `tokens/ps-tokens/component/cart.json` — 1 orange value replaced
- `tokens/ps-tokens/component/search.json` — 1 orange value replaced

### Fixed (Build Pipeline)
- `build-tokens.yml` — added `--legacy-peer-deps` to unblock storybook ERESOLVE conflict (pipeline had been failing since run #69)
- `badge.tsx` — restored missing closing `}` on `BadgeProps` interface (caused vite build parse error)

### Updated
- `scripts/gen_components.py` — component templates updated; newly generated components will use blue from creation
- `CLAUDE.md` — corrected stale "keep orange as-is" guidance

---

## [1.1.0] - 2026-06-03

### Added
- `colorScheme` prop (`'current' | 'future'`) on 8 orange-primary components: Cart, Checkbox, DatePicker, Modal, ProductCard, Radio, Stepper, Toggle
- `future` variant uses PS Blue `#005BA6` — ADA-compliant (4.8:1 contrast ratio)
- `current` variant preserves legacy Orange `#FF9505` for backward compatibility (deprecated, 2.9:1 — do not use in new work)
- Side-by-Side and individual Current/Future Storybook stories for all 8 components
- Chromatic visual baselines established for all new stories (Build 52)

### Migration
Replace orange-primary component usage with `colorScheme="future"` to opt into the ADA-compliant blue:

```tsx
// Before
<Checkbox checked={true} />

// After (ADA compliant)
<Checkbox checked={true} colorScheme="future" />
```

The `colorScheme` prop defaults to `'future'` on all updated components.

# Changelog

All notable changes to `@partssource/react-ui-core` are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [1.0.0] — 2026-05-29

### Phase 5 — Publishing & Documentation

- Configured `package.json` for npm publish as `@partssource/react-ui-core`
- Added `vite.lib.config.ts` for library build with dual ESM/CJS output
- Added `.github/workflows/publish.yml` — auto-publishes on `v*` git tags
- Added comprehensive README with install guide, token table, and component catalogue
- Added this CHANGELOG

---

## [0.5.0] — 2026-05-29

### Phase 4 — Token Substitution Pass

Replaced hardcoded hex values with `--ps-*` CSS custom properties across 5 components:

- **toggle** — `#005BA6` → `--ps-brand-primary`, `#DCDCDC` → `--ps-neutral-200`, `#4A4A4A` → `--ps-fg-primary`
- **input** — error/focus/default borders and label color tokenized
- **fileUpload** — drag border, background, and error text tokenized
- **listCard** — outer border, dividers, and shadow → `--ps-border-default`, `--ps-shadow-sm`
- **productCard** — inline CSS vars reference `--ps-brand-primary` globally

---

## [0.4.0] — 2026-05-28

### Phase 3 — Storybook Audit & Fixes

- Audited all 57 Storybook components against Figma designs
- Fixed 13 component render errors (zero-byte files, array prop mismatches, date picker type errors)
- Aligned button, input, badge, checkbox, radio, toggle, toast, and divider to PS Design System spec
- Fixed status, errorMessage, and popover with correct PS tokens and Tailwind
- Added `.github/workflows/chromatic.yml` for visual regression testing on every PR
- Added Chromatic + Storybook addon integrations

---

## [0.3.0] — 2026-05-25 — 2026-05-27

### Phase 2 — Component Generation

- Auto-generated 57 React components via GitHub Actions pipeline
- All components use Source Sans Pro, `--ps-*` tokens, and Tailwind arbitrary value classes
- Added Storybook 10.4.1 with Vite, stories for all 53+ components
- Fixed syntax errors in aiAgent, progressIndicator, and carousel stories

---

## [0.2.0] — 2026-05-22 — 2026-05-24

### Token Pipeline

- Built full Token Studio → Style Dictionary → CSS/JS pipeline
- Created 57 component token JSON files covering all PS Design System components
- Validated cross-references and semantic token aliases
- GitHub Actions workflow triggers token build and component generation on every push

---

## [0.1.0] — 2026-05-20 — 2026-05-22

### Figma Design System Audit

- Audited PS Design System Figma file — identified all gaps vs. existing component library
- Built 10 missing Figma pages: Loading States, Table, Sheet/Drawer, Pagination, Progress Indicator, Pie Graph, 10 Nivo chart types, Search Bar
- Cross-referenced PS Design System vs. Figma and updated 6 component token files
- Established project phases and CLAUDE.md rules for AI-assisted generation

---

## Types of changes

- **Added** — new features or components
- **Changed** — changes to existing functionality
- **Fixed** — bug fixes
- **Deprecated** — soon-to-be removed features
- **Removed** — removed features
- **Security** — security patches
