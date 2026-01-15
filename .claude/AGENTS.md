# Extended AI Agent Context

Additional context for AI agents working on the Yander Website.

## Architecture Decisions

### Route Groups
- `(main)` group wraps pages needing Navigation/Footer
- `studio` group intentionally has no nav/footer (full-screen CMS experience)
- This separation uses Next.js route groups to avoid CSS hacks

### Why These Technology Choices
- **Next.js 16 App Router**: Server Components for performance, ISR for blog freshness
- **Sanity embedded studio**: Single-domain deployment, no separate CMS URL
- **Tailwind v4**: Native CSS theme variables, no config file needed
- **Framer Motion**: Performant declarative animations with scroll triggers

## Design System Reference

### Colors (Attio-inspired)
| Use | Class |
|-----|-------|
| Primary text | `text-gray-900` |
| Secondary text | `text-gray-500` |
| Muted text | `text-gray-400` |
| Borders | `border-[#E4E7EC]` |
| Background | `bg-white`, `bg-gray-50` |

### Typography
| Use | Class |
|-----|-------|
| Headings | `font-serif` (Instrument Serif) |
| Body | `font-sans` (Inter, default) |
| Hero | `text-5xl sm:text-6xl md:text-7xl` |
| Section titles | `text-3xl md:text-4xl` |

### Spacing
| Use | Class |
|-----|-------|
| Section padding | `py-20 md:py-28` |
| Container | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |
| Component gaps | `gap-4`, `gap-6`, `gap-8` |

### Shadows
| Name | Use |
|------|-----|
| `shadow-subtle` | Minimal depth |
| `shadow-card` | Card components |
| `shadow-elevated` | Hover states |
| `shadow-xl` | Large elements |

## Component Inventory

### UI Components (`components/ui/`)
- **Button**: primary/secondary/outline/ghost variants, sm/md/lg sizes
- **Container**: max-w-7xl centered wrapper with responsive padding
- **Card**: rounded-2xl with border and shadow
- **Badge**: small status indicators
- **SectionLabel**: uppercase category labels
- **AnimatedSection**: Framer Motion scroll-triggered animations
- **AnimatedNumber**: counting animation for statistics
- **MiniChart**: sparkline visualization

### Section Components (`components/sections/`)
Hero, Dashboard, TrustedBy, Integrations, GallupStats, HowItWorks, Results, Testimonials, BuiltForRemote, PrivacyFirst, ProactiveRetention, WhoItsFor, GetStarted, CTA

### Blog Components (`components/blog/`)
BlogCard, BlogHero, BlogSearch, CategoryFilter, CategoryBadge, Pagination, PostHeader, PostBody, TableOfContents, AuthorCard, ShareButtons, RelatedPosts, CodeBlock, ReadingProgress

## Sanity Schema Reference

### Post Document
```
title (string, required)
slug (slug, required)
author (reference → author)
mainImage (image with alt text)
categories (array of references → category)
publishedAt (datetime)
excerpt (text)
body (blockContent)
readTime (number)
```

### Author Document
```
name (string, required)
slug (slug)
image (image with hotspot)
bio (text)
role (string)
```

### Category Document
```
title (string, required)
slug (slug)
description (text)
color (string - Tailwind color name)
```

### BlockContent (Rich Text)
- Block types: h2, h3, h4, blockquote, normal
- Marks: strong, em, code, underline, strike-through
- Annotations: links with optional "open in new tab"
- Embedded: images with alt/caption, code blocks with language

### SEO Object (on Post)
```
metaTitle (string, max 60 chars)
metaDescription (text, max 160 chars)
ogImage (image, 1200x630px)
canonicalUrl (url)
noIndex (boolean)
keywords (array of strings)
```

## Sanity Agent Capabilities

### Available Operations

| Operation | Skill | Token Required |
|-----------|-------|----------------|
| Read posts/authors/categories | N/A | No |
| Create post | `/create-post` | Yes |
| Update post | `/update-post` | Yes |
| Delete post | `/delete-post` | Yes |
| Manage authors | `/manage-author` | Yes |
| Manage categories | `/manage-category` | Yes |
| SEO audit | `/seo-audit` | No |
| Generate AI image | `/generate-image` | Yes (Replicate + Sanity) |
| Add inline image | `/add-inline-image` | Yes (Sanity, optionally Replicate) |

### Write Client Setup

```bash
export SANITY_TOKEN=your_write_token
# Get from: https://www.sanity.io/manage → Project → API → Tokens
```

### Key Files

| File | Purpose |
|------|---------|
| `lib/sanity-write.ts` | Write-enabled client |
| `lib/sanity-crud.ts` | CRUD helper functions |
| `lib/seo-utils.ts` | SEO generation and audit |
| `lib/replicate.ts` | AI image generation |

### AI Image Generation

**Required:** `REPLICATE_API_TOKEN` from https://replicate.com/account/api-tokens

| Model | Speed | Quality | Cost | Notes |
|-------|-------|---------|------|-------|
| `nano-banana-pro` | ~5s | **Best** | ~$0.02 | **Recommended default** |
| `imagen-4-ultra` | ~15s | Ultra | ~$0.08 | Highest quality |
| `imagen-4` | ~8s | Excellent | ~$0.04 | Google flagship |
| `imagen-4-fast` | ~3s | Very Good | ~$0.01 | Fast + cheap |
| `flux-schnell` | ~2s | Good | ~$0.003 | Fastest, cheapest |
| `flux-pro` | ~10s | Excellent | ~$0.05 | Good alternative |

```typescript
import { generateBlogImage, generateOGImage } from '@/lib/replicate'

// Generate header image from post title (uses nano-banana-pro by default)
const mainImage = await generateBlogImage('Post Title', 'professional')

// Generate OG image for social sharing
const ogImage = await generateOGImage('Post Title', 'professional')
```

### Screenshot Capability

Take screenshots of external websites for documentation and tutorials.

```typescript
import { screenshotAndUpload, screenshotElement } from '@/lib/screenshot'

// Full viewport screenshot
const imageRef = await screenshotAndUpload(
  'https://example.com/dashboard',
  'dashboard-screenshot.png',
  'Dashboard interface'
)

// Specific element screenshot
const elementRef = await screenshotElement(
  'https://example.com',
  '.main-content',
  'content-area.png',
  'Main content area'
)
```

### Inline Body Images

Add screenshots or AI-generated images directly into blog post body content.

```typescript
import { generateInlineImage, screenshotInlineImage, insertInlineImage } from '@/lib/sanity-crud'

// AI-generated inline image
const aiImage = await generateInlineImage(
  'Modern analytics dashboard visualization',
  'Analytics dashboard',
  'Figure 1: Sample analytics view'
)

// Screenshot inline image
const screenshot = await screenshotInlineImage(
  'https://example.com/ui',
  'Example UI screenshot',
  'Figure 2: Live interface'
)

// Insert into existing post body
await insertInlineImage(postId, aiImage, 3) // Insert after 3rd block
```

### Safety Rules

1. **Always confirm deletions** with explicit user consent
2. **Check references** before deleting authors/categories
3. **Run SEO audit** after creating/updating posts
4. **Never commit** SANITY_TOKEN to version control

### SEO Audit Thresholds

| Score | Status | Action |
|-------|--------|--------|
| 90+ | Excellent | Publish |
| 80-89 | Good | Publish |
| 60-79 | Needs Work | Fix warnings |
| <60 | Poor | Fix errors |

See [sanity-agent-guide.md](../docs/sanity-agent-guide.md) for full documentation.

## GROQ Query Patterns

### Dereference Relations
```groq
author->{name, image}
categories[]->{title, slug, color}
```

### Single Document by Slug
```groq
*[_type == "post" && slug.current == $slug][0]
```

### Paginated List
```groq
*[_type == "post"] | order(publishedAt desc) [$start...$end]
```

### Filter by Category
```groq
*[_type == "post" && $categorySlug in categories[]->slug.current]
```

### Full-Text Search
```groq
*[_type == "post" && (
  title match $term + "*" ||
  excerpt match $term + "*" ||
  pt::text(body) match $term + "*"
)]
```

## Animation Patterns

### Scroll Reveal
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
>
```

### Stagger Children
```typescript
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    visible: { transition: { staggerChildren: 0.1 } }
  }}
>
```

## Data Flow

### Homepage
Static rendering, no external data fetching. All content is in components.

### Blog Listing
Server-side fetch from Sanity CDN. 60-second ISR revalidation.
Client-side search filtering with React state.

### Blog Post
Static generation with `generateStaticParams` for all slugs.
Dynamic metadata with `generateMetadata`.
Related posts fetched at request time.

## Performance Notes

- Use Turbopack for development (`npm run dev`)
- Images optimized via Sanity CDN with `urlFor().width().height()`
- CDN-cached queries in production with ISR for freshness
- Avoid "use client" on components that don't need interactivity
