import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

// Define the image source type inline for compatibility
type ImageSource = {
  asset?: {
    _ref?: string
    _type?: string
  }
  _type?: string
  [key: string]: unknown
}

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 's3r1d2vt',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: true, // Use CDN for faster reads in production
})

const builder = createImageUrlBuilder(client)

export function urlFor(source: ImageSource) {
  return builder.image(source)
}

// Helper to fetch data with proper typing
export async function sanityFetch<T>(query: string, params = {}): Promise<T> {
  return client.fetch<T>(query, params)
}
