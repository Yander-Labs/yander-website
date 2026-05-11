"use client";

import { motion } from "framer-motion";
import { Container } from "../ui/Container";

interface ProofStat {
  /** Headline number / phrase shown large. */
  headline: string;
  /** Short label below the headline. */
  label: string;
  /** One-line explanation. */
  detail: string;
}

const stats: ProofStat[] = [
  {
    headline: "70%",
    label: "Passive candidates",
    detail:
      "Most strong candidates aren't job hunting. Yander reaches them outbound so you don't have to.",
  },
  {
    headline: "16",
    label: "Countries sourced",
    detail:
      "Latin America, Southeast Asia, South Africa, and Eastern Europe — markets your team can't realistically tap on its own.",
  },
  {
    headline: "Days",
    label: "Not weeks",
    detail:
      "Pre-qualified candidates land in your inbox within days, ready to interview. Make hires fast.",
  },
];

export function RecruiterPricingProof() {
  return (
    <section className="relative py-24 md:py-32 bg-[#fafafa] border-y border-[#E4E7EC] overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 max-w-6xl mx-auto items-start">
          {/* Left: editorial heading + supporting copy (5/12) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            <p className="text-[11px] font-medium text-gray-500 uppercase tracking-[0.22em] mb-6">
              Beyond your hiring funnel
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a0a0a] tracking-[-0.02em] leading-[1.1]">
              Find the talent your network can&apos;t reach.
            </h2>
            <p className="mt-6 text-base text-gray-500 leading-relaxed max-w-md">
              Yander runs continuous outbound across markets and channels your
              team can&apos;t practically cover. You get pre-qualified
              candidates ready to interview — within days, not weeks.
            </p>
          </motion.div>

          {/* Right: 3 stat blocks (7/12) */}
          <div className="lg:col-span-7 space-y-px">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white border border-[#E4E7EC] p-8 md:p-10 -mb-px"
              >
                <span className="text-5xl md:text-6xl font-bold text-[#0a0a0a] tracking-tight leading-none">
                  {stat.headline}
                </span>
                <p className="mt-4 text-xs font-medium text-gray-500 uppercase tracking-[0.15em]">
                  {stat.label}
                </p>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed max-w-md">
                  {stat.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
