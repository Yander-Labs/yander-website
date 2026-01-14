"use client";

import { AnimatedSection } from "../ui/AnimatedSection";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { SectionLabel } from "../ui/SectionLabel";
import { MiniChart } from "../ui/MiniChart";
import { Check, AlertCircle, TrendingUp, TrendingDown, Shield } from "lucide-react";

const features = [
  "Keep distributed teams aligned and accountable",
  "Defend focus time and fix blockers before they slow everyone down",
  "Use real-time insights to coach and support, not micromanage",
  "Spot disengagement early and re-align effort before performance drops",
];

const riskLevels = [
  {
    name: "Jessica Moore",
    role: "Media Buyer",
    risk: "Low",
    score: 2,
    color: "emerald",
    trend: [3, 3, 2, 2, 2, 2, 2],
    trendDirection: "down",
    avatarBg: "from-violet-400 to-purple-500",
  },
  {
    name: "Ryan Peters",
    role: "Creative Strategist",
    risk: "Low",
    score: 3,
    color: "emerald",
    trend: [4, 4, 3, 3, 3, 3, 3],
    trendDirection: "down",
    avatarBg: "from-blue-400 to-cyan-500",
  },
  {
    name: "Olivia Bennett",
    role: "Project Manager",
    risk: "Medium",
    score: 5,
    color: "amber",
    trend: [3, 4, 4, 4, 5, 5, 5],
    trendDirection: "up",
    avatarBg: "from-amber-400 to-orange-500",
  },
  {
    name: "Marcus Chen",
    role: "Account Executive",
    risk: "High",
    score: 9,
    color: "red",
    trend: [5, 6, 7, 7, 8, 9, 9],
    trendDirection: "up",
    avatarBg: "from-red-400 to-rose-500",
  },
];

function RiskGauge({ score, size = 40 }: { score: number; size?: number }) {
  const percentage = (score / 10) * 100;
  const radius = (size - 4) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = (s: number) => {
    if (s <= 3) return { stroke: "#10b981", bg: "#d1fae5" };
    if (s <= 6) return { stroke: "#f59e0b", bg: "#fef3c7" };
    return { stroke: "#ef4444", bg: "#fee2e2" };
  };

  const colors = getColor(score);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f3f4f6"
          strokeWidth={3}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colors.stroke}
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-gray-700">{score}</span>
      </div>
    </div>
  );
}

export function ProactiveRetention() {
  return (
    <section className="py-20 md:py-28 bg-gray-50/70 border-y border-[#E4E7EC]">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <AnimatedSection direction="left">
            <SectionLabel number="06">Proactive Retention</SectionLabel>
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-5 leading-tight">
              Protect Your Biggest Investment—Your People
            </h2>
            <p className="text-base text-gray-500 mb-8 leading-relaxed">
              Yander shows how work patterns, communication, and meetings impact
              performance and wellbeing. So you can protect your top people from
              burnout and turn everyday activity into better results.
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

            <Button>Improve Team Retention</Button>
          </AnimatedSection>

          {/* Visual - Enhanced Risk Detection */}
          <AnimatedSection direction="right" delay={0.2}>
            <div className="relative">
              <div className="bg-white rounded-2xl border border-[#E4E7EC] shadow-elevated overflow-hidden">
                {/* Header */}
                <div className="px-5 py-4 border-b border-[#E4E7EC] bg-gradient-to-r from-gray-50 via-white to-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
                        <Shield className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        Quit Risk Detection
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-red-50 border border-red-100">
                      <AlertCircle className="w-3 h-3 text-red-500" />
                      <span className="text-[10px] font-medium text-red-600">1 at risk</span>
                    </div>
                  </div>
                </div>

                {/* Risk Scale */}
                <div className="px-5 py-3 border-b border-[#E4E7EC] bg-gray-50/50">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">Risk Scale</span>
                    <div className="flex-1 h-2 rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500" />
                    <div className="flex gap-4 text-[10px] text-gray-400">
                      <span>Low</span>
                      <span>Medium</span>
                      <span>High</span>
                    </div>
                  </div>
                </div>

                {/* Employee List */}
                <div className="p-4 space-y-2">
                  {riskLevels.map((employee) => (
                    <div
                      key={employee.name}
                      className={`group relative flex items-center justify-between p-3 rounded-xl border transition-all duration-200 hover:shadow-md ${
                        employee.color === "red"
                          ? "bg-red-50/50 border-red-100 hover:border-red-200"
                          : employee.color === "amber"
                          ? "bg-amber-50/30 border-amber-100/50 hover:border-amber-200"
                          : "bg-white border-[#E4E7EC] hover:border-gray-300"
                      }`}
                    >
                      {/* High risk pulse effect */}
                      {employee.color === "red" && (
                        <div className="absolute -inset-px bg-red-500/5 rounded-xl animate-pulse" />
                      )}

                      <div className="flex items-center gap-3 relative">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${employee.avatarBg} flex items-center justify-center text-xs font-bold text-white shadow-sm`}>
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            {employee.name}
                          </p>
                          <p className="text-xs text-gray-400">{employee.role}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 relative">
                        {/* Mini Trend Chart */}
                        <div className="hidden sm:block">
                          <MiniChart
                            data={employee.trend}
                            width={48}
                            height={20}
                            strokeWidth={1.5}
                            showDot={false}
                            color={
                              employee.color === "emerald"
                                ? "#10b981"
                                : employee.color === "amber"
                                ? "#f59e0b"
                                : "#ef4444"
                            }
                          />
                        </div>

                        {/* Trend Indicator */}
                        <div className="flex items-center gap-1">
                          {employee.trendDirection === "up" ? (
                            <TrendingUp className={`w-3 h-3 ${
                              employee.color === "red" ? "text-red-500" : "text-amber-500"
                            }`} />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-emerald-500" />
                          )}
                          <span
                            className={`text-[10px] font-medium ${
                              employee.color === "emerald"
                                ? "text-emerald-600"
                                : employee.color === "amber"
                                ? "text-amber-600"
                                : "text-red-600"
                            }`}
                          >
                            {employee.risk}
                          </span>
                        </div>

                        {/* Risk Gauge */}
                        <RiskGauge score={employee.score} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-5 py-3 border-t border-[#E4E7EC] bg-gray-50/50">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Updated 5 minutes ago</span>
                    <button className="text-gray-600 font-medium hover:text-gray-900 transition-colors">
                      View detailed analysis →
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-3 -right-3 w-24 h-24 bg-gradient-to-br from-red-500/10 to-amber-500/10 rounded-full blur-2xl" />
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
