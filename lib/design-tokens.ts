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

/** Ink — the dark palette used for text, primary buttons, borders. */
export const ink = {
  /** Headlines, primary buttons (#242424). Cal.com-charcoal. */
  primary: "#242424",
  /** Reserved for the darkest elements — final-CTA backgrounds (#111111). */
  midnight: "#111111",
  /** Body copy on light bg (#525252). */
  secondary: "#525252",
  /** De-emphasized body, caption text (#737373). */
  muted: "#737373",
  /** Tertiary labels, faded metadata (#898989). */
  faded: "#898989",
  /** Disabled state, dividers in subtle contexts (#d4d4d4). */
  disabled: "#d4d4d4",
} as const

/** Surface — backgrounds and panel fills. */
export const surface = {
  /** Default page bg. */
  white: "#ffffff",
  /** Light neutral — section backgrounds, hover states (#fafafa). */
  subtle: "#fafafa",
  /** One step darker — comparison cards, inert panels (#f5f5f5). */
  muted: "#f5f5f5",
} as const

/** Borders — hairlines, dividers, container outlines. */
export const border = {
  /** Default — most cards and dividers (#e5e5e5 ~ rgba(0,0,0,0.07)). */
  default: "rgba(34, 42, 53, 0.08)",
  /** Lighter, used inside cards (#f5f5f5). */
  subtle: "rgba(0, 0, 0, 0.06)",
  /** Stronger, for interactive button outlines. */
  strong: "rgba(0, 0, 0, 0.12)",
} as const

/** Accent — used sparingly for the brand "wow" moments. */
export const accent = {
  /** Deep purple — Yander's primary brand accent (#1e1044). */
  primary: "#1e1044",
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
