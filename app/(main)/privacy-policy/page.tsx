import { Container } from "@/components/ui/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Yander",
  description: "Learn how Yander collects, uses, and protects your data. We're committed to transparency and your privacy.",
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
            Last updated: January 19, 2025
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
                <li><strong>Service Providers:</strong> Third-party vendors who assist in operating our Service (hosting, analytics, payment processing), bound by confidentiality agreements.</li>
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
              <h2 className="font-serif text-xl text-gray-900 mb-3">12. Changes to This Policy</h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on this page and updating the &quot;Last updated&quot; date. Your continued use of the Service after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">13. Contact Us</h2>
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
