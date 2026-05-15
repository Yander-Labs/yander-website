import { IntegrationsHero } from "@/components/sections/IntegrationsHero";
import { IntegrationsCategorySection } from "@/components/sections/IntegrationsCategorySection";
import { DarkCTA } from "@/components/sections/DarkCTA";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaJsonLd } from "@/components/seo/SchemaJsonLd";
import { getIntegrationsByCategory, categories, integrations } from "@/lib/integrations";
import { pageMetadata } from "@/lib/page-metadata";
import { SITE_URL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Yander Integrations — Slack, Notion, ClickUp, Monday, Asana",
  description:
    "Connect Yander with Slack, Notion, ClickUp, Monday, Asana, Gmail, Microsoft 365, Fathom, Fireflies. Pull team activity into one dashboard, no manual entry.",
  path: "/integrations",
  ogImageAlt: "Yander Integrations",
});

const categoryHeadings: Record<string, string> = {
  communication: "Communication tools",
  "project-management": "Project management",
  "meeting-import": "Meeting recordings",
};

const integrationsListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Yander integrations",
  description:
    "All third-party tools that Yander connects with for team activity, communication, and meetings.",
  numberOfItems: integrations.length,
  itemListElement: integrations.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "SoftwareApplication",
      name: it.name,
      url: `${SITE_URL}/integrations/${it.slug}`,
      applicationCategory: it.categoryLabel,
    },
  })),
};

export default function IntegrationsPage() {
  return (
    <>
      <SchemaJsonLd schema={integrationsListSchema} />
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
