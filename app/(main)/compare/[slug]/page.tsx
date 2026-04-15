import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch, urlFor } from '@/lib/sanity'
import { comparisonBySlugQuery, comparisonSlugsQuery } from '@/lib/queries'
import type { Comparison } from '@/lib/types'
import { ComparisonPage } from './ComparisonPage'

const SITE_URL = 'https://yander.io'

export const revalidate = 60

interface ComparePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>(comparisonSlugsQuery)
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ComparePageProps): Promise<Metadata> {
  const { slug } = await params
  const comparison = await sanityFetch<Comparison | null>(comparisonBySlugQuery, { slug })

  if (!comparison) {
    return { title: 'Comparison Not Found | Yander' }
  }

  const title = comparison.seo?.metaTitle || `Yander vs ${comparison.competitorName} | Comparison`
  const description = comparison.seo?.metaDescription || comparison.heroDescription
  const url = `${SITE_URL}/compare/${comparison.slug.current}`

  return {
    title,
    description,
    keywords: comparison.seo?.keywords,
    alternates: { canonical: comparison.seo?.canonicalUrl || url },
    openGraph: {
      title,
      description,
      type: 'website',
      url,
      siteName: 'Yander',
      ...(comparison.seo?.ogImage && {
        images: [{ url: urlFor(comparison.seo.ogImage).width(1200).height(630).url(), width: 1200, height: 630 }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: comparison.seo?.noIndex ? 'noindex, nofollow' : 'index, follow',
  }
}

export default async function ComparePage({ params }: ComparePageProps) {
  const { slug } = await params
  const comparison = await sanityFetch<Comparison | null>(comparisonBySlugQuery, { slug })

  if (!comparison) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: comparison.title,
    description: comparison.heroDescription,
    url: `${SITE_URL}/compare/${comparison.slug.current}`,
    publisher: {
      '@type': 'Organization',
      name: 'Yander',
      url: SITE_URL,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ComparisonPage comparison={comparison} />
    </>
  )
}
