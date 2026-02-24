import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ContactSalesForm } from "@/components/sections/ContactSalesForm";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Sales | Yander",
  description:
    "Talk to our sales team about Enterprise pricing, custom onboarding, and dedicated support for your agency.",
  alternates: {
    canonical: "https://yander.io/contact-sales",
  },
  robots: "index, follow",
  openGraph: {
    title: "Contact Sales | Yander",
    description:
      "Talk to our sales team about Enterprise pricing, custom onboarding, and dedicated support for your agency.",
    url: "https://yander.io/contact-sales",
    siteName: "Yander",
    type: "website",
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
      <Container>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left column */}
          <AnimatedSection>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-[-0.02em]">
              Talk to our sales team
            </h1>
            <p className="mt-4 text-base text-gray-500 max-w-md">
              Get help with Enterprise pricing, schedule a demo, and explore how
              Yander fits your agency.
            </p>

            <div className="mt-10">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
                What&apos;s included in Enterprise
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 pt-8 border-t border-[#E4E7EC]">
              <p className="text-sm text-gray-500">
                Not sure if Enterprise is right for you?{" "}
                <a
                  href="/pricing"
                  className="text-gray-900 font-medium hover:underline"
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
