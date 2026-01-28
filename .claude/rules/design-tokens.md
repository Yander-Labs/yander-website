# Design Tokens

Formal token reference for consistent design. For anti-slop principles, see `.claude/skills/frontend-design/SKILL.md`.

## Typography Scale

| Token | Size | Use |
|-------|------|-----|
| `text-xs` | 12px | Labels, captions |
| `text-sm` | 14px | Body small, UI |
| `text-base` | 16px | Body default |
| `text-lg` | 18px | Body large |
| `text-xl` | 20px | Small headings |
| `text-2xl` | 24px | Subheads |
| `text-3xl` | 30px | Section headings |
| `text-4xl` | 36px | Page headings |
| `text-5xl` | 48px | Hero headings |

**Rule:** Minimum 3x size jumps for hierarchy (14px → 48px).

## Font Families

| Token | Font | Use |
|-------|------|-----|
| `font-sans` | Inter | Body, UI |
| `font-serif` | Instrument Serif | Headlines |

## Core Colors

### Grayscale
| Token | Hex | Use |
|-------|-----|-----|
| `gray-50` | #fafafa | Light backgrounds |
| `gray-200` | #e5e5e5 | Borders |
| `gray-500` | #737373 | Secondary text |
| `gray-900` | #171717 | Primary text |

### Accents (Strategic Use)
| Color | Hex | Use |
|-------|-----|-----|
| Emerald | #10b981 | Success, positive |
| Amber | #f59e0b | Warning, caution |
| Blue | #3b82f6 | Links, info |
| Rose | #f43f5e | Critical (sparingly) |

## Shadows

| Token | Use |
|-------|-----|
| `shadow-subtle` | Buttons |
| `shadow-card` | Cards |
| `shadow-elevated` | Hover states |
| `shadow-xl` | Modals |
| `shadow-dramatic` | Hero elements |

## Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `rounded-sm` | 6px | Buttons |
| `rounded-lg` | 12px | Default cards |
| `rounded-xl` | 16px | Hero cards |
| `rounded-2xl` | 24px | Large containers |
| `rounded-full` | 9999px | Pills, avatars |

## Motion

| Duration | Easing | Use |
|----------|--------|-----|
| 150ms | ease-out | Hover states |
| 300ms | spring | Standard transitions |
| 500ms | smooth | Page transitions |

```css
--ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
--ease-smooth: cubic-bezier(0.21, 0.47, 0.32, 0.98);
```

## Z-Index

| Token | Value | Use |
|-------|-------|-----|
| `z-base` | 0 | Default |
| `z-dropdown` | 100 | Dropdowns |
| `z-sticky` | 200 | Headers |
| `z-modal` | 300 | Modals |
