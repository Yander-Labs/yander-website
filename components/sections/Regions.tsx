"use client";

import { motion } from "framer-motion";
import { Container } from "../ui/Container";

const regions = [
  {
    name: "South America",
    countries: ["Brazil", "Colombia", "Argentina"],
    talent: "Engineering, Design, Data Science",
    savings: "40-55%",
    highlight: "Strong timezone overlap with US East Coast",
  },
  {
    name: "South Africa",
    countries: ["South Africa"],
    talent: "Development, Finance, Operations, Support",
    savings: "40-60%",
    highlight: "English-speaking, strong work ethic, minimal timezone gap with Europe",
  },
  {
    name: "Southeast Asia",
    countries: ["India", "Philippines"],
    talent: "Engineering, Support, Admin, Finance",
    savings: "50-70%",
    highlight: "Largest talent pool, highest savings",
  },
];

export function Regions() {
  return (
    <section className="relative py-24 md:py-32 bg-[#fafafa] overflow-hidden">
      <Container>
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-xs font-mono text-gray-300 tracking-wider">[04]</span>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-[0.15em]">Global talent</span>
            </div>
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-[#0a0a0a] tracking-[-0.02em]">
              Three regions. One platform.
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
              Hire pre-vetted professionals where A-player talent costs up to
              50% less than domestic hires. No sacrificing quality.
            </p>
          </motion.div>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 max-w-5xl mx-auto border border-gray-200">
          {regions.map((region, index) => (
            <motion.div
              key={region.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="bg-white p-8 hover:bg-[#fafafa] transition-colors duration-300"
            >
              <h3 className="text-xl font-bold text-[#0a0a0a] mb-4">{region.name}</h3>

              {/* Countries */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {region.countries.map((country) => (
                  <span key={country} className="text-sm text-gray-500">
                    {country}{region.countries.indexOf(country) < region.countries.length - 1 ? "," : ""}
                  </span>
                ))}
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Top roles</p>
                  <p className="text-sm text-gray-700">{region.talent}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Salary savings</p>
                  <p className="text-sm font-semibold text-[#0a0a0a]">{region.savings} vs US rates</p>
                </div>
              </div>

              {/* Highlight */}
              <p className="mt-6 pt-6 border-t border-gray-100 text-xs text-gray-400 leading-relaxed">
                {region.highlight}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
