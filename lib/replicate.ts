import Replicate from 'replicate'
import { uploadImage } from './sanity-crud'
import type { ImageReference } from './types'

// =============================================================================
// Configuration
// =============================================================================

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

export type ImageModel = 'flux-schnell' | 'flux-pro' | 'sdxl'

export interface GenerateImageOptions {
  model?: ImageModel
  width?: number
  height?: number
  aspectRatio?: '16:9' | '1:1' | '4:3'
}

const MODEL_IDS: Record<ImageModel, `${string}/${string}`> = {
  'flux-schnell': 'black-forest-labs/flux-schnell',
  'flux-pro': 'black-forest-labs/flux-pro',
  'sdxl': 'stability-ai/sdxl',
}

// Model info for documentation
export const MODEL_INFO: Record<ImageModel, { speed: string; quality: string; cost: string }> = {
  'flux-schnell': { speed: '~2s', quality: 'Good', cost: '~$0.003' },
  'flux-pro': { speed: '~10s', quality: 'Excellent', cost: '~$0.05' },
  'sdxl': { speed: '~5s', quality: 'Very Good', cost: '~$0.01' },
}

// =============================================================================
// Token Validation
// =============================================================================

/**
 * Check if Replicate API token is configured.
 */
export function hasReplicateAccess(): boolean {
  return !!process.env.REPLICATE_API_TOKEN
}

/**
 * Throw if Replicate API token is not configured.
 */
export function requireReplicateAccess(): void {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      'REPLICATE_API_TOKEN not configured. ' +
      'Get your token from https://replicate.com/account/api-tokens'
    )
  }
}

// =============================================================================
// Image Generation
// =============================================================================

/**
 * Generate an image using Replicate AI.
 * Returns a Buffer containing the image data.
 *
 * @param prompt - Text description of the image to generate
 * @param options - Generation options (model, dimensions)
 */
export async function generateImage(
  prompt: string,
  options: GenerateImageOptions = {}
): Promise<Buffer> {
  requireReplicateAccess()

  const model = options.model || 'flux-schnell'
  const width = options.width || 1200
  const height = options.height || 630

  console.log(`Generating image with ${model}...`)
  console.log(`Prompt: "${prompt.substring(0, 100)}${prompt.length > 100 ? '...' : ''}"`)

  // Use prediction API for reliable output handling
  const prediction = await replicate.predictions.create({
    model: MODEL_IDS[model],
    input: {
      prompt,
      width,
      height,
      num_outputs: 1,
    },
  })

  console.log(`Prediction created: ${prediction.id}`)

  // Poll for completion
  let result = await replicate.predictions.get(prediction.id)
  while (result.status !== 'succeeded' && result.status !== 'failed') {
    console.log(`Status: ${result.status}...`)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    result = await replicate.predictions.get(prediction.id)
  }

  if (result.status === 'failed') {
    throw new Error(`Image generation failed: ${result.error}`)
  }

  // Get the image URL from output
  const imageUrl = Array.isArray(result.output) ? result.output[0] : result.output

  if (!imageUrl || typeof imageUrl !== 'string') {
    throw new Error('No image URL returned from Replicate')
  }

  console.log(`Downloading generated image...`)
  const response = await fetch(imageUrl)

  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.statusText}`)
  }

  return Buffer.from(await response.arrayBuffer())
}

/**
 * Generate an image and upload it directly to Sanity.
 * Returns an ImageReference ready to use in documents.
 *
 * @param prompt - Text description of the image to generate
 * @param filename - Filename for the Sanity asset
 * @param altText - Alt text for accessibility
 * @param options - Generation options (model, dimensions)
 */
export async function generateAndUploadImage(
  prompt: string,
  filename: string,
  altText: string,
  options: GenerateImageOptions = {}
): Promise<ImageReference> {
  const buffer = await generateImage(prompt, options)

  console.log(`Uploading to Sanity as "${filename}"...`)
  const imageRef = await uploadImage(buffer, filename, altText)

  console.log(`Image uploaded successfully!`)
  return imageRef
}

// =============================================================================
// Blog Image Helpers
// =============================================================================

export type BlogImageStyle = 'professional' | 'abstract' | 'illustration' | 'photography'

const STYLE_PROMPTS: Record<BlogImageStyle, string> = {
  professional: 'professional, clean, modern business style, subtle gradients, corporate aesthetic, minimalist',
  abstract: 'abstract geometric shapes, vibrant colors, modern art style, dynamic composition',
  illustration: 'digital illustration, flat design, friendly and approachable, warm colors',
  photography: 'photorealistic, natural lighting, high quality stock photo style, authentic',
}

/**
 * Generate a blog header image based on post title.
 * Automatically creates an appropriate prompt and uploads to Sanity.
 *
 * @param postTitle - Title of the blog post (used for prompt generation)
 * @param style - Visual style for the image
 * @param model - Replicate model to use (default: flux-schnell)
 */
export async function generateBlogImage(
  postTitle: string,
  style: BlogImageStyle = 'professional',
  model: ImageModel = 'flux-schnell'
): Promise<ImageReference> {
  const prompt = `Blog header image for article titled "${postTitle}". ${STYLE_PROMPTS[style]}. No text or letters in the image. 16:9 aspect ratio. High quality, visually appealing.`

  const slug = postTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50)

  const filename = `blog-${slug}-${Date.now()}.jpg`

  return generateAndUploadImage(prompt, filename, postTitle, {
    width: 1200,
    height: 630,
    model,
  })
}

/**
 * Generate an OG (Open Graph) image optimized for social sharing.
 * Uses 1200x630 dimensions per social media requirements.
 *
 * @param postTitle - Title of the blog post
 * @param style - Visual style for the image
 * @param model - Replicate model to use
 */
export async function generateOGImage(
  postTitle: string,
  style: BlogImageStyle = 'professional',
  model: ImageModel = 'flux-schnell'
): Promise<ImageReference> {
  const prompt = `Social media preview image for article "${postTitle}". ${STYLE_PROMPTS[style]}. Bold, eye-catching, optimized for social sharing. No text. 1200x630 aspect ratio.`

  const slug = postTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 40)

  const filename = `og-${slug}-${Date.now()}.jpg`

  return generateAndUploadImage(prompt, filename, `${postTitle} - Social Preview`, {
    width: 1200,
    height: 630,
    model,
  })
}

/**
 * Generate a custom image with full control over the prompt.
 * Useful for specific image needs beyond standard blog headers.
 *
 * @param prompt - Full prompt for image generation
 * @param filename - Desired filename (without path)
 * @param altText - Alt text for accessibility
 * @param options - Generation options
 */
export async function generateCustomImage(
  prompt: string,
  filename: string,
  altText: string,
  options: GenerateImageOptions = {}
): Promise<ImageReference> {
  // Add timestamp to prevent filename collisions
  const uniqueFilename = filename.replace(/(\.[^.]+)$/, `-${Date.now()}$1`)

  return generateAndUploadImage(prompt, uniqueFilename, altText, {
    model: 'flux-schnell',
    width: 1200,
    height: 630,
    ...options,
  })
}
