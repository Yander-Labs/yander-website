import { Container } from "@/components/ui/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security | Yander",
  description:
    "Learn how Yander protects your data with enterprise-grade security, encryption, tenant isolation, and strict privacy controls.",
  alternates: {
    canonical: "https://yander.io/security",
  },
  robots: "index, follow",
};

export default function SecurityPage() {
  return (
    <section className="py-20 md:py-28">
      <Container size="narrow">
        <div className="prose prose-gray max-w-none">
          <h1 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4">
            Security
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Last updated: February 19, 2026
          </p>

          <div className="space-y-8 text-gray-600">
            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                Our Commitment
              </h2>
              <p className="leading-relaxed">
                At Yander, security is foundational to our platform. We protect
                your data with enterprise-grade security measures across every
                layer of our infrastructure, from encryption and authentication
                to strict tenant isolation and monitoring.
              </p>
              <p className="leading-relaxed mt-3">
                This page provides an overview of how we safeguard your
                organization&apos;s data. If you have specific security
                questions or need documentation for your procurement process,
                reach out to our team at{" "}
                <a
                  href="mailto:jordan@yanderlabs.com"
                  className="text-gray-900 underline hover:no-underline"
                >
                  jordan@yanderlabs.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                Infrastructure
              </h2>
              <p className="leading-relaxed">
                Yander is hosted on Railway, which runs on top of Amazon Web
                Services (AWS) infrastructure in the US-East-1 region. Our
                production environment includes managed PostgreSQL with pgvector
                for AI workloads and Redis for task queuing and background job
                management.
              </p>
              <p className="leading-relaxed mt-3">
                All application services run in isolated containers with no
                shared state between tenants at the infrastructure level. Our
                deployment pipeline enforces immutable builds, meaning every
                release is a fresh container image with no carryover from
                previous deployments.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                Encryption
              </h2>
              <p className="leading-relaxed">
                We apply encryption to your data both at rest and in transit:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>
                  <strong className="text-gray-900">At rest:</strong> All data
                  is encrypted using AES-256 encryption via our infrastructure
                  provider (Railway on AWS), the same standard used by financial
                  institutions and government agencies.
                </li>
                <li>
                  <strong className="text-gray-900">In transit:</strong> All
                  network communication is secured with TLS 1.3 via our edge
                  proxy. Every connection to our API, dashboard, and third-party
                  integrations is encrypted.
                </li>
                <li>
                  <strong className="text-gray-900">OAuth tokens:</strong>{" "}
                  Integration credentials are managed by our sub-processor
                  Nango, which handles OAuth token storage and rotation
                  separately from our application database.
                </li>
                <li>
                  <strong className="text-gray-900">
                    Database connections:
                  </strong>{" "}
                  All connections between our application services and database
                  are encrypted via SSL.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                Authentication and Access Control
              </h2>
              <p className="leading-relaxed">
                Yander uses Clerk for authentication, providing a hardened,
                purpose-built identity layer with support for Single Sign-On
                (SSO), multi-factor authentication (MFA), and enterprise
                identity providers.
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>
                  JWT validation is enforced on every protected API endpoint
                  with no exceptions.
                </li>
                <li>
                  Role-based access control (RBAC) governs what each user can
                  see and do within your organization, with four permission
                  tiers: owner, admin, staff, and bot.
                </li>
                <li>
                  Multi-factor authentication is available for all accounts and
                  can be enforced at the organization level.
                </li>
                <li>
                  Session management includes automatic token rotation and
                  configurable session lifetimes.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                Tenant Isolation
              </h2>
              <p className="leading-relaxed">
                Yander operates a multi-tenant architecture with strict logical
                data isolation. Every database query is filtered by a tenant
                identifier that is extracted directly from the authenticated JWT
                — never from client-supplied input. This means there is no code
                path through which one organization can access another&apos;s
                data.
              </p>
              <p className="leading-relaxed mt-3">
                As an additional safeguard, any attempt to access resources
                belonging to another tenant returns a 404 (Not Found) response
                rather than a 403 (Forbidden), preventing any information
                leakage about the existence of other organizations or their
                data.
              </p>
              <p className="leading-relaxed mt-3">
                Each organization operates within its own data boundary, with
                complete separation of entities, scores, integration
                credentials, and configuration.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                Data Handling
              </h2>
              <p className="leading-relaxed">
                When you connect workplace tools, Yander collects and processes
                communication content to power AI-driven team intelligence. This
                includes email content, Slack messages, calendar event details,
                meeting transcripts, and document text from connected tools.
              </p>
              <p className="leading-relaxed mt-3">
                This data is processed by AI models to extract:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>
                  Collaboration patterns (how often and when people interact)
                </li>
                <li>
                  Relationship mapping (who works with whom across teams)
                </li>
                <li>
                  Engagement signals (response patterns, meeting participation,
                  activity trends)
                </li>
                <li>
                  Key facts and context (project involvement, expertise areas)
                </li>
              </ul>
              <p className="leading-relaxed mt-3">
                Raw communication content is never displayed in the dashboard.
                Only AI-extracted insights, scores, and summaries are surfaced to
                users. Yander employees do not review your raw communication
                content except as necessary for technical support with your
                explicit consent.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                Logging and Monitoring
              </h2>
              <p className="leading-relaxed">
                We enforce a strict no-PII logging policy across the entire
                platform. Application logs contain only anonymized identifiers
                such as tenant IDs and entity IDs — never customer names, email
                addresses, or other sensitive data.
              </p>
              <p className="leading-relaxed mt-3">
                All logs include structured request tracing with request IDs and
                duration metrics, enabling rapid incident investigation without
                exposing personal information.
              </p>
              <p className="leading-relaxed mt-3">
                Error monitoring is handled through Sentry with automatic PII
                stripping applied before any data is transmitted. This ensures
                that even our error tracking pipeline cannot inadvertently
                capture sensitive information.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                Data Retention and Deletion
              </h2>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>
                  Customer data is retained for the duration of your active
                  subscription.
                </li>
                <li>
                  Upon a verified deletion request, all associated data is
                  permanently removed within 30 days.
                </li>
                <li>
                  Automated data lifecycle management ensures that temporary and
                  intermediate processing data does not persist beyond its
                  useful life.
                </li>
                <li>
                  We support the right to data portability — you can request a
                  full export of your organization&apos;s data in JSON format at
                  any time.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                Incident Response
              </h2>
              <p className="leading-relaxed">
                We maintain a structured incident response process to detect,
                respond to, and recover from security events:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>
                  Automated error detection and alerting through Sentry surfaces
                  issues in real time.
                </li>
                <li>
                  Critical issues are triaged and acknowledged within 24 hours.
                </li>
                <li>
                  In the event of a confirmed data breach, affected customers
                  are notified within 72 hours in accordance with GDPR
                  requirements.
                </li>
                <li>
                  Every significant incident undergoes a post-incident review to
                  identify root causes and implement preventive measures.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                Compliance
              </h2>
              <p className="leading-relaxed">
                Yander is built with regulatory compliance as a core
                requirement, not an afterthought:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>
                  <strong className="text-gray-900">GDPR:</strong> We are
                  GDPR-ready with a Data Processing Agreement (DPA) available
                  for all customers. Our{" "}
                  <a
                    href="/dpa"
                    className="text-gray-900 underline hover:no-underline"
                  >
                    DPA
                  </a>{" "}
                  covers data processing terms, sub-processor lists, and your
                  rights as a data controller.
                </li>
                <li>
                  <strong className="text-gray-900">
                    International transfers:
                  </strong>{" "}
                  Standard Contractual Clauses (SCCs) are included in our DPA
                  for lawful transfer of personal data outside the European
                  Economic Area.
                </li>
                <li>
                  <strong className="text-gray-900">SOC 2 Type II:</strong> We
                  are actively pursuing SOC 2 Type II certification to formally
                  validate our security, availability, and confidentiality
                  controls.
                </li>
                <li>
                  We conduct regular internal security assessments and review our
                  practices against industry standards.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                Sub-Processors
              </h2>
              <p className="leading-relaxed">
                We use a limited set of third-party service providers
                (sub-processors) to deliver our platform. Each sub-processor is
                vetted for security practices and bound by data processing
                agreements.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 pr-4 font-medium text-gray-900">
                        Sub-Processor
                      </th>
                      <th className="text-left py-2 pr-4 font-medium text-gray-900">
                        Purpose
                      </th>
                      <th className="text-left py-2 font-medium text-gray-900">
                        Location
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-2 pr-4">Railway (AWS)</td>
                      <td className="py-2 pr-4">
                        Application hosting, database, and Redis
                      </td>
                      <td className="py-2">US</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Clerk</td>
                      <td className="py-2 pr-4">
                        Authentication and user management
                      </td>
                      <td className="py-2">US</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Nango</td>
                      <td className="py-2 pr-4">
                        OAuth and integration API proxy
                      </td>
                      <td className="py-2">US/EU</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">OpenRouter</td>
                      <td className="py-2 pr-4">
                        LLM inference (AI processing)
                      </td>
                      <td className="py-2">US</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Stripe</td>
                      <td className="py-2 pr-4">Payment processing</td>
                      <td className="py-2">US</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">Sentry</td>
                      <td className="py-2 pr-4">
                        Error monitoring (no PII)
                      </td>
                      <td className="py-2">US</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">PostHog</td>
                      <td className="py-2 pr-4">
                        Product analytics (anonymous events)
                      </td>
                      <td className="py-2">US/EU</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="leading-relaxed mt-3">
                A complete and up-to-date list of sub-processors is maintained
                in our{" "}
                <a
                  href="/dpa"
                  className="text-gray-900 underline hover:no-underline"
                >
                  Data Processing Agreement
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                Responsible Disclosure
              </h2>
              <p className="leading-relaxed">
                We value the work of security researchers who help keep our
                platform and users safe. If you discover a vulnerability in
                Yander, we encourage you to report it to us responsibly.
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>
                  Report vulnerabilities to{" "}
                  <a
                    href="mailto:jordan@yanderlabs.com"
                    className="text-gray-900 underline hover:no-underline"
                  >
                    jordan@yanderlabs.com
                  </a>{" "}
                  with a detailed description of the issue.
                </li>
                <li>
                  We take all reports seriously and will acknowledge receipt
                  within 48 hours.
                </li>
                <li>
                  We will not pursue legal action against researchers who act in
                  good faith, follow responsible disclosure practices, and avoid
                  accessing or modifying other users&apos; data.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                Contact
              </h2>
              <p className="leading-relaxed">
                Have questions about our security practices or need
                documentation for your security review? We are here to help.
              </p>
              <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="font-medium text-gray-900">Yander Labs, Inc.</p>
                <p className="mt-1">
                  Security inquiries:{" "}
                  <a
                    href="mailto:jordan@yanderlabs.com"
                    className="text-gray-900 underline hover:no-underline"
                  >
                    jordan@yanderlabs.com
                  </a>
                </p>
                <p className="mt-1">
                  Legal and privacy:{" "}
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
