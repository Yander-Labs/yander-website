"use client";

import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { Check } from "lucide-react";

const plans = ["Starter", "Professional", "Growth", "Enterprise"];

const features = [
  "Pulse Scoring",
  "Memory & Facts",
  "Dashboard & History",
  "Meeting Recording & Transcribe",
  "Manual Score Refresh",
  "Dedicated Slack support",
];

export function PricingComparison() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 text-center mb-12 tracking-[-0.02em]">
            Compare plans
          </h2>

          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-[#E4E7EC]">
                  <th className="text-left text-sm font-medium text-gray-500 pb-4 pr-4 w-[200px]">
                    Feature
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan}
                      className="text-center text-sm font-semibold text-gray-900 pb-4 px-2"
                    >
                      {plan}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature) => (
                  <tr key={feature} className="border-b border-[#E4E7EC] last:border-b-0">
                    <td className="text-sm text-gray-700 py-4 pr-4">{feature}</td>
                    {plans.map((plan) => (
                      <td key={plan} className="text-center py-4 px-2">
                        <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
