/**
 * Add AI-generated images to posts that don't have them
 * Uses nano-banana-pro with Yander brand style
 */

import { createClient } from '@sanity/client';
import Replicate from 'replicate';

// Initialize clients
const sanityClient = createClient({
  projectId: 's3r1d2vt',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Posts to add images to
const postsToUpdate = [
  {
    _id: 'post-first-90-days-remote-onboarding',
    title: 'The First 90 Days: A Data-Driven Approach to Remote Onboarding That Prevents Early Turnover',
    concept: 'A welcoming path or journey from a door through stages, representing the onboarding journey of a new remote employee joining a team',
  },
  {
    _id: 'post-spot-quiet-quitting-remote-teams-warning-signs',
    title: 'How to Spot Quiet Quitting in Remote Teams: 5 Early Warning Signs',
    concept: 'A figure gradually fading or becoming transparent while sitting at a laptop, representing quiet disengagement in remote work',
  },
  {
    _id: 'post-async-sync-communication-balance',
    title: "Async vs. Sync: Finding Your Remote Team's Communication Sweet Spot",
    concept: 'A balance scale with chat bubbles on one side and a clock or video icon on the other, representing the balance between async and sync communication',
  },
  {
    _id: 'post-remote-manager-guide-preventing-burnout-without-micromanaging',
    title: "The Remote Manager's Guide to Preventing Burnout Without Micromanaging",
    concept: 'A protective umbrella or shield sheltering a small figure at a desk, representing manager protection without surveillance',
  },
];

// Yander brand style prompt
const YANDER_STYLE = 'flat 2D illustration, grainy film texture, sketchy hairy pen stroke outlines, rough textured edges, monochrome grayscale with subtle blue-gray tones, risograph print aesthetic, editorial illustration style like Notion, minimalist playful, conceptual metaphor, no 3D, no photorealistic, no text or letters in the image';

async function generateImage(concept, title) {
  const prompt = `${concept}. Wide angle composition, centered subject. Soft diffused studio lighting, subtle shadows. ${YANDER_STYLE}`;

  console.log(`\nGenerating image...`);
  console.log(`Prompt: ${prompt.substring(0, 100)}...`);

  // Create prediction
  const prediction = await replicate.predictions.create({
    model: 'google/nano-banana-pro',
    input: {
      prompt,
      width: 1200,
      height: 630,
      num_outputs: 1,
    },
  });

  console.log(`Prediction created: ${prediction.id}`);

  // Poll for completion
  let result = await replicate.predictions.get(prediction.id);
  while (result.status !== 'succeeded' && result.status !== 'failed') {
    process.stdout.write('.');
    await new Promise(resolve => setTimeout(resolve, 1000));
    result = await replicate.predictions.get(prediction.id);
  }
  console.log('');

  if (result.status === 'failed') {
    throw new Error(`Image generation failed: ${result.error}`);
  }

  // Get the image URL
  const imageUrl = Array.isArray(result.output) ? result.output[0] : result.output;

  if (!imageUrl || typeof imageUrl !== 'string') {
    throw new Error('No image URL returned from Replicate');
  }

  console.log(`Downloading image...`);
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to download: ${response.statusText}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

async function uploadToSanity(buffer, filename, altText) {
  console.log(`Uploading to Sanity as "${filename}"...`);

  const asset = await sanityClient.assets.upload('image', buffer, {
    filename,
    contentType: 'image/png',
  });

  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
    alt: altText,
  };
}

async function updatePost(postId, mainImage) {
  console.log(`Updating post ${postId}...`);

  await sanityClient
    .patch(postId)
    .set({ mainImage })
    .commit();

  console.log(`✅ Post updated!`);
}

async function main() {
  // Check for required tokens
  if (!process.env.SANITY_TOKEN) {
    console.error('❌ SANITY_TOKEN not set');
    process.exit(1);
  }
  if (!process.env.REPLICATE_API_TOKEN) {
    console.error('❌ REPLICATE_API_TOKEN not set');
    process.exit(1);
  }

  console.log('Adding images to 4 posts...\n');
  console.log('='.repeat(60));

  for (const post of postsToUpdate) {
    console.log(`\n📝 ${post.title.substring(0, 50)}...`);

    try {
      // Generate image
      const buffer = await generateImage(post.concept, post.title);

      // Create filename from title
      const slug = post.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .substring(0, 50);
      const filename = `blog-${slug}-${Date.now()}.png`;

      // Upload to Sanity
      const mainImage = await uploadToSanity(buffer, filename, post.title);

      // Update the post
      await updatePost(post._id, mainImage);

      console.log('='.repeat(60));
    } catch (error) {
      console.error(`❌ Failed: ${error.message}`);
      console.log('='.repeat(60));
    }
  }

  console.log('\n✅ All done!');
}

main().catch(console.error);
