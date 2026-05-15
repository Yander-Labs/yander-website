// Single source of truth for site URL.
// Production serves yander.ai with a 301 → www.yander.ai redirect, so we
// canonicalize on the www host. This eliminates the canonical/redirect mismatch.
export const SITE_URL = "https://www.yander.ai" as const;
export const SITE_NAME = "Yander" as const;
export const SITE_HANDLE = "@yanderlabs" as const;
export const BRAND_TAGLINE =
  "The first AI agent that recruits for you" as const;
export const BRAND_DESCRIPTION =
  "Yander is the first AI agent that recruits for you — it headhunts, vets, and presents culture-matched candidates worldwide. No placement fees." as const;
