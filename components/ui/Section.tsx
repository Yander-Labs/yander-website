import { cn } from "@/lib/utils"
import type { ReactNode } from "react"
import { Container } from "./Container"

/**
 * Section — wraps a page section with consistent vertical padding,
 * background tone, and container sizing.
 *
 * <Section>...</Section>                              // default padding
 * <Section size="lg" tone="muted">...</Section>       // bigger hero/CTA
 * <Section bare>...</Section>                          // padding only, no Container
 */
export function Section({
  children,
  size = "md",
  tone = "default",
  className,
  bare = false,
  containerSize,
}: {
  children: ReactNode
  /** Vertical padding scale. */
  size?: "sm" | "md" | "lg"
  /** Background tone. */
  tone?: "default" | "subtle" | "muted" | "ink"
  className?: string
  /** Skip the Container wrapper — render children flush. */
  bare?: boolean
  /** Forwarded to Container. */
  containerSize?: "default" | "narrow" | "wide"
}) {
  const padding =
    size === "sm"
      ? "py-12 md:py-16"
      : size === "lg"
        ? "py-24 md:py-32"
        : "py-20 md:py-28"

  const bg =
    tone === "subtle"
      ? "bg-[var(--color-surface-subtle)]"
      : tone === "muted"
        ? "bg-[var(--color-surface-muted)]"
        : tone === "ink"
          ? "bg-[var(--color-ink-midnight)] text-white"
          : "bg-white"

  return (
    <section className={cn(padding, bg, className)}>
      {bare ? children : <Container size={containerSize}>{children}</Container>}
    </section>
  )
}
