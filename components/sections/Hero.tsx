"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { Clock, ShieldCheck, Award } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden bg-stripes">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white/50 pointer-events-none" />

      <Container>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[80px] tracking-tight text-gray-900 leading-[1.05]"
          >
            Build a Stronger Remote Team.{" "}
            <span className="text-gray-400">Keep Clients Longer.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="mt-8 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
          >
            Marketing agency leaders with remote teams don&apos;t realize when
            employees skip meetings, burn out, or do the bare minimum. Yander
            keeps a live pulse on engagement, workload, and sentiment without
            intrusive time tracking.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button size="lg">Join Waitlist</Button>
            <Button variant="secondary" size="lg">
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
            className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-400"
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
      </Container>
    </section>
  );
}
