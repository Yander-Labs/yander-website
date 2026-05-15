import type { Post, SEO } from "./types";
import { urlFor } from "./sanity";
import { SITE_HANDLE, SITE_NAME, SITE_URL } from "./site";

// =============================================================================
// Title cleaner — defends against authors leaving "| Yander" in metaTitle
// =============================================================================

/**
 * Strip any trailing brand suffix from a title so we never produce
 * "Title | Yander | Yander". The Sanity metaTitle field commonly contains
 * the brand because authors copy-paste from preview output.
 */
function cleanTitle(raw: string): string {
  return raw.replace(/\s*[|·\-—]\s*Yander\s*$/i, "").trim();
}

// =============================================================================
// SEO Metadata Generation
// =============================================================================

export interface SEOMetadata {
  title: string;
  description: string;
  canonical: string;
  openGraph: {
    title: string;
    description: string;
    type: string;
    url: string;
    images: Array<{ url: string; width: number; height: number; alt: string }>;
    siteName: string;
    publishedTime?: string;
    modifiedTime?: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    images: string[];
    site?: string;
  };
  robots: string;
  keywords?: string[];
  datePublished?: string;
  dateModified?: string;
}

/**
 * Generate complete SEO metadata for a blog post.
 * Handles fallbacks from SEO fields to standard post fields.
 */
export function generatePostSEO(
  post: Post,
  siteUrl: string = SITE_URL
): SEOMetadata {
  const postUrl = `${siteUrl}/blog/${post.slug.current}`;
  const seo = post.seo || {};

  // Title: SEO override > post title — strip any existing " | Yander" before appending.
  const rawTitle = seo.metaTitle || post.title;
  const fullTitle = `${cleanTitle(rawTitle)} | ${SITE_NAME}`;

  // Description: SEO override > excerpt > fallback
  const description =
    seo.metaDescription || post.excerpt || `Read ${post.title} on the Yander blog.`;

  // Image: SEO OG image > main image > default
  const ogImage = seo.ogImage || post.mainImage;
  const imageUrl = ogImage
    ? urlFor(ogImage).width(1200).height(630).url()
    : `${siteUrl}/og-image.png`;
  const imageAlt = ogImage?.alt || post.title;

  // Canonical: SEO override > post URL
  const canonical = seo.canonicalUrl || postUrl;

  // Dates — use Sanity's _updatedAt for dateModified to surface real freshness.
  const datePublished = post.publishedAt;
  const dateModified = post._updatedAt || post.publishedAt;

  // Robots directive
  const robots = seo.noIndex ? "noindex, nofollow" : "index, follow";

  return {
    title: fullTitle,
    description,
    canonical,
    openGraph: {
      title: fullTitle,
      description,
      type: "article",
      url: postUrl,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: imageAlt }],
      siteName: SITE_NAME,
      publishedTime: datePublished,
      modifiedTime: dateModified,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
      site: SITE_HANDLE,
    },
    robots,
    keywords: seo.keywords,
    datePublished,
    dateModified,
  };
}

// =============================================================================
// JSON-LD Structured Data
// =============================================================================

/**
 * Generate JSON-LD structured data for a blog post.
 * Follows schema.org BlogPosting specification with full Person + Organization
 * references and proper dateModified handling.
 */
export function generateJSONLD(
  post: Post,
  siteUrl: string = SITE_URL
): object {
  const seo = generatePostSEO(post, siteUrl);

  // Build a richer Person schema when the author has structured data.
  const authorSchema = post.author
    ? {
        "@type": "Person",
        name: post.author.name,
        ...(post.author.role ? { jobTitle: post.author.role } : {}),
        ...(post.author.bio ? { description: post.author.bio } : {}),
        ...(post.author.slug?.current
          ? { url: `${siteUrl}/about#${post.author.slug.current}` }
          : {}),
        ...(post.author.linkedinUrl || post.author.twitterUrl
          ? {
              sameAs: [
                post.author.linkedinUrl,
                post.author.twitterUrl,
              ].filter(Boolean),
            }
          : {}),
      }
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: seo.description,
    image: seo.openGraph.images[0]?.url,
    datePublished: seo.datePublished,
    dateModified: seo.dateModified,
    ...(authorSchema ? { author: authorSchema } : {}),
    publisher: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": seo.canonical,
    },
    wordCount: post.readTime ? post.readTime * 200 : undefined,
    keywords: seo.keywords?.join(", "),
    isAccessibleForFree: true,
    inLanguage: "en-US",
  };
}

// =============================================================================
// SEO Audit
// =============================================================================

export interface SEOIssue {
  type: "error" | "warning" | "info";
  field: string;
  message: string;
}

export interface SEOAuditResult {
  score: number;
  issues: SEOIssue[];
  suggestions: string[];
}

/**
 * Audit a blog post's SEO and provide a score with issues.
 *
 * Score starts at 100 and deductions are made for issues:
 * - Errors: -15 to -20 points
 * - Warnings: -5 to -10 points
 * - Info: no deduction (suggestions only)
 */
export function auditPostSEO(post: Post): SEOAuditResult {
  const issues: SEOIssue[] = [];
  const suggestions: string[] = [];
  let score = 100;

  // -------------------------------------------------------------------------
  // Title Analysis
  // -------------------------------------------------------------------------
  const title = post.seo?.metaTitle || post.title;

  if (!title) {
    issues.push({
      type: "error",
      field: "title",
      message: "Missing title - critical for SEO",
    });
    score -= 20;
  } else if (title.length > 60) {
    issues.push({
      type: "warning",
      field: "title",
      message: `Title too long (${title.length} chars). Google truncates at ~60.`,
    });
    score -= 5;
  } else if (title.length < 30) {
    issues.push({
      type: "info",
      field: "title",
      message: `Title is short (${title.length} chars). Consider 40-60 for better CTR.`,
    });
    suggestions.push("Expand title to 40-60 characters for better click-through rate");
  }

  // Catch the double-suffix early.
  if (title && /\s*[|·\-—]\s*Yander\s*$/i.test(title)) {
    issues.push({
      type: "warning",
      field: "title",
      message:
        "Meta title already ends with '| Yander' — template will append again. Strip the brand suffix from the metaTitle field.",
    });
    score -= 5;
  }

  // -------------------------------------------------------------------------
  // Meta Description Analysis
  // -------------------------------------------------------------------------
  const description = post.seo?.metaDescription || post.excerpt;

  if (!description) {
    issues.push({
      type: "error",
      field: "metaDescription",
      message: "Missing meta description - Google will auto-generate one",
    });
    score -= 15;
  } else if (description.length > 160) {
    issues.push({
      type: "warning",
      field: "metaDescription",
      message: `Description too long (${description.length} chars). Google truncates at ~160.`,
    });
    score -= 5;
  } else if (description.length < 120) {
    issues.push({
      type: "warning",
      field: "metaDescription",
      message: `Description is short (${description.length} chars). Ahrefs flags under 120. Aim 120-160.`,
    });
    score -= 5;
  }

  // -------------------------------------------------------------------------
  // Image Analysis
  // -------------------------------------------------------------------------
  const hasImage = post.mainImage || post.seo?.ogImage;

  if (!hasImage) {
    issues.push({
      type: "warning",
      field: "image",
      message: "No featured image for social sharing",
    });
    score -= 10;
    suggestions.push("Add a main image or OG image (1200x630px recommended)");
  } else {
    const imageAlt = post.mainImage?.alt || post.seo?.ogImage?.alt;
    if (!imageAlt) {
      issues.push({
        type: "warning",
        field: "imageAlt",
        message: "Image missing alt text - important for accessibility and SEO",
      });
      score -= 5;
    }
  }

  // -------------------------------------------------------------------------
  // Author Analysis (E-E-A-T)
  // -------------------------------------------------------------------------
  if (!post.author) {
    issues.push({
      type: "warning",
      field: "author",
      message:
        "No author assigned - drops E-E-A-T (single biggest AI citation signal: r=0.81)",
    });
    score -= 8;
    suggestions.push("Assign a named author with LinkedIn URL to improve E-E-A-T");
  } else if (/team|staff|editor/i.test(post.author.name)) {
    issues.push({
      type: "info",
      field: "author",
      message: `Author is a generic name ("${post.author.name}") - named individuals get cited 2-3x more by AI engines`,
    });
    suggestions.push("Replace generic team author with a named expert");
  }

  // -------------------------------------------------------------------------
  // Category Analysis
  // -------------------------------------------------------------------------
  if (!post.categories || post.categories.length === 0) {
    issues.push({
      type: "info",
      field: "categories",
      message: "No categories assigned",
    });
    suggestions.push("Add categories for better site structure and internal linking");
  }

  // -------------------------------------------------------------------------
  // Keywords Analysis
  // -------------------------------------------------------------------------
  if (!post.seo?.keywords || post.seo.keywords.length === 0) {
    suggestions.push("Add 3-5 focus keywords for content optimization");
  } else if (post.seo.keywords.length > 7) {
    issues.push({
      type: "info",
      field: "keywords",
      message: `Too many keywords (${post.seo.keywords.length}). Focus on 3-5 for better targeting.`,
    });
  }

  // -------------------------------------------------------------------------
  // Excerpt/Body Analysis
  // -------------------------------------------------------------------------
  if (!post.excerpt) {
    suggestions.push("Add an excerpt for better control over search result snippets");
  }

  if (!post.body || post.body.length === 0) {
    issues.push({
      type: "error",
      field: "body",
      message: "Post has no content",
    });
    score -= 20;
  }

  // Ensure score doesn't go below 0
  score = Math.max(0, score);

  return { score, issues, suggestions };
}

/**
 * Get a human-readable summary of the audit score.
 */
export function getScoreLabel(score: number): {
  label: string;
  color: string;
  publishable: boolean;
} {
  if (score >= 90) {
    return { label: "Excellent", color: "emerald", publishable: true };
  } else if (score >= 80) {
    return { label: "Good", color: "blue", publishable: true };
  } else if (score >= 60) {
    return { label: "Needs Work", color: "amber", publishable: false };
  } else {
    return { label: "Poor", color: "rose", publishable: false };
  }
}

/**
 * Format audit results as a readable string.
 */
export function formatAuditReport(post: Post): string {
  const audit = auditPostSEO(post);
  const { label, publishable } = getScoreLabel(audit.score);

  const lines: string[] = [
    `SEO Audit: ${post.title}`,
    `Score: ${audit.score}/100 (${label})`,
    `Publishable: ${publishable ? "Yes" : "No - fix issues first"}`,
    "",
  ];

  if (audit.issues.length > 0) {
    lines.push("Issues:");
    for (const issue of audit.issues) {
      const icon = issue.type === "error" ? "❌" : issue.type === "warning" ? "⚠️" : "ℹ️";
      lines.push(`  ${icon} [${issue.field}] ${issue.message}`);
    }
    lines.push("");
  }

  if (audit.suggestions.length > 0) {
    lines.push("Suggestions:");
    for (const suggestion of audit.suggestions) {
      lines.push(`  • ${suggestion}`);
    }
  }

  return lines.join("\n");
}
