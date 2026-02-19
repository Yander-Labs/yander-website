import { Container } from "@/components/ui/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Processing Agreement | Yander",
  description:
    "Yander's Data Processing Agreement (DPA) outlines how we process personal data on behalf of our customers in compliance with GDPR and applicable data protection laws.",
  alternates: {
    canonical: "https://yander.io/dpa",
  },
  robots: "index, follow",
};

export default function DpaPage() {
  return (
    <section className="py-20 md:py-28">
      <Container size="narrow">
        <div className="prose prose-gray max-w-none">
          <h1 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4">
            Data Processing Agreement
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Last updated: February 19, 2026
          </p>

          <div className="space-y-8 text-gray-600">
            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                1. Introduction
              </h2>
              <p className="leading-relaxed">
                This Data Processing Agreement (&quot;DPA&quot;) is entered into
                between the customer entity that has agreed to the Yander Terms
                of Service (&quot;Customer,&quot; &quot;Controller,&quot; or
                &quot;you&quot;) and Yander Labs, Inc. (&quot;Yander,&quot;
                &quot;Processor,&quot; &quot;we,&quot; &quot;us,&quot; or
                &quot;our&quot;). This DPA supplements and forms part of the
                Yander Terms of Service (&quot;Agreement&quot;) and the Yander
                Privacy Policy.
              </p>
              <p className="leading-relaxed mt-3">
                This DPA sets out the terms that apply when Personal Data is
                processed by Yander on behalf of the Customer in the course of
                providing the Service. The purpose of this DPA is to ensure that
                such processing is conducted in accordance with applicable data
                protection laws, including the General Data Protection Regulation
                (EU) 2016/679 (&quot;GDPR&quot;), the UK General Data
                Protection Regulation (&quot;UK GDPR&quot;), and other
                applicable data protection legislation.
              </p>
              <p className="leading-relaxed mt-3">
                By using the Service, the Customer enters into this DPA on
                behalf of itself and, to the extent required under applicable
                data protection laws, on behalf of its authorized users and
                employees.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                2. Definitions
              </h2>
              <p className="leading-relaxed">
                The following terms shall have the meanings set out below. Any
                capitalized terms not defined in this DPA shall have the
                meanings given to them in the Agreement.
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>
                  <strong>&quot;Personal Data&quot;</strong> means any
                  information relating to an identified or identifiable natural
                  person (&quot;Data Subject&quot;) that is processed by Yander
                  on behalf of the Customer in connection with the Service.
                </li>
                <li>
                  <strong>&quot;Processing&quot;</strong> means any operation or
                  set of operations performed on Personal Data, whether or not by
                  automated means, including collection, recording,
                  organization, structuring, storage, adaptation, alteration,
                  retrieval, consultation, use, disclosure by transmission,
                  dissemination, alignment, combination, restriction, erasure, or
                  destruction.
                </li>
                <li>
                  <strong>&quot;Controller&quot;</strong> means the entity that
                  determines the purposes and means of the Processing of
                  Personal Data. For the purposes of this DPA, the Customer is
                  the Controller.
                </li>
                <li>
                  <strong>&quot;Processor&quot;</strong> means the entity that
                  processes Personal Data on behalf of the Controller. For the
                  purposes of this DPA, Yander is the Processor.
                </li>
                <li>
                  <strong>&quot;Data Subject&quot;</strong> means an identified
                  or identifiable natural person whose Personal Data is
                  processed under this DPA, including the Customer&apos;s
                  employees and authorized users of the Service.
                </li>
                <li>
                  <strong>&quot;Sub-processor&quot;</strong> means any third
                  party engaged by Yander to process Personal Data on behalf of
                  the Customer in connection with the Service.
                </li>
                <li>
                  <strong>&quot;Standard Contractual Clauses&quot;</strong> means
                  the standard contractual clauses for the transfer of personal
                  data to processors established in third countries, as approved
                  by the European Commission pursuant to Implementing Decision
                  (EU) 2021/914.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                3. Scope and Roles
              </h2>
              <p className="leading-relaxed">
                The Customer acts as the Controller and Yander acts as the
                Processor with respect to the Personal Data processed in
                connection with the Service. Yander shall process Personal Data
                only on the documented instructions of the Customer, unless
                required to do so by applicable law, in which case Yander shall
                inform the Customer of that legal requirement before Processing
                (unless prohibited by law from doing so).
              </p>
              <p className="leading-relaxed mt-3">
                The categories of Personal Data processed under this DPA
                include workplace communication content and metadata from
                connected integrations. This includes email content (subject
                lines, message bodies, sender and recipient addresses,
                timestamps), messaging content (message text, channel
                information, timestamps from Slack and similar tools), calendar
                event details (titles, descriptions, attendees, times,
                locations), meeting transcripts (speaker-attributed text from
                recorded meetings), and document content (page text and comments
                from tools such as Notion). This data is processed by AI models
                to extract facts, collaboration patterns, and engagement
                insights. Raw communication content is not displayed to
                end users; only AI-generated summaries and scores are surfaced
                in the Service. The Data Subjects include the
                Customer&apos;s employees, contractors, and other authorized
                users of workplace tools connected to the Service.
              </p>
              <p className="leading-relaxed mt-3">
                The duration of Processing shall be for the term of the
                Agreement between the Customer and Yander, plus the period from
                expiry of the Agreement until deletion of all Personal Data by
                Yander in accordance with this DPA.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                4. Customer Obligations
              </h2>
              <p className="leading-relaxed">
                The Customer, as Controller, shall be responsible for the
                following:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>
                  Ensuring that it has a lawful basis for the Processing of
                  Personal Data under applicable data protection laws, including
                  but not limited to obtaining any necessary consents or
                  establishing a legitimate interest.
                </li>
                <li>
                  Providing adequate notice to its employees, contractors, and
                  other Data Subjects regarding the Processing of their Personal
                  Data through the Service, including the nature of data
                  collected, the purposes of Processing, and their rights under
                  applicable law.
                </li>
                <li>
                  Ensuring that the instructions given to Yander regarding the
                  Processing of Personal Data comply with all applicable data
                  protection laws and regulations.
                </li>
                <li>
                  Complying with all applicable data protection laws in relation
                  to the Processing of Personal Data and the use of the Service,
                  including any notification or registration requirements.
                </li>
                <li>
                  Ensuring that it has the right to transfer, or provide access
                  to, the Personal Data to Yander for Processing in accordance
                  with the terms of this DPA and the Agreement.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                5. Yander&apos;s Obligations
              </h2>
              <p className="leading-relaxed">
                Yander, as Processor, shall comply with the following
                obligations:
              </p>

              <h3 className="font-medium text-gray-900 mt-4 mb-2">
                5.1 Processing Instructions
              </h3>
              <p className="leading-relaxed">
                Yander shall process Personal Data only in accordance with the
                Customer&apos;s documented instructions as set out in this DPA
                and the Agreement, unless required to do so by applicable law.
                Yander shall immediately inform the Customer if, in its opinion,
                an instruction infringes applicable data protection laws.
              </p>

              <h3 className="font-medium text-gray-900 mt-4 mb-2">
                5.2 Confidentiality
              </h3>
              <p className="leading-relaxed">
                Yander shall ensure that all personnel authorized to process
                Personal Data have committed themselves to confidentiality or are
                under an appropriate statutory obligation of confidentiality.
                Access to Personal Data shall be limited to those personnel who
                require such access to perform the Service.
              </p>

              <h3 className="font-medium text-gray-900 mt-4 mb-2">
                5.3 Security Measures
              </h3>
              <p className="leading-relaxed">
                Yander shall implement and maintain appropriate technical and
                organizational measures to ensure a level of security
                appropriate to the risk of Processing, as described further in
                Section 7 of this DPA.
              </p>

              <h3 className="font-medium text-gray-900 mt-4 mb-2">
                5.4 Data Subject Requests
              </h3>
              <p className="leading-relaxed">
                Yander shall promptly assist the Customer in responding to
                requests from Data Subjects exercising their rights under
                applicable data protection laws, as further described in Section
                9 of this DPA.
              </p>

              <h3 className="font-medium text-gray-900 mt-4 mb-2">
                5.5 Breach Notification
              </h3>
              <p className="leading-relaxed">
                Yander shall notify the Customer without undue delay upon
                becoming aware of a Personal Data breach and shall assist the
                Customer in meeting its breach notification obligations, as
                further described in Section 8 of this DPA.
              </p>

              <h3 className="font-medium text-gray-900 mt-4 mb-2">
                5.6 Data Protection Impact Assessments
              </h3>
              <p className="leading-relaxed">
                Yander shall provide reasonable assistance to the Customer with
                data protection impact assessments and prior consultations with
                supervisory authorities, to the extent required by applicable
                data protection laws and taking into account the nature of the
                Processing and the information available to Yander.
              </p>

              <h3 className="font-medium text-gray-900 mt-4 mb-2">
                5.7 Deletion and Return of Data
              </h3>
              <p className="leading-relaxed">
                Upon termination of the Agreement, Yander shall, at the
                Customer&apos;s election, delete or return all Personal Data to
                the Customer and delete existing copies, unless applicable law
                requires further storage, as further described in Section 11 of
                this DPA.
              </p>

              <h3 className="font-medium text-gray-900 mt-4 mb-2">
                5.8 Audit and Compliance
              </h3>
              <p className="leading-relaxed">
                Yander shall make available to the Customer all information
                necessary to demonstrate compliance with the obligations set out
                in this DPA and shall allow for and contribute to audits and
                inspections, as further described in Section 12 of this DPA.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                6. Sub-processors
              </h2>
              <p className="leading-relaxed">
                The Customer provides general authorization for Yander to engage
                Sub-processors to process Personal Data on the Customer&apos;s
                behalf. Yander shall maintain an up-to-date list of
                Sub-processors, as set out in Schedule 1 below.
              </p>
              <p className="leading-relaxed mt-3">
                Yander shall notify the Customer of any intended changes
                concerning the addition or replacement of Sub-processors at
                least thirty (30) days prior to such change, thereby giving the
                Customer the opportunity to object to such changes. If the
                Customer objects to a new Sub-processor on reasonable grounds
                related to data protection, Yander shall use commercially
                reasonable efforts to make available an alternative arrangement
                that avoids the use of the objected-to Sub-processor. If no
                alternative is reasonably available, either party may terminate
                the portion of the Service that cannot be provided without the
                use of the objected-to Sub-processor.
              </p>
              <p className="leading-relaxed mt-3">
                Yander shall impose on each Sub-processor data protection
                obligations no less protective than those set out in this DPA by
                way of a written contract. Yander shall remain fully liable to
                the Customer for the performance of each Sub-processor&apos;s
                obligations.
              </p>

              <h3 className="font-medium text-gray-900 mt-4 mb-2">
                Schedule 1: Sub-processors
              </h3>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-sm border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 border border-gray-200 font-medium text-gray-900">
                        Sub-processor
                      </th>
                      <th className="text-left p-3 border border-gray-200 font-medium text-gray-900">
                        Purpose
                      </th>
                      <th className="text-left p-3 border border-gray-200 font-medium text-gray-900">
                        Location
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border border-gray-200">
                        Railway (AWS)
                      </td>
                      <td className="p-3 border border-gray-200">
                        Application hosting, database infrastructure, and Redis
                      </td>
                      <td className="p-3 border border-gray-200">
                        United States
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-gray-200">Clerk</td>
                      <td className="p-3 border border-gray-200">
                        Authentication and user management
                      </td>
                      <td className="p-3 border border-gray-200">
                        United States
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-gray-200">Nango</td>
                      <td className="p-3 border border-gray-200">
                        OAuth and integration API proxy
                      </td>
                      <td className="p-3 border border-gray-200">
                        United States / European Union
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-gray-200">OpenRouter</td>
                      <td className="p-3 border border-gray-200">
                        LLM inference (AI processing)
                      </td>
                      <td className="p-3 border border-gray-200">
                        United States
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-gray-200">Stripe</td>
                      <td className="p-3 border border-gray-200">
                        Payment processing
                      </td>
                      <td className="p-3 border border-gray-200">
                        United States
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-gray-200">Sentry</td>
                      <td className="p-3 border border-gray-200">
                        Error monitoring (no personally identifiable information
                        transmitted)
                      </td>
                      <td className="p-3 border border-gray-200">
                        United States
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-gray-200">PostHog</td>
                      <td className="p-3 border border-gray-200">
                        Product analytics (anonymous event data)
                      </td>
                      <td className="p-3 border border-gray-200">
                        United States / European Union
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                7. Data Security
              </h2>
              <p className="leading-relaxed">
                Yander shall implement and maintain appropriate technical and
                organizational measures to protect Personal Data against
                unauthorized or unlawful Processing, accidental loss,
                destruction, or damage. These measures include, but are not
                limited to:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>
                  <strong>Encryption at rest:</strong> All Personal Data stored
                  in databases and file systems is encrypted using AES-256
                  encryption via our infrastructure provider (Railway on AWS).
                </li>
                <li>
                  <strong>Encryption in transit:</strong> All data transmitted
                  between clients and servers is protected using TLS 1.3 via
                  our edge proxy. Internal service-to-service communication
                  occurs within the same isolated network.
                </li>
                <li>
                  <strong>Tenant-level data isolation:</strong> Every database
                  query is filtered by tenant identifier, ensuring strict logical
                  separation of Customer data. No Customer can access another
                  Customer&apos;s data.
                </li>
                <li>
                  <strong>Role-based access control:</strong> Access to Customer
                  data within the Service is governed by role-based permissions
                  (owner, admin, staff), ensuring that users can only access data
                  appropriate to their role.
                </li>
                <li>
                  <strong>No personally identifiable information in logs:</strong>{" "}
                  Application logs are designed to minimize personally
                  identifiable information. Logs primarily contain anonymized
                  identifiers, tenant identifiers, and operational metadata.
                </li>
                <li>
                  <strong>Regular security assessments:</strong> Yander conducts
                  regular security reviews, vulnerability assessments, and
                  updates to its security measures to address evolving threats.
                </li>
                <li>
                  <strong>Access controls for personnel:</strong> Yander limits
                  access to Personal Data to authorized personnel on a
                  need-to-know basis, and enforces multi-factor authentication
                  for all administrative access.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                8. Data Breach Notification
              </h2>
              <p className="leading-relaxed">
                Yander shall notify the Customer without undue delay, and where
                feasible within seventy-two (72) hours, after becoming aware of
                a breach of security leading to the accidental or unlawful
                destruction, loss, alteration, unauthorized disclosure of, or
                access to Personal Data processed under this DPA (a &quot;Personal
                Data Breach&quot;).
              </p>
              <p className="leading-relaxed mt-3">
                Such notification shall include, to the extent reasonably
                available:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>
                  A description of the nature of the Personal Data Breach,
                  including, where possible, the categories and approximate
                  number of Data Subjects concerned and the categories and
                  approximate number of Personal Data records concerned.
                </li>
                <li>
                  The name and contact details of Yander&apos;s point of contact
                  from whom more information can be obtained.
                </li>
                <li>
                  A description of the likely consequences of the Personal Data
                  Breach.
                </li>
                <li>
                  A description of the measures taken or proposed to be taken by
                  Yander to address the Personal Data Breach, including measures
                  to mitigate its possible adverse effects.
                </li>
              </ul>
              <p className="leading-relaxed mt-3">
                Yander shall cooperate with the Customer and take such
                commercially reasonable steps as the Customer may direct to
                assist in the investigation, mitigation, and remediation of each
                Personal Data Breach.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                9. Data Subject Rights
              </h2>
              <p className="leading-relaxed">
                Yander shall, taking into account the nature of the Processing,
                assist the Customer by appropriate technical and organizational
                measures, insofar as this is possible, in fulfilling the
                Customer&apos;s obligation to respond to requests from Data
                Subjects exercising their rights under applicable data
                protection laws. These rights include:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>
                  <strong>Right of access:</strong> The right to obtain
                  confirmation as to whether Personal Data is being processed
                  and, where that is the case, access to the Personal Data.
                </li>
                <li>
                  <strong>Right to rectification:</strong> The right to obtain
                  the rectification of inaccurate Personal Data.
                </li>
                <li>
                  <strong>Right to erasure:</strong> The right to obtain the
                  erasure of Personal Data where certain conditions are met.
                </li>
                <li>
                  <strong>Right to data portability:</strong> The right to
                  receive Personal Data in a structured, commonly used, and
                  machine-readable format.
                </li>
                <li>
                  <strong>Right to object:</strong> The right to object to
                  Processing of Personal Data on grounds relating to the Data
                  Subject&apos;s particular situation.
                </li>
              </ul>
              <p className="leading-relaxed mt-3">
                If Yander receives a request directly from a Data Subject, Yander
                shall promptly notify the Customer and shall not respond to the
                request without the Customer&apos;s prior written authorization,
                unless required to do so by applicable law.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                10. International Transfers
              </h2>
              <p className="leading-relaxed">
                The Customer acknowledges that Yander processes and stores
                Personal Data primarily in the United States. Where Personal
                Data originating from the European Economic Area (&quot;EEA&quot;),
                the United Kingdom, or Switzerland is transferred to the United
                States or any other country that has not been deemed to provide
                an adequate level of data protection by the relevant authority,
                the parties agree to rely on the Standard Contractual Clauses
                (EU Commission Implementing Decision 2021/914) as the lawful
                mechanism for such transfer.
              </p>
              <p className="leading-relaxed mt-3">
                For transfers subject to the UK GDPR, the parties shall rely on
                the International Data Transfer Addendum to the EU Standard
                Contractual Clauses, as issued by the UK Information
                Commissioner&apos;s Office. For transfers subject to the Swiss
                Federal Act on Data Protection, the Standard Contractual Clauses
                shall be interpreted to cover such transfers.
              </p>
              <p className="leading-relaxed mt-3">
                Yander shall ensure that any onward transfer of Personal Data to
                Sub-processors in third countries is subject to appropriate
                safeguards as required by applicable data protection laws.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                11. Data Retention and Deletion
              </h2>
              <p className="leading-relaxed">
                Yander shall retain Personal Data for the duration of the
                Agreement and as necessary to provide the Service. Upon
                termination or expiration of the Agreement, Yander shall, at the
                Customer&apos;s written request, delete all Personal Data
                processed on behalf of the Customer within thirty (30) days of
                receiving such request, unless applicable law requires continued
                retention.
              </p>
              <p className="leading-relaxed mt-3">
                If no deletion request is received within ninety (90) days of
                termination, Yander shall proceed to delete the Customer&apos;s
                Personal Data in accordance with its standard data retention
                policies.
              </p>
              <p className="leading-relaxed mt-3">
                Yander may retain anonymized or aggregated data that cannot be
                used to identify any individual. Such data is not considered
                Personal Data and is not subject to the deletion obligations of
                this DPA.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                12. Audit Rights
              </h2>
              <p className="leading-relaxed">
                Yander shall make available to the Customer, on request, all
                information reasonably necessary to demonstrate compliance with
                the obligations set out in this DPA, and shall allow for and
                contribute to audits, including inspections, conducted by the
                Customer or an auditor mandated by the Customer.
              </p>
              <p className="leading-relaxed mt-3">
                Audits shall be subject to the following conditions:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>
                  The Customer shall provide at least thirty (30) days&apos;
                  written notice prior to conducting an audit.
                </li>
                <li>
                  Audits shall be limited to no more than one (1) per calendar
                  year, unless required by a supervisory authority or following a
                  Personal Data Breach.
                </li>
                <li>
                  The Customer shall conduct audits during normal business hours
                  and in a manner that minimizes disruption to Yander&apos;s
                  operations.
                </li>
                <li>
                  The Customer and its auditors shall be bound by
                  confidentiality obligations with respect to any information
                  obtained during the audit.
                </li>
              </ul>
              <p className="leading-relaxed mt-3">
                Yander may satisfy audit requests by providing relevant
                certifications, audit reports (such as SOC 2 Type II reports),
                or other documentation that reasonably demonstrates compliance
                with the obligations of this DPA. The Customer shall consider
                such documentation in good faith before requiring an on-site
                audit.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                13. Liability
              </h2>
              <p className="leading-relaxed">
                Each party&apos;s liability arising out of or related to this
                DPA, whether in contract, tort, or under any other theory of
                liability, is subject to the limitations and exclusions of
                liability set out in the Agreement (Terms of Service). For the
                avoidance of doubt, Yander&apos;s total aggregate liability
                under this DPA shall be subject to the same caps and limitations
                as set forth in the Agreement.
              </p>
              <p className="leading-relaxed mt-3">
                Nothing in this DPA shall limit either party&apos;s liability
                for breaches of applicable data protection laws to the extent
                that such limitation is not permitted by law.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                14. Term and Termination
              </h2>
              <p className="leading-relaxed">
                This DPA shall become effective on the date the Customer agrees
                to the Agreement and shall remain in effect for the duration of
                the Agreement. This DPA shall automatically terminate upon the
                termination or expiration of the Agreement, subject to the
                provisions of this DPA that by their nature are intended to
                survive termination.
              </p>
              <p className="leading-relaxed mt-3">
                The following provisions shall survive termination of this DPA:
                Section 5.2 (Confidentiality), Section 5.7 (Deletion and Return
                of Data), Section 8 (Data Breach Notification) to the extent a
                breach is discovered after termination, Section 11 (Data
                Retention and Deletion), Section 12 (Audit Rights) for a period
                of twelve (12) months following termination, and Section 13
                (Liability).
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-gray-900 mb-3">
                15. Contact
              </h2>
              <p className="leading-relaxed">
                If you have questions about this Data Processing Agreement or
                wish to exercise any rights under it, please contact us:
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
