'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { useDemoModal } from '@/components/ui/DemoModal'
import { Check, ChevronDown, ArrowRight, Sparkles } from 'lucide-react'
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
    <div className={`${dimensions} rounded-xl border border-[#e5e5e5] bg-white flex items-center justify-center shadow-[rgba(23,23,23,0.04)_0px_4px_4px_0px] overflow-hidden p-2`}>
      <Image src="/logo.svg" alt="Yander" width={imgSize} height={imgSize} className="object-contain" />
    </div>
  )
}

function CompetitorLogo({ comparison, size = 'md' }: { comparison: Comparison; size?: 'sm' | 'md' }) {
  const dimensions = size === 'sm' ? 'w-10 h-10' : 'w-14 h-14 md:w-16 md:h-16'
  const imgSize = size === 'sm' ? 24 : 36

  if (comparison.competitorLogo) {
    return (
      <div className={`${dimensions} rounded-xl border border-[#e5e5e5] bg-white flex items-center justify-center shadow-[rgba(23,23,23,0.04)_0px_4px_4px_0px] overflow-hidden p-2`}>
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
      <div className={`${dimensions} rounded-xl border border-[#e5e5e5] bg-white flex items-center justify-center shadow-[rgba(23,23,23,0.04)_0px_4px_4px_0px] overflow-hidden p-2`}>
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
    <div className="border-b border-[#e5e5e5] last:border-b-0">
      <button onClick={onToggle} className="w-full py-5 flex items-center justify-between text-left group">
        <span className="text-base font-medium text-[#171717] pr-4 md:pr-8 group-hover:text-gray-600 transition-colors">
          {question}
        </span>
        <div className={`w-8 h-8 rounded-full bg-[#fafafa] border border-[#e5e5e5] flex items-center justify-center flex-shrink-0 transition-all duration-200 ${isOpen ? 'bg-[#171717] border-[#171717]' : ''}`}>
          <ChevronDown className={`w-4 h-4 transition-all duration-200 ${isOpen ? 'rotate-180 text-white' : 'text-gray-500'}`} />
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
            <p className="pb-5 text-[#737373] text-sm leading-relaxed pr-12">{answer}</p>
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
            <SectionLabel centered>Comparison</SectionLabel>

            {/* Logos */}
            <div className="flex items-center justify-center gap-4 md:gap-6 my-8">
              <YanderLogo />
              <span className="text-sm font-medium text-gray-400">vs</span>
              <CompetitorLogo comparison={comparison} />
            </div>

            <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl text-[#171717] tracking-[-0.02em] leading-tight">
              {comparison.headline}
            </h1>
            <p className="mt-4 text-base md:text-lg text-[#737373] max-w-2xl mx-auto">
              {comparison.heroDescription}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://app.yander.ai/sign-up?plan=starter&billing=monthly"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#171717] text-white rounded-[6px] font-medium text-sm hover:bg-gray-800 transition-colors group"
              >
                Try Yander Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={openDemoModal}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#171717] rounded-[6px] font-medium text-sm border border-[#e5e5e5] hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                Book a Demo
              </button>
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
              className="bg-white rounded-[12px] border border-[#e5e5e5] shadow-[rgba(0,0,0,0.04)_0px_1px_2px_0px] p-6 md:p-8"
            >
              <div className="mb-4">
                <YanderLogo size="sm" />
              </div>
              <h3 className="font-semibold text-lg text-[#171717] mb-2">Yander</h3>
              <p className="text-sm text-[#737373] leading-relaxed">{comparison.yanderSummary}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-[12px] border border-[#e5e5e5] shadow-[rgba(0,0,0,0.04)_0px_1px_2px_0px] p-6 md:p-8"
            >
                <div className="mb-4">
                <CompetitorLogo comparison={comparison} size="sm" />
              </div>
              <h3 className="font-semibold text-lg text-[#171717] mb-2">{comparison.competitorName}</h3>
              <p className="text-sm text-[#737373] leading-relaxed">{comparison.competitorSummary}</p>
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
                  <p className="text-2xl md:text-3xl font-semibold text-[#171717]">{stat.value}</p>
                  <p className="text-sm text-[#737373] mt-1">{stat.label}</p>
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
              <SectionLabel number="01" centered>Feature Comparison</SectionLabel>
              <h2 className="font-semibold text-2xl md:text-3xl text-[#171717] tracking-[-0.02em]">
                How they compare
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto overflow-hidden rounded-[12px] border border-[#e5e5e5] shadow-[rgba(0,0,0,0.04)_0px_1px_2px_0px]"
            >
              {/* Table Header */}
              <div className="grid grid-cols-3 bg-[#fafafa] border-b border-[#e5e5e5]">
                <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide px-4 md:px-6 py-3">
                  Feature
                </div>
                <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide px-4 md:px-6 py-3">
                  Yander
                </div>
                <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide px-4 md:px-6 py-3">
                  {comparison.competitorName}
                </div>
              </div>

              {/* Table Body */}
              {comparison.featureRows.map((row, i) => (
                <div key={i} className="grid grid-cols-3 border-b border-[#f5f5f5] last:border-b-0 hover:bg-gray-50/50 transition-colors">
                  <div className="px-4 md:px-6 py-4">
                    <p className="text-sm font-medium text-[#171717]">{row.feature}</p>
                    {row.whyItMatters && (
                      <p className="text-xs text-[#a3a3a3] mt-1">{row.whyItMatters}</p>
                    )}
                  </div>
                  <div className="px-4 md:px-6 py-4 flex items-start">
                    <p className="text-sm text-[#525252]">{row.yander}</p>
                  </div>
                  <div className="px-4 md:px-6 py-4 flex items-start">
                    <p className="text-sm text-[#525252]">{row.competitor}</p>
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
              <SectionLabel number="02" centered>Decision Framework</SectionLabel>
              <h2 className="font-semibold text-2xl md:text-3xl text-[#171717] tracking-[-0.02em]">
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
                  className="bg-white rounded-[12px] border border-[#e5e5e5] shadow-[rgba(0,0,0,0.04)_0px_1px_2px_0px] p-6 md:p-8"
                >
                  <h3 className="font-semibold text-lg text-[#171717] mb-6">Choose Yander if you...</h3>
                  <ul className="space-y-3">
                    {comparison.chooseYander.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-emerald-500" />
                        </div>
                        <span className="text-sm text-[#525252] leading-relaxed">{item}</span>
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
                  className="bg-white rounded-[12px] border border-[#e5e5e5] shadow-[rgba(0,0,0,0.04)_0px_1px_2px_0px] p-6 md:p-8"
                >
                  <h3 className="font-semibold text-lg text-[#171717] mb-6">Choose {comparison.competitorName} if you...</h3>
                  <ul className="space-y-3">
                    {comparison.chooseCompetitor.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-gray-400" />
                        </div>
                        <span className="text-sm text-[#525252] leading-relaxed">{item}</span>
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
                className="mt-8 max-w-3xl mx-auto bg-white rounded-[12px] border border-[#e5e5e5] shadow-[rgba(0,0,0,0.04)_0px_1px_2px_0px] p-6 md:p-8"
              >
                <h3 className="font-semibold text-base text-[#171717] mb-3">The bottom line</h3>
                <p className="text-sm text-[#737373] leading-relaxed">{comparison.verdict}</p>
              </motion.div>
            )}
          </Container>
        </section>
      )}

      {/* Testimonial */}
      {comparison.testimonial?.quote && (
        <section className="py-16 md:py-20 bg-white border-b border-[#e5e5e5]">
          <Container size="narrow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <blockquote className="font-serif text-xl md:text-2xl text-[#171717] leading-relaxed italic">
                &ldquo;{comparison.testimonial.quote}&rdquo;
              </blockquote>
              {comparison.testimonial.name && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-[#171717]">{comparison.testimonial.name}</p>
                  {(comparison.testimonial.role || comparison.testimonial.company) && (
                    <p className="text-sm text-[#737373]">
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
        <section className="py-16 md:py-24 bg-[#fafafa] border-b border-[#e5e5e5]">
          <Container>
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <SectionLabel number="03" centered>FAQ</SectionLabel>
                <h2 className="font-semibold text-2xl md:text-3xl text-[#171717] tracking-[-0.02em]">
                  Frequently asked questions
                </h2>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-[16px] border border-[#e5e5e5] shadow-[rgba(23,23,23,0.04)_0px_4px_4px_0px] px-6 md:px-8"
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

      {/* CTA */}
      <section className="py-20 md:py-28 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#171717] via-[#1f1f1f] to-[#171717] p-6 sm:p-8 md:p-12 lg:p-16"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-amber-500/10 to-rose-500/10 rounded-full blur-3xl" />
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }} />

            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 mb-6">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-white/80">Ready to switch?</span>
                </div>
                <h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl text-white tracking-[-0.02em] leading-tight">
                  See why teams choose Yander over {comparison.competitorName}
                </h2>
                <p className="mt-4 text-base md:text-lg text-white/60 max-w-xl">
                  Start your free trial today. No credit card required. Set up your first hiring pipeline in minutes.
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full sm:w-auto">
                <a
                  href="https://app.yander.ai/sign-up?plan=starter&billing=monthly"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 rounded-[8px] font-medium text-base hover:bg-gray-100 transition-colors group"
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <button
                  onClick={openDemoModal}
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 text-white rounded-[8px] font-medium text-base hover:bg-white/20 transition-colors border border-white/10"
                >
                  Book a Demo
                </button>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  )
}
