"use client";

import { AnimatedSection } from "../ui/AnimatedSection";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { SectionLabel } from "../ui/SectionLabel";
import { MiniChart } from "../ui/MiniChart";
import { Check, TrendingUp, MessageCircle, Zap, Clock, ArrowUpRight } from "lucide-react";

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
                  <div className="w-5 h-5 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-emerald-600" />
                  </div>
                  <span className="text-sm text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>

            <Button>Get Engagement Insights</Button>
          </AnimatedSection>

          {/* Visual - Enhanced Engagement Signals */}
          <AnimatedSection direction="right" delay={0.2}>
            <div className="relative">
              {/* Main Card */}
              <div className="bg-white rounded-[12px] border border-[#e5e5e5] shadow-[rgba(23,23,23,0.04)_0px_4px_4px_0px] overflow-hidden">
                {/* Card Header */}
                <div className="px-5 py-4 border-b border-[#e5e5e5] bg-gradient-to-r from-gray-50 via-white to-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Engagement Signals
                      </span>
                    </div>
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
                      className={`group relative overflow-hidden rounded-lg border transition-all duration-200 hover:shadow-subtle ${
                        signal.type === "success"
                          ? "bg-gradient-to-r from-emerald-50 to-emerald-50/30 border-emerald-100 hover:border-emerald-200"
                          : signal.type === "warning"
                          ? "bg-gradient-to-r from-amber-50 to-amber-50/30 border-amber-100 hover:border-amber-200"
                          : "bg-gradient-to-r from-blue-50 to-blue-50/30 border-blue-100 hover:border-blue-200"
                      }`}
                    >
                      {/* Left accent bar */}
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-1 ${
                          signal.type === "success"
                            ? "bg-emerald-500"
                            : signal.type === "warning"
                            ? "bg-amber-500"
                            : "bg-blue-500"
                        }`}
                      />

                      <div className="p-4 pl-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3">
                            {/* Icon with glow */}
                            <div
                              className={`relative w-9 h-9 rounded-lg flex items-center justify-center ${
                                signal.type === "success"
                                  ? "bg-emerald-100"
                                  : signal.type === "warning"
                                  ? "bg-amber-100"
                                  : "bg-blue-100"
                              }`}
                            >
                              <signal.icon
                                className={`w-4 h-4 ${
                                  signal.type === "success"
                                    ? "text-emerald-600"
                                    : signal.type === "warning"
                                    ? "text-amber-600"
                                    : "text-blue-600"
                                }`}
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p
                                  className={`text-sm font-semibold ${
                                    signal.type === "success"
                                      ? "text-emerald-800"
                                      : signal.type === "warning"
                                      ? "text-amber-800"
                                      : "text-blue-800"
                                  }`}
                                >
                                  {signal.title}
                                </p>
                                <span
                                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                    signal.type === "success"
                                      ? "bg-emerald-200/50 text-emerald-700"
                                      : signal.type === "warning"
                                      ? "bg-amber-200/50 text-amber-700"
                                      : "bg-blue-200/50 text-blue-700"
                                  }`}
                                >
                                  {signal.metric}
                                </span>
                              </div>
                              <p
                                className={`text-xs leading-relaxed ${
                                  signal.type === "success"
                                    ? "text-emerald-700/80"
                                    : signal.type === "warning"
                                    ? "text-amber-700/80"
                                    : "text-blue-700/80"
                                }`}
                              >
                                {signal.message}
                              </p>
                              <p className="text-[10px] text-gray-400 mt-1.5">
                                {signal.time}
                              </p>
                            </div>
                          </div>

                          {/* Mini trend chart */}
                          <div className="flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
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
                                  : "#3b82f6"
                              }
                            />
                          </div>
                        </div>
                      </div>

                      {/* Hover arrow */}
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0 translate-x-2">
                        <ArrowUpRight
                          className={`w-4 h-4 ${
                            signal.type === "success"
                              ? "text-emerald-500"
                              : signal.type === "warning"
                              ? "text-amber-500"
                              : "text-blue-500"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Card Footer */}
                <div className="px-5 py-3 border-t border-[#e5e5e5] bg-gray-50/50">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">3 new signals today</span>
                    <button className="text-gray-600 font-medium hover:text-gray-900 transition-colors flex items-center gap-1">
                      View all
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative floating elements */}
              <div className="absolute -top-3 -right-3 w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-3 -left-3 w-16 h-16 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-full blur-2xl" />
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
