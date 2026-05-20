'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Button } from '@/components/ui/Button'
import { CTAButtons } from '@/components/ui/CTAButtons'
import { useDemoModal } from '@/components/ui/DemoModal'
import { Check, ChevronDown, ArrowRight } from 'lucide-react'
import type { IndustryPage } from '@/lib/types'

interface IndustryPageContentProps {
  page: IndustryPage
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

export function IndustryPageContent({ page }: IndustryPageContentProps) {
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
              <Eyebrow>{page.industry}</Eyebrow>
            </div>

            <h1 className="font-medium text-2xl md:text-3xl lg:text-4xl text-[var(--color-ink-primary)] tracking-tight leading-[1.05] mt-4">
              {page.headline}
            </h1>
            <p className="mt-4 text-base md:text-lg text-[var(--color-ink-muted)] max-w-2xl mx-auto">
              {page.heroDescription}
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

      {/* Stats */}
      {page.stats && page.stats.length > 0 && (
        <section className="py-12 md:py-16 bg-[var(--color-surface-subtle)] border-y border-[var(--color-border-canon)]">
          <Container>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {page.stats.map((stat, i) => (
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

      {/* Pain Points */}
      {page.painPoints && page.painPoints.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <Container>
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4"><Eyebrow number="01">The Problem</Eyebrow></div>
              <h2 className="font-medium text-2xl md:text-3xl text-[var(--color-ink-primary)] tracking-tight leading-[1.05]">
                Hiring challenges for {page.industry.toLowerCase()}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {page.painPoints.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-2xl border border-[var(--color-border-canon)] shadow-[var(--shadow-canon-card)] p-6"
                >
                  <h3 className="font-medium text-base text-[var(--color-ink-primary)] tracking-tight mb-2">{point.problem}</h3>
                  <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">{point.solution}</p>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Features */}
      {page.features && page.features.length > 0 && (
        <section className="py-16 md:py-24 bg-[var(--color-surface-subtle)] border-y border-[var(--color-border-canon)]">
          <Container>
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4"><Eyebrow number="02">How Yander Helps</Eyebrow></div>
              <h2 className="font-medium text-2xl md:text-3xl text-[var(--color-ink-primary)] tracking-tight leading-[1.05]">
                Built for {page.industry.toLowerCase()}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {page.features.map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-white rounded-2xl border border-[var(--color-border-canon)] shadow-[var(--shadow-canon-card)] p-6"
                >
                  <div className="w-8 h-8 rounded-md bg-emerald-50 flex items-center justify-center mb-4">
                    <Check className="w-4 h-4 text-[var(--color-accent-alive)]" />
                  </div>
                  <h3 className="font-medium text-base text-[var(--color-ink-primary)] tracking-tight mb-2">{feat.feature}</h3>
                  <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">{feat.description}</p>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Testimonial */}
      {page.testimonial?.quote && (
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
                &ldquo;{page.testimonial.quote}&rdquo;
              </blockquote>
              {page.testimonial.name && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-[var(--color-ink-primary)]">{page.testimonial.name}</p>
                  {(page.testimonial.role || page.testimonial.company) && (
                    <p className="text-sm text-[var(--color-ink-muted)]">
                      {[page.testimonial.role, page.testimonial.company].filter(Boolean).join(', ')}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </Container>
        </section>
      )}

      {/* FAQ */}
      {page.faqs && page.faqs.length > 0 && (
        <section className="py-16 md:py-24 bg-[var(--color-surface-subtle)] border-b border-[var(--color-border-canon)]">
          <Container>
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <div className="flex justify-center mb-4"><Eyebrow number="03">FAQ</Eyebrow></div>
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
                {page.faqs.map((faq, index) => (
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

      {/* Final CTA — same shape as the homepage FinalCTA: white bg,
          centered, Inter Medium, canonical CTAButtons (no dark gradient
          panel, no per-page custom buttons). */}
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
              Start hiring smarter today.
            </h2>
            <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-[#171717]/60">
              See how Yander helps you hire for {page.industry.toLowerCase()}.
              Free to start, no placement fees, no contracts.
            </p>
            <div className="mt-9 flex items-center justify-center">
              <CTAButtons ctaLocation={`industry_${page.slug.current}_final_cta`} size="lg" />
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  )
}
