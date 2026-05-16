import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { RecruiterPricingCards } from "@/components/sections/RecruiterPricingCards";
import { CaseStudyHayes } from "@/components/sections/CaseStudyHayes";
import { RecruiterPricingProof } from "@/components/sections/RecruiterPricingProof";
import { RecruiterPricingFAQ } from "@/components/sections/RecruiterPricingFAQ";
import { recruiterFaqs } from "@/lib/faqs";
import { RecruiterPricingClosingCTA } from "@/components/sections/RecruiterPricingClosingCTA";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaJsonLd, faqSchema } from "@/components/seo/SchemaJsonLd";
import { pageMetadata } from "@/lib/page-metadata";
import { SITE_URL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Yander Pricing — Free / $89 / $249 · No Placement Fees",
  description:
    "Transparent AI recruiting pricing: Free plan (200 candidates), Pro at $89/mo, Max at $249/mo, Enterprise custom. No placement fees, no contracts. Cancel anytime.",
  path: "/pricing",
  ogImageAlt: "Yander Pricing — Free / $89 / $249, No Placement Fees",
});

const pricingProductSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Yander AI Recruiter",
  description:
    "AI sourcing, vetting, and presentation of culture-matched global candidates. No placement fees.",
  brand: { "@type": "Brand", name: "Yander" },
  url: `${SITE_URL}/pricing`,
  offers: [
    {
      "@type": "Offer",
      name: "Free",
      description: "200 sourced candidates, no time limit.",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/pricing`,
    },
    {
      "@type": "Offer",
      name: "Pro",
      description: "AI sourcing, vetting, and shortlists — billed monthly. No placement fees.",
      price: "89",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "89",
        priceCurrency: "USD",
        unitText: "MONTH",
      },
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/pricing`,
    },
    {
      "@type": "Offer",
      name: "Max",
      description: "Unlimited sourcing for high-velocity teams. No placement fees.",
      price: "249",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "249",
        priceCurrency: "USD",
        unitText: "MONTH",
      },
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/pricing`,
    },
  ],
};

export default function PricingPage() {
  return (
    <>
      <SchemaJsonLd schema={pricingProductSchema} />
      <SchemaJsonLd schema={faqSchema(recruiterFaqs)} />
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
            <p className="mt-5 text-xs text-gray-400">
              Looking for{" "}
              <Link
                href="/pulse-pricing"
                className="text-gray-500 underline underline-offset-2 hover:text-gray-900 transition-colors"
              >
                Yander Pulse pricing
              </Link>
              ?
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* ── Section 2: Pricing cards ── */}
      <RecruiterPricingCards />

      {/* ── Section 2.5: Hayes Media case study ── */}
      <CaseStudyHayes />

      {/* ── Section 3 (NEW): Proof / Why this beats an agency ── */}
      <RecruiterPricingProof />

      {/* ── Section 4: FAQ ── */}
      <RecruiterPricingFAQ />

      {/* ── Section 5 (NEW): Closing CTA ── */}
      <RecruiterPricingClosingCTA />
    </>
  );
}
