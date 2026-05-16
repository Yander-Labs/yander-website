"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import hayesLogo from "@/components/images/Hayes Logo.png";

/**
 * Hayes Media case study. Used on both the recruitment homepage and the
 * recruiter /pricing page. Drop a real Oscar Lora headshot at
 * /public/avatars/oscar-lora.jpg — the layout assumes a square portrait.
 */
const OSCAR_HEADSHOT = "/avatars/oscar-lora.png";

export function CaseStudyHayes() {
  return (
    <section className="relative py-20 md:py-28 bg-[#fafafa] border-y border-[#E4E7EC] overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="max-w-5xl mx-auto"
        >
          {/* Eyebrow + headline */}
          <div className="text-center mb-10 md:mb-14">
            <p className="text-[11px] font-medium text-gray-500 uppercase tracking-[0.22em] mb-4">
              Case study
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a0a0a] tracking-[-0.02em] leading-[1.1]">
              How Yander cut hiring time by 89%
            </h2>
            <p className="mt-5 text-base md:text-lg text-gray-500 max-w-2xl mx-auto">
              Hayes Media filled two senior roles in 6 days, work that
              normally takes 4 weeks each.
            </p>
          </div>

          {/* Bento card */}
          <div className="relative bg-white border border-[#E4E7EC] shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]">
            {/* Left: headshot */}
            <div className="relative aspect-square md:aspect-auto bg-[#fafaf7] border-b md:border-b-0 md:border-r border-[#E4E7EC]">
              <Image
                src={OSCAR_HEADSHOT}
                alt="Oscar Lora, Head of Performance at Hayes Media"
                fill
                sizes="(min-width: 1024px) 320px, (min-width: 768px) 280px, 100vw"
                className="object-cover"
                priority={false}
              />
            </div>

            {/* Right: logo + quote + sign-off */}
            <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-between gap-8">
              <div>
                {/* Hayes logo */}
                <div className="mb-6 md:mb-8">
                  <Image
                    src={hayesLogo}
                    alt="Hayes Media"
                    width={140}
                    height={32}
                    className="h-7 md:h-8 w-auto object-contain"
                  />
                </div>

                {/* Quote */}
                <blockquote className="text-lg md:text-xl lg:text-2xl text-[#0a0a0a] leading-relaxed tracking-[-0.01em]">
                  &ldquo;We hired a senior Shopify developer and a creative
                  strategist in 6 days. Each role usually takes us 4 weeks,
                  plus over $1,000 in job ads. Yander surfaced strong
                  candidates we&apos;d never have reached on our own &mdash;
                  for a fraction of the cost.&rdquo;
                </blockquote>
              </div>

              {/* Sign-off */}
              <div>
                <p className="text-sm font-semibold text-[#0a0a0a]">
                  Oscar Lora
                </p>
                <p className="text-sm text-gray-500">
                  Head of Performance, Hayes Media
                </p>
              </div>
            </div>
          </div>

          {/* Stats strip below card */}
          <div className="mt-6 grid grid-cols-3 border border-[#E4E7EC] bg-white">
            {[
              { value: "6 days", label: "To fill both roles" },
              { value: "9x", label: "Faster than usual" },
              { value: "$1,000", label: "Saved on job ads" },
            ].map((stat, idx) => (
              <div
                key={stat.label}
                className={`p-5 md:p-6 text-center ${
                  idx < 2 ? "border-r border-[#E4E7EC]" : ""
                }`}
              >
                <p className="text-2xl md:text-3xl font-bold text-[#0a0a0a] tracking-tight leading-none">
                  {stat.value}
                </p>
                <p className="mt-2 text-[11px] md:text-xs text-gray-500 uppercase tracking-[0.15em]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
