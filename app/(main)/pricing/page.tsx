import Link from "next/link";
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
      {/* ── Hero — /yander-interfere DNA: asymmetric 2-col + rainbow gradient wash + Inter Medium ── */}
      <section className="relative overflow-hidden bg-white text-[#171717]" style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif", fontWeight: 500, letterSpacing: "-0.011em" }}>
        {/* Top gradient wash · same recipe as /yander-interfere's TopGradientWash */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-0 overflow-hidden"
          style={{ height: "900px" }}
          aria-hidden
        >
          {/* Warm cream tint */}
          <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-[#fefaf6] from-50% to-transparent" />
          {/* Signature rainbow bar — orange → pink → purple → blue at 20%, 50px blur */}
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded-[300px]"
            style={{
              top: "440px",
              width: "1700px",
              height: "560px",
              backgroundImage:
                "linear-gradient(90deg, rgba(255,59,0,0.20) 0%, rgba(246,0,157,0.20) 38%, rgba(151,62,198,0.20) 71%, rgba(0,142,255,0.20) 100%)",
              filter: "blur(50px)",
            }}
          />
          {/* Fade-to-white at the bottom */}
          <div className="absolute inset-x-0 bottom-0 h-[120px] bg-gradient-to-b from-transparent to-white" />
        </div>

        <div className="relative mx-auto max-w-[1240px] px-6 pt-24 pb-10 lg:pt-32 lg:pb-14">
          <div className="grid items-end gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
            <h1 className="font-medium leading-[1] tracking-[-0.025em] text-[#171717] text-[clamp(2.25rem,5vw,3.25rem)]">
              Clear pricing for your{" "}
              <span className="text-[1.08em]">recruiting needs.</span>
            </h1>
            <div className="flex flex-col items-start gap-6 lg:items-end">
              <p className="max-w-md text-[15px] leading-relaxed text-[#171717]/60 lg:text-right">
                Free to start. Paid plans from $89/mo. No placement fees, no
                contracts, cancel anytime.
              </p>
              <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                <Link
                  href="/pulse-pricing"
                  className="inline-flex h-10 items-center rounded-md border border-[rgba(0,0,0,0.08)] bg-white px-6 text-[13.5px] font-medium text-[#171717] transition-colors hover:border-[#171717]/30"
                >
                  Yander Pulse pricing
                </Link>
                <a
                  href="https://app.yander.ai/sign-up?plan=free&product=recruiter"
                  className="inline-flex h-10 items-center rounded-md bg-[#171717] px-6 text-[13.5px] font-medium text-white transition-colors hover:bg-black"
                >
                  Get started free
                </a>
              </div>
            </div>
          </div>
        </div>
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
