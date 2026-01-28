"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "../ui/AnimatedSection";
import { Container } from "../ui/Container";
import { CheckCircle } from "lucide-react";

export function ProblemStatement() {
  return (
    <section className="py-16 md:py-24 bg-[#fafafa]">
      <Container>
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="bg-[#1a1a1a] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 items-center"
            >
              {/* Gallup Logo Card */}
              <div className="flex-shrink-0">
                <div className="bg-[#2a2a2a] rounded-xl p-6 md:p-8 relative text-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logos/gallup.svg"
                    alt="Gallup"
                    className="h-auto w-full max-w-[180px] md:max-w-[160px] mx-auto mb-2 invert brightness-200"
                  />
                  <p className="text-xs text-gray-400">
                    Global leader in workplace research.
                  </p>
                  <div className="absolute -bottom-3 -right-3 w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-white leading-tight mb-4">
                  Employee disengagement is a trillion-dollar cost.
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Gallup estimates that voluntary turnover alone costs U.S. businesses nearly{" "}
                  <strong className="text-white">$1 trillion every year</strong>, and low employee
                  engagement drains hundreds of billions more in lost productivity worldwide.
                </p>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Most companies only see these costs after the damage is done — in missed targets,
                  delayed projects, and surprise resignations.
                </p>
                <div className="space-y-1 text-xs text-gray-500">
                  <p>
                    Source:{" "}
                    <a
                      href="https://www.gallup.com/workplace/247391/fixable-problem-costs-businesses-trillion.aspx"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-gray-400 transition-colors"
                    >
                      Gallup - $1 trillion employee turnover cost
                    </a>
                  </p>
                  <p>
                    Source:{" "}
                    <a
                      href="https://www.gallup.com/workplace/349484/state-of-the-global-workplace.aspx"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-gray-400 transition-colors"
                    >
                      Gallup - State of the Global Workplace (Employee disengagement)
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
