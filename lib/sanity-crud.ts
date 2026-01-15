import { writeClient, requireWriteAccess } from './sanity-write'
import { sanityFetch } from './sanity'
import type {
  Post,
  PostInput,
  Author,
  AuthorInput,
  Category,
  CategoryInput,
  ImageReference,
  ImageBlock,
} from './types'

// =============================================================================
// Utility Functions
// =============================================================================

/**
 * Generate a URL-safe slug from text.
 */
export function generateSlug(text: string): { _type: 'slug'; current: string } {
  return {
    _type: 'slug',
    current: text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 96),
  }
}

/**
 * Generate a random key for array items.
 */
export function generateKey(): string {
  return Math.random().toString(36).substring(2, 9)
}

// =============================================================================
// Post Operations
// =============================================================================

/**
 * Create a new blog post.
 * Returns the created post with expanded references.
 */
export async function createPost(post: PostInput): Promise<Post> {
  requireWriteAccess()

  const doc = {
    ...post,
    _type: 'post',
    _id: post._id || `post-${post.slug.current}`,
  }

  const created = await writeClient.create(doc)

  // Fetch the created document with expanded references
  const expanded = await getPostById(created._id)
  if (!expanded) {
    throw new Error('Failed to fetch created post')
  }
  return expanded
}

/**
 * Update an existing blog post.
 * Only pass the fields you want to update.
 * Returns the updated post with expanded references.
 */
export async function updatePost(
  id: string,
  updates: Partial<Omit<PostInput, '_type' | '_id'>>
): Promise<Post> {
  requireWriteAccess()
  await writeClient.patch(id).set(updates).commit()

  // Fetch the updated document with expanded references
  const expanded = await getPostById(id)
  if (!expanded) {
    throw new Error('Failed to fetch updated post')
  }
  return expanded
}

/**
 * Delete a blog post by ID.
 */
export async function deletePost(id: string): Promise<void> {
  requireWriteAccess()
  await writeClient.delete(id)
}

/**
 * Get a single post by ID with full details.
 */
export async function getPostById(id: string): Promise<Post | null> {
  const query = `*[_type == "post" && _id == $id][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    mainImage,
    body,
    seo,
    "author": author->{_id, name, image, role, bio},
    "categories": categories[]->{_id, title, slug, color}
  }`
  return sanityFetch<Post | null>(query, { id })
}

/**
 * Get a post by slug.
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    mainImage,
    body,
    seo,
    "author": author->{_id, name, image, role, bio},
    "categories": categories[]->{_id, title, slug, color}
  }`
  return sanityFetch<Post | null>(query, { slug })
}

/**
 * List all posts (lightweight, for selection).
 */
export async function listPosts(): Promise<
  Array<{ _id: string; title: string; slug: { current: string }; publishedAt?: string }>
> {
  return sanityFetch(
    `*[_type == "post"] | order(publishedAt desc) { _id, title, slug, publishedAt }`
  )
}

// =============================================================================
// Author Operations
// =============================================================================

/**
 * Create a new author.
 * Returns the created author.
 */
export async function createAuthor(author: AuthorInput): Promise<Author & { _id: string }> {
  requireWriteAccess()

  const doc = {
    ...author,
    _type: 'author',
    _id: author._id || `author-${author.slug.current}`,
  }

  const created = await writeClient.create(doc)

  // Fetch the created document
  const expanded = await getAuthorById(created._id)
  if (!expanded) {
    throw new Error('Failed to fetch created author')
  }
  return { ...expanded, _id: created._id }
}

/**
 * Update an existing author.
 * Returns the updated author.
 */
export async function updateAuthor(
  id: string,
  updates: Partial<Omit<AuthorInput, '_type' | '_id'>>
): Promise<Author & { _id: string }> {
  requireWriteAccess()
  await writeClient.patch(id).set(updates).commit()

  // Fetch the updated document
  const expanded = await getAuthorById(id)
  if (!expanded) {
    throw new Error('Failed to fetch updated author')
  }
  return { ...expanded, _id: id }
}

/**
 * Delete an author by ID.
 * Throws an error if posts reference this author.
 */
export async function deleteAuthor(id: string): Promise<void> {
  requireWriteAccess()

  // Check for posts referencing this author
  const postsWithAuthor = await sanityFetch<{ _id: string }[]>(
    `*[_type == "post" && author._ref == $id]{_id}`,
    { id }
  )

  if (postsWithAuthor.length > 0) {
    throw new Error(
      `Cannot delete author: ${postsWithAuthor.length} post(s) reference this author. ` +
        `Reassign or delete those posts first.`
    )
  }

  await writeClient.delete(id)
}

/**
 * Get a single author by ID.
 */
export async function getAuthorById(id: string): Promise<Author | null> {
  return sanityFetch<Author | null>(
    `*[_type == "author" && _id == $id][0] { _id, name, slug, image, bio, role }`,
    { id }
  )
}

/**
 * List all authors.
 */
export async function listAuthors(): Promise<
  Array<Author & { _id: string }>
> {
  return sanityFetch(
    `*[_type == "author"] | order(name asc) { _id, name, slug, image, bio, role }`
  )
}

// =============================================================================
// Category Operations
// =============================================================================

/**
 * Create a new category.
 * Returns the created category.
 */
export async function createCategory(category: CategoryInput): Promise<Category & { _id: string }> {
  requireWriteAccess()

  const doc = {
    ...category,
    _type: 'category',
    _id: category._id || `category-${category.slug.current}`,
  }

  const created = await writeClient.create(doc)

  // Fetch the created document
  const expanded = await getCategoryById(created._id)
  if (!expanded) {
    throw new Error('Failed to fetch created category')
  }
  return { ...expanded, _id: created._id }
}

/**
 * Update an existing category.
 * Returns the updated category.
 */
export async function updateCategory(
  id: string,
  updates: Partial<Omit<CategoryInput, '_type' | '_id'>>
): Promise<Category & { _id: string }> {
  requireWriteAccess()
  await writeClient.patch(id).set(updates).commit()

  // Fetch the updated document
  const expanded = await getCategoryById(id)
  if (!expanded) {
    throw new Error('Failed to fetch updated category')
  }
  return { ...expanded, _id: id }
}

/**
 * Delete a category by ID.
 * Throws an error if posts use this category.
 */
export async function deleteCategory(id: string): Promise<void> {
  requireWriteAccess()

  // Check for posts using this category
  const postsWithCategory = await sanityFetch<{ _id: string }[]>(
    `*[_type == "post" && $id in categories[]._ref]{_id}`,
    { id }
  )

  if (postsWithCategory.length > 0) {
    throw new Error(
      `Cannot delete category: ${postsWithCategory.length} post(s) use this category. ` +
        `Remove the category from those posts first.`
    )
  }

  await writeClient.delete(id)
}

/**
 * Get a single category by ID.
 */
export async function getCategoryById(id: string): Promise<Category | null> {
  return sanityFetch<Category | null>(
    `*[_type == "category" && _id == $id][0] { _id, title, slug, description, color }`,
    { id }
  )
}

/**
 * List all categories.
 */
export async function listCategories(): Promise<
  Array<Category & { _id: string }>
> {
  return sanityFetch(
    `*[_type == "category"] | order(title asc) { _id, title, slug, description, color }`
  )
}

// =============================================================================
// Image Operations
// =============================================================================

/**
 * Upload an image to Sanity and return an image reference.
 *
 * @param file - Buffer or ReadableStream of the image data
 * @param filename - Filename for the asset
 * @param altText - Optional alt text for accessibility
 */
export async function uploadImage(
  file: Buffer | NodeJS.ReadableStream,
  filename: string,
  altText?: string
): Promise<ImageReference> {
  requireWriteAccess()

  const asset = await writeClient.assets.upload('image', file, { filename })

  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
    alt: altText,
  }
}

// =============================================================================
// Portable Text Helpers
// =============================================================================

/**
 * Create a simple text block for Portable Text.
 */
export function createTextBlock(
  text: string,
  style: 'normal' | 'h2' | 'h3' | 'h4' | 'blockquote' = 'normal'
): object {
  return {
    _type: 'block',
    _key: generateKey(),
    style,
    children: [
      {
        _type: 'span',
        _key: generateKey(),
        text,
        marks: [],
      },
    ],
    markDefs: [],
  }
}

/**
 * Create a bullet list block.
 */
export function createListBlock(items: string[], listType: 'bullet' | 'number' = 'bullet'): object[] {
  return items.map((text) => ({
    _type: 'block',
    _key: generateKey(),
    style: 'normal',
    listItem: listType,
    level: 1,
    children: [
      {
        _type: 'span',
        _key: generateKey(),
        text,
        marks: [],
      },
    ],
    markDefs: [],
  }))
}

/**
 * Estimate read time based on word count.
 * Assumes ~200 words per minute reading speed.
 */
export function estimateReadTime(body: object[]): number {
  let wordCount = 0

  for (const block of body) {
    if ((block as { _type: string })._type === 'block') {
      const children = (block as { children?: Array<{ text?: string }> }).children || []
      for (const child of children) {
        if (child.text) {
          wordCount += child.text.split(/\s+/).length
        }
      }
    }
  }

  return Math.max(1, Math.ceil(wordCount / 200))
}

// =============================================================================
// Inline Image Helpers (for body content)
// =============================================================================

/**
 * Create an inline image block for Portable Text body content.
 *
 * @param imageRef - Image reference from uploadImage() or AI generation
 * @param caption - Optional caption displayed below the image
 */
export function createImageBlock(
  imageRef: ImageReference,
  caption?: string
): ImageBlock {
  return {
    _type: 'image',
    _key: generateKey(),
    asset: imageRef.asset,
    alt: imageRef.alt,
    caption,
  }
}

/**
 * Generate an AI image and return as Portable Text image block.
 * Uses nano-banana-pro by default for best quality.
 *
 * @param prompt - Text prompt for image generation
 * @param alt - Alt text for accessibility
 * @param caption - Optional caption displayed below the image
 * @param options - Generation options (model, dimensions)
 */
export async function generateInlineImage(
  prompt: string,
  alt: string,
  caption?: string,
  options?: import('./replicate').GenerateImageOptions
): Promise<ImageBlock> {
  // Dynamic import to avoid circular dependencies
  const { generateAndUploadImage } = await import('./replicate')

  const slug = alt.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 30)
  const filename = `inline-${slug}-${Date.now()}.jpg`

  const imageRef = await generateAndUploadImage(prompt, filename, alt, options)
  return createImageBlock(imageRef, caption)
}

/**
 * Take a screenshot and return as Portable Text image block.
 *
 * @param url - URL to screenshot
 * @param alt - Alt text for accessibility
 * @param caption - Optional caption displayed below the image
 * @param options - Screenshot options (viewport, selector, etc.)
 */
export async function screenshotInlineImage(
  url: string,
  alt: string,
  caption?: string,
  options?: import('./screenshot').ScreenshotOptions
): Promise<ImageBlock> {
  // Dynamic import to avoid circular dependencies
  const { screenshotAndUpload } = await import('./screenshot')

  const slug = alt.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 30)
  const filename = `screenshot-${slug}-${Date.now()}.png`

  const imageRef = await screenshotAndUpload(url, filename, alt, options)
  return createImageBlock(imageRef, caption)
}

/**
 * Insert an inline image into an existing post's body at a specific position.
 *
 * @param postId - ID of the post to update
 * @param imageBlock - Image block to insert
 * @param position - Position in body array (default: append at end)
 */
export async function insertInlineImage(
  postId: string,
  imageBlock: ImageBlock,
  position?: number
): Promise<Post> {
  const post = await getPostById(postId)
  if (!post) {
    throw new Error(`Post not found: ${postId}`)
  }

  const body = post.body || []
  const insertAt = position ?? body.length

  // Insert the image block at the specified position
  body.splice(insertAt, 0, imageBlock as never)

  return updatePost(postId, { body })
}
