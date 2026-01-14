# SEO Rules

Best practices for search engine optimization on blog posts.

## Meta Tags

### Title
| Guideline | Value |
|-----------|-------|
| Max length | 60 characters (70 hard limit) |
| Format | `{Post Title} \| Yander Blog` |
| Override | Use `seo.metaTitle` field |

### Meta Description
| Guideline | Value |
|-----------|-------|
| Ideal length | 120-160 characters |
| Source priority | `seo.metaDescription` > `excerpt` > auto |
| Content | Action-oriented, includes keywords |

## Open Graph (Social Sharing)

### Required Tags
```html
<meta property="og:title" content="Post Title" />
<meta property="og:description" content="Description" />
<meta property="og:type" content="article" />
<meta property="og:url" content="https://yander.ai/blog/slug" />
<meta property="og:image" content="https://cdn.sanity.io/images/..." />
<meta property="og:site_name" content="Yander" />
```

### Image Requirements
| Guideline | Value |
|-----------|-------|
| Dimensions | 1200x630px (1.91:1 ratio) |
| Format | JPG or PNG |
| File size | Under 1MB |
| Source | `seo.ogImage` or `mainImage` fallback |

## Twitter Cards

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Post Title" />
<meta name="twitter:description" content="Description" />
<meta name="twitter:image" content="https://..." />
```

## Canonical URLs

| Scenario | Canonical |
|----------|-----------|
| Default | Post URL (`/blog/[slug]`) |
| Override | `seo.canonicalUrl` field |
| Use for | Syndicated content, cross-posted articles |

## JSON-LD Structured Data

```typescript
import { generateJSONLD } from '@/lib/seo-utils'

const jsonLd = generateJSONLD(post)
// Include in <script type="application/ld+json">
```

### BlogPosting Schema
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Post Title",
  "description": "...",
  "image": "...",
  "datePublished": "2024-01-01",
  "author": { "@type": "Person", "name": "Author Name" },
  "publisher": { "@type": "Organization", "name": "Yander" }
}
```

## Robots Directives

| Setting | Behavior |
|---------|----------|
| Default | `index, follow` |
| No-index | Set `seo.noIndex: true` |
| Use for | Draft previews, duplicate content, test pages |

## Keywords

| Guideline | Value |
|-----------|-------|
| Count | 3-5 focus keywords per post |
| Location | `seo.keywords` array |
| Usage | JSON-LD, meta keywords |
| Research | Long-tail, intent-based terms |

## SEO Audit Thresholds

| Score | Status | Publish? |
|-------|--------|----------|
| 90-100 | Excellent | Yes |
| 80-89 | Good | Yes |
| 60-79 | Needs Work | Review first |
| <60 | Poor | No - fix errors |

## Content Guidelines

### Headings
- One H1 (title) per page
- H2 for main sections
- H3 for subsections
- Use keywords naturally in headings

### Images
- Always include alt text
- Use descriptive filenames
- Optimize file size (<500KB)
- Lazy load below-fold images

### Internal Linking
- Link to related posts
- Use descriptive anchor text
- Avoid "click here" links
- 3-5 internal links per post

## E-E-A-T Signals

Google's Experience, Expertise, Authority, Trust:

| Signal | Implementation |
|--------|---------------|
| Experience | Author with relevant background |
| Expertise | Detailed, accurate content |
| Authority | Author bio, credentials |
| Trust | Professional presentation |

**Always assign an author** to improve E-E-A-T signals.

## Pre-Publish Checklist

- [ ] Title under 60 characters
- [ ] Meta description 120-160 characters
- [ ] Featured image with alt text
- [ ] OG image set (or uses main image)
- [ ] Author assigned
- [ ] Category assigned
- [ ] 3-5 focus keywords added
- [ ] Internal links included
- [ ] SEO audit score 80+

## Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Title too long | Add `seo.metaTitle` override |
| Missing description | Set `excerpt` or `seo.metaDescription` |
| No featured image | Add `mainImage` with alt text |
| Missing alt text | Update `mainImage.alt` |
| No author | Assign author reference |
| Low content | Expand body content |

## SEO Utilities

```typescript
import {
  generatePostSEO,      // Full metadata object
  generateJSONLD,       // Structured data
  auditPostSEO,         // Score + issues
  formatAuditReport,    // Human-readable report
  getScoreLabel         // Score interpretation
} from '@/lib/seo-utils'
```
