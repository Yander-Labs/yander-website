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
// Configuration
// =============================================================================

const CONFIG = {
  /** Maximum retries for transient failures */
  maxRetries: 3,
  /** Base delay in ms for exponential backoff */
  retryBaseDelay: 1000,
  /** Maximum image file size in bytes (5MB) */
  maxImageSize: 5 * 1024 * 1024,
  /** Allowed image MIME types */
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  /** Cache TTL in milliseconds (1 hour) */
  cacheTTL: 60 * 60 * 1000,
}

// =============================================================================
// Logging Infrastructure
// =============================================================================

export type LogLevel = 'info' | 'warn' | 'error' | 'debug'

export interface LogEntry {
  timestamp: string
  level: LogLevel
  operation: string
  documentType?: string
  documentId?: string
  duration?: number
  success: boolean
  error?: string
  details?: Record<string, unknown>
}

const logs: LogEntry[] = []

/**
 * Log an operation for auditing and debugging.
 */
function log(entry: Omit<LogEntry, 'timestamp'>): void {
  const fullEntry: LogEntry = {
    ...entry,
    timestamp: new Date().toISOString(),
  }
  logs.push(fullEntry)

  // Keep only last 1000 entries in memory
  if (logs.length > 1000) {
    logs.shift()
  }

  // Output to console in development or when DEBUG is set
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG) {
    const prefix = entry.success ? '✓' : '✗'
    const msg = `[Sanity ${entry.level.toUpperCase()}] ${prefix} ${entry.operation}`
    if (entry.level === 'error') {
      console.error(msg, entry.error, entry.details)
    } else if (entry.level === 'warn') {
      console.warn(msg, entry.details)
    } else {
      console.log(msg, entry.details)
    }
  }
}

/**
 * Get recent operation logs.
 */
export function getOperationLogs(limit = 100): LogEntry[] {
  return logs.slice(-limit)
}

/**
 * Clear operation logs.
 */
export function clearOperationLogs(): void {
  logs.length = 0
}

// =============================================================================
// Retry Logic with Exponential Backoff
// =============================================================================

interface RetryOptions {
  maxRetries?: number
  baseDelay?: number
  operation?: string
}

/**
 * Execute an async function with retry logic and exponential backoff.
 * Only retries on transient errors (network, rate limits).
 */
async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const maxRetries = options.maxRetries ?? CONFIG.maxRetries
  const baseDelay = options.baseDelay ?? CONFIG.retryBaseDelay
  const operation = options.operation ?? 'Unknown operation'

  let lastError: Error | null = null

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      const errorMessage = lastError.message.toLowerCase()

      // Don't retry on validation errors or not-found errors
      const isTransient =
        errorMessage.includes('network') ||
        errorMessage.includes('timeout') ||
        errorMessage.includes('rate limit') ||
        errorMessage.includes('503') ||
        errorMessage.includes('502') ||
        errorMessage.includes('429')

      if (!isTransient || attempt === maxRetries) {
        throw lastError
      }

      const delay = baseDelay * Math.pow(2, attempt)
      log({
        level: 'warn',
        operation,
        success: false,
        error: `Attempt ${attempt + 1} failed, retrying in ${delay}ms`,
        details: { attempt: attempt + 1, maxRetries, delay },
      })

      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  throw lastError
}

// =============================================================================
// Validation Layer
// =============================================================================

export interface ValidationError {
  field: string
  message: string
}

export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
}

/**
 * Validate a post input before creating/updating.
 */
export function validatePostInput(
  input: Partial<PostInput>,
  isCreate = true
): ValidationResult {
  const errors: ValidationError[] = []

  if (isCreate) {
    if (!input.title || input.title.trim().length === 0) {
      errors.push({ field: 'title', message: 'Title is required' })
    }

    if (!input.slug?.current) {
      errors.push({ field: 'slug', message: 'Slug is required' })
    }
  }

  if (input.title && input.title.length > 200) {
    errors.push({ field: 'title', message: 'Title must be 200 characters or less' })
  }

  if (input.slug?.current && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug.current)) {
    errors.push({
      field: 'slug',
      message: 'Slug must be lowercase alphanumeric with hyphens only'
    })
  }

  if (input.excerpt && input.excerpt.length > 300) {
    errors.push({ field: 'excerpt', message: 'Excerpt must be 300 characters or less' })
  }

  if (input.seo?.metaTitle && input.seo.metaTitle.length > 70) {
    errors.push({ field: 'seo.metaTitle', message: 'Meta title must be 70 characters or less' })
  }

  if (input.seo?.metaDescription && input.seo.metaDescription.length > 160) {
    errors.push({
      field: 'seo.metaDescription',
      message: 'Meta description must be 160 characters or less'
    })
  }

  if (input.seo?.canonicalUrl && !isValidUrl(input.seo.canonicalUrl)) {
    errors.push({ field: 'seo.canonicalUrl', message: 'Invalid canonical URL format' })
  }

  if (input.readTime !== undefined && (input.readTime < 1 || input.readTime > 120)) {
    errors.push({ field: 'readTime', message: 'Read time must be between 1 and 120 minutes' })
  }

  return { valid: errors.length === 0, errors }
}

/**
 * Validate an author input before creating/updating.
 */
export function validateAuthorInput(
  input: Partial<AuthorInput>,
  isCreate = true
): ValidationResult {
  const errors: ValidationError[] = []

  if (isCreate) {
    if (!input.name || input.name.trim().length === 0) {
      errors.push({ field: 'name', message: 'Name is required' })
    }

    if (!input.slug?.current) {
      errors.push({ field: 'slug', message: 'Slug is required' })
    }
  }

  if (input.name && input.name.length > 100) {
    errors.push({ field: 'name', message: 'Name must be 100 characters or less' })
  }

  if (input.slug?.current && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug.current)) {
    errors.push({
      field: 'slug',
      message: 'Slug must be lowercase alphanumeric with hyphens only'
    })
  }

  if (input.bio && input.bio.length > 1000) {
    errors.push({ field: 'bio', message: 'Bio must be 1000 characters or less' })
  }

  if (input.role && input.role.length > 100) {
    errors.push({ field: 'role', message: 'Role must be 100 characters or less' })
  }

  return { valid: errors.length === 0, errors }
}

/**
 * Validate a category input before creating/updating.
 */
export function validateCategoryInput(
  input: Partial<CategoryInput>,
  isCreate = true
): ValidationResult {
  const errors: ValidationError[] = []

  if (isCreate) {
    if (!input.title || input.title.trim().length === 0) {
      errors.push({ field: 'title', message: 'Title is required' })
    }

    if (!input.slug?.current) {
      errors.push({ field: 'slug', message: 'Slug is required' })
    }
  }

  if (input.title && input.title.length > 50) {
    errors.push({ field: 'title', message: 'Title must be 50 characters or less' })
  }

  if (input.slug?.current && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug.current)) {
    errors.push({
      field: 'slug',
      message: 'Slug must be lowercase alphanumeric with hyphens only'
    })
  }

  if (input.description && input.description.length > 200) {
    errors.push({ field: 'description', message: 'Description must be 200 characters or less' })
  }

  // Validate color is a valid Tailwind color name
  const validColors = [
    'blue', 'emerald', 'purple', 'amber', 'rose', 'cyan', 'orange',
    'red', 'green', 'yellow', 'indigo', 'pink', 'teal', 'gray'
  ]
  if (input.color && !validColors.includes(input.color)) {
    errors.push({
      field: 'color',
      message: `Color must be one of: ${validColors.join(', ')}`
    })
  }

  return { valid: errors.length === 0, errors }
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// =============================================================================
// Slug Uniqueness Check
// =============================================================================

/**
 * Check if a slug already exists for a given document type.
 */
export async function slugExists(
  type: 'post' | 'author' | 'category',
  slug: string,
  excludeId?: string
): Promise<boolean> {
  const excludeClause = excludeId ? `&& _id != $excludeId` : ''
  const count = await sanityFetch<number>(
    `count(*[_type == $type && slug.current == $slug ${excludeClause}])`,
    { type, slug, excludeId }
  )
  return count > 0
}

/**
 * Check multiple slugs at once for a given document type.
 * Returns a Set of slugs that already exist.
 * Much more efficient than calling slugExists() in a loop.
 */
export async function findExistingSlugs(
  type: 'post' | 'author' | 'category',
  slugs: string[]
): Promise<Set<string>> {
  if (slugs.length === 0) return new Set()

  const existing = await sanityFetch<string[]>(
    `*[_type == $type && slug.current in $slugs][].slug.current`,
    { type, slugs }
  )
  return new Set(existing)
}

// =============================================================================
// Caching Layer
// =============================================================================

interface CacheEntry<T> {
  data: T
  timestamp: number
}

const cache = new Map<string, CacheEntry<unknown>>()

/**
 * Get cached data or fetch fresh.
 */
async function getCached<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl = CONFIG.cacheTTL
): Promise<T> {
  const cached = cache.get(key) as CacheEntry<T> | undefined

  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.data
  }

  const data = await fetcher()
  cache.set(key, { data, timestamp: Date.now() })
  return data
}

/**
 * Invalidate cache entries by prefix.
 */
export function invalidateCache(prefix?: string): void {
  if (!prefix) {
    cache.clear()
    return
  }

  for (const key of cache.keys()) {
    if (key.startsWith(prefix)) {
      cache.delete(key)
    }
  }
}

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

/**
 * Generate a unique document ID.
 */
export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
}

// =============================================================================
// Post Operations
// =============================================================================

/**
 * Create a new blog post with validation and slug uniqueness check.
 * Returns the created post with expanded references.
 */
export async function createPost(post: PostInput): Promise<Post> {
  requireWriteAccess()
  const startTime = Date.now()

  // Validate input
  const validation = validatePostInput(post, true)
  if (!validation.valid) {
    const errorMsg = validation.errors.map(e => `${e.field}: ${e.message}`).join('; ')
    log({
      level: 'error',
      operation: 'createPost',
      documentType: 'post',
      success: false,
      error: `Validation failed: ${errorMsg}`,
      details: { errors: validation.errors },
    })
    throw new Error(`Validation failed: ${errorMsg}`)
  }

  // Check slug uniqueness
  if (await slugExists('post', post.slug.current)) {
    log({
      level: 'error',
      operation: 'createPost',
      documentType: 'post',
      success: false,
      error: `Slug already exists: ${post.slug.current}`,
    })
    throw new Error(`A post with slug "${post.slug.current}" already exists`)
  }

  const docId = post._id || `post-${post.slug.current}`
  const doc = {
    ...post,
    _type: 'post',
    _id: docId,
  }

  const created = await withRetry(
    () => writeClient.create(doc),
    { operation: 'createPost' }
  )

  // Fetch the created document with expanded references
  const expanded = await getPostById(created._id)
  if (!expanded) {
    throw new Error(`Failed to fetch created post: ${created._id}`)
  }

  log({
    level: 'info',
    operation: 'createPost',
    documentType: 'post',
    documentId: created._id,
    duration: Date.now() - startTime,
    success: true,
    details: { title: post.title, slug: post.slug.current },
  })

  // Invalidate posts cache
  invalidateCache('posts:')

  return expanded
}

/**
 * Update an existing blog post with validation.
 * Only pass the fields you want to update.
 * Returns the updated post with expanded references.
 */
export async function updatePost(
  id: string,
  updates: Partial<Omit<PostInput, '_type' | '_id'>>
): Promise<Post> {
  requireWriteAccess()
  const startTime = Date.now()

  // Validate input (partial validation for updates)
  const validation = validatePostInput(updates, false)
  if (!validation.valid) {
    const errorMsg = validation.errors.map(e => `${e.field}: ${e.message}`).join('; ')
    log({
      level: 'error',
      operation: 'updatePost',
      documentType: 'post',
      documentId: id,
      success: false,
      error: `Validation failed: ${errorMsg}`,
      details: { errors: validation.errors },
    })
    throw new Error(`Validation failed: ${errorMsg}`)
  }

  // If slug is being updated, check uniqueness
  if (updates.slug?.current) {
    if (await slugExists('post', updates.slug.current, id)) {
      log({
        level: 'error',
        operation: 'updatePost',
        documentType: 'post',
        documentId: id,
        success: false,
        error: `Slug already exists: ${updates.slug.current}`,
      })
      throw new Error(`A post with slug "${updates.slug.current}" already exists`)
    }
  }

  await withRetry(
    () => writeClient.patch(id).set(updates).commit(),
    { operation: 'updatePost' }
  )

  // Fetch the updated document with expanded references
  const expanded = await getPostById(id)
  if (!expanded) {
    throw new Error(`Failed to fetch updated post: ${id}`)
  }

  log({
    level: 'info',
    operation: 'updatePost',
    documentType: 'post',
    documentId: id,
    duration: Date.now() - startTime,
    success: true,
    details: { updatedFields: Object.keys(updates) },
  })

  // Invalidate caches
  invalidateCache('posts:')
  invalidateCache(`post:${id}`)

  return expanded
}

/**
 * Delete a blog post by ID.
 */
export async function deletePost(id: string): Promise<void> {
  requireWriteAccess()
  const startTime = Date.now()

  await withRetry(
    () => writeClient.delete(id),
    { operation: 'deletePost' }
  )

  log({
    level: 'info',
    operation: 'deletePost',
    documentType: 'post',
    documentId: id,
    duration: Date.now() - startTime,
    success: true,
  })

  // Invalidate caches
  invalidateCache('posts:')
  invalidateCache(`post:${id}`)
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

/**
 * Count total posts.
 */
export async function countPosts(): Promise<number> {
  return sanityFetch<number>(`count(*[_type == "post"])`)
}

/**
 * Get multiple posts by IDs in a single query.
 * Much more efficient than calling getPostById() in a loop.
 */
export async function getPostsByIds(ids: string[]): Promise<Post[]> {
  if (ids.length === 0) return []

  const query = `*[_type == "post" && _id in $ids] {
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
  return sanityFetch<Post[]>(query, { ids })
}

// =============================================================================
// Author Operations
// =============================================================================

/**
 * Create a new author with validation and slug uniqueness check.
 * Returns the created author.
 */
export async function createAuthor(author: AuthorInput): Promise<Author & { _id: string }> {
  requireWriteAccess()
  const startTime = Date.now()

  // Validate input
  const validation = validateAuthorInput(author, true)
  if (!validation.valid) {
    const errorMsg = validation.errors.map(e => `${e.field}: ${e.message}`).join('; ')
    log({
      level: 'error',
      operation: 'createAuthor',
      documentType: 'author',
      success: false,
      error: `Validation failed: ${errorMsg}`,
      details: { errors: validation.errors },
    })
    throw new Error(`Validation failed: ${errorMsg}`)
  }

  // Check slug uniqueness
  if (await slugExists('author', author.slug.current)) {
    log({
      level: 'error',
      operation: 'createAuthor',
      documentType: 'author',
      success: false,
      error: `Slug already exists: ${author.slug.current}`,
    })
    throw new Error(`An author with slug "${author.slug.current}" already exists`)
  }

  const docId = author._id || `author-${author.slug.current}`
  const doc = {
    ...author,
    _type: 'author',
    _id: docId,
  }

  const created = await withRetry(
    () => writeClient.create(doc),
    { operation: 'createAuthor' }
  )

  // Fetch the created document
  const expanded = await getAuthorById(created._id)
  if (!expanded) {
    throw new Error(`Failed to fetch created author: ${created._id}`)
  }

  log({
    level: 'info',
    operation: 'createAuthor',
    documentType: 'author',
    documentId: created._id,
    duration: Date.now() - startTime,
    success: true,
    details: { name: author.name, slug: author.slug.current },
  })

  // Invalidate authors cache
  invalidateCache('authors:')

  return { ...expanded, _id: created._id }
}

/**
 * Update an existing author with validation.
 * Returns the updated author.
 */
export async function updateAuthor(
  id: string,
  updates: Partial<Omit<AuthorInput, '_type' | '_id'>>
): Promise<Author & { _id: string }> {
  requireWriteAccess()
  const startTime = Date.now()

  // Validate input
  const validation = validateAuthorInput(updates, false)
  if (!validation.valid) {
    const errorMsg = validation.errors.map(e => `${e.field}: ${e.message}`).join('; ')
    log({
      level: 'error',
      operation: 'updateAuthor',
      documentType: 'author',
      documentId: id,
      success: false,
      error: `Validation failed: ${errorMsg}`,
      details: { errors: validation.errors },
    })
    throw new Error(`Validation failed: ${errorMsg}`)
  }

  // If slug is being updated, check uniqueness
  if (updates.slug?.current) {
    if (await slugExists('author', updates.slug.current, id)) {
      log({
        level: 'error',
        operation: 'updateAuthor',
        documentType: 'author',
        documentId: id,
        success: false,
        error: `Slug already exists: ${updates.slug.current}`,
      })
      throw new Error(`An author with slug "${updates.slug.current}" already exists`)
    }
  }

  await withRetry(
    () => writeClient.patch(id).set(updates).commit(),
    { operation: 'updateAuthor' }
  )

  // Fetch the updated document
  const expanded = await getAuthorById(id)
  if (!expanded) {
    throw new Error(`Failed to fetch updated author: ${id}`)
  }

  log({
    level: 'info',
    operation: 'updateAuthor',
    documentType: 'author',
    documentId: id,
    duration: Date.now() - startTime,
    success: true,
    details: { updatedFields: Object.keys(updates) },
  })

  // Invalidate caches
  invalidateCache('authors:')
  invalidateCache(`author:${id}`)

  return { ...expanded, _id: id }
}

/**
 * Delete an author by ID.
 * Throws an error if posts reference this author.
 * Uses count() for efficient reference checking.
 */
export async function deleteAuthor(id: string): Promise<void> {
  requireWriteAccess()
  const startTime = Date.now()

  // Check for posts referencing this author using count() for efficiency
  const postCount = await sanityFetch<number>(
    `count(*[_type == "post" && author._ref == $id])`,
    { id }
  )

  if (postCount > 0) {
    log({
      level: 'error',
      operation: 'deleteAuthor',
      documentType: 'author',
      documentId: id,
      success: false,
      error: `Cannot delete: ${postCount} post(s) reference this author`,
    })
    throw new Error(
      `Cannot delete author: ${postCount} post(s) reference this author. ` +
        `Reassign or delete those posts first.`
    )
  }

  await withRetry(
    () => writeClient.delete(id),
    { operation: 'deleteAuthor' }
  )

  log({
    level: 'info',
    operation: 'deleteAuthor',
    documentType: 'author',
    documentId: id,
    duration: Date.now() - startTime,
    success: true,
  })

  // Invalidate caches
  invalidateCache('authors:')
  invalidateCache(`author:${id}`)
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
 * List all authors (cached).
 */
export async function listAuthors(): Promise<Array<Author & { _id: string }>> {
  return getCached('authors:list', () =>
    sanityFetch(
      `*[_type == "author"] | order(name asc) { _id, name, slug, image, bio, role }`
    )
  )
}

/**
 * Count total authors.
 */
export async function countAuthors(): Promise<number> {
  return sanityFetch<number>(`count(*[_type == "author"])`)
}

/**
 * Get multiple authors by IDs in a single query.
 */
export async function getAuthorsByIds(ids: string[]): Promise<Array<Author & { _id: string }>> {
  if (ids.length === 0) return []

  return sanityFetch(
    `*[_type == "author" && _id in $ids] { _id, name, slug, image, bio, role }`,
    { ids }
  )
}

// =============================================================================
// Category Operations
// =============================================================================

/**
 * Create a new category with validation and slug uniqueness check.
 * Returns the created category.
 */
export async function createCategory(category: CategoryInput): Promise<Category & { _id: string }> {
  requireWriteAccess()
  const startTime = Date.now()

  // Validate input
  const validation = validateCategoryInput(category, true)
  if (!validation.valid) {
    const errorMsg = validation.errors.map(e => `${e.field}: ${e.message}`).join('; ')
    log({
      level: 'error',
      operation: 'createCategory',
      documentType: 'category',
      success: false,
      error: `Validation failed: ${errorMsg}`,
      details: { errors: validation.errors },
    })
    throw new Error(`Validation failed: ${errorMsg}`)
  }

  // Check slug uniqueness
  if (await slugExists('category', category.slug.current)) {
    log({
      level: 'error',
      operation: 'createCategory',
      documentType: 'category',
      success: false,
      error: `Slug already exists: ${category.slug.current}`,
    })
    throw new Error(`A category with slug "${category.slug.current}" already exists`)
  }

  const docId = category._id || `category-${category.slug.current}`
  const doc = {
    ...category,
    _type: 'category',
    _id: docId,
  }

  const created = await withRetry(
    () => writeClient.create(doc),
    { operation: 'createCategory' }
  )

  // Fetch the created document
  const expanded = await getCategoryById(created._id)
  if (!expanded) {
    throw new Error(`Failed to fetch created category: ${created._id}`)
  }

  log({
    level: 'info',
    operation: 'createCategory',
    documentType: 'category',
    documentId: created._id,
    duration: Date.now() - startTime,
    success: true,
    details: { title: category.title, slug: category.slug.current },
  })

  // Invalidate categories cache
  invalidateCache('categories:')

  return { ...expanded, _id: created._id }
}

/**
 * Update an existing category with validation.
 * Returns the updated category.
 */
export async function updateCategory(
  id: string,
  updates: Partial<Omit<CategoryInput, '_type' | '_id'>>
): Promise<Category & { _id: string }> {
  requireWriteAccess()
  const startTime = Date.now()

  // Validate input
  const validation = validateCategoryInput(updates, false)
  if (!validation.valid) {
    const errorMsg = validation.errors.map(e => `${e.field}: ${e.message}`).join('; ')
    log({
      level: 'error',
      operation: 'updateCategory',
      documentType: 'category',
      documentId: id,
      success: false,
      error: `Validation failed: ${errorMsg}`,
      details: { errors: validation.errors },
    })
    throw new Error(`Validation failed: ${errorMsg}`)
  }

  // If slug is being updated, check uniqueness
  if (updates.slug?.current) {
    if (await slugExists('category', updates.slug.current, id)) {
      log({
        level: 'error',
        operation: 'updateCategory',
        documentType: 'category',
        documentId: id,
        success: false,
        error: `Slug already exists: ${updates.slug.current}`,
      })
      throw new Error(`A category with slug "${updates.slug.current}" already exists`)
    }
  }

  await withRetry(
    () => writeClient.patch(id).set(updates).commit(),
    { operation: 'updateCategory' }
  )

  // Fetch the updated document
  const expanded = await getCategoryById(id)
  if (!expanded) {
    throw new Error(`Failed to fetch updated category: ${id}`)
  }

  log({
    level: 'info',
    operation: 'updateCategory',
    documentType: 'category',
    documentId: id,
    duration: Date.now() - startTime,
    success: true,
    details: { updatedFields: Object.keys(updates) },
  })

  // Invalidate caches
  invalidateCache('categories:')
  invalidateCache(`category:${id}`)

  return { ...expanded, _id: id }
}

/**
 * Delete a category by ID.
 * Throws an error if posts use this category.
 * Uses count() for efficient reference checking.
 */
export async function deleteCategory(id: string): Promise<void> {
  requireWriteAccess()
  const startTime = Date.now()

  // Check for posts using this category using count() for efficiency
  const postCount = await sanityFetch<number>(
    `count(*[_type == "post" && $id in categories[]._ref])`,
    { id }
  )

  if (postCount > 0) {
    log({
      level: 'error',
      operation: 'deleteCategory',
      documentType: 'category',
      documentId: id,
      success: false,
      error: `Cannot delete: ${postCount} post(s) use this category`,
    })
    throw new Error(
      `Cannot delete category: ${postCount} post(s) use this category. ` +
        `Remove the category from those posts first.`
    )
  }

  await withRetry(
    () => writeClient.delete(id),
    { operation: 'deleteCategory' }
  )

  log({
    level: 'info',
    operation: 'deleteCategory',
    documentType: 'category',
    documentId: id,
    duration: Date.now() - startTime,
    success: true,
  })

  // Invalidate caches
  invalidateCache('categories:')
  invalidateCache(`category:${id}`)
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
 * List all categories (cached).
 */
export async function listCategories(): Promise<Array<Category & { _id: string }>> {
  return getCached('categories:list', () =>
    sanityFetch(
      `*[_type == "category"] | order(title asc) { _id, title, slug, description, color }`
    )
  )
}

/**
 * Count total categories.
 */
export async function countCategories(): Promise<number> {
  return sanityFetch<number>(`count(*[_type == "category"])`)
}

/**
 * Get multiple categories by IDs in a single query.
 */
export async function getCategoriesByIds(ids: string[]): Promise<Array<Category & { _id: string }>> {
  if (ids.length === 0) return []

  return sanityFetch(
    `*[_type == "category" && _id in $ids] { _id, title, slug, description, color }`,
    { ids }
  )
}

// =============================================================================
// Batch Operations
// =============================================================================

export interface BatchResult<T> {
  succeeded: T[]
  failed: Array<{ input: unknown; error: string }>
}

/**
 * Create multiple posts in a single transaction.
 * Returns succeeded and failed items separately.
 *
 * Optimized: Uses batch slug check (1 query) and batch post fetch (1 query)
 * instead of N individual queries.
 */
export async function createPostsBatch(posts: PostInput[]): Promise<BatchResult<Post>> {
  requireWriteAccess()
  const startTime = Date.now()

  const failed: Array<{ input: unknown; error: string }> = []

  // Step 1: Validate all posts (synchronous, no API calls)
  const validatedPosts: Array<{ post: PostInput; docId: string }> = []

  for (const post of posts) {
    const validation = validatePostInput(post, true)
    if (!validation.valid) {
      const errorMsg = validation.errors.map(e => `${e.field}: ${e.message}`).join('; ')
      failed.push({ input: post, error: `Validation failed: ${errorMsg}` })
      continue
    }

    const docId = post._id || `post-${post.slug.current}`
    validatedPosts.push({ post, docId })
  }

  if (validatedPosts.length === 0) {
    log({
      level: 'warn',
      operation: 'createPostsBatch',
      documentType: 'post',
      success: false,
      error: 'No valid posts to create',
      details: { total: posts.length, failed: failed.length },
    })
    return { succeeded: [], failed }
  }

  // Step 2: Check all slugs at once (1 API call instead of N)
  const slugsToCheck = validatedPosts.map(p => p.post.slug.current)
  const existingSlugs = await findExistingSlugs('post', slugsToCheck)

  // Filter out posts with existing slugs
  const validPosts: Array<{ post: PostInput; docId: string }> = []
  for (const item of validatedPosts) {
    if (existingSlugs.has(item.post.slug.current)) {
      failed.push({ input: item.post, error: `Slug already exists: ${item.post.slug.current}` })
    } else {
      validPosts.push(item)
    }
  }

  if (validPosts.length === 0) {
    log({
      level: 'warn',
      operation: 'createPostsBatch',
      documentType: 'post',
      success: false,
      error: 'All slugs already exist',
      details: { total: posts.length, failed: failed.length },
    })
    return { succeeded: [], failed }
  }

  // Step 3: Create all valid posts in a transaction (1 API call)
  const transaction = writeClient.transaction()

  for (const { post, docId } of validPosts) {
    transaction.create({
      ...post,
      _type: 'post',
      _id: docId,
    })
  }

  try {
    await withRetry(
      () => transaction.commit(),
      { operation: 'createPostsBatch' }
    )

    // Step 4: Fetch all created posts at once (1 API call instead of N)
    const createdIds = validPosts.map(p => p.docId)
    const succeeded = await getPostsByIds(createdIds)

    log({
      level: 'info',
      operation: 'createPostsBatch',
      documentType: 'post',
      duration: Date.now() - startTime,
      success: true,
      details: { total: posts.length, succeeded: succeeded.length, failed: failed.length },
    })

    // Invalidate posts cache
    invalidateCache('posts:')

    return { succeeded, failed }
  } catch (error) {
    // Transaction failed - all posts in this batch failed
    for (const { post } of validPosts) {
      failed.push({ input: post, error: (error as Error).message })
    }

    log({
      level: 'error',
      operation: 'createPostsBatch',
      documentType: 'post',
      duration: Date.now() - startTime,
      success: false,
      error: (error as Error).message,
      details: { total: posts.length, failed: failed.length },
    })

    return { succeeded: [], failed }
  }
}

/**
 * Create multiple authors in a single transaction.
 * Optimized: Uses batch slug check and batch fetch.
 */
export async function createAuthorsBatch(authors: AuthorInput[]): Promise<BatchResult<Author & { _id: string }>> {
  requireWriteAccess()
  const startTime = Date.now()

  const failed: Array<{ input: unknown; error: string }> = []

  // Step 1: Validate all authors (no API calls)
  const validatedAuthors: Array<{ author: AuthorInput; docId: string }> = []

  for (const author of authors) {
    const validation = validateAuthorInput(author, true)
    if (!validation.valid) {
      const errorMsg = validation.errors.map(e => `${e.field}: ${e.message}`).join('; ')
      failed.push({ input: author, error: `Validation failed: ${errorMsg}` })
      continue
    }

    const docId = author._id || `author-${author.slug.current}`
    validatedAuthors.push({ author, docId })
  }

  if (validatedAuthors.length === 0) {
    return { succeeded: [], failed }
  }

  // Step 2: Check all slugs at once (1 API call)
  const slugsToCheck = validatedAuthors.map(a => a.author.slug.current)
  const existingSlugs = await findExistingSlugs('author', slugsToCheck)

  const validAuthors: Array<{ author: AuthorInput; docId: string }> = []
  for (const item of validatedAuthors) {
    if (existingSlugs.has(item.author.slug.current)) {
      failed.push({ input: item.author, error: `Slug already exists: ${item.author.slug.current}` })
    } else {
      validAuthors.push(item)
    }
  }

  if (validAuthors.length === 0) {
    return { succeeded: [], failed }
  }

  // Step 3: Create all in transaction (1 API call)
  const transaction = writeClient.transaction()

  for (const { author, docId } of validAuthors) {
    transaction.create({
      ...author,
      _type: 'author',
      _id: docId,
    })
  }

  try {
    await withRetry(
      () => transaction.commit(),
      { operation: 'createAuthorsBatch' }
    )

    // Step 4: Fetch all at once (1 API call)
    const createdIds = validAuthors.map(a => a.docId)
    const succeeded = await getAuthorsByIds(createdIds)

    log({
      level: 'info',
      operation: 'createAuthorsBatch',
      documentType: 'author',
      duration: Date.now() - startTime,
      success: true,
      details: { total: authors.length, succeeded: succeeded.length, failed: failed.length },
    })

    invalidateCache('authors:')

    return { succeeded, failed }
  } catch (error) {
    for (const { author } of validAuthors) {
      failed.push({ input: author, error: (error as Error).message })
    }

    log({
      level: 'error',
      operation: 'createAuthorsBatch',
      documentType: 'author',
      duration: Date.now() - startTime,
      success: false,
      error: (error as Error).message,
    })

    return { succeeded: [], failed }
  }
}

/**
 * Create multiple categories in a single transaction.
 * Optimized: Uses batch slug check and batch fetch.
 */
export async function createCategoriesBatch(categories: CategoryInput[]): Promise<BatchResult<Category & { _id: string }>> {
  requireWriteAccess()
  const startTime = Date.now()

  const failed: Array<{ input: unknown; error: string }> = []

  // Step 1: Validate all categories (no API calls)
  const validatedCategories: Array<{ category: CategoryInput; docId: string }> = []

  for (const category of categories) {
    const validation = validateCategoryInput(category, true)
    if (!validation.valid) {
      const errorMsg = validation.errors.map(e => `${e.field}: ${e.message}`).join('; ')
      failed.push({ input: category, error: `Validation failed: ${errorMsg}` })
      continue
    }

    const docId = category._id || `category-${category.slug.current}`
    validatedCategories.push({ category, docId })
  }

  if (validatedCategories.length === 0) {
    return { succeeded: [], failed }
  }

  // Step 2: Check all slugs at once (1 API call)
  const slugsToCheck = validatedCategories.map(c => c.category.slug.current)
  const existingSlugs = await findExistingSlugs('category', slugsToCheck)

  const validCategories: Array<{ category: CategoryInput; docId: string }> = []
  for (const item of validatedCategories) {
    if (existingSlugs.has(item.category.slug.current)) {
      failed.push({ input: item.category, error: `Slug already exists: ${item.category.slug.current}` })
    } else {
      validCategories.push(item)
    }
  }

  if (validCategories.length === 0) {
    return { succeeded: [], failed }
  }

  // Step 3: Create all in transaction (1 API call)
  const transaction = writeClient.transaction()

  for (const { category, docId } of validCategories) {
    transaction.create({
      ...category,
      _type: 'category',
      _id: docId,
    })
  }

  try {
    await withRetry(
      () => transaction.commit(),
      { operation: 'createCategoriesBatch' }
    )

    // Step 4: Fetch all at once (1 API call)
    const createdIds = validCategories.map(c => c.docId)
    const succeeded = await getCategoriesByIds(createdIds)

    log({
      level: 'info',
      operation: 'createCategoriesBatch',
      documentType: 'category',
      duration: Date.now() - startTime,
      success: true,
      details: { total: categories.length, succeeded: succeeded.length, failed: failed.length },
    })

    invalidateCache('categories:')

    return { succeeded, failed }
  } catch (error) {
    for (const { category } of validCategories) {
      failed.push({ input: category, error: (error as Error).message })
    }

    log({
      level: 'error',
      operation: 'createCategoriesBatch',
      documentType: 'category',
      duration: Date.now() - startTime,
      success: false,
      error: (error as Error).message,
    })

    return { succeeded: [], failed }
  }
}

/**
 * Delete multiple documents in a single transaction.
 */
export async function deleteBatch(ids: string[]): Promise<BatchResult<string>> {
  requireWriteAccess()
  const startTime = Date.now()

  const succeeded: string[] = []
  const failed: Array<{ input: unknown; error: string }> = []

  const transaction = writeClient.transaction()

  for (const id of ids) {
    transaction.delete(id)
  }

  try {
    await withRetry(
      () => transaction.commit(),
      { operation: 'deleteBatch' }
    )

    succeeded.push(...ids)

    log({
      level: 'info',
      operation: 'deleteBatch',
      duration: Date.now() - startTime,
      success: true,
      details: { total: ids.length, succeeded: succeeded.length },
    })
  } catch (error) {
    for (const id of ids) {
      failed.push({ input: id, error: (error as Error).message })
    }

    log({
      level: 'error',
      operation: 'deleteBatch',
      duration: Date.now() - startTime,
      success: false,
      error: (error as Error).message,
    })
  }

  // Invalidate all caches
  invalidateCache()

  return { succeeded, failed }
}

// =============================================================================
// Image Operations
// =============================================================================

/**
 * Validate an image before upload.
 */
export function validateImage(
  file: Buffer,
  filename: string
): ValidationResult {
  const errors: ValidationError[] = []

  // Check file size
  if (file.length > CONFIG.maxImageSize) {
    errors.push({
      field: 'file',
      message: `File size (${Math.round(file.length / 1024 / 1024)}MB) exceeds maximum allowed (${CONFIG.maxImageSize / 1024 / 1024}MB)`,
    })
  }

  // Check file extension
  const ext = filename.toLowerCase().split('.').pop()
  const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp']
  if (!ext || !validExtensions.includes(ext)) {
    errors.push({
      field: 'filename',
      message: `Invalid file extension. Allowed: ${validExtensions.join(', ')}`,
    })
  }

  // Check magic bytes for image type
  const magicBytes = file.slice(0, 4).toString('hex')
  const isValidImage =
    magicBytes.startsWith('ffd8ff') || // JPEG
    magicBytes.startsWith('89504e47') || // PNG
    magicBytes.startsWith('47494638') || // GIF
    magicBytes.startsWith('52494646') // WebP (RIFF)

  if (!isValidImage) {
    errors.push({
      field: 'file',
      message: 'File does not appear to be a valid image',
    })
  }

  return { valid: errors.length === 0, errors }
}

/**
 * Upload an image to Sanity with validation.
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
  const startTime = Date.now()

  // Validate if it's a buffer
  if (Buffer.isBuffer(file)) {
    const validation = validateImage(file, filename)
    if (!validation.valid) {
      const errorMsg = validation.errors.map(e => `${e.field}: ${e.message}`).join('; ')
      log({
        level: 'error',
        operation: 'uploadImage',
        success: false,
        error: `Validation failed: ${errorMsg}`,
        details: { filename, errors: validation.errors },
      })
      throw new Error(`Image validation failed: ${errorMsg}`)
    }
  }

  const asset = await withRetry(
    () => writeClient.assets.upload('image', file, { filename }),
    { operation: 'uploadImage' }
  )

  log({
    level: 'info',
    operation: 'uploadImage',
    documentId: asset._id,
    duration: Date.now() - startTime,
    success: true,
    details: { filename, assetId: asset._id },
  })

  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
    alt: altText,
  }
}

/**
 * Upload multiple images in parallel.
 */
export async function uploadImagesBatch(
  images: Array<{ file: Buffer; filename: string; altText?: string }>
): Promise<BatchResult<ImageReference>> {
  requireWriteAccess()
  const startTime = Date.now()

  const results = await Promise.allSettled(
    images.map(img => uploadImage(img.file, img.filename, img.altText))
  )

  const succeeded: ImageReference[] = []
  const failed: Array<{ input: unknown; error: string }> = []

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      succeeded.push(result.value)
    } else {
      failed.push({ input: images[index], error: result.reason.message })
    }
  })

  log({
    level: 'info',
    operation: 'uploadImagesBatch',
    duration: Date.now() - startTime,
    success: failed.length === 0,
    details: { total: images.length, succeeded: succeeded.length, failed: failed.length },
  })

  return { succeeded, failed }
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

// Type for Portable Text blocks
interface PortableTextBlockData {
  _type: string
  style?: string
  listItem?: string
  children?: Array<{ text?: string }>
}

/**
 * Estimate read time based on word count.
 * Assumes ~200 words per minute reading speed.
 * Handles all block types including headings, lists, and blockquotes.
 */
export function estimateReadTime(body: object[]): number {
  let wordCount = 0

  for (const block of body) {
    const typedBlock = block as PortableTextBlockData

    if (typedBlock._type === 'block') {
      const children = typedBlock.children || []
      for (const child of children) {
        if (child.text) {
          wordCount += child.text.split(/\s+/).filter(Boolean).length
        }
      }
    }
    // Code blocks - estimate based on lines
    if (typedBlock._type === 'codeBlock') {
      const codeBlock = block as { code?: string }
      if (codeBlock.code) {
        // Code reads slower - count lines as ~10 words each
        wordCount += codeBlock.code.split('\n').length * 10
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
