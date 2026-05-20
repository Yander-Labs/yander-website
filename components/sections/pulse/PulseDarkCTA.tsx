"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { TrackedButton } from "@/components/ui/TrackedButton";
import { ArrowRight, Sparkles } from "lucide-react";
import { useDemoModal } from "@/components/ui/DemoModal";
import { useWaitlistModal } from "@/components/ui/WaitlistModal";

export function PulseDarkCTA() {
  const { openModal: openDemoModal } = useDemoModal();
  const { openModal: openWaitlistModal } = useWaitlistModal();

  return (
    <section className="py-20 md:py-28 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative overflow-hidden rounded-2xl bg-[#171717] p-6 sm:p-8 md:p-12 lg:p-16"
        >
          {/* Single subtle wash — drops the rainbow blurs for a cleaner
              Interfere-style dark panel. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 right-0 w-[600px] h-[400px] rounded-full opacity-40 blur-3xl"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(255,59,0,0.10) 0%, rgba(246,0,157,0.10) 38%, rgba(151,62,198,0.10) 71%, rgba(0,142,255,0.10) 100%)",
            }}
          />

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Content */}
            <div className="text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 mb-6">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-[13px] text-white/80">Start your free trial today</span>
              </div>

              <h2 className="font-medium text-3xl md:text-4xl lg:text-[42px] text-white tracking-[-0.025em] leading-[1.05]">
                Sign up and get a stronger pulse on your team
              </h2>

              <p className="mt-4 text-base md:text-lg text-white/60 max-w-xl">
                Join leading teams who use Yander to stay engaged, prevent
                burnout, and deliver better results.
              </p>

              {/* Stats row — Inter Medium, tighter scale to match the new aesthetic */}
              <div className="mt-8 flex flex-wrap items-center justify-around sm:justify-center lg:justify-start w-full sm:w-auto gap-2 sm:gap-6 md:gap-8">
                <div className="text-center lg:text-left">
                  <p className="font-medium text-xl sm:text-2xl md:text-3xl text-white tracking-[-0.025em]">30%</p>
                  <p className="text-xs sm:text-[13px] text-white/50">Better Retention</p>
                </div>
                <div className="hidden sm:block w-px h-12 bg-white/10" />
                <div className="text-center lg:text-left">
                  <p className="font-medium text-xl sm:text-2xl md:text-3xl text-white tracking-[-0.025em]">8hrs</p>
                  <p className="text-xs sm:text-[13px] text-white/50">Saved Monthly</p>
                </div>
                <div className="hidden sm:block w-px h-12 bg-white/10" />
                <div className="text-center lg:text-left">
                  <p className="font-medium text-xl sm:text-2xl md:text-3xl text-white tracking-[-0.025em]">10min</p>
                  <p className="text-xs sm:text-[13px] text-white/50">Setup Time</p>
                </div>
              </div>
            </div>

            {/* CTA buttons — on-dark variant of the canonical pair */}
            <div className="flex flex-col gap-3 w-full sm:w-auto">
              <TrackedButton
                ctaId="pulse_dark_cta_join_waitlist"
                ctaLocation="pulse_dark_cta"
                ctaDestination="waitlist_modal"
                ctaVariant="primary"
                onClick={openWaitlistModal}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-white px-6 text-[14px] font-medium text-[#171717] transition-colors hover:bg-[#F7F7F6] group w-full sm:w-auto"
              >
                Join waitlist
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </TrackedButton>
              <TrackedButton
                ctaId="pulse_dark_cta_book_demo"
                ctaLocation="pulse_dark_cta"
                ctaDestination="demo_modal"
                ctaVariant="ghost"
                onClick={openDemoModal}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-white/15 bg-transparent px-6 text-[14px] font-medium text-white transition-colors hover:bg-white/10"
              >
                Book a demo
              </TrackedButton>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
