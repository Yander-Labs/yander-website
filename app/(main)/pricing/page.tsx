import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { RecruiterPricingCards } from "@/components/sections/RecruiterPricingCards";
import { RecruiterPricingProof } from "@/components/sections/RecruiterPricingProof";
import { RecruiterPricingFAQ } from "@/components/sections/RecruiterPricingFAQ";
import { RecruiterPricingClosingCTA } from "@/components/sections/RecruiterPricingClosingCTA";

export const metadata: Metadata = {
  title: "Pricing | Yander",
  description:
    "Clear pricing for your recruiting needs. Free plan, $89/mo Pro, $249/mo Max. No placement fees, ever.",
  alternates: {
    canonical: "https://yander.ai/pricing",
  },
  robots: "index, follow",
  openGraph: {
    title: "Pricing | Yander",
    description:
      "Clear pricing for your recruiting needs. Free plan, $89/mo Pro, $249/mo Max. No placement fees, ever.",
    url: "https://yander.ai/pricing",
    siteName: "Yander",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | Yander",
    description:
      "Clear pricing for your recruiting needs. Free plan, $89/mo Pro, $249/mo Max. No placement fees, ever.",
  },
};

export default function PricingPage() {
  return (
    <>
      {/* ── Section 1: Hero ── */}
      <section className="relative pt-24 pb-6 md:pt-28 md:pb-8 overflow-hidden bg-[#fafaf7]">
        {/* Tonal gradient (cream → white) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fafaf7] via-white to-white pointer-events-none" />
        {/* Subtle vertical rhythm lines on edges (signature component) */}
        <div
          className="absolute inset-y-0 left-8 w-px bg-gray-100 hidden lg:block pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 right-8 w-px bg-gray-100 hidden lg:block pointer-events-none"
          aria-hidden="true"
        />

        <Container>
          <AnimatedSection className="relative text-center max-w-5xl mx-auto">
            <p className="text-[11px] font-medium text-gray-500 uppercase tracking-[0.22em] mb-5">
              Pricing
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-[-0.02em] leading-[1.1] lg:whitespace-nowrap">
              Clear pricing for your recruiting needs.
            </h1>
          </AnimatedSection>
        </Container>
      </section>

      {/* ── Section 2: Pricing cards ── */}
      <RecruiterPricingCards />

      {/* ── Section 3 (NEW): Proof / Why this beats an agency ── */}
      <RecruiterPricingProof />

      {/* ── Section 4: FAQ ── */}
      <RecruiterPricingFAQ />

      {/* ── Section 5 (NEW): Closing CTA ── */}
      <RecruiterPricingClosingCTA />
    </>
  );
}
