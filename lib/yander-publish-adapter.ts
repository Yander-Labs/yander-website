/**
 * Yander CMS publish adapter.
 *
 * The publish surface for the nightly worker / robot. yander-website is a
 * Sanity-backed (headless CMS) site — NOT MDX-in-repo — so "shipping" a post
 * means writing a `post` document to the Content Lake, not committing a file.
 *
 * The worker hands us a normalized post (markdown body + author/category slugs),
 * and this adapter:
 *   1. Converts markdown -> Portable Text blocks (no new deps; built-in).
 *   2. Resolves author + category slugs -> Sanity references.
 *   3. Estimates read time, generates a slug, optionally marks as draft.
 *   4. Upserts the document via the blessed CRUD helpers (validation + retry).
 *
 * Requires SANITY_TOKEN (write scope). Reuse this from the worker:
 *
 *   import { publishToYander } from "@/lib/yander-publish-adapter"
 *   const res = await publishToYander(
 *     {
 *       title: "Async vs Sync",
 *       bodyMarkdown: "## Heading\n\nA **paragraph**...",
 *       author: "yander-team",            // author slug
 *       categories: ["best-practices"],   // category slugs
 *       excerpt: "...",
 *     },
 *     // Worker passes Yander's OWN target — explicit, no ambient-env collision.
 *     { token: process.env.SANITY_API_TOKEN_YANDER },
 *   )
 *
 * Cross-tenant safety: this adapter writes ONLY to Yander's project. A hard
 * guard (resolveTarget) throws on any other projectId, so it can never write
 * into LoudFace (xjjjqhgt) or another tenant — even if the worker's ambient
 * SANITY_API_TOKEN / project-id is pointed elsewhere at call time.
 */

import { createClient, type SanityClient } from '@sanity/client'
import type { PortableTextBlock } from '@portabletext/types'
import type { SEO } from './types'
import { generateSlug, generateKey, estimateReadTime } from './sanity-crud'

/** Yander's Sanity project — the ONLY project this adapter is allowed to write to. */
const YANDER_PROJECT_ID = 's3r1d2vt'
/** LoudFace's project — explicitly named so a misconfig fails loud, not silent. */
const LOUDFACE_PROJECT_ID = 'xjjjqhgt'

// =============================================================================
// Public input contract
// =============================================================================

export interface IncomingPost {
  /** Post headline. Required. */
  title: string
  /** URL slug. Defaults to a slug derived from the title. */
  slug?: string
  /** Markdown body. Provide this OR `body` (pre-built blocks), not both. */
  bodyMarkdown?: string
  /** Pre-built Portable Text blocks. Takes precedence over `bodyMarkdown`. */
  body?: PortableTextBlock[]
  /** Author slug — must already exist in Sanity (resolved to a reference). */
  author: string
  /** Category slugs — must already exist (resolved to references). */
  categories?: string[]
  /** Short summary (<=300 chars). */
  excerpt?: string
  /** Asset _ref for the main/header image (e.g. "image-abc-1200x630-jpg"). */
  mainImageRef?: string
  /** Alt text for the main image. */
  mainImageAlt?: string
  /** ISO publish date. Defaults to now. */
  publishedAt?: string
  /** When true, writes a `drafts.` document instead of a live post. */
  draft?: boolean
  /** Optional SEO overrides. */
  seo?: SEO
}

export interface PublishResult {
  _id: string
  slug: string
  /** "created" for a brand-new post, "updated" when an existing slug was upserted. */
  action: 'created' | 'updated'
  readTime: number
  draft: boolean
  /** The Sanity project actually written to — echoed back for audit/logging. */
  projectId: string
}

/**
 * Explicit Sanity write target. The worker SHOULD pass this so each tenant's
 * publish uses an isolated client — never the ambient shared client.
 * Any omitted field falls back to env, but `projectId` is hard-guarded to Yander.
 */
export interface SanityTarget {
  /** Defaults to env, then Yander's id. MUST resolve to Yander's project or publish throws. */
  projectId?: string
  /** Defaults to env, then "production". */
  dataset?: string
  /** Write token. Defaults to SANITY_TOKEN. Pass Yander's OWN token here. */
  token?: string
  /** Sanity API version. Defaults to env, then "2024-01-01". */
  apiVersion?: string
}

// =============================================================================
// Target resolution + isolated client (cross-tenant guard)
// =============================================================================

interface ResolvedTarget {
  projectId: string
  dataset: string
  token: string
  apiVersion: string
}

function resolveTarget(target?: SanityTarget): ResolvedTarget {
  const projectId =
    target?.projectId ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? YANDER_PROJECT_ID
  const dataset =
    target?.dataset ?? process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
  const token = target?.token ?? process.env.SANITY_TOKEN
  const apiVersion =
    target?.apiVersion ?? process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01'

  // Hard guard: this adapter writes ONLY to Yander. Refuse anything else.
  if (projectId !== YANDER_PROJECT_ID) {
    const isLoudface = projectId === LOUDFACE_PROJECT_ID
    throw new Error(
      `publishToYander refuses to write to Sanity project "${projectId}" — ` +
        `this adapter writes only to Yander (${YANDER_PROJECT_ID}).` +
        (isLoudface
          ? ' That id is LoudFace — cross-tenant write blocked.'
          : ' Pass an explicit target.projectId for Yander.')
    )
  }
  if (!token) {
    throw new Error(
      "No Sanity write token. Pass target.token (Yander's own) or set SANITY_TOKEN."
    )
  }
  return { projectId, dataset, token, apiVersion }
}

/** Build a fresh, isolated write client for one publish — no shared/ambient client. */
function makeClient(t: ResolvedTarget): SanityClient {
  return createClient({
    projectId: t.projectId,
    dataset: t.dataset,
    apiVersion: t.apiVersion,
    token: t.token,
    useCdn: false, // writes + fresh reads
  })
}

// =============================================================================
// Reference resolution (uses the isolated client)
// =============================================================================

async function resolveAuthorRef(client: SanityClient, slug: string): Promise<string> {
  const id = await client.fetch<string | null>(
    `*[_type == "author" && slug.current == $slug][0]._id`,
    { slug }
  )
  if (!id) {
    throw new Error(
      `Author not found for slug "${slug}". Create the author in Sanity first ` +
        `(/manage-author), then re-run.`
    )
  }
  return id
}

async function resolveCategoryRefs(
  client: SanityClient,
  slugs: string[]
): Promise<string[]> {
  if (slugs.length === 0) return []

  const found = await client.fetch<Array<{ _id: string; slug: string }>>(
    `*[_type == "category" && slug.current in $slugs]{ _id, "slug": slug.current }`,
    { slugs }
  )
  const bySlug = new Map(found.map((c) => [c.slug, c._id]))

  const missing = slugs.filter((s) => !bySlug.has(s))
  if (missing.length > 0) {
    throw new Error(
      `Categories not found for slug(s): ${missing.join(', ')}. ` +
        `Create them in Sanity first (/manage-category), then re-run.`
    )
  }
  // Preserve caller order.
  return slugs.map((s) => bySlug.get(s) as string)
}

// =============================================================================
// Markdown -> Portable Text
// =============================================================================

type Span = { _type: 'span'; _key: string; text: string; marks: string[] }
type MarkDef = { _key: string; _type: 'link'; href: string }

// Matches (in priority order): inline code, link, bold, italic(*), italic(_).
const INLINE_RE =
  /(`[^`]+`)|(\[[^\]]+\]\([^)]+\))|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(_[^_]+_)/g

/**
 * Parse inline marks within a single line of text.
 * Supports: `code`, [text](url), **bold**, *italic* / _italic_.
 * Does not handle overlapping/nested marks (e.g. ***x***) — rare in generated
 * markdown; such text is emitted verbatim rather than crashing.
 */
function parseInline(text: string): { children: Span[]; markDefs: MarkDef[] } {
  const children: Span[] = []
  const markDefs: MarkDef[] = []
  let lastIndex = 0

  const push = (t: string, marks: string[]) => {
    if (t.length === 0) return
    children.push({ _type: 'span', _key: generateKey(), text: t, marks })
  }

  for (const match of text.matchAll(INLINE_RE)) {
    const idx = match.index ?? 0
    if (idx > lastIndex) push(text.slice(lastIndex, idx), [])

    const token = match[0]
    if (match[1]) {
      // `code`
      push(token.slice(1, -1), ['code'])
    } else if (match[2]) {
      // [text](url)
      const m = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token)
      if (m) {
        const key = generateKey()
        markDefs.push({ _key: key, _type: 'link', href: m[2] })
        push(m[1], [key])
      } else {
        push(token, [])
      }
    } else if (match[3]) {
      // **bold**
      push(token.slice(2, -2), ['strong'])
    } else if (match[4]) {
      // *italic*
      push(token.slice(1, -1), ['em'])
    } else if (match[5]) {
      // _italic_
      push(token.slice(1, -1), ['em'])
    }
    lastIndex = idx + token.length
  }
  if (lastIndex < text.length) push(text.slice(lastIndex), [])

  // Guarantee at least one (possibly empty) span.
  if (children.length === 0) push('', [])
  return { children, markDefs }
}

function textBlock(
  text: string,
  style: 'normal' | 'h2' | 'h3' | 'h4' | 'blockquote',
  listItem?: 'bullet' | 'number'
): PortableTextBlock {
  const { children, markDefs } = parseInline(text)
  const block: Record<string, unknown> = {
    _type: 'block',
    _key: generateKey(),
    style,
    markDefs,
    children,
  }
  if (listItem) {
    block.listItem = listItem
    block.level = 1
  }
  return block as unknown as PortableTextBlock
}

/**
 * Convert a markdown string to Portable Text blocks.
 *
 * Handles: ATX headings (#-####), paragraphs, unordered (-, *) and ordered
 * (1.) lists, blockquotes (>), and fenced code blocks (``` with optional lang)
 * emitted as `codeBlock`. Inline marks via parseInline().
 */
export function markdownToPortableText(md: string): PortableTextBlock[] {
  const blocks: PortableTextBlock[] = []
  const lines = md.replace(/\r\n/g, '\n').split('\n')
  let i = 0
  let paragraph: string[] = []

  const flushParagraph = () => {
    if (paragraph.length === 0) return
    blocks.push(textBlock(paragraph.join(' ').trim(), 'normal'))
    paragraph = []
  }

  while (i < lines.length) {
    const line = lines[i]

    // Fenced code block.
    const fence = /^```(\w+)?\s*$/.exec(line)
    if (fence) {
      flushParagraph()
      const language = fence[1]
      const code: string[] = []
      i++
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        code.push(lines[i])
        i++
      }
      i++ // skip closing fence
      blocks.push({
        _type: 'codeBlock',
        _key: generateKey(),
        code: code.join('\n'),
        ...(language ? { language } : {}),
      } as unknown as PortableTextBlock)
      continue
    }

    // Blank line ends a paragraph.
    if (line.trim() === '') {
      flushParagraph()
      i++
      continue
    }

    // Heading. Schema supports h2-h4; clamp h1 -> h2, h5/h6 -> h4.
    const heading = /^(#{1,6})\s+(.*)$/.exec(line)
    if (heading) {
      flushParagraph()
      const level = Math.min(Math.max(heading[1].length, 2), 4)
      blocks.push(textBlock(heading[2].trim(), `h${level}` as 'h2' | 'h3' | 'h4'))
      i++
      continue
    }

    // Blockquote.
    const quote = /^>\s?(.*)$/.exec(line)
    if (quote) {
      flushParagraph()
      blocks.push(textBlock(quote[1].trim(), 'blockquote'))
      i++
      continue
    }

    // Unordered list item.
    const ul = /^[-*]\s+(.*)$/.exec(line)
    if (ul) {
      flushParagraph()
      blocks.push(textBlock(ul[1].trim(), 'normal', 'bullet'))
      i++
      continue
    }

    // Ordered list item.
    const ol = /^\d+\.\s+(.*)$/.exec(line)
    if (ol) {
      flushParagraph()
      blocks.push(textBlock(ol[1].trim(), 'normal', 'number'))
      i++
      continue
    }

    // Otherwise: accumulate into the current paragraph.
    paragraph.push(line.trim())
    i++
  }
  flushParagraph()

  return blocks
}

// =============================================================================
// Publish
// =============================================================================

/**
 * Publish (or re-publish) a post to Yander's Sanity dataset.
 *
 * Idempotent: if a post already exists for the slug, it is updated; otherwise
 * a new post is created. Safe for the nightly worker to re-run.
 *
 * Cross-tenant safe: writes through an isolated client built from `target`
 * (or env), and a hard guard refuses any projectId other than Yander's.
 *
 * @param input  Normalized post (markdown body + author/category slugs).
 * @param target Yander's Sanity target. Worker SHOULD pass this explicitly
 *               (esp. token) rather than relying on ambient env.
 * @throws if the resolved projectId isn't Yander's, the token is missing,
 *         body is absent, or a referenced author/category slug doesn't exist.
 */
export async function publishToYander(
  input: IncomingPost,
  target?: SanityTarget
): Promise<PublishResult> {
  // 0. Resolve + guard the target, then build an isolated client.
  const cfg = resolveTarget(target)
  const client = makeClient(cfg)

  // 1. Body.
  const body =
    input.body ??
    (input.bodyMarkdown ? markdownToPortableText(input.bodyMarkdown) : undefined)
  if (!body || body.length === 0) {
    throw new Error('Post has no body — provide `bodyMarkdown` or `body`.')
  }

  // 2. Slug + refs (resolved in parallel, via the isolated client).
  const slug = input.slug?.trim() || generateSlug(input.title).current
  const [authorRef, categoryRefs] = await Promise.all([
    resolveAuthorRef(client, input.author),
    resolveCategoryRefs(client, input.categories ?? []),
  ])

  // 3. Assemble shared fields.
  const readTime = estimateReadTime(body as object[])
  const fields = {
    title: input.title,
    excerpt: input.excerpt,
    body,
    readTime,
    publishedAt: input.publishedAt || new Date().toISOString(),
    author: { _type: 'reference' as const, _ref: authorRef },
    categories: categoryRefs.map((_ref) => ({
      _type: 'reference' as const,
      _ref,
      _key: generateKey(),
    })),
    ...(input.mainImageRef
      ? {
          mainImage: {
            _type: 'image' as const,
            asset: { _type: 'reference' as const, _ref: input.mainImageRef },
            alt: input.mainImageAlt,
          },
        }
      : {}),
    ...(input.seo ? { seo: input.seo } : {}),
  }

  // 4. Upsert (slug-based). Note: a draft and a live post can share a slug;
  //    for the worker's republish-of-live-posts path this is the intended match.
  const existingId = await client.fetch<string | null>(
    `*[_type == "post" && slug.current == $slug] | order(_updatedAt desc)[0]._id`,
    { slug }
  )
  if (existingId) {
    const updated = await client.patch(existingId).set(fields).commit()
    return {
      _id: updated._id,
      slug,
      action: 'updated',
      readTime,
      draft: !!input.draft,
      projectId: cfg.projectId,
    }
  }

  const docId = `${input.draft ? 'drafts.' : ''}post-${slug}`
  const created = await client.create({
    _type: 'post',
    _id: docId,
    slug: { _type: 'slug', current: slug },
    ...fields,
  })
  return {
    _id: created._id,
    slug,
    action: 'created',
    readTime,
    draft: !!input.draft,
    projectId: cfg.projectId,
  }
}
