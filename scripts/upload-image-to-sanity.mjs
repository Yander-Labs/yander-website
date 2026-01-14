import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import { basename } from 'path'

const client = createClient({
  projectId: 's3r1d2vt',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

/**
 * Upload an image to Sanity and return the asset reference
 * @param {string} filePath - Path to the image file
 * @param {string} [altText] - Optional alt text for the image
 * @returns {Promise<{_type: string, asset: {_type: string, _ref: string}, alt?: string}>}
 */
export async function uploadImage(filePath, altText) {
  const filename = basename(filePath)

  console.log(`Uploading ${filename} to Sanity...`)

  const asset = await client.assets.upload('image', createReadStream(filePath), {
    filename,
  })

  console.log(`Uploaded successfully! Asset ID: ${asset._id}`)

  const imageReference = {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
  }

  if (altText) {
    imageReference.alt = altText
  }

  return imageReference
}

/**
 * Update a blog post's main image
 * @param {string} postId - The Sanity document ID of the post
 * @param {string} imagePath - Path to the image file
 * @param {string} [altText] - Optional alt text
 */
export async function updatePostImage(postId, imagePath, altText) {
  const imageRef = await uploadImage(imagePath, altText)

  await client
    .patch(postId)
    .set({ mainImage: imageRef })
    .commit()

  console.log(`Updated post ${postId} with new image`)
}

// CLI usage
if (process.argv[2]) {
  const filePath = process.argv[2]
  const altText = process.argv[3]

  uploadImage(filePath, altText)
    .then(ref => {
      console.log('Image reference:', JSON.stringify(ref, null, 2))
      process.exit(0)
    })
    .catch(err => {
      console.error('Error:', err)
      process.exit(1)
    })
}
