import { Container } from "@/components/ui/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Yander",
  description: "Learn how Yander collects, uses, and protects your data. We're committed to transparency and your privacy.",
  alternates: {
    canonical: "https://yander.io/privacy-policy",
  },
  robots: "index, follow",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-20 md:py-28">
      <Container size="narrow">
        <div className="prose prose-gray max-w-none">
          <h1 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Last updated: February 19, 2026
          </p>

          <div className="space-y-8 text-gray-600">
            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">1. Introduction</h2>
              <p className="leading-relaxed">
                Yander Labs, Inc. (&quot;Yander,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our remote team intelligence platform and related services (collectively, the &quot;Service&quot;).
              </p>
              <p className="leading-relaxed mt-3">
                By using our Service, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our Service.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">2. Information We Collect</h2>

              <h3 className="font-medium text-gray-900 mt-4 mb-2">2.1 Information You Provide</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Account Information:</strong> Name, email address, company name, job title, and password when you create an account.</li>
                <li><strong>Payment Information:</strong> Billing address and payment details processed through our secure payment provider.</li>
                <li><strong>Communications:</strong> Information you provide when contacting our support team or participating in surveys.</li>
              </ul>

              <h3 className="font-medium text-gray-900 mt-4 mb-2">2.2 Information Collected Automatically</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Usage Data:</strong> How you interact with our Service, including features used and time spent.</li>
                <li><strong>Device Information:</strong> Browser type, operating system, and device identifiers.</li>
                <li><strong>Log Data:</strong> IP address, access times, and referring URLs.</li>
              </ul>

              <h3 className="font-medium text-gray-900 mt-4 mb-2">2.3 Workplace Integration Data</h3>
              <p className="leading-relaxed">
                When you connect workplace tools (such as Slack, Google Workspace, Microsoft 365, Zoom, Notion, ClickUp, or Monday.com), we collect aggregate metadata and patterns to provide engagement insights. <strong>We do not:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Read the content of private messages or emails</li>
                <li>Capture screenshots or record keystrokes</li>
                <li>Monitor individual file contents or documents</li>
                <li>Track personal activities outside of work tools</li>
              </ul>
              <p className="leading-relaxed mt-3">
                We analyze patterns such as response times, meeting participation, collaboration frequency, and activity levels to generate team health insights — never the content of communications.
              </p>

              <h3 className="font-medium text-gray-900 mt-4 mb-2">2.4 Google API Data</h3>
              <p className="leading-relaxed">
                When you connect Google Workspace services (such as Gmail, Google Calendar, or Google Meet), we access certain data through Google APIs to provide our Service. We collect only aggregate metadata — such as email response times, calendar meeting frequency, and collaboration patterns — to generate engagement insights. <strong>We do not access the content of your emails, documents, or calendar event details.</strong>
              </p>
              <p className="leading-relaxed mt-3">
                <strong>Google API Services User Data Policy Compliance:</strong> Yander&apos;s use and transfer of information received from Google APIs adheres to the{" "}
                <a
                  href="https://developers.google.com/terms/api-services-user-data-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 underline hover:no-underline"
                >
                  Google API Services User Data Policy
                </a>
                , including the Limited Use requirements.
              </p>
              <p className="leading-relaxed mt-3">
                <strong>Limited Use Disclosure:</strong> In accordance with Google&apos;s Limited Use requirements:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>We only use Google user data to provide and improve the user-facing features of our Service that are prominent in our application&apos;s user interface</li>
                <li>We do not transfer Google user data to third parties unless necessary to provide or improve user-facing features, you provide affirmative consent, or it is required for security or legal compliance</li>
                <li>We do not use Google user data for serving advertisements, including retargeting, personalized, or interest-based advertising</li>
                <li>We do not allow humans to read Google user data unless you have provided affirmative consent, it is necessary for security purposes, or it is required to comply with applicable law</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">3. How We Use Your Information</h2>
              <p className="leading-relaxed">We use the information we collect to:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Provide, maintain, and improve our Service</li>
                <li>Generate engagement insights and team health analytics</li>
                <li>Process transactions and send related information</li>
                <li>Send administrative messages, updates, and security alerts</li>
                <li>Respond to your comments, questions, and support requests</li>
                <li>Monitor and analyze usage trends to enhance user experience</li>
                <li>Detect, prevent, and address technical issues or fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">4. Information Sharing and Disclosure</h2>
              <p className="leading-relaxed">We do not sell your personal information. We may share your information in the following circumstances:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>With Your Organization:</strong> Aggregated team insights are shared with authorized administrators within your organization.</li>
                <li><strong>Service Providers (Sub-processors):</strong> Third-party vendors who assist in operating our Service, bound by confidentiality agreements and data processing agreements. See our current sub-processor list in Section 14 below.</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental authority.</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, with notice to users.</li>
                <li><strong>With Your Consent:</strong> When you have given explicit permission to share.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">5. Data Security</h2>
              <p className="leading-relaxed">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>SOC 2 Type II compliance</li>
                <li>Enterprise-grade encryption for data at rest and in transit (AES-256, TLS 1.3)</li>
                <li>Regular security audits and penetration testing</li>
                <li>Access controls and authentication requirements</li>
                <li>Secure data centers with physical security measures</li>
              </ul>
              <p className="leading-relaxed mt-3">
                While we strive to protect your information, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">6. Data Retention</h2>
              <p className="leading-relaxed">
                We retain your information for as long as your account is active or as needed to provide services. You may request deletion of your data at any time. We will delete or anonymize your information within 30 days of a verified request, unless retention is required by law.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">7. Your Rights and Choices</h2>
              <p className="leading-relaxed">Depending on your location, you may have the following rights:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                <li><strong>Deletion:</strong> Request deletion of your data</li>
                <li><strong>Portability:</strong> Request your data in a portable format</li>
                <li><strong>Objection:</strong> Object to certain processing activities</li>
                <li><strong>Withdrawal:</strong> Withdraw consent where processing is based on consent</li>
              </ul>
              <p className="leading-relaxed mt-3">
                To exercise these rights, contact us at{" "}
                <a href="mailto:jordan@yanderlabs.com" className="text-gray-900 underline hover:no-underline">
                  jordan@yanderlabs.com
                </a>.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">8. International Data Transfers</h2>
              <p className="leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place, including Standard Contractual Clauses approved by relevant authorities, to protect your data during international transfers.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">9. Cookies and Tracking Technologies</h2>
              <p className="leading-relaxed">
                We use cookies and similar technologies to enhance your experience, analyze usage, and deliver relevant content. You can manage cookie preferences through your browser settings. Note that disabling cookies may affect Service functionality.
              </p>
              <p className="leading-relaxed mt-3">
                When you visit or log in to our website, cookies and similar technologies may be used by our online data partners or vendors to associate these activities with other personal information they or others have about you, including by association with your email. We (or service providers on our behalf) may then send communications and marketing to these email. You may opt out of receiving this advertising by visiting{" "}
                <a href="https://app.retention.com/optout" target="_blank" rel="noopener noreferrer" className="text-gray-900 underline hover:no-underline">
                  https://app.retention.com/optout
                </a>
                . You also have the option to opt out of the collection of your personal data in compliance with GDPR. To exercise this option, please visit{" "}
                <a href="https://www.rb2b.com/rb2b-gdpr-opt-out" target="_blank" rel="noopener noreferrer" className="text-gray-900 underline hover:no-underline">
                  https://www.rb2b.com/rb2b-gdpr-opt-out
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">10. Third-Party Links</h2>
              <p className="leading-relaxed">
                Our Service may contain links to third-party websites. We are not responsible for the privacy practices of these sites. We encourage you to review their privacy policies before providing any information.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">11. Children&apos;s Privacy</h2>
              <p className="leading-relaxed">
                Our Service is not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If we become aware that we have collected data from a child, we will take steps to delete it promptly.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">12. California Privacy Rights</h2>
              <p className="leading-relaxed">
                If you are a California resident, you have the right under the California Consumer Privacy Act (CCPA) to request access to, deletion of, and information about the categories of personal information we collect. We do not sell personal information. To exercise your rights, contact us at{" "}
                <a href="mailto:jordan@yanderlabs.com" className="text-gray-900 underline hover:no-underline">
                  jordan@yanderlabs.com
                </a>.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">13. Changes to This Policy</h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on this page and updating the &quot;Last updated&quot; date. Your continued use of the Service after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">13. Legal Bases for Processing (GDPR)</h2>
              <p className="leading-relaxed">
                If you are located in the European Economic Area (EEA), the United Kingdom, or Switzerland, we process your personal data on the following legal bases:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Performance of a Contract:</strong> Processing necessary to provide the Service you have subscribed to, including account management, workspace analytics, and support.</li>
                <li><strong>Legitimate Interests:</strong> Processing necessary for our legitimate interests, such as improving our Service, ensuring security, and preventing fraud, where those interests are not overridden by your data protection rights.</li>
                <li><strong>Consent:</strong> Where you have given explicit consent, such as opting in to marketing communications or connecting optional workplace integrations.</li>
                <li><strong>Legal Obligation:</strong> Processing necessary to comply with applicable laws and regulations.</li>
              </ul>
              <p className="leading-relaxed mt-3">
                Where processing is based on consent, you may withdraw consent at any time by contacting us at{" "}
                <a href="mailto:jordan@yanderlabs.com" className="text-gray-900 underline hover:no-underline">
                  jordan@yanderlabs.com
                </a>.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">14. Sub-processors</h2>
              <p className="leading-relaxed">
                We use the following sub-processors to deliver our Service. Each sub-processor is bound by a data processing agreement and processes data only as necessary for the stated purpose.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-sm border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-4 py-2.5 font-medium text-gray-900 border-b border-gray-200">Sub-processor</th>
                      <th className="text-left px-4 py-2.5 font-medium text-gray-900 border-b border-gray-200">Purpose</th>
                      <th className="text-left px-4 py-2.5 font-medium text-gray-900 border-b border-gray-200">Location</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-2.5">Railway</td>
                      <td className="px-4 py-2.5">Cloud infrastructure, hosting, and PostgreSQL database</td>
                      <td className="px-4 py-2.5">United States</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5">Clerk</td>
                      <td className="px-4 py-2.5">Authentication and user management</td>
                      <td className="px-4 py-2.5">United States</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5">Nango</td>
                      <td className="px-4 py-2.5">OAuth integration proxy</td>
                      <td className="px-4 py-2.5">United States</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5">Stripe</td>
                      <td className="px-4 py-2.5">Payment processing</td>
                      <td className="px-4 py-2.5">United States</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5">OpenRouter</td>
                      <td className="px-4 py-2.5">LLM inference (AI processing)</td>
                      <td className="px-4 py-2.5">United States</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5">Sentry</td>
                      <td className="px-4 py-2.5">Error monitoring and performance</td>
                      <td className="px-4 py-2.5">United States</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5">PostHog</td>
                      <td className="px-4 py-2.5">Product analytics</td>
                      <td className="px-4 py-2.5">United States</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5">Upstash</td>
                      <td className="px-4 py-2.5">Redis caching and task queues</td>
                      <td className="px-4 py-2.5">United States</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="leading-relaxed mt-3">
                We will notify customers of any changes to this sub-processor list at least 30 days in advance. For enterprise customers with a{" "}
                <a href="/dpa" className="text-gray-900 underline hover:no-underline">
                  Data Processing Agreement
                </a>, objection rights are detailed in the DPA.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">15. Data Processing Agreement</h2>
              <p className="leading-relaxed">
                If your organization requires a Data Processing Agreement under GDPR Article 28 or similar legislation, our standard DPA is available at{" "}
                <a href="/dpa" className="text-gray-900 underline hover:no-underline">
                  yander.io/dpa
                </a>. The DPA is incorporated by reference into our Terms of Service for all customers processing personal data subject to applicable data protection laws.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">16. Contact Us</h2>
              <p className="leading-relaxed">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="font-medium text-gray-900">Yander Labs, Inc.</p>
                <p className="mt-1">
                  Email:{" "}
                  <a href="mailto:jordan@yanderlabs.com" className="text-gray-900 underline hover:no-underline">
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
