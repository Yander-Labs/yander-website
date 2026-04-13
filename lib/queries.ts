// Get all posts for listing (only published posts - publishedAt <= now)
export const postsQuery = `*[_type == "post" && publishedAt <= now()] | order(publishedAt desc) {
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

// Get posts with pagination (only published posts)
export const paginatedPostsQuery = `{
  "posts": *[_type == "post" && publishedAt <= now()] | order(publishedAt desc) [$start...$end] {
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
  "total": count(*[_type == "post" && publishedAt <= now()])
}`

// Get posts filtered by category (only published)
export const postsByCategoryQuery = `*[_type == "post" && publishedAt <= now() && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
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
export const relatedPostsQuery = `*[_type == "post" && publishedAt <= now() && slug.current != $currentSlug && count(categories[@._ref in $categoryIds]) > 0] | order(publishedAt desc) [0...3] {
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
export const searchPostsQuery = `*[_type == "post" && publishedAt <= now() && (
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
export const deepSearchPostsQuery = `*[_type == "post" && publishedAt <= now() && (
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

// =============================================================================
// Changelog Queries
// =============================================================================

// Get all changelog entries for listing (newest first)
export const changelogsQuery = `*[_type == "changelog"] | order(releaseDate desc) {
  _id,
  title,
  version,
  slug,
  summary,
  releaseDate,
  changeTypes,
  isHighlight,
  coverImage
}`

// Get changelog entries with pagination
export const paginatedChangelogsQuery = `{
  "entries": *[_type == "changelog"] | order(releaseDate desc) [$start...$end] {
    _id,
    title,
    version,
    slug,
    summary,
    releaseDate,
    changeTypes,
    isHighlight,
    coverImage
  },
  "total": count(*[_type == "changelog"])
}`

// Get single changelog by slug
export const changelogBySlugQuery = `*[_type == "changelog" && slug.current == $slug][0] {
  _id,
  title,
  version,
  slug,
  summary,
  releaseDate,
  changeTypes,
  isHighlight,
  coverImage,
  body,
  seo {
    metaTitle,
    metaDescription,
    ogImage,
    canonicalUrl,
    noIndex,
    keywords
  }
}`

// Get all slugs for static generation
export const changelogSlugsQuery = `*[_type == "changelog" && defined(slug.current)][].slug.current`

// Get recent changelog entries (for sidebar/footer widget)
export const recentChangelogsQuery = `*[_type == "changelog"] | order(releaseDate desc) [0...5] {
  _id,
  title,
  version,
  slug,
  summary,
  releaseDate,
  changeTypes
}`

// =============================================================================
// Integration Queries
// =============================================================================

// Get all integrations for listing
export const integrationsQuery = `*[_type == "integration"] | order(order asc, name asc) {
  _id,
  name,
  slug,
  description,
  logo,
  category,
  isImportOnly
}`

// Get single integration by slug
export const integrationBySlugQuery = `*[_type == "integration" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  description,
  longDescription,
  logo,
  category,
  isImportOnly,
  features,
  howItWorks
}`

// Get all slugs for static generation
export const integrationSlugsQuery = `*[_type == "integration" && defined(slug.current)][].slug.current`

// =============================================================================
// Comparison Page Queries
// =============================================================================

// Get all comparison pages for listing
export const comparisonsQuery = `*[_type == "comparison"] | order(competitorName asc) {
  _id,
  title,
  slug,
  competitorName,
  competitorLogo,
  heroDescription,
  publishedAt
}`

// Get single comparison by slug
export const comparisonBySlugQuery = `*[_type == "comparison" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  competitorName,
  competitorLogo,
  competitorUrl,
  headline,
  heroDescription,
  yanderSummary,
  competitorSummary,
  featureRows,
  chooseYander,
  chooseCompetitor,
  verdict,
  body,
  faqs,
  stats,
  testimonial,
  publishedAt,
  seo {
    metaTitle,
    metaDescription,
    ogImage,
    canonicalUrl,
    noIndex,
    keywords
  }
}`

// Get all comparison slugs for static generation
export const comparisonSlugsQuery = `*[_type == "comparison" && defined(slug.current)][].slug.current`

// =============================================================================
// Industry / Use Case Page Queries
// =============================================================================

// Get all industry pages for listing
export const industryPagesQuery = `*[_type == "industryPage"] | order(industry asc) {
  _id,
  title,
  slug,
  industry,
  headline,
  heroDescription,
  publishedAt
}`

// Get single industry page by slug
export const industryPageBySlugQuery = `*[_type == "industryPage" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  industry,
  headline,
  heroDescription,
  painPoints,
  features,
  stats,
  body,
  testimonial,
  faqs,
  publishedAt,
  seo {
    metaTitle,
    metaDescription,
    ogImage,
    canonicalUrl,
    noIndex,
    keywords
  }
}`

// Get all industry page slugs for static generation
export const industryPageSlugsQuery = `*[_type == "industryPage" && defined(slug.current)][].slug.current`

// =============================================================================
// Landing / Pillar Page Queries
// =============================================================================

// Get all landing pages for listing
export const landingPagesQuery = `*[_type == "landingPage"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  pageType,
  headline,
  heroDescription,
  publishedAt
}`

// Get single landing page by slug
export const landingPageBySlugQuery = `*[_type == "landingPage" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  pageType,
  headline,
  heroDescription,
  painPoints,
  features,
  stats,
  body,
  testimonial,
  faqs,
  publishedAt,
  seo {
    metaTitle,
    metaDescription,
    ogImage,
    canonicalUrl,
    noIndex,
    keywords
  }
}`

// Get all landing page slugs for static generation
export const landingPageSlugsQuery = `*[_type == "landingPage" && defined(slug.current)][].slug.current`
