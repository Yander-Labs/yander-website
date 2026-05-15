import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SITE_URL } from "@/lib/site";

export interface BreadcrumbItem {
  /** Display label. */
  name: string;
  /** Path beginning with / for internal links. Omit on the current page (last item). */
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Renders a visible breadcrumb trail AND emits BreadcrumbList JSON-LD.
 * Always pass the full chain starting at "Home" — the schema needs the root item.
 */
export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center gap-1.5 text-sm text-gray-500 ${className}`}
      >
        <ol className="flex items-center gap-1.5 flex-wrap">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={`${item.name}-${i}`} className="flex items-center gap-1.5">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-gray-900 transition-colors"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span
                    className={isLast ? "text-gray-900 font-medium" : ""}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.name}
                  </span>
                )}
                {!isLast && (
                  <ChevronRight
                    className="w-3.5 h-3.5 text-gray-400"
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
