import type { Metadata } from "next";
import { IntegrationsHero } from "@/components/sections/IntegrationsHero";
import { IntegrationsCategorySection } from "@/components/sections/IntegrationsCategorySection";
import { DarkCTA } from "@/components/sections/DarkCTA";
import { getIntegrationsByCategory, categories } from "@/lib/integrations";

export const metadata: Metadata = {
  title: "Integrations | Yander",
  description:
    "Connect Yander with Slack, Gmail, Notion, ClickUp, Monday.com, Asana, Fathom, and Fireflies. One dashboard for all your team and client data.",
  openGraph: {
    title: "Integrations | Yander",
    description:
      "Connect Yander with the tools your team already uses. Communication, project management, and meeting tools in one dashboard.",
  },
};

const categoryHeadings: Record<string, string> = {
  communication: "Communication tools",
  "project-management": "Project management",
  "meeting-import": "Meeting recordings",
};

export default function IntegrationsPage() {
  return (
    <>
      <IntegrationsHero />
      {categories.map((cat, idx) => (
        <IntegrationsCategorySection
          key={cat.value}
          label={cat.label}
          heading={categoryHeadings[cat.value]}
          description={cat.description}
          integrations={getIntegrationsByCategory(cat.value)}
          alternate={idx % 2 === 1}
        />
      ))}
      <DarkCTA />
    </>
  );
}
