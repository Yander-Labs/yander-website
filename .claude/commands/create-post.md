# Create Blog Post

Create a new blog post in Sanity CMS with full SEO optimization.

## Prerequisites

- `SANITY_TOKEN` environment variable with write access
- Author must exist (or create one first with `/manage-author`)
- Categories should exist (or create with `/manage-category`)

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

### 5. Prepare Post Data

```typescript
import { generateSlug, generateKey, createTextBlock, estimateReadTime } from '@/lib/sanity-crud'
import type { PostInput } from '@/lib/types'

// Convert content to Portable Text blocks
const body = [
  createTextBlock('Your introduction paragraph...'),
  createTextBlock('Main Section', 'h2'),
  createTextBlock('Section content...'),
  // ... more blocks
]

const post: PostInput = {
  _type: 'post',
  title: userTitle,
  slug: generateSlug(userTitle),
  author: selectedAuthorId ? { _type: 'reference', _ref: selectedAuthorId } : undefined,
  categories: selectedCategoryIds.map(id => ({
    _type: 'reference',
    _ref: id,
    _key: generateKey()
  })),
  publishedAt: new Date().toISOString(),
  excerpt: userExcerpt,
  readTime: estimateReadTime(body),
  body: body,
  seo: {
    metaTitle: seoTitle || undefined,
    metaDescription: seoDescription || undefined,
    keywords: seoKeywords || undefined
  }
}
```

### 6. Create the Post

```typescript
import { createPost } from '@/lib/sanity-crud'

const created = await createPost(post)
console.log(`Created post: ${created._id}`)
console.log(`URL: /blog/${post.slug.current}`)
```

### 7. Run SEO Audit

```typescript
import { auditPostSEO, formatAuditReport } from '@/lib/seo-utils'

const audit = auditPostSEO(created)
console.log(formatAuditReport(created))

// If score < 80, suggest improvements
```

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

## Post-Creation Checklist

- [ ] Post created successfully (got `_id` back)
- [ ] SEO audit score is 80+ (publishable)
- [ ] Verify in Sanity Studio at `/studio`
- [ ] Wait 60s for ISR, check `/blog/[slug]`
- [ ] Main image has alt text (if added)
- [ ] Excerpt is within 160 characters

## Error Handling

| Error | Solution |
|-------|----------|
| "SANITY_TOKEN not configured" | Set the environment variable |
| "Author not found" | Create author first with `/manage-author` |
| "Validation failed" | Check required fields (title, slug) |

## Example Interaction

```
User: Create a blog post about remote team productivity

Agent: I'll help create that post. Let me gather some details.

1. What's the full title?
   > "5 Proven Strategies to Boost Remote Team Productivity"

2. Who should be the author?
   - Yander Team (author-yander-team)
   [Select: Yander Team]

3. Which categories? (can select multiple)
   - Remote Leadership (blue)
   - Best Practices (purple)
   [Select: Remote Leadership, Best Practices]

4. Please provide the main content...
   > [User provides content]

5. Brief excerpt (120-160 chars)?
   > "Discover actionable strategies to maximize your remote team's productivity while maintaining work-life balance."

Creating post...
✓ Post created: post-5-proven-strategies-to-boost-remote-team-productivity

SEO Audit: 92/100 (Excellent)
✓ Title length optimal
✓ Meta description set
✓ Author assigned
✓ Categories assigned

View at: /blog/5-proven-strategies-to-boost-remote-team-productivity
```
