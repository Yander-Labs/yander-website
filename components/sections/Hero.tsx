"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import {
  ShieldCheck,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { useWaitlistModal } from "../ui/WaitlistModal";
import { useDemoModal } from "../ui/DemoModal";

// Product mockup data - matching the screenshot structure
const teamMembers = [
  { name: "Sarah Chen", role: "Graphic Designer", workload: 25, engagement: 78, quitRisk: 15, commitment: 82, communication: 68, color: "#93c5fd" },
  { name: "Marcus Johnson", role: "Creative Strategist", workload: 45, engagement: 42, quitRisk: 25, commitment: 78, communication: 45, color: "#86efac" },
  { name: "Emily Rodriguez", role: "Project Manager", workload: 72, engagement: 28, quitRisk: 68, commitment: 45, communication: 32, color: "#fda4af" },
  { name: "Ryan Peters", role: "Media Buyer", workload: 35, engagement: 85, quitRisk: 12, commitment: 92, communication: 78, color: "#c4b5fd" },
  { name: "Alex Thompson", role: "Content Writer", workload: 55, engagement: 62, quitRisk: 35, commitment: 71, communication: 58, color: "#a5f3fc" },
];

// Trend data for the chart - all 5 team members (pastel colors)
const trendDates = ["Jan 8", "Jan 12", "Jan 16", "Jan 20", "Jan 24"];
const trendData = [
  { name: "Sarah Chen", values: [70, 74, 72, 78, 78], color: "#93c5fd" },           // Pastel blue
  { name: "Marcus Johnson", values: [50, 48, 45, 42, 42], color: "#86efac" },       // Pastel green
  { name: "Emily Rodriguez", values: [92, 78, 45, 25, 12], color: "#fda4af" },      // Pastel rose
  { name: "Ryan Peters", values: [25, 42, 68, 82, 95], color: "#c4b5fd" },          // Pastel violet
  { name: "Alex Thompson", values: [58, 60, 62, 64, 62], color: "#a5f3fc" },        // Pastel cyan
];

function getScoreColor(score: number, isRisk: boolean = false) {
  if (isRisk) {
    if (score >= 50) return "bg-rose-200 text-rose-700";
    if (score >= 30) return "bg-amber-100 text-amber-700";
    return "bg-emerald-100 text-emerald-700";
  }
  if (score >= 70) return "bg-emerald-100 text-emerald-700";
  if (score >= 40) return "bg-amber-100 text-amber-700";
  return "bg-rose-200 text-rose-700";
}

function ScoreBadge({ score, isRisk = false }: { score: number; isRisk?: boolean }) {
  return (
    <span className={`inline-flex items-center justify-center min-w-[32px] px-1.5 py-0.5 rounded text-[11px] font-semibold ${getScoreColor(score, isRisk)}`}>
      {score}
    </span>
  );
}

function TrendChart() {
  const [activeIndex, setActiveIndex] = React.useState<number>(2); // Default to middle point
  const chartRef = React.useRef<HTMLDivElement>(null);

  const width = 400;
  const height = 160;
  const padding = { top: 10, right: 10, bottom: 10, left: 10 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxValue = 100;
  const minValue = 0;

  const getX = (index: number) => padding.left + (index / (trendDates.length - 1)) * chartWidth;
  const getY = (value: number) => padding.top + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;

  // Create smooth bezier curve path
  const createSmoothPath = (values: number[]) => {
    const points = values.map((v, i) => ({ x: getX(i), y: getY(v) }));
    if (points.length < 2) return "";

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const midX = (p0.x + p1.x) / 2;
      path += ` C ${midX} ${p0.y}, ${midX} ${p1.y}, ${p1.x} ${p1.y}`;
    }

    return path;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!chartRef.current) return;
    const rect = chartRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const chartAreaLeft = 32;
    const chartAreaWidth = rect.width - chartAreaLeft - 8;
    const relativeX = x - chartAreaLeft;
    const index = Math.round((relativeX / chartAreaWidth) * (trendDates.length - 1));
    const clampedIndex = Math.max(0, Math.min(trendDates.length - 1, index));
    setActiveIndex(clampedIndex);
  };

  // Calculate tooltip position based on active index
  const getTooltipLeft = () => {
    if (!chartRef.current) return "50%";
    const chartAreaLeft = 32;
    const chartAreaWidth = chartRef.current.offsetWidth - chartAreaLeft - 8;
    const xPos = chartAreaLeft + (activeIndex / (trendDates.length - 1)) * chartAreaWidth;
    return `${xPos}px`;
  };

  // Calculate tooltip transform based on position to prevent edge cutoff
  const getTooltipTransform = () => {
    if (activeIndex === 0) return "translateX(0)";
    if (activeIndex === trendDates.length - 1) return "translateX(-100%)";
    return "translateX(-50%)";
  };

  return (
    <div className="mt-4 pt-4 border-t border-[#f0f0f0] overflow-visible">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">Trends</span>
        <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 border border-gray-200 rounded text-[11px] font-medium text-gray-700">
          <span>Workload</span>
          <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Chart */}
      <div
        ref={chartRef}
        className="relative h-[160px] mb-3 overflow-visible"
        onMouseMove={handleMouseMove}
      >
        {/* Tooltip - always visible, positioned above chart */}
        <div
          className="absolute z-20 bg-gray-900 text-white rounded-lg px-3 py-2.5 shadow-xl pointer-events-none"
          style={{
            left: getTooltipLeft(),
            top: -8,
            transform: getTooltipTransform(),
          }}
        >
          <p className="text-[11px] font-medium text-gray-300 mb-2">{trendDates[activeIndex]}</p>
          <div className="space-y-1.5">
            {trendData.map((series) => (
              <div key={series.name} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: series.color }}
                  />
                  <span className="text-[11px] text-gray-200">{series.name.split(" ")[0]}</span>
                </div>
                <span className="text-[12px] font-semibold text-white">
                  {series.values[activeIndex]}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart area */}
        <div className="ml-8 mr-2 h-full relative">
          {/* Grid lines - behind the chart */}
          <div className="absolute inset-x-0 top-0 bottom-6 flex flex-col justify-between pointer-events-none z-0">
            <div className="border-t border-gray-100" />
            <div className="border-t border-gray-100" />
            <div className="border-t border-gray-100" />
          </div>

          {/* SVG lines - on top of grid */}
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[calc(100%-28px)] relative z-10" preserveAspectRatio="none">
            {/* Vertical indicator line */}
            <line
              x1={getX(activeIndex)}
              y1={padding.top}
              x2={getX(activeIndex)}
              y2={height - padding.bottom}
              stroke="#e5e5e5"
              strokeWidth="1"
            />
            {trendData.map((series) => (
              <path
                key={series.name}
                d={createSmoothPath(series.values)}
                fill="none"
                stroke={series.color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
            {/* Active point dots - small and perfectly round */}
            {trendData.map((series) => (
              <circle
                key={`dot-${series.name}`}
                cx={getX(activeIndex)}
                cy={getY(series.values[activeIndex])}
                r="3"
                fill={series.color}
                stroke="white"
                strokeWidth="1.5"
              />
            ))}
          </svg>

          {/* X-axis labels */}
          <div className="flex justify-between text-[10px] text-gray-400 mt-1">
            {trendDates.map((date) => (
              <span key={date}>{date}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-1.5 justify-center">
        {trendData.map((series) => (
          <div key={series.name} className="flex items-center gap-2">
            <div className="w-3 h-0.5 rounded-full" style={{ backgroundColor: series.color }} />
            <span className="text-[11px] text-gray-600">{series.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative mt-16 mx-auto max-w-5xl"
    >
      {/* Main mockup container */}
      <div className="relative bg-white rounded-2xl border border-[#e5e5e5] shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden">
        {/* Dashboard content */}
        <div className="p-4 sm:p-5 bg-white">
          {/* Header row */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#f0f0f0]">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-900">Team Dashboard</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-gray-100 text-[11px] font-medium text-gray-600">
                Feb 1, 2026
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
              Live
            </div>
          </div>

          {/* Team members table */}
          <div className="rounded border border-[#f0f0f0] overflow-hidden overflow-x-auto">
            {/* Table header */}
            <div className="grid grid-cols-[1fr_65px_65px_65px] sm:grid-cols-[1fr_80px_80px_80px_80px_95px] gap-2 px-3 py-2.5 bg-[#fafafa] border-b border-[#f0f0f0] text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-wide min-w-[400px]">
              <span>Entity</span>
              <span className="text-center">Workload</span>
              <span className="text-center">Engagement</span>
              <span className="text-center">Quit Risk</span>
              <span className="hidden sm:block text-center">Commitment</span>
              <span className="hidden sm:block text-center">Communication</span>
            </div>
            {/* Table rows */}
            {teamMembers.map((member, idx) => (
              <div
                key={member.name}
                className={`grid grid-cols-[1fr_65px_65px_65px] sm:grid-cols-[1fr_80px_80px_80px_80px_95px] gap-2 px-3 py-2.5 items-center min-w-[400px] ${
                  idx !== teamMembers.length - 1 ? "border-b border-[#f5f5f5]" : ""
                }`}
              >
                <div className="min-w-0">
                  <p className="text-[12px] sm:text-[13px] font-medium text-gray-900 truncate">{member.name}</p>
                  <p className="text-[10px] sm:text-[11px] text-gray-400 truncate">{member.role}</p>
                </div>
                <div className="flex justify-center">
                  <ScoreBadge score={member.workload} />
                </div>
                <div className="flex justify-center">
                  <ScoreBadge score={member.engagement} />
                </div>
                <div className="flex justify-center">
                  <ScoreBadge score={member.quitRisk} isRisk />
                </div>
                <div className="hidden sm:flex justify-center">
                  <ScoreBadge score={member.commitment} />
                </div>
                <div className="hidden sm:flex justify-center">
                  <ScoreBadge score={member.communication} />
                </div>
              </div>
            ))}
          </div>

          {/* Trend Chart */}
          <TrendChart />
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const { openModal } = useWaitlistModal();
  const { openModal: openDemoModal } = useDemoModal();

  return (
    <section className="relative pt-32 pb-8 md:pt-40 md:pb-12 overflow-hidden bg-[#fafafa]">
      {/* Peec.ai signature gradient overlay */}
      <div className="absolute inset-0 bg-peec-gradient-subtle pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white pointer-events-none" />

      <Container>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="font-geist font-semibold text-[36px] sm:text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] text-[#171717] leading-[1.1]"
          >
            One dashboard for your entire team's performance
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="mt-6 text-base md:text-lg text-[#737373] max-w-2xl mx-auto leading-relaxed"
          >
            Yander connects to your existing tools and uses its own AI scoring algorithm to give you a clear daily picture of every employee — so you can keep your best people and protect your client relationships.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="mt-8 flex flex-row items-center justify-center gap-3"
          >
            <Button size="lg" onClick={openModal}>Join Waitlist</Button>
            <Button variant="secondary" size="lg" onClick={openDemoModal}>
              Book a Demo
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.3,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[#737373]"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Connect your tools</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-gray-200" />
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>Start getting insights</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-gray-200" />
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>No surveillance</span>
            </div>
          </motion.div>
        </div>

        {/* Product Mockup */}
        <ProductMockup />
      </Container>
    </section>
  );
}
