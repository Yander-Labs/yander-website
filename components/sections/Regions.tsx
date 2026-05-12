"use client";

import { motion } from "framer-motion";
import { Container } from "../ui/Container";

const regions = [
  {
    name: "North America",
    countries: ["USA", "Canada"],
    talent: "Engineering, Product, Strategy",
    positioning: "Native English",
    highlight: "Premium expertise. US timezone overlap. Native English.",
  },
  {
    name: "South America",
    countries: ["Brazil", "Colombia", "Argentina", "Mexico"],
    talent: "Engineering, Design, Data Science",
    positioning: "40-55% less than US rates",
    highlight: "Strong US East Coast overlap. Significant cost savings.",
  },
  {
    name: "UK & Ireland",
    countries: ["UK", "Ireland"],
    talent: "Engineering, Operations, Finance",
    positioning: "Native English",
    highlight: "Senior expertise on tap. EU work hours. Native English.",
  },
  {
    name: "Continental Europe",
    countries: ["Spain", "Portugal", "Poland", "Eastern Europe"],
    talent: "Engineering, Design, Marketing",
    positioning: "30-60% less than US rates",
    highlight: "Strong technical depth. EU timezones. Cost-effective.",
  },
  {
    name: "Africa",
    countries: ["South Africa", "Kenya", "Nigeria"],
    talent: "Development, Finance, Operations, Support",
    positioning: "40-60% less than US rates",
    highlight: "English-speaking. Minimal timezone gap with Europe.",
  },
  {
    name: "Asia-Pacific",
    countries: ["India", "Philippines", "Australia"],
    talent: "Engineering, Support, Admin, Finance",
    positioning: "Native (AU) · 50-70% less than US rates (IN, PH)",
    highlight: "Largest talent pool. Round-the-clock coverage.",
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
              Talent, worldwide.
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
              Access top professionals anywhere — from premium native-English
              markets to cost-effective regions where you&apos;ll save up to 70%.
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
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Positioning</p>
                  <p className="text-sm font-semibold text-[#0a0a0a]">{region.positioning}</p>
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
