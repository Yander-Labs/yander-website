"use client";

/**
 * Site-wide canonical CTA button pair: "Book a demo" + "Get started free".
 *
 * This is the ONE component every CTA pair across the marketing site should
 * use. It locks in:
 *   - Consistent text ("Book a demo" with lowercase 'd', "Get started free")
 *   - Consistent visual style (Interfere-replica refined look — h-10/h-11
 *     pills with #171717 black primary + white secondary, soft 8% border)
 *   - PostHog tracking via TrackedButton / TrackedLink
 *   - Demo modal trigger via useDemoModal context
 *
 * Pre-component sweep (2026-05-19) found ~25 CTA call sites with at least
 * 4 different size/text variants ("Book a Demo", "Try for free", "Start
 * free trial", "Get started free") that drifted apart over time. This is
 * the single source of truth going forward.
 *
 * Variants:
 *   - size="default" (h-10, 13.5px) — for section CTAs, navigation, page footers
 *   - size="lg"      (h-11, 14px)   — for hero CTAs that need extra prominence
 *
 * If you need a single button (just demo OR just get-started), drop into
 * the same wrapper styling but call `<DemoButton />` or `<GetStartedButton />`
 * directly. Keep deviation rare — consistency is the win.
 */

import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useDemoModal } from "./DemoModal";
import { TrackedButton } from "./TrackedButton";
import { TrackedLink } from "./TrackedLink";

export type CTAButtonsSize = "default" | "lg";

interface CTAButtonsProps {
  /** Section / surface label for PostHog tracking, e.g. "hero", "final_cta", "industry_page". */
  ctaLocation: string;
  /** Visual size. "default" = h-10 (section CTAs); "lg" = h-11 (hero CTAs). */
  size?: CTAButtonsSize;
  /** Extra classes on the wrapping flex container (margin, alignment, etc.). */
  className?: string;
  /** Override the destination of the primary "Get started free" button. Defaults to /pricing. */
  getStartedHref?: string;
  /**
   * Optional override for the primary CTA label. ONLY use when there's a
   * specific product reason (e.g. a step-1 CTA that says "Continue").
   * Default copy "Get started free" should win the vast majority of the time.
   */
  getStartedLabel?: string;
  /**
   * Optional override for the secondary CTA label. Same caveat — keep
   * "Book a demo" unless there's a real product reason to deviate.
   */
  demoLabel?: string;
}

const sizeStyles: Record<CTAButtonsSize, { button: string; gap: string }> = {
  default: {
    button:
      "inline-flex h-10 items-center rounded-md px-6 text-[13.5px] font-medium transition-colors",
    gap: "gap-3",
  },
  lg: {
    button:
      "inline-flex h-11 items-center rounded-md px-6 text-[14px] font-medium transition-colors",
    gap: "gap-3",
  },
};

export function CTAButtons({
  ctaLocation,
  size = "default",
  className,
  getStartedHref = "/pricing",
  getStartedLabel = "Get started free",
  demoLabel = "Book a demo",
}: CTAButtonsProps) {
  const { openModal: openDemoModal } = useDemoModal();
  const s = sizeStyles[size];

  return (
    <div className={cn("flex items-center", s.gap, className)}>
      <TrackedButton
        ctaId={`${ctaLocation}_book_demo`}
        ctaLocation={ctaLocation}
        ctaDestination="demo_modal"
        ctaVariant="ghost"
        onClick={openDemoModal}
        className={cn(
          s.button,
          "border border-[rgba(0,0,0,0.08)] bg-white text-[#171717] hover:border-[#171717]/30",
        )}
      >
        {demoLabel}
      </TrackedButton>
      <TrackedLink
        ctaId={`${ctaLocation}_get_started`}
        ctaLocation={ctaLocation}
        ctaVariant="primary"
        href={getStartedHref}
        className={cn(s.button, "bg-[#171717] text-white hover:bg-black")}
      >
        {getStartedLabel}
      </TrackedLink>
    </div>
  );
}

/**
 * Single-button variants for the rare case you need just one CTA without
 * the pair. They share the exact same visual language so the page reads
 * consistently no matter how many buttons are showing.
 */

interface SingleCTAProps {
  ctaLocation: string;
  size?: CTAButtonsSize;
  className?: string;
  children?: ReactNode;
  /** Optional click handler — fires IN ADDITION to opening the demo modal
   * / navigating. Useful for closing the mobile drawer before the action
   * fires. */
  onClick?: () => void;
}

export function DemoButton({
  ctaLocation,
  size = "default",
  className,
  children = "Book a demo",
  onClick,
}: SingleCTAProps) {
  const { openModal: openDemoModal } = useDemoModal();
  const s = sizeStyles[size];
  return (
    <TrackedButton
      ctaId={`${ctaLocation}_book_demo`}
      ctaLocation={ctaLocation}
      ctaDestination="demo_modal"
      ctaVariant="ghost"
      onClick={() => {
        onClick?.();
        openDemoModal();
      }}
      className={cn(
        s.button,
        "border border-[rgba(0,0,0,0.08)] bg-white text-[#171717] hover:border-[#171717]/30",
        className,
      )}
    >
      {children}
    </TrackedButton>
  );
}

interface GetStartedButtonProps extends SingleCTAProps {
  href?: string;
}

export function GetStartedButton({
  ctaLocation,
  size = "default",
  className,
  href = "/pricing",
  children = "Get started free",
  onClick,
}: GetStartedButtonProps) {
  const s = sizeStyles[size];
  return (
    <TrackedLink
      ctaId={`${ctaLocation}_get_started`}
      ctaLocation={ctaLocation}
      ctaVariant="primary"
      href={href}
      onClick={onClick}
      className={cn(
        s.button,
        "bg-[#171717] text-white hover:bg-black",
        className,
      )}
    >
      {children}
    </TrackedLink>
  );
}
