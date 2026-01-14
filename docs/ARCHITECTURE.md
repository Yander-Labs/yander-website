# Yander Website Architecture

## Overview

The Yander website is a single-page marketing site with an integrated blog system, built on modern web technologies for optimal performance and developer experience.

## Technology Choices

### Next.js 16.1 with App Router

**Why:** Server Components provide automatic code splitting, streaming, and improved performance. The App Router offers intuitive file-based routing with support for layouts and route groups.

**Key Features Used:**
- Route Groups for layout separation (`(main)` vs `studio`)
- Dynamic routes for blog posts (`[slug]`)
- Catch-all routes for Sanity Studio (`[[...tool]]`)
- ISR (Incremental Static Regeneration) for blog content
- `generateStaticParams` for static blog pages
- `generateMetadata` for dynamic SEO

### Sanity CMS (Embedded Studio)

**Why:** Headless CMS with real-time collaboration, flexible schemas, and excellent developer experience. Embedding the studio at `/studio` means:
- Single deployment (no separate CMS URL)
- Shared authentication context
- Simpler infrastructure

**Project Details:**
- Project ID: `s3r1d2vt`
- Dataset: `production`
- API Version: `2024-01-01`

### Tailwind CSS v4

**Why:** Utility-first CSS with native CSS variables in v4 eliminates the need for a config file. The `@theme` directive provides clean theme customization.

**Design System:** Attio-inspired with refined shadows, borders, and typography.

### Framer Motion

**Why:** Declarative animations with React integration. Scroll-triggered animations via `whileInView` create engaging user experience without complex JavaScript.

## Directory Structure Explained

```
app/
├── (main)/              # Route group for public pages
│   ├── layout.tsx       # Adds Navigation and Footer
│   ├── page.tsx         # Homepage
│   └── blog/            # Blog routes
│       ├── page.tsx     # Listing
│       └── [slug]/      # Dynamic post pages
├── studio/              # Sanity Studio (no nav/footer)
│   └── [[...tool]]/     # Catch-all for studio routes
├── layout.tsx           # Root layout (fonts, metadata)
└── globals.css          # Tailwind theme & global styles
```

### Route Groups

The `(main)` route group wraps pages that need Navigation and Footer components. The `studio` route has a minimal layout for full-screen CMS experience.

**Alternative considered:** CSS class toggling to hide nav/footer. Rejected because route groups are more explicit and reliable.

## Data Flow

### Homepage
- Static rendering at build time
- No runtime data fetching
- Content lives in component files

### Blog Listing
1. Server-side fetch from Sanity CDN at request time
2. 60-second ISR revalidation
3. Client-side filtering via React state (no page reload)

### Blog Post
1. Static generation at build time via `generateStaticParams`
2. All post slugs pre-rendered
3. Metadata generated dynamically per post
4. Related posts fetched at request time

## Component Architecture

### Layers

1. **UI Primitives** (`components/ui/`) - Reusable building blocks
   - Button, Card, Container, Badge, etc.
   - No business logic, highly composable

2. **Section Components** (`components/sections/`) - Homepage sections
   - Self-contained with their own data
   - Use UI primitives internally

3. **Blog Components** (`components/blog/`) - Blog-specific
   - Receive Sanity data as props
   - Handle rendering of CMS content

4. **Layout Components** - Navigation, Footer
   - Global, appear on most pages

### Server vs Client Components

- **Server Components** (default): Static sections, data fetching
- **Client Components** (`"use client"`): Interactivity, animations, hooks

Rule: Use client components only when necessary (hooks, events, browser APIs).

## Sanity Integration

### Client Configuration

```typescript
// lib/sanity.ts
export const client = createClient({
  projectId: 's3r1d2vt',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,  // Use CDN for reads
})
```

### Image Optimization

Images served via Sanity CDN with on-the-fly transformations:
- Width/height constraints
- Format conversion (webp)
- Quality optimization

### GROQ Queries

Centralized in `lib/queries.ts` for:
- Single source of truth
- Type safety with generic `sanityFetch<T>`
- Easy testing and modification

## Performance Considerations

### Build-time Optimizations
- Turbopack for fast development builds
- Static generation for all blog posts
- Code splitting via App Router

### Runtime Optimizations
- Sanity CDN for fast content delivery
- ISR for content freshness without full rebuilds
- Image optimization via Sanity transformations

### Bundle Size
- Tree-shaking via ES modules
- Named exports for better dead code elimination
- Lucide icons with tree-shaking

## Security

- No sensitive credentials in client code
- Sanity tokens only used in scripts (server-side)
- CORS configured for specific origins
- Environment variables for all configuration

## Deployment

Recommended: Vercel (automatic from GitHub)
- Environment variables in Vercel dashboard
- Automatic preview deployments
- ISR support built-in

## Future Considerations

- **Preview Mode:** For draft content preview before publishing
- **Internationalization:** Next.js i18n routing if needed
- **Search:** Consider Algolia for full-text search at scale
- **Analytics:** Vercel Analytics or Plausible for privacy-friendly tracking
