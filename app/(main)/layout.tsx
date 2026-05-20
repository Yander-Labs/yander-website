import { cookies } from "next/headers";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { MainClientProviders } from "@/components/MainClientProviders";

/**
 * Reads the parent-domain sign-in flag at the request boundary. Runs
 * server-side so the HTML ships with the right CTA state — no client-side
 * flash.
 *
 * The flag (`yander_signed_in`) is written by app.yander.ai's Clerk
 * middleware whenever it sees an active session. It's scoped to the
 * `.yander.ai` parent domain so this site can read it. The cookie carries
 * NO auth info — just "1" when signed in, expired/absent otherwise. Real
 * auth lives in Clerk on app.yander.ai; this is purely a UI hint.
 *
 * Safe default: any unexpected value (missing, empty, "0", stale) reads
 * as logged-out. Worst case is a user sees a "Sign in" CTA that's one
 * click away from being correct — never the inverse.
 */
async function getIsLoggedIn(): Promise<boolean> {
  const cookieStore = await cookies();
  const flag = cookieStore.get("yander_signed_in");
  return flag?.value === "1";
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
