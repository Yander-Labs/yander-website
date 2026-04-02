"use client";

import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import {
  Activity,
  TrendingUp,
  AlertTriangle,
  Users,
} from "lucide-react";
import { MiniChart } from "../ui/MiniChart";

function PulseDashboardVisual() {
  const teamMembers = [
    { name: "Maria Santos", role: "Senior Developer", score: 9, trend: "up" },
    { name: "Carlos Reyes", role: "Product Designer", score: 8, trend: "up" },
    { name: "Anh Nguyen", role: "Data Analyst", score: 5, trend: "down" },
    { name: "Sofia Martinez", role: "Marketing Mgr", score: 9, trend: "up" },
  ];

  return (
    <div className="bg-white rounded-none border border-gray-200/60 shadow-soft-lg overflow-hidden">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-semibold text-gray-900">Pulse Dashboard</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-full text-[11px] text-emerald-600 font-medium border border-emerald-100">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            Live
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2.5 mb-4">
          {[
            { icon: TrendingUp, label: "Engagement", value: "8.2", color: "emerald", data: [4, 5, 5, 6, 7, 7, 8] },
            { icon: AlertTriangle, label: "At Risk", value: "1", color: "amber", data: [3, 3, 2, 2, 1, 1, 1] },
            { icon: Users, label: "Team Health", value: "Good", color: "blue", data: [5, 6, 6, 7, 7, 8, 8] },
          ].map((item) => (
            <div key={item.label} className="p-3 bg-[#fafafa] rounded-none border border-gray-100">
              <div className="flex items-center gap-1.5 mb-1.5">
                <item.icon className={`w-3.5 h-3.5 ${
                  item.color === "emerald" ? "text-emerald-500" :
                  item.color === "amber" ? "text-amber-500" : "text-blue-500"
                }`} />
                <span className="text-[10px] text-gray-400 font-medium">{item.label}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-gray-900">{item.value}</span>
                <MiniChart
                  data={item.data}
                  width={36}
                  height={14}
                  color={item.color === "amber" ? "#f59e0b" : "#10b981"}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Team list */}
        <div className="space-y-1.5">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-none border transition-colors ${
                member.score <= 5
                  ? "bg-amber-50/50 border-amber-100"
                  : "bg-white border-gray-100 hover:border-gray-200"
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500 flex-shrink-0">
                {member.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-gray-900 truncate">{member.name}</p>
                <p className="text-[10px] text-gray-400">{member.role}</p>
              </div>
              <span className={`text-sm font-bold ${
                member.score <= 5 ? "text-amber-500" : "text-emerald-500"
              }`}>
                {member.score}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PulseAddon() {
  return (
    <section className="relative py-24 md:py-32 bg-[#fafafa] overflow-hidden">

      <Container>
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-xs font-mono text-gray-300 tracking-wider">[06]</span>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-[0.15em]">Hire + Retain</span>
            </div>
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-[#0a0a0a] tracking-[-0.02em]">
              Don&apos;t just hire great people.
              <br />
              <span className="text-[#1e1044]">Keep them.</span>
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-md">
              You fought hard to hire these people. Yander Pulse keeps a pulse
              on sentiment and engagement so you can retain them. Your AI HR
              assistant for the team you built.
            </p>

            <div className="mt-10 space-y-6">
              {[
                {
                  title: "Sentiment tracking",
                  description: "Know how your team feels before they hand in their notice.",
                },
                {
                  title: "Early warning system",
                  description: "Alerts when engagement drops or burnout risk rises.",
                },
                {
                  title: "Your AI HR assistant",
                  description: "Designed to make talent sourcing effortless.",
                },
              ].map((feature) => (
                <div key={feature.title} className="pb-6 border-b border-gray-100 last:border-b-0 last:pb-0">
                  <p className="text-base font-semibold text-[#0a0a0a]">{feature.title}</p>
                  <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-sm text-gray-400">
              Available as an add-on to any Yander plan.
            </p>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <PulseDashboardVisual />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
