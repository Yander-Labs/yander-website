import { sanityFetch } from '@/lib/sanity'
import { comparisonsQuery } from '@/lib/queries'
import type { ComparisonCard } from '@/lib/types'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { SchemaJsonLd } from '@/components/seo/SchemaJsonLd'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { pageMetadata } from '@/lib/page-metadata'
import { SITE_URL } from '@/lib/site'

export const revalidate = 60

export const metadata = pageMetadata({
  title: 'Yander Comparisons — Yander vs Other AI Hiring Tools',
  description:
    'Honest side-by-side comparisons of Yander vs Ashby, Eightfold, JuiceBox AI, Paradox, Fetcher. Feature breakdowns, real pricing, decision frameworks.',
  path: '/compare',
  ogImageAlt: 'Yander Comparisons',
})

export default async function ComparisonsPage() {
  const comparisons = await sanityFetch<ComparisonCard[]>(comparisonsQuery)

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Yander vs other hiring tools — comparison directory',
    url: `${SITE_URL}/compare`,
    description:
      'Side-by-side comparisons of Yander vs other AI recruiting and hiring tools.',
    hasPart: comparisons.map((c) => ({
      '@type': 'Article',
      name: `Yander vs ${c.competitorName}`,
      url: `${SITE_URL}/compare/${c.slug.current}`,
      description: c.heroDescription,
    })),
  }

  return (
    <main>
      <SchemaJsonLd schema={collectionSchema} />
      <section className="pt-12 pb-16 md:pt-20 md:pb-24 bg-white">
        <Container>
          <Breadcrumbs
            className="mb-8"
            items={[{ name: 'Home', href: '/' }, { name: 'Compare' }]}
          />
          <div className="text-center mb-12">
            <div className="mb-4 flex justify-center">
              <Eyebrow>Comparisons</Eyebrow>
            </div>
            <h1 className="font-geist font-bold text-2xl md:text-3xl lg:text-4xl text-[var(--color-ink-primary)] tracking-tight leading-[1.1]">
              How Yander compares
            </h1>
            <p className="mt-4 text-base text-[var(--color-ink-muted)] max-w-xl mx-auto">
              Honest, side-by-side breakdowns of Yander vs other hiring tools. We show you where we win and where the other tool might be a better fit.
            </p>
          </div>

          {comparisons.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {comparisons.map((comparison) => (
                <Link
                  key={comparison._id}
                  href={`/compare/${comparison.slug.current}`}
                  className="group bg-white rounded-none border border-[var(--color-border-canon)] shadow-[var(--shadow-canon-card)] p-6 hover:shadow-[var(--shadow-canon-card-hover)] hover:-translate-y-0.5 transition-all duration-150"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-none border border-[var(--color-border-canon)] bg-[var(--color-surface-subtle)] flex items-center justify-center">
                      <span className="text-xs font-semibold text-[var(--color-ink-primary)]">Y</span>
                    </div>
                    <span className="text-xs font-medium text-[var(--color-ink-faded)]">vs</span>
                    <div className="w-8 h-8 rounded-none border border-[var(--color-border-canon)] bg-[var(--color-surface-subtle)] flex items-center justify-center">
                      <span className="text-xs font-semibold text-[var(--color-ink-faded)]">{comparison.competitorName[0]}</span>
                    </div>
                  </div>

                  <h2 className="font-geist font-bold text-base text-[var(--color-ink-primary)] tracking-tight mb-2 group-hover:text-[var(--color-ink-secondary)] transition-colors">
                    Yander vs {comparison.competitorName}
                  </h2>
                  <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed line-clamp-2">
                    {comparison.heroDescription}
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[var(--color-ink-primary)] group-hover:text-[var(--color-ink-secondary)] transition-colors">
                    View comparison
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-sm text-[var(--color-ink-muted)]">Comparison pages coming soon.</p>
            </div>
          )}
        </Container>
      </section>
    </main>
  )
}
