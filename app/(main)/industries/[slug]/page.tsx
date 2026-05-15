import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch, urlFor } from '@/lib/sanity'
import { industryPageBySlugQuery, industryPageSlugsQuery } from '@/lib/queries'
import type { IndustryPage } from '@/lib/types'
import { IndustryPageContent } from './IndustryPageContent'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { SchemaJsonLd, faqSchema } from '@/components/seo/SchemaJsonLd'
import { Container } from '@/components/ui/Container'
import { SITE_HANDLE, SITE_NAME, SITE_URL } from '@/lib/site'

export const revalidate = 60

interface IndustryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>(industryPageSlugsQuery)
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await sanityFetch<IndustryPage | null>(industryPageBySlugQuery, { slug })

  if (!page) {
    return { title: `Page Not Found | ${SITE_NAME}`, robots: { index: false, follow: false } }
  }

  const title = page.seo?.metaTitle || page.title
  const description = page.seo?.metaDescription || page.heroDescription
  const url = `${SITE_URL}/industries/${page.slug.current}`
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
      type: 'website',
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

export default async function IndustryRoute({ params }: IndustryPageProps) {
  const { slug } = await params
  const page = await sanityFetch<IndustryPage | null>(industryPageBySlugQuery, { slug })

  if (!page) {
    notFound()
  }

  const url = `${SITE_URL}/industries/${page.slug.current}`

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.title,
    description: page.heroDescription,
    url,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: ['US', 'CA', 'GB', 'AU', 'BR', 'MX', 'IN', 'PH', 'RS', 'PL', 'ZA'],
    serviceType: 'AI recruiting',
    audience: {
      '@type': 'BusinessAudience',
      audienceType: page.industry,
    },
  }

  return (
    <>
      <SchemaJsonLd schema={serviceSchema} />
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
          items={[
            { name: 'Home', href: '/' },
            { name: 'Industries' },
            { name: page.industry || page.title },
          ]}
        />
      </Container>
      <IndustryPageContent page={page} />
    </>
  )
}
