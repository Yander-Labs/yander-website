import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RecruiterPricingCards } from "@/components/sections/RecruiterPricingCards";
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
      {/* ── Section 1: Hero — homepage canon: hero scale, font-geist, generous breathing room ── */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden bg-white">
        {/* Subtle vertical rhythm lines on edges (signature component) */}
        <div
          className="absolute inset-y-0 left-8 w-px bg-[var(--color-border-canon-subtle)] hidden lg:block pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 right-8 w-px bg-[var(--color-border-canon-subtle)] hidden lg:block pointer-events-none"
          aria-hidden="true"
        />

        <Container>
          <AnimatedSection className="relative text-center max-w-4xl mx-auto">
            <div className="mb-6 flex justify-center">
              <Eyebrow number="01">Pricing</Eyebrow>
            </div>
            {/* Hero-scale headline — matches V2HomePage line 343 */}
            <h1 className="font-geist font-bold text-[40px] sm:text-5xl md:text-6xl lg:text-[64px] text-[var(--color-ink-primary)] tracking-tight leading-[1.05]">
              Clear pricing for your<br className="hidden md:inline" /> recruiting needs.
            </h1>
            {/* Substantive subhead — homepage hero rhythm */}
            <p className="mt-6 text-lg md:text-xl text-[var(--color-ink-secondary)] max-w-2xl mx-auto leading-relaxed">
              Pay monthly or annually. No placement fees, no contracts, cancel
              anytime. Start free and only pay when you&apos;re actively hiring.
            </p>
            <p className="mt-8 text-xs text-[var(--color-ink-disabled)]">
              Looking for{" "}
              <Link
                href="/pulse-pricing"
                className="text-[var(--color-ink-muted)] underline underline-offset-2 hover:text-[var(--color-ink-primary)] transition-colors"
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

      {/* ── Section 3 (NEW): Proof / Why this beats an agency ── */}
      <RecruiterPricingProof />

      {/* ── Section 4: FAQ ── */}
      <RecruiterPricingFAQ />

      {/* ── Section 5 (NEW): Closing CTA ── */}
      <RecruiterPricingClosingCTA />
    </>
  );
}
