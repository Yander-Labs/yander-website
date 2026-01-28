# Yander Website

Next.js 16.1 + React 19 + TypeScript marketing website with Sanity CMS blog.

## Architecture

| Decision | Rationale |
|----------|-----------|
| `app/(main)/` route group | Pages with Navigation/Footer |
| `app/studio/` route group | Full-screen CMS (no nav/footer) |
| Sanity embedded studio | Single-domain deployment |
| Tailwind v4 | Native CSS theme variables |
| Framer Motion | Declarative animations with scroll triggers |

## Commands

```bash
npm run dev:watch    # Dev server with auto-recovery (port 3001)
npm run build        # Production build - run before committing
npm run lint         # Check for errors
```

## Key Locations

| Purpose | Path |
|---------|------|
| Public pages | `app/(main)/` |
| Sanity Studio | `app/studio/` |
| Components | `components/{ui,sections,blog}/` |
| Queries | `lib/queries.ts` |
| Types | `lib/types.ts` |
| Sanity schemas | `sanity/schemaTypes/` |

## Component Pattern

```typescript
"use client" // Only if hooks/interactivity needed

import { cn } from "@/lib/utils"

export function Component({ className }: { className?: string }) {
  return <div className={cn("base-classes", className)} />
}
```

## Sanity Pattern

```typescript
import { sanityFetch, urlFor } from "@/lib/sanity"
import type { PostCard } from "@/lib/types"

const posts = await sanityFetch<PostCard[]>(postsQuery)
urlFor(image).width(600).height(400).url()
```

## Environment

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=s3r1d2vt
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_TOKEN=<required for writes>
REPLICATE_API_TOKEN=<required for AI images>
```

## Rules & Skills

| Topic | Location |
|-------|----------|
| Boundaries (Always/Ask/Never) | `.claude/rules/boundaries.md` |
| Context hygiene | `.claude/rules/context-hygiene.md` |
| Blog workflow | `.claude/rules/blog.md` |
| Sanity CMS | `.claude/rules/sanity.md` |
| SEO | `.claude/rules/seo.md` |
| Styling | `.claude/rules/styling.md` |
| Components | `.claude/rules/components.md` |
| Design tokens | `.claude/rules/design-tokens.md` |
| Anti-AI-slop | `.claude/skills/frontend-design/SKILL.md` |
| `/context-audit` | Audit agent config health |

## Quick Reference

- Use named exports (not default)
- Port 3001 (avoid conflicts)
- `font-serif` for headlines, `font-sans` for body
- Border color: `border-[#E4E7EC]`
