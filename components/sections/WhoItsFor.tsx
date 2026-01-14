"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "../ui/AnimatedSection";
import { Container } from "../ui/Container";
import { SectionLabel } from "../ui/SectionLabel";
import { Eye, Users, BarChart3, ArrowRight } from "lucide-react";

const personas = [
  {
    id: "founders",
    icon: Eye,
    title: "Founders & CEOs",
    shortTitle: "Strategic visibility",
    description:
      "See people risk the same way you see revenue and pipeline: in one simple view. Protect your top performers and keep your leadership team ahead of issues.",
    color: "purple",
    gradient: "from-purple-500 to-indigo-600",
    features: ["Company-wide dashboards", "Executive summaries", "Risk alerts"],
  },
  {
    id: "managers",
    icon: Users,
    title: "Managers & Team Leads",
    shortTitle: "Day-to-day insights",
    description:
      "Know who needs support, who deserves recognition, and where process is breaking down, without living in every Slack channel or meeting.",
    color: "blue",
    gradient: "from-blue-500 to-cyan-600",
    features: ["Team performance views", "1:1 preparation", "Workload balancing"],
  },
  {
    id: "hr",
    icon: BarChart3,
    title: "People / HR Leaders",
    shortTitle: "Data-driven programs",
    description:
      "Add real data to engagement, burnout, and retention conversations. Show the impact of people programs with real-time trends, not just annual survey scores.",
    color: "emerald",
    gradient: "from-emerald-500 to-teal-600",
    features: ["Engagement analytics", "Program ROI tracking", "Trend reports"],
  },
];

export function WhoItsFor() {
  const [activePersona, setActivePersona] = useState("founders");

  const active = personas.find((p) => p.id === activePersona) || personas[0];

  return (
    <section className="py-20 md:py-28 divider-dashed">
      <Container size="narrow">
        <AnimatedSection className="text-center mb-10">
          <SectionLabel number="07" centered>Who It&apos;s For</SectionLabel>
          <h2 className="font-serif text-3xl md:text-4xl text-gray-900">
            Made for Leaders of Remote and Hybrid Teams
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          {/* Enhanced Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {personas.map((persona) => (
              <button
                key={persona.id}
                onClick={() => setActivePersona(persona.id)}
                className={`group relative px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activePersona === persona.id
                    ? `bg-gradient-to-r ${persona.gradient} text-white shadow-lg`
                    : "bg-white text-gray-600 border border-[#E4E7EC] hover:border-gray-300 hover:shadow-md"
                }`}
              >
                <div className="flex items-center gap-2">
                  <persona.icon className={`w-4 h-4 ${
                    activePersona === persona.id ? "text-white" : "text-gray-400 group-hover:text-gray-600"
                  }`} />
                  <span>{persona.title}</span>
                </div>

                {/* Active indicator line */}
                {activePersona === persona.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-white/50"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Animated Content Card */}
          <div className="relative bg-white rounded-2xl border border-[#E4E7EC] overflow-hidden shadow-elevated">
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${active.gradient} opacity-[0.03]`} />

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="relative p-8"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${active.gradient} flex items-center justify-center shadow-lg`}>
                    <active.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {active.title}
                      </h3>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                        active.color === "purple" ? "bg-purple-100 text-purple-700" :
                        active.color === "blue" ? "bg-blue-100 text-blue-700" :
                        "bg-emerald-100 text-emerald-700"
                      }`}>
                        {active.shortTitle}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-lg">
                      {active.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {active.features.map((feature) => (
                        <div
                          key={feature}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
                            active.color === "purple" ? "bg-purple-50 text-purple-700 border border-purple-100" :
                            active.color === "blue" ? "bg-blue-50 text-blue-700 border border-blue-100" :
                            "bg-emerald-50 text-emerald-700 border border-emerald-100"
                          }`}
                        >
                          <ArrowRight className="w-3 h-3" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom text */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gray-200" />
            <p className="text-xs text-gray-400 font-medium">
              One platform, every leader
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gray-200" />
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
