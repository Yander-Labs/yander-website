"use client";

import { Footer } from "@/components/Footer";
import { WaitlistModalProvider } from "@/components/ui/WaitlistModal";
import { DemoModalProvider } from "@/components/ui/DemoModal";
import { PulseNavigation } from "./pulse/PulseNavigation";

export default function PulseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WaitlistModalProvider>
      <DemoModalProvider>
        <PulseNavigation />
        {children}
        <Footer />
      </DemoModalProvider>
    </WaitlistModalProvider>
  );
}
