import type { Metadata } from "next";
import { V2HomePage } from "./V2HomePage";

export const metadata: Metadata = {
  title: "Yander - The First AI Agent That Recruits For You",
  description:
    "Tell Yander who you need to hire. It headhunts, vets, and presents culture-matched candidates ready to interview.",
  robots: "noindex",
};

export default function Page() {
  return <V2HomePage />;
}
