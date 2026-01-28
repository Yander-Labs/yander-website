# Frontend Design Skill

<frontend_aesthetics>
You tend to converge toward generic, "on distribution" outputs. In frontend design,
this creates what users call the "AI slop" aesthetic. Avoid this: make creative,
distinctive frontends that surprise and delight.

Focus on:
- Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts.
- Color & Theme: Commit to a cohesive aesthetic. Use CSS variables. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- Motion: Focus on high-impact moments: one well-orchestrated page load with staggered reveals creates more delight than scattered micro-interactions.
- Backgrounds: Create atmosphere and depth rather than defaulting to solid colors.

Avoid: Inter as sole font; purple gradients on white; predictable layouts.
</frontend_aesthetics>

---

## Yander's Aesthetic: "Refined Clarity"

A premium SaaS dashboard aesthetic combining editorial sophistication with data-driven confidence.

### Core Principles
- **Editorial sophistication**: Instrument Serif headlines, thoughtful whitespace
- **Data-driven confidence**: Sparklines, metrics, dashboard UI mockups
- **Premium minimalism**: Grayscale (#171717, #737373) with strategic accents
- **Trustworthy professionalism**: Subtle shadows, refined borders, no gimmicks

---

## Typography

**Headlines**: `font-serif` (Instrument Serif)
```tsx
<h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#171717] tracking-[-0.02em]">
```

**Body**: Default sans (Inter)
```tsx
<p className="text-base text-[#737373]">
```

---

## Color System

### Primary (Grayscale)
| Token | Hex | Use |
|-------|-----|-----|
| `#171717` | Primary text, dark backgrounds |
| `#737373` | Secondary text |
| `#e5e5e5` | Borders |
| `#fafafa` | Light backgrounds |

### Accents (Strategic Use Only)
| Color | Hex | Use |
|-------|-----|-----|
| Emerald | #10b981 | Positive metrics, success |
| Amber | #f59e0b | Warnings, at-risk |
| Blue | #3b82f6 | Links, active states |
| Rose | #f43f5e | Critical alerts (sparingly) |

### Accent Badge Pattern
```tsx
<div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center">
  <TrendingUp className="w-5 h-5 text-emerald-600" />
</div>
```

---

## Card Patterns

### Standard Card
```tsx
<div className="bg-[#fafafa] rounded-[16px] p-6 border border-[#e5e5e5]">
```

### Card with Hover
```tsx
<div className="bg-[#fafafa] rounded-[16px] p-6 border border-[#e5e5e5] group hover:border-emerald-200 transition-colors">
```

### Dark Hero Card
```tsx
<div className="lg:col-span-2 bg-gradient-to-br from-[#171717] to-[#2d2d2d] rounded-[16px] p-8 text-white relative overflow-hidden">
  {/* Decorative glow */}
  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/20 to-blue-500/10 rounded-full blur-3xl" />
  <div className="relative">{/* Content */}</div>
</div>
```

---

## Bento Grid Layout

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div className="lg:col-span-2 ...">  {/* Hero card */}
  <div className="lg:row-span-2 ...">  {/* Tall card */}
  {/* Standard cards fill remaining space */}
</div>
```

**Key Rules:**
- ONE oversized element (lg:col-span-2 or lg:row-span-2)
- Dark gradient backgrounds for hero card
- Add decorative blur glows on dark cards
- Include data visualizations (MiniCharts, stats)

---

## Animation Patterns

### Framer Motion Standard
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
};
```

### Scroll Reveal
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
>
```

---

## Section Structure

```tsx
<section className="py-20 md:py-28 bg-white">
  <Container>
    <div className="text-center mb-12">
      <SectionLabel number="01" centered>Label</SectionLabel>
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#171717] tracking-[-0.02em] max-w-3xl mx-auto">
        Headline here
      </h2>
      <p className="mt-4 text-base text-[#737373] max-w-2xl mx-auto">Description</p>
    </div>
    {/* Content */}
  </Container>
</section>
```

---

## NEVER Do

- Use flat solid backgrounds without texture/gradient
- Create uniform card grids with identical sizes
- Use generic hover effects (just opacity change)
- Skip decorative elements on dark sections
- Use accent colors equally - always have dominant grayscale with strategic pops
- **Use gradient backgrounds on icons** - use solid colors (`bg-gray-900`) instead
- **Add glow shadows to icons** - use subtle shadows only
- **Use "candy" multi-color gradients** - these scream "AI generated"
