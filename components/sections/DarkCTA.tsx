"use client";

import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { ArrowRight, Sparkles } from "lucide-react";
import { useDemoModal } from "../ui/DemoModal";

export function DarkCTA() {
  const { openModal: openDemoModal } = useDemoModal();

  return (
    <section className="py-20 md:py-28 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#171717] via-[#1f1f1f] to-[#171717] p-6 sm:p-8 md:p-12 lg:p-16"
        >
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-amber-500/10 to-rose-500/10 rounded-full blur-3xl" />

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }} />

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Content */}
            <div className="text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 mb-6">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-white/80">Start your free trial today</span>
              </div>

              <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] text-white tracking-[-0.02em] leading-tight">
                Sign up and get a stronger pulse on your team
              </h2>

              <p className="mt-4 text-base md:text-lg text-white/60 max-w-xl">
                Join leading agencies who use Yander to keep their teams engaged,
                prevent burnout, and deliver better results for clients.
              </p>

              {/* Stats row */}
              <div className="mt-8 flex flex-wrap items-center justify-around sm:justify-center lg:justify-start w-full sm:w-auto gap-2 sm:gap-6 md:gap-8">
                <div className="text-center lg:text-left">
                  <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">30%</p>
                  <p className="text-xs sm:text-sm text-white/50">Better Retention</p>
                </div>
                <div className="hidden sm:block w-px h-12 bg-white/10" />
                <div className="text-center lg:text-left">
                  <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">8hrs</p>
                  <p className="text-xs sm:text-sm text-white/50">Saved Monthly</p>
                </div>
                <div className="hidden sm:block w-px h-12 bg-white/10" />
                <div className="text-center lg:text-left">
                  <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">10min</p>
                  <p className="text-xs sm:text-sm text-white/50">Setup Time</p>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-3 w-full sm:w-auto">
              <a
                href="https://accounts.yander.ai/sign-up"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 rounded-[8px] font-medium text-base hover:bg-gray-100 transition-colors group"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={openDemoModal}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 text-white rounded-[8px] font-medium text-base hover:bg-white/20 transition-colors border border-white/10"
              >
                Book a Demo
              </button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
