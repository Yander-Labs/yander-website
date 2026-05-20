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

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useDemoModal } from "./DemoModal";
import { useAuthState } from "@/components/AuthStateProvider";
import { TrackedButton } from "./TrackedButton";
import { TrackedLink } from "./TrackedLink";

/** Destination for logged-in users — drops them straight on the product. */
const DASHBOARD_HREF = "https://app.yander.ai/";

export type CTAButtonsSize = "default" | "lg";

interface CTAButtonsProps {
  /** Section / surface label for PostHog tracking, e.g. "hero", "final_cta", "industry_page". */
  ctaLocation: string;
  /** Visual size. "default" = h-10 (section CTAs); "lg" = h-11 (hero CTAs). */
  size?: CTAButtonsSize;
  /** Extra classes on the wrapping flex container (margin, alignment, etc.). */
  className?: string;
  /** Override the destination of the primary "Get started free" button.
   * Defaults to the app sign-in page so users skip the pricing detour and
   * land directly on Clerk auth (which handles sign-up + sign-in in one
   * flow). Override per-surface only when a specific funnel needs a
   * pricing handoff (e.g. plan-specific checkout flows). */
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
  getStartedHref = "https://app.yander.ai/sign-in",
  getStartedLabel = "Get started free",
  demoLabel = "Book a demo",
}: CTAButtonsProps) {
  const { openModal: openDemoModal } = useDemoModal();
  const { isLoggedIn } = useAuthState();
  const s = sizeStyles[size];

  // Auth-aware swap: when the visitor already has an app.yander.ai session
  // cookie on .yander.ai, collapse the "Book a demo + Get started free"
  // pair into a single "Open dashboard" CTA that drops them right into
  // the product. Server-rendered, no flash.
  if (isLoggedIn) {
    return (
      <div className={cn("flex items-center", s.gap, className)}>
        <TrackedLink
          ctaId={`${ctaLocation}_open_dashboard`}
          ctaLocation={ctaLocation}
          ctaVariant="primary"
          href={DASHBOARD_HREF}
          className={cn(s.button, "bg-[#171717] text-white hover:bg-black")}
        >
          Open dashboard
        </TrackedLink>
      </div>
    );
  }

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
  const { isLoggedIn } = useAuthState();
  const s = sizeStyles[size];

  // Logged-in users don't need a "Book a demo" CTA — they're already a
  // customer. Swap to "Open dashboard" so the mobile drawer stays
  // useful instead of showing a stale CTA.
  if (isLoggedIn) {
    return (
      <TrackedLink
        ctaId={`${ctaLocation}_open_dashboard`}
        ctaLocation={ctaLocation}
        ctaVariant="primary"
        href={DASHBOARD_HREF}
        onClick={onClick}
        className={cn(
          s.button,
          "bg-[#171717] text-white hover:bg-black",
          className,
        )}
      >
        Open dashboard
      </TrackedLink>
    );
  }

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
  href = "https://app.yander.ai/sign-in",
  children = "Get started free",
  onClick,
}: GetStartedButtonProps) {
  const { isLoggedIn } = useAuthState();
  const s = sizeStyles[size];

  // Logged-in: send to dashboard with "Open dashboard" label instead of
  // a sign-in flow. Same shape, same charcoal styling.
  const finalHref = isLoggedIn ? DASHBOARD_HREF : href;
  const finalLabel = isLoggedIn ? "Open dashboard" : children;
  const finalCtaId = isLoggedIn
    ? `${ctaLocation}_open_dashboard`
    : `${ctaLocation}_get_started`;

  return (
    <TrackedLink
      ctaId={finalCtaId}
      ctaLocation={ctaLocation}
      ctaVariant="primary"
      href={finalHref}
      onClick={onClick}
      className={cn(
        s.button,
        "bg-[#171717] text-white hover:bg-black",
        className,
      )}
    >
      {finalLabel}
    </TrackedLink>
  );
}
