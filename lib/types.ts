import type { PortableTextBlock } from '@portabletext/types'
import type { Image } from 'sanity'

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
