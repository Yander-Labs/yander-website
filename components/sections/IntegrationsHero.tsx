"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "../ui/Container";
import { ArrowRight } from "lucide-react";

export function IntegrationsHero() {
  return (
    <section className="pt-32 pb-8 md:pt-40 md:pb-10 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 tracking-[-0.02em] leading-tight">
            Connect the tools your team already uses
          </h1>
          <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto">
            Yander pulls data from your communication, project management, and meeting tools to give you one unified view of team and client health.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/integrations/all"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-[6px] font-medium text-sm hover:bg-gray-800 transition-colors group min-h-[44px]"
            >
              Browse all integrations
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="https://app.yander.ai/sign-up?plan=starter&billing=monthly"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 border border-[#E4E7EC] rounded-[6px] font-medium text-sm hover:bg-gray-50 transition-colors min-h-[44px]"
            >
              Get Started Free
            </a>
          </div>
        </motion.div>

      </Container>
    </section>
  );
}
