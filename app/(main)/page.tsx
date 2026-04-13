import type { Metadata } from "next";
import { V2HomePage } from "../(main)/v2/V2HomePage";

export const metadata: Metadata = {
  title: "Yander - The First AI Agent That Recruits For You",
  description:
    "Tell Yander who you need to hire. It headhunts, evaluates, and presents culture-matched candidates ready to interview.",
};

export default function Home() {
  return <V2HomePage />;
}
