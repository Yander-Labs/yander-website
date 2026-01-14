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
  "author": author->{name, image, role, bio},
  "categories": categories[]->{title, slug, color}
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

// Search posts
export const searchPostsQuery = `*[_type == "post" && (
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
