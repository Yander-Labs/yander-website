# Sanity CMS Rules

## Clients

| Operation | Import |
|-----------|--------|
| Read | `{ client, urlFor, sanityFetch } from "@/lib/sanity"` |
| Write | `{ writeClient } from "@/lib/sanity-write"` |
| CRUD | `{ createPost, updatePost, deletePost, ... } from "@/lib/sanity-crud"` |

## Environment Variables

| Variable | Scope | Required For |
|----------|-------|--------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Public | All |
| `NEXT_PUBLIC_SANITY_DATASET` | Public | All |
| `SANITY_TOKEN` | **Private** | Write operations |

**NEVER** commit `SANITY_TOKEN`.

## Image Handling

**CRITICAL:** Images require `cdn.sanity.io` in `next.config.ts` remotePatterns.

```typescript
urlFor(image).width(600).height(400).url()
urlFor(image).width(1200).height(630).url() // OG images
```

## Basic Queries

```groq
// Single by slug
*[_type == "post" && slug.current == $slug][0]

// List with pagination
*[_type == "post"] | order(publishedAt desc) [$start...$end]

// Dereference
author->{name, image}
categories[]->{title, slug, color}
```

## Typed Fetching

```typescript
import type { Post, PostCard } from "@/lib/types"

const posts = await sanityFetch<PostCard[]>(postsQuery)
const post = await sanityFetch<Post | null>(postBySlugQuery, { slug })
```

## Write Safety Rules

1. Check `SANITY_TOKEN` exists before write operations
2. **Confirm deletions** with explicit user consent
3. **Check references** before deleting authors/categories
4. Validate data before create/update

## Quick CRUD

```typescript
// Create
const post = await createPost({ _type: 'post', title, slug: generateSlug(title), ... })

// Update
await updatePost('post-id', { title: 'New Title' })

// Delete (confirm first!)
await deletePost('post-id')
```

## Agent Skills

| Skill | Purpose |
|-------|---------|
| `/create-post` | New blog post with SEO |
| `/update-post` | Modify existing |
| `/delete-post` | Remove (confirms first) |
| `/manage-author` | Author CRUD |
| `/manage-category` | Category CRUD |
| `/seo-audit` | Check SEO health |
| `/generate-image` | AI images |
| `/add-inline-image` | Body images |

## AI Image Generation

**Requires:** `REPLICATE_API_TOKEN`

```typescript
import { generateBlogImage } from '@/lib/replicate'

const mainImage = await generateBlogImage('Post Title', 'yander')
```

| Model | Speed | Cost |
|-------|-------|------|
| `nano-banana-pro` | ~5s | ~$0.02 |
| `flux-schnell` | ~2s | ~$0.003 |

## Schema Reference

**Post:** title, slug, author (ref), mainImage, categories (ref[]), publishedAt, excerpt, body, readTime, seo

**Author:** name, slug, image, bio, role

**Category:** title, slug, description, color (Tailwind name)

**SEO (on Post):** metaTitle, metaDescription, ogImage, canonicalUrl, noIndex, keywords[]

## Schema Changes

1. Edit `sanity/schemaTypes/{type}.ts`
2. Run `npm run build`
3. Studio auto-updates at `/studio`

## Detailed Examples

See `.claude/deep-dive/` for:
- `sanity-crud-examples.md` - Full CRUD patterns
- `groq-patterns.md` - Query examples
- `image-generation.md` - Replicate models
- `portable-text.md` - Block content
