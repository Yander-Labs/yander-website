# SEO Audit

Analyze SEO health of blog posts and provide improvement suggestions.

## Prerequisites

- No token required (read-only operation)
- Works with public Sanity API

## Operations

### Single Post Audit

Audit a specific post by slug or ID:

```typescript
import { getPostBySlug } from '@/lib/sanity-crud'
import { auditPostSEO, formatAuditReport, getScoreLabel } from '@/lib/seo-utils'

const post = await getPostBySlug('your-post-slug')
const audit = auditPostSEO(post)
const { label, publishable } = getScoreLabel(audit.score)

console.log(formatAuditReport(post))
```

### Full Blog Audit

Audit all posts and identify those needing attention:

```typescript
import { sanityFetch } from '@/lib/sanity'
import { postsForSEOAuditQuery } from '@/lib/queries'
import { auditPostSEO, getScoreLabel } from '@/lib/seo-utils'

const posts = await sanityFetch(postsForSEOAuditQuery)

const results = posts.map(post => ({
  title: post.title,
  slug: post.slug.current,
  audit: auditPostSEO(post)
}))

// Sort by score (lowest first = needs most attention)
results.sort((a, b) => a.audit.score - b.audit.score)

console.log('SEO AUDIT REPORT')
console.log('═══════════════════════════════════════')
console.log(`Total Posts: ${posts.length}`)
console.log(`Excellent (90+): ${results.filter(r => r.audit.score >= 90).length}`)
console.log(`Good (80-89): ${results.filter(r => r.audit.score >= 80 && r.audit.score < 90).length}`)
console.log(`Needs Work (<80): ${results.filter(r => r.audit.score < 80).length}`)
console.log('')

// Show posts needing attention
const needsWork = results.filter(r => r.audit.score < 80)
if (needsWork.length > 0) {
  console.log('POSTS NEEDING ATTENTION:')
  console.log('─────────────────────────────────────')
  needsWork.forEach(r => {
    console.log(`\n${r.title}`)
    console.log(`  Score: ${r.audit.score}/100`)
    console.log(`  URL: /blog/${r.slug}`)
    r.audit.issues
      .filter(i => i.type !== 'info')
      .forEach(i => {
        const icon = i.type === 'error' ? '❌' : '⚠️'
        console.log(`  ${icon} ${i.message}`)
      })
  })
}
```

## Score Interpretation

| Score | Label | Publishable | Action |
|-------|-------|-------------|--------|
| 90-100 | Excellent | Yes | No action needed |
| 80-89 | Good | Yes | Minor improvements optional |
| 60-79 | Needs Work | No | Address warnings before publishing |
| 0-59 | Poor | No | Fix errors immediately |

## Checks Performed

### Title Analysis
| Check | Ideal | Score Impact |
|-------|-------|--------------|
| Present | Required | -20 if missing |
| Length | 40-60 chars | Warning if >60 |
| Descriptive | Meaningful | Info if <30 |

### Meta Description
| Check | Ideal | Score Impact |
|-------|-------|--------------|
| Present | Required | -15 if missing |
| Length | 120-160 chars | Warning if >160 |
| Compelling | Descriptive | Info if <70 |

### Images
| Check | Ideal | Score Impact |
|-------|-------|--------------|
| Featured image | Present | -10 if missing |
| Alt text | Descriptive | -5 if missing |
| OG dimensions | 1200x630 | Suggestion |

### Content Structure
| Check | Ideal | Score Impact |
|-------|-------|--------------|
| Author | Assigned | Info if missing |
| Categories | 1+ assigned | Info if missing |
| Keywords | 3-5 focus | Suggestion |
| Body content | Non-empty | -20 if missing |

## Common Fixes

### Missing Meta Description
```typescript
import { updatePost } from '@/lib/sanity-crud'

await updatePost(postId, {
  seo: {
    metaDescription: 'Compelling description under 160 characters that encourages clicks...'
  }
})
```

### Title Too Long
```typescript
await updatePost(postId, {
  seo: {
    metaTitle: 'Shorter SEO-specific title under 60 chars'
    // Original title remains unchanged
  }
})
```

### Missing Image Alt Text
```typescript
await updatePost(postId, {
  mainImage: {
    ...currentPost.mainImage,
    alt: 'Descriptive alt text for accessibility'
  }
})
```

### Adding Keywords
```typescript
await updatePost(postId, {
  seo: {
    keywords: ['remote work', 'employee engagement', 'team productivity']
  }
})
```

### Adding Author
```typescript
await updatePost(postId, {
  author: { _type: 'reference', _ref: 'author-id' }
})
```

## Output Format

### Single Post Report
```
SEO Audit: 5 Proven Strategies for Remote Team Productivity
Score: 85/100 (Good)
Publishable: Yes

Issues:
  ⚠️ [metaDescription] Description is short (72 chars). Aim for 120-160.
  ℹ️ [keywords] No focus keywords set

Suggestions:
  • Expand meta description to 120-160 characters
  • Add 3-5 focus keywords for content optimization
```

### Full Blog Report
```
SEO AUDIT REPORT
═══════════════════════════════════════
Total Posts: 12
Excellent (90+): 4
Good (80-89): 5
Needs Work (<80): 3

POSTS NEEDING ATTENTION:
─────────────────────────────────────

Getting Started with Remote Work
  Score: 65/100
  URL: /blog/getting-started-remote-work
  ❌ Missing meta description
  ⚠️ No featured image

Building Team Culture Online
  Score: 72/100
  URL: /blog/building-team-culture-online
  ⚠️ Description too long (185 chars)
  ⚠️ Image missing alt text
```

## Workflow Examples

### Regular Maintenance
```
User: Run an SEO audit on the blog

Agent: Running full blog SEO audit...

SEO AUDIT REPORT
═══════════════════════════════════════
Total Posts: 6
Excellent (90+): 2
Good (80-89): 3
Needs Work (<80): 1

1 post needs attention:

"The Future of Remote Collaboration"
  Score: 68/100
  Issues:
    ❌ Missing meta description
    ⚠️ No author assigned

Would you like me to fix these issues?
```

### Pre-Publish Check
```
User: Check SEO for the new post before publishing

Agent: Auditing "5 Tips for Async Communication"...

Score: 92/100 (Excellent) ✓
Publishable: Yes

All checks passed:
  ✓ Title length optimal (48 chars)
  ✓ Meta description set (142 chars)
  ✓ Featured image with alt text
  ✓ Author assigned
  ✓ Categories assigned

Minor suggestions:
  • Consider adding 3-5 focus keywords

Ready to publish!
```

## Checklist

- [ ] Identified scope (single post or full blog)
- [ ] Ran audit and generated report
- [ ] Sorted by score to prioritize worst-performing
- [ ] Identified errors vs warnings vs info
- [ ] Provided specific fix recommendations
- [ ] Offered to implement fixes if score < 80
