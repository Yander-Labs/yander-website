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

// Image block type for portable text
export interface ImageBlock {
  _type: 'image'
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
