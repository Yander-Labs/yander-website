import { cookies } from "next/headers";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { MainClientProviders } from "@/components/MainClientProviders";

// Cookie names Clerk uses for the active session. The first is the canonical
// production session cookie; the others are dev/preview fallbacks. We check
// all of them so the swap works regardless of which Clerk environment the
// app.yander.ai install is currently using.
const CLERK_SESSION_COOKIES = [
  "__session",        // Production session token (httpOnly, scoped to .yander.ai when satellite is configured).
  "__client_uat",     // User Activity Timestamp — set whenever any session exists, even before __session ripens.
  "__clerk_db_jwt",   // Dev / preview deployments.
];

/**
 * Reads the Clerk session cookie at the request boundary. Runs server-side
 * so the HTML ships with the right CTA state — no client-side flash.
 *
 * Returns true when ANY known Clerk session cookie is present on the
 * .yander.ai parent domain. This requires app.yander.ai's Clerk dashboard
 * to be configured with yander.ai as a satellite domain (which scopes the
 * session cookie to the shared parent domain `.yander.ai`).
 */
async function getIsLoggedIn(): Promise<boolean> {
  const cookieStore = await cookies();
  return CLERK_SESSION_COOKIES.some((name) => cookieStore.has(name));
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
