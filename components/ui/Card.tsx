import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  variant?: "default" | "elevated" | "outlined";
}

export function Card({ children, className, hover = false, variant = "default" }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-[12px] border border-[#e5e5e5]",
        {
          "shadow-subtle": variant === "default",
          "shadow-card": variant === "elevated",
          "": variant === "outlined",
        },
        hover && "transition-all duration-150 hover:shadow-card hover:-translate-y-0.5 hover:border-gray-300",
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
