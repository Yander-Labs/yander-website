import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { SchemaJsonLd } from "@/components/seo/SchemaJsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { pageMetadata } from "@/lib/page-metadata";
import { BRAND_DESCRIPTION, SITE_URL } from "@/lib/site";
import { AboutContactButtons } from "./AboutContactButtons";

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
    role: "Co-founder, Yander",
    bio: "Jordan started in marketing in 2016 running Facebook ads as a freelancer. In 2020 he founded Hayes Media, a remote-first eCommerce marketing agency that now spans 18 team members across 10 countries and has put $10M+ into ad creatives for its clients. Yander is built on the same hiring playbook that scaled Hayes Media — globally, fast, with no recruiters in the loop.",
    image: "/jordan-hayes.png",
    linkedinUrl: "https://www.linkedin.com/in/jordanhayesdtc/",
    twitterUrl: "https://x.com/jordanhayesdtc",
    yearsExperience: 10,
  },
  {
    slug: "arnel-bukva",
    name: "Arnel Bukva",
    role: "Co-founder, Yander",
    bio: "Arnel has run Loudface, a creative and performance agency working with brands like Montblanc and Radisson Hotels. He's been hiring remote talent with AI for years and has built many successful companies using the latest AI tools. He co-founded Yander to channel that passion into a platform that helps businesses find and retain their best talent.",
    image: "/arnel-bukva.jpg",
    linkedinUrl: "https://www.linkedin.com/in/arnel-bukva/",
    twitterUrl: "https://x.com/BukvaArnel",
    yearsExperience: 10,
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
            <div className="mb-4">
              <Eyebrow>About</Eyebrow>
            </div>
            <h1 className="font-medium text-4xl md:text-5xl lg:text-6xl text-[var(--color-ink-primary)] tracking-tight leading-[1.05] mb-6">
              The first AI agent that recruits for you.
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-ink-secondary)] leading-relaxed max-w-2xl">
              Yander is an AI agent that headhunts, vets, and presents
              culture-matched candidates for any role, anywhere in the world.
              We do this without placement fees because the recruiting
              industry's pricing model is broken.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div>
              <h2 className="font-medium text-2xl md:text-3xl text-[var(--color-ink-primary)] tracking-tight mb-3">
                What we believe
              </h2>
              <p className="text-base text-[var(--color-ink-secondary)] leading-relaxed">
                The best talent is almost never the most-applied-to. Most
                companies hire from a tiny slice of an enormous pool. Yander
                surfaces the people who aren't in your inbox and tells you why
                they'd thrive on your specific team.
              </p>
            </div>
            <div>
              <h2 className="font-medium text-2xl md:text-3xl text-[var(--color-ink-primary)] tracking-tight mb-3">
                Where we work
              </h2>
              <p className="text-base text-[var(--color-ink-secondary)] leading-relaxed">
                Across the US, Canada, UK, Australia, South America, Europe,
                South Africa, and Southeast Asia.
              </p>
            </div>
          </div>

          <h2 className="font-medium text-3xl md:text-4xl text-[var(--color-ink-primary)] tracking-tight mb-8">
            The team
          </h2>
          <div className="grid sm:grid-cols-2 gap-8 mb-16">
            {team.map((member) => (
              <Card
                key={member.slug}
                variant="squared"
                className="p-6 md:p-8"
              >
                <article id={member.slug}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-[var(--color-surface-muted)] flex-shrink-0">
                      <Image
                        src={member.image}
                        alt={`${member.name}, ${member.role}`}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg text-[var(--color-ink-primary)] tracking-tight">
                        {member.name}
                      </h3>
                      <p className="text-sm text-[var(--color-ink-muted)]">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--color-ink-secondary)] leading-relaxed mb-4">
                    {member.bio}
                  </p>
                  <div className="flex items-center gap-3 text-sm">
                    {member.linkedinUrl && (
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer me"
                        className="text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)] underline underline-offset-2"
                      >
                        LinkedIn
                      </a>
                    )}
                    {member.twitterUrl && (
                      <a
                        href={member.twitterUrl}
                        target="_blank"
                        rel="noopener noreferrer me"
                        className="text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)] underline underline-offset-2"
                      >
                        X / Twitter
                      </a>
                    )}
                  </div>
                </article>
              </Card>
            ))}
          </div>

          <div className="border-t border-[var(--color-border-canon)] pt-12">
            <h2 className="font-medium text-2xl md:text-3xl text-[var(--color-ink-primary)] tracking-tight mb-3">
              Talk to us
            </h2>
            <p className="text-base text-[var(--color-ink-secondary)] leading-relaxed max-w-xl mb-6">
              Want to see Yander in action, ask about Enterprise pricing, or
              tell us what's broken about your current hiring stack? Pick your
              path:
            </p>
            <AboutContactButtons />
          </div>
        </Container>
      </section>
    </main>
  );
}
