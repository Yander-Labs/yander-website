'use client'

import { AnimatedSection } from '../ui/AnimatedSection'
import { Container } from '../ui/Container'

interface BlogHeroProps {
  title?: string
  subtitle?: string
}

export function BlogHero({
  title = 'Blog',
  subtitle = 'Insights on remote work, team productivity, and building better workplace culture.'
}: BlogHeroProps) {
  return (
    <section className="pt-32 pb-12 bg-gray-50/50 border-b border-[#E4E7EC]">
      <Container>
        <AnimatedSection className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E4E7EC] shadow-subtle mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-gray-600">Latest insights</span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4">
            {title}
          </h1>

          <p className="text-base text-gray-500 leading-relaxed">
            {subtitle}
          </p>
        </AnimatedSection>
      </Container>
    </section>
  )
}
