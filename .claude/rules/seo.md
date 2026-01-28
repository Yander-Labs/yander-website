# SEO Rules

## Meta Tags

### Title
| Guideline | Value |
|-----------|-------|
| Max length | 60 characters |
| Format | `{Post Title} \| Yander Blog` |
| Override | `seo.metaTitle` field |

### Description
| Guideline | Value |
|-----------|-------|
| Ideal length | 120-160 characters |
| Source priority | `seo.metaDescription` > `excerpt` > auto |

## OG Image

| Guideline | Value |
|-----------|-------|
| Dimensions | 1200x630px |
| Source | `seo.ogImage` or `mainImage` fallback |

## Keywords

| Guideline | Value |
|-----------|-------|
| Count | 3-5 per post |
| Location | `seo.keywords` array |

## SEO Audit Thresholds

| Score | Status | Action |
|-------|--------|--------|
| 90-100 | Excellent | Publish |
| 80-89 | Good | Publish |
| 60-79 | Needs Work | Fix warnings |
| <60 | Poor | Fix errors |

## Pre-Publish Checklist

- [ ] Title under 60 characters
- [ ] Meta description 120-160 chars
- [ ] Featured image with alt text
- [ ] Author assigned
- [ ] Category assigned
- [ ] 3-5 focus keywords
- [ ] SEO audit score 80+

## Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Title too long | Add `seo.metaTitle` override |
| Missing description | Set `excerpt` or `seo.metaDescription` |
| No featured image | Add `mainImage` with alt text |
| No author | Assign author reference |

## SEO Utilities

```typescript
import { auditPostSEO, formatAuditReport, generateJSONLD } from '@/lib/seo-utils'
```

## E-E-A-T

**Always assign an author** to improve Experience, Expertise, Authority, Trust signals.
