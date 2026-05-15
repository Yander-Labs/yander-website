import { Container } from "@/components/ui/Container";
import { IntegrationsGrid } from "@/components/sections/IntegrationsGrid";
import { DarkCTA } from "@/components/sections/DarkCTA";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaJsonLd } from "@/components/seo/SchemaJsonLd";
import { pageMetadata } from "@/lib/page-metadata";
import { SITE_URL } from "@/lib/site";
import { integrations } from "@/lib/integrations";

export const metadata = pageMetadata({
  title: "All Yander Integrations — Filter Every Connected Tool",
  description:
    "Every Yander integration in one place. Filter by communication, project management, and meeting tools — and see exactly what data each integration pulls.",
  path: "/integrations/all",
  ogImageAlt: "All Yander Integrations",
});

const allIntegrationsListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "All Yander integrations",
  numberOfItems: integrations.length,
  itemListElement: integrations.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE_URL}/integrations/${it.slug}`,
    name: it.name,
  })),
};

export default function AllIntegrationsPage() {
  return (
    <>
      <SchemaJsonLd schema={allIntegrationsListSchema} />
      <section className="pt-32 pb-8 md:pt-40 md:pb-12 bg-white">
        <Container>
          <Breadcrumbs
            className="mb-6"
            items={[
              { name: "Home", href: "/" },
              { name: "Integrations", href: "/integrations" },
              { name: "All integrations" },
            ]}
          />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 tracking-[-0.02em]">
            All integrations
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl">
            Browse and filter every tool Yander connects with to build your team health dashboard.
          </p>
        </Container>
      </section>

      <section className="pb-20 md:pb-28 bg-white">
        <Container>
          <IntegrationsGrid />
        </Container>
      </section>

      <DarkCTA />
    </>
  );
}
