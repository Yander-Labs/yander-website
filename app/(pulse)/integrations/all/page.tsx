import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { IntegrationsGrid } from "@/components/sections/IntegrationsGrid";
import { DarkCTA } from "@/components/sections/DarkCTA";

export const metadata: Metadata = {
  title: "All Integrations | Yander",
  description:
    "Browse all Yander integrations. Filter by communication, project management, and meeting import tools.",
  openGraph: {
    title: "All Integrations | Yander",
    description:
      "Browse all Yander integrations. Filter by category and find the tools your team uses.",
  },
};

export default function AllIntegrationsPage() {
  return (
    <>
      <section className="pt-32 pb-8 md:pt-40 md:pb-12 bg-white">
        <Container>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 tracking-[-0.02em]">
            All integrations
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl">
            Browse and filter all the tools Yander connects with to build your team health dashboard.
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
