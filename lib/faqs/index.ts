// Single source of truth for FAQ content. Plain TS file (no "use client")
// so server components can import for FAQPage schema while client FAQ
// components import for rendering.

export interface FAQ {
  question: string;
  answer: string;
}

export const homepageFaqs: FAQ[] = [
  {
    question: "Why use Yander to hire?",
    answer:
      "Yander is AI sourcing software. Our agent surfaces qualified candidates outside your inbound and network, helps you evaluate them with structured assessments, and gets you interview-ready people in days. Used by hiring teams and recruiters alike. Start free with your first 200 candidates — paid plans from $89/month.",
  },
  {
    question: "What countries do you source from?",
    answer:
      "We source candidates worldwide — including the US, Canada, UK, Australia, South America, Europe, South Africa, and Southeast Asia. Whether you want premium native-English expertise or cost-effective talent (where you can save 40-70% versus US rates), our AI surfaces strong candidates wherever they are.",
  },
  {
    question: "How does the AI matching work?",
    answer:
      "You provide a job description or build one with Yander. Our AI agent searches talent pools for candidates who match on technical skills, experience, and company culture. Each candidate is assessed through skills tests and personality evaluations before being presented to you.",
  },
  {
    question: "What does culture-fit assessment include?",
    answer:
      "Personality assessments evaluating remote work readiness, communication style, self-management, and collaboration preferences. The people you interview aren't just technically qualified. They'll work well with your team.",
  },
  {
    question: "Can I send my own candidates through Yander?",
    answer:
      "Yes. Send candidates to a Yander assessment form where they'll complete structured evaluations. Ideal if you're getting inbound applicants and want organized, comparable profiles to review.",
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
      "Yes. Get started free with your first 200 sourced candidates — no credit card required. Paid plans start at $89/month.",
  },
];

export const recruiterFaqs: FAQ[] = [
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

export const pulsePricingFaqs: FAQ[] = [
  {
    question: "What counts as an employee?",
    answer:
      "Each employee you track in Yander counts as one seat toward your plan limit.",
  },
  {
    question: "Can I change plans at any time?",
    answer:
      "Yes. Upgrade or downgrade anytime. Changes take effect immediately, and billing adjusts pro-rata.",
  },
  {
    question: "What happens after my 14-day trial?",
    answer:
      "The 14-day free trial is available on the Starter plan only. After your trial ends, you'll be prompted to choose a plan. If you don't, your account pauses — no surprise charges.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards and can arrange invoicing for Enterprise plans.",
  },
  {
    question: "Is there a setup fee?",
    answer: "No. All plans include free onboarding and setup support.",
  },
  {
    question: "Can I add more employees beyond my plan limit?",
    answer:
      "Yes. Additional employees are billed at the extra employee rate for your plan tier.",
  },
  {
    question: "What's included in the Enterprise plan?",
    answer:
      "Custom scoring cadence, negotiated per-employee pricing, dedicated support, SSO, and a tailored onboarding experience. Contact sales to discuss your needs.",
  },
];

export const pulseFaqs: FAQ[] = [
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
