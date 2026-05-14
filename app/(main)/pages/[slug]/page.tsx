import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch, urlFor } from '@/lib/sanity'
import { landingPageBySlugQuery, landingPageSlugsQuery } from '@/lib/queries'
import type { LandingPage } from '@/lib/types'
import { LandingPageContent } from './LandingPageContent'

const SITE_URL = 'https://yander.ai'

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
    return { title: 'Page Not Found | Yander' }
  }

  const title = page.seo?.metaTitle || page.title
  const description = page.seo?.metaDescription || page.heroDescription
  const url = `${SITE_URL}/pages/${page.slug.current}`

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
      siteName: 'Yander',
      ...(page.seo?.ogImage && {
        images: [{ url: urlFor(page.seo.ogImage).width(1200).height(630).url(), width: 1200, height: 630 }],
      }),
    },
    twitter: { card: 'summary_large_image', title, description },
    robots: page.seo?.noIndex ? 'noindex, nofollow' : 'index, follow',
  }
}

export default async function LandingRoute({ params }: LandingPageProps) {
  const { slug } = await params
  const page = await sanityFetch<LandingPage | null>(landingPageBySlugQuery, { slug })

  if (!page) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.heroDescription,
    url: `${SITE_URL}/pages/${page.slug.current}`,
    publisher: { '@type': 'Organization', name: 'Yander', url: SITE_URL },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPageContent page={page} />
    </>
  )
}
