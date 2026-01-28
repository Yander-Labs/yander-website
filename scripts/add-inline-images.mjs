/**
 * Add inline images to blog post bodies
 * Inserts AI-generated images at strategic positions within the content
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

// Yander brand style
const YANDER_STYLE = 'flat 2D illustration, grainy film texture, sketchy hairy pen stroke outlines, rough textured edges, monochrome grayscale with subtle blue-gray tones, risograph print aesthetic, editorial illustration style like Notion, minimalist playful, conceptual metaphor, no 3D, no photorealistic, no text or letters in the image';

// Posts and their inline images to add
const postsWithInlineImages = [
  {
    _id: 'post-first-90-days-remote-onboarding',
    title: 'The First 90 Days',
    inlineImages: [
      {
        // Insert after the "Why Traditional Onboarding Fails" section (around index 12)
        afterH2Contains: 'Traditional Onboarding',
        concept: 'A confused person standing at a crossroads with multiple unclear directional signs, representing the disorientation of remote onboarding',
        alt: 'Remote onboarding confusion',
        caption: 'Figure 1: Without proper guidance, new hires feel lost in a sea of information'
      },
      {
        // Insert in "The First 90 Days Framework" section
        afterH2Contains: '90 Days Framework',
        concept: 'A timeline or roadmap showing progressive milestones from day 1 to day 90, with checkpoints and growth indicators',
        alt: 'Onboarding timeline visualization',
        caption: 'Figure 2: The structured 90-day framework creates clear milestones for success'
      }
    ]
  },
  {
    _id: 'post-spot-quiet-quitting-remote-teams-warning-signs',
    title: 'Quiet Quitting Warning Signs',
    inlineImages: [
      {
        afterH2Contains: 'Signal',
        concept: 'A grid of video call avatars where one person is noticeably dimmer or fading compared to others, representing disengagement in remote meetings',
        alt: 'Declining engagement in remote meetings',
        caption: 'Figure 1: Subtle changes in meeting behavior often signal deeper disengagement'
      },
      {
        afterH2Contains: 'Pattern',
        concept: 'A chart or graph showing a declining trend line with warning indicators, representing the gradual decrease in engagement metrics',
        alt: 'Engagement trend visualization',
        caption: 'Figure 2: Engagement patterns reveal problems before they become resignations'
      }
    ]
  },
  {
    _id: 'post-async-sync-communication-balance',
    title: 'Async vs Sync Communication',
    inlineImages: [
      {
        afterH2Contains: 'Async Works Best',
        concept: 'A person working peacefully in deep focus with chat notifications stacked neatly to the side, representing async communication benefits',
        alt: 'Async communication deep work',
        caption: 'Figure 1: Async communication protects focus time while maintaining collaboration'
      },
      {
        afterH2Contains: 'Sync Works Best',
        concept: 'A group of connected figures in a circle having real-time conversation with speech bubbles, representing synchronous collaboration',
        alt: 'Synchronous team collaboration',
        caption: 'Figure 2: Some conversations benefit from real-time interaction and immediate feedback'
      }
    ]
  },
  {
    _id: 'post-remote-manager-guide-preventing-burnout-without-micromanaging',
    title: 'Preventing Burnout Guide',
    inlineImages: [
      {
        afterH2Contains: 'Signs',
        concept: 'A thermometer or gauge showing warning levels from green to yellow to red, representing burnout risk indicators',
        alt: 'Burnout risk indicators',
        caption: 'Figure 1: Early warning signs appear long before burnout becomes critical'
      },
      {
        afterH2Contains: 'Framework',
        concept: 'A supportive hand or safety net beneath a small figure, representing protective management without surveillance',
        alt: 'Supportive management visualization',
        caption: 'Figure 2: Effective support creates safety without micromanagement'
      }
    ]
  }
];

function generateKey() {
  return Math.random().toString(36).slice(2, 14);
}

async function generateImage(concept) {
  const prompt = `${concept}. Centered composition, simple background. ${YANDER_STYLE}`;

  console.log(`  Generating: ${concept.substring(0, 50)}...`);

  const prediction = await replicate.predictions.create({
    model: 'google/nano-banana-pro',
    input: {
      prompt,
      width: 1200,
      height: 630,
      num_outputs: 1,
    },
  });

  let result = await replicate.predictions.get(prediction.id);
  while (result.status !== 'succeeded' && result.status !== 'failed') {
    process.stdout.write('.');
    await new Promise(resolve => setTimeout(resolve, 1000));
    result = await replicate.predictions.get(prediction.id);
  }
  console.log('');

  if (result.status === 'failed') {
    throw new Error(`Generation failed: ${result.error}`);
  }

  const imageUrl = Array.isArray(result.output) ? result.output[0] : result.output;
  const response = await fetch(imageUrl);
  return Buffer.from(await response.arrayBuffer());
}

async function uploadImage(buffer, alt) {
  const slug = alt.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 30);
  const filename = `inline-${slug}-${Date.now()}.png`;

  console.log(`  Uploading: ${filename}`);
  const asset = await sanityClient.assets.upload('image', buffer, {
    filename,
    contentType: 'image/png',
  });

  return {
    _type: 'image',
    _key: generateKey(),
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
    alt,
  };
}

function createImageBlock(imageRef, caption) {
  return {
    _type: 'image',
    _key: generateKey(),
    asset: imageRef.asset,
    alt: imageRef.alt,
    caption,
  };
}

function findInsertPosition(body, searchText) {
  // Find the h2 heading containing the search text
  for (let i = 0; i < body.length; i++) {
    const block = body[i];
    if (block.style === 'h2' && block.children?.[0]?.text?.includes(searchText)) {
      // Find the next h2 or end of document, insert before it
      for (let j = i + 1; j < body.length; j++) {
        if (body[j].style === 'h2') {
          return j; // Insert right before next h2
        }
      }
      return body.length; // Insert at end if no more h2s
    }
  }
  // Fallback: return middle of document
  return Math.floor(body.length / 2);
}

async function addInlineImagesToPost(postConfig) {
  console.log(`\n📝 ${postConfig.title}`);
  console.log('='.repeat(50));

  // Fetch the post body
  const post = await sanityClient.fetch(
    `*[_id == $id][0] { body }`,
    { id: postConfig._id }
  );

  if (!post?.body) {
    console.log('  ⚠️ No body found, skipping');
    return;
  }

  let body = [...post.body];
  let insertOffset = 0; // Track offset as we insert

  for (const imgConfig of postConfig.inlineImages) {
    try {
      // Generate the image
      const buffer = await generateImage(imgConfig.concept);

      // Upload to Sanity
      const imageRef = await uploadImage(buffer, imgConfig.alt);

      // Create the image block
      const imageBlock = createImageBlock(imageRef, imgConfig.caption);

      // Find position to insert
      let position = findInsertPosition(body, imgConfig.afterH2Contains);
      position += insertOffset;

      // Insert the image
      body.splice(position, 0, imageBlock);
      insertOffset++; // Account for the newly inserted block

      console.log(`  ✅ Added image at position ${position}`);
    } catch (error) {
      console.error(`  ❌ Failed: ${error.message}`);
    }
  }

  // Update the post with new body
  console.log('  Updating post...');
  await sanityClient
    .patch(postConfig._id)
    .set({ body })
    .commit();

  console.log('  ✅ Post updated with inline images!');
}

async function main() {
  if (!process.env.SANITY_TOKEN || !process.env.REPLICATE_API_TOKEN) {
    console.error('❌ Missing SANITY_TOKEN or REPLICATE_API_TOKEN');
    process.exit(1);
  }

  console.log('Adding inline images to 4 blog posts...');
  console.log('Each post will get 2 AI-generated inline images.\n');

  for (const postConfig of postsWithInlineImages) {
    await addInlineImagesToPost(postConfig);
  }

  console.log('\n✅ All posts updated with inline images!');
}

main().catch(console.error);
