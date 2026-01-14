import { createClient } from '@sanity/client'

/**
 * Write-enabled Sanity client for CRUD operations.
 * Requires SANITY_TOKEN environment variable with write access.
 *
 * Use this client for:
 * - Creating documents
 * - Updating documents
 * - Deleting documents
 * - Uploading assets
 *
 * For read operations, use the regular client from ./sanity.ts
 */
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 's3r1d2vt',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false, // Write operations require no CDN
})

/**
 * Check if write operations are enabled.
 * Returns true if SANITY_TOKEN is configured.
 */
export function isWriteEnabled(): boolean {
  return !!process.env.SANITY_TOKEN
}

/**
 * Throws an error if write operations are not enabled.
 * Call this at the start of any write operation.
 */
export function requireWriteAccess(): void {
  if (!isWriteEnabled()) {
    throw new Error(
      'SANITY_TOKEN not configured. Set the SANITY_TOKEN environment variable with a token that has write access.'
    )
  }
}
