"use client";

import { AnimatedSection } from "../ui/AnimatedSection";
import { Badge } from "../ui/Badge";
import { Container } from "../ui/Container";
import { MiniChart } from "../ui/MiniChart";
import { TrendingUp, TrendingDown, AlertTriangle, Sparkles, ChevronRight } from "lucide-react";
import Image from "next/image";

const employees = [
  {
    name: "Sarah Chen",
    role: "Designer",
    avatar: "/avatars/Sarah-chen.png",
    risk: 2,
    workload: 4,
    collab: 8,
    engage: 9,
    riskTrend: [3, 3, 2, 2, 2, 2, 2],
    engageTrend: [7, 8, 8, 9, 9, 9, 9],
  },
  {
    name: "Marcus Johnson",
    role: "Developer",
    avatar: "/avatars/marcus-johnson.png",
    risk: 3,
    workload: 5,
    collab: 9,
    engage: 8,
    riskTrend: [4, 4, 3, 3, 3, 3, 3],
    engageTrend: [7, 7, 8, 8, 8, 8, 8],
  },
  {
    name: "Emily Rodriguez",
    role: "PM",
    avatar: "/avatars/emily-rodriguez.png",
    risk: 7,
    workload: 8,
    collab: 4,
    engage: 5,
    riskTrend: [4, 5, 5, 6, 6, 7, 7],
    engageTrend: [7, 7, 6, 6, 5, 5, 5],
  },
  {
    name: "Ryan Peters",
    role: "Marketing",
    avatar: "/avatars/ryan-peters.png",
    risk: 1,
    workload: 3,
    collab: 8,
    engage: 9,
    riskTrend: [2, 2, 1, 1, 1, 1, 1],
    engageTrend: [8, 8, 9, 9, 9, 9, 9],
  },
];

function ScoreCell({ score, inverted = false, trend }: { score: number; inverted?: boolean; trend?: number[] }) {
  const getColor = (s: number) => {
    if (inverted) {
      if (s <= 3) return { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100", ring: "ring-emerald-500/20" };
      if (s <= 6) return { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100", ring: "ring-amber-500/20" };
      return { bg: "bg-red-50", text: "text-red-600", border: "border-red-100", ring: "ring-red-500/20" };
    }
    if (s >= 7) return { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100", ring: "ring-emerald-500/20" };
    if (s >= 4) return { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100", ring: "ring-amber-500/20" };
    return { bg: "bg-red-50", text: "text-red-600", border: "border-red-100", ring: "ring-red-500/20" };
  };

  const colors = getColor(score);

  return (
    <div className="flex items-center gap-2">
      {trend && <MiniChart data={trend} width={40} height={16} strokeWidth={1.5} showDot={false} trend={inverted ? (score <= 3 ? "up" : "down") : (score >= 7 ? "up" : "down")} />}
      <span
        className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold border shadow-sm ${colors.bg} ${colors.text} ${colors.border} ring-1 ${colors.ring}`}
      >
        {score}
      </span>
    </div>
  );
}

export function Dashboard() {
  return (
    <section className="py-16 md:py-24 relative bg-[#fafafa]">
      {/* Peec.ai signature gradient overlay */}
      <div className="absolute inset-0 bg-peec-gradient-subtle pointer-events-none" />
      <Container>
        <AnimatedSection>
          <div className="relative max-w-5xl mx-auto">
            {/* Main Dashboard Card */}
            <div className="bg-white rounded-[12px] border border-[#e5e5e5] shadow-[rgba(23,23,23,0.04)_0px_4px_4px_0px] overflow-hidden">
              {/* Header with gradient */}
              <div className="px-6 py-4 border-b border-[#e5e5e5] bg-gradient-to-r from-gray-50 via-white to-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">Y</span>
                      </div>
                      <span className="font-semibold text-gray-900">Yander</span>
                    </div>
                    <div className="h-5 w-px bg-gray-200" />
                    <span className="text-sm text-gray-500">Team Overview</span>
                  </div>
                  <Badge variant="blue" size="sm">
                    <Sparkles className="w-3 h-3 mr-1.5" />
                    AI-powered insights
                  </Badge>
                </div>
              </div>

              {/* Stats Row */}
              <div className="px-4 sm:px-6 py-3 border-b border-[#e5e5e5] bg-gray-50/50">
                <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Team Size:</span>
                    <span className="font-semibold text-gray-700">4 members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Avg. Engagement:</span>
                    <span className="font-semibold text-emerald-600">7.8</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">At Risk:</span>
                    <span className="font-semibold text-red-600">1</span>
                  </div>
                </div>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden p-4 space-y-3">
                {employees.slice(0, 3).map((employee, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border ${employee.risk >= 7 ? 'border-red-200 bg-red-50/30' : 'border-[#E4E7EC] bg-white'}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${employee.avatarBg} flex items-center justify-center text-xs font-bold text-white shadow-sm`}>
                          {employee.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{employee.name}</p>
                          <p className="text-xs text-gray-400">{employee.role}</p>
                        </div>
                      </div>
                      {employee.risk >= 7 && (
                        <div className="px-2 py-1 rounded-full bg-red-100 border border-red-200">
                          <span className="text-[10px] font-semibold text-red-600">High Risk</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-4">
                        <div>
                          <span className="text-gray-400">Risk:</span>
                          <span className={`ml-1 font-semibold ${employee.risk >= 7 ? 'text-red-600' : employee.risk >= 4 ? 'text-amber-600' : 'text-emerald-600'}`}>
                            {employee.risk}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Engage:</span>
                          <span className={`ml-1 font-semibold ${employee.engage >= 7 ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {employee.engage}
                          </span>
                        </div>
                      </div>
                      <MiniChart data={employee.engageTrend} width={48} height={20} strokeWidth={1.5} showDot={false} />
                    </div>
                  </div>
                ))}
                <p className="text-center text-xs text-gray-400 pt-1">+2 more team members</p>
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#e5e5e5] bg-gray-50/30">
                      <th className="text-left px-6 py-3.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                        Employee
                      </th>
                      <th className="text-center px-4 py-3.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                        <div className="flex flex-col items-center gap-0.5">
                          <span>Risk</span>
                          <span className="text-[9px] font-normal text-gray-300 normal-case">7-day trend</span>
                        </div>
                      </th>
                      <th className="text-center px-4 py-3.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                        Workload
                      </th>
                      <th className="text-center px-4 py-3.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                        Collab
                      </th>
                      <th className="text-center px-4 py-3.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                        <div className="flex flex-col items-center gap-0.5">
                          <span>Engage</span>
                          <span className="text-[9px] font-normal text-gray-300 normal-case">7-day trend</span>
                        </div>
                      </th>
                      <th className="px-4 py-3.5"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-[#E4E7EC]">
                    {employees.map((employee, idx) => (
                      <tr
                        key={idx}
                        className={`group hover:bg-gray-50/80 transition-colors duration-150 ${employee.risk >= 7 ? 'bg-red-50/30' : ''}`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                              <Image
                                src={employee.avatar}
                                alt={employee.name}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 text-sm">
                                {employee.name}
                              </p>
                              <p className="text-xs text-gray-400">
                                {employee.role}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="text-center px-4 py-4">
                          <div className="flex justify-center">
                            <ScoreCell score={employee.risk} inverted trend={employee.riskTrend} />
                          </div>
                        </td>
                        <td className="text-center px-4 py-4">
                          <div className="flex justify-center">
                            <ScoreCell score={employee.workload} inverted />
                          </div>
                        </td>
                        <td className="text-center px-4 py-4">
                          <div className="flex justify-center">
                            <ScoreCell score={employee.collab} />
                          </div>
                        </td>
                        <td className="text-center px-4 py-4">
                          <div className="flex justify-center">
                            <ScoreCell score={employee.engage} trend={employee.engageTrend} />
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-gray-100">
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Enhanced Floating Detail Card */}
            <div className="absolute -bottom-8 right-4 md:right-8 w-72 bg-white rounded-[12px] border border-[#e5e5e5] shadow-[rgba(23,23,23,0.08)_0px_8px_16px_0px] p-5 hidden md:block">
              {/* Subtle glow effect */}
              <div className="absolute -inset-px bg-gradient-to-br from-red-500/10 via-transparent to-amber-500/10 rounded-[12px] blur-sm -z-10" />

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl overflow-hidden bg-gray-100 shadow-lg">
                    <Image
                      src="/avatars/emily-rodriguez.png"
                      alt="Emily Rodriguez"
                      width={44}
                      height={44}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Emily Rodriguez</p>
                    <p className="text-xs text-gray-400">PM</p>
                  </div>
                </div>
                <div className="px-2 py-1 rounded-full bg-red-100 border border-red-200">
                  <span className="text-[10px] font-semibold text-red-600">High Risk</span>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4" />

              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-3 font-medium">
                30-Day Risk Trend
              </p>

              {/* Mini Chart for detail card */}
              <div className="bg-gray-50 rounded-xl p-3 mb-4 border border-gray-100">
                <MiniChart
                  data={[3, 4, 4, 5, 6, 6, 7, 7, 8, 8, 9, 9]}
                  width={220}
                  height={48}
                  color="#ef4444"
                  strokeWidth={2}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded-lg bg-red-50/50">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5 text-red-500" />
                    <span className="text-xs text-gray-600">Resignation Risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-red-600">9</span>
                    <span className="text-[10px] text-red-500 font-medium bg-red-100 px-1.5 py-0.5 rounded">
                      +4
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-red-50/50">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5 text-red-500" />
                    <span className="text-xs text-gray-600">Workload</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-red-600">9</span>
                    <span className="text-[10px] text-red-500 font-medium bg-red-100 px-1.5 py-0.5 rounded">
                      +3
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-xs text-gray-600">Collaboration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-amber-600">2</span>
                    <span className="text-[10px] text-amber-600 font-medium bg-amber-100 px-1.5 py-0.5 rounded">
                      -5
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-gradient-to-r from-red-50 to-amber-50 rounded-xl flex items-start gap-2.5 border border-red-100">
                <div className="w-6 h-6 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                </div>
                <div>
                  <p className="text-xs font-medium text-red-700 mb-0.5">
                    Burnout indicators detected
                  </p>
                  <p className="text-[10px] text-red-600/70">
                    Recommend immediate 1:1 check-in
                  </p>
                </div>
              </div>
            </div>

            {/* AI Status Indicator */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-2.5 px-4 py-2 bg-white rounded-full border border-[#e5e5e5] shadow-[rgba(23,23,23,0.04)_0px_4px_4px_0px]">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <span className="text-xs font-medium text-gray-600">Live insights updating</span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
