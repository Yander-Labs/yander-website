"use client";

/**
 * AuthStateProvider — marketing-site auth context.
 *
 * The marketing site (yander.ai) is a SEPARATE Next.js app from the
 * authenticated product (app.yander.ai). To know if the visitor is
 * already signed in WITHOUT installing Clerk on the marketing site, we
 * rely on the standard "satellite domain" pattern that Vercel, Linear,
 * Cal.com, Resend, and most modern SaaS use:
 *
 *   1. Clerk on app.yander.ai is configured so the session cookie
 *      (`__session`) is scoped to the PARENT domain (`.yander.ai`).
 *   2. yander.ai reads that cookie server-side at the request boundary
 *      and passes the boolean down via this context.
 *   3. <CTAButtons> consumes `useAuthState()` to swap the CTA pair for
 *      a single "Open dashboard" button when logged in.
 *
 * No Clerk dependency on the marketing site. No client-side fetch flash.
 * Zero new infra — just one Clerk dashboard config and a cookie read.
 *
 * The actual cookie read happens server-side in app/(main)/layout.tsx
 * (via Next's `cookies()` API) and is passed to this provider as a
 * boolean prop. The provider itself is a "use client" component so
 * children that need the value can use React hooks normally.
 */

import { createContext, useContext, type ReactNode } from "react";

interface AuthState {
  /** True if the visitor has an app.yander.ai session cookie on the
   * parent .yander.ai domain. False otherwise (anonymous, server-render
   * misconfig, or session expired). */
  isLoggedIn: boolean;
}

const AuthStateContext = createContext<AuthState>({ isLoggedIn: false });

export function AuthStateProvider({
  children,
  isLoggedIn,
}: {
  children: ReactNode;
  isLoggedIn: boolean;
}) {
  return (
    <AuthStateContext.Provider value={{ isLoggedIn }}>
      {children}
    </AuthStateContext.Provider>
  );
}

export function useAuthState(): AuthState {
  return useContext(AuthStateContext);
}
