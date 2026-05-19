import { redirect } from "next/navigation"

// The /yander-interfere preview was promoted to the root homepage on 2026-05-20.
// Permanent redirect so any stale links/bookmarks land on the canonical URL.
export const metadata = {
  robots: { index: false, follow: false },
}

export default function YanderInterferePage() {
  redirect("/")
}
