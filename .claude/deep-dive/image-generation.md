# AI Image Generation

Detailed guide for generating images with Replicate. For quick reference, see `.claude/rules/sanity.md`.

**Requires:** `REPLICATE_API_TOKEN` environment variable

## Basic Usage

```typescript
import {
  generateBlogImage,
  generateOGImage,
  generateCustomImage,
  hasReplicateAccess
} from '@/lib/replicate'

// Check if configured
if (!hasReplicateAccess()) {
  console.log('Set REPLICATE_API_TOKEN first')
}

// Generate blog header from title (uses nano-banana-pro by default)
const mainImage = await generateBlogImage(
  'Post Title',
  'professional', // style
  'nano-banana-pro'  // model (optional)
)

// Generate OG image for social sharing
const ogImage = await generateOGImage('Post Title', 'professional')

// Custom prompt
const custom = await generateCustomImage(
  'A remote team collaborating via video call',
  'remote-work.jpg',
  'Remote team collaboration'
)

// Attach to post
await updatePost(postId, { mainImage })
```

## Models

| Model | Speed | Quality | Cost | Notes |
|-------|-------|---------|------|-------|
| `nano-banana-pro` | ~5s | **Best** | ~$0.02 | **Recommended default** |
| `imagen-4-ultra` | ~15s | Ultra | ~$0.08 | Highest quality |
| `imagen-4` | ~8s | Excellent | ~$0.04 | Google flagship |
| `imagen-4-fast` | ~3s | Very Good | ~$0.01 | Fast + cheap |
| `flux-schnell` | ~2s | Good | ~$0.003 | Fastest, cheapest |
| `flux-pro` | ~10s | Excellent | ~$0.05 | Good alternative |
| `sdxl` | ~5s | Very Good | ~$0.01 | Stability AI |

## Styles

| Style | Description |
|-------|-------------|
| `yander` | Flat illustration, grainy texture, sketchy edges (brand default) |
| `professional` | Clean, modern business aesthetic |
| `abstract` | Geometric shapes, vibrant colors |
| `illustration` | Flat design, friendly appearance |
| `photography` | Photorealistic stock photo style |

## Inline Images for Blog Posts

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

// Examples
await screenshotInlineImage(url, alt, caption, { fullPage: true })
await screenshotInlineImage(url, alt, caption, { selector: '.main-content' })
await screenshotInlineImage(url, alt, caption, { waitFor: 3000 })
```

## Cost Estimate Per Post

| Component | Model | Cost |
|-----------|-------|------|
| 1 header image | nano-banana-pro | ~$0.02 |
| 2 AI inline images | nano-banana-pro | ~$0.04 |
| Screenshots | Puppeteer | Free |
| **Total per post** | | **~$0.06** |

## Tips

1. **Be specific** - "Remote team on video call with laptops" > "remote work"
2. **Use Yander style** - Adds brand-consistent flat illustration with grainy texture
3. **Avoid text requests** - AI text rendering is unreliable
4. **Think metaphorically** - Abstract concepts work well as illustrations
