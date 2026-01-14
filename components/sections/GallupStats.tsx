"use client";

import { AnimatedSection } from "../ui/AnimatedSection";
import { Container } from "../ui/Container";
import { ExternalLink } from "lucide-react";

export function GallupStats() {
  return (
    <section className="py-20 md:py-28 bg-gray-950 text-white">
      <Container size="narrow">
        <AnimatedSection className="text-center">
          <div className="inline-flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wider mb-8">
            <span className="font-medium text-gray-400">Gallup</span>
            <span className="text-gray-600">|</span>
            <span>Global leader in workplace research</span>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-8 leading-tight">
            Employee disengagement is a{" "}
            <span className="text-amber-400">
              trillion-dollar
            </span>{" "}
            cost.
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-6 leading-relaxed">
            Gallup estimates that voluntary turnover alone costs U.S. businesses
            nearly <span className="text-white font-medium">$1 trillion</span>{" "}
            every year, and low employee engagement drains hundreds of billions
            more in lost productivity worldwide.
          </p>

          <p className="text-gray-500 text-base mb-10 max-w-xl mx-auto">
            Most companies only see these costs after the damage is done – in
            missed targets, delayed projects, and surprise resignations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-xs">
            <a
              href="https://www.gallup.com/workplace/247391/fixable-problem-costs-businesses-trillion.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-300 transition-colors duration-150"
            >
              <ExternalLink className="w-3 h-3" />
              Source: Gallup - $1 trillion turnover cost
            </a>
            <a
              href="https://www.gallup.com/workplace/349484/state-of-the-global-workplace.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-300 transition-colors duration-150"
            >
              <ExternalLink className="w-3 h-3" />
              Source: Gallup - State of the Global Workplace
            </a>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
