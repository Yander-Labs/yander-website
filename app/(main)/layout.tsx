"use client";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WaitlistModalProvider } from "@/components/ui/WaitlistModal";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WaitlistModalProvider>
      <Navigation />
      {children}
      <Footer />
    </WaitlistModalProvider>
  );
}
