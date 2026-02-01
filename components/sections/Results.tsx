"use client";

import { AnimatedSection, StaggerContainer, StaggerItem } from "../ui/AnimatedSection";
import { Container } from "../ui/Container";
import { SectionLabel } from "../ui/SectionLabel";
import { AnimatedNumber } from "../ui/AnimatedNumber";
import { TrendingUp, Clock, Users, ArrowUpRight } from "lucide-react";

const stats = [
  {
    value: 30,
    suffix: "%",
    label: "Increase in Retention",
    description: "Spot disengagement before people quit",
    icon: TrendingUp,
    color: "emerald",
    trend: "+12% vs last quarter",
  },
  {
    value: 8,
    suffix: "hrs",
    label: "Saved per Employee/Month",
    description: "Reclaim time lost to broken workflows and meetings",
    icon: Clock,
    color: "blue",
    trend: "Average across teams",
  },
  {
    value: 64,
    suffix: "%",
    label: "Collaboration Improvement",
    description: "Collaborative teams deliver better client work",
    icon: Users,
    color: "purple",
    trend: "Stronger team",
  },
];

export function Results() {
  return (
    <section className="py-20 md:py-28 bg-[#fafafa] border-y border-[#e5e5e5] overflow-hidden relative">
      {/* Peec.ai signature gradient overlay */}
      <div className="absolute inset-0 bg-peec-gradient-subtle pointer-events-none" />
      <Container>
        <AnimatedSection className="text-center mb-14">
          <SectionLabel number="03" centered>Proven Results</SectionLabel>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gray-900">
            Real Teams. Real Results.
          </h2>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <StaggerItem key={stat.label}>
              <div className="group relative bg-white rounded-[12px] p-8 text-center border border-[#e5e5e5] shadow-[rgba(23,23,23,0.04)_0px_4px_4px_0px] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
                {/* Background decoration */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  stat.color === "emerald" ? "bg-emerald-500/10" :
                  stat.color === "blue" ? "bg-blue-500/10" :
                  "bg-purple-500/10"
                }`} />

                {/* Icon badge */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-6 mx-auto ${
                  stat.color === "emerald" ? "bg-emerald-50 border border-emerald-100" :
                  stat.color === "blue" ? "bg-blue-50 border border-blue-100" :
                  "bg-purple-50 border border-purple-100"
                }`}>
                  <stat.icon className={`w-5 h-5 ${
                    stat.color === "emerald" ? "text-emerald-600" :
                    stat.color === "blue" ? "text-blue-600" :
                    "text-purple-600"
                  }`} />
                </div>

                {/* Animated number */}
                <div className="relative mb-3">
                  <AnimatedNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={1500}
                    delay={idx * 200}
                    className={`font-serif text-5xl md:text-6xl tracking-tight ${
                      stat.color === "emerald" ? "text-emerald-600" :
                      stat.color === "blue" ? "text-blue-600" :
                      "text-purple-600"
                    }`}
                  />
                </div>

                <p className="text-sm font-semibold text-gray-900 mb-2">
                  {stat.label}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  {stat.description}
                </p>

                {/* Trend indicator */}
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-medium ${
                  stat.color === "emerald" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                  stat.color === "blue" ? "bg-blue-50 text-blue-700 border border-blue-100" :
                  "bg-purple-50 text-purple-700 border border-purple-100"
                }`}>
                  <ArrowUpRight className="w-3 h-3" />
                  {stat.trend}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </Container>
    </section>
  );
}
