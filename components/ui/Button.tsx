"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg" | "xl";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 rounded-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900/20 disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-gray-900 text-white hover:bg-gray-800":
              variant === "primary",
            "bg-white text-gray-900 border border-[#e5e5e5] hover:bg-gray-50 hover:border-gray-300":
              variant === "secondary",
            "border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white":
              variant === "outline",
            "text-gray-600 hover:text-gray-900 hover:bg-gray-50":
              variant === "ghost",
            "bg-[var(--color-accent-primary)] text-white hover:opacity-90":
              variant === "accent",
          },
          {
            "px-4 py-2.5 text-sm min-h-[44px]": size === "sm",
            "px-5 py-3 text-sm min-h-[44px]": size === "md",
            "px-6 py-3.5 text-base min-h-[48px]": size === "lg",
            /** Homepage hero/CTA size — px-8 py-4 base, 52px min-height. */
            "px-8 py-4 text-base min-h-[52px]": size === "xl",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
