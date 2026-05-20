'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Button } from '@/components/ui/Button'
import { CTAButtons } from '@/components/ui/CTAButtons'
import { useDemoModal } from '@/components/ui/DemoModal'
import { Check, ChevronDown, ArrowRight } from 'lucide-react'
import type { Comparison } from '@/lib/types'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

interface ComparisonPageProps {
  comparison: Comparison
}

function YanderLogo({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const dimensions = size === 'sm' ? 'w-10 h-10' : 'w-14 h-14 md:w-16 md:h-16'
  const imgSize = size === 'sm' ? 24 : 36
  return (
    <div className={`${dimensions} rounded-md border border-[var(--color-border-canon)] bg-white flex items-center justify-center shadow-[var(--shadow-canon-subtle)] overflow-hidden p-2`}>
      <Image src="/logo.svg" alt="Yander" width={imgSize} height={imgSize} className="object-contain" />
    </div>
  )
}

function CompetitorLogo({ comparison, size = 'md' }: { comparison: Comparison; size?: 'sm' | 'md' }) {
  const dimensions = size === 'sm' ? 'w-10 h-10' : 'w-14 h-14 md:w-16 md:h-16'
  const imgSize = size === 'sm' ? 24 : 36

  if (comparison.competitorLogo) {
    return (
      <div className={`${dimensions} rounded-md border border-[var(--color-border-canon)] bg-white flex items-center justify-center shadow-[var(--shadow-canon-subtle)] overflow-hidden p-2`}>
        <Image
          src={urlFor(comparison.competitorLogo).width(imgSize * 2).height(imgSize * 2).url()}
          alt={comparison.competitorName}
          width={imgSize}
          height={imgSize}
          className="object-contain"
        />
      </div>
    )
  }

  // Fallback: Google favicon API from their domain
  if (comparison.competitorUrl) {
    const domain = new URL(comparison.competitorUrl).hostname
    return (
      <div className={`${dimensions} rounded-md border border-[var(--color-border-canon)] bg-white flex items-center justify-center shadow-[var(--shadow-canon-subtle)] overflow-hidden p-2`}>
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
          alt={comparison.competitorName}
          width={imgSize}
          height={imgSize}
          className="object-contain"
        />
      </div>
    )
  }

  return (
    <div className={`${dimensions} rounded-xl border border-[#e5e5e5] bg-[#fafafa] flex items-center justify-center shadow-[rgba(23,23,23,0.04)_0px_4px_4px_0px]`}>
      <span className={`${size === 'sm' ? 'text-sm' : 'text-lg'} font-semibold text-gray-400`}>{comparison.competitorName[0]}</span>
    </div>
  )
}

function FAQItem({ question, answer, isOpen, onToggle }: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-[var(--color-border-canon)] last:border-b-0">
      <button onClick={onToggle} className="w-full py-5 flex items-center justify-between text-left group">
        <span className="text-base font-medium text-[var(--color-ink-primary)] pr-4 md:pr-8 group-hover:text-[var(--color-ink-secondary)] transition-colors">
          {question}
        </span>
        <div className={`w-8 h-8 rounded-md bg-[var(--color-surface-subtle)] border border-[var(--color-border-canon)] flex items-center justify-center flex-shrink-0 transition-all duration-200 ${isOpen ? 'bg-[var(--color-ink-primary)] border-[var(--color-ink-primary)]' : ''}`}>
          <ChevronDown className={`w-4 h-4 transition-all duration-200 ${isOpen ? 'rotate-180 text-white' : 'text-[var(--color-ink-muted)]'}`} />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[var(--color-ink-muted)] text-sm leading-relaxed pr-12">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function ComparisonPage({ comparison }: ComparisonPageProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)
  const { openModal: openDemoModal } = useDemoModal()

  return (
    <main>
      {/* Hero */}
      <section className="pt-12 pb-16 md:pt-20 md:pb-24 bg-white">
        <Container size="narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="flex justify-center">
              <Eyebrow>Comparison</Eyebrow>
            </div>

            {/* Logos */}
            <div className="flex items-center justify-center gap-4 md:gap-6 my-8">
              <YanderLogo />
              <span className="text-sm font-medium text-[var(--color-ink-faded)]">vs</span>
              <CompetitorLogo comparison={comparison} />
            </div>

            <h1 className="font-medium text-2xl md:text-3xl lg:text-4xl text-[var(--color-ink-primary)] tracking-tight leading-[1.05]">
              {comparison.headline}
            </h1>
            <p className="mt-4 text-base md:text-lg text-[var(--color-ink-muted)] max-w-2xl mx-auto">
              {comparison.heroDescription}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="https://app.yander.ai/sign-up?plan=starter&billing=monthly">
                <Button variant="primary" size="lg" className="group">
                  Try Yander Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <Button variant="secondary" size="lg" onClick={openDemoModal}>
                Book a Demo
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Quick Context */}
      <section className="py-16 md:py-20 bg-[#fafafa] border-y border-[#e5e5e5]">
        <Container>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl border border-[var(--color-border-canon)] shadow-[var(--shadow-canon-card)] p-6 md:p-8"
            >
              <div className="mb-4">
                <YanderLogo size="sm" />
              </div>
              <h3 className="font-medium text-lg text-[var(--color-ink-primary)] tracking-tight mb-2">Yander</h3>
              <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">{comparison.yanderSummary}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl border border-[var(--color-border-canon)] shadow-[var(--shadow-canon-card)] p-6 md:p-8"
            >
                <div className="mb-4">
                <CompetitorLogo comparison={comparison} size="sm" />
              </div>
              <h3 className="font-medium text-lg text-[var(--color-ink-primary)] tracking-tight mb-2">{comparison.competitorName}</h3>
              <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">{comparison.competitorSummary}</p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      {comparison.stats && comparison.stats.length > 0 && (
        <section className="py-12 md:py-16 bg-white border-b border-[#e5e5e5]">
          <Container>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {comparison.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="text-center"
                >
                  <p className="font-medium text-2xl md:text-3xl text-[var(--color-ink-primary)] tracking-tight">{stat.value}</p>
                  <p className="text-sm text-[var(--color-ink-muted)] mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Feature Comparison Table */}
      {comparison.featureRows && comparison.featureRows.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <Container>
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <Eyebrow number="01">Feature Comparison</Eyebrow>
              </div>
              <h2 className="font-medium text-2xl md:text-3xl text-[var(--color-ink-primary)] tracking-tight leading-[1.05]">
                How they compare
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto overflow-hidden rounded-2xl border border-[var(--color-border-canon)] shadow-[var(--shadow-canon-card)]"
            >
              {/* Table Header */}
              <div className="grid grid-cols-3 bg-[var(--color-surface-subtle)] border-b border-[var(--color-border-canon)]">
                <div className="text-left text-[11px] font-[var(--font-geist-mono)] text-[var(--color-ink-faded)] uppercase tracking-[0.22em] px-4 md:px-6 py-3">
                  Feature
                </div>
                <div className="text-left text-[11px] font-[var(--font-geist-mono)] text-[var(--color-ink-faded)] uppercase tracking-[0.22em] px-4 md:px-6 py-3">
                  Yander
                </div>
                <div className="text-left text-[11px] font-[var(--font-geist-mono)] text-[var(--color-ink-faded)] uppercase tracking-[0.22em] px-4 md:px-6 py-3">
                  {comparison.competitorName}
                </div>
              </div>

              {/* Table Body */}
              {comparison.featureRows.map((row, i) => (
                <div key={i} className="grid grid-cols-3 border-b border-[var(--color-border-canon-subtle)] last:border-b-0 hover:bg-[var(--color-surface-subtle)]/50 transition-colors">
                  <div className="px-4 md:px-6 py-4">
                    <p className="text-sm font-medium text-[var(--color-ink-primary)]">{row.feature}</p>
                    {row.whyItMatters && (
                      <p className="text-xs text-[var(--color-ink-faded)] mt-1">{row.whyItMatters}</p>
                    )}
                  </div>
                  <div className="px-4 md:px-6 py-4 flex items-start">
                    <p className="text-sm text-[var(--color-ink-secondary)]">{row.yander}</p>
                  </div>
                  <div className="px-4 md:px-6 py-4 flex items-start">
                    <p className="text-sm text-[var(--color-ink-secondary)]">{row.competitor}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </Container>
        </section>
      )}

      {/* Decision Framework */}
      {(comparison.chooseYander?.length || comparison.chooseCompetitor?.length) && (
        <section className="py-16 md:py-24 bg-[#fafafa] border-y border-[#e5e5e5]">
          <Container>
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <Eyebrow number="02">Decision Framework</Eyebrow>
              </div>
              <h2 className="font-medium text-2xl md:text-3xl text-[var(--color-ink-primary)] tracking-tight leading-[1.05]">
                Which one is right for you?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
              {/* Choose Yander */}
              {comparison.chooseYander && comparison.chooseYander.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl border border-[var(--color-border-canon)] shadow-[var(--shadow-canon-card)] p-6 md:p-8"
                >
                  <h3 className="font-medium text-lg text-[var(--color-ink-primary)] tracking-tight mb-6">Choose Yander if you...</h3>
                  <ul className="space-y-3">
                    {comparison.chooseYander.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-[var(--color-accent-alive)]" />
                        </div>
                        <span className="text-sm text-[var(--color-ink-secondary)] leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Choose Competitor */}
              {comparison.chooseCompetitor && comparison.chooseCompetitor.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white rounded-2xl border border-[var(--color-border-canon)] shadow-[var(--shadow-canon-card)] p-6 md:p-8"
                >
                  <h3 className="font-medium text-lg text-[var(--color-ink-primary)] tracking-tight mb-6">Choose {comparison.competitorName} if you...</h3>
                  <ul className="space-y-3">
                    {comparison.chooseCompetitor.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[var(--color-surface-muted)] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-[var(--color-ink-faded)]" />
                        </div>
                        <span className="text-sm text-[var(--color-ink-secondary)] leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Verdict */}
            {comparison.verdict && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8 max-w-3xl mx-auto bg-white rounded-2xl border border-[var(--color-border-canon)] shadow-[var(--shadow-canon-card)] p-6 md:p-8"
              >
                <h3 className="font-medium text-base text-[var(--color-ink-primary)] tracking-tight mb-3">The bottom line</h3>
                <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">{comparison.verdict}</p>
              </motion.div>
            )}
          </Container>
        </section>
      )}

      {/* Testimonial — homepage canon: grotesque, not italic serif */}
      {comparison.testimonial?.quote && (
        <section className="py-16 md:py-20 bg-white border-b border-[var(--color-border-canon)]">
          <Container size="narrow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <blockquote className="font-medium text-xl md:text-2xl text-[var(--color-ink-primary)] leading-relaxed">
                &ldquo;{comparison.testimonial.quote}&rdquo;
              </blockquote>
              {comparison.testimonial.name && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-[var(--color-ink-primary)]">{comparison.testimonial.name}</p>
                  {(comparison.testimonial.role || comparison.testimonial.company) && (
                    <p className="text-sm text-[var(--color-ink-muted)]">
                      {[comparison.testimonial.role, comparison.testimonial.company].filter(Boolean).join(', ')}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </Container>
        </section>
      )}

      {/* FAQ */}
      {comparison.faqs && comparison.faqs.length > 0 && (
        <section className="py-16 md:py-24 bg-[var(--color-surface-subtle)] border-b border-[var(--color-border-canon)]">
          <Container>
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                  <Eyebrow number="03">FAQ</Eyebrow>
                </div>
                <h2 className="font-medium text-2xl md:text-3xl text-[var(--color-ink-primary)] tracking-tight leading-[1.05]">
                  Frequently asked questions
                </h2>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl border border-[var(--color-border-canon)] shadow-[var(--shadow-canon-card)] px-6 md:px-8"
              >
                {comparison.faqs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openFAQ === index}
                    onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
                  />
                ))}
              </motion.div>
            </div>
          </Container>
        </section>
      )}

      {/* Final CTA — white bg, centered, same shape as homepage FinalCTA */}
      <section className="py-28 lg:py-36 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mx-auto text-balance font-medium text-[#171717] text-[clamp(2.5rem,5.2vw,3.625rem)] leading-[0.97] tracking-[-0.025em]">
              See why teams choose Yander over {comparison.competitorName}.
            </h2>
            <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-[#171717]/60">
              Start your free trial today. No credit card. Set up your first
              hiring pipeline in minutes.
            </p>
            <div className="mt-9 flex items-center justify-center">
              <CTAButtons ctaLocation={`compare_${comparison.slug.current}_final_cta`} size="lg" />
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  )
}
