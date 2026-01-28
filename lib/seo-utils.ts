import type { Post, SEO } from './types'
import { urlFor } from './sanity'

// =============================================================================
// SEO Metadata Generation
// =============================================================================

export interface SEOMetadata {
  title: string
  description: string
  canonical: string
  openGraph: {
    title: string
    description: string
    type: string
    url: string
    images: Array<{ url: string; width: number; height: number; alt: string }>
    siteName: string
  }
  twitter: {
    card: string
    title: string
    description: string
    images: string[]
  }
  robots: string
  keywords?: string[]
}

/**
 * Generate complete SEO metadata for a blog post.
 * Handles fallbacks from SEO fields to standard post fields.
 */
export function generatePostSEO(
  post: Post,
  siteUrl: string = 'https://yander.io'
): SEOMetadata {
  const postUrl = `${siteUrl}/blog/${post.slug.current}`
  const seo = post.seo || {}

  // Title: SEO override > post title
  const title = seo.metaTitle || post.title
  const fullTitle = `${title} | Yander Blog`

  // Description: SEO override > excerpt > fallback
  const description =
    seo.metaDescription ||
    post.excerpt ||
    `Read ${post.title} on the Yander blog.`

  // Image: SEO OG image > main image > default
  const ogImage = seo.ogImage || post.mainImage
  const imageUrl = ogImage
    ? urlFor(ogImage).width(1200).height(630).url()
    : `${siteUrl}/og-default.jpg`
  const imageAlt = ogImage?.alt || post.title

  // Canonical: SEO override > post URL
  const canonical = seo.canonicalUrl || postUrl

  // Robots directive
  const robots = seo.noIndex ? 'noindex, nofollow' : 'index, follow'

  return {
    title: fullTitle,
    description,
    canonical,
    openGraph: {
      title,
      description,
      type: 'article',
      url: postUrl,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: imageAlt }],
      siteName: 'Yander',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots,
    keywords: seo.keywords,
  }
}

// =============================================================================
// JSON-LD Structured Data
// =============================================================================

/**
 * Generate JSON-LD structured data for a blog post.
 * Follows schema.org BlogPosting specification.
 */
export function generateJSONLD(
  post: Post,
  siteUrl: string = 'https://yander.io'
): object {
  const seo = generatePostSEO(post, siteUrl)

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: seo.description,
    image: seo.openGraph.images[0]?.url,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: post.author
      ? {
          '@type': 'Person',
          name: post.author.name,
          jobTitle: post.author.role,
        }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'Yander',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': seo.canonical,
    },
    wordCount: post.readTime ? post.readTime * 200 : undefined,
    keywords: seo.keywords?.join(', '),
  }
}

// =============================================================================
// SEO Audit
// =============================================================================

export interface SEOIssue {
  type: 'error' | 'warning' | 'info'
  field: string
  message: string
}

export interface SEOAuditResult {
  score: number
  issues: SEOIssue[]
  suggestions: string[]
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
  const issues: SEOIssue[] = []
  const suggestions: string[] = []
  let score = 100

  // -------------------------------------------------------------------------
  // Title Analysis
  // -------------------------------------------------------------------------
  const title = post.seo?.metaTitle || post.title

  if (!title) {
    issues.push({
      type: 'error',
      field: 'title',
      message: 'Missing title - critical for SEO',
    })
    score -= 20
  } else if (title.length > 60) {
    issues.push({
      type: 'warning',
      field: 'title',
      message: `Title too long (${title.length} chars). Google truncates at ~60.`,
    })
    score -= 5
  } else if (title.length < 30) {
    issues.push({
      type: 'info',
      field: 'title',
      message: `Title is short (${title.length} chars). Consider 40-60 for better CTR.`,
    })
    suggestions.push('Expand title to 40-60 characters for better click-through rate')
  }

  // -------------------------------------------------------------------------
  // Meta Description Analysis
  // -------------------------------------------------------------------------
  const description = post.seo?.metaDescription || post.excerpt

  if (!description) {
    issues.push({
      type: 'error',
      field: 'metaDescription',
      message: 'Missing meta description - Google will auto-generate one',
    })
    score -= 15
  } else if (description.length > 160) {
    issues.push({
      type: 'warning',
      field: 'metaDescription',
      message: `Description too long (${description.length} chars). Google truncates at ~160.`,
    })
    score -= 5
  } else if (description.length < 70) {
    issues.push({
      type: 'info',
      field: 'metaDescription',
      message: `Description is short (${description.length} chars). Aim for 120-160.`,
    })
    suggestions.push('Expand meta description to 120-160 characters')
  }

  // -------------------------------------------------------------------------
  // Image Analysis
  // -------------------------------------------------------------------------
  const hasImage = post.mainImage || post.seo?.ogImage

  if (!hasImage) {
    issues.push({
      type: 'warning',
      field: 'image',
      message: 'No featured image for social sharing',
    })
    score -= 10
    suggestions.push('Add a main image or OG image (1200x630px recommended)')
  } else {
    // Check for alt text
    const imageAlt = post.mainImage?.alt || post.seo?.ogImage?.alt
    if (!imageAlt) {
      issues.push({
        type: 'warning',
        field: 'imageAlt',
        message: 'Image missing alt text - important for accessibility and SEO',
      })
      score -= 5
    }
  }

  // -------------------------------------------------------------------------
  // Author Analysis
  // -------------------------------------------------------------------------
  if (!post.author) {
    issues.push({
      type: 'info',
      field: 'author',
      message: 'No author assigned - reduces E-E-A-T signals',
    })
    suggestions.push('Assign an author to improve Experience, Expertise, Authority, Trust')
  }

  // -------------------------------------------------------------------------
  // Category Analysis
  // -------------------------------------------------------------------------
  if (!post.categories || post.categories.length === 0) {
    issues.push({
      type: 'info',
      field: 'categories',
      message: 'No categories assigned',
    })
    suggestions.push('Add categories for better site structure and internal linking')
  }

  // -------------------------------------------------------------------------
  // Keywords Analysis
  // -------------------------------------------------------------------------
  if (!post.seo?.keywords || post.seo.keywords.length === 0) {
    suggestions.push('Add 3-5 focus keywords for content optimization')
  } else if (post.seo.keywords.length > 7) {
    issues.push({
      type: 'info',
      field: 'keywords',
      message: `Too many keywords (${post.seo.keywords.length}). Focus on 3-5 for better targeting.`,
    })
  }

  // -------------------------------------------------------------------------
  // Excerpt/Body Analysis
  // -------------------------------------------------------------------------
  if (!post.excerpt) {
    suggestions.push('Add an excerpt for better control over search result snippets')
  }

  if (!post.body || post.body.length === 0) {
    issues.push({
      type: 'error',
      field: 'body',
      message: 'Post has no content',
    })
    score -= 20
  }

  // Ensure score doesn't go below 0
  score = Math.max(0, score)

  return { score, issues, suggestions }
}

/**
 * Get a human-readable summary of the audit score.
 */
export function getScoreLabel(score: number): {
  label: string
  color: string
  publishable: boolean
} {
  if (score >= 90) {
    return { label: 'Excellent', color: 'emerald', publishable: true }
  } else if (score >= 80) {
    return { label: 'Good', color: 'blue', publishable: true }
  } else if (score >= 60) {
    return { label: 'Needs Work', color: 'amber', publishable: false }
  } else {
    return { label: 'Poor', color: 'rose', publishable: false }
  }
}

/**
 * Format audit results as a readable string.
 */
export function formatAuditReport(post: Post): string {
  const audit = auditPostSEO(post)
  const { label, publishable } = getScoreLabel(audit.score)

  const lines: string[] = [
    `SEO Audit: ${post.title}`,
    `Score: ${audit.score}/100 (${label})`,
    `Publishable: ${publishable ? 'Yes' : 'No - fix issues first'}`,
    '',
  ]

  if (audit.issues.length > 0) {
    lines.push('Issues:')
    for (const issue of audit.issues) {
      const icon = issue.type === 'error' ? '❌' : issue.type === 'warning' ? '⚠️' : 'ℹ️'
      lines.push(`  ${icon} [${issue.field}] ${issue.message}`)
    }
    lines.push('')
  }

  if (audit.suggestions.length > 0) {
    lines.push('Suggestions:')
    for (const suggestion of audit.suggestions) {
      lines.push(`  • ${suggestion}`)
    }
  }

  return lines.join('\n')
}
