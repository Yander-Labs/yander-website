"use client";

import { AnimatedSection } from "../ui/AnimatedSection";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { SectionLabel } from "../ui/SectionLabel";
import { MiniChart } from "../ui/MiniChart";
import { useWaitlistModal } from "../ui/WaitlistModal";
import { Check, TrendingUp, MessageCircle, Zap, Clock, ChevronRight } from "lucide-react";

const features = [
  "Works with Slack, Gmail, and your existing meeting tools",
  "No extra workflows for your team to learn",
  "See engagement and collaboration patterns at a glance",
  "Calibrate team health with objective, data-driven insights",
];

const signals = [
  {
    type: "success",
    icon: TrendingUp,
    title: "Strong Collaboration",
    message: "Sarah's Slack response time improved 40% this week.",
    time: "2 hours ago",
    trend: [4, 5, 6, 6, 7, 8, 9],
    metric: "+40%",
  },
  {
    type: "warning",
    icon: MessageCircle,
    title: "Check-In Recommended",
    message: "Asad's meeting participation dropped. Consider a 1:1.",
    time: "4 hours ago",
    trend: [8, 7, 6, 5, 4, 4, 3],
    metric: "-62%",
  },
  {
    type: "info",
    icon: Zap,
    title: "Team Momentum",
    message: "Cross-team collaboration is up 12% this month.",
    time: "Today",
    trend: [6, 6, 7, 7, 8, 8, 9],
    metric: "+12%",
  },
];

export function BuiltForRemote() {
  const { openModal } = useWaitlistModal();

  return (
    <section className="py-20 md:py-28 bg-[#fafafa] border-y border-[#e5e5e5] relative">
      {/* Peec.ai signature gradient overlay */}
      <div className="absolute inset-0 bg-peec-gradient-subtle pointer-events-none" />
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <AnimatedSection direction="left">
            <SectionLabel number="04">Built for Remote Teams</SectionLabel>
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-5 leading-tight">
              Understand Engagement Without Micromanaging
            </h2>
            <p className="text-base text-gray-500 mb-8 leading-relaxed">
              Remote work makes it harder to see who&apos;s thriving, who&apos;s
              stuck, and where collaboration is breaking down. Yander turns
              message patterns, meeting behavior, and response times into simple
              engagement insights for every person on your team.
            </p>

            <ul className="space-y-3 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-gray-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>

            <Button onClick={openModal}>Get Engagement Insights</Button>
          </AnimatedSection>

          {/* Visual - Enhanced Engagement Signals */}
          <AnimatedSection direction="right" delay={0.2}>
            <div className="relative">
              {/* Main Card */}
              <div className="bg-white rounded-[12px] border border-[#e5e5e5] shadow-[rgba(23,23,23,0.04)_0px_4px_4px_0px] overflow-hidden">
                {/* Card Header */}
                <div className="px-5 py-4 border-b border-[#E4E7EC]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      Engagement Signals
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>Real-time</span>
                    </div>
                  </div>
                </div>

                {/* Signals List */}
                <div className="p-4 space-y-3">
                  {signals.map((signal) => (
                    <div
                      key={signal.title}
                      className="group relative bg-white p-4 border-b border-[#E4E7EC] last:border-b-0 hover:bg-gray-50/50 transition-colors duration-150"
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon - Grayscale with status dot */}
                        <div className="relative flex-shrink-0">
                          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                            <signal.icon className="w-4 h-4 text-gray-500" />
                          </div>
                          {/* Tiny status indicator dot */}
                          <div
                            className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border-2 border-white ${
                              signal.type === "success"
                                ? "bg-emerald-500"
                                : signal.type === "warning"
                                ? "bg-amber-500"
                                : "bg-gray-400"
                            }`}
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-medium text-gray-900">
                              {signal.title}
                            </p>
                            {/* Metric badge - Strategic color accent */}
                            <span
                              className={`text-xs font-semibold px-1.5 py-0.5 rounded border ${
                                signal.type === "success"
                                  ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                  : signal.type === "warning"
                                  ? "bg-amber-50 text-amber-600 border-amber-100"
                                  : "bg-gray-100 text-gray-600 border-gray-200"
                              }`}
                            >
                              {signal.metric}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 leading-relaxed">
                            {signal.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1.5">
                            {signal.time}
                          </p>
                        </div>

                        {/* Mini trend chart - Functional color for data viz (hidden on mobile) */}
                        <div className="hidden sm:block flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                          <MiniChart
                            data={signal.trend}
                            width={48}
                            height={24}
                            strokeWidth={1.5}
                            showDot={false}
                            color={
                              signal.type === "success"
                                ? "#10b981"
                                : signal.type === "warning"
                                ? "#f59e0b"
                                : "#6b7280"
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Card Footer */}
                <div className="px-5 py-3 border-t border-[#e5e5e5] bg-gray-50/50">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">3 new signals today</span>
                    <button className="text-gray-600 font-medium hover:text-gray-900 transition-colors flex items-center gap-0.5">
                      View all
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
