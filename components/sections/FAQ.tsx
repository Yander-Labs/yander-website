"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../ui/Container";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How is Yander different from a recruitment agency?",
    answer:
      "Agencies charge 15-25% of annual salary per placement and rely on manual sourcing. Yander is software. Our AI agent does the sourcing, screening, and culture-fit assessment automatically. Plans start from $500/month regardless of how many roles you fill.",
  },
  {
    question: "What regions do you source from?",
    answer:
      "South America (Brazil, Colombia, Argentina), South Africa, and Southeast Asia (India, Philippines). These regions offer world-class talent at 40-70% less than US rates.",
  },
  {
    question: "How does the AI matching work?",
    answer:
      "You provide a job description or build one with Yander. Our AI agent searches talent pools for candidates who match on technical skills, experience, and company culture. Each candidate is assessed through skills tests and personality evaluations before being presented to you.",
  },
  {
    question: "What does culture-fit screening include?",
    answer:
      "Personality assessments evaluating remote work readiness, communication style, self-management, and collaboration preferences. The people you interview aren't just technically qualified. They'll work well with your team.",
  },
  {
    question: "Can I send my own candidates through Yander?",
    answer:
      "Yes. Send candidates to a Yander screening form where they'll complete personality tests and qualification checks automatically. Ideal if you're getting inbound applicants and want to filter them without manual effort.",
  },
  {
    question: "How fast do I get candidates?",
    answer:
      "Most roles have interview-ready candidates within days. The AI agent works continuously. No waiting on a recruiter's schedule.",
  },
  {
    question: "What is Yander Pulse?",
    answer:
      "An optional add-on for retention. It tracks engagement, sentiment, and workload across your remote team, giving you early warnings before problems become resignations. Think of it as an HR assistant for the team you built with Yander.",
  },
  {
    question: "Is Yander available now?",
    answer:
      "We're in development and accepting early access signups. Join the waitlist to be first in line when we launch.",
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
            {faqs.map((faq, index) => (
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
