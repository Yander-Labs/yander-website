"use client";

import { AnimatedSection, StaggerContainer, StaggerItem } from "../ui/AnimatedSection";
import { Container } from "../ui/Container";
import { IntegrationCard } from "../ui/IntegrationCard";
import type { Integration } from "@/lib/integrations";
import { cn } from "@/lib/utils";

interface IntegrationsCategorySectionProps {
  label: string;
  heading: string;
  description: string;
  integrations: Integration[];
  alternate?: boolean;
}

export function IntegrationsCategorySection({
  label,
  heading,
  description,
  integrations,
  alternate = false,
}: IntegrationsCategorySectionProps) {
  return (
    <section className={cn("py-16 md:py-20", alternate ? "bg-[#fafafa]" : "bg-white")}>
      <Container>
        <AnimatedSection>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-[0.15em] mb-3">
            {label}
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-[-0.02em]">
            {heading}
          </h2>
          <p className="mt-3 text-base text-gray-500 max-w-2xl">
            {description}
          </p>
        </AnimatedSection>

        <StaggerContainer className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map((integration) => (
            <StaggerItem key={integration.slug}>
              <IntegrationCard integration={integration} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
