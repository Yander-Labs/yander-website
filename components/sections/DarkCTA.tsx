"use client";

import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { ArrowRight } from "lucide-react";
import { useWaitlistModal } from "../ui/WaitlistModal";
import { useDemoModal } from "../ui/DemoModal";

export function DarkCTA() {
  const { openModal } = useWaitlistModal();
  const { openModal: openDemoModal } = useDemoModal();

  return (
    <section className="py-24 md:py-32 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative overflow-hidden rounded-none bg-[#1e1044] p-10 sm:p-12 md:p-16 lg:p-20"
        >
          {/* Subtle gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(99,102,241,0.12),transparent)]" />

          <div className="relative max-w-3xl mx-auto text-center">
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-white tracking-[-0.02em] leading-[1.1]">
              The future of hiring is
              <br />
              <span className="text-indigo-300">not through a recruitment agency.</span>
            </h2>

            <p className="mt-6 text-lg text-gray-300 max-w-xl mx-auto">
              Join the waitlist and be the first to access AI-powered
              offshore recruiting. Faster, cheaper, and with better culture
              fit than any agency.
            </p>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {[
                { value: "50%", label: "Salary savings" },
                { value: "Days", label: "To first candidates" },
                { value: "From $500/mo", label: "Starting price" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={openModal}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0a0a0a] rounded-none font-medium text-base hover:bg-gray-100 transition-all group w-full sm:w-auto shadow-subtle hover:shadow-elevated"
              >
                Join the Waitlist
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={openDemoModal}
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white rounded-none font-medium text-base hover:bg-white/15 transition-colors border border-white/10 w-full sm:w-auto"
              >
                Book a Demo
              </button>
            </div>
          </div>

          {/* Bottom gradient bar */}
        </motion.div>
      </Container>
    </section>
  );
}
