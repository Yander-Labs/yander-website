import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

/**
 * Eyebrow — mono uppercase caption used above section headlines.
 * Matches the homepage's "01 Source" / "AI-POWERED GLOBAL RECRUITING"
 * pattern.
 *
 * <Eyebrow number="01">Source</Eyebrow>
 * <Eyebrow>AI-Powered Global Recruiting</Eyebrow>
 * <Eyebrow tone="accent">New release</Eyebrow>
 */
export function Eyebrow({
  children,
  number,
  tone = "muted",
  className,
  centered = false,
}: {
  children: ReactNode
  number?: string
  tone?: "muted" | "ink" | "accent"
  className?: string
  centered?: boolean
}) {
  return (
    <p
      className={cn(
        "inline-flex items-baseline gap-2 font-[var(--font-geist-mono)] text-[11px] uppercase tracking-[0.22em]",
        tone === "muted" && "text-[var(--color-ink-disabled)]",
        tone === "ink" && "text-[var(--color-ink-faded)]",
        tone === "accent" && "text-[var(--color-accent-rust)]",
        centered && "justify-center",
        className,
      )}
    >
      {number && (
        <span className="font-[var(--font-geist-mono)] text-[var(--color-ink-disabled)]">
          {number}
        </span>
      )}
      {number && <span className="h-px w-6 bg-[var(--color-border-canon)]" />}
      <span>{children}</span>
    </p>
  )
}
