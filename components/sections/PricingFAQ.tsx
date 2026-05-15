"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../ui/Container";
import { ChevronDown } from "lucide-react";
import { pulsePricingFaqs } from "@/lib/faqs";

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
    <div className="border-b border-[#e5e5e5] last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className="text-base font-medium text-[#171717] pr-4 md:pr-8 group-hover:text-gray-600 transition-colors">
          {question}
        </span>
        <div
          className={`w-8 h-8 rounded-full bg-[#fafafa] border border-[#e5e5e5] flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
            isOpen ? "bg-[#171717] border-[#171717]" : ""
          }`}
        >
          <ChevronDown
            className={`w-4 h-4 transition-all duration-200 ${
              isOpen ? "rotate-180 text-white" : "text-gray-500"
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
            <p className="pb-5 text-[#737373] text-sm leading-relaxed pr-12">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28 bg-[#fafafa] border-t border-[#e5e5e5]">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#171717] tracking-[-0.02em]">
              Questions & answers
            </h2>
            <p className="mt-4 text-base text-[#737373]">
              Everything you need to know about pricing
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[16px] border border-[#e5e5e5] shadow-[rgba(23,23,23,0.04)_0px_4px_4px_0px] px-6 md:px-8"
          >
            {pulsePricingFaqs.map((faq, index) => (
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

          <div className="mt-8 text-center">
            <p className="text-sm text-[#737373]">
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
