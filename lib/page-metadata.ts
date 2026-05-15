import type { Metadata } from "next";
import { SITE_HANDLE, SITE_NAME, SITE_URL } from "./site";

interface PageMetadataInput {
  title: string;
  description: string;
  /** Path beginning with / (e.g. "/pricing"). Used for canonical and og:url. */
  path: string;
  /** Optional path to the OG image, defaults to /og-image.png. */
  ogImage?: string;
  ogImageAlt?: string;
  /** "article" for blog/changelog posts, "website" by default. */
  type?: "website" | "article";
  /** Set to true to add noindex, nofollow. */
  noIndex?: boolean;
  /** Used for article-type pages. */
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  keywords?: string[];
}

/**
 * Single helper that emits canonical, OG, and Twitter metadata consistently.
 * Always sets canonical, og:url, og:image, twitter:image — avoiding the
 * "child metadata replaces parent openGraph entirely" gotcha in Next.js.
 */
export function pageMetadata({
  title,
  description,
  path,
  ogImage = "/og-image.png",
  ogImageAlt,
  type = "website",
  noIndex = false,
  publishedTime,
  modifiedTime,
  authors,
  keywords,
}: PageMetadataInput): Metadata {
  const url = path.startsWith("http") ? path : `${SITE_URL}${path}`;
  const imageUrl = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;
  const altText = ogImageAlt || title;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
      locale: "en_US",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: altText }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: SITE_HANDLE,
      title,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
