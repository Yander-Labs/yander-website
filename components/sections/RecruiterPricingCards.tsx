"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrackedLink } from "../ui/TrackedLink";
import { TrackedButton } from "../ui/TrackedButton";
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
    // Sign-up first, then app.yander.ai/start-checkout mints the Stripe
    // session for the selected plan + billing period. URL-encoded so the
    // inner ?plan=&billing= survives the outer query string.
    // Decoded redirect_url: https://app.yander.ai/start-checkout?plan=pro&billing=monthly
    monthlyLink:
      "https://app.yander.ai/sign-up?redirect_url=https%3A%2F%2Fapp.yander.ai%2Fstart-checkout%3Fplan%3Dpro%26billing%3Dmonthly",
    // Decoded redirect_url: https://app.yander.ai/start-checkout?plan=pro&billing=annual
    annualLink:
      "https://app.yander.ai/sign-up?redirect_url=https%3A%2F%2Fapp.yander.ai%2Fstart-checkout%3Fplan%3Dpro%26billing%3Dannual",
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
    // Decoded redirect_url: https://app.yander.ai/start-checkout?plan=max&billing=monthly
    monthlyLink:
      "https://app.yander.ai/sign-up?redirect_url=https%3A%2F%2Fapp.yander.ai%2Fstart-checkout%3Fplan%3Dmax%26billing%3Dmonthly",
    // Decoded redirect_url: https://app.yander.ai/start-checkout?plan=max&billing=annual
    annualLink:
      "https://app.yander.ai/sign-up?redirect_url=https%3A%2F%2Fapp.yander.ai%2Fstart-checkout%3Fplan%3Dmax%26billing%3Dannual",
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

  // /yander-interfere numbered-eyebrow pattern (01/02/03 with horizontal rule).
  const stepNumber =
    tier.name === "Free" ? "01" : tier.name === "Pro" ? "02" : "03";

  return (
    <div
      className={cn(
        "group relative flex flex-col h-full overflow-hidden rounded-2xl border p-8 md:p-10 transition-shadow duration-200",
        // Card chrome — double-stop drop shadow, exact /yander-interfere recipe.
        tier.recommended
          ? "border-[rgba(0,0,0,0.08)] bg-[#fafaf9] shadow-[0_1px_2px_rgba(0,0,0,0.03),0_28px_60px_-20px_rgba(0,0,0,0.14)]"
          : "border-[rgba(0,0,0,0.06)] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.025),0_18px_48px_-20px_rgba(0,0,0,0.10)] hover:shadow-[0_1px_2px_rgba(0,0,0,0.03),0_28px_60px_-20px_rgba(0,0,0,0.14)]"
      )}
    >
      {/* "Most Popular" — charcoal chip, not purple */}
      {tier.recommended && (
        <div className="absolute right-6 top-6">
          <span className="inline-flex items-center rounded-full bg-[#171717] px-2.5 py-1 font-[var(--font-geist-mono)] text-[10px] uppercase tracking-[0.18em] text-white">
            Most Popular
          </span>
        </div>
      )}

      {/* Numbered eyebrow */}
      <div className="inline-flex items-baseline gap-2 font-[var(--font-geist-mono)] text-[11px] uppercase tracking-[0.18em] text-[#171717]/40">
        <span>{stepNumber}</span>
        <span className="h-px w-6 bg-[rgba(0,0,0,0.12)]" />
        <span className="text-[#171717]/50">
          {tier.name === "Free" ? "Try" : tier.name === "Pro" ? "Scale" : "Velocity"}
        </span>
      </div>

      {/* Plan name + description */}
      <div className="mt-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-[22px] font-medium leading-snug tracking-[-0.02em] text-[#171717]">
            {tier.name}
          </h3>
          {billing === "annual" && tier.annualSaveLabel && (
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 border border-emerald-100">
              {tier.annualSaveLabel}
            </span>
          )}
        </div>
        <p className="mt-2 text-[14px] leading-[1.6] text-[#171717]/60 min-h-[44px]">
          {tier.description}
        </p>
      </div>

      {/* Price — clamp scale, Inter Medium, single ink color (no Geist Bold) */}
      <div className="mt-8">
        <div className="flex items-baseline">
          <span
            className="font-medium tracking-[-0.025em] leading-[0.97] text-[#171717]"
            style={{ fontSize: "clamp(2.5rem, 5vw, 3.25rem)" }}
          >
            ${isFree ? 0 : price}
          </span>
          <span className="ml-2 text-[14px] text-[#171717]/40">/mo</span>
        </div>
        <p
          className={cn(
            "mt-2 font-[var(--font-geist-mono)] text-[10.5px] uppercase tracking-[0.18em] text-[#171717]/40",
            !(!isFree && billing === "annual") && "invisible"
          )}
        >
          billed annually
        </p>
      </div>

      {/* CTA — charcoal #171717, rounded-md, h-11 — exact /yander-interfere button */}
      <div className="mt-8">
        {usePlaceholder ? (
          <TrackedButton
            ctaId={`recruiter_pricing_${tier.name.toLowerCase()}_waitlist`}
            ctaLocation="recruiter_pricing_cards"
            ctaLabel={tier.cta}
            ctaDestination="waitlist_modal"
            ctaVariant="primary"
            onClick={onWaitlistClick}
            className="inline-flex h-11 w-full items-center justify-center rounded-md bg-[#171717] px-6 text-[14px] font-medium text-white transition-colors hover:bg-black"
          >
            {tier.cta}
          </TrackedButton>
        ) : (
          <TrackedLink
            ctaId={`recruiter_pricing_${tier.name.toLowerCase()}`}
            ctaLocation="recruiter_pricing_cards"
            ctaLabel={tier.cta}
            ctaVariant="primary"
            href={link}
            className="inline-flex h-11 w-full items-center justify-center rounded-md bg-[#171717] px-6 text-[14px] font-medium text-white transition-colors hover:bg-black"
          >
            {tier.cta}
          </TrackedLink>
        )}

        {/* Book a demo — quiet ghost link */}
        <TrackedButton
          ctaId={`recruiter_pricing_${tier.name.toLowerCase()}_book_demo`}
          ctaLocation="recruiter_pricing_cards"
          ctaDestination="demo_modal"
          ctaVariant="link"
          onClick={onBookDemo}
          className="mt-3 group inline-flex w-full items-center justify-center gap-1.5 text-[13px] text-[#171717]/60 transition-colors hover:text-[#171717]"
        >
          <span>Book a demo</span>
          <span
            aria-hidden="true"
            className="transition-transform duration-150 group-hover:translate-x-0.5"
          >
            →
          </span>
        </TrackedButton>
      </div>

      {/* Divider */}
      <div className="my-7 border-t border-[rgba(0,0,0,0.06)]" />

      {/* Features */}
      <div className="space-y-3 flex-1">
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
      <Check className="w-4 h-4 text-[#171717]/40 flex-shrink-0 mt-0.5" />
      <span
        className={cn(
          "text-[14px] leading-[1.6]",
          bold ? "text-[#171717] font-medium" : "text-[#171717]/60"
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
    <section
      className="relative pt-4 pb-24 md:pb-32 bg-white text-[#171717] overflow-hidden"
      style={{
        fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
        fontWeight: 500,
        letterSpacing: "-0.011em",
      }}
    >
      <div className="mx-auto max-w-[1240px] px-6">
        {/* Billing Toggle — rounded-full pill matching /yander-interfere chip aesthetic */}
        <AnimatedSection className="flex justify-center mb-10">
          <div className="inline-flex items-center rounded-full border border-[rgba(0,0,0,0.06)] bg-white p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={cn(
                "relative h-9 rounded-full px-5 text-[13px] font-medium transition-colors",
                billing === "monthly"
                  ? "text-white"
                  : "text-[#171717]/60 hover:text-[#171717]"
              )}
            >
              {billing === "monthly" && (
                <motion.div
                  layoutId="recruiter-billing-pill"
                  className="absolute inset-0 rounded-full bg-[#171717]"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">Monthly</span>
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={cn(
                "relative h-9 rounded-full px-5 text-[13px] font-medium transition-colors",
                billing === "annual"
                  ? "text-white"
                  : "text-[#171717]/60 hover:text-[#171717]"
              )}
            >
              {billing === "annual" && (
                <motion.div
                  layoutId="recruiter-billing-pill"
                  className="absolute inset-0 rounded-full bg-[#171717]"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                Annual
                <span className="inline-flex rounded-full bg-emerald-100/80 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700">
                  Save 15%
                </span>
              </span>
            </button>
          </div>
        </AnimatedSection>

        {/* Pricing Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 max-w-[1100px] mx-auto">
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
        <p className="mt-12 text-center text-[13px] text-[#171717]/45">
          No setup fees. No contracts. Switch plans anytime.
        </p>
      </div>
    </section>
  );
}
