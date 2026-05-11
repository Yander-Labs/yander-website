"use client";

import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { useDemoModal } from "../ui/DemoModal";

export function RecruiterPricingClosingCTA() {
  const { openModal: openDemoModal } = useDemoModal();

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a]">
      {/* Cinematic tonal gradient — palette-matched deep purple → black */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#1e1044] via-[#0a0a0a] to-black"
        aria-hidden="true"
      />
      {/* Soft radial vignette directing the eye to centered text */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(99,102,241,0.12),transparent)]"
        aria-hidden="true"
      />

      {/* Second-read moment: oversized "16" set faintly */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span className="text-[clamp(20rem,40vw,40rem)] font-bold leading-none text-white/[0.04] tracking-tighter">
          16
        </span>
      </div>

      <Container>
        <div className="relative py-28 md:py-40 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <p className="text-[11px] font-medium text-white/50 uppercase tracking-[0.22em] mb-8">
              Sourcing across 16 countries
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-[-0.02em] leading-[1.1]">
              Stop paying agencies.
              <br />
              <span className="text-indigo-300">Start sourcing smarter.</span>
            </h2>
            <p className="mt-8 text-base md:text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
              Your first 200 candidates are free. Move up only when you&apos;re
              actively hiring.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://app.yander.ai/sign-up?plan=free&product=recruiter"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0a0a0a] font-medium text-base hover:bg-gray-100 transition-all group w-full sm:w-auto min-h-[52px]"
              >
                Get Started Free
                <span
                  aria-hidden="true"
                  className="transition-transform duration-150 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
              <button
                onClick={openDemoModal}
                className="inline-flex items-center justify-center px-8 py-4 text-white font-medium text-base hover:text-white/80 transition-colors min-h-[52px] underline-offset-4 hover:underline"
              >
                Book a demo
              </button>
            </div>

            {/* Tertiary trust line */}
            <p className="mt-10 text-xs text-white/40 tracking-wide">
              No placement fees ·&nbsp; No contracts ·&nbsp; Cancel anytime
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
