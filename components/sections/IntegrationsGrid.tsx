"use client";

import { useState } from "react";
import { IntegrationCard } from "../ui/IntegrationCard";
import { integrations, categories } from "@/lib/integrations";
import type { IntegrationCategory } from "@/lib/integrations";
import { cn } from "@/lib/utils";

export function IntegrationsGrid() {
  const [activeFilter, setActiveFilter] = useState<IntegrationCategory | "all">("all");

  const filtered =
    activeFilter === "all"
      ? integrations
      : integrations.filter((i) => i.category === activeFilter);

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveFilter("all")}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            activeFilter === "all"
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveFilter(cat.value)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              activeFilter === cat.value
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((integration) => (
          <IntegrationCard key={integration.slug} integration={integration} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 py-12">No integrations found.</p>
      )}
    </div>
  );
}
