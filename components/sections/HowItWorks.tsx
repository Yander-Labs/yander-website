"use client";

import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { SectionLabel } from "../ui/SectionLabel";
import { MiniChart } from "../ui/MiniChart";
import {
  MessageSquare,
  Calendar,
  Video,
  ArrowRight,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Users,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Connect Your Tools",
    description: "Plug in Slack, Google Workspace, or Microsoft 365 in minutes. No code required.",
    visual: "integrations",
  },
  {
    number: "02",
    title: "AI Analyzes Patterns",
    description: "Yander monitors communication patterns, meeting behavior, and response times.",
    visual: "processing",
  },
  {
    number: "03",
    title: "Get Actionable Insights",
    description: "See who's thriving, who needs support, and where to focus your attention.",
    visual: "insights",
  },
];

function IntegrationVisual() {
  return (
    <div className="flex items-center justify-center gap-3">
      {[
        { icon: MessageSquare, label: "Slack", color: "bg-purple-50 border-purple-100 text-purple-600" },
        { icon: Calendar, label: "Calendar", color: "bg-blue-50 border-blue-100 text-blue-600" },
        { icon: Video, label: "Meetings", color: "bg-emerald-50 border-emerald-100 text-emerald-600" },
      ].map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className={`w-14 h-14 rounded-xl border flex flex-col items-center justify-center ${item.color}`}
        >
          <item.icon className="w-5 h-5" />
          <span className="text-[8px] mt-1 font-medium opacity-70">{item.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

function ProcessingVisual() {
  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-[#171717] to-[#2d2d2d] rounded-xl p-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <span className="text-white text-sm font-semibold">Yander AI</span>
        </div>
        <div className="flex justify-center gap-1.5 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "150ms" }} />
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: "300ms" }} />
        </div>
        <p className="text-white/60 text-[10px]">Processing signals...</p>
      </div>
    </div>
  );
}

function InsightsVisual() {
  return (
    <div className="space-y-2">
      {[
        { icon: TrendingUp, label: "Engagement", value: "7.8", trend: "up", color: "text-emerald-600 bg-emerald-50" },
        { icon: AlertTriangle, label: "At Risk", value: "1", trend: "down", color: "text-amber-600 bg-amber-50" },
        { icon: Users, label: "Team Health", value: "Good", trend: "up", color: "text-blue-600 bg-blue-50" },
      ].map((item) => (
        <div key={item.label} className="flex items-center gap-3 p-2 bg-white rounded-lg border border-[#e5e5e5]">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${item.color}`}>
            <item.icon className="w-3.5 h-3.5" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-gray-500">{item.label}</p>
            <p className="text-sm font-semibold text-gray-900">{item.value}</p>
          </div>
          <MiniChart
            data={item.trend === "up" ? [4, 5, 5, 6, 7, 7, 8] : [6, 5, 4, 3, 2, 2, 1]}
            width={40}
            height={16}
            color={item.trend === "up" ? "#10b981" : "#f59e0b"}
          />
        </div>
      ))}
    </div>
  );
}

function StepVisual({ type }: { type: string }) {
  switch (type) {
    case "integrations":
      return <IntegrationVisual />;
    case "processing":
      return <ProcessingVisual />;
    case "insights":
      return <InsightsVisual />;
    default:
      return null;
  }
}

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-[#fafafa] border-y border-[#e5e5e5] relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-peec-gradient-subtle pointer-events-none" />

      <Container>
        {/* Header */}
        <div className="text-center mb-16 relative">
          <SectionLabel number="02" centered>
            How It Works
          </SectionLabel>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#171717] tracking-[-0.02em] max-w-3xl mx-auto">
            From scattered signals to clear insights
          </h2>
          <p className="mt-4 text-base text-[#737373] max-w-2xl mx-auto">
            Yander connects to your existing tools and turns everyday activity into actionable team intelligence.
          </p>
        </div>

        {/* Steps - Horizontal on desktop, vertical on mobile */}
        <div className="relative">
          {/* Connection line (desktop only) */}
          <div className="hidden lg:block absolute top-1/2 left-[16%] right-[16%] h-px bg-gradient-to-r from-[#e5e5e5] via-[#171717]/20 to-[#e5e5e5]" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="relative"
              >
                {/* Card */}
                <div className="bg-white rounded-[16px] border border-[#e5e5e5] shadow-[rgba(23,23,23,0.04)_0px_4px_4px_0px] p-6 h-full">
                  {/* Step number badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#171717] text-white flex items-center justify-center text-sm font-semibold">
                      {step.number}
                    </div>
                    <h3 className="text-lg font-semibold text-[#171717]">{step.title}</h3>
                  </div>

                  <p className="text-sm text-[#737373] mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Visual */}
                  <div className="bg-[#fafafa] rounded-xl p-4 border border-[#e5e5e5]">
                    <StepVisual type={step.visual} />
                  </div>
                </div>

                {/* Arrow connector (mobile only) */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <div className="w-8 h-8 rounded-full bg-[#fafafa] border border-[#e5e5e5] flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-[#737373] rotate-90" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-white rounded-full border border-[#e5e5e5] shadow-[rgba(23,23,23,0.04)_0px_4px_4px_0px]">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping absolute" />
            </div>
            <span className="text-sm text-[#737373]">
              No surveys. No time tracking. Just <span className="text-[#171717] font-medium">intelligent signals</span>.
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
