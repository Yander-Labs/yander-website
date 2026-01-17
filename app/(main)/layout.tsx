"use client";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WaitlistModalProvider } from "@/components/ui/WaitlistModal";
import { DemoModalProvider } from "@/components/ui/DemoModal";

export default function MainLayout({
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
