import { Container } from "@/components/ui/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Yander",
  description: "Terms and conditions for using Yander's remote team intelligence platform. Read our service agreement, usage policies, and legal terms.",
  alternates: {
    canonical: "https://yander.io/terms-of-service",
  },
  robots: "index, follow",
};

export default function TermsOfServicePage() {
  return (
    <section className="py-20 md:py-28">
      <Container size="narrow">
        <div className="prose prose-gray max-w-none">
          <h1 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Last updated: January 28, 2025
          </p>

          <div className="space-y-8 text-gray-600">
            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                Welcome to Yander. These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you and Yander Labs, Inc. (&quot;Yander,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) governing your access to and use of our remote team intelligence platform, website, and related services (collectively, the &quot;Service&quot;).
              </p>
              <p className="leading-relaxed mt-3">
                By accessing or using our Service, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not access or use the Service. If you are using the Service on behalf of an organization, you represent that you have authority to bind that organization to these Terms.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">2. Description of Service</h2>
              <p className="leading-relaxed">
                Yander provides a remote team intelligence platform that helps organizations understand team engagement, collaboration patterns, and workplace health through integration with existing workplace tools. Our Service analyzes aggregate metadata and patterns — not the content of communications — to generate actionable insights for managers and team leads.
              </p>
              <p className="leading-relaxed mt-3">
                We reserve the right to modify, suspend, or discontinue any part of the Service at any time, with or without notice. We will not be liable to you or any third party for any modification, suspension, or discontinuation of the Service.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">3. Account Registration</h2>
              <p className="leading-relaxed">
                To use certain features of the Service, you must create an account. When registering, you agree to:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Keep your password secure and confidential</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized access or security breach</li>
              </ul>
              <p className="leading-relaxed mt-3">
                You must be at least 18 years old to create an account. We reserve the right to suspend or terminate accounts that violate these Terms or contain false information.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">4. Subscription and Payment</h2>

              <h3 className="font-medium text-gray-900 mt-4 mb-2">4.1 Subscription Plans</h3>
              <p className="leading-relaxed">
                Access to the Service requires a paid subscription. Subscription details, including pricing and features, are available on our website. By subscribing, you agree to pay all applicable fees.
              </p>

              <h3 className="font-medium text-gray-900 mt-4 mb-2">4.2 Billing and Renewal</h3>
              <p className="leading-relaxed">
                Subscriptions are billed in advance on a recurring basis (monthly or annually, depending on your plan). Your subscription will automatically renew at the end of each billing period unless you cancel before the renewal date. You authorize us to charge your payment method on file for all subscription fees.
              </p>

              <h3 className="font-medium text-gray-900 mt-4 mb-2">4.3 Price Changes</h3>
              <p className="leading-relaxed">
                We may change subscription prices with at least 30 days&apos; notice. Price changes will take effect at the start of your next billing period. Your continued use after a price change constitutes acceptance of the new pricing.
              </p>

              <h3 className="font-medium text-gray-900 mt-4 mb-2">4.4 Refunds</h3>
              <p className="leading-relaxed">
                Subscription fees are generally non-refundable except as required by law or as explicitly stated in writing. If you cancel your subscription, you will retain access until the end of your current billing period.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">5. Acceptable Use</h2>
              <p className="leading-relaxed">
                You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Use the Service in violation of any applicable laws or regulations</li>
                <li>Attempt to gain unauthorized access to any part of the Service or its systems</li>
                <li>Interfere with or disrupt the Service or servers connected to the Service</li>
                <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
                <li>Use the Service to harass, abuse, or harm others</li>
                <li>Use automated systems (bots, scrapers) to access the Service without permission</li>
                <li>Transmit viruses, malware, or other malicious code</li>
                <li>Attempt to circumvent any security measures or usage limits</li>
                <li>Resell, sublicense, or redistribute the Service without authorization</li>
                <li>Use the Service in any manner that could damage or overburden our infrastructure</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">6. Intellectual Property</h2>

              <h3 className="font-medium text-gray-900 mt-4 mb-2">6.1 Our Intellectual Property</h3>
              <p className="leading-relaxed">
                The Service, including all content, features, functionality, software, and trademarks, is owned by Yander Labs, Inc. and is protected by copyright, trademark, and other intellectual property laws. These Terms do not grant you any right, title, or interest in the Service except for the limited license to use it as described herein.
              </p>

              <h3 className="font-medium text-gray-900 mt-4 mb-2">6.2 License to Use</h3>
              <p className="leading-relaxed">
                Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Service for your internal business purposes during your subscription period.
              </p>

              <h3 className="font-medium text-gray-900 mt-4 mb-2">6.3 Feedback</h3>
              <p className="leading-relaxed">
                If you provide feedback, suggestions, or ideas about the Service, you grant us a perpetual, irrevocable, royalty-free license to use and incorporate such feedback without compensation or attribution.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">7. Your Data</h2>
              <p className="leading-relaxed">
                You retain ownership of any data you provide to the Service. By using the Service, you grant us a limited license to process your data solely to provide and improve the Service. Our collection and use of data is governed by our Privacy Policy.
              </p>
              <p className="leading-relaxed mt-3">
                You are responsible for ensuring you have the necessary rights and permissions to share data with us, including any data from team members or integrated third-party services. You agree to comply with all applicable data protection laws.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">8. Third-Party Integrations</h2>
              <p className="leading-relaxed">
                The Service may integrate with third-party applications and services (such as Slack, Google Workspace, Zoom, Notion, and others). Your use of these integrations is subject to the terms and privacy policies of those third parties. We are not responsible for the availability, accuracy, or practices of third-party services.
              </p>
              <p className="leading-relaxed mt-3">
                By enabling an integration, you authorize us to access and process data from that service in accordance with our Privacy Policy. You may disconnect integrations at any time through your account settings.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">9. Disclaimer of Warranties</h2>
              <p className="leading-relaxed">
                THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
              </p>
              <p className="leading-relaxed mt-3">
                We do not warrant that the Service will be uninterrupted, error-free, secure, or free of viruses or other harmful components. Any insights or recommendations provided by the Service are for informational purposes only and should not be relied upon as the sole basis for employment, management, or personnel decisions.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">10. Limitation of Liability</h2>
              <p className="leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, YANDER LABS, INC. AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE.
              </p>
              <p className="leading-relaxed mt-3">
                IN NO EVENT SHALL OUR TOTAL LIABILITY EXCEED THE AMOUNT YOU PAID TO US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM. THESE LIMITATIONS APPLY REGARDLESS OF THE THEORY OF LIABILITY AND EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
              <p className="leading-relaxed mt-3">
                Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability, so some of the above limitations may not apply to you.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">11. Indemnification</h2>
              <p className="leading-relaxed">
                You agree to indemnify, defend, and hold harmless Yander Labs, Inc. and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses (including reasonable attorneys&apos; fees) arising out of or related to:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Your use of the Service</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any third-party rights, including intellectual property or privacy rights</li>
                <li>Any data you submit to the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">12. Dispute Resolution</h2>

              <h3 className="font-medium text-gray-900 mt-4 mb-2">12.1 Binding Arbitration</h3>
              <p className="leading-relaxed">
                Any dispute, claim, or controversy arising out of or relating to these Terms or the Service shall be resolved by binding arbitration administered by the American Arbitration Association (&quot;AAA&quot;) in accordance with its Commercial Arbitration Rules. The arbitration shall be conducted in Delaware by a single arbitrator.
              </p>

              <h3 className="font-medium text-gray-900 mt-4 mb-2">12.2 Class Action Waiver</h3>
              <p className="leading-relaxed">
                YOU AGREE THAT ANY DISPUTE RESOLUTION PROCEEDINGS WILL BE CONDUCTED ONLY ON AN INDIVIDUAL BASIS AND NOT IN A CLASS, CONSOLIDATED, OR REPRESENTATIVE ACTION. You waive any right to participate in a class action lawsuit or class-wide arbitration against Yander.
              </p>

              <h3 className="font-medium text-gray-900 mt-4 mb-2">12.3 Exceptions</h3>
              <p className="leading-relaxed">
                Either party may seek injunctive or other equitable relief in any court of competent jurisdiction to prevent the actual or threatened infringement of intellectual property rights.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">13. Termination</h2>
              <p className="leading-relaxed">
                You may terminate your account at any time by contacting us or through your account settings. We may suspend or terminate your access to the Service immediately, without prior notice, if we believe you have violated these Terms or for any other reason at our sole discretion.
              </p>
              <p className="leading-relaxed mt-3">
                Upon termination, your right to use the Service will immediately cease. Provisions that by their nature should survive termination shall survive, including ownership, warranty disclaimers, indemnification, and limitations of liability.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">14. Changes to Terms</h2>
              <p className="leading-relaxed">
                We may update these Terms from time to time. We will notify you of material changes by posting the updated Terms on this page and updating the &quot;Last updated&quot; date. For significant changes, we may also notify you by email or through the Service.
              </p>
              <p className="leading-relaxed mt-3">
                Your continued use of the Service after changes take effect constitutes acceptance of the revised Terms. If you do not agree to the updated Terms, you must stop using the Service.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">15. General Provisions</h2>

              <h3 className="font-medium text-gray-900 mt-4 mb-2">15.1 Governing Law</h3>
              <p className="leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions.
              </p>

              <h3 className="font-medium text-gray-900 mt-4 mb-2">15.2 Entire Agreement</h3>
              <p className="leading-relaxed">
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and Yander regarding the Service and supersede all prior agreements.
              </p>

              <h3 className="font-medium text-gray-900 mt-4 mb-2">15.3 Severability</h3>
              <p className="leading-relaxed">
                If any provision of these Terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.
              </p>

              <h3 className="font-medium text-gray-900 mt-4 mb-2">15.4 Waiver</h3>
              <p className="leading-relaxed">
                Our failure to enforce any right or provision of these Terms shall not constitute a waiver of that right or provision.
              </p>

              <h3 className="font-medium text-gray-900 mt-4 mb-2">15.5 Assignment</h3>
              <p className="leading-relaxed">
                You may not assign or transfer these Terms without our prior written consent. We may assign these Terms without restriction.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">16. Contact Us</h2>
              <p className="leading-relaxed">
                If you have questions about these Terms of Service, please contact us:
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
