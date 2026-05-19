"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "../ui/Container";
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

  // Step number for the homepage's numbered eyebrow pattern (01/02/03).
  const stepNumber =
    tier.name === "Free" ? "01" : tier.name === "Pro" ? "02" : "03";

  return (
    <div
      className={cn(
        "relative border p-10 md:p-12 flex flex-col h-full transition-all duration-200 rounded-none",
        tier.recommended
          ? "bg-[var(--color-surface-subtle)] border-[var(--color-accent-primary)] border-2 shadow-[0_12px_40px_rgba(30,16,68,0.12)] hover:shadow-[0_20px_60px_rgba(30,16,68,0.18)]"
          : "bg-white border-[var(--color-border-canon)] shadow-[var(--shadow-canon-card)] hover:shadow-[var(--shadow-canon-card-hover)]"
      )}
    >
      {tier.recommended && (
        <div className="absolute -top-3 left-10 md:left-12">
          <span className="inline-flex items-center px-3 py-1 text-[10px] font-[var(--font-geist-mono)] font-semibold uppercase tracking-[0.22em] bg-[var(--color-accent-primary)] text-white rounded-none">
            Most Popular
          </span>
        </div>
      )}

      {/* Numbered eyebrow — homepage signature */}
      <div className="mb-3 inline-flex items-baseline gap-2 font-[var(--font-geist-mono)] text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-disabled)]">
        <span>{stepNumber}</span>
        <span className="h-px w-6 bg-[var(--color-border-canon)]" />
        <span className="text-[var(--color-ink-muted)]">{tier.name === "Free" ? "Try" : tier.name === "Pro" ? "Scale" : "Velocity"}</span>
      </div>

      {/* Plan name & description */}
      <div className="mb-8">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-geist font-bold text-4xl md:text-5xl text-[var(--color-ink-primary)] tracking-tight leading-[1.05]">
            {tier.name}
          </h3>
          {billing === "annual" && tier.annualSaveLabel && (
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-none">
              {tier.annualSaveLabel}
            </span>
          )}
        </div>
        <p className="mt-3 text-base text-[var(--color-ink-secondary)] leading-snug min-h-[48px]">
          {tier.description}
        </p>
      </div>

      {/* Price — homepage hero scale wow moment */}
      <div className="mb-8">
        <div className="flex items-baseline">
          <span className="font-geist font-bold text-5xl md:text-6xl text-[var(--color-ink-primary)] tracking-tight leading-none">
            ${isFree ? 0 : price}
          </span>
          <span className="ml-2 text-base text-[var(--color-ink-faded)]">/mo</span>
        </div>
        <p
          className={cn(
            "mt-2 text-[11px] font-[var(--font-geist-mono)] uppercase tracking-[0.22em] text-[var(--color-ink-faded)]",
            !(!isFree && billing === "annual") && "invisible"
          )}
        >
          billed annually
        </p>
      </div>

      {/* CTA */}
      {usePlaceholder ? (
        <TrackedButton
          ctaId={`recruiter_pricing_${tier.name.toLowerCase()}_waitlist`}
          ctaLocation="recruiter_pricing_cards"
          ctaLabel={tier.cta}
          ctaDestination="waitlist_modal"
          ctaVariant="primary"
          onClick={onWaitlistClick}
          className={cn(
            "inline-flex items-center justify-center font-medium transition-all duration-150 px-6 py-4 text-base min-h-[52px] w-full rounded-none",
            tier.recommended
              ? "bg-[var(--color-accent-primary)] text-white hover:opacity-90"
              : "bg-[var(--color-ink-primary)] text-white hover:bg-[var(--color-ink-midnight)]"
          )}
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
          className={cn(
            "inline-flex items-center justify-center font-medium transition-all duration-150 px-6 py-4 text-base min-h-[52px] w-full rounded-none",
            tier.recommended
              ? "bg-[var(--color-accent-primary)] text-white hover:opacity-90"
              : "bg-[var(--color-ink-primary)] text-white hover:bg-[var(--color-ink-midnight)]"
          )}
        >
          {tier.cta}
        </TrackedLink>
      )}

      {/* Book a demo link */}
      <TrackedButton
        ctaId={`recruiter_pricing_${tier.name.toLowerCase()}_book_demo`}
        ctaLocation="recruiter_pricing_cards"
        ctaDestination="demo_modal"
        ctaVariant="link"
        onClick={onBookDemo}
        className="mt-3 text-xs text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] transition-colors w-full text-center inline-flex items-center justify-center gap-1.5 group"
      >
        <span>Book a demo</span>
        <span
          aria-hidden="true"
          className="transition-transform duration-150 group-hover:translate-x-0.5"
        >
          →
        </span>
      </TrackedButton>

      {/* Divider */}
      <div className="border-t border-[var(--color-border-canon)] my-8" />

      {/* Headline feature + shared features — slightly larger for hero-scale cards */}
      <div className="space-y-4 flex-1">
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
      <Check className="w-4 h-4 text-[var(--color-accent-primary)] flex-shrink-0 mt-0.5" />
      <span
        className={cn(
          "text-sm",
          bold ? "text-[var(--color-ink-primary)] font-medium" : "text-[var(--color-ink-secondary)]"
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
    <section className="relative pt-4 pb-24 md:pb-32 bg-white overflow-hidden">
      {/* Vertical rhythm lines — signature component */}
      <div
        className="absolute inset-y-0 left-8 w-px bg-[var(--color-border-canon-subtle)] hidden lg:block pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-8 w-px bg-[var(--color-border-canon-subtle)] hidden lg:block pointer-events-none"
        aria-hidden="true"
      />

      <Container>
        {/* Billing Toggle */}
        <AnimatedSection className="flex justify-center mb-8">
          <div className="inline-flex items-center bg-[var(--color-surface-muted)] p-1 rounded-none">
            <button
              onClick={() => setBilling("monthly")}
              className={cn(
                "relative px-6 py-2 text-sm font-medium transition-all duration-200",
                billing === "monthly"
                  ? "text-white"
                  : "text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)]"
              )}
            >
              {billing === "monthly" && (
                <motion.div
                  layoutId="recruiter-billing-pill"
                  className="absolute inset-0 bg-[var(--color-ink-primary)]"
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
                  : "text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)]"
              )}
            >
              {billing === "annual" && (
                <motion.div
                  layoutId="recruiter-billing-pill"
                  className="absolute inset-0 bg-[var(--color-ink-primary)]"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                Annual
                <span className="inline-flex px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-700 rounded-none">
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
        <p className="mt-12 text-center text-xs text-[var(--color-ink-faded)] tracking-wide">
          No setup fees. No contracts. Switch plans anytime.
        </p>
      </Container>
    </section>
  );
}
