import type { Metadata } from "next";
import { PulseHero } from "@/components/sections/pulse/PulseHero";
import { PulseTrustedBy } from "@/components/sections/pulse/PulseTrustedBy";
import { PulseIntegrations } from "@/components/sections/pulse/PulseIntegrations";
import { PulseBentoFeatures } from "@/components/sections/pulse/PulseBentoFeatures";
import { PulseHowItWorks } from "@/components/sections/pulse/PulseHowItWorks";
import { PulseResults } from "@/components/sections/pulse/PulseResults";
import { PulseUseCases } from "@/components/sections/pulse/PulseUseCases";
import { PulseTestimonials } from "@/components/sections/pulse/PulseTestimonials";
import { PulseDarkCTA } from "@/components/sections/pulse/PulseDarkCTA";
import { PulseFAQ } from "@/components/sections/pulse/PulseFAQ";

export const metadata: Metadata = {
  title: "Yander Pulse — Real-time team performance intelligence",
  description:
    "One dashboard for your team's daily engagement, workload, and quit risk — built from the tools you already use.",
  alternates: {
    canonical: "https://yander.io/pulse",
  },
  robots: "index, follow",
  openGraph: {
    title: "Yander Pulse — Real-time team performance intelligence",
    description:
      "One dashboard for your team's daily engagement, workload, and quit risk — built from the tools you already use.",
    url: "https://yander.io/pulse",
    siteName: "Yander",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yander Pulse — Real-time team performance intelligence",
    description:
      "One dashboard for your team's daily engagement, workload, and quit risk — built from the tools you already use.",
  },
};

export default function PulsePage() {
  return (
    <main>
      <PulseHero />
      <PulseTrustedBy />
      <PulseIntegrations />
      <PulseBentoFeatures />
      <PulseHowItWorks />
      <PulseResults />
      <PulseUseCases />
      <PulseTestimonials />
      <PulseDarkCTA />
      <PulseFAQ />
    </main>
  );
}
