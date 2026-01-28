import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch, urlFor } from '@/lib/sanity'
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

const SITE_URL = 'https://yander.io'

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

  const seo = generatePostSEO(post, SITE_URL)
  const postUrl = `${SITE_URL}/blog/${post.slug.current}`

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonical,
    },
    openGraph: {
      title: seo.openGraph.title,
      description: seo.openGraph.description,
      type: 'article',
      url: postUrl,
      siteName: seo.openGraph.siteName,
      images: seo.openGraph.images,
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author.name] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.twitter.title,
      description: seo.twitter.description,
      images: seo.twitter.images,
    },
    robots: seo.robots,
  }
}

async function getPost(slug: string): Promise<Post | null> {
  return sanityFetch<Post | null>(postBySlugQuery, { slug })
}

async function getRelatedPosts(currentSlug: string, categoryIds: string[]): Promise<PostCard[]> {
  if (categoryIds.length === 0) return []
  return sanityFetch<PostCard[]>(relatedPostsQuery, { currentSlug, categoryIds })
}

// Generate breadcrumb structured data
function generateBreadcrumbLD(post: Post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug.current}`,
      },
    ],
  }
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
  const postUrl = `${SITE_URL}/blog/${slug}`

  // Generate structured data
  const jsonLd = generateJSONLD(post, SITE_URL)
  const breadcrumbLd = generateBreadcrumbLD(post)

  return (
    <main className="min-h-screen bg-white">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <ReadingProgress />
      <PostHeader post={post} />

      <Container>
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
