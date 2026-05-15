import type { PortableTextBlock } from '@portabletext/types'
import type { Image } from 'sanity'

// SEO metadata interface
export interface SEO {
  metaTitle?: string
  metaDescription?: string
  ogImage?: Image & { alt?: string }
  canonicalUrl?: string
  noIndex?: boolean
  keywords?: string[]
}

// Image reference for write operations
export interface ImageReference {
  _type: 'image'
  asset: { _type: 'reference'; _ref: string }
  alt?: string
}

export interface Author {
  name: string
  slug?: { current: string }
  image?: Image
  bio?: string
  role?: string
  linkedinUrl?: string
  twitterUrl?: string
  yearsExperience?: number
  expertise?: string[]
  certifications?: string[]
}

export interface Category {
  _id?: string
  title: string
  slug: { current: string }
  description?: string
  color?: string
}

export interface Post {
  _id: string
  /** Sanity system field — the last time the doc was modified, used for dateModified. */
  _updatedAt?: string
  title: string
  slug: { current: string }
  author?: Author
  mainImage?: Image & { alt?: string }
  categories?: Category[]
  publishedAt?: string
  excerpt?: string
  body?: PortableTextBlock[]
  readTime?: number
  seo?: SEO
}

export interface PostCard {
  _id: string
  title: string
  slug: { current: string }
  author?: {
    name: string
    image?: Image
    role?: string
  }
  mainImage?: Image & { alt?: string }
  categories?: Category[]
  publishedAt?: string
  excerpt?: string
  readTime?: number
}

export interface PaginatedPosts {
  posts: PostCard[]
  total: number
}

// Code block type for portable text
export interface CodeBlock {
  _type: 'codeBlock'
  code: string
  language?: string
  filename?: string
}

// Image block type for portable text (inline images in body content)
export interface ImageBlock {
  _type: 'image'
  _key: string  // Required for Portable Text array items
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
}

// =============================================================================
// Input types for write operations (used by agents)
// =============================================================================

// Post input for create/update operations
export interface PostInput {
  _type: 'post'
  _id?: string
  title: string
  slug: { _type: 'slug'; current: string }
  author?: { _type: 'reference'; _ref: string }
  mainImage?: ImageReference
  categories?: Array<{ _type: 'reference'; _ref: string; _key: string }>
  publishedAt?: string
  excerpt?: string
  body?: PortableTextBlock[]
  readTime?: number
  seo?: SEO
}

// Author input for create/update operations
export interface AuthorInput {
  _type: 'author'
  _id?: string
  name: string
  slug: { _type: 'slug'; current: string }
  image?: ImageReference
  bio?: string
  role?: string
}

// Category input for create/update operations
export interface CategoryInput {
  _type: 'category'
  _id?: string
  title: string
  slug: { _type: 'slug'; current: string }
  description?: string
  color?: string
}

// =============================================================================
// Changelog Types
// =============================================================================

export type ChangeType =
  | 'feature'
  | 'improvement'
  | 'fix'
  | 'breaking'
  | 'deprecated'
  | 'security'
  | 'performance'

export interface ChangelogCard {
  _id: string
  title: string
  version: string
  slug: { current: string }
  summary?: string
  releaseDate: string
  changeTypes?: ChangeType[]
  isHighlight?: boolean
  coverImage?: Image & { alt?: string }
}

export interface Changelog extends ChangelogCard {
  body?: PortableTextBlock[]
  seo?: SEO
}

export interface PaginatedChangelogs {
  entries: ChangelogCard[]
  total: number
}

// =============================================================================
// Integration Types
// =============================================================================

export type IntegrationCategory = 'communication' | 'project-management' | 'meeting-import'

export interface IntegrationCard {
  _id: string
  name: string
  slug: { current: string }
  description: string
  logo: Image
  category: IntegrationCategory
  isImportOnly?: boolean
}

export interface IntegrationDetail extends IntegrationCard {
  longDescription: string
  features: string[]
  howItWorks: { step: string; description: string }[]
}

// =============================================================================
// Comparison Page Types
// =============================================================================

export interface ComparisonFeatureRow {
  feature: string
  yander: string
  competitor: string
  whyItMatters?: string
}

export interface ComparisonStat {
  value: string
  label: string
}

export interface Testimonial {
  quote?: string
  name?: string
  role?: string
  company?: string
}

export interface ComparisonFAQ {
  question: string
  answer: string
}

export interface ComparisonCard {
  _id: string
  title: string
  slug: { current: string }
  competitorName: string
  competitorLogo?: Image
  heroDescription: string
  publishedAt?: string
}

export interface Comparison extends ComparisonCard {
  competitorUrl?: string
  headline: string
  yanderSummary: string
  competitorSummary: string
  featureRows?: ComparisonFeatureRow[]
  chooseYander?: string[]
  chooseCompetitor?: string[]
  verdict?: string
  body?: PortableTextBlock[]
  faqs?: ComparisonFAQ[]
  stats?: ComparisonStat[]
  testimonial?: Testimonial
  seo?: SEO
}

// =============================================================================
// Industry / Use Case Page Types
// =============================================================================

export interface IndustryPainPoint {
  problem: string
  solution: string
}

export interface IndustryFeature {
  feature: string
  description: string
}

export interface IndustryPageCard {
  _id: string
  title: string
  slug: { current: string }
  industry: string
  headline: string
  heroDescription: string
  publishedAt?: string
}

// =============================================================================
// Landing / Pillar Page Types
// =============================================================================

export interface LandingPageCard {
  _id: string
  title: string
  slug: { current: string }
  pageType: 'landing' | 'pillar'
  headline: string
  heroDescription: string
  publishedAt?: string
}

export interface LandingPage extends LandingPageCard {
  painPoints?: IndustryPainPoint[]
  features?: IndustryFeature[]
  stats?: ComparisonStat[]
  body?: PortableTextBlock[]
  testimonial?: Testimonial
  faqs?: ComparisonFAQ[]
  seo?: SEO
}

export interface IndustryPage extends IndustryPageCard {
  painPoints?: IndustryPainPoint[]
  features?: IndustryFeature[]
  stats?: ComparisonStat[]
  body?: PortableTextBlock[]
  testimonial?: Testimonial
  faqs?: ComparisonFAQ[]
  seo?: SEO
}
