# Add Inline Image to Blog Post

Add an inline image (screenshot or AI-generated) to a blog post's body content.

## Required Environment Variables

- `SANITY_TOKEN` - For write operations
- `REPLICATE_API_TOKEN` - For AI image generation (optional, for AI images only)

## Operations

### 1. Screenshot and Insert

Capture a screenshot of an external URL and insert into a post.

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

### 2. Generate AI Image and Insert

Generate an illustration with nano-banana-pro and insert into a post.

```typescript
import { generateInlineImage, insertInlineImage, getPostBySlug } from '@/lib/sanity-crud'

// Get the post
const post = await getPostBySlug('post-slug')

// Generate AI image and create image block
const imageBlock = await generateInlineImage(
  'Abstract visualization of data flowing through connected nodes',
  'Data flow visualization',
  'Figure 2: How engagement data flows through the system'
)

// Insert into post body
await insertInlineImage(post._id, imageBlock)
```

### 3. Create Post with Inline Images

Build body content with mixed inline images.

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
  createTextBlock('This article explains how to use data visualization...'),

  // AI-generated conceptual image
  await generateInlineImage(
    'Modern analytics dashboard with charts and graphs showing employee engagement',
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
    { waitFor: 2000 }  // Wait 2s for page to fully load
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

## Screenshot Options

```typescript
interface ScreenshotOptions {
  width?: number        // Viewport width (default: 1200)
  height?: number       // Viewport height (default: 630)
  fullPage?: boolean    // Capture full scrollable page
  selector?: string     // Capture specific element only
  waitFor?: number      // Wait ms after page load
  deviceScale?: number  // Retina scaling (default: 2)
}
```

### Examples

```typescript
// Full page screenshot
await screenshotInlineImage(url, alt, caption, { fullPage: true })

// Specific element
await screenshotInlineImage(url, alt, caption, { selector: '.main-content' })

// Wait for dynamic content
await screenshotInlineImage(url, alt, caption, { waitFor: 3000 })

// Mobile viewport
await screenshotInlineImage(url, alt, caption, { width: 375, height: 667 })
```

## AI Image Options

```typescript
interface GenerateImageOptions {
  model?: ImageModel    // Default: 'nano-banana-pro'
  width?: number        // Default: 1200
  height?: number       // Default: 630
}
```

### Available Models

| Model | Speed | Quality | Cost |
|-------|-------|---------|------|
| `nano-banana-pro` | ~5s | Best | ~$0.02 |
| `imagen-4-ultra` | ~15s | Ultra | ~$0.08 |
| `imagen-4-fast` | ~3s | Good | ~$0.01 |
| `flux-schnell` | ~2s | Good | ~$0.003 |

## Workflow Guidelines

1. **Use screenshots for:**
   - Real product UI
   - External website references
   - Before/after comparisons
   - Tutorial steps

2. **Use AI images for:**
   - Conceptual illustrations
   - Abstract visualizations
   - Decorative headers
   - Mood/atmosphere imagery

3. **Best practices:**
   - Always provide meaningful alt text
   - Add captions to explain context
   - Position images near relevant text
   - Use consistent image dimensions

## Error Handling

```typescript
try {
  const imageBlock = await screenshotInlineImage(url, alt, caption)
  await insertInlineImage(postId, imageBlock)
} catch (error) {
  if (error.message.includes('SANITY_TOKEN')) {
    console.log('Set SANITY_TOKEN for write access')
  } else if (error.message.includes('timeout')) {
    console.log('Page took too long to load, try increasing waitFor')
  } else if (error.message.includes('Element not found')) {
    console.log('Selector did not match any element')
  } else {
    throw error
  }
}
```

## Cleanup

After taking multiple screenshots, close the browser to free resources:

```typescript
import { closeBrowser } from '@/lib/screenshot'

// When done with all screenshots
await closeBrowser()
```
