import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Integration } from "@/lib/integrations";

interface IntegrationCardProps {
  integration: Integration;
  className?: string;
}

export function IntegrationCard({ integration, className }: IntegrationCardProps) {
  return (
    <Link
      href={`/integrations/${integration.slug}`}
      className={cn(
        "group block rounded-2xl border border-[#E4E7EC] bg-white p-6 shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl border border-[#E4E7EC] bg-gray-50 flex items-center justify-center overflow-hidden p-1.5">
          <Image
            src={integration.logo}
            alt={integration.name}
            width={80}
            height={80}
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-semibold text-gray-900">
              {integration.name}
            </h3>
            {integration.isImportOnly && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-purple-50 text-purple-700">
                Import Only
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {integration.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
