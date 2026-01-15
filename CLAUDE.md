# Yander Website - AI Agent Instructions

## Project Overview
Next.js 16.1 + React 19 + TypeScript marketing website with Sanity CMS blog.
Remote team intelligence platform focused on employee engagement and retention.

## Critical Commands
```bash
npm run dev -- --port 3001  # Start dev server on port 3001
npm run build               # Production build - run before committing
npm run lint                # Check for linting errors
```

> **Port:** This project uses port 3001 to avoid conflicts with other local projects.

## File Locations
- **Pages**: `app/(main)/` for public routes, `app/studio/` for CMS
- **Components**: `components/{ui,sections,blog}/`
- **Sanity schemas**: `sanity/schemaTypes/`
- **Utilities**: `lib/{sanity.ts,queries.ts,types.ts,utils.ts}`
- **Scripts**: `scripts/`

## Environment Variables
Required in `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=s3r1d2vt
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

## Code Patterns

### Component Structure
```typescript
"use client" // Only if needed (hooks, interactivity)

import { cn } from "@/lib/utils"

interface ComponentProps {
  className?: string
}

export function Component({ className }: ComponentProps) {
  return <div className={cn("base-classes", className)} />
}
```

### When to Use "use client"
**Required for:** useState, useEffect, useRef, onClick, onChange, Framer Motion
**Not needed for:** Static rendering, server-side data fetching, pure display

### Styling Conventions
- Border color: `border-[#E4E7EC]`
- Shadows: `shadow-card`, `shadow-elevated`, `shadow-xl`
- Typography: `font-serif` for headings, `font-sans` (default) for body
- Section padding: `py-20 md:py-28`

### Anti-AI-Slop Design Rules

**Never Use:**
- Inter, Roboto, Open Sans, Arial for body text (we use Instrument Serif + Inter)
- Purple gradients on white backgrounds
- **Gradient backgrounds on icons** (e.g., `bg-gradient-to-br from-emerald-500 to-blue-500`) - use solid `bg-gray-900` instead
- **"Candy" multi-color gradients** - these look cheap and AI-generated
- **Glow shadows on icons** (e.g., `shadow-[0_0_40px_rgba(...)]`)
- Generic card layouts with uniform rounded corners
- Evenly-distributed color palettes
- Predictable 12-column grid layouts

**Always Use:**
- CSS variables for all colors (defined in globals.css)
- Minimum 3x size jumps for typography hierarchy
- One distinctive, memorable element per design
- Asymmetric layouts with intentional negative space
- High-impact entrance animations over scattered micro-interactions

**For Infographics:**
- Use geometric patterns or gradient meshes for backgrounds
- Apply dramatic shadows and layered transparencies
- Editorial/magazine aesthetic with serif headers
- Data visualization should tell a story, not just display numbers

**For Bento Grids:**
- Break the grid with at least one oversized element
- Use `lg:col-span-2` or `lg:row-span-2` for visual hierarchy
- Add micro-interactions on hover states
- Generous negative space OR controlled density - never mediocre middle ground

**Yander's Aesthetic Direction: "Refined Clarity"**
- **Editorial sophistication** - Serif headlines (Instrument Serif), thoughtful whitespace
- **Data-driven confidence** - Clear metrics, sparkline visualizations
- **Premium minimalism** - Grayscale palette with strategic accent colors
- **Trustworthy professionalism** - Subtle shadows, refined borders, no gimmicks

### Sanity Integration
```typescript
import { client, urlFor, sanityFetch } from "@/lib/sanity"
import { postsQuery, postBySlugQuery } from "@/lib/queries"
import type { Post, PostCard } from "@/lib/types"

// Fetch data
const posts = await sanityFetch<PostCard[]>(postsQuery)

// Image URLs
urlFor(image).width(600).height(400).url()
```

### Animation Defaults (Framer Motion)
```typescript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
```

## Common Tasks

### Add Homepage Section
1. Create `components/sections/NewSection.tsx`
2. Import and add to `app/(main)/page.tsx`
3. Use `Container`, `AnimatedSection` wrappers

### Add Blog Feature
1. Update `sanity/schemaTypes/` if new schema needed
2. Add GROQ query in `lib/queries.ts`
3. Add types in `lib/types.ts`
4. Create component in `components/blog/`

### Modify Sanity Schema
1. Edit `sanity/schemaTypes/{type}.ts`
2. Run `npm run build`
3. Studio auto-updates at `/studio`

### Seed Blog Content
```bash
SANITY_TOKEN=your_token node scripts/seed-blog-content.mjs
```

## File Naming
- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Pages: `page.tsx`, `layout.tsx`
- Use absolute imports: `@/components`, `@/lib`

## Route Groups
- `app/(main)/` - Public pages with Navigation and Footer
- `app/studio/` - Sanity Studio (no nav/footer, intentionally minimal)

## Sanity Schemas
- `post`: title, slug, author, mainImage, categories, body, readTime
- `author`: name, slug, image, bio, role
- `category`: title, slug, description, color (Tailwind color name)
- `blockContent`: Rich text with h2/h3/h4, images, code blocks

## Key Utilities
- `cn()` from `@/lib/utils` - Merge conditional classnames
- `urlFor()` from `@/lib/sanity` - Build Sanity image URLs
- `sanityFetch<T>()` from `@/lib/sanity` - Typed GROQ queries

## Do NOT
- Add "use client" to server components unnecessarily
- Use default exports for components (use named exports)
- Hardcode Sanity credentials
- Modify `app/studio/` layout (intentionally minimal for full-screen CMS)
- Create new files when editing existing ones would suffice

## Quick Reference
| Task | File |
|------|------|
| Add nav link | `components/Navigation.tsx` |
| Add footer link | `components/Footer.tsx` |
| New blog query | `lib/queries.ts` |
| New type | `lib/types.ts` |
| Global styles | `app/globals.css` |
| Sanity config | `sanity.config.ts` |
