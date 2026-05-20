import { cookies } from "next/headers";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { MainClientProviders } from "@/components/MainClientProviders";

/**
 * Reads the Clerk session cookie at the request boundary. Runs server-side
 * so the HTML ships with the right CTA state — no client-side flash.
 *
 * IMPORTANT: only `__session` is checked — and only when its VALUE is a
 * non-empty JWT. Clerk also sets these cookies but we deliberately ignore
 * them because they exist for anonymous visitors too:
 *
 *   - `__client_uat`: "User Activity Timestamp". Set to "0" for never-
 *      logged-in users; non-zero only when a session exists. Checking
 *      `cookieStore.has()` returns true in both cases — false positive.
 *   - `__clerk_db_jwt`: dev-only proxy. Present for any visitor who's
 *      ever hit a Clerk-protected page, including anonymous ones.
 *
 * Cross-domain note: app.yander.ai's Clerk instance must be configured
 * with yander.ai as a satellite domain. That tells Clerk to scope the
 * `__session` cookie to the shared `.yander.ai` parent domain. Without
 * that config, the cookie is scoped to `app.yander.ai` only and this
 * always returns false (which is the safe default — no broken UX).
 */
async function getIsLoggedIn(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("__session");
  // `__session` only exists with a real JWT value when actively signed in.
  // An empty string or missing cookie both mean "not signed in".
  return Boolean(sessionCookie?.value && sessionCookie.value.length > 0);
}

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = await getIsLoggedIn();

  return (
    <MainClientProviders isLoggedIn={isLoggedIn}>
      <Navigation />
      {children}
      <Footer />
    </MainClientProviders>
  );
}
