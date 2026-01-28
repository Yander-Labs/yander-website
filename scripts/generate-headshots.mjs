#!/usr/bin/env node

/**
 * Generate AI headshots for Hero section team members.
 * Saves images to public/avatars/ for use in the static mockup.
 *
 * Usage: REPLICATE_API_TOKEN=your_token node scripts/generate-headshots.mjs
 */

import Replicate from 'replicate'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUTPUT_DIR = path.join(__dirname, '../public/avatars')

// Team members to generate headshots for
const TEAM_MEMBERS = [
  { name: 'Sarah Chen', filename: 'sarah-chen.jpg', description: 'Asian woman, early 30s, designer aesthetic, creative professional' },
  { name: 'Marcus Johnson', filename: 'marcus-johnson.jpg', description: 'Black man, late 20s, software developer, friendly and approachable' },
  { name: 'Emily Rodriguez', filename: 'emily-rodriguez.jpg', description: 'Latina woman, mid 30s, project manager, professional and confident' },
  { name: 'Alex Kim', filename: 'alex-kim.jpg', description: 'Korean man, late 20s, marketing professional, energetic and positive' },
]

async function generateHeadshot(replicate, member) {
  console.log(`\nGenerating headshot for ${member.name}...`)

  const prompt = `Professional corporate headshot portrait of a ${member.description}. Clean white background, soft studio lighting, natural and genuine smile, business casual attire, high quality professional photography, sharp focus on face, subtle depth of field. No text, no watermarks.`

  console.log(`Prompt: ${prompt.substring(0, 80)}...`)

  const prediction = await replicate.predictions.create({
    model: 'google/nano-banana-pro',
    input: {
      prompt,
      width: 256,
      height: 256,
      num_outputs: 1,
    },
  })

  console.log(`Prediction created: ${prediction.id}`)

  // Poll for completion
  let result = await replicate.predictions.get(prediction.id)
  while (result.status !== 'succeeded' && result.status !== 'failed') {
    process.stdout.write('.')
    await new Promise(resolve => setTimeout(resolve, 1000))
    result = await replicate.predictions.get(prediction.id)
  }
  console.log('')

  if (result.status === 'failed') {
    throw new Error(`Failed to generate image for ${member.name}: ${result.error}`)
  }

  const imageUrl = Array.isArray(result.output) ? result.output[0] : result.output

  if (!imageUrl || typeof imageUrl !== 'string') {
    throw new Error(`No image URL returned for ${member.name}`)
  }

  // Download the image
  console.log(`Downloading image...`)
  const response = await fetch(imageUrl)
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.statusText}`)
  }

  const buffer = Buffer.from(await response.arrayBuffer())
  const outputPath = path.join(OUTPUT_DIR, member.filename)

  await writeFile(outputPath, buffer)
  console.log(`Saved: ${outputPath}`)

  return outputPath
}

async function main() {
  if (!process.env.REPLICATE_API_TOKEN) {
    console.error('Error: REPLICATE_API_TOKEN environment variable is required')
    console.error('Usage: REPLICATE_API_TOKEN=your_token node scripts/generate-headshots.mjs')
    process.exit(1)
  }

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  })

  // Ensure output directory exists
  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true })
    console.log(`Created directory: ${OUTPUT_DIR}`)
  }

  console.log('Generating AI headshots for Hero section team members...')
  console.log('This will take a few moments per image.\n')

  const results = []

  for (const member of TEAM_MEMBERS) {
    try {
      const path = await generateHeadshot(replicate, member)
      results.push({ member: member.name, status: 'success', path })
    } catch (error) {
      console.error(`Error generating headshot for ${member.name}:`, error.message)
      results.push({ member: member.name, status: 'failed', error: error.message })
    }
  }

  console.log('\n=== Summary ===')
  for (const result of results) {
    if (result.status === 'success') {
      console.log(`✓ ${result.member}: ${result.path}`)
    } else {
      console.log(`✗ ${result.member}: ${result.error}`)
    }
  }

  const successCount = results.filter(r => r.status === 'success').length
  console.log(`\nGenerated ${successCount}/${TEAM_MEMBERS.length} headshots`)

  if (successCount === TEAM_MEMBERS.length) {
    console.log('\nNext step: Update components/sections/Hero.tsx to use the generated images.')
  }
}

main().catch(console.error)
