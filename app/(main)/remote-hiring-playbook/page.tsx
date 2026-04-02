"use client";

import { useState } from "react";
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
              The playbook is ready for you. We&apos;ve also sent a copy to your
              email.
            </p>
            <a
              href="https://www.notion.so/The-Remote-Offshore-Talent-Playbook-334f5ce31c4881e29a17c1b58f9944e4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="w-full sm:w-auto">
                Access the Playbook
              </Button>
            </a>
            <p className="text-sm text-gray-400 mt-6">
              Check your inbox — you&apos;ll also receive it by email shortly.
            </p>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center">
      <Container size="narrow">
        <div className="py-24 md:py-32 max-w-xl mx-auto">
          <h1 className="font-instrument text-4xl md:text-5xl text-gray-900 mb-4 leading-[1.15] tracking-tight">
            The Remote Offshore Talent Playbook
          </h1>
          <p className="text-lg text-gray-500 mb-10 leading-relaxed">
            The exact system for hiring A-players from South America, Eastern
            Europe, and South Africa — from someone who&apos;s made 60+ hires
            across 5 countries.
          </p>

          <ul className="space-y-3 mb-10">
            {[
              "Region-by-role matching matrix — which countries produce the best talent for each role type",
              "4-stage vetting system that filters out 90% of bad hires before they cost you anything",
              "2026 salary benchmarks by role and region so you don't overpay or lowball",
              "10 red flags that predict failure before it happens — each one cost me money or clients",
              "Onboarding framework that makes new hires productive in 2 weeks",
              "LinkedIn outreach templates and candidate scoring rubric",
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-gray-600">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-900 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-8">
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
                  placeholder="Jordan"
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
                {status === "loading" ? "Sending..." : "Get the Free Playbook"}
              </Button>
              {status === "error" && (
                <p className="text-red-600 text-sm mt-3">{errorMsg}</p>
              )}
            </form>
          </div>
          <p className="text-center text-sm text-gray-400 mt-3">
            No spam, ever. Just the playbook.
          </p>
        </div>
      </Container>
    </main>
  );
}
