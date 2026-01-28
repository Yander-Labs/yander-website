# GROQ Query Patterns

Detailed GROQ query examples for Sanity CMS. For quick reference, see `.claude/rules/sanity.md`.

## Basic Patterns

### Single Document by Slug

```groq
*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  body,
  seo,
  "author": author->{name, image}
}
```

### List with Pagination

```groq
*[_type == "post"] | order(publishedAt desc) [$start...$end] {
  _id,
  title,
  slug,
  excerpt,
  "categories": categories[]->{title, slug, color}
}
```

### Filter by Category

```groq
*[_type == "post" && $categorySlug in categories[]->slug.current]
```

## Dereference Relations

```groq
// Single reference
author->{name, image}

// Array of references
categories[]->{title, slug, color}

// Nested references
author->{name, "avatar": image.asset->url}
```

## Full-Text Search

```groq
*[_type == "post" && (
  title match $term + "*" ||
  excerpt match $term + "*" ||
  pt::text(body) match $term + "*"
)]
```

## Count Documents

```groq
count(*[_type == "post"])
```

## Get All Slugs (for Static Generation)

```groq
*[_type == "post"].slug.current
```

## Related Posts

```groq
*[_type == "post" &&
  slug.current != $currentSlug &&
  count((categories[]._ref)[@ in $categoryIds]) > 0
] | order(publishedAt desc) [0...3] {
  _id,
  title,
  slug,
  excerpt,
  mainImage
}
```

## Typed Fetching in TypeScript

```typescript
import type { Post, PostCard } from "@/lib/types"

const posts = await sanityFetch<PostCard[]>(postsQuery)
const post = await sanityFetch<Post | null>(postBySlugQuery, { slug })
```

## Available Queries

| Query | Returns | Parameters |
|-------|---------|------------|
| `postsQuery` | All posts | None |
| `paginatedPostsQuery` | Posts + total | `$start`, `$end` |
| `postsByCategoryQuery` | Filtered posts | `$categorySlug` |
| `postBySlugQuery` | Single post | `$slug` |
| `postSlugsQuery` | All slugs | None |
| `categoriesQuery` | All categories | None |
| `relatedPostsQuery` | Related posts | `$currentSlug`, `$categoryIds` |
| `searchPostsQuery` | Search results | `$searchTerm` |
