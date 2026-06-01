# PartsSource Design System — Claude Instructions

## Role
You are a design system engineer for PartsSource. Your job is to generate production-ready React components from design tokens. Every output must be pixel-accurate to the Figma design and fully accessible.

---

## CRITICAL: Output Format

When generating a component, output **ONLY raw TypeScript/TSX code**. No markdown. No explanation. No code fences (no triple backticks). No introductory text. No trailing comments.

The output of this command goes directly into a `.tsx` file:
```
claude --print "Generate the button component" > src/components/button/button.tsx
```

If you output anything other than valid TypeScript, the file will be broken. Start your response with the first line of code (e.g. `import React from 'react';`) and end with the last line of code.

---

## Tech Stack
- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS + CSS custom properties (`--ps-*` vars)
- **Component library**: Custom (no MUI, no Chakra, no Radix)
- **Icons**: Lucide React — `import { IconName } from 'lucide-react'` — stroke width 1.75px
- **Token source**: `src/tokens/tokens.ts` and `src/tokens/tokens.css`

---

## Token Rules — CRITICAL

### Always use tokens. Never use raw values.

❌ WRONG:
```tsx
<button style={{ backgroundColor: '#005ba7', padding: '12px 24px', borderRadius: '4px' }}>
```

✅ RIGHT:
```tsx
<button className="bg-[var(--ps-button-primary-default-background)] px-[var(--ps-button-primary-paddingH-lg)] rounded-[var(--ps-button-primary-radius)]">
```

### Token hierarchy:
1. **Component tokens first**: `--ps-button-primary-default-background`
2. **Semantic tokens second**: `--ps-semantic-color-brand-primary`
3. **Primitive tokens never directly in components**

### Token naming pattern:
`--ps-{level}-{category}-{variant}-{state}-{property}`

### Reading token files:
Before generating any component, read:
- `tokens/ps-tokens/component/{componentName}.json` — component-specific tokens
- `src/tokens/tokens.css` — all CSS custom property names
- `src/tokens/tokens.ts` — TypeScript token map

The top-level keys in the component JSON are the variant groups. Generate all variants found — do not skip any.

---

## Component Requirements

Every component MUST include:

### All interactive states:
- `default` (resting)
- `hover`
- `pressed` / `active`
- `focused` (visible focus ring — WCAG 2.4.7)
- `disabled` (non-interactive, reduced opacity, `cursor-not-allowed`)
- `loading` (if applicable — `aria-busy`)
- `error` (if applicable)

### Accessibility (mandatory):
- Semantic HTML (`<button>`, `<input>`, `<nav>` — never `<div>` pretending to be interactive)
- `aria-disabled` when disabled (not just the `disabled` attribute alone)
- `aria-busy` for loading states
- `focus-visible:ring-2` Tailwind focus ring using `--ps-semantic-color-brand-primary`
- Color contrast WCAG AA (4.5:1 text, 3:1 UI components)
- Touch target minimum 44×44px

### TypeScript:
- Strict types — no `any`
- Export the props interface by name: `export interface {Component}Props`
- Export the component as named export AND default export

---

## File Output Per Component

The workflow generates ONE file at a time. When asked to generate `{component}`:
- Output the complete, production-ready component as a single `.tsx` file
- Include the component, its props interface, all variants, all states, and all helper functions
- Do NOT include Storybook or test code in the main component file

---

## Button Family

`tokens/ps-tokens/component/button.json` — Generate as `src/components/button/button.tsx`

**Props interface:**
```tsx
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
  size?: 'sm' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}
```

**Variant specs:**
| Variant | Default bg | Border | Hover | Height lg/sm |
|---|---|---|---|---|
| primary | `--ps-button-primary-default-background` | none | `--ps-button-primary-hover-background` | 50px / 32px |
| secondary | white | 2px `--ps-button-secondary-default-border` | fills blue | 50px / 32px |
| tertiary | `--ps-neutral-100` | none, pill shape | `--ps-neutral-200` | 40px / 32px |
| ghost | transparent | none | light blue tint | 40px / 32px |
| danger | `--ps-danger` | none | darker red | 50px / 32px |

**Inline button variants** (from `button.inline.*`):
- `director`: text link style, no underline by default, underlines on hover
- `underline`: always underlined
- `allCaps`: uppercase tracking

**Deprecated:**
- `button.square` → `IconButton` — legacy orange CTA — add JSDoc `@deprecated`

---

## Input

`tokens/ps-tokens/component/input.json` — Generate as `src/components/input/input.tsx`

**Props interface:**
```tsx
export interface InputProps {
  type?: 'text' | 'large' | 'dropdown' | 'datePicker';
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  hint?: string;
  disabled?: boolean;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  options?: { label: string; value: string }[];
  searchable?: boolean;
  range?: boolean;
  startDate?: Date;
  endDate?: Date;
  onDateChange?: (start: Date, end?: Date) => void;
  'aria-label'?: string;
}
```

**States:** default, focused (floating label animates up + border turns brand primary), filled, error (border red + error message below), disabled

**Floating label pattern:**
- Label sits inside the input at rest (14px, `--ps-fg-secondary`)
- On focus or when value exists: label floats to top (12px bold, brand primary color)
- Use CSS transition `150ms ease` for the animation

---

## Select

`tokens/ps-tokens/component/select.json` — Generate as `src/components/select/select.tsx`

**Props interface:**
```tsx
export interface SelectProps {
  label?: string;
  options: { label: string; value: string; disabled?: boolean }[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  searchable?: boolean;
  multiple?: boolean;
  'aria-label'?: string;
}
```

**States:** closed (default), open (dropdown panel), option hovered, option selected, searchable (text input inside panel), disabled, error
**Icon:** Lucide `ChevronDown` right-pinned, rotates 180° when open

---

## Checkbox

`tokens/ps-tokens/component/checkbox.json` — Generate as `src/components/checkbox/checkbox.tsx`

**Props interface:**
```tsx
export interface CheckboxProps {
  variant?: 'short' | 'long' | 'checkmarkText';
  label: string;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  'aria-label'?: string;
}
```

**Visual rules:**
- Size: 24×24px, 1.5px stroke, 2px border radius
- Selected/hover: legacy orange `#ff9505` (keep as-is — do NOT replace with blue)
- `checkmarkTextNumber` variant: brand primary (correct, not legacy)
- Indeterminate: orange fill + white dash
- Focus: `box-shadow: 0 0 10px 5px rgba(0,91,166,0.5)` blue glow

---

## Radio

`tokens/ps-tokens/component/radio.json` — Generate as `src/components/radio/radio.tsx`

**Props interface:**
```tsx
export interface RadioProps {
  label: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
  name?: string;
  'aria-label'?: string;
}

export interface RadioGroupProps {
  options: { label: string; value: string; disabled?: boolean }[];
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  label?: string;
  disabled?: boolean;
}
```

**Visual rules:** 24×24px circle, 1.5px border, selected: brand primary fill + white center dot, focus: blue glow ring

---

## Toggle

`tokens/ps-tokens/component/toggle.json` — Generate as `src/components/toggle/toggle.tsx`

**Props interface:**
```tsx
export interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  labelPosition?: 'left' | 'right';
  disabled?: boolean;
  size?: 'sm' | 'md';
  'aria-label'?: string;
}
```

**Visual:** pill track (40×24px md, 32×20px sm), sliding thumb, track color: off=`--ps-neutral-300`, on=`--ps-brand-primary`. Use `role="switch"` and `aria-checked`.

---

## Badge

`tokens/ps-tokens/component/badge.json` — Generate as `src/components/badge/badge.tsx`

**Props interface:**
```tsx
export interface BadgeProps {
  type?: 'status' | 'listType';
  variant: 'active' | 'inactive' | 'pending' | 'error' | 'info' | 'new' | 'discontinued'
         | 'primary' | 'secondary' | 'accent' | 'success' | 'warning';
  label: string;
  className?: string;
}
```

**Visual rules:**
- `type="status"`: `border-radius: 4px`, uppercase bold 12px, has 1px border
- `type="listType"`: `border-radius: 100px` (pill), uppercase bold 12px, no border, 0.5px letter spacing

---

## Alert

`tokens/ps-tokens/component/alert.json` — Generate as `src/components/alert/alert.tsx`

**Props interface:**
```tsx
export interface AlertProps {
  variant: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
  dismissable?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
  className?: string;
}
```

**Color map:**
| Variant | Background | Text/Icon |
|---|---|---|
| success | `--ps-success-subtle` (#E2F5EE) | `--ps-success` (#17AB78) |
| error | `--ps-danger-subtle` (#FACBCB) | `--ps-danger` (#FF0000) |
| info | `--ps-info-subtle` (#B0C6D3) | `--ps-brand-primary` (#005BA6) |
| warning | `--ps-warning-subtle` (#FFF4D0) | `--ps-warning` (#E3A92D) |

Use Lucide icons: `CheckCircle` (success), `XCircle` (error), `Info` (info), `AlertTriangle` (warning)

---

## Toast

`tokens/ps-tokens/component/toast.json` — Generate as `src/components/toast/toast.tsx`

**Props interface:**
```tsx
export interface ToastProps {
  message: string;
  duration?: number;
  onClose?: () => void;
  action?: { label: string; onClick: () => void };
  className?: string;
}
```

**Visual:** dark floating notification, bottom-right position, animates in/out, auto-dismisses after `duration` ms (default 4000)

---

## Modal

`tokens/ps-tokens/component/modal.json` — Generate as `src/components/modal/modal.tsx`

**Props interface:**
```tsx
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'fullscreen';
  showFooter?: boolean;
  primaryAction?: { label: string; onClick: () => void; loading?: boolean };
  secondaryAction?: { label: string; onClick: () => void };
  children: React.ReactNode;
  'aria-label'?: string;
}
```

**Accessibility:** focus trap when open, restore focus on close, `role="dialog"`, `aria-modal="true"`, `aria-labelledby` tied to title, close on Escape key

---

## Drawer

`tokens/ps-tokens/component/drawer.json` — Generate as `src/components/drawer/drawer.tsx`

**Props interface:**
```tsx
export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  position?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  footer?: React.ReactNode;
  'aria-label'?: string;
}
```

**Visual:** slides in from left or right with backdrop overlay, `border-radius: 8px` on inner edge. Same accessibility rules as Modal.

---

## Tooltip

`tokens/ps-tokens/component/tooltip.json` — Generate as `src/components/tooltip/tooltip.tsx`

**Props interface:**
```tsx
export interface TooltipProps {
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
  delay?: number;
  maxWidth?: number;
  disabled?: boolean;
}
```

**Visual:** dark bg (`--ps-neutral-1000`), white text, 4px radius, arrow pointing to trigger, shows on hover + focus

---

## Tabs

`tokens/ps-tokens/component/tabs.json` — Generate as `src/components/tabs/tabs.tsx`

**Props interface:**
```tsx
export interface Tab {
  id: string;
  label: string;
  disabled?: boolean;
  badge?: number;
}

export interface TabsProps {
  tabs: Tab[];
  activeTabId?: string;
  onChange?: (tabId: string) => void;
  variant?: 'underline' | 'pill';
  className?: string;
}
```

**Accessibility:** `role="tablist"`, `role="tab"`, `aria-selected`, keyboard nav (arrow keys), `role="tabpanel"` for content

---

## Accordion

`tokens/ps-tokens/component/accordion.json` — Generate as `src/components/accordion/accordion.tsx`

**Props interface:**
```tsx
export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenIds?: string[];
  className?: string;
}
```

**Visual:** chevron rotates 180° when open, smooth height animation `200ms ease`, `border-bottom: 1px solid --ps-border-default` between items

---

## Table

`tokens/ps-tokens/component/table.json` — Generate as `src/components/table/table.tsx`

**Props interface:**
```tsx
export interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  width?: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface TableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  stickyHeader?: boolean;
  className?: string;
}
```

**States:** default, row hover, row selected, loading (skeleton rows), empty, sorted (asc/desc indicator)

---

## Pagination

`tokens/ps-tokens/component/pagination.json` — Generate as `src/components/pagination/pagination.tsx`

**Props interface:**
```tsx
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
  totalItems?: number;
  showPageSize?: boolean;
  onPageSizeChange?: (size: number) => void;
  className?: string;
}
```

**Visual:** prev/next arrows (Lucide `ChevronLeft`/`ChevronRight`), numbered pages, ellipsis for large ranges, active page uses brand primary

---

## Breadcrumb

`tokens/ps-tokens/component/breadcrumb.json` — Generate as `src/components/breadcrumb/breadcrumb.tsx`

**Props interface:**
```tsx
export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}
```

**Accessibility:** `aria-label="Breadcrumb"` on `<nav>`, `aria-current="page"` on last item, Lucide `ChevronRight` as default separator

---

## Skeleton

`tokens/ps-tokens/component/skeleton.json` — Generate as `src/components/skeleton/skeleton.tsx`

**Props interface:**
```tsx
export interface SkeletonProps {
  variant?: 'text' | 'circle' | 'rect' | 'card';
  width?: string | number;
  height?: string | number;
  lines?: number;
  className?: string;
  animate?: boolean;
}
```

**Visual:** `--ps-neutral-200` base color, shimmer animation (gradient sweep left to right, 1.5s infinite), rounded corners match the element type

---

## Avatar

`tokens/ps-tokens/component/avatar.json` — Generate as `src/components/avatar/avatar.tsx`

**Props interface:**
```tsx
export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy' | 'away';
  className?: string;
}
```

**Fallback:** if `src` fails to load, show `initials` in a colored circle using brand primary bg. Status dot positioned bottom-right.

---

## Search

`tokens/ps-tokens/component/search.json` — Generate as `src/components/search/search.tsx`

**Props interface:**
```tsx
export interface SearchProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  suggestions?: string[];
  loading?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  'aria-label'?: string;
}
```

**States:** default, focused (border brand primary), typing, with suggestions dropdown, loading (spinner in right), with value (clear X button appears)

---

## Slider

`tokens/ps-tokens/component/slider.json` — Generate as `src/components/slider/slider.tsx`

**Props interface:**
```tsx
export interface SliderProps {
  value?: number | [number, number];
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number | [number, number]) => void;
  disabled?: boolean;
  showLabels?: boolean;
  range?: boolean;
  'aria-label'?: string;
}
```

**Visual:** track uses `--ps-neutral-200`, filled portion uses brand primary. Thumb: white circle with brand primary border + shadow. Use `role="slider"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.

---

## Progress Indicator

`tokens/ps-tokens/component/progressIndicator.json` — Generate as `src/components/progressindicator/progressindicator.tsx`

**Props interface:**
```tsx
export interface ProgressIndicatorProps {
  value?: number;
  variant?: 'bar' | 'circle' | 'step';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  showValue?: boolean;
  indeterminate?: boolean;
  color?: 'brand' | 'success' | 'warning' | 'error';
  className?: string;
}
```

---

## Loading

`tokens/ps-tokens/component/loading.json` — Generate as `src/components/loading/loading.tsx`

**Props interface:**
```tsx
export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  overlay?: boolean;
  className?: string;
}
```

**Visual:** spinning SVG circle using brand primary color. If `overlay=true`, renders a full-screen semi-transparent backdrop with the spinner centered.

---

## Divider

`tokens/ps-tokens/component/divider.json` — Generate as `src/components/divider/divider.tsx`

**Props interface:**
```tsx
export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  className?: string;
}
```

---

## Empty State

`tokens/ps-tokens/component/emptyState.json` — Generate as `src/components/emptystate/emptystate.tsx`

**Props interface:**
```tsx
export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  className?: string;
}
```

---

## File Upload

`tokens/ps-tokens/component/fileUpload.json` — Generate as `src/components/fileupload/fileupload.tsx`

**Props interface:**
```tsx
export interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  onUpload?: (files: File[]) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
  label?: string;
  hint?: string;
  className?: string;
}
```

**States:** idle (dashed border dropzone), drag-over (brand primary border + tint bg), uploading (progress bar), error (red border + message), success (file list with remove option)

---

## Metric

`tokens/ps-tokens/component/metric.json` — Generate as `src/components/metric/metric.tsx`

**Props interface:**
```tsx
export interface MetricProps {
  label: string;
  value: string | number;
  trend?: { direction: 'up' | 'down' | 'neutral'; value: string };
  subLabel?: string;
  loading?: boolean;
  className?: string;
}
```

---

## Status

`tokens/ps-tokens/component/status.json` — Generate as `src/components/status/status.tsx`

**Props interface:**
```tsx
export interface StatusProps {
  variant: 'active' | 'inactive' | 'pending' | 'error' | 'warning' | 'info';
  label?: string;
  showDot?: boolean;
  className?: string;
}
```

---

## Navigation

`tokens/ps-tokens/component/navTop.json` → `src/components/navigation/topnav.tsx`
`tokens/ps-tokens/component/navLeft.json` → `src/components/navigation/leftnav.tsx`

**TopNav props:**
```tsx
export interface TopNavProps {
  logoText?: string;
  cartCount?: number;
  notificationCount?: number;
  onSearch?: (query: string) => void;
  onCartClick?: () => void;
  onUserMenuClick?: () => void;
  userDisplayName?: string;
}
```

**LeftNav props:**
```tsx
export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: number;
  children?: NavItem[];
  disabled?: boolean;
}

export interface LeftNavProps {
  items: NavItem[];
  activeItemId?: string;
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  userInitials?: string;
  userName?: string;
}
```

---

## Card

`tokens/ps-tokens/component/card.json` — Generate as `src/components/card/card.tsx`

**Props:**
```tsx
export interface CardProps {
  variant?: 'base' | 'event' | 'status' | 'aiData' | 'data' | 'list' | 'analytics';
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
}
```

All cards: `1px solid --ps-border-default`, `4px` radius, white bg, hover shadow `0 4px 12px rgba(0,0,0,0.1)`

---

## Filter

`tokens/ps-tokens/component/filter.json` — Generate as `src/components/filter/filterbar.tsx`

**Props:**
```tsx
export interface FilterBarProps {
  filters: FilterConfig[];
  activeFilters: ActiveFilter[];
  onFilterChange: (filters: ActiveFilter[]) => void;
  onClearAll: () => void;
  savedFilters?: SavedFilter[];
}

export interface FilterChipProps {
  label: string;
  value: string;
  onRemove: () => void;
  disabled?: boolean;
}
```

---

## Stepper

`tokens/ps-tokens/component/stepper.json` — Generate as `src/components/stepper/stepper.tsx`

**Props:**
```tsx
export interface Step {
  id: string;
  label: string;
  state: 'finished' | 'current' | 'future';
}

export interface StepperProps {
  steps: Step[];
  currentStepId: string;
  orientation?: 'horizontal';
}
```

**Visual:** finished=green fill+checkmark, current=white+green border+glow `0 0 0 3px rgba(23,171,120,0.2)`, future=white+gray border

---

## PageShell

`tokens/ps-tokens/component/pageShell.json` — Generate as `src/components/pageshell/pageshell.tsx`

Responsive layout wrapper: `max-width: 1440px`, centered, responsive content padding (48px→32px→24px→16px), `--ps-surface-page` background.

---

## Icon

No custom component — use Lucide directly:
```tsx
import { ShoppingCart } from 'lucide-react';
<ShoppingCart size={24} style={{ color: 'var(--ps-icon-color-brand)', strokeWidth: 1.75 }} />
```

---

## Rules Summary

| Rule | Detail |
|------|--------|
| Output format | Raw TypeScript ONLY — no markdown, no explanations |
| No raw values | Use `--ps-*` CSS vars or token imports |
| All states | default, hover, pressed, focused, disabled |
| All variants | Read from component token JSON — generate all found |
| Semantic HTML | `<button>`, `<nav>`, `<input>` — never `<div>` |
| WCAG AA | Contrast, focus visible, touch targets 44px |
| TypeScript | Strict types, no `any`, named exports |
| Icons | Lucide only, stroke 1.75px |

## What NOT to do

- ❌ No `style={{ color: '#005ba7' }}` — use CSS variables
- ❌ No hardcoded Tailwind colors — `bg-blue-600` is WRONG
- ❌ No missing states
- ❌ No `any` TypeScript type
- ❌ No `div` pretending to be interactive
- ❌ No raw pixel values — use spacing/sizing tokens
- ❌ No markdown in output — raw code only

---

## Phase 9 — Test Generation Rules

### Core Directive
For every component, generate tests that validate rendering, required states, accessibility, and documented interactions. Tests must not rely on raw styling values. Tests must confirm tokenized class usage where possible.

### Required Test Types
Every generated component test file must include:
1. **Unit test** — renders without crashing
2. **Accessibility test** — passes `jest-axe` with no violations
3. **Snapshot test** — first-child matches snapshot
4. **State tests** — one test per documented state (see below)
5. **Keyboard interaction tests** — for any interactive component
6. **Responsive behavior tests** — if layout changes on mobile

### Required States to Test (by component type)

**Buttons:**
- Default state renders correctly
- Disabled state cannot be clicked and has correct aria-disabled
- Loading state displays correctly (aria-busy)
- Focus state is keyboard accessible (tabIndex, focus ring visible)
- Click action fires when enabled, does not fire when disabled

**Form Fields (Input, Select, Textarea):**
- Label appears and is associated with the input
- Helper text appears when provided
- Error message appears and is announced (aria-describedby)
- Required state is announced (aria-required)
- Disabled state works (input not interactive)
- Keyboard focus works (element receives focus)

**Cards:**
- Content renders correctly
- Optional media/image renders when provided
- Long text does not break layout
- Mobile layout works (responsive behavior)

**Navigation:**
- Active state is reflected in aria-current
- Keyboard navigation (Tab, Enter) works
- All links are accessible

**Modals / Drawers:**
- Opens and closes correctly
- Focus trap is active when open
- Escape key closes
- Focus returns to trigger on close

**Badges / Alerts / Tags:**
- All variant states render (success, error, warning, info)
- Icon renders with correct variant
- Dismissible variant fires onDismiss

**Checkboxes / Radios / Toggles:**
- Checked state works and fires onChange
- Unchecked state works
- Indeterminate state renders (checkbox only)
- Disabled state blocks interaction
- Label is accessible

**Tables:**
- Renders with data correctly
- Empty state renders when no rows provided
- Sortable column fires onSort

### Test Quality Rules
- ❌ WEAK: `it('renders', () => { render(<Button />); })`
- ✅ STRONG: `it('primary button renders default, disabled, and loading states using tokenized styles', () => { ... })`
- Never test raw CSS values (e.g. `#005ba6`) — test className or aria attribute presence
- Never test implementation details — test user-visible behavior
- Prefer `getByRole` and `getByLabelText` over `getByTestId`

### Escalation Triggers
Stop and flag to UX if:
- Tests fail but Figma and Storybook look correct (design token mismatch likely)
- Claude generates generic placeholder tests with no state coverage
- GitHub Actions cannot run the tests (config issue)
- A component has no documented states in its token file
