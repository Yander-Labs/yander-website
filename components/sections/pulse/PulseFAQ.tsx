"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ChevronDown } from "lucide-react";
import { pulseFaqs } from "@/lib/faqs";

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
    <div className="border-b border-[rgba(0,0,0,0.06)] last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className="text-base font-medium text-[#171717] pr-4 md:pr-8 group-hover:text-[#171717]/60 transition-colors">
          {question}
        </span>
        <div
          className={`w-8 h-8 rounded-full bg-[#fafaf9] border border-[rgba(0,0,0,0.06)] flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
            isOpen ? "bg-[#171717] border-[#171717]" : ""
          }`}
        >
          <ChevronDown
            className={`w-4 h-4 transition-all duration-200 ${
              isOpen ? "rotate-180 text-white" : "text-[#171717]/50"
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
            <p className="pb-5 text-[#171717]/60 text-sm leading-relaxed pr-12">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function PulseFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28 bg-[#fafaf9] border-t border-[rgba(0,0,0,0.06)]">
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <SectionLabel number="06" centered>
              FAQ
            </SectionLabel>
            <h2 className="font-medium text-3xl md:text-4xl text-[#171717] tracking-[-0.02em]">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-base text-[#171717]/60">
              Everything you need to know about Yander
            </p>
          </div>

          {/* FAQ List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl border border-[rgba(0,0,0,0.06)] shadow-[rgba(23,23,23,0.04)_0px_4px_4px_0px] px-6 md:px-8"
          >
            {pulseFaqs.map((faq, index) => (
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

          {/* Still have questions */}
          <div className="mt-8 text-center">
            <p className="text-sm text-[#171717]/60">
              Still have questions?{" "}
              <a
                href="mailto:jordan@yanderlabs.com"
                className="text-[#171717] font-medium hover:underline"
              >
                Reach out to our team
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
