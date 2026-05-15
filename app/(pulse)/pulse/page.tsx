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
import { pulseFaqs } from "@/lib/faqs";
import {
  SchemaJsonLd,
  faqSchema,
  howToSchema,
  speakableSchema,
} from "@/components/seo/SchemaJsonLd";
import { pageMetadata } from "@/lib/page-metadata";
import { SITE_URL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Yander Pulse — Real-time team performance intelligence",
  description:
    "Track team engagement, workload, and quit risk in one dashboard. Built from Slack, Notion, Gmail, ClickUp, Monday. No surveys, no keystroke logging.",
  path: "/pulse",
  ogImageAlt: "Yander Pulse — real-time team performance intelligence",
});

const pulseSoftwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Yander Pulse",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "WorkforceAnalytics",
  description:
    "Real-time team performance intelligence — engagement, workload, and quit-risk signals built from the tools your team already uses.",
  brand: { "@type": "Brand", name: "Yander" },
  operatingSystem: "Web",
  url: `${SITE_URL}/pulse`,
  offers: {
    "@type": "Offer",
    url: `${SITE_URL}/pulse-pricing`,
    priceCurrency: "USD",
    price: "29",
    availability: "https://schema.org/InStock",
  },
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const pulseHowToSchema = howToSchema({
  name: "How Yander Pulse measures team performance",
  description:
    "How Pulse turns existing tool activity into a real-time picture of team engagement, workload, and quit risk.",
  totalTime: "PT10M",
  steps: [
    {
      name: "Connect your tools",
      text: "Authorize Slack, Notion, Gmail, ClickUp, Monday, Asana, Fathom, or Fireflies. Setup takes about 10 minutes — no agent install, no keystroke logging.",
    },
    {
      name: "Pulse calibrates patterns",
      text: "Over the first 24-48 hours Pulse learns each team member's normal activity rhythm — meeting load, response latency, ticket throughput, sentiment in summaries.",
    },
    {
      name: "Daily signals appear in your dashboard",
      text: "Every morning Pulse surfaces engagement deltas, workload spikes, and quit-risk warnings before they become resignations.",
    },
    {
      name: "Drill into anomalies",
      text: "When a signal fires, open the timeline view to see the underlying activity changes — never the raw messages, only the aggregate pattern.",
    },
  ],
});

const pulseSpeakable = speakableSchema({
  url: "/pulse",
  cssSelectors: ["h1", ".pulse-hero-sub", "section[data-faq] dt"],
});

export default function PulsePage() {
  return (
    <main>
      <SchemaJsonLd schema={pulseSoftwareSchema} />
      <SchemaJsonLd schema={faqSchema(pulseFaqs)} />
      <SchemaJsonLd schema={pulseHowToSchema} />
      <SchemaJsonLd schema={pulseSpeakable} />
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
