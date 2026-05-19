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
      {/* ── Section 1: Hero — homepage canon: white bg, font-geist headline, Eyebrow primitive ── */}
      <section className="relative pt-24 pb-6 md:pt-28 md:pb-8 overflow-hidden bg-white">
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
          <AnimatedSection className="relative text-center max-w-5xl mx-auto">
            <div className="mb-5 flex justify-center">
              <Eyebrow>Pricing</Eyebrow>
            </div>
            <h1 className="font-geist font-bold text-3xl md:text-4xl lg:text-5xl text-[var(--color-ink-primary)] tracking-tight leading-[1.1] lg:whitespace-nowrap">
              Clear pricing for your recruiting needs.
            </h1>
            <p className="mt-5 text-xs text-[var(--color-ink-disabled)]">
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
