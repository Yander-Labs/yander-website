import { YanderInterfere } from "@/components/sections/YanderInterfere";

// Homepage inherits metadata from app/layout.tsx — the root metadata IS the
// homepage metadata. Avoiding a partial override here means description fields
// stay consistent across <meta>, og:, and twitter:.
//
// As of 2026-05-20 the root homepage is the /yander-interfere design.
// Navigation + Footer + Modal providers come from app/(main)/layout.tsx.

export default function Home() {
  return <YanderInterfere />;
}
