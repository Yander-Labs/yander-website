# Sanity CRUD Examples

Detailed code examples for Sanity CMS operations. For quick reference, see `.claude/rules/sanity.md`.

## Create Document

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

## Update Document

```typescript
import { updatePost } from '@/lib/sanity-crud'

// Only include fields that are changing
await updatePost('post-id', {
  title: 'Updated Title',
  seo: { metaDescription: 'New description' }
})
```

## Delete Document

```typescript
import { deletePost } from '@/lib/sanity-crud'

// Always confirm with user first!
await deletePost('post-id')
```

## Batch Operations

```typescript
import { createPostsBatch, deleteBatch } from '@/lib/sanity-crud'

// Create multiple posts in a single transaction
const result = await createPostsBatch([post1, post2, post3])
console.log(`Created: ${result.succeeded.length}, Failed: ${result.failed.length}`)

// Each failed item includes error details
result.failed.forEach(f => console.error(f.error))

// Delete multiple documents
await deleteBatch(['post-1', 'post-2', 'post-3'])
```

## Validation

```typescript
import { validatePostInput, slugExists } from '@/lib/sanity-crud'

// Manual validation (optional - automatic on create/update)
const result = validatePostInput(post)
if (!result.valid) {
  console.error(result.errors) // [{field: 'title', message: '...'}]
}

// Check slug uniqueness before creating
if (await slugExists('post', 'my-slug')) {
  throw new Error('Slug already taken')
}
```

**Validation Rules:**
- Title: required, max 200 chars
- Slug: required, lowercase alphanumeric with hyphens
- Excerpt: max 300 chars
- SEO metaTitle: max 70 chars
- SEO metaDescription: max 160 chars
- Image: max 5MB, valid format (jpg/png/gif/webp)

## Retry Logic

All write operations automatically retry on transient failures:

- **Max retries:** 3
- **Backoff:** Exponential (1s, 2s, 4s)
- **Retryable errors:** Network, timeout, rate limit (429, 502, 503)
- **Non-retryable:** Validation errors, not found

## Caching

```typescript
import { listCategories, listAuthors, invalidateCache } from '@/lib/sanity-crud'

// Cached for 1 hour (fast repeated calls)
const categories = await listCategories()
const authors = await listAuthors()

// Force cache refresh
invalidateCache('categories:')
invalidateCache('authors:')
invalidateCache() // Clear all
```

## Operation Logging

```typescript
import { getOperationLogs, clearOperationLogs } from '@/lib/sanity-crud'

const logs = getOperationLogs(50)
logs.forEach(log => {
  console.log(`${log.timestamp} ${log.operation}: ${log.success ? 'OK' : log.error}`)
})

clearOperationLogs()
```

## Transaction Pattern

```typescript
const transaction = writeClient.transaction()
transaction.createOrReplace(doc1)
transaction.createOrReplace(doc2)
await transaction.commit()
```

## Image Upload

```typescript
import { uploadImage, uploadImagesBatch, validateImage } from '@/lib/sanity-crud'
import { readFileSync } from 'fs'

// Single image upload (with automatic validation)
const imageRef = await uploadImage(
  readFileSync('/path/to/image.jpg'),
  'filename.jpg',
  'Alt text description'
)

// Use in document
await updatePost('post-id', { mainImage: imageRef })

// Batch upload (parallel, with validation)
const result = await uploadImagesBatch([
  { file: buffer1, filename: 'img1.jpg', altText: 'Image 1' },
  { file: buffer2, filename: 'img2.jpg', altText: 'Image 2' },
])
```
