"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../ui/Container";
import { ArrowRight } from "lucide-react";
import { useWaitlistModal } from "../ui/WaitlistModal";

export function CostCalculator() {
  const [roleTitle, setRoleTitle] = useState("");
  const [salary, setSalary] = useState("");
  const [showResults, setShowResults] = useState(false);
  const { openModal } = useWaitlistModal();

  const salaryNum = parseFloat(salary.replace(/,/g, "")) || 0;
  const agencyFee = salaryNum * 0.2;
  const yanderCost = 500;
  const savings = agencyFee - yanderCost;

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (salaryNum > 0) setShowResults(true);
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalary(e.target.value.replace(/[^0-9]/g, ""));
    setShowResults(false);
  };

  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      <Container>
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-xs font-mono text-gray-300 tracking-wider">[03]</span>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-[0.15em]">Cost comparison</span>
            </div>
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-[#0a0a0a] tracking-[-0.02em]">
              Stop overpaying
              <br />
              <span className="text-[#1e1044]">for recruitment.</span>
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-md">
              Agencies charge 20% of annual salary per placement.
              Yander starts from $500/month.
            </p>

            <div className="mt-10 space-y-6">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Typical agency</p>
                <p className="text-4xl font-bold text-[#0a0a0a] tracking-tight">20%</p>
                <p className="text-sm text-gray-400 mt-1">of annual salary, per placement</p>
              </div>
              <div className="h-px bg-gray-100" />
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Yander</p>
                <p className="text-4xl font-bold text-[#0a0a0a] tracking-tight">From $500<span className="text-lg font-medium text-gray-400">/mo</span></p>
                <p className="text-sm text-gray-400 mt-1">Flat rate, unlimited roles</p>
              </div>
            </div>
          </motion.div>

          {/* Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-[#fafafa] rounded-none border border-gray-200/60 shadow-soft-lg overflow-hidden">
              <form onSubmit={handleCalculate} className="p-6 md:p-8">
                <h3 className="text-lg font-semibold text-[#0a0a0a] mb-1">Calculate your savings</h3>
                <p className="text-sm text-gray-400 mb-6">See how much you save per hire compared to an agency.</p>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="roleTitle" className="block text-sm font-medium text-gray-600 mb-1.5">
                      Enter the role you're hiring
                    </label>
                    <input
                      type="text"
                      id="roleTitle"
                      value={roleTitle}
                      onChange={(e) => setRoleTitle(e.target.value)}
                      placeholder="e.g. Senior Developer"
                      className="w-full px-4 py-3 rounded-none border border-gray-200/60 bg-white text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]/10 focus:border-gray-300 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="salary" className="block text-sm font-medium text-gray-600 mb-1.5">
                      Your annual salary budget (USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">$</span>
                      <input
                        type="text"
                        id="salary"
                        value={salary ? Number(salary).toLocaleString() : ""}
                        onChange={handleSalaryChange}
                        placeholder="60,000"
                        className="w-full pl-8 pr-4 py-3 rounded-none border border-gray-200/60 bg-white text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]/10 focus:border-gray-300 transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0a0a0a] text-white rounded-none font-medium hover:bg-[#171717] transition-all min-h-[48px]"
                  >
                    Calculate
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              <AnimatePresence>
                {showResults && salaryNum > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="border-t border-gray-200 overflow-hidden"
                  >
                    <div className="p-6 md:p-8 bg-white">
                      {roleTitle && (
                        <p className="text-sm text-gray-400 text-center mb-6">
                          Hiring a <span className="text-gray-700 font-medium">{roleTitle}</span> at {formatCurrency(salaryNum)}/year
                        </p>
                      )}

                      <div className="grid grid-cols-2 gap-px bg-gray-200">
                        <div className="bg-white p-5">
                          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Agency cost</p>
                          <p className="text-2xl font-bold text-[#0a0a0a]">{formatCurrency(agencyFee)}</p>
                          <p className="text-xs text-gray-400 mt-1">One-time placement fee</p>
                        </div>
                        <div className="bg-white p-5">
                          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Yander</p>
                          <p className="text-2xl font-bold text-[#0a0a0a]">From {formatCurrency(yanderCost)}<span className="text-sm font-medium text-gray-400">/mo</span></p>
                          <p className="text-xs text-gray-400 mt-1">Monthly subscription</p>
                        </div>
                      </div>

                      {savings > 0 && (
                        <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                          <p className="text-xs text-gray-400 uppercase tracking-wider">Savings per hire</p>
                          <p className="text-4xl font-bold text-[#0a0a0a] mt-2 tracking-tight">
                            {formatCurrency(savings)}
                          </p>
                          <button
                            onClick={openModal}
                            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#0a0a0a] hover:text-gray-600 transition-colors"
                          >
                            Start saving with Yander
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
