# Blog Rules

## Routes

| Route | File |
|-------|------|
| `/blog` | `app/(main)/blog/page.tsx` |
| `/blog/[slug]` | `app/(main)/blog/[slug]/page.tsx` |
| `/studio` | Sanity Studio |

## Post Creation Decision Tree

```
1. Has mainImage?
   NO → Generate: generateBlogImage(title, 'yander')
   YES → Continue

2. Has 1-3 inline images in body?
   NO → Add via generateInlineImage() or screenshotInlineImage()
   YES → Continue

3. Has author assigned?
   NO → Select from listAuthors()
   YES → Continue

4. Has categories (1-2)?
   NO → Select from listCategories()
   YES → Continue

5. SEO audit score >= 80?
   NO → Fix issues from auditPostSEO()
   YES → Ready to publish
```

## Visual Requirements

| Asset | Required | Source |
|-------|----------|--------|
| Main Header Image | **YES** | AI (nano-banana-pro) |
| Inline Images (1-3) | **YES** | AI or Screenshot |
| OG Image | Auto | Falls back to mainImage |

## Image Type Decision

| Content Type | Use |
|--------------|-----|
| Conceptual ideas | `generateInlineImage()` |
| Product UIs | `screenshotInlineImage()` |
| Tutorials/steps | `screenshotInlineImage()` |
| Abstract concepts | `generateInlineImage()` |

## Yander Image Style

Use `'yander'` style: flat illustration, grainy texture, sketchy edges, monochrome grayscale.

## Available Queries

| Query | Returns |
|-------|---------|
| `postsQuery` | All posts |
| `paginatedPostsQuery` | Posts + total |
| `postBySlugQuery` | Single post |
| `postSlugsQuery` | All slugs |
| `categoriesQuery` | All categories |
| `relatedPostsQuery` | Related posts |

## Post Page Components (order)

1. ReadingProgress
2. PostHeader
3. TableOfContents (desktop)
4. PostBody
5. ShareButtons
6. AuthorCard
7. RelatedPosts

## Quality Checklist

- [ ] Main header image attached
- [ ] 1-3 inline images in body
- [ ] All images have alt text
- [ ] Author assigned
- [ ] Categories (1-2)
- [ ] Excerpt 120-160 chars
- [ ] SEO keywords (3-5)
- [ ] SEO score 80+

## Environment Required

| Variable | Purpose |
|----------|---------|
| `SANITY_TOKEN` | Write access |
| `REPLICATE_API_TOKEN` | AI images |

## Cost Per Post

| Component | Cost |
|-----------|------|
| Header + 2 inline | ~$0.06 |
| Screenshots | Free |

## Detailed Examples

See `.claude/deep-dive/image-generation.md` and `.claude/deep-dive/portable-text.md`.
