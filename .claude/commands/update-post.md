# Update Blog Post

Update an existing blog post in Sanity CMS.

## Prerequisites

- `SANITY_TOKEN` environment variable with write access
- Post ID or slug to identify the post

## Workflow

### 1. Find the Post

**By Slug:**
```typescript
import { getPostBySlug } from '@/lib/sanity-crud'

const post = await getPostBySlug('post-slug-here')
```

**By Listing All Posts:**
```typescript
import { listPosts } from '@/lib/sanity-crud'

const posts = await listPosts()
// Present list: posts.map(p => `${p.title} (${p._id})`)
```

### 2. Show Current State

Display the current post details to the user:

```typescript
console.log('Current post:')
console.log(`  Title: ${post.title}`)
console.log(`  Slug: ${post.slug.current}`)
console.log(`  Excerpt: ${post.excerpt || 'Not set'}`)
console.log(`  Author: ${post.author?.name || 'Not set'}`)
console.log(`  Categories: ${post.categories?.map(c => c.title).join(', ') || 'None'}`)
console.log(`  Published: ${post.publishedAt || 'Not published'}`)
console.log(`  SEO Title: ${post.seo?.metaTitle || 'Using post title'}`)
console.log(`  SEO Description: ${post.seo?.metaDescription || 'Using excerpt'}`)
```

### 3. Identify Changes

Ask user what they want to update. Common updates:

| Field | Notes |
|-------|-------|
| title | Will NOT auto-update slug |
| slug | **Warning:** Breaks existing URLs |
| excerpt | Keep under 160 chars |
| body | Full content replacement |
| author | Reference to author ID |
| categories | Array of category references |
| publishedAt | ISO datetime string |
| readTime | Number in minutes |
| seo.metaTitle | Override for search engines |
| seo.metaDescription | Override for search snippets |
| seo.keywords | Focus keywords array |

### 4. Apply Updates

```typescript
import { updatePost, generateSlug, generateKey } from '@/lib/sanity-crud'

// Only include fields that are changing
const updates: Partial<PostInput> = {}

if (newTitle) {
  updates.title = newTitle
  // Ask: "Do you also want to update the slug?"
}

if (newExcerpt) {
  updates.excerpt = newExcerpt
}

if (newSeoDescription) {
  updates.seo = {
    ...currentPost.seo,
    metaDescription: newSeoDescription
  }
}

const updated = await updatePost(post._id, updates)
```

### 5. Verify Changes

```typescript
import { getPostById } from '@/lib/sanity-crud'
import { auditPostSEO, formatAuditReport } from '@/lib/seo-utils'

const verified = await getPostById(post._id)
console.log('Updated successfully!')

// Run SEO audit on updated post
console.log(formatAuditReport(verified))
```

## Slug Change Warning

If updating the slug, warn the user:

```
⚠️  SLUG CHANGE WARNING

Changing the slug will:
1. Break existing URL: /blog/old-slug → 404
2. Invalidate any external backlinks
3. Require updating internal links

Old URL: /blog/old-slug
New URL: /blog/new-slug

Recommendations:
- Set up a redirect from old to new URL
- Update any internal links
- Check Google Search Console for crawl errors

Proceed with slug change? (yes/no)
```

## Updateable Fields Reference

### Basic Fields
```typescript
await updatePost(id, {
  title: 'New Title',
  excerpt: 'New excerpt...',
  readTime: 8
})
```

### Author Change
```typescript
await updatePost(id, {
  author: { _type: 'reference', _ref: 'author-new-id' }
})
```

### Categories Change
```typescript
import { generateKey } from '@/lib/sanity-crud'

await updatePost(id, {
  categories: [
    { _type: 'reference', _ref: 'category-1', _key: generateKey() },
    { _type: 'reference', _ref: 'category-2', _key: generateKey() }
  ]
})
```

### SEO Fields
```typescript
await updatePost(id, {
  seo: {
    metaTitle: 'Custom SEO Title',
    metaDescription: 'Custom meta description for search...',
    keywords: ['keyword1', 'keyword2', 'keyword3'],
    noIndex: false
  }
})
```

### Unpublish (Hide from site)
```typescript
await updatePost(id, {
  publishedAt: null  // Removes from public listing
})
```

### Republish with new date
```typescript
await updatePost(id, {
  publishedAt: new Date().toISOString()
})
```

## Checklist

- [ ] Fetched current post state
- [ ] Showed user what currently exists
- [ ] Confirmed specific changes to make
- [ ] Applied only changed fields
- [ ] Verified changes in response
- [ ] Ran SEO audit on updated post
- [ ] If slug changed, warned about URL implications
- [ ] Wait 60s for ISR, verify on frontend

## Error Handling

| Error | Solution |
|-------|----------|
| "Document not found" | Verify post ID/slug exists |
| "SANITY_TOKEN not configured" | Set the environment variable |
| "Validation failed" | Check field types match schema |
