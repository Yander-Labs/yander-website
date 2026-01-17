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
  Shield,
  X,
  Check,
  Camera,
  Keyboard,
  Eye,
  BarChart3,
  Lock,
} from "lucide-react";
import Image from "next/image";

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
                { name: "Sarah Chen", role: "Designer", status: "active", avatar: "/avatars/Sarah-chen.png" },
                { name: "Marcus Johnson", role: "Developer", status: "active", avatar: "/avatars/marcus-johnson.png" },
                { name: "Emily Rodriguez", role: "PM", status: "away", avatar: "/avatars/emily-rodriguez.png" },
                { name: "Ryan Peters", role: "Marketing", status: "active", avatar: "/avatars/ryan-peters.png" },
              ].map((person, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[1fr,0.8fr,0.5fr] gap-2 items-center py-1.5 px-1 rounded hover:bg-[#2a2a2a]/50"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                      <Image
                        src={person.avatar}
                        alt={person.name}
                        width={20}
                        height={20}
                        className="w-full h-full object-cover"
                      />
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

// Privacy First visual matching the dark card design
function PrivacyVisual() {
  const blockedItems = [
    { icon: Camera, label: "Screenshots", sublabel: "Never captured" },
    { icon: Keyboard, label: "Keystrokes", sublabel: "Never logged" },
    { icon: Eye, label: "Webcam", sublabel: "Never accessed" },
  ];

  return (
    <div className="flex-1 flex flex-col p-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center">
          <Shield className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Privacy First</h4>
          <p className="text-[11px] text-gray-500">Your team&apos;s trust matters</p>
        </div>
      </div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        {/* Blocked items - red */}
        {blockedItems.map((item) => (
          <div
            key={item.label}
            className="bg-[#1f1215] rounded-lg p-3 border border-[#3a2024]"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded bg-rose-500/20 flex items-center justify-center">
                <X className="w-3 h-3 text-rose-400" />
              </div>
              <span className="text-xs font-medium text-white">{item.label}</span>
            </div>
            <p className="text-[10px] text-rose-400/80 pl-7">{item.sublabel}</p>
          </div>
        ))}

        {/* Allowed item - green */}
        <div className="bg-[#0f1f17] rounded-lg p-3 border border-[#1a3a28]">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-5 h-5 rounded bg-emerald-500/20 flex items-center justify-center">
              <Check className="w-3 h-3 text-emerald-400" />
            </div>
            <span className="text-xs font-medium text-white">Patterns Only</span>
          </div>
          <p className="text-[10px] text-emerald-400/80 pl-7">Aggregated insights</p>
        </div>
      </div>

      {/* Role-Based Access row */}
      <div className="bg-[#1a1a1a] rounded-lg p-3 border border-[#2a2a2a] mt-auto">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <Lock className="w-3 h-3 text-emerald-400" />
          </div>
          <div>
            <span className="text-xs font-medium text-white">Role-Based Access</span>
            <p className="text-[10px] text-gray-500">Only the right leaders see sensitive insights</p>
          </div>
        </div>
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
  const teamAvatars = [
    "/avatars/Sarah-chen.png",
    "/avatars/marcus-johnson.png",
    "/avatars/emily-rodriguez.png",
    "/avatars/ryan-peters.png",
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="flex items-center">
        {/* Overlapping avatars */}
        <div className="flex -space-x-3">
          {teamAvatars.map((avatar, i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-full border-2 border-[#1a1a1a] overflow-hidden shadow-lg"
              style={{ zIndex: 5 - i }}
            >
              <Image
                src={avatar}
                alt="Team member"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
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

          {/* Card 2 - Privacy First */}
          <motion.div
            variants={itemVariants}
            className="bg-[#141414] rounded-2xl border border-[#2a2a2a] overflow-hidden flex flex-col min-h-[360px]"
          >
            <PrivacyVisual />
            <div className="p-6 pt-0 mt-auto">
              <h3 className="text-lg font-semibold text-white">Privacy by Design</h3>
              <p className="text-sm text-gray-400 mt-1">
                Built for trust, not surveillance. We analyze patterns, not keystrokes.
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
