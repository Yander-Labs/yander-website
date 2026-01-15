"use client";

import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { SectionLabel } from "../ui/SectionLabel";
import {
  ArrowUp,
  ArrowDown,
  Bell,
  Zap,
  Users,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.47, 0.32, 0.98] as const,
    },
  },
};

// Dashboard visual - browser mockup with team table
function DashboardVisual() {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Browser chrome */}
        <div className="bg-[#2a2a2a] rounded-t-lg px-3 py-2 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-[#1a1a1a] rounded px-3 py-1 text-[10px] text-gray-500">
              Dashboard
            </div>
          </div>
          <div className="flex gap-1.5 opacity-0">
            <div className="w-2.5 h-2.5 rounded-full" />
            <div className="w-2.5 h-2.5 rounded-full" />
          </div>
        </div>

        {/* Dashboard content */}
        <div className="bg-[#1a1a1a] rounded-b-lg border border-[#2a2a2a] border-t-0 overflow-hidden">
          <div className="flex">
            {/* Sidebar */}
            <div className="w-24 border-r border-[#2a2a2a] p-2 space-y-1">
              {["Dashboard", "Analytics", "Team", "Settings"].map((item, i) => (
                <div
                  key={item}
                  className={`px-2 py-1.5 rounded text-[9px] ${
                    i === 0 ? "bg-[#2a2a2a] text-white" : "text-gray-500"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Main content */}
            <div className="flex-1 p-3">
              {/* Table header */}
              <div className="grid grid-cols-[1fr,0.8fr,0.5fr] gap-2 text-[8px] text-gray-500 uppercase tracking-wide mb-2 px-1">
                <span>Name</span>
                <span>Role</span>
                <span>Status</span>
              </div>

              {/* Table rows */}
              {[
                { name: "Alex Chen", role: "Product Manager", status: "active" },
                { name: "Sarah Kim", role: "Designer", status: "active" },
                { name: "Mike Johnson", role: "Developer", status: "away" },
                { name: "Emily Davis", role: "Marketing", status: "active" },
              ].map((person, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[1fr,0.8fr,0.5fr] gap-2 items-center py-1.5 px-1 rounded hover:bg-[#2a2a2a]/50"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] text-white ${
                      ["bg-emerald-500", "bg-blue-500", "bg-purple-500", "bg-amber-500"][i]
                    }`}>
                      {person.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <span className="text-[10px] text-white">{person.name}</span>
                  </div>
                  <span className="text-[9px] text-gray-400">{person.role}</span>
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    person.status === "active" ? "bg-emerald-400" : "bg-amber-400"
                  }`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Analytics chart with glow effect
function AnalyticsVisual() {
  const points = [40, 45, 42, 55, 50, 65, 60, 72, 68, 78, 75, 85];
  const maxY = 100;
  const width = 280;
  const height = 120;

  // Create SVG path
  const pathD = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - (p / maxY) * height;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  // Create area path (for gradient fill)
  const areaD = `${pathD} L ${width} ${height} L 0 ${height} Z`;

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="relative">
        {/* Percentage indicator */}
        <div className="absolute -top-2 right-0 flex items-center gap-1 text-emerald-400">
          <ArrowUp className="w-3 h-3" />
          <span className="text-sm font-medium">14.12%</span>
        </div>

        {/* Chart */}
        <svg width={width} height={height} className="overflow-visible">
          {/* Glow filter */}
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area fill */}
          <path d={areaD} fill="url(#areaGradient)" />

          {/* Line with glow */}
          <path
            d={pathD}
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />

          {/* End dot */}
          <circle
            cx={width}
            cy={height - (points[points.length - 1] / maxY) * height}
            r="4"
            fill="#10b981"
            filter="url(#glow)"
          />
        </svg>
      </div>
    </div>
  );
}

// Smart alerts notification stack
function AlertsVisual() {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="space-y-2 w-full max-w-[200px]">
        {[
          { type: "critical", text: "Burnout risk: Marcus J.", time: "now" },
          { type: "warning", text: "Low engagement detected", time: "2h" },
          { type: "info", text: "Weekly report ready", time: "1d" },
        ].map((alert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1 - i * 0.2, x: i * 4 }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
              i === 0
                ? "bg-[#2a2a2a] border-[#3a3a3a]"
                : "bg-[#222] border-[#2a2a2a]"
            }`}
            style={{ transform: `translateX(${i * 4}px)` }}
          >
            <div className={`w-1.5 h-6 rounded-full ${
              alert.type === "critical" ? "bg-rose-500" :
              alert.type === "warning" ? "bg-amber-500" : "bg-blue-500"
            }`} />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-white truncate">{alert.text}</p>
              <p className="text-[9px] text-gray-500">{alert.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// AI recommendations visual
function AIVisual() {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="relative">
        {/* Central AI icon */}
        <div className="w-14 h-14 rounded-xl bg-gray-900 flex items-center justify-center">
          <Zap className="w-7 h-7 text-white" />
        </div>

        {/* Orbiting suggestions */}
        {[
          { text: "Schedule 1:1", angle: -45, distance: 70 },
          { text: "Review workload", angle: 45, distance: 75 },
          { text: "Send kudos", angle: 180, distance: 65 },
        ].map((item, i) => {
          const x = Math.cos((item.angle * Math.PI) / 180) * item.distance;
          const y = Math.sin((item.angle * Math.PI) / 180) * item.distance;
          return (
            <div
              key={i}
              className="absolute px-2 py-1 bg-[#2a2a2a] rounded-md text-[9px] text-gray-300 whitespace-nowrap border border-[#3a3a3a]"
              style={{
                left: `calc(50% + ${x}px - 30px)`,
                top: `calc(50% + ${y}px - 10px)`,
              }}
            >
              {item.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Team collaboration visual - overlapping avatars
function CollaborationVisual() {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="flex items-center">
        {/* Overlapping avatars */}
        <div className="flex -space-x-3">
          {[
            "bg-emerald-500",
            "bg-blue-500",
            "bg-purple-500",
            "bg-amber-500",
            "bg-rose-500",
          ].map((color, i) => (
            <div
              key={i}
              className={`w-10 h-10 rounded-full ${color} border-2 border-[#1a1a1a] flex items-center justify-center text-white text-xs font-medium shadow-lg`}
              style={{ zIndex: 5 - i }}
            >
              {["AC", "SK", "MJ", "ED", "JL"][i]}
            </div>
          ))}
        </div>

        {/* Plus indicator */}
        <div className="ml-2 w-10 h-10 rounded-full bg-[#2a2a2a] border-2 border-dashed border-[#3a3a3a] flex items-center justify-center text-gray-400 text-sm">
          +8
        </div>
      </div>
    </div>
  );
}

export function BentoFeatures() {
  return (
    <section className="py-20 md:py-28 bg-[#0a0a0a]">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <SectionLabel number="01" centered className="text-gray-400">
            Key Features
          </SectionLabel>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white tracking-[-0.02em] max-w-3xl mx-auto">
            Turn team signals into actionable insights
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
            Identify engagement patterns that matter, monitor team health, and act before issues escalate.
          </p>
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {/* Card 1 - Dashboard (Large, spans 2 cols) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 bg-[#141414] rounded-2xl border border-[#2a2a2a] overflow-hidden flex flex-col min-h-[360px]"
          >
            <DashboardVisual />
            <div className="p-6 pt-0 mt-auto">
              <h3 className="text-lg font-semibold text-white">Real-Time Dashboard</h3>
              <p className="text-sm text-gray-400 mt-1">
                Our interactive dashboard provides an all-encompassing view of your team&apos;s engagement, collaboration, and wellbeing metrics.
              </p>
            </div>
          </motion.div>

          {/* Card 2 - Analytics */}
          <motion.div
            variants={itemVariants}
            className="bg-[#141414] rounded-2xl border border-[#2a2a2a] overflow-hidden flex flex-col min-h-[360px]"
          >
            <AnalyticsVisual />
            <div className="p-6 pt-0 mt-auto">
              <h3 className="text-lg font-semibold text-white">Simple Analytics</h3>
              <p className="text-sm text-gray-400 mt-1">
                Make informed decisions backed by data through our intuitive analytics tools.
              </p>
            </div>
          </motion.div>

          {/* Card 3 - Smart Alerts */}
          <motion.div
            variants={itemVariants}
            className="bg-[#141414] rounded-2xl border border-[#2a2a2a] overflow-hidden flex flex-col min-h-[280px]"
          >
            <AlertsVisual />
            <div className="p-6 pt-0 mt-auto">
              <h3 className="text-lg font-semibold text-white">Smart Alerts</h3>
              <p className="text-sm text-gray-400 mt-1">
                Get notified about burnout risks and engagement changes in real-time.
              </p>
            </div>
          </motion.div>

          {/* Card 4 - AI Recommendations */}
          <motion.div
            variants={itemVariants}
            className="bg-[#141414] rounded-2xl border border-[#2a2a2a] overflow-hidden flex flex-col min-h-[280px]"
          >
            <AIVisual />
            <div className="p-6 pt-0 mt-auto">
              <h3 className="text-lg font-semibold text-white">AI Recommendations</h3>
              <p className="text-sm text-gray-400 mt-1">
                Receive intelligent suggestions to improve team engagement and prevent issues.
              </p>
            </div>
          </motion.div>

          {/* Card 5 - Team Collaboration */}
          <motion.div
            variants={itemVariants}
            className="bg-[#141414] rounded-2xl border border-[#2a2a2a] overflow-hidden flex flex-col min-h-[280px]"
          >
            <CollaborationVisual />
            <div className="p-6 pt-0 mt-auto">
              <h3 className="text-lg font-semibold text-white">Team Collaboration</h3>
              <p className="text-sm text-gray-400 mt-1">
                Seamlessly track collaboration patterns across your entire organization.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
