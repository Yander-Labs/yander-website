"use client";

import {
  ButtonHTMLAttributes,
  forwardRef,
  MouseEvent,
  ReactNode,
} from "react";
import { captureCTAClick, type CTAVariant } from "@/lib/posthog";

interface TrackingProps {
  /** Stable slug for this CTA. Survives copy/design changes. */
  ctaId: string;
  /** Section / surface label, e.g. `nav`, `hero`, `final_cta`. */
  ctaLocation: string;
  /** Optional visible label override (defaults to children when it's a string). */
  ctaLabel?: string;
  /** What this button opens — modal name, e.g. `demo_modal`. */
  ctaDestination?: string;
  /** Visual emphasis level. */
  ctaVariant?: CTAVariant;
}

type TrackedButtonProps = TrackingProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: ReactNode;
  };

/**
 * Drop-in CTA button that captures `cta_clicked` in PostHog and then runs the
 * original onClick. Use for any button-shaped CTA — modal opens, in-page
 * scrollers, form submits that act as CTAs.
 */
export const TrackedButton = forwardRef<HTMLButtonElement, TrackedButtonProps>(
  function TrackedButton(
    {
      ctaId,
      ctaLocation,
      ctaLabel,
      ctaDestination,
      ctaVariant,
      onClick,
      children,
      ...rest
    },
    ref,
  ) {
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      captureCTAClick({
        cta_id: ctaId,
        cta_location: ctaLocation,
        cta_label: ctaLabel ?? (typeof children === "string" ? children : undefined),
        cta_destination: ctaDestination,
        cta_variant: ctaVariant,
      });
      onClick?.(event);
    };

    return (
      <button ref={ref} onClick={handleClick} {...rest}>
        {children}
      </button>
    );
  },
);
