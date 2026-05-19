"use client";

import Link from "next/link";
import {
  AnchorHTMLAttributes,
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
  /** Visual emphasis level. */
  ctaVariant?: CTAVariant;
}

type TrackedLinkProps = TrackingProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
    children?: ReactNode;
  };

/**
 * Drop-in CTA link that captures `cta_clicked` in PostHog.
 *
 * Routes internal hrefs (start with `/`) through `next/link`. External hrefs
 * use a plain `<a>` and don't fight Next's prefetching. The event fires
 * synchronously on click — there's no need to await network capture before
 * navigating because the snippet queues calls into an array that survives the
 * navigation.
 */
export const TrackedLink = forwardRef<HTMLAnchorElement, TrackedLinkProps>(
  function TrackedLink(
    { ctaId, ctaLocation, ctaLabel, ctaVariant, href, onClick, children, ...rest },
    ref,
  ) {
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      captureCTAClick({
        cta_id: ctaId,
        cta_location: ctaLocation,
        cta_label: ctaLabel ?? (typeof children === "string" ? children : undefined),
        cta_destination: href,
        cta_variant: ctaVariant,
      });
      onClick?.(event);
    };

    const isInternal = href.startsWith("/");

    if (isInternal) {
      return (
        <Link ref={ref} href={href} onClick={handleClick} {...rest}>
          {children}
        </Link>
      );
    }

    return (
      <a ref={ref} href={href} onClick={handleClick} {...rest}>
        {children}
      </a>
    );
  },
);
