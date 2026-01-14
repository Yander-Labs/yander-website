"use client";

import { AnimatedSection } from "../ui/AnimatedSection";
import { Container } from "../ui/Container";

const companiesRow1 = [
  { name: "Dimer Health", id: "dimer" },
  { name: "Eraser", id: "eraser" },
  { name: "Liqid", id: "liqid" },
  { name: "Seamless.AI", id: "seamless" },
];

const companiesRow2 = [
  { name: "Radisson", id: "radisson" },
  { name: "Montblanc", id: "montblanc" },
  { name: "Mind Lab Pro", id: "mindlab" },
  { name: "Lokai", id: "lokai" },
];

export function TrustedBy() {
  return (
    <section className="py-16 md:py-20 border-y border-[#E4E7EC] bg-gray-50/50">
      <Container size="narrow">
        <AnimatedSection>
          <p className="text-center text-xs text-gray-400 uppercase tracking-[0.1em] mb-10">
            Trusted by the teams behind
          </p>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
              {companiesRow1.map((company, index) => (
                <div key={company.id} className="flex items-center gap-12">
                  <span className="text-gray-300 hover:text-gray-500 transition-colors duration-150 text-base font-medium tracking-tight grayscale hover:grayscale-0">
                    {company.name}
                  </span>
                  {index < companiesRow1.length - 1 && (
                    <span className="hidden md:block h-4 w-px bg-gray-200" />
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
              {companiesRow2.map((company, index) => (
                <div key={company.id} className="flex items-center gap-12">
                  <span className="text-gray-300 hover:text-gray-500 transition-colors duration-150 text-base font-medium tracking-tight grayscale hover:grayscale-0">
                    {company.name}
                  </span>
                  {index < companiesRow2.length - 1 && (
                    <span className="hidden md:block h-4 w-px bg-gray-200" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
