"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { MiniChart } from "../ui/MiniChart";
import {
  Clock,
  ShieldCheck,
  Award,
  TrendingUp,
  TrendingDown,
  Users,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { useWaitlistModal } from "../ui/WaitlistModal";

// Product mockup data
const teamMembers = [
  { name: "Sarah Chen", role: "Designer", risk: 2, engage: 9, trend: "up", avatar: "SC" },
  { name: "Marcus Johnson", role: "Developer", risk: 3, engage: 8, trend: "up", avatar: "MJ" },
  { name: "Emily Rodriguez", role: "PM", risk: 7, engage: 5, trend: "down", avatar: "ER" },
  { name: "Alex Kim", role: "Marketing", risk: 1, engage: 9, trend: "up", avatar: "AK" },
];

function ProductMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative mt-16 mx-auto max-w-4xl"
    >
      {/* Main mockup container - Notion-style clean design */}
      <div className="relative bg-white rounded-lg border border-[#e5e5e5] shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
        {/* Browser chrome - minimal */}
        <div className="px-3 py-2.5 bg-[#fafafa] border-b border-[#ebebeb] flex items-center">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#e5e5e5]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#e5e5e5]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#e5e5e5]" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-3 py-1 bg-white rounded border border-[#ebebeb] text-[11px] text-gray-400">
              app.yander.io/dashboard
            </div>
          </div>
          <div className="w-[54px]" />
        </div>

        {/* Dashboard content - tight, clean layout */}
        <div className="p-5 bg-white">
          {/* Header row */}
          <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#f0f0f0]">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded bg-gray-900 flex items-center justify-center">
                <span className="text-white text-[10px] font-semibold">Y</span>
              </div>
              <span className="text-sm font-medium text-gray-900">Team Overview</span>
              <span className="text-xs text-gray-400">Last 7 days</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Live
            </div>
          </div>

          {/* Stats row - minimal cards */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="p-3 rounded border border-[#f0f0f0] bg-[#fafafa]">
              <div className="text-[11px] text-gray-500 mb-1">Engagement</div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-semibold text-gray-900">7.8</span>
                <span className="text-[10px] text-gray-500">/ 10</span>
              </div>
              <div className="mt-2">
                <MiniChart data={[6, 6.5, 7, 7.2, 7.5, 7.8, 7.8]} width={80} height={20} color="#10b981" />
              </div>
            </div>
            <div className="p-3 rounded border border-amber-200 bg-amber-50">
              <div className="text-[11px] text-amber-700 mb-1">At Risk</div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-semibold text-amber-900">1</span>
                <span className="text-[10px] text-amber-600">person</span>
              </div>
              <div className="mt-2 text-[10px] text-amber-600">Emily R.</div>
            </div>
            <div className="p-3 rounded border border-[#f0f0f0] bg-[#fafafa]">
              <div className="text-[11px] text-gray-500 mb-1">Team Health</div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-semibold text-gray-900">Good</span>
              </div>
              <div className="mt-2 flex gap-0.5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`h-1 flex-1 rounded-sm ${i <= 3 ? 'bg-gray-900' : 'bg-gray-200'}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Team members table - clean Notion-style */}
          <div className="rounded border border-[#f0f0f0] overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[1fr_80px_80px_40px] gap-4 px-3 py-2 bg-[#fafafa] border-b border-[#f0f0f0] text-[10px] font-medium text-gray-500 uppercase tracking-wide">
              <span>Member</span>
              <span className="text-right">Risk</span>
              <span className="text-right">Engage</span>
              <span></span>
            </div>
            {/* Table rows */}
            {teamMembers.map((member, idx) => (
              <div
                key={member.name}
                className={`grid grid-cols-[1fr_80px_80px_40px] gap-4 px-3 py-2.5 items-center ${
                  idx !== teamMembers.length - 1 ? 'border-b border-[#f5f5f5]' : ''
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded bg-gray-200 flex items-center justify-center text-[10px] font-medium text-gray-600">
                    {member.avatar}
                  </div>
                  <div>
                    <p className="text-[13px] text-gray-900">{member.name}</p>
                    <p className="text-[11px] text-gray-400">{member.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[13px] font-medium ${member.risk >= 5 ? 'text-gray-900' : 'text-gray-500'}`}>
                    {member.risk}/10
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[13px] font-medium text-gray-900">{member.engage}/10</span>
                </div>
                <div className="flex justify-end">
                  {member.trend === 'up' ? (
                    <TrendingUp className="w-3.5 h-3.5 text-gray-400" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5 text-gray-900" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating notification - minimal style */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute -right-2 top-1/4 bg-white rounded border border-[#e5e5e5] shadow-lg p-3 w-56 hidden lg:block"
      >
        <div className="flex items-start gap-2.5">
          <div className="w-5 h-5 rounded bg-gray-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-3 h-3 text-gray-500" />
          </div>
          <div>
            <p className="text-[12px] font-medium text-gray-900">Check-in Recommended</p>
            <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">Emily&apos;s engagement dropped 23% this week.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const { openModal } = useWaitlistModal();

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
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.02em] text-[#171717] leading-[1.1]"
          >
            Build a Stronger Remote Team.{" "}
            <span className="text-[#737373]">Keep Clients Longer.</span>
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
            Marketing agency leaders with remote teams don&apos;t realize when
            employees skip meetings, burn out, or do the bare minimum. Yander
            keeps a live pulse on engagement, workload, and sentiment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button size="lg" onClick={openModal}>Join Waitlist</Button>
            <Button variant="secondary" size="lg">
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
              <Clock className="w-4 h-4" />
              <span>10 Min Setup</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-gray-200" />
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>No Surveillance</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-gray-200" />
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Trusted By Top Leaders</span>
            </div>
          </motion.div>
        </div>

        {/* Product Mockup */}
        <ProductMockup />
      </Container>
    </section>
  );
}
