import type { Metadata } from "next";
import { TalentPage } from "./TalentPageContent";

export const metadata: Metadata = {
  title: "Available Talent | Yander",
  description:
    "Explore the roles Yander fills for companies. Software engineers, marketers, designers, executive assistants, and more — sourced worldwide, including the US, Canada, UK, Australia, South America, Europe, South Africa, and Southeast Asia.",
  alternates: {
    canonical: "https://yander.io/talent",
  },
  openGraph: {
    title: "Available Talent | Yander",
    description:
      "Explore the roles Yander fills for companies. Hire top remote talent worldwide — premium expertise or up to 50% less than US rates.",
    url: "https://yander.io/talent",
    siteName: "Yander",
    type: "website",
  },
};

export default function Page() {
  return <TalentPage />;
}
