"use client";

import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { AnimatedNumber } from "../ui/AnimatedNumber";

const stats = [
  {
    value: 50,
    suffix: "%",
    label: "Lower salary costs",
    description: "Hire from markets where top talent costs up to half of US rates",
    color: "text-[#0a0a0a]",
  },
  {
    value: 500,
    suffix: "",
    prefix: "$",
    label: "From $500/mo",
    description: "Flat monthly fee. No percentage of salary, no placement fees.",
    color: "text-[#0a0a0a]",
  },
  {
    value: 3,
    suffix: "",
    label: "Global regions",
    description: "South America, South Africa, and Southeast Asia talent pools",
    color: "text-[#0a0a0a]",
  },
  {
    value: 0,
    suffix: "",
    prefix: "$",
    label: "Placement fees",
    description: "Unlike agencies that charge 20% of salary per hire",
    color: "text-[#0a0a0a]",
  },
];

export function Results() {
  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">

      <Container>
        <div className="relative text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-xs font-mono text-gray-300 tracking-wider">[05]</span>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-[0.15em]">By the numbers</span>
            </div>
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-[#0a0a0a] tracking-[-0.02em]">
              Hire better. Spend less.
            </h2>
          </motion.div>
        </div>

        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 max-w-5xl mx-auto border border-gray-200">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="group relative text-center p-6 md:p-8 bg-white rounded-none"
            >
              <div>
                <div className="mb-3">
                  {"prefix" in stat && stat.prefix ? (
                    <span className={`font-bold text-4xl md:text-5xl tracking-tight ${stat.color}`}>
                      {stat.prefix}{stat.value}{stat.suffix}
                    </span>
                  ) : (
                    <AnimatedNumber
                      value={stat.value}
                      suffix={stat.suffix}
                      duration={1500}
                      delay={idx * 150}
                      className={`font-bold text-4xl md:text-5xl tracking-tight ${stat.color}`}
                    />
                  )}
                </div>
                <p className="text-sm font-semibold text-gray-900 mb-1">{stat.label}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
