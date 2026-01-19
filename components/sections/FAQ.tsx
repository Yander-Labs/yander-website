"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../ui/Container";
import { SectionLabel } from "../ui/SectionLabel";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does Yander work without tracking keystrokes or screenshots?",
    answer:
      "Yander analyses aggregate patterns from tools your team already uses: Slack activity, emails, meeting attendance, response times, project management activity, and more. We never capture screenshots, log keystrokes, or monitor private messages. Instead, we look at patterns across the platforms your team already uses.",
  },
  {
    question: "What integrations does Yander support?",
    answer:
      "Yander integrates with Slack, Google Workspace (Gmail, Calendar, Meet), Microsoft 365 (Outlook, Teams, Calendar), Zoom, and project management tools like Notion, ClickUp, and Monday.com. Setup takes about 10 minutes. We're constantly adding new integrations based on customer feedback.",
  },
  {
    question: "How is Yander different from time-tracking software?",
    answer:
      "Time-tracking software monitors hours worked and specific activities. Yander focuses on engagement quality, not quantity. We help you understand if someone is thriving or struggling — not how many hours they logged. It's the difference between surveillance and insight.",
  },
  {
    question: "How quickly can I get started?",
    answer:
      "Most teams are fully set up in under 10 minutes. Connect your integrations, invite your team, and you'll start seeing initial insights within 24-48 hours as the system calibrates to your team's patterns. Full trend data typically appears after the first week.",
  },
  {
    question: "Is my team's data secure?",
    answer:
      "Absolutely. We're SOC 2 Type II compliant and use enterprise-grade encryption for all data at rest and in transit. We never sell data, and you can request complete data deletion at any time. Your team's privacy is our top priority.",
  },
  {
    question: "What size teams is Yander best for?",
    answer:
      "Yander works best for remote or hybrid teams of 5-500 people. Smaller teams benefit from the early warning signals and engagement tracking, while larger teams appreciate the ability to spot patterns across departments and identify at-risk employees before issues escalate.",
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
        <span className="text-base font-medium text-[#171717] pr-8 group-hover:text-gray-600 transition-colors">
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

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28 bg-[#fafafa] border-t border-[#e5e5e5]">
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <SectionLabel number="05" centered>
              FAQ
            </SectionLabel>
            <h2 className="font-serif text-3xl md:text-4xl text-[#171717] tracking-[-0.02em]">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-base text-[#737373]">
              Everything you need to know about Yander
            </p>
          </div>

          {/* FAQ List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[16px] border border-[#e5e5e5] shadow-[rgba(23,23,23,0.04)_0px_4px_4px_0px] px-6 md:px-8"
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

          {/* Still have questions */}
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
