# Yander Design Tokens

Formal design token reference for consistent, distinctive design implementation.

## Typography Scale

| Token | Size | Line Height | Use |
|-------|------|-------------|-----|
| `text-xs` | 12px | 1.5 | Labels, captions, metadata |
| `text-sm` | 14px | 1.5 | Body small, UI elements |
| `text-base` | 16px | 1.6 | Body default |
| `text-lg` | 18px | 1.6 | Body large, subheads |
| `text-xl` | 20px | 1.4 | Small headings |
| `text-2xl` | 24px | 1.3 | Section subheads |
| `text-3xl` | 30px | 1.2 | Section headings |
| `text-4xl` | 36px | 1.1 | Page headings |
| `text-5xl` | 48px | 1.1 | Hero headings |
| `text-6xl` | 60px | 1.0 | Display text |
| `text-7xl` | 72px | 1.0 | Large display |

**Typography Rule:** Use minimum 3x size jumps for visual hierarchy. Example: `text-sm` (14px) → `text-4xl` (36px) for hero sections.

## Font Families

| Token | Font | Use |
|-------|------|-----|
| `font-sans` | Inter | Body text, UI elements |
| `font-serif` | Instrument Serif | Headlines, editorial emphasis |

## Core Color Palette

### Grayscale (Primary)
| Token | Hex | RGB | Use |
|-------|-----|-----|-----|
| `gray-50` | #fafafa | rgb(250, 250, 250) | Light backgrounds |
| `gray-100` | #f5f5f5 | rgb(245, 245, 245) | Muted backgrounds |
| `gray-200` | #e5e5e5 | rgb(229, 229, 229) | Borders, dividers |
| `gray-300` | #d4d4d4 | rgb(212, 212, 212) | Disabled states |
| `gray-400` | #a3a3a3 | rgb(163, 163, 163) | Placeholder text |
| `gray-500` | #737373 | rgb(115, 115, 115) | Secondary text |
| `gray-600` | #525252 | rgb(82, 82, 82) | Muted text |
| `gray-700` | #404040 | rgb(64, 64, 64) | Body text |
| `gray-800` | #262626 | rgb(38, 38, 38) | Strong text |
| `gray-900` | #171717 | rgb(23, 23, 23) | Primary text, backgrounds |
| `gray-950` | #0a0a0a | rgb(10, 10, 10) | Pure dark |

### Accent Colors (Strategic Use Only)
| Color | Hex | Use Case |
|-------|-----|----------|
| Emerald | `#10b981` | Positive metrics, success states, upward trends |
| Amber | `#f59e0b` | Warnings, at-risk indicators, caution |
| Blue | `#3b82f6` | Links, active states, information |
| Rose | `#f43f5e` | Critical alerts, errors (use sparingly) |
| Purple | `#a855f7` | Premium features, special badges |
| Cyan | `#06b6d4` | Secondary accents, data visualization |

## Shadow System

| Token | Value | Use |
|-------|-------|-----|
| `shadow-subtle` | `rgba(0, 0, 0, 0.04) 0px 1px 2px 0px` | Subtle depth for buttons |
| `shadow-card` | `rgba(23, 23, 23, 0.04) 0px 4px 4px 0px` | Card components |
| `shadow-elevated` | Multi-layer shadow | Hover states, floating elements |
| `shadow-xl` | `rgba(23, 23, 23, 0.08) 0px 8px 16px 0px` | Modal overlays |
| `shadow-dramatic` | `rgba(23, 23, 23, 0.12) 0px 16px 32px 0px` | Hero elements |

## Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `radius-xs` | 4px | Very small elements, tags |
| `radius-sm` | 6px | Buttons, small badges |
| `radius-md` | 10px | Medium elements |
| `radius-lg` | 12px | Default cards (peec.ai standard) |
| `radius-xl` | 16px | Large hero cards, modal |
| `radius-2xl` | 24px | Extra large containers |
| `radius-full` | 9999px | Pills, avatars |

## Motion Tokens

| Token | Duration | Easing | Use |
|-------|----------|--------|-----|
| `duration-fast` | 150ms | ease-out | Hover states, micro-interactions |
| `duration-normal` | 300ms | cubic-bezier(0.16, 1, 0.3, 1) | Standard transitions |
| `duration-slow` | 500ms | cubic-bezier(0.21, 0.47, 0.32, 0.98) | Page transitions |
| `duration-reveal` | 800ms | cubic-bezier(0.16, 1, 0.3, 1) | Entrance animations |

### Easing Functions
```css
/* Spring-like bounce */
--ease-spring: cubic-bezier(0.16, 1, 0.3, 1);

/* Smooth deceleration */
--ease-smooth: cubic-bezier(0.21, 0.47, 0.32, 0.98);

/* Quick snap */
--ease-snap: cubic-bezier(0.32, 0.72, 0, 1);
```

## Spacing Scale (8px Base)

| Token | Value | Use |
|-------|-------|-----|
| `space-1` | 4px | Tight gaps, icon spacing |
| `space-2` | 8px | Small gaps |
| `space-3` | 12px | Compact padding |
| `space-4` | 16px | Default padding |
| `space-6` | 24px | Medium gaps |
| `space-8` | 32px | Section gaps |
| `space-12` | 48px | Large section padding |
| `space-16` | 64px | Hero padding |
| `space-24` | 96px | Major section breaks |
| `space-32` | 128px | Page-level spacing |

## Z-Index Scale

| Token | Value | Use |
|-------|-------|-----|
| `z-base` | 0 | Default |
| `z-elevated` | 10 | Cards with hover |
| `z-dropdown` | 100 | Dropdown menus |
| `z-sticky` | 200 | Sticky headers |
| `z-modal` | 300 | Modal overlays |
| `z-tooltip` | 400 | Tooltips |
| `z-max` | 999 | Critical overlays |

## Background Utilities

| Class | Effect |
|-------|--------|
| `.bg-noise` | Subtle noise texture overlay |
| `.bg-mesh-gradient` | Multi-color radial gradients |
| `.bg-peec-gradient` | Dark gradient overlay |
| `.bg-peec-gradient-subtle` | Light gradient overlay |
| `.bg-grid` | 24px square grid pattern |
| `.bg-dots` | Dot pattern background |
| `.bg-stripes` | Diagonal stripe pattern |

## Animation Utilities

| Class | Effect |
|-------|--------|
| `.animate-reveal` | Entrance with blur and scale |
| `.animate-float` | Gentle vertical float |
| `.animate-glow` | Pulsing glow effect |
| `.animate-shimmer` | Loading shimmer |
| `.hover-lift` | Lift on hover with shadow |
| `.stagger-1` to `.stagger-5` | Staggered animation delays |
