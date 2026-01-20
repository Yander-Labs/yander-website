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
import Image from "next/image";
import { useWaitlistModal } from "../ui/WaitlistModal";
import { useDemoModal } from "../ui/DemoModal";

// Product mockup data
const teamMembers = [
  { name: "Sarah Chen", role: "Graphic Designer", risk: 2, workload: 4, engage: 9, collab: 8, trend: "up", avatar: "/avatars/Sarah-chen.png" },
  { name: "Marcus Johnson", role: "Creative Strategist", risk: 3, workload: 5, engage: 8, collab: 9, trend: "up", avatar: "/avatars/marcus-johnson.png" },
  { name: "Emily Rodriguez", role: "Project Manager", risk: 7, workload: 8, engage: 5, collab: 4, trend: "down", avatar: "/avatars/emily-rodriguez.png" },
  { name: "Ryan Peters", role: "Media Buyer", risk: 1, workload: 3, engage: 9, collab: 8, trend: "up", avatar: "/avatars/ryan-peters.png" },
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
            {/* Table header - responsive: hide some columns on mobile */}
            <div className="grid grid-cols-[1fr_40px_40px_24px] sm:grid-cols-[1fr_45px_50px_45px_24px] md:grid-cols-[1fr_50px_70px_55px_50px_28px] gap-2 sm:gap-3 md:gap-4 px-3 sm:px-4 py-2 bg-[#fafafa] border-b border-[#f0f0f0] text-[9px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-wide">
              <span>Member</span>
              <span className="text-center">Risk</span>
              <span className="hidden sm:block text-center">Load</span>
              <span className="text-center">Engage</span>
              <span className="hidden md:block text-center">Collab</span>
              <span></span>
            </div>
            {/* Table rows */}
            {teamMembers.map((member, idx) => (
              <div
                key={member.name}
                className={`grid grid-cols-[1fr_40px_40px_24px] sm:grid-cols-[1fr_45px_50px_45px_24px] md:grid-cols-[1fr_50px_70px_55px_50px_28px] gap-2 sm:gap-3 md:gap-4 px-3 sm:px-4 py-2 sm:py-2.5 items-center ${
                  idx !== teamMembers.length - 1 ? 'border-b border-[#f5f5f5]' : ''
                }`}
              >
                <div className="flex items-center gap-1.5 sm:gap-2.5">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] sm:text-[13px] text-gray-900 truncate">{member.name}</p>
                    <p className="text-[9px] sm:text-[11px] text-gray-400 truncate">{member.role}</p>
                  </div>
                  {member.name === "Emily Rodriguez" && (
                    <>
                      {/* Mobile: Compact badge with icon only */}
                      <div className="flex md:hidden items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-amber-50 border border-amber-200 rounded-md flex-shrink-0">
                        <AlertTriangle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-600" />
                      </div>
                      {/* Desktop: Full stacked badge */}
                      <div className="hidden md:flex items-start gap-1.5 px-2 py-1 bg-amber-50 border border-amber-200 rounded-md">
                        <AlertTriangle className="w-3 h-3 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div className="flex flex-col">
                          <span className="text-[10px] text-amber-700 font-medium">Check-in recommended</span>
                          <span className="text-[10px] text-amber-600">Engagement dropped 23%</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="text-center">
                  <span className={`text-[11px] sm:text-[13px] font-medium ${
                    member.risk >= 7 ? 'text-red-600' : member.risk >= 4 ? 'text-amber-600' : 'text-emerald-600'
                  }`}>
                    {member.risk}
                  </span>
                </div>
                <div className="hidden sm:block text-center">
                  <span className={`text-[11px] sm:text-[13px] font-medium ${
                    member.workload >= 7 ? 'text-red-600' : member.workload >= 4 ? 'text-amber-600' : 'text-emerald-600'
                  }`}>
                    {member.workload}
                  </span>
                </div>
                <div className="text-center">
                  <span className={`text-[11px] sm:text-[13px] font-medium ${
                    member.engage <= 3 ? 'text-red-600' : member.engage <= 6 ? 'text-amber-600' : 'text-emerald-600'
                  }`}>
                    {member.engage}
                  </span>
                </div>
                <div className="hidden md:block text-center">
                  <span className={`text-[13px] font-medium ${
                    member.collab <= 3 ? 'text-red-600' : member.collab <= 6 ? 'text-amber-600' : 'text-emerald-600'
                  }`}>
                    {member.collab}
                  </span>
                </div>
                <div className="flex justify-center">
                  {member.trend === 'up' ? (
                    <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500" />
                  ) : (
                    <TrendingDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
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
            keeps a live pulse on engagement, workload, and sentiment without intrusive
            time tracking, so you can build a high-performing team and protect your client
            relationships.
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
