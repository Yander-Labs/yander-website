import { cn } from "@/lib/utils";

interface SectionLabelProps {
  number?: string;
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
}

export function SectionLabel({ number, children, className, centered = false }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-2 mb-4", centered && "justify-center", className)}>
      {number && (
        <span className="text-xs font-medium text-gray-300 tracking-wider font-mono">
          [{number}]
        </span>
      )}
      <span className="text-xs font-medium text-gray-500 uppercase tracking-[0.1em]">
        {children}
      </span>
    </div>
  );
}
