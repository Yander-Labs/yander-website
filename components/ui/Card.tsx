import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  /**
   * Card visual treatment.
   *
   * - `default`  — rounded 12px, soft shadow. Legacy default.
   * - `elevated` — rounded 12px, stronger shadow.
   * - `outlined` — rounded 12px, no shadow.
   * - `squared`  — homepage canon: rounded-none, canonical hairline-ring shadow.
   *                Use this on the homepage and any page that wants to match it.
   * - `mockup`   — for floating product mockup windows (hero candidate window,
   *                deep-dive feature mockups). Rounded 16px + heavy soft drop.
   */
  variant?: "default" | "elevated" | "outlined" | "squared" | "mockup";
}

export function Card({ children, className, hover = false, variant = "default" }: CardProps) {
  const isSquared = variant === "squared";
  const isMockup = variant === "mockup";

  return (
    <div
      className={cn(
        "bg-white",
        // Radius
        isSquared
          ? "rounded-none"
          : isMockup
            ? "rounded-[16px]"
            : "rounded-[12px]",
        // Border
        isSquared
          ? "border border-[var(--color-border-canon)]"
          : isMockup
            ? "border border-[var(--color-border-canon-subtle)]"
            : "border border-[#e5e5e5]",
        // Shadow (per variant)
        {
          "shadow-subtle": variant === "default",
          "shadow-card": variant === "elevated",
          "": variant === "outlined",
          "shadow-[var(--shadow-canon-card)]": isSquared,
          "shadow-[var(--shadow-canon-mockup)]": isMockup,
        },
        // Hover treatment
        hover &&
          (isSquared
            ? "transition-all duration-150 hover:shadow-[var(--shadow-canon-card-hover)] hover:-translate-y-0.5"
            : "transition-all duration-150 hover:shadow-card hover:-translate-y-0.5 hover:border-gray-300"),
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("px-6 pt-6", className)}>{children}</div>;
}

export function CardContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("px-6 py-4", className)}>{children}</div>;
}

export function CardFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("px-6 pb-6", className)}>{children}</div>;
}
