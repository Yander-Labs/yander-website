"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../ui/AnimatedSection";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useWaitlistModal } from "../ui/WaitlistModal";
import { useDemoModal } from "../ui/DemoModal";

type BillingPeriod = "monthly" | "annual";

interface RecruiterTier {
  name: string;
  description: string;
  monthlyPrice: number;
  annualMonthly: number;
  /** Tier-specific candidate volume line (e.g. "500 sourced candidates / month"). */
  headlineFeature: string;
  cta: string;
  monthlyLink: string;
  annualLink: string;
  recommended?: boolean;
  /** Shown only when the annual billing pill is active (e.g. "Save 10%"). */
  annualSaveLabel?: string;
}

const tiers: RecruiterTier[] = [
  {
    name: "Free",
    description: "Try Yander with your first 200 sourced candidates.",
    monthlyPrice: 0,
    annualMonthly: 0,
    headlineFeature: "First 200 sourced candidates free",
    cta: "Get Started Free",
    monthlyLink: "https://app.yander.ai/sign-up?plan=free&product=recruiter",
    annualLink: "https://app.yander.ai/sign-up?plan=free&product=recruiter",
  },
  {
    name: "Pro",
    description: "For active hiring teams who need consistent flow.",
    monthlyPrice: 89,
    annualMonthly: 80, // 10% off (89 × 0.9 = 80.10, rounded)
    headlineFeature: "500 sourced candidates / month",
    cta: "Start Pro",
    monthlyLink: "https://buy.stripe.com/7sY28t2DAgT4bMie0v0ZW07",
    annualLink: "https://buy.stripe.com/8x24gBcea0U66rY3lR0ZW09",
    recommended: true,
    annualSaveLabel: "Save 10%",
  },
  {
    name: "Max",
    description: "For high-volume hiring across multiple roles.",
    monthlyPrice: 249,
    annualMonthly: 212, // 15% off (249 × 0.85 = 211.65, rounded)
    headlineFeature: "Unlimited sourced candidates",
    cta: "Start Max",
    monthlyLink: "https://buy.stripe.com/00w14p3HE5am8A69Kf0ZW08",
    annualLink: "https://buy.stripe.com/eVqdRbba646icQm9Kf0ZW0a",
    annualSaveLabel: "Save 15%",
  },
];

const sharedFeatures = [
  "AI sourcing",
  "Detailed candidate profiles",
  "Unlimited active jobs",
];

function isPlaceholderLink(link: string) {
  return link.startsWith("TODO_");
}

function PricingCard({
  tier,
  billing,
  onWaitlistClick,
  onBookDemo,
}: {
  tier: RecruiterTier;
  billing: BillingPeriod;
  onWaitlistClick: () => void;
  onBookDemo: () => void;
}) {
  const price = billing === "annual" ? tier.annualMonthly : tier.monthlyPrice;
  const link = billing === "annual" ? tier.annualLink : tier.monthlyLink;
  const isFree = tier.monthlyPrice === 0;
  const usePlaceholder = isPlaceholderLink(link);

  return (
    <div
      className={cn(
        "relative border p-8 flex flex-col h-full transition-all duration-200",
        tier.recommended
          ? "bg-[#fafaf7] border-[#1e1044] border-2 shadow-[0_8px_30px_rgba(30,16,68,0.08)] hover:shadow-[0_12px_40px_rgba(30,16,68,0.12)]"
          : "bg-white border-[#E4E7EC] hover:border-gray-300"
      )}
    >
      {tier.recommended && (
        <div className="absolute -top-3 left-8">
          <span className="inline-flex items-center px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] bg-[#1e1044] text-white">
            Most Popular
          </span>
        </div>
      )}

      {/* Plan name & description */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-3xl font-semibold text-gray-900 tracking-tight">
            {tier.name}
          </h3>
          {billing === "annual" && tier.annualSaveLabel && (
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
              {tier.annualSaveLabel}
            </span>
          )}
        </div>
        <p className="mt-2 text-sm text-gray-500 leading-snug min-h-[40px]">
          {tier.description}
        </p>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline">
          <span className="text-2xl font-bold text-gray-900">
            ${isFree ? 0 : price}
          </span>
          <span className="ml-2 text-sm text-gray-400">/mo</span>
        </div>
        <p
          className={cn(
            "mt-1 text-[11px] text-gray-400",
            !(!isFree && billing === "annual") && "invisible"
          )}
        >
          billed annually
        </p>
      </div>

      {/* CTA */}
      {usePlaceholder ? (
        <button
          onClick={onWaitlistClick}
          className={cn(
            "inline-flex items-center justify-center font-medium transition-all duration-150 px-5 py-3.5 text-sm min-h-[48px] w-full",
            tier.recommended
              ? "bg-[#1e1044] text-white hover:bg-[#2a1860]"
              : "bg-[#0a0a0a] text-white hover:bg-gray-800"
          )}
        >
          {tier.cta}
        </button>
      ) : (
        <a
          href={link}
          className={cn(
            "inline-flex items-center justify-center font-medium transition-all duration-150 px-5 py-3.5 text-sm min-h-[48px] w-full",
            tier.recommended
              ? "bg-[#1e1044] text-white hover:bg-[#2a1860]"
              : "bg-[#0a0a0a] text-white hover:bg-gray-800"
          )}
        >
          {tier.cta}
        </a>
      )}

      {/* Book a demo link */}
      <button
        onClick={onBookDemo}
        className="mt-3 text-xs text-gray-500 hover:text-[#0a0a0a] transition-colors w-full text-center inline-flex items-center justify-center gap-1.5 group"
      >
        <span>Book a demo</span>
        <span
          aria-hidden="true"
          className="transition-transform duration-150 group-hover:translate-x-0.5"
        >
          →
        </span>
      </button>

      {/* Divider */}
      <div className="border-t border-[#E4E7EC] my-6" />

      {/* Headline feature + shared features */}
      <div className="space-y-3.5 flex-1">
        <FeatureItem text={tier.headlineFeature} bold />
        {sharedFeatures.map((feature) => (
          <FeatureItem key={feature} text={feature} />
        ))}
      </div>
    </div>
  );
}

function FeatureItem({ text, bold = false }: { text: string; bold?: boolean }) {
  return (
    <div className="flex items-start gap-2.5">
      <Check className="w-4 h-4 text-[#1e1044] flex-shrink-0 mt-0.5" />
      <span
        className={cn(
          "text-sm",
          bold ? "text-[#0a0a0a] font-medium" : "text-gray-600"
        )}
      >
        {text}
      </span>
    </div>
  );
}

export function RecruiterPricingCards() {
  const [billing, setBilling] = useState<BillingPeriod>("monthly");
  const { openModal } = useWaitlistModal();
  const { openModal: openDemoModal } = useDemoModal();

  return (
    <section className="relative pt-2 pb-20 md:pb-24 bg-white overflow-hidden">
      {/* Vertical rhythm lines — signature component */}
      <div
        className="absolute inset-y-0 left-8 w-px bg-gray-100 hidden lg:block pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-8 w-px bg-gray-100 hidden lg:block pointer-events-none"
        aria-hidden="true"
      />

      <Container>
        {/* Billing Toggle */}
        <AnimatedSection className="flex justify-center mb-8">
          <div className="inline-flex items-center bg-gray-100 p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={cn(
                "relative px-6 py-2 text-sm font-medium transition-all duration-200",
                billing === "monthly"
                  ? "text-white"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              {billing === "monthly" && (
                <motion.div
                  layoutId="recruiter-billing-pill"
                  className="absolute inset-0 bg-[#0a0a0a]"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">Monthly</span>
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={cn(
                "relative px-6 py-2 text-sm font-medium transition-all duration-200",
                billing === "annual"
                  ? "text-white"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              {billing === "annual" && (
                <motion.div
                  layoutId="recruiter-billing-pill"
                  className="absolute inset-0 bg-[#0a0a0a]"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                Annual
                <span className="inline-flex px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-700">
                  Save up to 15%
                </span>
              </span>
            </button>
          </div>
        </AnimatedSection>

        {/* Pricing Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <StaggerItem key={tier.name}>
              <PricingCard
                tier={tier}
                billing={billing}
                onWaitlistClick={openModal}
                onBookDemo={openDemoModal}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Footnote */}
        <p className="mt-12 text-center text-xs text-gray-400 tracking-wide">
          No setup fees. No contracts. Switch plans anytime.
        </p>
      </Container>
    </section>
  );
}
