"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function RemoteHiringPlaybookPage() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/playbook-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      window.scrollTo(0, 0);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <main className="min-h-screen flex items-center">
        <Container size="narrow">
          <div className="py-24 md:py-32 text-center max-w-xl mx-auto">
            <h2 className="font-instrument text-4xl md:text-5xl text-gray-900 mb-4">
              You&apos;re in.
            </h2>
            <p className="text-lg text-gray-500 mb-10 leading-relaxed">
              Access the playbook below.
            </p>
            <a
              href="https://www.notion.so/The-Remote-Offshore-Talent-Playbook-334f5ce31c4881e29a17c1b58f9944e4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="w-full sm:w-auto">
                Access The Playbook
              </Button>
            </a>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center">
      <Container>
        <div className="py-24 md:py-32">
          <div className="flex flex-col md:flex-row md:gap-16 md:items-start">
            {/* Left: headline + subheadline (desktop) */}
            <div className="md:flex-1">
              <h1 className="font-instrument text-4xl md:text-5xl text-gray-900 mb-4 leading-[1.15] tracking-tight">
                The Remote Offshore Talent Playbook
              </h1>
              <p className="text-lg text-gray-500 mb-8 md:mb-6 leading-relaxed">
                The exact system for hiring A-players from South America,
                Eastern Europe, and South Africa. From someone who&apos;s made
                60+ hires in these regions.
              </p>

              {/* Bullets inside left column on desktop, below form on mobile */}
              <ul className="hidden md:block space-y-3">
                {[
                  "Region-by-role matching matrix. Which countries produce the best talent for each role type.",
                  "4-stage vetting system that filters out 90% of bad hires before they cost you anything.",
                  "2026 salary benchmarks by role and region so you don't overpay or lowball.",
                  "10 red flags that predict failure before it happens. Each one cost me money or clients.",
                  "Onboarding framework that makes new hires productive in 2 weeks.",
                  "LinkedIn outreach templates and candidate scoring rubric.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-gray-600">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-900 flex-shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: form (desktop) */}
            <div className="md:flex-1 md:max-w-md">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-8">
                <div className="mb-6 rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src="/playbook-preview.png"
                    alt="Preview of The Remote Offshore Talent Playbook"
                    width={640}
                    height={450}
                    className="w-full h-auto"
                  />
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Your name"
                      required
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg bg-white text-gray-900 outline-none transition-colors focus:border-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      required
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg bg-white text-gray-900 outline-none transition-colors focus:border-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Sending..." : "Get The Free Playbook"}
                  </Button>
                  {status === "error" && (
                    <p className="text-red-600 text-sm mt-3">{errorMsg}</p>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Bullets below form on mobile only */}
          <ul className="md:hidden space-y-3 mt-6">
            {[
              "Region-by-role matching matrix. Which countries produce the best talent for each role type.",
              "4-stage vetting system that filters out 90% of bad hires before they cost you anything.",
              "2026 salary benchmarks by role and region so you don't overpay or lowball.",
              "10 red flags that predict failure before it happens. Each one cost me money or clients.",
              "Onboarding framework that makes new hires productive in 2 weeks.",
              "LinkedIn outreach templates and candidate scoring rubric.",
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-gray-600">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-900 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </main>
  );
}
