"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  Users,
  TrendingUp,
  Shield,
  AlertTriangle,
  BarChart3,
  Zap,
} from "lucide-react";

const useCases = [
  {
    icon: Users,
    title: "Marketing Teams",
    description:
      "Keep distributed creative teams engaged and prevent account churn before it happens.",
    challenges: [
      "Remote creatives working across time zones",
      "High-pressure client deadlines causing burnout",
      "Difficulty spotting disengagement before resignations",
    ],
    outcomes: [
      "73% reduction in surprise resignations",
      "Early warning when team members disengage",
      "Protect client relationships by maintaining team stability",
    ],
  },
  {
    icon: TrendingUp,
    title: "Tech Startups",
    description:
      "Scale your engineering team without losing the culture that made you successful.",
    challenges: [
      "Rapid hiring makes it hard to maintain culture",
      "Remote-first teams lack visibility into team health",
      "Engineers burning out during crunch periods",
    ],
    outcomes: [
      "Real-time pulse on team sentiment",
      "Identify workload imbalances before they cause problems",
      "Data-driven 1:1s that address real issues",
    ],
  },
  {
    icon: Shield,
    title: "Professional Services",
    description:
      "Maintain billable utilization while keeping your consultants healthy and engaged.",
    challenges: [
      "Consultants spread across multiple client sites",
      "Utilization pressure leads to burnout",
      "Hard to build team cohesion when everyone's remote",
    ],
    outcomes: [
      "Balance utilization with wellbeing metrics",
      "Spot collaboration gaps between team members",
      "Proactive check-ins based on engagement signals",
    ],
  },
  {
    icon: Zap,
    title: "Product Teams",
    description: "Ship faster by understanding what's slowing your team down.",
    challenges: [
      "Async communication creates information silos",
      "Meeting overload kills deep work time",
      "Hard to know if the team is actually aligned",
    ],
    outcomes: [
      "Visibility into collaboration patterns",
      "Identify meeting-heavy weeks automatically",
      "Understand team energy levels across sprints",
    ],
  },
];

export function PulseUseCases() {
  return (
    <section id="use-cases" className="py-20 md:py-28 scroll-mt-24">
      <Container>
        <div className="text-center mb-16">
          <SectionLabel number="04" centered>
            Use Cases
          </SectionLabel>
          <h2 className="font-medium text-3xl md:text-4xl lg:text-5xl text-[#171717] tracking-[-0.02em] max-w-3xl mx-auto">
            Built for teams that work remotely
          </h2>
          <p className="mt-4 text-lg text-[#171717]/60 max-w-2xl mx-auto">
            Whether you&apos;re a 10-person startup or a 500-person team, Yander
            helps you understand what&apos;s really happening with your team —
            without surveillance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl border border-[rgba(0,0,0,0.06)] bg-white p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#F7F7F6] flex items-center justify-center">
                  <useCase.icon className="w-6 h-6 text-[#171717]/70" />
                </div>
                <h3 className="font-medium text-2xl text-[#171717]">
                  {useCase.title}
                </h3>
              </div>

              <p className="text-[#171717]/60 mb-6">{useCase.description}</p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-[#171717]/50 uppercase tracking-wide mb-3">
                    Challenges
                  </h4>
                  <ul className="space-y-2">
                    {useCase.challenges.map((challenge) => (
                      <li
                        key={challenge}
                        className="flex items-start gap-2 text-sm text-[#171717]/60"
                      >
                        <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-[#171717]/50 uppercase tracking-wide mb-3">
                    Outcomes with Yander
                  </h4>
                  <ul className="space-y-2">
                    {useCase.outcomes.map((outcome) => (
                      <li
                        key={outcome}
                        className="flex items-start gap-2 text-sm text-[#171717]/60"
                      >
                        <BarChart3 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
