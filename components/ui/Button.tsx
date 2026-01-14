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
          "inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900/20 disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-gray-900 text-white hover:bg-gray-800 shadow-sm hover:shadow":
              variant === "primary",
            "bg-white text-gray-900 border border-[#E4E7EC] hover:bg-gray-50 hover:border-gray-300 shadow-sm":
              variant === "secondary",
            "border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white":
              variant === "outline",
            "text-gray-600 hover:text-gray-900 hover:bg-gray-50":
              variant === "ghost",
          },
          {
            "px-4 py-2 text-sm": size === "sm",
            "px-5 py-2.5 text-sm": size === "md",
            "px-6 py-3 text-base": size === "lg",
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
