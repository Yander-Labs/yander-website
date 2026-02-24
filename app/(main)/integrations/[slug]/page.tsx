import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { DarkCTA } from "@/components/sections/DarkCTA";
import { getIntegrationBySlug, getAllSlugs } from "@/lib/integrations";
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
  if (!integration) return {};

  return {
    title: `${integration.name} Integration | Yander`,
    description: integration.description,
    openGraph: {
      title: `${integration.name} Integration | Yander`,
      description: integration.description,
    },
  };
}

export default async function IntegrationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const integration = getIntegrationBySlug(slug);
  if (!integration) notFound();

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-white">
        <Container>
          <Link
            href="/integrations/all"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All integrations
          </Link>

          <div className="flex items-start gap-5">
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl border border-[#E4E7EC] bg-gray-50 flex items-center justify-center overflow-hidden p-2">
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
                <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-[-0.02em]">
                  {integration.name}
                </h1>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  {integration.categoryLabel}
                </span>
                {integration.isImportOnly && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
                    Import Only
                  </span>
                )}
              </div>
              <p className="mt-3 text-lg text-gray-500 max-w-2xl">
                {integration.longDescription}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-12 md:py-16 bg-[#fafafa]">
        <Container>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 tracking-[-0.02em]">
            What Yander pulls from {integration.name}
          </h2>
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {integration.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Check className="w-3 h-3 text-emerald-600" />
                </span>
                <span className="text-sm text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-16 bg-white">
        <Container>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 tracking-[-0.02em]">
            How it works
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {integration.howItWorks.map((step, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#E4E7EC] bg-white p-6"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 text-white text-sm font-semibold mb-4">
                  {idx + 1}
                </span>
                <h3 className="text-base font-semibold text-gray-900">
                  {step.step}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
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
