"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "../ui/Container";
import { AnimatedSection, StaggerContainer, StaggerItem } from "../ui/AnimatedSection";
import { Badge } from "../ui/Badge";
import { cn } from "@/lib/utils";
import { Lock, Info, Check } from "lucide-react";

type BillingPeriod = "monthly" | "annual";

interface PricingTier {
  name: string;
  description: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  annualMonthly: number | null;
  entities: string;
  integrations: string;
  scoringRefresh: string;
  extraEntity: string;
  cta: string;
  monthlyLink: string;
  annualLink: string;
  recommended?: boolean;
  hasTrial?: boolean;
}

const tiers: PricingTier[] = [
  {
    name: "Starter",
    description: "For small agencies with up to 25 employees and/or clients.",
    monthlyPrice: 199,
    annualPrice: 1990,
    annualMonthly: 166,
    entities: "Up to 25",
    integrations: "2",
    scoringRefresh: "Every 3 days",
    extraEntity: "$10/entity",
    cta: "Start Free Trial",
    monthlyLink: "https://app.yander.ai/sign-up?plan=starter&billing=monthly",
    annualLink: "https://app.yander.ai/sign-up?plan=starter&billing=annual",
    hasTrial: true,
  },
  {
    name: "Professional",
    description: "For growing agencies with 25-50 employees and/or clients.",
    monthlyPrice: 449,
    annualPrice: 4490,
    annualMonthly: 374,
    entities: "Up to 50",
    integrations: "5",
    scoringRefresh: "Every 2 days",
    extraEntity: "$12/entity",
    cta: "Get Started",
    monthlyLink: "https://buy.stripe.com/14AcN73HE8my5nU8Gb0ZW03",
    annualLink: "https://buy.stripe.com/14AaEZ5PM6eq03AcWr0ZW04",
    recommended: true,
  },
  {
    name: "Growth",
    description: "For mid-size agencies with 50-100 employees and/or clients.",
    monthlyPrice: 799,
    annualPrice: 7990,
    annualMonthly: 665,
    entities: "Up to 100",
    integrations: "Unlimited",
    scoringRefresh: "Daily",
    extraEntity: "$15/entity",
    cta: "Get Started",
    monthlyLink: "https://buy.stripe.com/28EfZja62byKbMi1dJ0ZW05",
    annualLink: "https://buy.stripe.com/3cI4gBba6gT49EaaOj0ZW06",
  },
  {
    name: "Enterprise",
    description: "For large agencies with 100+ employees and/or clients.",
    monthlyPrice: null,
    annualPrice: null,
    annualMonthly: null,
    entities: "100+",
    integrations: "Unlimited",
    scoringRefresh: "Custom",
    extraEntity: "Negotiated",
    cta: "Contact Sales",
    monthlyLink: "/contact-sales",
    annualLink: "/contact-sales",
  },
];

const tooltips: Record<string, React.ReactNode> = {
  entities: "1 entity = 1 employee or client.",
  integrations: (
    <>
      Connect tools such as Slack, Notion, Gmail, ClickUp, Monday.com, Asana.{" "}
      <Link href="/integrations" className="underline font-medium">
        See our full list on our integrations page
      </Link>
      .
    </>
  ),
  meeting: "Replace your existing meeting recorder and easily import your meetings from Fathom or Fireflies in a few clicks.",
};

function Tooltip({ content }: { content: React.ReactNode }) {
  return (
    <span className="group/tooltip relative inline-flex ml-1 cursor-help">
      <Info className="w-3.5 h-3.5 text-gray-400" />
      <span className="invisible group-hover/tooltip:visible opacity-0 group-hover/tooltip:opacity-100 transition-all duration-150 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 px-3 py-2 text-xs text-gray-600 bg-white rounded-lg border border-[#E4E7EC] shadow-elevated z-10">
        {content}
      </span>
    </span>
  );
}

function PricingCard({ tier, billing }: { tier: PricingTier; billing: BillingPeriod }) {
  const isEnterprise = tier.monthlyPrice === null;
  const price = billing === "annual" ? tier.annualMonthly : tier.monthlyPrice;
  const link = billing === "annual" ? tier.annualLink : tier.monthlyLink;

  return (
    <div
      className={cn(
        "relative bg-white rounded-[12px] border p-6 flex flex-col h-full",
        tier.recommended
          ? "border-gray-900 border-2 shadow-card"
          : "border-[#e5e5e5] shadow-subtle"
      )}
    >
      {tier.recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="default" size="sm" className="bg-gray-900 text-white">
            MOST POPULAR
          </Badge>
        </div>
      )}

      {/* Plan name & description */}
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-gray-900">{tier.name}</h3>
        <p className="mt-1 text-sm text-gray-500 leading-snug min-h-[40px]">{tier.description}</p>
      </div>

      {/* Price */}
      <div className="mb-6">
        {isEnterprise ? (
          <div className="flex items-baseline">
            <span className="text-4xl font-bold text-gray-900">Custom</span>
          </div>
        ) : (
          <>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-gray-900">
                ${price}
              </span>
              <span className="ml-1 text-sm text-gray-500">/mo</span>
            </div>
          </>
        )}
      </div>

      {/* CTA */}
      <a
        href={link}
        className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-[6px] px-5 py-3 text-sm min-h-[44px] w-full bg-gray-900 text-white hover:bg-gray-800"
      >
        {tier.cta}
      </a>

      {/* Divider */}
      <div className="border-t border-[#E4E7EC] my-5" />

      {/* Features */}
      <div className="space-y-3 flex-1">
        <FeatureItem text={`${tier.entities} entities included`} tooltip={tooltips.entities} />
        <FeatureItem text={`${tier.integrations} integration${tier.integrations === "1" ? "" : "s"}`} tooltip={tooltips.integrations} />
        <FeatureItem text={isEnterprise ? "Custom score refresh" : `Scores refresh ${tier.scoringRefresh.toLowerCase()}`} />
        <FeatureItem text={isEnterprise ? "Custom rate per extra entity" : `${tier.extraEntity.replace("/entity", "")}/mo per extra entity`} />
      </div>

      {/* Security footer */}
      <div className="mt-5 pt-4 border-t border-[#E4E7EC] flex items-center gap-1.5">
        <Lock className="w-3 h-3 text-gray-400 flex-shrink-0" />
        <span className="text-[11px] text-gray-500 whitespace-nowrap">Enterprise-grade security</span>
      </div>
    </div>
  );
}

function FeatureItem({
  text,
  tooltip,
}: {
  text: string;
  tooltip?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
      <span className="text-sm text-gray-600 flex items-center">
        {text}
        {tooltip && <Tooltip content={tooltip} />}
      </span>
    </div>
  );
}

export function PricingCards() {
  const [billing, setBilling] = useState<BillingPeriod>("monthly");

  return (
    <section className="py-8 md:py-12">
      <Container>
        {/* Billing Toggle */}
        <AnimatedSection className="flex justify-center mb-10">
          <div className="inline-flex items-center bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={cn(
                "relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-200",
                billing === "monthly"
                  ? "text-white"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              {billing === "monthly" && (
                <motion.div
                  layoutId="billing-pill"
                  className="absolute inset-0 bg-gray-900 rounded-full"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">Monthly</span>
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={cn(
                "relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-200",
                billing === "annual"
                  ? "text-white"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              {billing === "annual" && (
                <motion.div
                  layoutId="billing-pill"
                  className="absolute inset-0 bg-gray-900 rounded-full"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                Annual
                <span className="inline-flex px-1.5 py-0.5 text-[10px] font-medium bg-emerald-100 text-emerald-700 rounded">
                  Save 17%
                </span>
              </span>
            </button>
          </div>
        </AnimatedSection>

        {/* Pricing Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {tiers.map((tier) => (
            <StaggerItem key={tier.name}>
              <PricingCard tier={tier} billing={billing} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
