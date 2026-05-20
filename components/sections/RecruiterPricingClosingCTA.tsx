"use client";

/**
 * RecruiterPricingClosingCTA — final-CTA section at the end of /pricing.
 *
 * Same shape as the homepage FinalCTA: white background, centered,
 * Inter Medium clamp() headline, subhead, and the canonical CTAButtons
 * pair. No dark gradient panel, no ∞ symbol flourish, no indigo
 * vignette — those were V2 patterns that drift from the new aesthetic.
 *
 * Pulse is the only page that still ends on a dark CTA (PulseDarkCTA)
 * because Pulse uses a different funnel (waitlist) and the dark panel
 * serves as a distinct visual register for that flow.
 */

import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { CTAButtons } from "../ui/CTAButtons";

export function RecruiterPricingClosingCTA() {
  return (
    <section className="py-28 lg:py-36 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="mx-auto text-balance font-medium text-[#171717] text-[clamp(2.5rem,5.2vw,3.625rem)] leading-[0.97] tracking-[-0.025em]">
            Reach beyond your funnel.
            <br />
            <span className="text-[#171717]/50">Start sourcing smarter.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-[#171717]/60">
            More qualified candidates, faster, more cost-effective to fill
            roles. Your first 200 candidates are free. Move up only when
            you&apos;re actively hiring.
          </p>
          <div className="mt-9 flex items-center justify-center">
            <CTAButtons ctaLocation="recruiter_pricing_closing" size="lg" />
          </div>
          <p className="mt-10 text-[13px] text-[#171717]/40">
            No placement fees · No contracts · Cancel anytime
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
