"use client";

import { AnimatedSection, StaggerContainer, StaggerItem } from "../ui/AnimatedSection";
import { Container } from "../ui/Container";
import { SectionLabel } from "../ui/SectionLabel";
import { Link2, Users, BarChart3 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Link2,
    title: "Connect Your Tools",
    description:
      "Link Slack, Gmail, and our free AI meeting recorder in just a few clicks.",
  },
  {
    number: "02",
    icon: Users,
    title: "Import Your Team",
    description:
      "One-click Slack import pulls your team automatically. Toggle on the criteria you want to track.",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Get Daily Insights",
    description:
      "Your dashboard updates daily so you can spot issues early, increase team productivity, and keep your best people.",
  },
];

export function GetStarted() {
  return (
    <section className="py-20 md:py-28 bg-gray-50/70 border-y border-[#E4E7EC]">
      <Container>
        <AnimatedSection className="text-center mb-14">
          <SectionLabel number="08" centered>Getting Started</SectionLabel>
          <h2 className="font-serif text-3xl md:text-4xl text-gray-900">
            Get Started in 3 Simple Steps
          </h2>
          <p className="mt-4 text-base text-gray-500">
            Set up takes less than 10 minutes. Start getting insights immediately.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step, idx) => (
            <StaggerItem key={step.number}>
              <div className="relative bg-white rounded-xl p-6 border border-[#E4E7EC] hover:border-gray-300 transition-all duration-150 h-full">
                {/* Connector line */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 border-t border-dashed border-gray-300" />
                )}

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-serif text-gray-200">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
