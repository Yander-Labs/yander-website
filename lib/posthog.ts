/**
 * PostHog client-side capture helpers.
 *
 * PostHog is loaded via the snippet in `app/layout.tsx`. The snippet stubs
 * `window.posthog.capture` immediately, so calls fire before the full library
 * loads and are flushed once it does. These wrappers are SSR-safe and silently
 * no-op when PostHog hasn't initialised (e.g. during prerender, or if the
 * loader is blocked by an ad blocker).
 *
 * Why centralise: stable event names + typed properties. The dashboard depends
 * on `cta_id` being a slug we control (not auto-extracted text), so copy
 * changes don't break the historical series.
 */

type PostHogProperties = Record<string, unknown>;

interface PostHogStub {
  capture: (event: string, properties?: PostHogProperties) => void;
  identify?: (distinctId: string, properties?: PostHogProperties) => void;
}

declare global {
  interface Window {
    posthog?: PostHogStub;
  }
}

export type EventName =
  | "cta_clicked"
  | "demo_modal_opened"
  | "waitlist_submitted"
  | "contact_sales_submitted";

export type CTAVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "link";

export interface CTAClickProperties {
  /** Stable slug. Survives copy changes. e.g. `nav_book_demo`. */
  cta_id: string;
  /** Section / surface the CTA lives in. e.g. `nav`, `hero`, `final_cta`. */
  cta_location: string;
  /** Visible button text, when known. Helpful for at-a-glance dashboards. */
  cta_label?: string;
  /** Where the CTA navigates or what it opens. URL path or modal name. */
  cta_destination?: string;
  /** Visual emphasis level. */
  cta_variant?: CTAVariant;
}

export function capture(event: EventName, properties?: PostHogProperties): void {
  if (typeof window === "undefined") return;
  window.posthog?.capture(event, properties);
}

export function captureCTAClick(properties: CTAClickProperties): void {
  capture("cta_clicked", properties as unknown as PostHogProperties);
}
