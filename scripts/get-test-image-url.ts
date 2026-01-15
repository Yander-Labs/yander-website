import '../lib/env'
import { client } from '../lib/sanity'

async function getImageUrl() {
  const result = await client.fetch(`
    *[_type == "sanity.imageAsset" && originalFilename match "yander-flat*"] | order(_createdAt desc)[0] {
      _id,
      url,
      originalFilename,
      _createdAt
    }
  `)
  
  if (result) {
    console.log('Flat Illustration Test Image URL:')
    console.log(result.url)
  }
}

getImageUrl().catch(console.error)
