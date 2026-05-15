/**
 * Render an arbitrary JSON-LD object as an inline <script>.
 * Use this for FAQPage, HowTo, Speakable, Product, etc. schemas that don't
 * have a dedicated component.
 *
 * Always render in the initial server HTML — never wrap in next/script
 * (that defers and crawlers may miss it).
 */
export function SchemaJsonLd({ schema }: { schema: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

import { SITE_URL } from "@/lib/site";

export interface FAQ {
  question: string;
  answer: string;
}

/** Build a FAQPage schema from a list of Q&As. */
export function faqSchema(faqs: FAQ[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export interface HowToStep {
  name: string;
  text: string;
  url?: string;
  image?: string;
}

/** Build a HowTo schema for step-by-step process sections. */
export function howToSchema({
  name,
  description,
  totalTime,
  steps,
}: {
  name: string;
  description: string;
  /** ISO 8601 duration (e.g. "PT5M"). Optional. */
  totalTime?: string;
  steps: HowToStep[];
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    ...(totalTime ? { totalTime } : {}),
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.url ? { url: s.url } : {}),
      ...(s.image ? { image: s.image } : {}),
    })),
  };
}

/** Build a Speakable schema marker for AI voice-assistant extraction. */
export function speakableSchema({
  url,
  cssSelectors,
}: {
  url: string;
  cssSelectors: string[];
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: url.startsWith("http") ? url : `${SITE_URL}${url}`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors,
    },
  };
}
