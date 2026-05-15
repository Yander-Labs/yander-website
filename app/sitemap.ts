import type { MetadataRoute } from "next";
import { client } from "@/lib/sanity";
import { getAllSlugs as getAllIntegrationSlugs } from "@/lib/integrations";
import { SITE_URL } from "@/lib/site";

// Pull only what we need for sitemap (lastmod + slug) for every CMS type.
const sitemapDataQuery = `{
  "posts": *[_type == "post" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc) {
    "slug": slug.current, publishedAt, _updatedAt
  },
  "changelogs": *[_type == "changelog" && defined(slug.current)] | order(releaseDate desc) {
    "slug": slug.current, releaseDate, _updatedAt
  },
  "comparisons": *[_type == "comparison" && defined(slug.current)] | order(publishedAt desc) {
    "slug": slug.current, publishedAt, _updatedAt
  },
  "industries": *[_type == "industryPage" && defined(slug.current)] | order(publishedAt desc) {
    "slug": slug.current, publishedAt, _updatedAt
  },
  "landingPages": *[_type == "landingPage" && defined(slug.current)] | order(publishedAt desc) {
    "slug": slug.current, publishedAt, _updatedAt
  }
}`;

interface SitemapData {
  posts: { slug: string; publishedAt: string; _updatedAt: string }[];
  changelogs: { slug: string; releaseDate: string; _updatedAt: string }[];
  comparisons: { slug: string; publishedAt?: string; _updatedAt: string }[];
  industries: { slug: string; publishedAt?: string; _updatedAt: string }[];
  landingPages: { slug: string; publishedAt?: string; _updatedAt: string }[];
}

export const revalidate = 3600; // Refresh sitemap hourly

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await client.fetch<SitemapData>(sitemapDataQuery);

  const now = new Date();
  const lastmod = (d?: string) => (d ? new Date(d) : now);

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/pulse`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/pulse-pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/compare`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/integrations`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/integrations/all`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/contact-sales`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/remote-hiring-playbook`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/changelog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/security`, lastModified: new Date("2026-02-19"), changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: new Date("2026-02-19"), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms-of-service`, lastModified: new Date("2026-02-19"), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/dpa`, lastModified: new Date("2026-02-19"), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/beta-terms`, lastModified: new Date("2026-02-19"), changeFrequency: "yearly", priority: 0.2 },
  ];

  const blogPages: MetadataRoute.Sitemap = data.posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: lastmod(p._updatedAt || p.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const changelogPages: MetadataRoute.Sitemap = data.changelogs.map((c) => ({
    url: `${SITE_URL}/changelog/${c.slug}`,
    lastModified: lastmod(c._updatedAt || c.releaseDate),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  const comparePages: MetadataRoute.Sitemap = data.comparisons.map((c) => ({
    url: `${SITE_URL}/compare/${c.slug}`,
    lastModified: lastmod(c._updatedAt || c.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const industryPages: MetadataRoute.Sitemap = data.industries.map((i) => ({
    url: `${SITE_URL}/industries/${i.slug}`,
    lastModified: lastmod(i._updatedAt || i.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const landingPagesUrls: MetadataRoute.Sitemap = data.landingPages.map((p) => ({
    url: `${SITE_URL}/pages/${p.slug}`,
    lastModified: lastmod(p._updatedAt || p.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const integrationDetailUrls: MetadataRoute.Sitemap = getAllIntegrationSlugs().map(
    (slug) => ({
      url: `${SITE_URL}/integrations/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })
  );

  return [
    ...staticPages,
    ...blogPages,
    ...changelogPages,
    ...comparePages,
    ...industryPages,
    ...landingPagesUrls,
    ...integrationDetailUrls,
  ];
}
