"use client";

import { AnimatedSection } from "../ui/AnimatedSection";
import { Container } from "../ui/Container";
import { Fragment } from "react";

interface Integration {
  name: string;
  logo: string;
  height: number;
}

const integrations: Integration[] = [
  { name: "Slack", logo: "/logos/slack.svg", height: 28 },
  { name: "Gmail", logo: "/logos/gmail.svg", height: 24 },
  { name: "Notion", logo: "/logos/notion.svg", height: 28 },
  { name: "Zoom", logo: "/logos/zoom.svg", height: 18 },
  { name: "Google Meet", logo: "/logos/google-meet.png", height: 22 },
  { name: "ClickUp", logo: "/logos/clickup.svg", height: 20 },
  { name: "Monday.com", logo: "/logos/monday.svg", height: 20 },
];

export function Integrations() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <Container>
        <AnimatedSection>
          <p className="text-center text-[10px] text-gray-400 uppercase tracking-[0.15em] mb-6">
            Connects with the tools your team already uses
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 md:gap-x-10">
            {integrations.map((integration, idx) => (
              <Fragment key={integration.name}>
                <div className="flex items-center justify-center h-10 px-2">
                  <img
                    src={integration.logo}
                    alt={integration.name}
                    style={{ height: integration.height }}
                    className="w-auto"
                  />
                </div>
                {idx < integrations.length - 1 && (
                  <div className="hidden md:block h-8 w-px bg-gray-200" />
                )}
              </Fragment>
            ))}
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
