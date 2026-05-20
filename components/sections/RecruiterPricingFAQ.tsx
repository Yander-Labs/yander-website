"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../ui/Container";
import { TrackedButton } from "../ui/TrackedButton";
import { ChevronDown } from "lucide-react";
import { useDemoModal } from "../ui/DemoModal";
import { recruiterFaqs } from "@/lib/faqs";

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[var(--color-border-canon)] last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className="text-[15px] font-medium text-[#171717] pr-4 md:pr-8 group-hover:text-[#171717]/70 transition-colors">
          {question}
        </span>
        <div
          className={`w-8 h-8 rounded-md bg-[var(--color-surface-subtle)] border border-[var(--color-border-canon)] flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
            isOpen ? "bg-[var(--color-ink-primary)] border-[var(--color-ink-primary)]" : ""
          }`}
        >
          <ChevronDown
            className={`w-4 h-4 transition-all duration-200 ${
              isOpen ? "rotate-180 text-white" : "text-[var(--color-ink-muted)]"
            }`}
          />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[14px] text-[#171717]/60 leading-[1.6] pr-12">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function RecruiterPricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { openModal: openDemoModal } = useDemoModal();

  return (
    <section className="relative py-24 md:py-32 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Left rail (sticky): editorial label + heading + contact */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start"
          >
            <p className="text-[11px] font-[var(--font-geist-mono)] text-[#171717]/40 uppercase tracking-[0.18em] mb-6">
              FAQ
            </p>
            <h2 className="font-medium text-[#171717] text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.05] tracking-[-0.025em]">
              Questions?
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-[#171717]/60 max-w-xs">
              Everything you need to know about Yander Recruiter pricing. Want
              to see it in action?
            </p>
            <TrackedButton
              ctaId="recruiter_faq_book_demo"
              ctaLocation="recruiter_pricing_faq"
              ctaDestination="demo_modal"
              ctaVariant="link"
              onClick={openDemoModal}
              className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#171717] hover:opacity-60 transition-opacity group"
            >
              <span>Book a demo</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-150 group-hover:translate-x-0.5"
              >
                →
              </span>
            </TrackedButton>
          </motion.div>

          {/* Right: accordion (8/12) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-8"
          >
            {recruiterFaqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
