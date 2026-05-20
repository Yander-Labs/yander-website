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
    headline: "Worldwide",
    label: "Sourcing reach",
    detail:
      "From the US, Canada, UK, and Australia to South America, Europe, South Africa, and Southeast Asia — broader reach than your team can practically cover.",
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
    <section className="relative py-24 md:py-32 bg-[#fafaf9] border-y border-[rgba(0,0,0,0.06)] overflow-hidden">
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
            <p className="text-[11px] font-[var(--font-geist-mono)] text-[#171717]/40 uppercase tracking-[0.18em] mb-6">
              Beyond your hiring funnel
            </p>
            <h2 className="font-medium text-[#171717] text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.05] tracking-[-0.025em]">
              Find the talent your network can&apos;t reach.
            </h2>
            <p className="mt-6 text-[15px] text-[#171717]/60 leading-relaxed max-w-md">
              Yander runs continuous outbound across markets and channels your
              team can&apos;t practically cover. You get pre-qualified
              candidates ready to interview within days, not weeks.
            </p>
          </motion.div>

          {/* Right: 3 stat cards (7/12) — rounded-2xl with the canon
              double-stop drop shadow, gap-3 between them so each reads
              as its own moment instead of the prior connected-stack
              flush rail. */}
          <div className="lg:col-span-7 space-y-3">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="rounded-2xl bg-white border border-[rgba(0,0,0,0.06)] shadow-[0_1px_2px_rgba(0,0,0,0.025),0_18px_48px_-20px_rgba(0,0,0,0.10)] p-8 md:p-10"
              >
                <span className="block font-medium text-[#171717] tracking-[-0.025em] leading-none text-[clamp(2.5rem,5vw,3.5rem)]">
                  {stat.headline}
                </span>
                <p className="mt-4 text-[11px] font-[var(--font-geist-mono)] text-[#171717]/40 uppercase tracking-[0.18em]">
                  {stat.label}
                </p>
                <p className="mt-2 text-[14px] text-[#171717]/60 leading-[1.6] max-w-md">
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
