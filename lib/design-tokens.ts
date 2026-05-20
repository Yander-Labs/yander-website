/**
 * Yander design tokens — canonical source of truth.
 *
 * Extracted from V2HomePage.tsx (the homepage). Every page on the site
 * should reference these tokens (or the UI primitives in
 * `components/ui/` that consume them) instead of inlining hex values
 * or shadow stacks.
 *
 * If you find yourself reaching for a hardcoded color, weight, or
 * shadow in a page or section, add it here first and import the token.
 */

// ─── Colors ─────────────────────────────────────────────────────────

/** Ink — the dark palette used for text, primary buttons, borders.
 * Repointed 2026-05-20 to the /yander-interfere DNA: solid #171717 for
 * primary, alpha steps of the same ink for secondary/muted/faded so the
 * palette stays cohesive instead of drifting through gray-X stops. */
export const ink = {
  /** Headlines, primary buttons, borders (#171717). */
  primary: "#171717",
  /** Darkest elements — dark CTA backgrounds (#0a0a0a). */
  midnight: "#0a0a0a",
  /** Body copy on light bg — 60% black. */
  secondary: "rgba(23, 23, 23, 0.60)",
  /** De-emphasized body, caption text — 50% black. */
  muted: "rgba(23, 23, 23, 0.50)",
  /** Tertiary labels, faded metadata — 40% black. */
  faded: "rgba(23, 23, 23, 0.40)",
  /** Disabled state, dividers in subtle contexts — 30% black. */
  disabled: "rgba(23, 23, 23, 0.30)",
} as const

/** Surface — backgrounds and panel fills. Slight warm cast to match
 * the Interfere palette. */
export const surface = {
  /** Default page bg. */
  white: "#ffffff",
  /** Light neutral — section backgrounds, hover states. */
  subtle: "#fafaf9",
  /** One step darker — comparison cards, inert panels. */
  muted: "#F7F7F6",
} as const

/** Borders — hairlines, dividers, container outlines. Now 6-8% pure
 * black (no blue tint). */
export const border = {
  /** Default — most cards and dividers. */
  default: "rgba(0, 0, 0, 0.06)",
  /** Lighter, used inside cards. */
  subtle: "rgba(0, 0, 0, 0.04)",
  /** Stronger, for interactive button outlines. */
  strong: "rgba(0, 0, 0, 0.08)",
} as const

/** Accent.
 * NOTE: /yander-interfere has no purple — primary CTA is charcoal #171717.
 * `accent.purple` is preserved as a legacy escape hatch only. */
export const accent = {
  /** Charcoal — primary CTA bg (#171717). */
  primary: "#171717",
  /** Legacy deep purple — opt-in only (#1e1044). */
  purple: "#1e1044",
  /** Warm orange — AI/Sparkle / Yander-suggests / sourced-by-Yander. */
  rust: "#E05000",
  /** Live-dot green — "Available", "operational" indicators. */
  alive: "#22c55e",
} as const

/** Semantic — status & feedback colors. */
export const semantic = {
  success: "#15803d",
  successBg: "#dcfce7",
  warning: "#92400e",
  warningBg: "#fef3c7",
  danger: "#b91c1c",
  dangerBg: "#fee2e2",
  info: "#1e40af",
  infoBg: "#dbeafe",
} as const

// ─── Shadows ─────────────────────────────────────────────────────────

/**
 * The homepage uses a layered hairline-ring + soft-drop pattern.
 * This avoids the heavy "marketing shadow" feel and reads like Cal.com.
 */
export const shadow = {
  /** Tiny lift — buttons, pills, inline cards. */
  subtle:
    "rgba(19,19,22,0.7) 0px 1px 5px -4px, rgba(34,42,53,0.08) 0px 0px 0px 1px, rgba(255,255,255,0.15) 0px 2px 0px inset",
  /** Default card shadow — feature cards, profile cards. */
  card:
    "rgba(19,19,22,0.7) 0px 1px 5px -4px, rgba(34,42,53,0.08) 0px 0px 0px 1px, rgba(34,42,53,0.05) 0px 4px 8px",
  /** Card hover — lifted state. */
  cardHover:
    "rgba(19,19,22,0.7) 0px 2px 8px -4px, rgba(34,42,53,0.1) 0px 0px 0px 1px, rgba(34,42,53,0.08) 0px 8px 16px",
  /**
   * Showcase mockup floating off the page — only for the hero candidate
   * window and the deep-dive feature mockups. Not for everyday cards.
   */
  mockup:
    "0 149px 199px rgba(0,0,0,0.07), 0 70px 96px rgba(0,0,0,0.05), 0 35px 48px rgba(0,0,0,0.04), 0 17px 24px rgba(0,0,0,0.03), 0 8px 12px rgba(0,0,0,0.02), 0 4px 6px rgba(0,0,0,0.015), inset 0 0 0 0.5px rgba(0,0,0,0.04)",
} as const

// ─── Typography ─────────────────────────────────────────────────────

/**
 * Font families — loaded in app/layout.tsx via next/font/google.
 * Reference these via the CSS variables: `font-family: var(--font-inter)` etc.
 */
export const font = {
  sans: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
  serif: "var(--font-instrument-serif), Georgia, serif",
  geist: "var(--font-geist), ui-sans-serif, system-ui, sans-serif",
  mono: "var(--font-geist-mono), ui-monospace, Menlo, monospace",
} as const

/** Headings use Geist (slightly more grotesque, bolder presence). */
export const headingFontClass = "font-geist"

/** Eyebrow / step-number / metadata captions. */
export const monoCaptionClass =
  "font-[var(--font-geist-mono)] text-[11px] uppercase tracking-[0.22em] text-[#171717]/40"

// ─── Spacing & radii ────────────────────────────────────────────────

/**
 * The homepage uses squared corners (`rounded-none`) on its primary CTAs
 * and most cards. That's a deliberate Cal.com-style aesthetic. Cards
 * elsewhere on the site sometimes drift to `rounded-lg` — those need
 * to be aligned.
 */
export const radius = {
  /** Squared — buttons, primary CTAs, most cards on the homepage. */
  squared: "0px",
  /** Inline pills, status chips. */
  pill: "9999px",
  /** Small inline elements (input fields, secondary chips). */
  sm: "6px",
  /** Medium — only for mockup windows and large content cards. */
  md: "12px",
  /** Large — hero/showcase mockups. */
  lg: "16px",
} as const

/** Section vertical padding scale. Homepage uses py-20 md:py-28. */
export const sectionPadding = {
  /** Compact section (logos, social proof). */
  sm: "py-12 md:py-16",
  /** Default section padding. */
  md: "py-20 md:py-28",
  /** Hero / final CTA. */
  lg: "py-24 md:py-32",
} as const

/** Container max-width — matches Container component. */
export const containerMaxWidth = "max-w-7xl"
export const containerPaddingX = "px-4 sm:px-6 lg:px-8"

// ─── Motion ─────────────────────────────────────────────────────────

/**
 * Easing curves used across the site. Match Cal.com/Linear's
 * "ease-out-quart"-style for snappy-but-soft transitions.
 */
export const ease = {
  /** Default — entrance animations, hover transitions. */
  out: "cubic-bezier(0.21, 0.47, 0.32, 0.98)",
  /** Spring — for "land" moments like dropdowns opening. */
  spring: "cubic-bezier(0.16, 1, 0.3, 1)",
  /** Smooth — for slow drifts (marquees, ambient). */
  smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const

/** Typical durations in ms. */
export const duration = {
  fast: 150,
  base: 250,
  slow: 400,
  entrance: 700,
} as const

// ─── Convenience re-exports for inline-style usage ───────────────────

/**
 * The original `t` object from V2HomePage.tsx, preserved verbatim so
 * existing pages can drop their local copies and import this instead.
 */
export const t = {
  charcoal: ink.primary,
  midnight: ink.midnight,
  midGray: ink.faded,
  lightGray: surface.muted,
  white: surface.white,
  accent: accent.primary,
  shadowCard: shadow.card,
  shadowCardHover: shadow.cardHover,
  shadowButton: shadow.subtle,
} as const
