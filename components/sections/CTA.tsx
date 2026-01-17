"use client";

import { AnimatedSection } from "../ui/AnimatedSection";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Clock, ShieldCheck, Award } from "lucide-react";
import { useWaitlistModal } from "../ui/WaitlistModal";
import { useDemoModal } from "../ui/DemoModal";

export function CTA() {
  const { openModal } = useWaitlistModal();
  const { openModal: openDemoModal } = useDemoModal();

  return (
    <section className="py-20 md:py-28 divider-dashed">
      <Container size="narrow">
        <AnimatedSection className="text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-6">
            Try Yander for Free Today
          </h2>
          <p className="text-base text-gray-500 mb-10 max-w-xl mx-auto">
            Join leading remote companies already using Yander to build stronger,
            happier, more productive teams.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <Button size="lg" onClick={openModal}>Join Waitlist</Button>
            <Button variant="secondary" size="lg" onClick={openDemoModal}>
              Book a Demo
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>10 Min Setup</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-gray-200" />
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>No Surveillance</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-gray-200" />
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>Trusted By Top Leaders</span>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
