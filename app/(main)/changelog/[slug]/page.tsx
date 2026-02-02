import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/lib/sanity'
import {
  changelogBySlugQuery,
  changelogSlugsQuery,
  recentChangelogsQuery
} from '@/lib/queries'
import type { Changelog, ChangelogCard } from '@/lib/types'
import { Container } from '@/components/ui/Container'
import { ChangelogHeader } from '@/components/changelog/ChangelogHeader'
import { ChangelogBody } from '@/components/changelog/ChangelogBody'
import { RecentChangelogs } from '@/components/changelog/RecentChangelogs'

const SITE_URL = 'https://yander.io'

export const revalidate = 60

interface ChangelogDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>(changelogSlugsQuery)
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params
}: ChangelogDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const entry = await sanityFetch<Changelog | null>(changelogBySlugQuery, {
    slug
  })

  if (!entry) {
    return { title: 'Release Not Found | Yander' }
  }

  const title =
    entry.seo?.metaTitle || `${entry.version}: ${entry.title} | Yander Changelog`
  const description =
    entry.seo?.metaDescription ||
    entry.summary ||
    `Yander release ${entry.version} - ${entry.title}`
  const entryUrl = `${SITE_URL}/changelog/${entry.slug.current}`

  return {
    title,
    description,
    alternates: {
      canonical: entryUrl
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: entryUrl,
      siteName: 'Yander',
      publishedTime: entry.releaseDate,
      images: [
        {
          url: 'https://yander.io/og-image.png',
          width: 1200,
          height: 630,
          alt: `${entry.version}: ${entry.title}`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://yander.io/og-image.png']
    }
  }
}

function generateBreadcrumbLD(entry: Changelog) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Changelog',
        item: `${SITE_URL}/changelog`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${entry.version}: ${entry.title}`,
        item: `${SITE_URL}/changelog/${entry.slug.current}`
      }
    ]
  }
}

function generateArticleLD(entry: Changelog) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${entry.version}: ${entry.title}`,
    description: entry.summary,
    datePublished: entry.releaseDate,
    publisher: {
      '@type': 'Organization',
      name: 'Yander',
      url: SITE_URL
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/changelog/${entry.slug.current}`
    }
  }
}

export default async function ChangelogDetailPage({
  params
}: ChangelogDetailPageProps) {
  const { slug } = await params

  const [entry, recentEntries] = await Promise.all([
    sanityFetch<Changelog | null>(changelogBySlugQuery, { slug }),
    sanityFetch<ChangelogCard[]>(recentChangelogsQuery)
  ])

  if (!entry) {
    notFound()
  }

  // Filter out current entry from recent entries
  const otherEntries = recentEntries.filter((e) => e._id !== entry._id)

  const breadcrumbLd = generateBreadcrumbLD(entry)
  const articleLd = generateArticleLD(entry)

  return (
    <main className="min-h-screen bg-white">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <ChangelogHeader entry={entry} />

      <Container size="narrow">
        <div className="pb-16">
          {entry.body && <ChangelogBody body={entry.body} />}
        </div>

        <RecentChangelogs entries={otherEntries} />
      </Container>
    </main>
  )
}
