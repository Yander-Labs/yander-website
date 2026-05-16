"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useDemoModal } from "@/components/ui/DemoModal";

/**
 * Client island for the About page contact CTAs. The page itself stays a
 * server component (it exports metadata for SEO) — this component owns
 * just the buttons that need the demo modal hook.
 */
export function AboutContactButtons() {
  const { openModal: openDemoModal } = useDemoModal();

  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary" onClick={openDemoModal}>
        Book a demo
      </Button>
      <Link href="/pricing">
        <Button variant="secondary">See pricing</Button>
      </Link>
      <a href="mailto:jordan@yanderlabs.com">
        <Button variant="ghost">jordan@yanderlabs.com</Button>
      </a>
    </div>
  );
}
