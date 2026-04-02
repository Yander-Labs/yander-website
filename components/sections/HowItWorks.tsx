"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "../ui/Container";
import {
  FileText,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Tell Yander who you need",
    description: "Paste a job description or build one with Yander. Define the role, skills, budget, and the culture you want.",
    visual: "jobpost",
  },
  {
    number: "02",
    title: "AI does the heavy lifting",
    description: "Yander's agent searches global talent pools, screens for qualifications, and runs culture-fit assessments automatically.",
    visual: "aisearch",
  },
  {
    number: "03",
    title: "Interview the top 1%",
    description: "Every person you talk to has been vetted, tested, and matched to your needs.",
    visual: "interview",
  },
];

function JobPostVisual() {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-3 p-3 bg-white rounded-none border border-gray-200/60 shadow-soft">
        <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-[10px] text-gray-400 uppercase tracking-wide">Role</p>
          <p className="text-[13px] font-medium text-gray-900">Senior Full Stack Developer</p>
        </div>
      </div>
      <div className="p-3 bg-white rounded-none border border-gray-200/60 shadow-soft">
        <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-2">Required Skills</p>
        <div className="flex flex-wrap gap-1.5">
          {["React", "Node.js", "PostgreSQL", "AWS", "TypeScript"].map((skill) => (
            <span key={skill} className="px-2.5 py-1 bg-gray-50 rounded-none text-[11px] font-medium text-gray-600 border border-gray-100">
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-2.5">
        <div className="flex-1 p-3 bg-white rounded-none border border-gray-200/60 shadow-soft">
          <p className="text-[10px] text-gray-400 uppercase tracking-wide">Budget</p>
          <p className="text-[13px] font-medium text-gray-900">$45-60k/yr</p>
        </div>
        <div className="flex-1 p-3 bg-white rounded-none border border-gray-200/60 shadow-soft">
          <p className="text-[10px] text-gray-400 uppercase tracking-wide">Region</p>
          <p className="text-[13px] font-medium text-gray-900">South America</p>
        </div>
      </div>
    </div>
  );
}

function AISearchVisual() {
  return (
    <div className="bg-[#1e1044] rounded-none p-4 border border-white/10 relative overflow-hidden">
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Image
              src="/favicon.png"
              alt="Yander"
              width={20}
              height={20}
              className="w-5 h-5 brightness-0 invert"
            />
            <span className="text-sm font-medium text-white">Yander</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
            <span className="text-[10px] text-white/60 font-medium">Processing</span>
          </div>
        </div>
        <div className="space-y-2">
          {[
            { text: "Searching talent pools", done: true },
            { text: "Skills assessment complete", done: true },
            { text: "Culture fit analysis", done: true },
            { text: "Ranking top candidates", active: true },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2.5 px-3 py-2 bg-white/[0.03] rounded-none border border-white/[0.06]">
              {"active" in item && item.active ? (
                <div className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                </div>
              ) : (
                <div className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0 text-white/60 text-[10px] font-medium">
                  ✓
                </div>
              )}
              <span className={`text-[12px] ${"active" in item && item.active ? "text-white/80 font-medium" : "text-white/60"}`}>
                {item.text}
              </span>
              {"done" in item && item.done && (
                <span className="ml-auto text-[10px] text-white/40">Done</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InterviewVisual() {
  const candidates = [
    { name: "Maria Santos", role: "Senior Full Stack Dev", match: 96, location: "São Paulo", avatar: "/avatars/maria-santos.jpg" },
    { name: "Raj Patel", role: "Full Stack Developer", match: 94, location: "Bangalore", avatar: "/avatars/raj-patel.jpg" },
    { name: "James Ndaba", role: "Backend Engineer", match: 91, location: "Cape Town", avatar: "/avatars/james-ndaba.jpg" },
  ];

  return (
    <div className="space-y-2.5">
      {candidates.map((candidate) => (
        <div key={candidate.name} className="flex items-center gap-3 p-3 bg-white rounded-none border border-gray-200/60 shadow-soft">
          <Image
            src={candidate.avatar}
            alt={candidate.name}
            width={36}
            height={36}
            className="w-9 h-9 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-[13px] font-medium text-gray-900 truncate">{candidate.name}</p>
              <span className="flex-shrink-0 text-[10px] font-medium text-gray-500">
                {candidate.match}%
              </span>
            </div>
            <p className="text-[11px] text-gray-400">{candidate.role} · {candidate.location}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function StepVisual({ type }: { type: string }) {
  switch (type) {
    case "jobpost": return <JobPostVisual />;
    case "aisearch": return <AISearchVisual />;
    case "interview": return <InterviewVisual />;
    default: return null;
  }
}

export function HowItWorks() {
  return (
    <section className="relative py-24 md:py-32 bg-[#fafafa] overflow-hidden">
      <Container>
        {/* Header */}
        <div className="relative text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-xs font-mono text-gray-300 tracking-wider">[01]</span>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-[0.15em]">How it works</span>
            </div>
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-[#0a0a0a] tracking-[-0.02em]">
              From job post to interview.
              <br />
              <span className="text-[#1e1044]">No recruiters needed.</span>
            </h2>
          </motion.div>
        </div>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-white rounded-none border border-gray-200/60 p-6 md:p-8 lg:p-10 shadow-soft hover:shadow-soft-lg transition-all duration-300"
            >
              {/* Content */}
              <div className={index % 2 !== 0 ? "lg:order-2" : ""}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs font-mono text-gray-300 tracking-wider">{step.number}</span>
                  <div className="h-px flex-1 bg-gray-100" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#0a0a0a] tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="mt-3 text-base text-gray-500 leading-relaxed max-w-md">
                  {step.description}
                </p>
              </div>

              {/* Visual */}
              <div className={`bg-[#fafafa] rounded-none border border-gray-200/60 p-5 ${index % 2 !== 0 ? "lg:order-1" : ""}`}>
                <StepVisual type={step.visual} />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
