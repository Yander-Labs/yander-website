"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../ui/Container";
import { ChevronDown } from "lucide-react";
import { useDemoModal } from "../ui/DemoModal";

const faqs = [
  {
    question: "What counts as a sourced candidate?",
    answer:
      "Each new person the AI surfaces and qualifies for one of your open roles counts as one sourced candidate. Re-surfacing the same person for a different role does not double-count.",
  },
  {
    question: "What happens if I hit my monthly limit on Pro?",
    answer:
      "Sourcing pauses for the rest of the billing cycle until your next reset, or you can upgrade to Max for unlimited sourcing at any time. Pro-rated billing applies.",
  },
  {
    question: "Do unused candidates roll over?",
    answer:
      "No. The monthly count resets each billing cycle so you always start fresh.",
  },
  {
    question: "Can I change plans at any time?",
    answer:
      "Yes. Upgrade or downgrade whenever you need. Changes take effect immediately and billing is pro-rated.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "The Free plan is the trial — your first 200 sourced candidates are included with no time limit. Move to Pro or Max whenever you need more volume.",
  },
  {
    question: "Do you charge placement fees?",
    answer:
      "No. Yander never charges per-hire or per-placement fees. The plan price is the total cost.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. There are no contracts. Cancel anytime and you'll keep access until the end of your billing period.",
  },
];

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
            className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start relative"
          >
            {/* Vertical rhythm rail */}
            <div
              className="hidden lg:block absolute -left-6 top-0 bottom-0 w-px bg-gray-100"
              aria-hidden="true"
            />
            <p className="text-[11px] font-medium text-gray-500 uppercase tracking-[0.22em] mb-6">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a0a0a] tracking-[-0.02em] leading-[1.1]">
              Questions?
            </h2>
            <div className="mt-6 h-px w-12 bg-[#0a0a0a]" aria-hidden="true" />
            <p className="mt-6 text-sm text-gray-500 leading-relaxed max-w-xs">
              Everything you need to know about Yander Recruiter pricing. Want
              to see it in action?
            </p>
            <button
              onClick={openDemoModal}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#0a0a0a] hover:opacity-60 transition-opacity group"
            >
              <span>Book a demo</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-150 group-hover:translate-x-0.5"
              >
                →
              </span>
            </button>
          </motion.div>

          {/* Right: accordion (8/12) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-8"
          >
            {faqs.map((faq, index) => (
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
