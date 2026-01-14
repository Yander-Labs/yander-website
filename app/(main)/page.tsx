import { Hero } from "@/components/sections/Hero";
import { Dashboard } from "@/components/sections/Dashboard";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { Integrations } from "@/components/sections/Integrations";
import { GallupStats } from "@/components/sections/GallupStats";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Results } from "@/components/sections/Results";
import { Testimonials } from "@/components/sections/Testimonials";
import { BuiltForRemote } from "@/components/sections/BuiltForRemote";
import { PrivacyFirst } from "@/components/sections/PrivacyFirst";
import { ProactiveRetention } from "@/components/sections/ProactiveRetention";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { GetStarted } from "@/components/sections/GetStarted";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Dashboard />
      <TrustedBy />
      <Integrations />
      <GallupStats />
      <HowItWorks />
      <Results />
      <Testimonials />
      <BuiltForRemote />
      <PrivacyFirst />
      <ProactiveRetention />
      <WhoItsFor />
      <GetStarted />
      <CTA />
    </main>
  );
}
