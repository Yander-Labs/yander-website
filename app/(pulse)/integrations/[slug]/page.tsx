import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { DarkCTA } from "@/components/sections/DarkCTA";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SchemaJsonLd } from "@/components/seo/SchemaJsonLd";
import { getIntegrationBySlug, getAllSlugs } from "@/lib/integrations";
import { pageMetadata } from "@/lib/page-metadata";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { ArrowLeft, Check } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const integration = getIntegrationBySlug(slug);
  if (!integration) {
    return { title: `Integration Not Found | ${SITE_NAME}`, robots: { index: false, follow: false } };
  }

  return pageMetadata({
    title: `${integration.name} Integration for Yander — Pull Activity into One Dashboard`,
    description: integration.longDescription || integration.description,
    path: `/integrations/${integration.slug}`,
    ogImageAlt: `${integration.name} integration for Yander`,
  });
}

export default async function IntegrationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const integration = getIntegrationBySlug(slug);
  if (!integration) notFound();

  const url = `${SITE_URL}/integrations/${integration.slug}`;
  const integrationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `Yander × ${integration.name}`,
    description: integration.longDescription || integration.description,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: integration.categoryLabel,
    operatingSystem: "Web",
    url,
    publisher: { "@id": `${SITE_URL}/#organization` },
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", url: `${SITE_URL}/pricing` },
  };

  return (
    <>
      <SchemaJsonLd schema={integrationSchema} />
      {/* Header */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-white">
        <Container>
          <Breadcrumbs
            className="mb-6"
            items={[
              { name: "Home", href: "/" },
              { name: "Integrations", href: "/integrations" },
              { name: integration.name },
            ]}
          />
          <Link
            href="/integrations/all"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All integrations
          </Link>

          <div className="flex items-start gap-5">
            <div className="flex-shrink-0 w-16 h-16 rounded-md border border-[var(--color-border-canon)] bg-[var(--color-surface-subtle)] flex items-center justify-center overflow-hidden p-2">
              <Image
                src={integration.logo}
                alt={integration.name}
                width={120}
                height={120}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="font-medium text-3xl md:text-4xl text-[var(--color-ink-primary)] tracking-tight leading-[1.05]">
                  {integration.name}
                </h1>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-surface-muted)] text-[var(--color-ink-secondary)] border border-[var(--color-border-canon)]">
                  {integration.categoryLabel}
                </span>
                {integration.isImportOnly && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]/20">
                    Import Only
                  </span>
                )}
              </div>
              <p className="mt-3 text-lg text-[var(--color-ink-secondary)] max-w-2xl">
                {integration.longDescription}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-12 md:py-16 bg-[var(--color-surface-subtle)]">
        <Container>
          <h2 className="font-medium text-xl md:text-2xl text-[var(--color-ink-primary)] tracking-tight">
            What Yander pulls from {integration.name}
          </h2>
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {integration.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Check className="w-3 h-3 text-[var(--color-accent-alive)]" />
                </span>
                <span className="text-sm text-[var(--color-ink-secondary)]">{feature}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-16 bg-white">
        <Container>
          <h2 className="font-medium text-xl md:text-2xl text-[var(--color-ink-primary)] tracking-tight">
            How it works
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {integration.howItWorks.map((step, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[var(--color-border-canon)] bg-white shadow-[var(--shadow-canon-card)] p-6"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-[var(--color-ink-primary)] text-white text-sm font-semibold mb-4 font-[var(--font-geist-mono)]">
                  {idx + 1}
                </span>
                <h3 className="font-medium text-base text-[var(--color-ink-primary)] tracking-tight">
                  {step.step}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <DarkCTA />
    </>
  );
}
