"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../ui/Container";
import { ChevronDown } from "lucide-react";
import { homepageFaqs } from "@/lib/faqs";

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
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-base font-medium text-[#0a0a0a] pr-8 group-hover:text-gray-600 transition-colors">
          {question}
        </span>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
            isOpen ? "bg-[#0a0a0a] shadow-subtle" : "bg-[#fafafa] border border-gray-200"
          }`}
        >
          <ChevronDown
            className={`w-4 h-4 transition-all duration-200 ${
              isOpen ? "rotate-180 text-white" : "text-gray-400"
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
            <p className="pb-6 text-gray-500 text-sm leading-relaxed pr-12 max-w-2xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-24 md:py-32 bg-[#fafafa] overflow-hidden">

      <Container>
        <div className="relative max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="text-xs font-mono text-gray-300 tracking-wider">[07]</span>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-[0.15em]">FAQ</span>
              </div>
              <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-[#0a0a0a] tracking-[-0.02em]">
                Your questions, answered.
              </h2>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-none border border-gray-200/60 shadow-soft-lg px-6 md:px-8"
          >
            {homepageFaqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </motion.div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Still have questions?{" "}
              <a href="mailto:jordan@yanderlabs.com" className="text-[#0a0a0a] font-medium hover:underline">
                Get in touch
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
