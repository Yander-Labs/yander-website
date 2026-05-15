import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch, urlFor } from '@/lib/sanity'
import { comparisonBySlugQuery, comparisonSlugsQuery } from '@/lib/queries'
import type { Comparison } from '@/lib/types'
import { ComparisonPage } from './ComparisonPage'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { SchemaJsonLd, faqSchema } from '@/components/seo/SchemaJsonLd'
import { Container } from '@/components/ui/Container'
import { SITE_HANDLE, SITE_NAME, SITE_URL } from '@/lib/site'

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
    return { title: `Comparison Not Found | ${SITE_NAME}`, robots: { index: false, follow: false } }
  }

  const title = comparison.seo?.metaTitle || `Yander vs ${comparison.competitorName} — Honest 2026 Comparison`
  const description = comparison.seo?.metaDescription || comparison.heroDescription
  const url = `${SITE_URL}/compare/${comparison.slug.current}`
  const imageUrl = comparison.seo?.ogImage
    ? urlFor(comparison.seo.ogImage).width(1200).height(630).url()
    : `${SITE_URL}/og-image.png`
  const imageAlt = comparison.seo?.ogImage?.alt || `Yander vs ${comparison.competitorName}`

  return {
    title,
    description,
    keywords: comparison.seo?.keywords,
    alternates: { canonical: comparison.seo?.canonicalUrl || url },
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      siteName: SITE_NAME,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE_HANDLE,
      title,
      description,
      images: [imageUrl],
    },
    robots: comparison.seo?.noIndex ? { index: false, follow: false } : { index: true, follow: true },
  }
}

export default async function ComparePage({ params }: ComparePageProps) {
  const { slug } = await params
  const comparison = await sanityFetch<Comparison | null>(comparisonBySlugQuery, { slug })

  if (!comparison) {
    notFound()
  }

  const url = `${SITE_URL}/compare/${comparison.slug.current}`

  // Article schema is stronger than WebPage for comparison content — surfaces in AI Overviews.
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: comparison.title,
    description: comparison.heroDescription,
    url,
    inLanguage: 'en-US',
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    about: [
      { '@type': 'Thing', name: 'Yander', url: SITE_URL },
      { '@type': 'Thing', name: comparison.competitorName },
    ],
  }

  return (
    <>
      <SchemaJsonLd schema={articleSchema} />
      {comparison.faqs && comparison.faqs.length > 0 && (
        <SchemaJsonLd
          schema={faqSchema(
            comparison.faqs.map((f) => ({ question: f.question, answer: f.answer }))
          )}
        />
      )}
      <Container>
        <Breadcrumbs
          className="pt-32 pb-2"
          items={[
            { name: 'Home', href: '/' },
            { name: 'Compare', href: '/compare' },
            { name: `Yander vs ${comparison.competitorName}` },
          ]}
        />
      </Container>
      <ComparisonPage comparison={comparison} />
    </>
  )
}
