import { cookies } from "next/headers";
import { headers } from "next/headers";

// Debug page: shows exactly what cookies the marketing site is receiving
// from your browser. Use this to verify whether the Clerk session cookie
// from app.yander.ai is actually shared on the .yander.ai parent domain.
//
// To debug:
//   1. Sign in to app.yander.ai
//   2. In the same browser, visit https://yander.ai/debug/auth
//   3. Look at the "Cookies received" list:
//      - If `__session` is in the list with a long JWT value → swap should
//        work; if it doesn't, there's a code bug.
//      - If `__session` is missing → Clerk satellite domain is not
//        configured. Cookie is scoped to app.yander.ai only.
//      - If only `__client_uat` is present → same thing; UAT can leak via
//        parent domain in some Clerk configs but the real session JWT does
//        not.
//
// Robots: noindex so this never shows up in search.
export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AuthDebugPage() {
  const cookieStore = await cookies();
  const headerStore = await headers();

  const allCookies = cookieStore.getAll();
  const sessionCookie = cookieStore.get("__session");
  const sessionIsValid = Boolean(
    sessionCookie?.value && sessionCookie.value.length > 0,
  );

  const host = headerStore.get("host") ?? "(no host)";
  const userAgent = headerStore.get("user-agent")?.slice(0, 80) ?? "(none)";

  return (
    <main
      className="min-h-screen bg-white p-8 text-[#171717]"
      style={{
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
      }}
    >
      <div className="mx-auto max-w-3xl space-y-8">
        <div>
          <h1 className="text-2xl font-medium tracking-tight">
            Auth debug
          </h1>
          <p className="mt-2 text-sm text-[#171717]/60">
            Server-rendered. Shows exactly what cookies your browser is
            sending to {host}.
          </p>
        </div>

        <section className="rounded-2xl border border-[rgba(0,0,0,0.06)] bg-[#fafaf9] p-6">
          <h2 className="text-xs uppercase tracking-[0.18em] text-[#171717]/40">
            Verdict
          </h2>
          <p className="mt-3 text-2xl font-medium">
            {sessionIsValid ? (
              <>
                <span className="text-emerald-600">●</span> Logged in
              </>
            ) : (
              <>
                <span className="text-red-600">●</span> Logged out
              </>
            )}
          </p>
          <p className="mt-2 text-sm text-[#171717]/60">
            Based on <code>__session</code> cookie presence + non-empty
            value.
          </p>
        </section>

        <section className="rounded-2xl border border-[rgba(0,0,0,0.06)] bg-white p-6">
          <h2 className="text-xs uppercase tracking-[0.18em] text-[#171717]/40">
            __session cookie
          </h2>
          {sessionCookie ? (
            <dl className="mt-3 space-y-2 text-sm">
              <div>
                <dt className="inline text-[#171717]/60">Present:</dt>{" "}
                <dd className="inline">yes</dd>
              </div>
              <div>
                <dt className="inline text-[#171717]/60">Value length:</dt>{" "}
                <dd className="inline">{sessionCookie.value.length} chars</dd>
              </div>
              <div>
                <dt className="inline text-[#171717]/60">First 20 chars:</dt>{" "}
                <dd className="inline">
                  <code>{sessionCookie.value.slice(0, 20)}...</code>
                </dd>
              </div>
            </dl>
          ) : (
            <p className="mt-3 text-sm">
              Not present in request. Clerk satellite-domain config likely
              missing on app.yander.ai → cookie is scoped to
              app.yander.ai only.
            </p>
          )}
        </section>

        <section className="rounded-2xl border border-[rgba(0,0,0,0.06)] bg-white p-6">
          <h2 className="text-xs uppercase tracking-[0.18em] text-[#171717]/40">
            All cookies received ({allCookies.length})
          </h2>
          {allCookies.length > 0 ? (
            <ul className="mt-3 space-y-2 text-sm">
              {allCookies.map((c) => (
                <li
                  key={c.name}
                  className="border-b border-[rgba(0,0,0,0.04)] pb-2 last:border-b-0"
                >
                  <div className="font-medium">{c.name}</div>
                  <div className="text-[#171717]/50 text-xs">
                    value length: {c.value.length} | first 20:{" "}
                    <code>{c.value.slice(0, 20)}</code>
                    {c.value.length > 20 ? "..." : ""}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm">
              No cookies received. Browser is sending zero cookies for{" "}
              {host}.
            </p>
          )}
        </section>

        <section className="rounded-2xl border border-[rgba(0,0,0,0.06)] bg-white p-6">
          <h2 className="text-xs uppercase tracking-[0.18em] text-[#171717]/40">
            Request info
          </h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div>
              <dt className="inline text-[#171717]/60">Host:</dt>{" "}
              <dd className="inline">{host}</dd>
            </div>
            <div>
              <dt className="inline text-[#171717]/60">User-Agent:</dt>{" "}
              <dd className="inline">{userAgent}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-2xl border border-[rgba(0,0,0,0.06)] bg-[#fefaf6] p-6 text-sm">
          <h2 className="text-xs uppercase tracking-[0.18em] text-[#171717]/40">
            How to interpret this
          </h2>
          <ul className="mt-3 space-y-2 text-[#171717]/70">
            <li>
              <strong className="text-[#171717]">__session present + has value</strong>
              {" "}→ swap should activate. If you also see &quot;Open dashboard&quot;
              in the nav, everything works.
            </li>
            <li>
              <strong className="text-[#171717]">__session absent, but you ARE signed in on app.yander.ai</strong>
              {" "}→ Clerk satellite-domain setup is incomplete. The cookie is
              scoped to app.yander.ai only and the marketing site cannot
              read it. See instructions below.
            </li>
            <li>
              <strong className="text-[#171717]">__session absent, you are NOT signed in</strong>
              {" "}→ working as intended.
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
