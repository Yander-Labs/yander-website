import { Container } from "@/components/ui/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beta Program Terms | Yander",
  description:
    "Terms and conditions for participating in the Yander beta program. Learn what data we access, how we use it, and your rights as a beta participant.",
  alternates: {
    canonical: "https://yander.io/beta-terms",
  },
  robots: "index, follow",
};

export default function BetaTermsPage() {
  return (
    <section className="py-20 md:py-28">
      <Container size="narrow">
        <div className="prose prose-gray max-w-none">
          <h1 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4">
            Beta Program Terms
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Last updated: February 19, 2026
          </p>

          <div className="space-y-8 text-gray-600">
            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                What You&apos;re Agreeing To
              </h2>
              <p className="leading-relaxed">
                By joining the Yander beta program, you agree to let our team
                access your account data solely for the purpose of diagnosing
                issues, improving product quality, and providing you with better
                support during the beta period.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                What We May Access
              </h2>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Account activity and usage patterns</li>
                <li>Integration connection status and sync logs</li>
                <li>Entity data (contacts, companies, relationships)</li>
                <li>Error logs and system diagnostics</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                How We Use It
              </h2>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Identify and fix bugs faster</li>
                <li>Improve data accuracy and scoring</li>
                <li>Provide hands-on support when issues arise</li>
                <li>Enhance product features based on real usage</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                Your Data Is Protected
              </h2>
              <p className="leading-relaxed">
                All team members with access to beta participant data are bound
                by strict confidentiality agreements. Your data will never be
                shared with third parties, used for marketing purposes, or
                disclosed publicly. Access is logged and limited to authorized
                personnel only.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                Opting Out
              </h2>
              <p className="leading-relaxed">
                You can withdraw from the beta program at any time by contacting
                us at{" "}
                <a
                  href="mailto:jordan@yanderlabs.com"
                  className="text-gray-900 underline hover:no-underline"
                >
                  jordan@yanderlabs.com
                </a>
                . Upon withdrawal, we will cease accessing your account for
                diagnostic purposes.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                Questions?
              </h2>
              <p className="leading-relaxed">
                If you have any questions about the beta program or these terms,
                please contact us:
              </p>
              <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="font-medium text-gray-900">Yander Labs, Inc.</p>
                <p className="mt-1">2261 Market Street STE 46212</p>
                <p>San Francisco, CA 94114</p>
                <p className="mt-1">
                  Email:{" "}
                  <a
                    href="mailto:jordan@yanderlabs.com"
                    className="text-gray-900 underline hover:no-underline"
                  >
                    jordan@yanderlabs.com
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </section>
  );
}
