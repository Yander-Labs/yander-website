# Sanity CMS Agent Guide

Comprehensive guide for AI agents performing content operations on the Yander website.

## Quick Reference

### Available Skills

| Command | Description | Token Required |
|---------|-------------|----------------|
| `/create-post` | Create new blog post with SEO | Yes |
| `/update-post` | Update existing post | Yes |
| `/delete-post` | Delete post (with confirmation) | Yes |
| `/manage-author` | CRUD for author profiles | Yes |
| `/manage-category` | CRUD for categories | Yes |
| `/seo-audit` | Analyze SEO health | No |
| `/generate-image` | Generate AI images | Yes (Replicate + Sanity) |
| `/add-inline-image` | Add screenshot or AI image to post body | Yes (Sanity + optionally Replicate) |

### Required Setup

```bash
# Tokens should be in .env.local (already configured)
# Get Sanity token from: https://www.sanity.io/manage → Project → API → Tokens
# Get Replicate token from: https://replicate.com/account/api-tokens
```

### Running Standalone Scripts

Next.js automatically loads `.env.local` during `npm run dev` and `npm run build`.
For standalone scripts, import the env loader first:

```typescript
import '@/lib/env'  // Load .env.local variables
import { screenshotAndUpload } from '@/lib/screenshot'

// Now SANITY_TOKEN and REPLICATE_API_TOKEN are available
```

## Architecture Overview

### File Structure

```
lib/
├── env.ts            # Environment loader for standalone scripts
├── sanity.ts         # Read client (public)
├── sanity-write.ts   # Write client (requires token)
├── sanity-crud.ts    # CRUD helper functions
├── seo-utils.ts      # SEO generation and audit
├── replicate.ts      # AI image generation
├── screenshot.ts     # Puppeteer screenshot utility
├── queries.ts        # GROQ queries
└── types.ts          # TypeScript interfaces

sanity/schemaTypes/
├── post.ts           # Blog post schema
├── author.ts         # Author schema
├── category.ts       # Category schema
├── blockContent.ts   # Rich text schema
└── seo.ts            # SEO object schema

.claude/commands/
├── create-post.md    # Create post skill
├── update-post.md    # Update post skill
├── delete-post.md    # Delete post skill
├── manage-author.md  # Author management skill
├── manage-category.md # Category management skill
├── seo-audit.md      # SEO audit skill
├── generate-image.md # AI image generation skill
└── add-inline-image.md # Inline body images skill
```

### Data Flow

```
User Request → Agent → CRUD Functions → Write Client → Sanity API
                                                          ↓
                                              Content in Dataset
                                                          ↓
                                              ISR Revalidation (60s)
                                                          ↓
                                              Live on Website
```

## Creating Content

### Blog Post Workflow

1. **Gather Information**
   - Title (required)
   - Content/body (required)
   - Author selection (recommended)
   - Categories (recommended)
   - Excerpt (recommended, max 160 chars)

2. **Prepare Data**
   ```typescript
   import { generateSlug, generateKey, createPost } from '@/lib/sanity-crud'

   const post = {
     _type: 'post',
     title: 'Your Title',
     slug: generateSlug('your-title'),
     author: { _type: 'reference', _ref: 'author-id' },
     categories: [{ _type: 'reference', _ref: 'cat-id', _key: generateKey() }],
     excerpt: 'Brief summary...',
     publishedAt: new Date().toISOString(),
     readTime: 5,
     body: portableTextContent,
     seo: {
       metaDescription: 'SEO description...',
       keywords: ['keyword1', 'keyword2']
     }
   }
   ```

3. **Create and Verify**
   ```typescript
   const created = await createPost(post)
   const audit = auditPostSEO(created)
   // Report creation success and SEO score
   ```

### Content Conversion

**Markdown to Portable Text:**
```typescript
import { createTextBlock, createListBlock, generateKey } from '@/lib/sanity-crud'

// Paragraph
createTextBlock('Regular paragraph text.')

// Heading
createTextBlock('Section Title', 'h2')

// List
createListBlock(['First item', 'Second item', 'Third item'], 'bullet')
```

## Updating Content

### Safe Update Pattern

1. **Fetch current state**
   ```typescript
   const current = await getPostById(postId)
   ```

2. **Show user what exists**
   ```typescript
   console.log('Current title:', current.title)
   console.log('Current excerpt:', current.excerpt)
   ```

3. **Apply only changed fields**
   ```typescript
   const updates = {
     title: newTitle, // Only if changed
     excerpt: newExcerpt // Only if changed
   }
   await updatePost(postId, updates)
   ```

4. **Verify changes**
   ```typescript
   const updated = await getPostById(postId)
   // Confirm changes applied
   ```

### Slug Changes

**Warning:** Changing slugs breaks existing URLs.

If slug must change:
1. Document the old URL
2. Update the slug
3. Consider setting up redirect
4. Update internal links
5. Monitor for 404s

## Deleting Content

### Safety Protocol

**NEVER delete without:**
1. Fetching and displaying full document details
2. Explicit user confirmation ("DELETE" or "yes, delete")
3. Checking for references (authors, categories)

### Reference Checking

```typescript
// Check before deleting author
const postsWithAuthor = await sanityFetch(
  `*[_type == "post" && author._ref == $id]{_id}`,
  { id: authorId }
)

if (postsWithAuthor.length > 0) {
  throw new Error(`Cannot delete: ${postsWithAuthor.length} posts use this author`)
}
```

## SEO Management

### Audit Workflow

1. **Run audit**
   ```typescript
   import { auditPostSEO, formatAuditReport } from '@/lib/seo-utils'

   const audit = auditPostSEO(post)
   console.log(formatAuditReport(post))
   ```

2. **Interpret score**
   - 90-100: Excellent (publish)
   - 80-89: Good (publish)
   - 60-79: Needs work (fix first)
   - <60: Poor (must fix)

3. **Fix issues**
   - Address errors first
   - Then warnings
   - Then suggestions

### Common SEO Fixes

| Issue | Fix |
|-------|-----|
| Missing meta description | Add `seo.metaDescription` |
| Title too long | Add `seo.metaTitle` override |
| No OG image | Add `seo.ogImage` or `mainImage` |
| Missing alt text | Update `mainImage.alt` |
| No author | Assign author reference |
| No categories | Add category references |

## AI Image Generation

Generate blog images using Replicate AI and upload directly to Sanity.

### Available Models

| Model | Speed | Quality | Cost | Best For |
|-------|-------|---------|------|----------|
| `nano-banana-pro` | ~5s | **Best** | ~$0.02 | **Recommended default** |
| `imagen-4-ultra` | ~15s | Ultra | ~$0.08 | Highest quality needs |
| `imagen-4` | ~8s | Excellent | ~$0.04 | Google flagship |
| `imagen-4-fast` | ~3s | Very Good | ~$0.01 | Fast + cheap |
| `flux-schnell` | ~2s | Good | ~$0.003 | Testing, fastest |
| `flux-pro` | ~10s | Excellent | ~$0.05 | Good alternative |

### Available Styles

| Style | Description |
|-------|-------------|
| `professional` | Clean, modern business aesthetic |
| `abstract` | Geometric shapes, vibrant colors |
| `illustration` | Flat design, friendly appearance |
| `photography` | Photorealistic stock photo style |

### Generate Blog Header Image

```typescript
import { generateBlogImage } from '@/lib/replicate'
import { updatePost } from '@/lib/sanity-crud'

// Generate from post title (uses nano-banana-pro by default)
const imageRef = await generateBlogImage(
  'Post Title Here',
  'professional' // style: professional | abstract | illustration | photography
)

// Attach to post
await updatePost(postId, { mainImage: imageRef })
```

### Generate OG Image for Social Sharing

```typescript
import { generateOGImage } from '@/lib/replicate'

const ogImage = await generateOGImage('Post Title', 'professional')

// Attach as SEO image
await updatePost(postId, {
  seo: { ogImage }
})
```

### Generate Custom Image

```typescript
import { generateCustomImage } from '@/lib/replicate'

const imageRef = await generateCustomImage(
  'A modern remote team collaborating via video call',
  'remote-work.jpg',
  'Remote team collaboration',
  { model: 'flux-pro', width: 1200, height: 800 }
)
```

### Check Configuration

```typescript
import { hasReplicateAccess } from '@/lib/replicate'

if (!hasReplicateAccess()) {
  console.log('REPLICATE_API_TOKEN not configured')
  return
}
```

### Cost Estimate

| Scenario | Model | Cost |
|----------|-------|------|
| 1 blog image | nano-banana-pro | ~$0.02 |
| 1 blog image | flux-schnell | ~$0.003 |
| 10 blog posts | nano-banana-pro | ~$0.20 |
| 10 blog posts | flux-schnell | ~$0.03 |

### Best Practices

1. Use `nano-banana-pro` as default (best quality/speed balance)
2. Use `flux-schnell` for quick testing
3. Always provide descriptive alt text
4. Generated images are 1200x630px (optimal for blog/OG)
5. Avoid requesting text in images (AI text rendering is unreliable)

## Inline Body Content Images

Add screenshots and AI-generated images directly into blog post body content.

### Screenshot External Websites

Use Puppeteer to capture screenshots for tutorials, documentation, and references.

```typescript
import { screenshotInlineImage, insertInlineImage, getPostBySlug } from '@/lib/sanity-crud'

// Get the post
const post = await getPostBySlug('post-slug')

// Take screenshot and create image block
const imageBlock = await screenshotInlineImage(
  'https://example.com/dashboard',
  'Example dashboard screenshot',
  'Figure 1: The dashboard interface'
)

// Insert at end of post body
await insertInlineImage(post._id, imageBlock)

// Or insert at specific position (e.g., after 3rd paragraph)
await insertInlineImage(post._id, imageBlock, 3)
```

### Screenshot Options

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

### Generate AI Inline Images

Create conceptual illustrations using nano-banana-pro.

```typescript
import { generateInlineImage, insertInlineImage, getPostBySlug } from '@/lib/sanity-crud'

const post = await getPostBySlug('post-slug')

// Generate AI image and create block
const imageBlock = await generateInlineImage(
  'Abstract visualization of data flowing through connected nodes',
  'Data flow visualization',
  'Figure 2: How engagement data flows through the system'
)

await insertInlineImage(post._id, imageBlock)
```

### Creating Posts with Mixed Inline Images

```typescript
import {
  createTextBlock,
  createListBlock,
  generateInlineImage,
  screenshotInlineImage,
  createPost,
  generateSlug
} from '@/lib/sanity-crud'

const body = [
  createTextBlock('Introduction', 'h2'),
  createTextBlock('This article explains data visualization...'),

  // AI-generated conceptual image
  await generateInlineImage(
    'Modern analytics dashboard with charts showing engagement',
    'Analytics dashboard visualization',
    'Figure 1: Example engagement analytics'
  ),

  createTextBlock('Real-World Example', 'h2'),
  createTextBlock('Here is how it looks in practice...'),

  // Screenshot of external site
  await screenshotInlineImage(
    'https://analytics.google.com/analytics/web/',
    'Google Analytics dashboard',
    'Figure 2: Google Analytics interface',
    { waitFor: 2000 }
  ),

  createTextBlock('Key takeaways:', 'h3'),
  ...createListBlock([
    'Visualization helps understanding',
    'Real examples build credibility',
    'Mixed media keeps readers engaged'
  ], 'bullet')
]

await createPost({
  _type: 'post',
  title: 'Understanding Data Visualization',
  slug: generateSlug('understanding-data-visualization'),
  body,
  // ... other fields
})
```

### When to Use Each Type

| Type | Best For |
|------|----------|
| **Screenshots** | Real product UI, external website references, tutorial steps, before/after comparisons |
| **AI Images** | Conceptual illustrations, abstract visualizations, decorative headers, mood imagery |

### Cleanup

Close the browser when done with multiple screenshots:

```typescript
import { closeBrowser } from '@/lib/screenshot'

await closeBrowser()
```

## Error Handling

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| "SANITY_TOKEN not configured" | Missing env var | Set SANITY_TOKEN |
| "Cannot delete: X posts reference" | Active references | Reassign first |
| "Document not found" | Invalid ID | Verify document exists |
| "Validation failed" | Schema violation | Check required fields |

### Graceful Failures

```typescript
try {
  await createPost(post)
} catch (error) {
  if (error.message.includes('SANITY_TOKEN')) {
    console.log('Write access not configured. Please set SANITY_TOKEN.')
  } else if (error.message.includes('Validation')) {
    console.log('Invalid data:', error.message)
  } else {
    console.log('Unexpected error:', error.message)
  }
}
```

## Best Practices

### Do
- Always fetch current state before updating
- Confirm destructive operations with user
- Run SEO audit after creating/updating posts
- Use transactions for batch operations
- Check references before deleting
- Provide clear feedback on operations

### Don't
- Delete without explicit confirmation
- Update slugs without warning about URL changes
- Commit SANITY_TOKEN to version control
- Skip SEO fields when creating posts
- Ignore audit warnings below 80 score
- Assume operations succeed without verification

## Troubleshooting

### Content Not Appearing

1. Check document has `publishedAt` set
2. Wait 60 seconds for ISR revalidation
3. Check Sanity Studio for draft vs. published
4. Verify query returns the document

### Write Operations Failing

1. Verify SANITY_TOKEN is set
2. Check token has write permissions
3. Verify dataset matches (production)
4. Check for validation errors

### SEO Not Updating

1. Verify `seo` object structure matches schema
2. Check GROQ query includes seo fields
3. Clear browser cache
4. Wait for ISR revalidation

## Type Reference

### Post Input
```typescript
interface PostInput {
  _type: 'post'
  _id?: string
  title: string
  slug: { _type: 'slug'; current: string }
  author?: { _type: 'reference'; _ref: string }
  mainImage?: ImageReference
  categories?: Array<{ _type: 'reference'; _ref: string; _key: string }>
  publishedAt?: string
  excerpt?: string
  body?: PortableTextBlock[]
  readTime?: number
  seo?: SEO
}
```

### SEO Object
```typescript
interface SEO {
  metaTitle?: string        // Max 60 chars
  metaDescription?: string  // Max 160 chars
  ogImage?: Image           // 1200x630px
  canonicalUrl?: string
  noIndex?: boolean
  keywords?: string[]       // 3-5 keywords
}
```

### Author Input
```typescript
interface AuthorInput {
  _type: 'author'
  _id?: string
  name: string
  slug: { _type: 'slug'; current: string }
  image?: ImageReference
  bio?: string
  role?: string
}
```

### Category Input
```typescript
interface CategoryInput {
  _type: 'category'
  _id?: string
  title: string
  slug: { _type: 'slug'; current: string }
  description?: string
  color?: 'blue' | 'emerald' | 'purple' | 'amber' | 'rose' | 'cyan' | 'orange'
}
```
