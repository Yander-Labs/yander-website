import { Suspense } from 'react'
import { sanityFetch } from '@/lib/sanity'
import { paginatedPostsQuery, categoriesQuery, postsByCategoryQuery } from '@/lib/queries'
import type { PostCard, Category, PaginatedPosts } from '@/lib/types'
import { Container } from '@/components/ui/Container'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { SchemaJsonLd } from '@/components/seo/SchemaJsonLd'
import { BlogContent } from './BlogContent'
import { pageMetadata } from '@/lib/page-metadata'
import { SITE_URL } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Yander Blog — AI Recruiting & Global Hiring Insights',
  description:
    'Deep dives on AI recruiting, global hiring strategy, and remote team management. Honest 2026 takes from operators who hire across 60+ countries.',
  path: '/blog',
  ogImageAlt: 'Yander Blog',
})

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

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Yander Blog',
    url: `${SITE_URL}/blog`,
    description:
      'Deep dives on AI recruiting, global hiring, remote team management, and the future of work.',
    publisher: { '@id': `${SITE_URL}/#organization` },
    blogPost: posts.slice(0, 10).map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug.current}`,
      datePublished: p.publishedAt,
      description: p.excerpt,
      ...(p.author?.name ? { author: { '@type': 'Person', name: p.author.name } } : {}),
    })),
  }

  return (
    <main className="min-h-screen bg-white pt-28">
      <SchemaJsonLd schema={blogSchema} />
      <section className="py-8">
        <Container>
          <Breadcrumbs
            className="mb-6"
            items={[{ name: 'Home', href: '/' }, { name: 'Blog' }]}
          />
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
