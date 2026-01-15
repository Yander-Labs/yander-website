import { Suspense } from 'react'
import type { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity'
import { paginatedPostsQuery, categoriesQuery, postsByCategoryQuery } from '@/lib/queries'
import type { PostCard, Category, PaginatedPosts } from '@/lib/types'
import { Container } from '@/components/ui/Container'
import { BlogContent } from './BlogContent'

export const metadata: Metadata = {
  title: 'Blog | Yander',
  description: 'Insights on remote work, team productivity, and building better workplace culture.'
}

export const revalidate = 60 // Revalidate every 60 seconds

const POSTS_PER_PAGE = 9

interface BlogPageProps {
  searchParams: Promise<{ category?: string; page?: string }>
}

async function getPosts(category?: string, page: number = 1): Promise<{ posts: PostCard[]; total: number }> {
  const start = (page - 1) * POSTS_PER_PAGE
  const end = start + POSTS_PER_PAGE

  if (category) {
    const posts = await sanityFetch<PostCard[]>(postsByCategoryQuery, { categorySlug: category })
    const paginatedPosts = posts.slice(start, end)
    return { posts: paginatedPosts, total: posts.length }
  }

  const result = await sanityFetch<PaginatedPosts>(paginatedPostsQuery, { start, end })
  return result
}

async function getCategories(): Promise<Category[]> {
  return sanityFetch<Category[]>(categoriesQuery)
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const category = params.category
  const page = parseInt(params.page || '1', 10)

  const [{ posts, total }, categories] = await Promise.all([
    getPosts(category, page),
    getCategories()
  ])

  const totalPages = Math.ceil(total / POSTS_PER_PAGE)

  return (
    <main className="min-h-screen bg-white pt-28">
      <section className="py-8">
        <Container>
          <Suspense fallback={<BlogContentSkeleton />}>
            <BlogContent
              initialPosts={posts}
              categories={categories}
              totalPages={totalPages}
              currentPage={page}
              activeCategory={category}
            />
          </Suspense>
        </Container>
      </section>
    </main>
  )
}

function BlogContentSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header row skeleton */}
      <div className="flex flex-col md:flex-row gap-4 md:items-end">
        <div className="h-20 w-32 bg-gray-100 rounded animate-pulse" />
        <div className="h-8 bg-gray-100 rounded animate-pulse flex-1 max-w-sm" />
        <div className="flex gap-1.5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-8 w-16 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
      </div>

      {/* Table skeleton */}
      <div className="hidden md:block rounded border border-[#e5e5e5] overflow-hidden">
        <div className="bg-[#fafafa] h-8 border-b border-[#f0f0f0]" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-14 border-b border-[#f5f5f5] last:border-b-0 animate-pulse bg-white" />
        ))}
      </div>
    </div>
  )
}
