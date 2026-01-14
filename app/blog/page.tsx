import { Suspense } from 'react'
import type { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity'
import { paginatedPostsQuery, categoriesQuery, postsByCategoryQuery } from '@/lib/queries'
import type { PostCard, Category, PaginatedPosts } from '@/lib/types'
import { Container } from '@/components/ui/Container'
import { BlogHero } from '@/components/blog/BlogHero'
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
    <main className="min-h-screen bg-white">
      <BlogHero />

      <section className="py-12">
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
    <div className="space-y-8">
      {/* Search and filter skeleton */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="h-12 bg-gray-100 rounded-xl animate-pulse flex-1 max-w-md" />
        <div className="flex gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 w-20 bg-gray-100 rounded-full animate-pulse" />
          ))}
        </div>
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-[#E4E7EC] overflow-hidden">
            <div className="aspect-[16/10] bg-gray-100 animate-pulse" />
            <div className="p-5 space-y-3">
              <div className="h-4 w-16 bg-gray-100 rounded-full animate-pulse" />
              <div className="h-6 bg-gray-100 rounded animate-pulse" />
              <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
