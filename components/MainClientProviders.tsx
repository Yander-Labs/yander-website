"use client";

/**
 * MainClientProviders — bundles all client-side providers that wrap the
 * (main) route group. Extracted so app/(main)/layout.tsx can be a true
 * async server component (needed to call `cookies()` for SSR auth state).
 */

import type { ReactNode } from "react";
import { WaitlistModalProvider } from "@/components/ui/WaitlistModal";
import { DemoModalProvider } from "@/components/ui/DemoModal";
import { AuthStateProvider } from "@/components/AuthStateProvider";

export function MainClientProviders({
  children,
  isLoggedIn,
}: {
  children: ReactNode;
  isLoggedIn: boolean;
}) {
  return (
    <AuthStateProvider isLoggedIn={isLoggedIn}>
      <WaitlistModalProvider>
        <DemoModalProvider>{children}</DemoModalProvider>
      </WaitlistModalProvider>
    </AuthStateProvider>
  );
}
