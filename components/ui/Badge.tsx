import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "outline" | "blue" | "subtle";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "md",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-md",
        {
          "bg-gray-100 text-gray-600": variant === "default",
          "bg-emerald-50 text-emerald-700": variant === "success",
          "bg-amber-50 text-amber-700": variant === "warning",
          "bg-red-50 text-red-700": variant === "danger",
          "border border-[#e5e5e5] text-gray-500 bg-white": variant === "outline",
          "bg-blue-50 text-blue-700": variant === "blue",
          "bg-gray-50 text-gray-500 border border-gray-100": variant === "subtle",
        },
        {
          "px-2 py-0.5 text-xs": size === "sm",
          "px-2.5 py-1 text-xs": size === "md",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
