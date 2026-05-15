import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch, urlFor } from '@/lib/sanity'
import { landingPageBySlugQuery, landingPageSlugsQuery } from '@/lib/queries'
import type { LandingPage } from '@/lib/types'
import { LandingPageContent } from './LandingPageContent'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { SchemaJsonLd, faqSchema } from '@/components/seo/SchemaJsonLd'
import { Container } from '@/components/ui/Container'
import { SITE_HANDLE, SITE_NAME, SITE_URL } from '@/lib/site'

export const revalidate = 60

interface LandingPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>(landingPageSlugsQuery)
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: LandingPageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await sanityFetch<LandingPage | null>(landingPageBySlugQuery, { slug })

  if (!page) {
    return { title: `Page Not Found | ${SITE_NAME}`, robots: { index: false, follow: false } }
  }

  const title = page.seo?.metaTitle || page.title
  const description = page.seo?.metaDescription || page.heroDescription
  const url = `${SITE_URL}/pages/${page.slug.current}`
  const imageUrl = page.seo?.ogImage
    ? urlFor(page.seo.ogImage).width(1200).height(630).url()
    : `${SITE_URL}/og-image.png`
  const imageAlt = page.seo?.ogImage?.alt || title

  return {
    title,
    description,
    keywords: page.seo?.keywords,
    alternates: { canonical: page.seo?.canonicalUrl || url },
    openGraph: {
      title,
      description,
      type: page.pageType === 'pillar' ? 'article' : 'website',
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
    robots: page.seo?.noIndex ? { index: false, follow: false } : { index: true, follow: true },
  }
}

export default async function LandingRoute({ params }: LandingPageProps) {
  const { slug } = await params
  const page = await sanityFetch<LandingPage | null>(landingPageBySlugQuery, { slug })

  if (!page) {
    notFound()
  }

  const url = `${SITE_URL}/pages/${page.slug.current}`
  const isPillar = page.pageType === 'pillar'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': isPillar ? 'Article' : 'WebPage',
    name: page.title,
    headline: page.title,
    description: page.heroDescription,
    url,
    inLanguage: 'en-US',
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }

  return (
    <>
      <SchemaJsonLd schema={jsonLd} />
      {page.faqs && page.faqs.length > 0 && (
        <SchemaJsonLd
          schema={faqSchema(
            page.faqs.map((f) => ({ question: f.question, answer: f.answer }))
          )}
        />
      )}
      <Container>
        <Breadcrumbs
          className="pt-32 pb-2"
          items={[{ name: 'Home', href: '/' }, { name: page.title }]}
        />
      </Container>
      <LandingPageContent page={page} />
    </>
  )
}
