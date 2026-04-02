"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useInView } from "framer-motion";
import { Container } from "../ui/Container";
import { Check } from "lucide-react";

function AnimatedBar({ score, delay }: { score: number; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-white/40 rounded-full"
        initial={{ width: 0 }}
        animate={isInView ? { width: `${score}%` } : { width: 0 }}
        transition={{ duration: 1.2, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      />
    </div>
  );
}

const features = [
  {
    id: "search",
    label: "01",
    title: "AI-Powered Search",
    description: "Our agent analyzes your job requirements and matches candidates across skills, experience, and work style. This isn't keyword matching. It's real understanding of what makes a candidate right for your role.",
    visual: (
      <div className="space-y-3">
        {[
          { label: "Technical skills", score: 96 },
          { label: "Experience level", score: 92 },
          { label: "Communication", score: 88 },
          { label: "Culture alignment", score: 94 },
        ].map((item, i) => (
          <div key={item.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-white/80">{item.label}</span>
              <span className="text-sm font-medium text-white">{item.score}%</span>
            </div>
            <AnimatedBar score={item.score} delay={0.15 + i * 0.1} />
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "culture",
    label: "02",
    title: "Culture Fit Screening",
    description: "Every candidate completes personality assessments that evaluate remote work readiness, communication style, self-management, and collaboration preferences. You only meet people who'll work well with your team.",
    visual: (
      <div className="space-y-2">
        {[
          "Remote work readiness",
          "Communication style",
          "Work ethic alignment",
          "Team collaboration",
          "Self-management",
        ].map((trait) => (
          <div key={trait} className="flex items-center justify-between py-2.5 border-b border-white/[0.06] last:border-b-0">
            <span className="text-sm text-white/80">{trait}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/80">Passed</span>
              <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                <Check className="w-3 h-3 text-white/80" />
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "vetting",
    label: "03",
    title: "Automated Vetting Pipeline",
    description: "Every candidate goes through a multi-step pipeline before you see them: resume screening, technical assessment, personality testing, and culture evaluation. By the time they reach you, the hard work is done.",
    visual: (
      <div className="space-y-0">
        {[
          { step: "Resume screening", done: true },
          { step: "Skills assessment", done: true },
          { step: "Personality test", done: true },
          { step: "Culture evaluation", done: true },
          { step: "Ready for interview", done: false },
        ].map((item) => (
          <div key={item.step} className="flex items-center gap-4 py-3 border-b border-white/[0.06] last:border-b-0">
            <div className="flex items-center justify-center w-8">
              {item.done ? (
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white/80" />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
                </div>
              )}
            </div>
            <span className={`text-sm ${item.done ? "text-white/80" : "text-white/80 font-medium"}`}>
              {item.step}
            </span>
            {item.done && <span className="ml-auto text-xs text-white/80">Complete</span>}
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "forms",
    label: "04",
    title: "Self-Service Screening",
    description: "Already getting inbound candidates? Send them to a Yander screening form. They'll complete personality tests and qualification checks automatically. You only review the ones who pass.",
    visual: (
      <div>
        <div className="space-y-3 mb-6">
          {[
            { field: "Personal details", pct: "100%" },
            { field: "Work experience", pct: "100%" },
            { field: "Technical assessment", pct: "100%" },
            { field: "Culture & personality", pct: "75%" },
          ].map((item) => (
            <div key={item.field}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-white/80">{item.field}</span>
                <span className="text-xs text-white/70">{item.pct}</span>
              </div>
              <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                <div className="h-full bg-white/30 rounded-full" style={{ width: item.pct }} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
          <span className="text-sm text-white/80">Overall progress</span>
          <span className="text-lg font-bold text-white">94%</span>
        </div>
      </div>
    ),
  },
];

function FeatureNav({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="flex gap-1">
      {features.map((feature, i) => (
        <div
          key={feature.id}
          className={`flex-1 py-3 px-4 text-center text-sm font-medium transition-all duration-300 border-b-2 ${
            i === activeIndex
              ? "text-white border-white bg-white/[0.04]"
              : i < activeIndex
              ? "text-white/70 border-white/20"
              : "text-white/70 border-transparent"
          }`}
        >
          <span className="hidden sm:inline">{feature.title}</span>
          <span className="sm:hidden">{feature.label}</span>
        </div>
      ))}
    </div>
  );
}

function ProgressBar({ progress, activeIndex }: { progress: number; activeIndex: number }) {
  // Calculate the fill for the current segment
  const segmentSize = 1 / features.length;
  const segmentStart = activeIndex * segmentSize;
  const segmentProgress = Math.min(1, Math.max(0, (progress - segmentStart) / segmentSize));

  return (
    <div className="hidden lg:flex flex-col items-center gap-3 absolute right-8 top-1/2 -translate-y-1/2 z-10">
      {features.map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          {/* Segment track */}
          <div className="w-[2px] h-16 bg-white/[0.08] relative overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full bg-white transition-all duration-150 ease-linear"
              style={{
                height: i < activeIndex
                  ? "100%"
                  : i === activeIndex
                  ? `${segmentProgress * 100}%`
                  : "0%",
              }}
            />
          </div>
          {/* Dot */}
          <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
            i <= activeIndex ? "bg-white" : "bg-white/20"
          }`} />
        </div>
      ))}
    </div>
  );
}

export function BentoFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
    // Map scroll progress to feature index
    const index = Math.min(
      features.length - 1,
      Math.floor(latest * features.length)
    );
    setActiveIndex(index);
  });

  return (
    <section ref={containerRef} className="relative bg-[#1e1044]" style={{ height: `${features.length * 100}vh` }}>
      {/* Subtle glow */}
      <div className="sticky top-0 h-screen">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(99,102,241,0.08),transparent)]" />
      </div>

      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden" style={{ marginTop: "-100vh" }}>
        {/* Header */}
        <div className="pt-20 pb-8 px-4">
          <Container>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="text-xs font-mono text-gray-600 tracking-wider">[02]</span>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-[0.15em]">Platform</span>
              </div>
              <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-white tracking-[-0.02em]">
                Every step of hiring, handled.
              </h2>
            </div>

            {/* Nav tabs + content in bordered box */}
            <div className="border border-white/15">
              <FeatureNav activeIndex={activeIndex} />
            </div>
          </Container>
        </div>

        {/* Feature content */}
        <div className="flex-1 relative">
          {/* Progress bar */}
          <ProgressBar progress={scrollProgress} activeIndex={activeIndex} />

          {features.map((feature, i) => (
            <motion.div
              key={feature.id}
              className="absolute inset-0 px-4"
              style={{
                opacity: useTransform(
                  scrollYProgress,
                  [
                    Math.max(0, (i - 0.3) / features.length),
                    i / features.length,
                    (i + 0.7) / features.length,
                    Math.min(1, (i + 1) / features.length),
                  ],
                  [0, 1, 1, i === features.length - 1 ? 1 : 0]
                ),
              }}
            >
              <Container>
                <div className="border border-white/15 p-6 md:p-10 max-w-5xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Text */}
                    <div className="pt-4">
                      <span className="text-xs font-mono text-white/80 tracking-wider">{feature.label}</span>
                      <h3 className="mt-3 text-2xl md:text-3xl font-bold text-white tracking-[-0.02em]">
                        {feature.title}
                      </h3>
                      <p className="mt-4 text-base text-white/70 leading-relaxed max-w-md">
                        {feature.description}
                      </p>
                    </div>

                    {/* Visual */}
                    <div className="bg-white/[0.03] border border-white/10 p-6 md:p-8">
                      {feature.visual}
                    </div>
                  </div>
                </div>
              </Container>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
