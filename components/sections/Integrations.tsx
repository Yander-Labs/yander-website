"use client";

import { AnimatedSection, StaggerContainer, StaggerItem } from "../ui/AnimatedSection";
import { Container } from "../ui/Container";
import {
  SlackLogo,
  GmailLogo,
  NotionLogo,
  ZoomLogo,
  GoogleMeetLogo,
} from "../icons/BrandLogos";
import { ComponentType } from "react";

interface Integration {
  name: string;
  Logo: ComponentType<{ size?: number }>;
  bgColor: string;
}

const integrations: Integration[] = [
  { name: "Slack", Logo: SlackLogo, bgColor: "bg-[#4A154B]/5" },
  { name: "Gmail", Logo: GmailLogo, bgColor: "bg-red-50" },
  { name: "Notion", Logo: NotionLogo, bgColor: "bg-gray-50" },
  { name: "Zoom", Logo: ZoomLogo, bgColor: "bg-blue-50" },
  { name: "Google Meet", Logo: GoogleMeetLogo, bgColor: "bg-green-50" },
];

export function Integrations() {
  return (
    <section className="py-16 md:py-20">
      <Container size="narrow">
        <AnimatedSection className="text-center mb-10">
          <h2 className="font-serif text-2xl md:text-3xl text-gray-900">
            Connects with the tools your team already uses
          </h2>
        </AnimatedSection>

        <StaggerContainer className="flex flex-wrap items-center justify-center gap-4">
          {integrations.map((integration) => (
            <StaggerItem key={integration.name}>
              <div className="group flex items-center gap-3 px-3 sm:px-5 py-3 bg-white rounded-xl border border-[#E4E7EC] hover:border-gray-300 hover:shadow-md transition-all duration-200">
                <div className={`p-2.5 rounded-xl ${integration.bgColor}`}>
                  <integration.Logo size={24} />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                  {integration.name}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
