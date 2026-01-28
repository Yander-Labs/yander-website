"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-150 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900/20 disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-gray-900 text-white hover:bg-gray-800":
              variant === "primary",
            "bg-white text-gray-900 border border-[#e5e5e5] hover:bg-gray-50 hover:border-gray-300":
              variant === "secondary",
            "border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white":
              variant === "outline",
            "text-gray-600 hover:text-gray-900 hover:bg-gray-50":
              variant === "ghost",
          },
          {
            "px-4 py-2.5 text-sm min-h-[44px]": size === "sm",
            "px-5 py-3 text-sm min-h-[44px]": size === "md",
            "px-6 py-3.5 text-base min-h-[48px]": size === "lg",
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
