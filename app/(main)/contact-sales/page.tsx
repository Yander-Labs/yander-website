import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactSalesForm } from "@/components/sections/ContactSalesForm";
import { Check } from "lucide-react";
import { SchemaJsonLd } from "@/components/seo/SchemaJsonLd";
import { pageMetadata } from "@/lib/page-metadata";
import { SITE_URL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact Yander Sales — Enterprise Pricing, Onboarding & SSO",
  description:
    "Talk to Yander sales about Enterprise pricing, custom onboarding, SSO, dedicated Slack support, and tailored scoring cadence for your agency or team.",
  path: "/contact-sales",
  ogImageAlt: "Contact Yander Sales",
});

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: `${SITE_URL}/contact-sales`,
  name: "Contact Yander Sales",
  description:
    "Get in touch with Yander's sales team for Enterprise pricing, onboarding, and dedicated support.",
  mainEntity: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "jordan@yanderlabs.com",
      availableLanguage: ["English"],
    },
  },
};

const benefits = [
  "Custom scoring cadence",
  "Negotiated per-entity pricing",
  "Unlimited integrations",
  "SSO & advanced security",
  "Dedicated Slack support",
  "Tailored onboarding experience",
];

export default function ContactSalesPage() {
  return (
    <section className="pt-28 pb-20 md:pt-32 md:pb-28">
      <SchemaJsonLd schema={contactPageSchema} />
      <Container>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left column */}
          <AnimatedSection>
            <h1 className="font-medium text-3xl md:text-4xl lg:text-5xl text-[var(--color-ink-primary)] tracking-tight leading-[1.05]">
              Talk to our sales team
            </h1>
            <p className="mt-4 text-base text-[var(--color-ink-secondary)] max-w-md">
              Get help with Enterprise pricing, schedule a demo, and explore how
              Yander fits your agency.
            </p>

            <div className="mt-10">
              <div className="mb-4">
                <Eyebrow>What&apos;s included in Enterprise</Eyebrow>
              </div>
              <ul className="space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[var(--color-accent-alive)] flex-shrink-0" />
                    <span className="text-sm text-[var(--color-ink-secondary)]">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 pt-8 border-t border-[var(--color-border-canon)]">
              <p className="text-sm text-[var(--color-ink-secondary)]">
                Not sure if Enterprise is right for you?{" "}
                <a
                  href="/pricing"
                  className="text-[var(--color-ink-primary)] font-medium hover:underline"
                >
                  Compare all plans
                </a>
              </p>
            </div>
          </AnimatedSection>

          {/* Right column — form */}
          <AnimatedSection delay={0.1}>
            <ContactSalesForm />
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
