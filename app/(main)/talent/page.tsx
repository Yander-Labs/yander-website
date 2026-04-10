import type { Metadata } from "next";
import { TalentPage } from "./TalentPageContent";

export const metadata: Metadata = {
  title: "Available Talent | Yander",
  description:
    "Explore the roles Yander fills for companies. Software engineers, marketers, designers, executive assistants, and more across Latin America, Southeast Asia, South Africa, and Eastern Europe.",
  alternates: {
    canonical: "https://yander.io/talent",
  },
  openGraph: {
    title: "Available Talent | Yander",
    description:
      "Explore the roles Yander fills for companies. Hire pre-vetted offshore talent at up to 50% less than domestic rates.",
    url: "https://yander.io/talent",
    siteName: "Yander",
    type: "website",
  },
};

export default function Page() {
  return <TalentPage />;
}
