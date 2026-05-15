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
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { SITE_NAME, SITE_URL } from '@/lib/site'

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
  const entry = await sanityFetch<Changelog | null>(changelogBySlugQuery, { slug })

  if (!entry) {
    return { title: `Release Not Found | ${SITE_NAME}`, robots: { index: false, follow: false } }
  }

  const title =
    entry.seo?.metaTitle || `${entry.version}: ${entry.title} | Yander Changelog`
  const description =
    entry.seo?.metaDescription ||
    entry.summary ||
    `Yander release ${entry.version} — ${entry.title}`
  const entryUrl = `${SITE_URL}/changelog/${entry.slug.current}`

  return {
    title,
    description,
    alternates: { canonical: entryUrl },
    openGraph: {
      title,
      description,
      type: 'article',
      url: entryUrl,
      siteName: SITE_NAME,
      publishedTime: entry.releaseDate,
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
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
      images: [`${SITE_URL}/og-image.png`]
    },
    robots: entry.seo?.noIndex ? { index: false, follow: false } : { index: true, follow: true },
  }
}

function generateArticleLD(entry: Changelog) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: `${entry.version}: ${entry.title}`,
    description: entry.summary,
    datePublished: entry.releaseDate,
    inLanguage: 'en-US',
    publisher: { '@id': `${SITE_URL}/#organization` },
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

  const otherEntries = recentEntries.filter((e) => e._id !== entry._id)
  const articleLd = generateArticleLD(entry)

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      <Container>
        <Breadcrumbs
          className="pt-32 pb-2"
          items={[
            { name: 'Home', href: '/' },
            { name: 'Changelog', href: '/changelog' },
            { name: `${entry.version}: ${entry.title}` },
          ]}
        />
      </Container>
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
