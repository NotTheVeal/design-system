# @partssource/react-ui-core

> The official PartsSource React component library — 57 production-ready components built on the PS Design System.

[![npm version](https://img.shields.io/npm/v/@partssource/react-ui-core.svg)](https://www.npmjs.com/package/@partssource/react-ui-core)
[![Chromatic](https://img.shields.io/badge/Storybook-live-ff4785)](https://partssourceinc.github.io/react-ui-core)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Installation

```bash
npm install @partssource/react-ui-core
```

## Setup

### 1. Import the stylesheet

In your app's entry file (e.g. `main.tsx`):

```tsx
import '@partssource/react-ui-core/styles';
```

### 2. Load Source Sans Pro

Add this to your `<head>`:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap"
  rel="stylesheet"
/>
```

### 3. Register PS design tokens

Ensure your global CSS declares the token variables. The library ships with a pre-built token set, or you can extend it:

```css
:root {
  --ps-brand-primary: #005BA6;
  --ps-border-default: #DCDCDC;
  --ps-border-error: #D32F2F;
  --ps-neutral-50: #FAFAFA;
  --ps-neutral-200: #DCDCDC;
  --ps-fg-primary: #4A4A4A;
  --ps-shadow-sm: 0 1px 4px rgba(0, 47, 72, 0.08);
}
```

## Usage

```tsx
import { Button, Badge, Alert, Toggle, Input } from '@partssource/react-ui-core';

export default function MyPage() {
  return (
    <div>
      <Alert variant="info" title="Welcome">
        You're using the PartsSource Design System.
      </Alert>

      <Input label="Part Number" placeholder="e.g. 1234-ABC" />

      <Toggle label="Enable notifications" defaultChecked />

      <Button variant="primary">Add to Cart</Button>

      <Badge status="active">In Stock</Badge>
    </div>
  );
}
```

## Component Library

57 components across 8 categories:

| Category | Components |
|---|---|
| **Actions** | Button, IconButton |
| **Feedback** | Alert, Badge, Toast, Skeleton, ProgressIndicator |
| **Forms** | Input, Checkbox, Radio, Toggle, FileUpload, DatePicker, Dropdown |
| **Navigation** | NavLeft, Breadcrumb, Pagination, Tabs |
| **Data Display** | Table, ListCard, ProductCard, EventCard, StatusCard, Avatar, Cart |
| **Overlay** | Modal, Sheet/Drawer, Popover, Tooltip |
| **Layout** | Divider, Card, CardGrid |
| **Visualization** | PieGraph, LineChart, BarChart, AreaChart + 7 more |

View all components and their props in the **[Storybook](https://partssourceinc.github.io/react-ui-core)**.

## Design Tokens

Tokens follow the `--ps-*` naming convention and are defined in `tokens/`. The full token pipeline uses Token Studio → Style Dictionary → CSS custom properties.

| Token | Value | Usage |
|---|---|---|
| `--ps-brand-primary` | `#005BA6` | Primary blue — buttons, focus rings, active states |
| `--ps-brand-secondary` | `#002F48` | Midnight — deep headings |
| `--ps-fg-primary` | `#4A4A4A` | Body text |
| `--ps-border-default` | `#DCDCDC` | Card and input borders |
| `--ps-border-error` | `#D32F2F` | Error states |
| `--ps-shadow-sm` | `0 1px 4px rgba(0,47,72,.08)` | Card shadows |

## Publishing a New Version

1. Bump the version in `package.json` (e.g. `"version": "1.2.3"`)
2. Update `CHANGELOG.md` with what changed
3. Commit and push to main:
   ```bash
   git commit -am "chore: bump version 1.2.2 → 1.2.3"
   git push
   ```
4. The `publish.yml` workflow detects the `package.json` change and publishes to npm automatically — **no git tags needed**

> **First-time setup:** Add an `NPM_TOKEN` secret in GitHub → Settings → Secrets → Actions before the first publish.

> **Idempotency:** The workflow checks whether the version already exists on npm before publishing — it is safe to push multiple times.
## Development

```bash
# Install dependencies
npm install

# Start Storybook
npm run storybook

# Build component library
npm run build

# Build design tokens
npm run build:tokens
```

## License

MIT © PartsSource
