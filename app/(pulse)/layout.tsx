"use client";

import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { WaitlistModalProvider } from "@/components/ui/WaitlistModal";
import { DemoModalProvider } from "@/components/ui/DemoModal";

/**
 * (pulse) route group uses the same global Navigation as (main). Pulse
 * pages get their identity from page-level content (heroes, eyebrows,
 * section labels) instead of a separate nav shell. The Waitlist + Demo
 * modal providers remain so Pulse page bodies (e.g. PulseHero) can
 * still trigger their CTAs.
 */
export default function PulseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WaitlistModalProvider>
      <DemoModalProvider>
        <Navigation />
        {children}
        <Footer />
      </DemoModalProvider>
    </WaitlistModalProvider>
  );
}
