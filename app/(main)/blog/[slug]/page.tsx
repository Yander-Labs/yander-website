import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/lib/sanity'
import { postBySlugQuery, postSlugsQuery, relatedPostsQuery } from '@/lib/queries'
import type { Post, PostCard } from '@/lib/types'
import { generatePostSEO, generateJSONLD } from '@/lib/seo-utils'
import { Container } from '@/components/ui/Container'
import { PostHeader } from '@/components/blog/PostHeader'
import { PostBody } from '@/components/blog/PostBody'
import { ReadingProgress } from '@/components/blog/ReadingProgress'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { ShareButtons } from '@/components/blog/ShareButtons'
import { AuthorCard } from '@/components/blog/AuthorCard'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { SITE_HANDLE, SITE_NAME, SITE_URL } from '@/lib/site'

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

  // Critical: fallback metadata for missing posts MUST be noindex,
  // otherwise Google may briefly index a 404 with generic metadata.
  if (!post) {
    return {
      title: `Post Not Found | ${SITE_NAME}`,
      robots: { index: false, follow: false },
    }
  }

  const seo = generatePostSEO(post, SITE_URL)
  const postUrl = `${SITE_URL}/blog/${post.slug.current}`

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: seo.canonical },
    openGraph: {
      title: seo.openGraph.title,
      description: seo.openGraph.description,
      type: 'article',
      url: postUrl,
      siteName: seo.openGraph.siteName,
      images: seo.openGraph.images,
      publishedTime: seo.datePublished,
      modifiedTime: seo.dateModified,
      authors: post.author ? [post.author.name] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE_HANDLE,
      title: seo.twitter.title,
      description: seo.twitter.description,
      images: seo.twitter.images,
    },
    robots: post.seo?.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
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

  const categoryIds = post.categories?.map((cat) => cat._id).filter(Boolean) as string[] || []
  const relatedPosts = await getRelatedPosts(slug, categoryIds)

  const postUrl = `${SITE_URL}/blog/${slug}`
  const jsonLd = generateJSONLD(post, SITE_URL)

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ReadingProgress />
      <PostHeader post={post} />

      <Container>
        <Breadcrumbs
          className="mb-6"
          items={[
            { name: 'Home', href: '/' },
            { name: 'Blog', href: '/blog' },
            { name: post.title },
          ]}
        />
        <div className="flex gap-8 lg:gap-12 pb-16">
          {/* Main Content */}
          <article className="flex-1 min-w-0 max-w-3xl">
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

          {/* Table of Contents - Desktop only */}
          {post.body && (
            <aside className="hidden xl:block w-56 xl:w-64 flex-shrink-0">
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
