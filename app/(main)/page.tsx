import { V2HomePage } from "@/components/sections/V2HomePage";

// Homepage inherits metadata from app/layout.tsx — the root metadata IS the
// homepage metadata. Avoiding a partial override here means description fields
// stay consistent across <meta>, og:, and twitter:.

export default function Home() {
  return <V2HomePage />;
}
