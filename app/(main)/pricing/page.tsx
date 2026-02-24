import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { PricingCards } from "@/components/sections/PricingCards";
import { PricingComparison } from "@/components/sections/PricingComparison";
import { PricingFAQ } from "@/components/sections/PricingFAQ";

export const metadata: Metadata = {
  title: "Pricing | Yander",
  description:
    "Simple, transparent pricing for remote team intelligence. Start with a 14-day free trial on our Starter plan.",
  alternates: {
    canonical: "https://yander.io/pricing",
  },
  robots: "index, follow",
  openGraph: {
    title: "Pricing | Yander",
    description:
      "Simple, transparent pricing for remote team intelligence. Start with a 14-day free trial on our Starter plan.",
    url: "https://yander.io/pricing",
    siteName: "Yander",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | Yander",
    description:
      "Simple, transparent pricing for remote team intelligence. Start with a 14-day free trial on our Starter plan.",
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
      {/* Hero */}
      <section className="pt-28 pb-6 md:pt-32 md:pb-8">
        <Container>
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-[-0.02em]">
              One dashboard for your team and client performance
            </h1>
          </AnimatedSection>
        </Container>
      </section>

      {/* Trusted By */}
      <section className="hidden md:block pb-6 md:pb-8">
        <Container>
          <AnimatedSection>
            <p className="text-center text-[10px] text-gray-600 uppercase tracking-[0.15em] mb-6">
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
