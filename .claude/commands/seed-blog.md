# Seed Blog Content

Seeds sample blog posts to Sanity CMS for development and testing.

## Prerequisites

- `SANITY_TOKEN` environment variable with write access
- Get token from: https://www.sanity.io/manage → Project → API → Tokens

## Command

```bash
SANITY_TOKEN=your_token node scripts/seed-blog-content.mjs
```

## What It Creates

### Categories (3)
1. **Remote Leadership** - slug: `remote-leadership`, color: `blue`
2. **Team Insights** - slug: `team-insights`, color: `emerald`
3. **Best Practices** - slug: `best-practices`, color: `purple`

### Author (1)
- **Yander Team** - Employee Engagement Experts

### Blog Posts (3)
1. "The Trillion-Dollar Blind Spot" (8 min read)
2. "7 Digital Signals That Predict Remote Employee Resignation" (10 min read)
3. "Building a Proactive Engagement System" (12 min read)

## Notes

- Uses `createOrReplace` - safe to run multiple times (idempotent)
- Posts are created with full Portable Text content
- Categories are linked via references
- All content is SEO-optimized with excerpts

## Script Location

`scripts/seed-blog-content.mjs`

## After Running

1. Visit `/studio` to see created content
2. Visit `/blog` to see posts on frontend
3. Content appears immediately (no build needed)
