"use client";

import { AnimatedSection, StaggerContainer, StaggerItem } from "../ui/AnimatedSection";
import { Container } from "../ui/Container";
import { SectionLabel } from "../ui/SectionLabel";
import {
  MessageSquare,
  Clock,
  Calendar,
  Mic2,
  Heart,
  AlertTriangle,
  TrendingUp,
  Zap,
  Users,
  Lightbulb,
  Sparkles,
} from "lucide-react";

const inputs = [
  {
    icon: MessageSquare,
    title: "Slack messages",
    description: "Volume, channels, and patterns of communication.",
    color: "from-purple-500 to-indigo-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: Clock,
    title: "Response times",
    description: "How quickly people reply during core hours vs after hours.",
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Calendar,
    title: "Meeting attendance",
    description: "Who shows up, who skips, and who's double-booked.",
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    icon: Mic2,
    title: "Meeting engagement",
    description: "Who speaks, who's silent, and participation trends over time.",
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-100",
    iconColor: "text-amber-600",
  },
  {
    icon: Heart,
    title: "Message sentiment",
    description: "Tone and sentiment shifts across messaging tools.",
    color: "from-pink-500 to-rose-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-100",
    iconColor: "text-pink-600",
  },
];

const outputs = [
  {
    icon: AlertTriangle,
    title: "Risk & health scores",
    description: "At-a-glance view of who's thriving, overloaded, or at risk of leaving.",
    highlight: true,
  },
  {
    icon: TrendingUp,
    title: "Engagement trends",
    description: "See whose energy is rising or falling over time.",
  },
  {
    icon: Zap,
    title: "Burnout alerts",
    description: "Alerts for after-hours work, high workload, and unnecessary meetings.",
  },
  {
    icon: Users,
    title: "Collaboration quality",
    description: "Identify silent passengers, top collaborators, and unnecessary meetings.",
  },
  {
    icon: Lightbulb,
    title: "Recommendations",
    description: "Specific suggestions: rebalance workload, adjust 1:1s, intervene early.",
  },
];

function FlowLine({ direction = "down" }: { direction?: "down" | "up" }) {
  return (
    <div className="flex flex-col items-center">
      <svg
        width="2"
        height="40"
        viewBox="0 0 2 40"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id={`flowGradient-${direction}`} x1="0%" y1={direction === "down" ? "0%" : "100%"} x2="0%" y2={direction === "down" ? "100%" : "0%"}>
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#d1d5db" />
            <stop offset="100%" stopColor="#d1d5db" />
          </linearGradient>
        </defs>
        <line
          x1="1"
          y1="0"
          x2="1"
          y2="40"
          stroke={`url(#flowGradient-${direction})`}
          strokeWidth="2"
          strokeDasharray="4 4"
        />
      </svg>
      <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" />
    </div>
  );
}

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28 divider-dashed overflow-hidden">
      <Container>
        <AnimatedSection className="text-center mb-16">
          <SectionLabel number="01" centered>How Yander Works</SectionLabel>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gray-900 max-w-3xl mx-auto leading-tight">
            See What&apos;s Really Happening Across Your Remote Team
          </h2>
          <p className="mt-6 text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Yander turns everyday Slack, email, and online meeting activity into
            clear, daily insights on every person, so you can keep a true pulse
            on every team member no matter where they work.
          </p>
        </AnimatedSection>

        {/* Inputs Section */}
        <AnimatedSection className="mb-6">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gray-200" />
            <span className="px-4 py-1.5 rounded-full bg-gray-100 text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
              Data Inputs
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gray-200" />
          </div>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {inputs.map((input) => (
            <StaggerItem key={input.title}>
              <div className="group relative p-5 bg-white rounded-2xl border border-[#E4E7EB] hover:border-gray-300 hover:shadow-lg transition-all duration-300 h-full">
                {/* Gradient accent on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${input.color} opacity-0 group-hover:opacity-[0.03] rounded-2xl transition-opacity duration-300`} />

                <div className={`w-10 h-10 rounded-xl ${input.bgColor} border ${input.borderColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <input.icon className={`w-5 h-5 ${input.iconColor}`} />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-2">{input.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{input.description}</p>

                {/* Connection dot */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gray-300 opacity-0 lg:opacity-100" />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Flow Lines to Processing */}
        <div className="hidden lg:flex justify-center gap-[calc(20%-1rem)] mb-4">
          {[...Array(5)].map((_, i) => (
            <FlowLine key={i} direction="down" />
          ))}
        </div>

        {/* Processing Center - Enhanced */}
        <AnimatedSection className="flex flex-col items-center my-8">
          <div className="relative">
            {/* Outer glow ring */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-emerald-500/20 rounded-3xl blur-xl animate-pulse" />

            {/* Main processing box */}
            <div className="relative px-8 py-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl text-center max-w-lg border border-gray-700 shadow-2xl">
              {/* Animated dots */}
              <div className="absolute top-3 left-3 flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "150ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: "300ms" }} />
              </div>

              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-bold text-lg">Yander AI</span>
              </div>

              <p className="text-gray-300 text-sm mb-3">
                Analyzes patterns, detects trends, and updates scores daily
              </p>

              <div className="flex items-center justify-center gap-4 text-[10px] text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-400" />
                  Pattern Analysis
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-blue-400" />
                  Trend Detection
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-purple-400" />
                  Score Updates
                </span>
              </div>
            </div>
          </div>

          <p className="mt-6 text-gray-400 text-sm text-center max-w-md">
            No surveys. No time tracking software. Just intelligent signals from
            how your team already works.
          </p>
        </AnimatedSection>

        {/* Flow Lines from Processing */}
        <div className="hidden lg:flex justify-center gap-[calc(20%-1rem)] mb-4 mt-8">
          {[...Array(5)].map((_, i) => (
            <FlowLine key={i} direction="up" />
          ))}
        </div>

        {/* Outputs Section */}
        <AnimatedSection className="mb-6 mt-8">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-emerald-200" />
            <span className="px-4 py-1.5 rounded-full bg-emerald-50 text-[10px] font-semibold text-emerald-700 uppercase tracking-wider border border-emerald-100">
              Actionable Outputs
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-emerald-200" />
          </div>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {outputs.map((output) => (
            <StaggerItem key={output.title}>
              <div className={`group relative p-5 bg-white rounded-2xl border hover:shadow-lg transition-all duration-300 h-full ${
                output.highlight
                  ? "border-emerald-200 bg-gradient-to-br from-emerald-50/50 to-white"
                  : "border-[#E4E7EB] hover:border-emerald-200"
              }`}>
                {/* Connection dot */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-0 lg:opacity-100" />

                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${
                  output.highlight
                    ? "bg-emerald-100 border border-emerald-200"
                    : "bg-emerald-50 border border-emerald-100"
                }`}>
                  <output.icon className={`w-5 h-5 ${output.highlight ? "text-emerald-700" : "text-emerald-600"}`} />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-2">{output.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{output.description}</p>

                {output.highlight && (
                  <div className="mt-3 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-medium text-emerald-600">Primary insight</span>
                  </div>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
