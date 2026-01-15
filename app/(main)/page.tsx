import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { BentoFeatures } from "@/components/sections/BentoFeatures";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Results } from "@/components/sections/Results";
import { Testimonials } from "@/components/sections/Testimonials";
import { BuiltForRemote } from "@/components/sections/BuiltForRemote";
import { DarkCTA } from "@/components/sections/DarkCTA";
import { FAQ } from "@/components/sections/FAQ";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustedBy />
      <BentoFeatures />
      <HowItWorks />
      <Results />
      <Testimonials />
      <BuiltForRemote />
      <DarkCTA />
      <FAQ />
    </main>
  );
}
