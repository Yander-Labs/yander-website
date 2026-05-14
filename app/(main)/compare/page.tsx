import type { Metadata } from 'next'
import { sanityFetch } from '@/lib/sanity'
import { comparisonsQuery } from '@/lib/queries'
import type { ComparisonCard } from '@/lib/types'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Yander Comparisons | See How Yander Stacks Up',
  description: 'Honest comparisons between Yander and other hiring tools. See feature breakdowns, decision frameworks, and which tool is right for your team.',
  alternates: { canonical: 'https://yander.ai/compare' },
}

export default async function ComparisonsPage() {
  const comparisons = await sanityFetch<ComparisonCard[]>(comparisonsQuery)

  return (
    <main>
      <section className="pt-12 pb-16 md:pt-20 md:pb-24 bg-white">
        <Container>
          <div className="text-center mb-12">
            <SectionLabel centered>Comparisons</SectionLabel>
            <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl text-[#171717] tracking-[-0.02em]">
              How Yander compares
            </h1>
            <p className="mt-4 text-base text-[#737373] max-w-xl mx-auto">
              Honest, side-by-side breakdowns of Yander vs other hiring tools. We show you where we win and where the other tool might be a better fit.
            </p>
          </div>

          {comparisons.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {comparisons.map((comparison) => (
                <Link
                  key={comparison._id}
                  href={`/compare/${comparison.slug.current}`}
                  className="group bg-white rounded-[12px] border border-[#e5e5e5] shadow-[rgba(0,0,0,0.04)_0px_1px_2px_0px] p-6 hover:shadow-[rgba(23,23,23,0.04)_0px_4px_4px_0px] hover:-translate-y-0.5 hover:border-gray-300 transition-all duration-150"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg border border-[#e5e5e5] bg-[#fafafa] flex items-center justify-center">
                      <span className="text-xs font-semibold text-[#171717]">Y</span>
                    </div>
                    <span className="text-xs font-medium text-gray-400">vs</span>
                    <div className="w-8 h-8 rounded-lg border border-[#e5e5e5] bg-[#fafafa] flex items-center justify-center">
                      <span className="text-xs font-semibold text-gray-400">{comparison.competitorName[0]}</span>
                    </div>
                  </div>

                  <h2 className="font-semibold text-base text-[#171717] mb-2 group-hover:text-gray-600 transition-colors">
                    Yander vs {comparison.competitorName}
                  </h2>
                  <p className="text-sm text-[#737373] leading-relaxed line-clamp-2">
                    {comparison.heroDescription}
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[#171717] group-hover:text-gray-600 transition-colors">
                    View comparison
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-sm text-[#737373]">Comparison pages coming soon.</p>
            </div>
          )}
        </Container>
      </section>
    </main>
  )
}
