# Create Blog Post

Create a new blog post in Sanity CMS with full SEO optimization and visual assets.

## Prerequisites

- `SANITY_TOKEN` environment variable with write access
- `REPLICATE_API_TOKEN` environment variable for AI image generation
- Author must exist (or create one first with `/manage-author`)
- Categories should exist (or create with `/manage-category`)

## Visual Requirements (MANDATORY)

Every blog post MUST include:

1. **Main Header Image** - AI-generated via Replicate (nano-banana-pro)
2. **1-3 Inline Images** - Screenshots OR AI-generated visuals within the body

Without visuals, blog posts appear incomplete and unprofessional. NEVER publish a post without images.

## Workflow

### 1. Gather Required Information

Ask the user for:

| Field | Required | Guidelines |
|-------|----------|------------|
| Title | Yes | Clear, compelling, 40-60 characters ideal |
| Content | Yes | Main body text (markdown or plain text) |
| Author | Recommended | Select from existing authors |
| Categories | Recommended | One or more categories |
| Excerpt | Recommended | 120-160 characters for search snippets |

### 2. List Available Authors

```typescript
import { listAuthors } from '@/lib/sanity-crud'

const authors = await listAuthors()
// Present options: authors.map(a => `${a.name} (${a._id})`)
```

### 3. List Available Categories

```typescript
import { listCategories } from '@/lib/sanity-crud'

const categories = await listCategories()
// Present options: categories.map(c => `${c.title} - ${c.color}`)
```

### 4. Ask About SEO Customization

Optional SEO fields:
- **Meta Title** - Override title for search engines (if different from post title)
- **Meta Description** - Override excerpt for search (if different)
- **Focus Keywords** - 3-5 target keywords
- **OG Image** - Custom social sharing image (defaults to main image)

### 5. Generate Main Header Image (REQUIRED)

```typescript
import { generateBlogImage } from '@/lib/replicate'

// Generate Yander-style header image
const mainImage = await generateBlogImage(
  postTitle,
  'yander',        // Use Yander brand style (flat illustration, grainy texture)
  'nano-banana-pro' // Best quality model
)
```

**Image Style Options:**
- `yander` - Flat illustration, grainy texture, sketchy edges (DEFAULT)
- `professional` - Clean, modern business aesthetic
- `abstract` - Geometric shapes, vibrant colors
- `illustration` - Flat design, friendly appearance
- `photography` - Photorealistic stock photo style

### 6. Plan and Generate Inline Images (REQUIRED)

For each blog post, identify 1-3 places where visuals enhance the content:

**Use Screenshots for:**
- Real product UIs and dashboards
- External website references
- Step-by-step tutorials
- Before/after comparisons

**Use AI Images for:**
- Conceptual illustrations
- Abstract visualizations
- Metaphorical representations
- Section headers/dividers

```typescript
import { screenshotInlineImage, generateInlineImage } from '@/lib/sanity-crud'

// Screenshot of a relevant website/tool
const screenshot = await screenshotInlineImage(
  'https://analytics.google.com',
  'Google Analytics dashboard showing engagement metrics',
  'Figure 1: Example analytics interface'
)

// AI-generated conceptual image
const conceptImage = await generateInlineImage(
  'Team of remote workers collaborating through digital connections',
  'Remote team collaboration visualization',
  'Figure 2: The connected remote team'
)
```

### 7. Build Post Body with Inline Images

```typescript
import { createTextBlock, createListBlock, generateSlug, generateKey, estimateReadTime } from '@/lib/sanity-crud'
import type { PostInput } from '@/lib/types'

// Build body with text AND images interspersed
const body = [
  createTextBlock('Introduction', 'h2'),
  createTextBlock('Opening paragraph explaining the topic...'),

  // AI image after introduction
  await generateInlineImage(
    'Conceptual visualization of remote team engagement',
    'Remote engagement concept',
    'Figure 1: Understanding engagement patterns'
  ),

  createTextBlock('Key Insights', 'h2'),
  createTextBlock('The main points...'),
  ...createListBlock([
    'First insight with supporting detail',
    'Second insight with data',
    'Third insight with action item'
  ], 'bullet'),

  // Screenshot showing real-world example
  await screenshotInlineImage(
    'https://example.com/dashboard',
    'Dashboard showing engagement metrics',
    'Figure 2: Real engagement dashboard'
  ),

  createTextBlock('Conclusion', 'h2'),
  createTextBlock('Summary and call to action...')
]
```

### 8. Create the Post

```typescript
import { createPost } from '@/lib/sanity-crud'

const post: PostInput = {
  _type: 'post',
  title: userTitle,
  slug: generateSlug(userTitle),
  mainImage: mainImage,  // REQUIRED - from step 5
  author: selectedAuthorId ? { _type: 'reference', _ref: selectedAuthorId } : undefined,
  categories: selectedCategoryIds.map(id => ({
    _type: 'reference',
    _ref: id,
    _key: generateKey()
  })),
  publishedAt: new Date().toISOString(),
  excerpt: userExcerpt,
  readTime: estimateReadTime(body),
  body: body,  // Includes inline images from step 6-7
  seo: {
    metaTitle: seoTitle || undefined,
    metaDescription: seoDescription || undefined,
    keywords: seoKeywords || undefined
  }
}

const created = await createPost(post)
console.log(`Created post: ${created._id}`)
console.log(`URL: /blog/${post.slug.current}`)
```

### 9. Run SEO Audit

```typescript
import { auditPostSEO, formatAuditReport } from '@/lib/seo-utils'

const audit = auditPostSEO(created)
console.log(formatAuditReport(created))

// If score < 80, suggest improvements
```

## Visual Asset Checklist

Before publishing, verify:

- [ ] Main header image generated and attached
- [ ] Header image has alt text (automatically set to title)
- [ ] 1-3 inline images included in body content
- [ ] All inline images have alt text and captions
- [ ] Images are positioned near relevant text
- [ ] Mix of screenshot and AI images (when appropriate)

## Inline Image Position Guidelines

| Section Type | Best Image Type | Placement |
|-------------|-----------------|-----------|
| Introduction | AI conceptual | After first 1-2 paragraphs |
| How-to steps | Screenshot | After each major step |
| Data/metrics | Screenshot | Alongside the data discussion |
| Concepts | AI illustration | To visualize abstract ideas |
| Conclusion | AI or none | Optional, before CTA |

## Portable Text Content Helpers

### Simple Paragraphs
```typescript
createTextBlock('Regular paragraph text.')
```

### Headings
```typescript
createTextBlock('Section Title', 'h2')
createTextBlock('Subsection', 'h3')
```

### Lists
```typescript
import { createListBlock } from '@/lib/sanity-crud'

const bullets = createListBlock([
  'First item',
  'Second item',
  'Third item'
], 'bullet')

const numbered = createListBlock([
  'Step one',
  'Step two'
], 'number')
```

## Screenshot Options Reference

```typescript
interface ScreenshotOptions {
  width?: number        // Viewport width (default: 1200)
  height?: number       // Viewport height (default: 630)
  fullPage?: boolean    // Capture full scrollable page
  selector?: string     // Capture specific element only
  waitFor?: number      // Wait ms after page load
  deviceScale?: number  // Retina scaling (default: 2)
}

// Examples
await screenshotInlineImage(url, alt, caption, { fullPage: true })
await screenshotInlineImage(url, alt, caption, { selector: '.main-content' })
await screenshotInlineImage(url, alt, caption, { waitFor: 3000 })
```

## AI Image Generation Tips

1. **Be specific** - "Remote team on video call with laptops" > "remote work"
2. **Include style cues** - The function adds Yander branding automatically
3. **Avoid text requests** - AI text rendering is unreliable
4. **Think metaphorically** - Abstract concepts work well as illustrations

## Post-Creation Checklist

- [ ] Post created successfully (got `_id` back)
- [ ] Main header image attached
- [ ] Inline images render correctly
- [ ] All images have alt text
- [ ] SEO audit score is 80+ (publishable)
- [ ] Verify in Sanity Studio at `/studio`
- [ ] Wait 60s for ISR, check `/blog/[slug]`
- [ ] Excerpt is within 160 characters

## Error Handling

| Error | Solution |
|-------|----------|
| "SANITY_TOKEN not configured" | Set the environment variable |
| "REPLICATE_API_TOKEN not configured" | Set the environment variable |
| "Author not found" | Create author first with `/manage-author` |
| "Validation failed" | Check required fields (title, slug) |
| "Image generation failed" | Check Replicate API status/quota |
| "Screenshot timeout" | Increase `waitFor` option or check URL |

## Example Complete Workflow

```
User: Create a blog post about async communication in remote teams

Agent: I'll create that post with visuals. Let me gather details.

1. Title: "Async vs. Sync: Finding Your Remote Team's Communication Balance"

2. Author: Yander Team

3. Categories: Best Practices, Team Insights

4. Generating main header image...
   ✓ Generated with nano-banana-pro (Yander style)

5. Planning inline images:
   - AI image: Conceptual illustration of async/sync balance
   - Screenshot: Slack channel organization example
   - AI image: Team collaboration visualization

6. Building post body with 3 inline images...

7. Creating post...
   ✓ Post created: post-async-sync-communication-balance

8. SEO Audit: 94/100 (Excellent)
   ✓ Title length optimal
   ✓ Meta description set
   ✓ Author assigned
   ✓ Categories assigned
   ✓ Main image with alt text
   ✓ Inline images present

View at: /blog/async-sync-communication-balance
```

## Cost Estimate

| Component | Model | Cost |
|-----------|-------|------|
| 1 header image | nano-banana-pro | ~$0.02 |
| 2 AI inline images | nano-banana-pro | ~$0.04 |
| Screenshots | Puppeteer | Free |
| **Total per post** | | **~$0.06** |

For bulk creation (10 posts): ~$0.60
