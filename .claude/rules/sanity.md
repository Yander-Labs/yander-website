# Sanity CMS Rules

## Client Usage

### Read Operations (Default)
```typescript
import { client, urlFor, sanityFetch } from "@/lib/sanity"
```

### Write Operations (Requires Token)
```typescript
import { writeClient } from "@/lib/sanity-write"
import {
  createPost, updatePost, deletePost,
  createAuthor, updateAuthor, deleteAuthor,
  createCategory, updateCategory, deleteCategory,
  uploadImage, generateSlug, generateKey
} from "@/lib/sanity-crud"
```

## Environment Variables

| Variable | Scope | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Public | Client configuration |
| `NEXT_PUBLIC_SANITY_DATASET` | Public | Dataset selection |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Public | API version |
| `SANITY_TOKEN` | **Private** | Write operations only |

**NEVER** commit `SANITY_TOKEN` to version control.

## Image Handling

### CRITICAL: Next.js Configuration

**Images from Sanity will NOT display** unless `cdn.sanity.io` is whitelisted in `next.config.ts`:

```typescript
// next.config.ts - REQUIRED for Sanity images to work
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
};
```

If images appear broken after uploading to Sanity, verify this configuration exists.

### URL Building

```typescript
// Always specify dimensions for performance
urlFor(image).width(600).height(400).url()

// With quality and format optimization
urlFor(image).width(1200).quality(80).format('webp').url()

// For responsive images
urlFor(image).width(800).auto('format').url()

// OG images for social sharing (1200x630)
urlFor(image).width(1200).height(630).url()
```

## Query Patterns

```groq
// Single document by slug
*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  body,
  seo,
  "author": author->{name, image}
}

// List with pagination
*[_type == "post"] | order(publishedAt desc) [$start...$end] {
  _id,
  title,
  slug,
  excerpt,
  "categories": categories[]->{title, slug, color}
}

// Filter by category
*[_type == "post" && $categorySlug in categories[]->slug.current]
```

## Typed Fetching

```typescript
import type { Post, PostCard } from "@/lib/types"

const posts = await sanityFetch<PostCard[]>(postsQuery)
const post = await sanityFetch<Post | null>(postBySlugQuery, { slug })
```

## CRUD Operations

### Create Document
```typescript
import { createPost, generateSlug, generateKey } from '@/lib/sanity-crud'
import type { PostInput } from '@/lib/types'

const post: PostInput = {
  _type: 'post',
  title: 'New Post',
  slug: generateSlug('new-post'),
  author: { _type: 'reference', _ref: 'author-id' },
  categories: [
    { _type: 'reference', _ref: 'category-id', _key: generateKey() }
  ],
  publishedAt: new Date().toISOString(),
  excerpt: 'Brief summary...',
  seo: {
    metaDescription: 'SEO description...',
    keywords: ['keyword1', 'keyword2']
  }
}

const created = await createPost(post)
```

### Update Document
```typescript
import { updatePost } from '@/lib/sanity-crud'

// Only include fields that are changing
await updatePost('post-id', {
  title: 'Updated Title',
  seo: { metaDescription: 'New description' }
})
```

### Delete Document
```typescript
import { deletePost } from '@/lib/sanity-crud'

// Always confirm with user first!
await deletePost('post-id')
```

## Write Operation Safety Rules

1. **Check for SANITY_TOKEN** before write operations
2. **Confirm deletions** with explicit user consent
3. **Check references** before deleting authors/categories
4. **Use transactions** for batch operations
5. **Validate data** before creating/updating

## Transaction Pattern

```typescript
const transaction = writeClient.transaction()
transaction.createOrReplace(doc1)
transaction.createOrReplace(doc2)
await transaction.commit()
```

## Image Upload

```typescript
import { uploadImage } from '@/lib/sanity-crud'
import { createReadStream } from 'fs'

const imageRef = await uploadImage(
  createReadStream('/path/to/image.jpg'),
  'filename.jpg',
  'Alt text description'
)

// Use in document
await updatePost('post-id', { mainImage: imageRef })
```

## Portable Text Helpers

```typescript
import { createTextBlock, createListBlock, estimateReadTime } from '@/lib/sanity-crud'

// Paragraph
createTextBlock('Regular paragraph text.')

// Headings
createTextBlock('Section Title', 'h2')
createTextBlock('Subsection', 'h3')

// Lists
createListBlock(['Item 1', 'Item 2', 'Item 3'], 'bullet')
createListBlock(['Step 1', 'Step 2'], 'number')

// Estimate read time from body
const readTime = estimateReadTime(body)
```

## Schema Changes

1. Modify `sanity/schemaTypes/{type}.ts`
2. Run `npm run build` to verify
3. Studio at `/studio` reflects changes automatically

## Content Scripts

```bash
# Seed blog content
SANITY_TOKEN=your_token node scripts/seed-blog-content.mjs

# Upload image
SANITY_TOKEN=your_token node scripts/upload-image-to-sanity.mjs path/to/image.jpg
```

## Agent Skills

| Skill | Description |
|-------|-------------|
| `/create-post` | Create new blog post with SEO |
| `/update-post` | Update existing post |
| `/delete-post` | Delete post (with confirmation) |
| `/manage-author` | CRUD for authors |
| `/manage-category` | CRUD for categories |
| `/seo-audit` | Analyze SEO health |
| `/generate-image` | Generate AI images with Replicate |

## AI Image Generation

**Requires:** `REPLICATE_API_TOKEN` environment variable

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

// Generate blog header from title
const mainImage = await generateBlogImage(
  'Post Title',
  'professional', // style: professional | abstract | illustration | photography
  'flux-schnell'  // model: flux-schnell | flux-pro | sdxl
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

### Models

| Model | Speed | Quality | Cost |
|-------|-------|---------|------|
| `flux-schnell` | ~2s | Good | ~$0.003 |
| `flux-pro` | ~10s | Excellent | ~$0.05 |
| `sdxl` | ~5s | Very Good | ~$0.01 |

### Styles

| Style | Description |
|-------|-------------|
| `professional` | Clean, modern business aesthetic |
| `abstract` | Geometric shapes, vibrant colors |
| `illustration` | Flat design, friendly appearance |
| `photography` | Photorealistic stock photo style |

## SEO Fields

Posts include an `seo` object:
```typescript
seo: {
  metaTitle?: string       // Override title (max 60 chars)
  metaDescription?: string // Override excerpt (max 160 chars)
  ogImage?: Image          // Custom social image
  canonicalUrl?: string    // Override canonical
  noIndex?: boolean        // Hide from search engines
  keywords?: string[]      // Focus keywords (3-5)
}
```
