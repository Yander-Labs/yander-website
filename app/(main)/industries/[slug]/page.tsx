import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch, urlFor } from '@/lib/sanity'
import { industryPageBySlugQuery, industryPageSlugsQuery } from '@/lib/queries'
import type { IndustryPage } from '@/lib/types'
import { IndustryPageContent } from './IndustryPageContent'

const SITE_URL = 'https://yander.io'

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
    return { title: 'Page Not Found | Yander' }
  }

  const title = page.seo?.metaTitle || page.title
  const description = page.seo?.metaDescription || page.heroDescription
  const url = `${SITE_URL}/industries/${page.slug.current}`

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

export default async function IndustryRoute({ params }: IndustryPageProps) {
  const { slug } = await params
  const page = await sanityFetch<IndustryPage | null>(industryPageBySlugQuery, { slug })

  if (!page) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.heroDescription,
    url: `${SITE_URL}/industries/${page.slug.current}`,
    publisher: { '@type': 'Organization', name: 'Yander', url: SITE_URL },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <IndustryPageContent page={page} />
    </>
  )
}
