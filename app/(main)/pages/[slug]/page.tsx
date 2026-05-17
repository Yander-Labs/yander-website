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

/**
 * Build a Person object for the page author. Mirrors the Article author shape
 * used by blog posts in lib/seo-utils.ts so pillar pages get E-E-A-T parity.
 */
function buildAuthorSchema(author: LandingPage['author']) {
  if (!author) return undefined
  return {
    '@type': 'Person' as const,
    name: author.name,
    ...(author.role ? { jobTitle: author.role } : {}),
    ...(author.bio ? { description: author.bio } : {}),
    ...(author.slug?.current
      ? { url: `${SITE_URL}/about#${author.slug.current}` }
      : {}),
    ...(author.linkedinUrl || author.twitterUrl
      ? {
          sameAs: [author.linkedinUrl, author.twitterUrl].filter(Boolean),
        }
      : {}),
  }
}

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

  const authorSchema = buildAuthorSchema(page.author)
  const ogImageUrl = page.seo?.ogImage
    ? urlFor(page.seo.ogImage).width(1200).height(630).url()
    : `${SITE_URL}/og-image.png`

  // Pillar pages get the rich Article schema (matches blog post E-E-A-T parity).
  // Plain landing pages stay as WebPage.
  const jsonLd = isPillar
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        name: page.title,
        headline: page.title,
        description: page.heroDescription,
        url,
        inLanguage: 'en-US',
        ...(page.publishedAt ? { datePublished: page.publishedAt } : {}),
        ...(page._updatedAt ? { dateModified: page._updatedAt } : {}),
        ...(authorSchema ? { author: authorSchema } : {}),
        image: ogImageUrl,
        publisher: { '@id': `${SITE_URL}/#organization` },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
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
