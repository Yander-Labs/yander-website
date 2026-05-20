"use client";

/**
 * AuthStateProvider — marketing-site auth context.
 *
 * The marketing site (yander.ai) is a SEPARATE Next.js app from the
 * authenticated product (app.yander.ai). To know if the visitor is
 * already signed in WITHOUT installing Clerk on the marketing site, we
 * use a tiny parent-domain flag cookie written by app.yander.ai:
 *
 *   1. app.yander.ai's Clerk middleware sets `yander_signed_in=1` with
 *      domain `.yander.ai` whenever Clerk reports an active session
 *      (cleared with maxAge:0 on anonymous traffic / sign-out).
 *   2. yander.ai reads that cookie server-side at the request boundary
 *      and passes the boolean down via this context.
 *   3. <CTAButtons> consumes `useAuthState()` to swap the CTA pair for
 *      a single "Open dashboard" button when logged in.
 *
 * The flag carries no auth info — real auth still lives in Clerk on
 * app.yander.ai. This cookie is purely a UI hint so the marketing site
 * doesn't need a Clerk dependency, satellite-domain config, DNS work,
 * or a client-side fetch (which would cause a CTA flash on every page).
 *
 * The actual cookie read happens server-side in app/(main)/layout.tsx
 * (via Next's `cookies()` API) and is passed to this provider as a
 * boolean prop. The provider itself is a "use client" component so
 * children that need the value can use React hooks normally.
 */

import { createContext, useContext, type ReactNode } from "react";

interface AuthState {
  /** True if `yander_signed_in=1` is present on the request. False
   * otherwise (anonymous, signed-out, cookie expired, or app middleware
   * hasn't run yet). Worst case false-negative is a "Sign in" CTA on a
   * page that should show "Open dashboard" — never the inverse. */
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
