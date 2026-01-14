# Blog Rules

## Route Structure

```
/blog           → Blog listing page (app/(main)/blog/page.tsx)
/blog/[slug]    → Individual post (app/(main)/blog/[slug]/page.tsx)
/studio         → Sanity Studio for content management
```

## Data Fetching

```typescript
import { sanityFetch } from "@/lib/sanity"
import { postsQuery, postBySlugQuery, categoriesQuery } from "@/lib/queries"
import type { Post, PostCard, Category } from "@/lib/types"

// Fetch all posts
const posts = await sanityFetch<PostCard[]>(postsQuery)

// Fetch single post
const post = await sanityFetch<Post | null>(postBySlugQuery, { slug })

// Fetch categories
const categories = await sanityFetch<Category[]>(categoriesQuery)
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

## Category Colors

Categories use Tailwind color names stored in `color` field:
- `blue`, `emerald`, `purple`, `amber`, `rose`, `cyan`, `orange`

Used in `CategoryBadge` component for theming.

## ISR Revalidation

```typescript
// At top of page.tsx
export const revalidate = 60 // Revalidate every 60 seconds
```

## Static Generation

```typescript
// Generate static pages for all posts
export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>(postSlugsQuery)
  return slugs.map((slug) => ({ slug }))
}
```

## Dynamic Metadata

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await sanityFetch<Post | null>(postBySlugQuery, {
    slug: params.slug
  })

  return {
    title: post?.title,
    description: post?.excerpt,
  }
}
```

## Post Page Component Order

1. `ReadingProgress` - Sticky progress bar at top
2. `PostHeader` - Hero with image, title, metadata
3. `TableOfContents` - Sidebar navigation (desktop)
4. `PostBody` - Portable Text content
5. `ShareButtons` - Social sharing
6. `AuthorCard` - Author bio
7. `RelatedPosts` - Recommended posts

## Blog Listing Features

- Server-side initial load
- Client-side search filtering
- Category filter pills
- Pagination with page numbers
- Animated card entrance

## Adding New Blog Features

1. Add schema field in `sanity/schemaTypes/post.ts` if needed
2. Add query in `lib/queries.ts`
3. Add type in `lib/types.ts`
4. Create or update component in `components/blog/`
5. Run `npm run build` to verify
