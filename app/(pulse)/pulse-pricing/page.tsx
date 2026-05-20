import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PricingCards } from "@/components/sections/PricingCards";
import { PricingComparison } from "@/components/sections/PricingComparison";
import { PricingFAQ } from "@/components/sections/PricingFAQ";
import { pulsePricingFaqs } from "@/lib/faqs";
import { SchemaJsonLd, faqSchema } from "@/components/seo/SchemaJsonLd";
import { pageMetadata } from "@/lib/page-metadata";
import { SITE_URL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Yander Pulse Pricing — Workforce Analytics from $29 / Seat",
  description:
    "Transparent per-seat pricing for Yander Pulse — 14-day free trial on Starter, scaling tiers for growing teams, Enterprise SSO. No long-term contracts.",
  path: "/pulse-pricing",
  ogImageAlt: "Yander Pulse Pricing",
});

const pulsePricingProductSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Yander Pulse",
  description: "Workforce analytics for remote teams. Per-seat pricing.",
  brand: { "@type": "Brand", name: "Yander" },
  url: `${SITE_URL}/pulse-pricing`,
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "29",
    highPrice: "99",
    offerCount: "3",
    url: `${SITE_URL}/pulse-pricing`,
    availability: "https://schema.org/InStock",
  },
};

const trustedCompanies = [
  { name: "Montblanc", logo: "/logos/imgi_14_Montblanc_1765364669732-CO9W13yj.png" },
  { name: "Loudface", logo: "/logos/loudface-logo.png" },
  { name: "Hayes Media", logo: "/logos/hayes-media-logo.png", className: "h-7 md:h-8 w-auto object-contain" },
  { name: "Seamless.AI", logo: "/logos/imgi_12_Seamless_AI_Logo_1_1765364669732-CEQ3A-Wa.png" },
  { name: "Radisson Hotels", logo: "/logos/imgi_13_Radisson_Hotel_idRe5QavwV_0_1_1765364669732-R3ZAbgZj.png" },
];

export default function PricingPage() {
  return (
    <>
      <SchemaJsonLd schema={pulsePricingProductSchema} />
      <SchemaJsonLd schema={faqSchema(pulsePricingFaqs)} />
      {/* Hero — homepage canon: font-geist headline, Eyebrow primitive */}
      <section className="pt-28 pb-6 md:pt-32 md:pb-8">
        <Container>
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <div className="mb-4 flex justify-center">
              <Eyebrow>Pulse Pricing</Eyebrow>
            </div>
            <h1 className="font-medium text-3xl md:text-4xl lg:text-5xl text-[var(--color-ink-primary)] tracking-tight leading-[1.05]">
              One dashboard for your team's performance
            </h1>
          </AnimatedSection>
        </Container>
      </section>

      {/* Trusted By */}
      <section className="hidden md:block pb-6 md:pb-8">
        <Container>
          <AnimatedSection>
            <p className="text-center text-[10px] text-[var(--color-ink-secondary)] uppercase tracking-[0.22em] font-[var(--font-geist-mono)] mb-6">
              Trusted by teams behind
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-10">
              {trustedCompanies.map((company) => (
                <div
                  key={company.name}
                  className="opacity-80 hover:opacity-100 transition-opacity duration-200"
                >
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={120}
                    height={24}
                    className={company.className || "h-4 md:h-5 w-auto object-contain"}
                  />
                </div>
              ))}
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Pricing Cards with Toggle */}
      <PricingCards />

      {/* Feature Comparison */}
      <PricingComparison />

      {/* FAQ */}
      <PricingFAQ />
    </>
  );
}
