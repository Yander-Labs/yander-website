# Delete Blog Post

Safely delete a blog post from Sanity CMS with confirmation.

## Prerequisites

- `SANITY_TOKEN` environment variable with write access
- Post ID to delete

## CRITICAL: Confirmation Required

**NEVER delete without explicit user confirmation.**

Before deletion, always:
1. Fetch and display full post details
2. Warn about permanent removal
3. Get explicit "DELETE" or "yes, delete" confirmation

## Workflow

### 1. Find the Post

```typescript
import { listPosts, getPostById } from '@/lib/sanity-crud'

// Option A: User provides slug
const post = await getPostBySlug('post-slug')

// Option B: List all posts for selection
const posts = await listPosts()
// Present: posts.map(p => `${p.title} - /blog/${p.slug.current}`)
```

### 2. Display Post Details

Show everything that will be deleted:

```typescript
console.log('═══════════════════════════════════════════')
console.log('POST TO DELETE')
console.log('═══════════════════════════════════════════')
console.log(`Title:      ${post.title}`)
console.log(`ID:         ${post._id}`)
console.log(`Slug:       ${post.slug.current}`)
console.log(`URL:        /blog/${post.slug.current}`)
console.log(`Published:  ${post.publishedAt || 'Draft'}`)
console.log(`Author:     ${post.author?.name || 'None'}`)
console.log(`Categories: ${post.categories?.map(c => c.title).join(', ') || 'None'}`)
console.log(`Read Time:  ${post.readTime || 'N/A'} min`)
console.log('═══════════════════════════════════════════')
```

### 3. Show Warning

```
⚠️  WARNING: This action is PERMANENT and cannot be undone.

Deleting this post will:
• Remove all content permanently
• Make the URL /blog/[slug] return 404
• Break any external links to this post
• Remove from search engine indexes (eventually)

The following will be deleted:
• Title: [post title]
• URL: /blog/[slug]
• Published: [date]
• Content: [X] paragraphs, [Y] images
```

### 4. Require Explicit Confirmation

Ask user to type "DELETE" to confirm:

```typescript
// Only proceed if user explicitly confirms
const confirmation = await askUser('Type "DELETE" to confirm, or "cancel" to abort:')

if (confirmation.toUpperCase() !== 'DELETE') {
  console.log('Deletion cancelled. No changes made.')
  return
}
```

### 5. Execute Deletion

```typescript
import { deletePost } from '@/lib/sanity-crud'

await deletePost(post._id)
console.log(`✓ Deleted post: ${post._id}`)
console.log(`  The URL /blog/${post.slug.current} will now return 404`)
```

### 6. Post-Deletion Actions

Remind user to:
- Update any internal links pointing to this post
- Check for broken links in navigation/sidebar
- Consider setting up a redirect if the post had traffic
- Monitor 404 errors in analytics

## Alternative: Unpublish Instead

If user wants to hide content without deleting:

```typescript
import { updatePost } from '@/lib/sanity-crud'

// Remove from public by clearing publishedAt
await updatePost(post._id, { publishedAt: null })

console.log('Post unpublished (hidden from site)')
console.log('Content is preserved and can be republished later')
```

**Recommend unpublishing when:**
- User might want the content later
- Post has historical value
- Just needs temporary removal
- Want to edit before republishing

## Bulk Deletion Safety

If user asks to delete multiple posts:

1. List all posts that would be deleted
2. Show total count
3. Require typing the exact count to confirm
4. Delete one at a time, reporting progress

```typescript
// For bulk delete, require typing the count
const postsToDelete = [post1, post2, post3]
console.log(`You are about to delete ${postsToDelete.length} posts:`)
postsToDelete.forEach(p => console.log(`  - ${p.title}`))

const confirmation = await askUser(`Type "${postsToDelete.length}" to confirm:`)
if (confirmation !== String(postsToDelete.length)) {
  console.log('Bulk deletion cancelled.')
  return
}
```

## Checklist

- [ ] Post details fetched and displayed
- [ ] Warning message shown clearly
- [ ] User explicitly typed "DELETE" to confirm
- [ ] Deletion executed successfully
- [ ] Verified post no longer in Studio
- [ ] Reminded about broken links
- [ ] Suggested redirect if appropriate

## Error Handling

| Error | Solution |
|-------|----------|
| "Document not found" | Post may already be deleted |
| "SANITY_TOKEN not configured" | Set the environment variable |
| User types anything other than "DELETE" | Cancel the operation |
