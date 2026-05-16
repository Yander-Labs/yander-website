/**
 * Extract FAQ Q&A pairs from a Portable Text body.
 *
 * Two conventions are supported, since older posts use H3 and newer posts use
 * bold paragraphs:
 *
 * Convention A (newer Yander posts, **bold question**):
 *   ## FAQ
 *   **Question one?**
 *   Answer paragraph one.
 *   Optional continuation paragraph.
 *
 *   **Question two?**
 *   Answer paragraph two.
 *
 * Convention B (older Yander posts, ### H3 question):
 *   ## FAQ
 *   ### Question one?
 *   Answer paragraph one.
 *
 *   ### Question two?
 *   Answer paragraph two.
 *
 * This walker detects:
 *   - An H2 block whose plain text matches /^(faq|faqs|frequently asked questions|common questions)$/i
 *   - Subsequent blocks until the next H2 / HR / end of body
 *   - Question blocks: either an H3 block, OR a "normal" block whose children
 *     spans all carry the "strong" mark
 *   - Answer blocks: any non-empty block that isn't a question
 *
 * Multi-paragraph answers are joined with two newlines.
 *
 * Returns [] if no FAQ section is found, which is the signal to skip FAQPage schema.
 */

import type { PortableTextBlock, PortableTextSpan } from "@portabletext/types";

export interface ExtractedFaq {
  question: string;
  answer: string;
}

const FAQ_HEADING_RE = /^\s*(faq|faqs|frequently asked questions|common questions)\s*$/i;

function blockPlainText(block: PortableTextBlock): string {
  const children = (block as { children?: unknown[] }).children;
  if (!Array.isArray(children)) return "";
  return children
    .filter((c): c is PortableTextSpan =>
      typeof c === "object" &&
      c !== null &&
      "_type" in c &&
      (c as { _type: string })._type === "span"
    )
    .map((s) => s.text || "")
    .join("")
    .trim();
}

function isAllStrongSpans(block: PortableTextBlock): boolean {
  const children = (block as { children?: unknown[] }).children;
  if (!Array.isArray(children) || children.length === 0) return false;
  const spans = children.filter((c): c is PortableTextSpan =>
    typeof c === "object" &&
    c !== null &&
    "_type" in c &&
    (c as { _type: string })._type === "span"
  );
  if (spans.length === 0) return false;
  // Every span with non-empty text must include "strong" in its marks.
  return spans
    .filter((s) => (s.text || "").trim().length > 0)
    .every((s) => Array.isArray(s.marks) && s.marks.includes("strong"));
}

export function extractFaqsFromBody(body: PortableTextBlock[] | undefined | null): ExtractedFaq[] {
  if (!body || !Array.isArray(body) || body.length === 0) return [];

  // 1. Locate the FAQ heading.
  let start = -1;
  for (let i = 0; i < body.length; i++) {
    const block = body[i];
    if (block._type !== "block") continue;
    const style = (block as { style?: string }).style;
    if (style !== "h2") continue;
    if (FAQ_HEADING_RE.test(blockPlainText(block))) {
      start = i + 1;
      break;
    }
  }
  if (start < 0) return [];

  // 2. Walk forward, pairing questions and answers, until next H2/HR/end.
  const faqs: ExtractedFaq[] = [];
  let currentQuestion: string | null = null;
  let currentAnswerParts: string[] = [];

  const flush = () => {
    if (currentQuestion && currentAnswerParts.length > 0) {
      const answer = currentAnswerParts.join("\n\n").trim();
      if (answer.length > 0) {
        faqs.push({ question: currentQuestion, answer });
      }
    }
    currentQuestion = null;
    currentAnswerParts = [];
  };

  for (let i = start; i < body.length; i++) {
    const block = body[i];

    // End-of-section markers.
    if (block._type !== "block") {
      // Non-block elements (image, hr, etc.) end the current FAQ region only
      // if they look like a separator; we treat any non-block as a soft boundary.
      // To stay conservative, we only break on the next H2; non-blocks are skipped.
      continue;
    }
    const style = (block as { style?: string }).style;
    if (style === "h2") {
      flush();
      break;
    }

    const text = blockPlainText(block);
    if (!text) continue;

    const isH3Question = style === "h3";
    const isBoldQuestion = style === "normal" && isAllStrongSpans(block);

    if (isH3Question || isBoldQuestion) {
      // New question. Flush the previous pair first.
      flush();
      currentQuestion = text;
    } else if (currentQuestion) {
      // Part of the current answer.
      currentAnswerParts.push(text);
    }
    // If we hit content before any question (rare intro paragraph after the FAQ
    // heading), just ignore it — it isn't part of a Q&A pair.
  }
  flush();

  return faqs;
}
