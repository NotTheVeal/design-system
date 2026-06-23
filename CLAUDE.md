# PartsSource Design System — Component Generation Rules

## Architecture

All components use **inline styles** with hardcoded PS Design System hex values.
No CSS-in-JS, no Tailwind, no CSS modules.

## Font
`'Source Sans 3', -apple-system, sans-serif`

## Core Colors
- PS Blue: `#005BA6` (primary buttons, links, active states)
- PS Blue Hover: `#004A84`
- PS Blue Focus Ring: `rgba(0,147,244,0.3)` — 3px box-shadow
- Midnight: `#002F48` (NavTop bg, drawer headers, dark elements)
- Azure: `#009CF4` (active nav underlines)
- Border default: `#DCDCDC`
- Border strong: `#949494`
- Text primary: `#4A4A4A`
- Text muted: `#777777`
- Hover bg: `#F1F1F1`

## Status Colors
- Success: `#17AB78`
- Danger/Error: `#FF0000`
- Warning: `#E3A92D`
- Info: `#005BA6`

## Shadows
Always use midnight-tinted: `rgba(0,47,72,...)` — NEVER `rgba(0,0,0,...)`
- Small: `0 2px 10px rgba(0,47,72,0.10)`
- Medium: `0 4px 16px rgba(0,47,72,0.15)`
- Large: `0 8px 32px rgba(0,47,72,0.22)`

## Icons
- Library: Lucide React only
- strokeWidth: **1.75** (always)
- Size: 20px or 24px default

## Component Rules
1. Use `forwardRef` for all components
2. Set `ComponentName.displayName = 'ComponentName'`
3. Export both named and default
4. Props interface must be exported
5. Use `useId()` for accessible id generation in form fields
6. All interactive elements must have ARIA attributes

## Sizing Spec
- Button lg: 50px height, 0 24px padding, 15px font, uppercase, 0.08em letter-spacing
- Button sm: 32px height, 0 16px padding, 14px font
- Input default: 48px height
- Input large: 80px height
- NavTop: 64px height, Midnight #002F48 background
- Modal sm: 480px, md: 640px, lg: 880px
- Badge status: 4px radius, 4px 8px padding, 12px 700 uppercase
- Badge list: 100px radius, 6px 16px padding, 12px 700 uppercase

## Orange Policy
- `#FF9505` is ONLY allowed for `colorScheme="current"` on Checkbox and Radio
- All other orange usage is deprecated — use PS Blue instead

## Generated File Structure
Each component generates 6 files:
1. `ComponentName.tsx` — implementation
2. `ComponentName.css` — styles (usually empty)
3. `ComponentName.stories.tsx` — Storybook stories
4. `ComponentName.test.tsx` — Vitest + jest-axe tests
5. `index.ts` — barrel export
6. `tokens.json` — Token Studio component tokens
