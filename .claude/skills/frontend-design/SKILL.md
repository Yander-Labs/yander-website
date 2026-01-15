# Frontend Design Skill

<frontend_aesthetics>
You tend to converge toward generic, "on distribution" outputs. In frontend design,
this creates what users call the "AI slop" aesthetic. Avoid this: make creative,
distinctive frontends that surprise and delight.

Focus on:
- Typography: Choose fonts that are beautiful, unique, and interesting. Avoid
  generic fonts like Arial and Inter; opt instead for distinctive choices.
- Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency.
  Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- Motion: Use animations for effects and micro-interactions. Focus on high-impact
  moments: one well-orchestrated page load with staggered reveals creates more
  delight than scattered micro-interactions.
- Backgrounds: Create atmosphere and depth rather than defaulting to solid colors.
  Layer CSS gradients, use geometric patterns, or add contextual effects.

Avoid: Inter, Roboto, Arial; purple gradients on white; predictable layouts.

Think outside the box! Vary between light and dark themes, different fonts,
different aesthetics. NEVER converge on common choices (Space Grotesk, for example).
</frontend_aesthetics>

---

## Yander's Committed Aesthetic: "Refined Clarity"

A premium SaaS dashboard aesthetic combining editorial sophistication with data-driven confidence.

### Core Principles
- **Editorial sophistication**: Instrument Serif headlines, thoughtful whitespace
- **Data-driven confidence**: Sparklines, metrics, dashboard UI mockups
- **Premium minimalism**: Grayscale palette (#171717, #737373) with strategic accents
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
<p className="text-sm text-[#737373]">
```

**Labels/Captions**: Small muted text
```tsx
<p className="text-xs text-white/50">  // On dark backgrounds
<p className="text-[11px] text-gray-600">  // On light backgrounds
```

---

## Color System

### Primary Palette (Grayscale)
| Token | Hex | Use |
|-------|-----|-----|
| `#171717` | Primary text, dark backgrounds |
| `#2d2d2d` | Gradient endpoint for dark cards |
| `#737373` | Secondary text |
| `#e5e5e5` | Borders |
| `#fafafa` | Light backgrounds |

### Accent Colors (Strategic Use Only)
| Color | Hex | Use Case |
|-------|-----|----------|
| Emerald | `#10b981` | Positive metrics, success, upward trends |
| Amber | `#f59e0b` | Warnings, at-risk indicators |
| Blue | `#3b82f6` | Links, information, active states |
| Rose | `#f43f5e` | Critical alerts (use sparingly) |
| Purple | `#a855f7` | Premium features, AI elements |
| Cyan | `#06b6d4` | Secondary accents |

### Accent Badge Pattern
```tsx
// Icon badge with colored background
<div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center">
  <TrendingUp className="w-5 h-5 text-emerald-600" />
</div>

// Color variations:
bg-amber-50 border-amber-100 text-amber-600  // Warning
bg-blue-50 border-blue-100 text-blue-600     // Info
bg-purple-50 border-purple-100 text-purple-600  // Premium
bg-rose-50 border-rose-100 text-rose-600     // Critical
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
  <div className="... group-hover:scale-105 transition-transform">
```

### Dark Feature Card (Hero Element)
```tsx
<div className="lg:col-span-2 bg-gradient-to-br from-[#171717] to-[#2d2d2d] rounded-[16px] p-8 text-white relative overflow-hidden">
  {/* Decorative glow */}
  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/20 to-blue-500/10 rounded-full blur-3xl" />
  <div className="relative">
    {/* Content */}
  </div>
</div>
```

### Alert/Signal Card with Accent Bar
```tsx
<div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#e5e5e5]">
  <div className="w-1 h-10 rounded-full bg-emerald-500" />  {/* Accent bar */}
  <div className="flex-1">
    <p className="text-sm font-medium text-[#171717]">Title</p>
    <p className="text-xs text-[#737373]">Subtitle</p>
  </div>
  <MiniChart data={[4, 5, 5, 6, 7, 7, 8]} width={40} height={16} color="#10b981" />
</div>
```

---

## Bento Grid Layout

### Grid Structure
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Large hero card - spans 2 columns */}
  <div className="lg:col-span-2 ...">

  {/* Tall card - spans 2 rows */}
  <div className="lg:row-span-2 ...">

  {/* Standard cards fill remaining space */}
</div>
```

### Key Rules
- Always have ONE oversized element (lg:col-span-2 or lg:row-span-2)
- Use dark gradient backgrounds for the hero card
- Add decorative blur glows on dark cards
- Include data visualizations (MiniCharts, stats)

---

## Dark Section Pattern (DarkCTA)

```tsx
<div className="rounded-[24px] bg-gradient-to-br from-[#171717] via-[#1f1f1f] to-[#171717] p-8 md:p-12 lg:p-16 relative overflow-hidden">
  {/* Multi-color decorative blurs */}
  <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
  <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-amber-500/10 to-rose-500/10 rounded-full blur-3xl" />

  {/* Grid pattern overlay */}
  <div className="absolute inset-0 opacity-[0.03]" style={{
    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
    backgroundSize: '32px 32px'
  }} />

  <div className="relative">
    {/* Content */}
  </div>
</div>
```

---

## Animation Patterns

### Framer Motion Standard
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
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

### Animated Dots (Processing State)
```tsx
<div className="flex justify-center gap-1.5">
  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "150ms" }} />
  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: "300ms" }} />
</div>
```

---

## Dashboard UI Mockups

### Stats Card (Light)
```tsx
<div className="bg-white rounded-lg p-3 border border-[#e5e5e5]">
  <p className="text-xs text-[#737373] mb-1">Engagement</p>
  <p className="text-lg font-semibold text-[#171717]">7.8</p>
  <MiniChart data={[5, 6, 6.5, 7, 7.5, 7.8, 7.8]} width={60} height={20} color="#10b981" />
</div>
```

### Stats Card (Dark)
```tsx
<div className="bg-white/10 rounded-lg p-3">
  <p className="text-xs text-white/50 mb-1">Engagement</p>
  <p className="text-lg font-semibold text-white">7.8</p>
  <MiniChart data={[5, 6, 6.5, 7, 7.5, 7.8, 7.8]} width={60} height={20} color="#10b981" />
</div>
```

### Browser Chrome Mockup
```tsx
<div className="bg-white rounded-[12px] border border-[#e5e5e5] shadow-card overflow-hidden">
  {/* Browser chrome bar */}
  <div className="flex items-center gap-2 px-4 py-3 bg-[#fafafa] border-b border-[#e5e5e5]">
    <div className="flex gap-1.5">
      <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
      <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
      <div className="w-3 h-3 rounded-full bg-[#28c840]" />
    </div>
    <div className="flex-1 mx-4">
      <div className="bg-white rounded-md px-3 py-1.5 text-xs text-gray-400 border border-[#e5e5e5]">
        app.yander.co/dashboard
      </div>
    </div>
  </div>
  {/* Dashboard content */}
  <div className="p-6">
    {/* ... */}
  </div>
</div>
```

---

## Section Structure

### Standard Section
```tsx
<section className="py-20 md:py-28 bg-white">  {/* or bg-[#fafafa] */}
  <Container>
    {/* Header */}
    <div className="text-center mb-12">
      <SectionLabel number="01" centered>Label</SectionLabel>
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#171717] tracking-[-0.02em] max-w-3xl mx-auto">
        Headline here
      </h2>
      <p className="mt-4 text-base text-[#737373] max-w-2xl mx-auto">
        Description text
      </p>
    </div>

    {/* Content */}
  </Container>
</section>
```

### Section with Decorative Background
```tsx
<section className="py-20 md:py-28 bg-[#fafafa] border-y border-[#e5e5e5] relative overflow-hidden">
  <div className="absolute inset-0 bg-peec-gradient-subtle pointer-events-none" />
  <Container>
    {/* Content with relative positioning */}
  </Container>
</section>
```

---

## Button Patterns

### Primary (Dark)
```tsx
<button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-[6px] font-medium hover:bg-gray-800 transition-colors">
```

### Secondary (Light)
```tsx
<button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-[6px] font-medium border border-[#e5e5e5] hover:bg-gray-50 transition-colors">
```

### Ghost on Dark
```tsx
<button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white rounded-[8px] font-medium hover:bg-white/20 transition-colors border border-white/10">
```

---

## CSS Utilities Reference

Available in `globals.css`:
- `.text-display` - Serif headlines with tight tracking
- `.text-editorial` - Italic serif for emphasis
- `.bg-noise` - Subtle noise texture
- `.bg-mesh-gradient` - Multi-color radial gradients
- `.bg-peec-gradient` / `.bg-peec-gradient-subtle` - Dark gradient overlays
- `.animate-reveal` - Entrance with blur + scale
- `.hover-lift` / `.hover-lift-sm` - Lift + shadow on hover
- `.stagger-1` to `.stagger-6` - Animation delays
- `.glass` / `.glass-dark` - Glassmorphism
- `.shadow-dramatic` - Strong hero shadow
- `.glow-emerald` / `.glow-blue` / `.glow-amber` - Accent glows

---

## Do NOT

- Use flat solid backgrounds without texture/gradient
- Create uniform card grids with identical sizes
- Use generic hover effects (just opacity change)
- Skip decorative elements on dark sections
- Use accent colors equally - always have a dominant grayscale with strategic pops
- Forget data visualizations (MiniCharts, metrics, dashboards)
