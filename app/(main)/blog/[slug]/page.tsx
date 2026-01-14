import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/lib/sanity'
import { postBySlugQuery, postSlugsQuery, relatedPostsQuery } from '@/lib/queries'
import type { Post, PostCard } from '@/lib/types'
import { Container } from '@/components/ui/Container'
import { PostHeader } from '@/components/blog/PostHeader'
import { PostBody } from '@/components/blog/PostBody'
import { ReadingProgress } from '@/components/blog/ReadingProgress'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { ShareButtons } from '@/components/blog/ShareButtons'
import { AuthorCard } from '@/components/blog/AuthorCard'
import { RelatedPosts } from '@/components/blog/RelatedPosts'

export const revalidate = 60 // Revalidate every 60 seconds

interface PostPageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for all posts
export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>(postSlugsQuery)
  return slugs.map((slug) => ({ slug }))
}

// Generate metadata for each post
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await sanityFetch<Post | null>(postBySlugQuery, { slug })

  if (!post) {
    return {
      title: 'Post Not Found | Yander'
    }
  }

  return {
    title: `${post.title} | Yander Blog`,
    description: post.excerpt || `Read ${post.title} on the Yander blog.`
  }
}

async function getPost(slug: string): Promise<Post | null> {
  return sanityFetch<Post | null>(postBySlugQuery, { slug })
}

async function getRelatedPosts(currentSlug: string, categoryIds: string[]): Promise<PostCard[]> {
  if (categoryIds.length === 0) return []
  return sanityFetch<PostCard[]>(relatedPostsQuery, { currentSlug, categoryIds })
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  // Get category IDs for related posts query
  const categoryIds = post.categories?.map((cat) => cat._id).filter(Boolean) as string[] || []
  const relatedPosts = await getRelatedPosts(slug, categoryIds)

  // Build URL for sharing
  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yander.ai'}/blog/${slug}`

  return (
    <main className="min-h-screen bg-white">
      <ReadingProgress />
      <PostHeader post={post} />

      <Container>
        <div className="flex gap-12 pb-16">
          {/* Main Content */}
          <article className="flex-1 max-w-3xl">
            {post.body && <PostBody body={post.body} />}

            {/* Share buttons */}
            <div className="mt-12 pt-8 border-t border-[#E4E7EC]">
              <ShareButtons title={post.title} url={postUrl} />
            </div>

            {/* Author card */}
            {post.author && (
              <div className="mt-8">
                <AuthorCard author={post.author} />
              </div>
            )}
          </article>

          {/* Table of Contents - Desktop */}
          {post.body && (
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <TableOfContents body={post.body} />
            </aside>
          )}
        </div>

        {/* Related Posts */}
        <RelatedPosts posts={relatedPosts} />
      </Container>
    </main>
  )
}
