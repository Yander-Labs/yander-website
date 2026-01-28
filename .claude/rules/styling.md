# Styling Quick Reference

For anti-AI-slop principles and Yander aesthetic, see `.claude/skills/frontend-design/SKILL.md`.

## Colors

| Use | Class |
|-----|-------|
| Primary text | `text-gray-900` |
| Secondary text | `text-gray-500` |
| Muted text | `text-gray-400` |
| Borders | `border-[#E4E7EC]` |
| Light background | `bg-gray-50` |
| White background | `bg-white` |

## Typography

| Use | Classes |
|-----|---------|
| Headlines | `font-serif` (Instrument Serif) |
| Body text | `font-sans` (Inter, default) |
| Hero heading | `text-5xl sm:text-6xl md:text-7xl font-serif` |
| Section heading | `text-3xl md:text-4xl font-serif` |
| Body large | `text-lg text-gray-600` |
| Body small | `text-sm text-gray-500` |

## Spacing

| Use | Classes |
|-----|---------|
| Section padding | `py-20 md:py-28` |
| Card padding | `p-6` or `p-8` |
| Component gaps | `gap-4`, `gap-6`, `gap-8` |
| Container | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |

## Shadows

| Token | Use |
|-------|-----|
| `shadow-subtle` | Buttons, minimal depth |
| `shadow-card` | Card components |
| `shadow-elevated` | Hover states, floating elements |
| `shadow-xl` | Large prominent elements |

## Common Patterns

```typescript
// Card with hover
"rounded-2xl border border-[#E4E7EC] bg-white p-6 shadow-card hover:shadow-elevated transition-shadow duration-300"

// Section container
"py-20 md:py-28"

// Badge
"inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
```

## Responsive Breakpoints

| Breakpoint | Width |
|------------|-------|
| `sm:` | 640px |
| `md:` | 768px |
| `lg:` | 1024px |
| `xl:` | 1280px |
