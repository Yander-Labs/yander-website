import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// AI-engine crawlers we want to explicitly welcome. As of 2026 these are the
// production crawlers behind ChatGPT, Claude, Perplexity, Gemini, Bing Copilot,
// and Apple Intelligence.
const AI_BOTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Bingbot",
  "CCBot",
  "Bytespider",
  "DuckAssistBot",
  "Applebot-Extended",
  "FacebookBot",
  "Amazonbot",
] as const;

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/studio/", "/waitlist-confirmation/", "/api/", "/v1", "/v2"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      // Explicitly welcome AI bots (some treat the absence of an explicit allow
      // as ambiguous and back off).
      { userAgent: [...AI_BOTS], allow: "/", disallow: ["/studio/", "/api/"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
