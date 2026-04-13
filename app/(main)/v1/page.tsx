import { Hero } from "@/components/sections/Hero";
import { FeaturedTalent } from "@/components/sections/FeaturedTalent";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { BentoFeatures } from "@/components/sections/BentoFeatures";
import { CostCalculator } from "@/components/sections/CostCalculator";
import { Regions } from "@/components/sections/Regions";
import { Results } from "@/components/sections/Results";
import { PulseAddon } from "@/components/sections/PulseAddon";
import { FeaturedBlog } from "@/components/sections/FeaturedBlog";
import { DarkCTA } from "@/components/sections/DarkCTA";
import { FAQ } from "@/components/sections/FAQ";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedTalent />
      <HowItWorks />
      <BentoFeatures />
      <CostCalculator />
      <Regions />
      <Results />
      <PulseAddon />
      <DarkCTA />
      <FeaturedBlog />
      <FAQ />
    </main>
  );
}
