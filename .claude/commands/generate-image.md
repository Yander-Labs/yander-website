# Generate Image Skill

Generate AI images using Replicate and upload to Sanity CMS.

## Prerequisites

- `REPLICATE_API_TOKEN` environment variable must be set
- `SANITY_TOKEN` environment variable for uploading to Sanity

## Operations

### 1. Generate Blog Header Image

Generate an image for a blog post based on its title:

```typescript
import { generateBlogImage } from '@/lib/replicate'
import { updatePost } from '@/lib/sanity-crud'

const imageRef = await generateBlogImage(
  'Post Title Here',
  'professional', // style: 'professional' | 'abstract' | 'illustration' | 'photography'
  'flux-schnell'  // model: 'flux-schnell' | 'flux-pro' | 'sdxl'
)

// Attach to post
await updatePost(postId, { mainImage: imageRef })
```

### 2. Generate OG Image

Generate a social media preview image:

```typescript
import { generateOGImage } from '@/lib/replicate'
import { updatePost } from '@/lib/sanity-crud'

const ogImage = await generateOGImage(
  'Post Title Here',
  'professional',
  'flux-schnell'
)

// Attach as SEO OG image
await updatePost(postId, {
  seo: { ogImage }
})
```

### 3. Generate Custom Image

Generate an image with a custom prompt:

```typescript
import { generateCustomImage } from '@/lib/replicate'

const imageRef = await generateCustomImage(
  'A modern office with remote workers collaborating via video call',
  'remote-work-collaboration.jpg',
  'Remote team collaboration',
  { model: 'flux-pro', width: 1200, height: 800 }
)
```

## Available Models

| Model | Speed | Quality | Cost | Best For |
|-------|-------|---------|------|----------|
| `flux-schnell` | ~2s | Good | ~$0.003 | Testing, drafts |
| `flux-pro` | ~10s | Excellent | ~$0.05 | Production images |
| `sdxl` | ~5s | Very Good | ~$0.01 | Balanced option |

## Available Styles

| Style | Description |
|-------|-------------|
| `professional` | Clean, modern business aesthetic |
| `abstract` | Geometric shapes, vibrant colors |
| `illustration` | Flat design, friendly appearance |
| `photography` | Photorealistic stock photo style |

## Workflow

When user asks to generate an image:

1. **Determine the type:**
   - Blog header → use `generateBlogImage()`
   - Social preview → use `generateOGImage()`
   - Custom prompt → use `generateCustomImage()`

2. **Select appropriate model:**
   - Testing/drafts → `flux-schnell` (fast, cheap)
   - Production → `flux-pro` (best quality)

3. **Choose style** (for blog/OG images):
   - Default to `professional` unless user specifies otherwise

4. **Execute and attach:**
   - Generate the image
   - If for a post, use `updatePost()` to attach it
   - Report success with Sanity asset info

## Example Script

Full workflow to generate and attach an image to an existing post:

```javascript
// Run with: source .env.local && node script.js

const { generateBlogImage } = require('./lib/replicate')
const { updatePost, getPostBySlug } = require('./lib/sanity-crud')

async function main() {
  // Get the post
  const post = await getPostBySlug('my-post-slug')
  if (!post) throw new Error('Post not found')

  // Generate image based on title
  console.log(`Generating image for: ${post.title}`)
  const imageRef = await generateBlogImage(post.title, 'professional')

  // Attach to post
  await updatePost(post._id, { mainImage: imageRef })
  console.log('Image attached to post!')
}

main().catch(console.error)
```

## Error Handling

```typescript
import { hasReplicateAccess } from '@/lib/replicate'

if (!hasReplicateAccess()) {
  console.log('REPLICATE_API_TOKEN not configured.')
  console.log('Get your token from: https://replicate.com/account/api-tokens')
  return
}
```

## Batch Generation

For generating images for multiple posts:

```typescript
import { generateBlogImage } from '@/lib/replicate'
import { listPosts, updatePost } from '@/lib/sanity-crud'

const posts = await listPosts()
const postsWithoutImages = posts.filter(p => !p.mainImage)

for (const post of postsWithoutImages) {
  const imageRef = await generateBlogImage(post.title)
  await updatePost(post._id, { mainImage: imageRef })
  console.log(`Generated image for: ${post.title}`)
}
```

## Cost Estimate

| Scenario | Model | Cost |
|----------|-------|------|
| 1 blog image | flux-schnell | ~$0.003 |
| 1 blog image | flux-pro | ~$0.05 |
| 10 blog posts | flux-schnell | ~$0.03 |
| 10 blog posts | flux-pro | ~$0.50 |

## Important Notes

- Images are automatically uploaded to Sanity with unique filenames
- Alt text is derived from the post title for accessibility
- Generated images are 1200x630px (optimal for blog headers and OG images)
- Never include text in generated images (AI text rendering is unreliable)
