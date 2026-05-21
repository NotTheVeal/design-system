The file needs write permission. Once you grant it, the component is ready to write. Here's a summary of what's in it:

**`Button`** — 5 variants (primary, secondary, tertiary, ghost, danger) × 2 sizes (lg/sm), all with:
- hover, active, focus-visible (ring), disabled states
- loading spinner via `Loader2` + `aria-busy`
- `aria-disabled` alongside native `disabled`
- Token-mapped colors via `--semantic-color-*` CSS vars
- Sizes from token JSON: primary lg=52px, secondary lg=50px, tertiary lg=38px, ghost/sm=40px, danger lg=50px

**`InlineButton`** — 4 variants: `default` (blue, underlines on hover), `director` (dark text + ChevronRight, turns blue on hover), `underline` (always underlined), `allCaps` (bold uppercase)

**`IconButton`** — `@deprecated` legacy orange square CTA (`#ff9505` → `#ec8000` hover → `#d27200` pressed, disabled=`#ffca80`), matches `button.square` token exactly
