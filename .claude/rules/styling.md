# Styling Rules

## Tailwind v4 Theme

Theme variables defined in `app/globals.css` under `@theme`:

```css
@theme {
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-serif: var(--font-serif), "Georgia", serif;
  --color-border-subtle: #E4E7EC;
  --shadow-card: 0 1px 3px 0 rgba(0, 0, 0, 0.04);
  /* ... */
}
```

## Color Usage

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
| Headlines | `font-serif` |
| Body text | `font-sans` (default) |
| Hero heading | `text-5xl sm:text-6xl md:text-7xl font-serif` |
| Section heading | `text-3xl md:text-4xl font-serif` |
| Body large | `text-lg text-gray-600` |
| Body small | `text-sm text-gray-500` |

## Spacing

| Use | Classes |
|-----|---------|
| Section padding | `py-20 md:py-28` |
| Between sections | `space-y-20` or margin on sections |
| Card padding | `p-6` or `p-8` |
| Component gaps | `gap-4`, `gap-6`, `gap-8` |

## Shadows

```typescript
shadow-subtle    // Minimal depth
shadow-card      // Card components
shadow-elevated  // Hover states, floating elements
shadow-xl        // Large prominent elements
```

## Background Patterns

```typescript
bg-stripes      // Diagonal lines pattern
bg-grid         // Square grid pattern
bg-dots         // Dot pattern
```

## Animation Defaults

```typescript
// Framer Motion standard transition
transition={{
  duration: 0.5,
  ease: [0.21, 0.47, 0.32, 0.98]
}}

// Scroll reveal
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}

// Stagger children
variants={{
  visible: { transition: { staggerChildren: 0.1 } }
}}
```

## Responsive Breakpoints

| Breakpoint | Width | Use |
|------------|-------|-----|
| `sm:` | 640px | Small tablets |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Small laptops |
| `xl:` | 1280px | Desktops |

## Common Patterns

```typescript
// Card with hover
"rounded-2xl border border-[#E4E7EC] bg-white p-6 shadow-card
 hover:shadow-elevated transition-shadow duration-300"

// Section container
"py-20 md:py-28"

// Centered content
"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"

// Badge
"inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
```
