import { PlaybookClient } from "./PlaybookClient";
import { SchemaJsonLd } from "@/components/seo/SchemaJsonLd";
import { pageMetadata } from "@/lib/page-metadata";
import { SITE_URL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "The Remote Offshore Talent Playbook — Free 2026 | Yander",
  description:
    "Free 2026 playbook for hiring offshore talent — country salary benchmarks, legal pitfalls, interview templates, and a 90-day onboarding plan.",
  path: "/remote-hiring-playbook",
  ogImageAlt: "The Remote & Offshore Talent Playbook — Free Guide",
});

const playbookSchema = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "The Remote Offshore Talent Playbook",
  url: `${SITE_URL}/remote-hiring-playbook`,
  description:
    "A free 2026 guide on hiring global remote talent — salary benchmarks, legal compliance, interview templates, and a 90-day onboarding plan.",
  inLanguage: "en-US",
  isAccessibleForFree: true,
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "ReadAction",
    target: `${SITE_URL}/remote-hiring-playbook`,
  },
};

export default function RemoteHiringPlaybookPage() {
  return (
    <>
      <SchemaJsonLd schema={playbookSchema} />
      <PlaybookClient />
    </>
  );
}
