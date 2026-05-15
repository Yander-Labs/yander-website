import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SchemaJsonLd } from "@/components/seo/SchemaJsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/page-metadata";
import { BRAND_DESCRIPTION, SITE_URL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About Yander — The First AI Agent That Recruits For You",
  description:
    "Yander is built by operators who hire across 60+ countries. Meet the team behind the AI agent that headhunts, vets, and presents culture-matched candidates.",
  path: "/about",
  ogImageAlt: "About Yander",
});

// Single authoritative source for the team — surfaced as Person schema AND on-page cards.
const team = [
  {
    slug: "jordan-hayes",
    name: "Jordan Hayes",
    role: "Founder & CEO, Yander Labs",
    bio: "Jordan founded Yander Labs after 12 years building remote and offshore teams across LatAm, Europe, and Southeast Asia. Previously led talent for two B2B SaaS scale-ups.",
    image: "/jordan-hayes.png",
    linkedinUrl: "https://www.linkedin.com/in/jordan-hayes-yander",
    twitterUrl: "https://x.com/yanderlabs",
    yearsExperience: 12,
    expertise: [
      "Global remote hiring",
      "AI recruiting",
      "B2B SaaS scaling",
      "Offshore team building",
    ],
  },
];

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: `${SITE_URL}/about`,
  name: "About Yander",
  description: BRAND_DESCRIPTION,
  mainEntity: { "@id": `${SITE_URL}/#organization` },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: `${SITE_URL}/og-image.png`,
  },
};

const peopleSchema = team.map((member) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/about#${member.slug}`,
  name: member.name,
  jobTitle: member.role,
  description: member.bio,
  image: `${SITE_URL}${member.image}`,
  url: `${SITE_URL}/about#${member.slug}`,
  worksFor: { "@id": `${SITE_URL}/#organization` },
  knowsAbout: member.expertise,
  sameAs: [member.linkedinUrl, member.twitterUrl].filter(Boolean),
}));

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <SchemaJsonLd schema={aboutPageSchema} />
      <SchemaJsonLd schema={peopleSchema} />

      <Container>
        <Breadcrumbs
          className="pt-32 pb-6"
          items={[{ name: "Home", href: "/" }, { name: "About" }]}
        />
      </Container>

      <section className="pb-12 md:pb-20">
        <Container size="narrow">
          <div className="mb-12">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-[0.15em] mb-4">
              About
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-900 tracking-[-0.02em] leading-[1.05] mb-6">
              The first AI agent that recruits for you.
            </h1>
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl">
              Yander Labs is the company behind Yander — an AI agent that
              headhunts, vets, and presents culture-matched candidates for any
              role, anywhere in the world. We do this without placement fees
              because the recruiting industry's pricing model is broken.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-3">
                What we believe
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                The best talent is almost never the most-applied-to. Most
                companies hire from a tiny slice of an enormous pool. Yander
                surfaces the people who aren't in your inbox — and tells you why
                they'd thrive on your specific team.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-3">
                Where we work
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                Across the US, Canada, UK, Australia, South America, Europe,
                South Africa, and Southeast Asia. The companies we serve
                typically hire 5–50 global remote roles per year.
              </p>
            </div>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-8">
            The team
          </h2>
          <div className="grid sm:grid-cols-2 gap-8 mb-16">
            {team.map((member) => (
              <article
                key={member.slug}
                id={member.slug}
                className="rounded-2xl border border-[#E4E7EC] bg-white p-6 md:p-8"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={member.image}
                      alt={`${member.name} — ${member.role}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {member.bio}
                </p>
                {member.expertise.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {member.expertise.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm">
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer me"
                      className="text-gray-600 hover:text-gray-900 underline underline-offset-2"
                    >
                      LinkedIn
                    </a>
                  )}
                  {member.twitterUrl && (
                    <a
                      href={member.twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer me"
                      className="text-gray-600 hover:text-gray-900 underline underline-offset-2"
                    >
                      X / Twitter
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="border-t border-[#E4E7EC] pt-12">
            <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-3">
              Talk to us
            </h2>
            <p className="text-base text-gray-600 leading-relaxed max-w-xl mb-6">
              Want to see Yander in action, ask about Enterprise pricing, or
              tell us what's broken about your current hiring stack? Pick your
              path:
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact-sales">
                <Button variant="primary">Contact sales</Button>
              </Link>
              <Link href="/pricing">
                <Button variant="secondary">See pricing</Button>
              </Link>
              <a href="mailto:jordan@yanderlabs.com">
                <Button variant="ghost">jordan@yanderlabs.com</Button>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
