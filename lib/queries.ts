// Get all posts for listing
export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  readTime,
  mainImage,
  "author": author->{name, image, role},
  "categories": categories[]->{title, slug, color}
}`

// Get posts with pagination
export const paginatedPostsQuery = `{
  "posts": *[_type == "post"] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    mainImage,
    "author": author->{name, image, role},
    "categories": categories[]->{title, slug, color}
  },
  "total": count(*[_type == "post"])
}`

// Get posts filtered by category
export const postsByCategoryQuery = `*[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  readTime,
  mainImage,
  "author": author->{name, image, role},
  "categories": categories[]->{title, slug, color}
}`

// Get single post by slug
export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  body,
  excerpt,
  publishedAt,
  readTime,
  mainImage,
  seo {
    metaTitle,
    metaDescription,
    ogImage,
    canonicalUrl,
    noIndex,
    keywords
  },
  "author": author->{name, image, role, bio},
  "categories": categories[]->{_id, title, slug, color}
}`

// Get all slugs for static generation
export const postSlugsQuery = `*[_type == "post" && defined(slug.current)][].slug.current`

// Get all categories
export const categoriesQuery = `*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug,
  description,
  color
}`

// Get related posts (same category, exclude current post)
export const relatedPostsQuery = `*[_type == "post" && slug.current != $currentSlug && count(categories[@._ref in $categoryIds]) > 0] | order(publishedAt desc) [0...3] {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  readTime,
  mainImage,
  "author": author->{name, image},
  "categories": categories[]->{title, slug, color}
}`

// Search posts (optimized - searches title, excerpt, author name, category titles)
// NOTE: Removed pt::text(body) scan for performance. For full-text body search,
// use a dedicated search service or implement a searchIndex field.
export const searchPostsQuery = `*[_type == "post" && (
  title match $searchTerm + "*" ||
  excerpt match $searchTerm + "*" ||
  author->name match $searchTerm + "*" ||
  count(categories[@->title match $searchTerm + "*"]) > 0
)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  readTime,
  mainImage,
  "author": author->{name, image, role},
  "categories": categories[]->{title, slug, color}
}`

// Full-text search including body content (slower, use sparingly)
export const deepSearchPostsQuery = `*[_type == "post" && (
  title match $searchTerm + "*" ||
  excerpt match $searchTerm + "*" ||
  pt::text(body) match $searchTerm + "*"
)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  readTime,
  mainImage,
  "author": author->{name, image, role},
  "categories": categories[]->{title, slug, color}
}`

// =============================================================================
// Queries for CRUD Operations (used by agents)
// =============================================================================

// Get single post by ID with full details
export const postByIdQuery = `*[_type == "post" && _id == $id][0] {
  _id,
  title,
  slug,
  body,
  excerpt,
  publishedAt,
  readTime,
  mainImage,
  seo,
  "author": author->{_id, name, image, role, bio},
  "categories": categories[]->{_id, title, slug, color}
}`

// Get all authors
export const authorsQuery = `*[_type == "author"] | order(name asc) {
  _id,
  name,
  slug,
  image,
  bio,
  role
}`

// Get author by ID
export const authorByIdQuery = `*[_type == "author" && _id == $id][0]`

// Get category by ID
export const categoryByIdQuery = `*[_type == "category" && _id == $id][0]`

// Get all posts with SEO fields for audit
export const postsForSEOAuditQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  body,
  seo,
  "author": author->{name},
  "categories": categories[]->{title}
}`
