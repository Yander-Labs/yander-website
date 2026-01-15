import puppeteer, { Browser } from 'puppeteer'
import { uploadImage } from './sanity-crud'
import type { ImageReference } from './types'

// =============================================================================
// Browser Management
// =============================================================================

let browserInstance: Browser | null = null

/**
 * Get or create a shared browser instance.
 * Reuses the same browser for multiple screenshots for efficiency.
 */
async function getBrowser(): Promise<Browser> {
  if (!browserInstance) {
    browserInstance = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
  }
  return browserInstance
}

/**
 * Close the shared browser instance.
 * Call this when done with all screenshots to free resources.
 */
export async function closeBrowser(): Promise<void> {
  if (browserInstance) {
    await browserInstance.close()
    browserInstance = null
  }
}

// =============================================================================
// Types
// =============================================================================

export interface ScreenshotOptions {
  /** Viewport width (default: 1200) */
  width?: number
  /** Viewport height (default: 630) */
  height?: number
  /** Capture full scrollable page instead of viewport */
  fullPage?: boolean
  /** CSS selector to capture specific element */
  selector?: string
  /** Wait ms after page load before capture */
  waitFor?: number
  /** Device scale factor for retina (default: 2) */
  deviceScale?: number
}

// =============================================================================
// Screenshot Functions
// =============================================================================

/**
 * Take a screenshot of a URL and return as Buffer.
 *
 * @param url - The URL to screenshot
 * @param options - Screenshot options
 * @returns Buffer containing PNG image data
 */
export async function takeScreenshot(
  url: string,
  options: ScreenshotOptions = {}
): Promise<Buffer> {
  const browser = await getBrowser()
  const page = await browser.newPage()

  const width = options.width || 1920
  const height = options.height || 1080
  const deviceScale = options.deviceScale || 2

  console.log(`Taking screenshot of ${url}...`)
  console.log(`Viewport: ${width}x${height} @${deviceScale}x`)

  await page.setViewport({
    width,
    height,
    deviceScaleFactor: deviceScale
  })

  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })

  if (options.waitFor) {
    console.log(`Waiting ${options.waitFor}ms...`)
    await new Promise(r => setTimeout(r, options.waitFor))
  }

  let buffer: Buffer

  if (options.selector) {
    console.log(`Capturing element: ${options.selector}`)
    const element = await page.$(options.selector)
    if (!element) {
      await page.close()
      throw new Error(`Element not found: ${options.selector}`)
    }
    buffer = await element.screenshot() as Buffer
  } else {
    buffer = await page.screenshot({
      fullPage: options.fullPage || false
    }) as Buffer
  }

  await page.close()
  console.log(`Screenshot captured: ${buffer.length} bytes`)

  return buffer
}

/**
 * Take a screenshot and upload directly to Sanity.
 *
 * @param url - The URL to screenshot
 * @param filename - Filename for the Sanity asset
 * @param altText - Alt text for accessibility
 * @param options - Screenshot options
 * @returns ImageReference for use in Sanity documents
 */
export async function screenshotAndUpload(
  url: string,
  filename: string,
  altText: string,
  options?: ScreenshotOptions
): Promise<ImageReference> {
  const buffer = await takeScreenshot(url, options)

  console.log(`Uploading screenshot to Sanity as "${filename}"...`)
  const imageRef = await uploadImage(buffer, filename, altText)

  console.log(`Screenshot uploaded successfully!`)
  return imageRef
}

/**
 * Screenshot a specific element on a page.
 * Convenience wrapper for capturing UI components.
 *
 * @param url - The URL containing the element
 * @param selector - CSS selector for the element
 * @param filename - Filename for the Sanity asset
 * @param altText - Alt text for accessibility
 * @returns ImageReference for use in Sanity documents
 */
export async function screenshotElement(
  url: string,
  selector: string,
  filename: string,
  altText: string
): Promise<ImageReference> {
  return screenshotAndUpload(url, filename, altText, { selector })
}

/**
 * Take a full-page screenshot (scrollable content).
 *
 * @param url - The URL to screenshot
 * @param filename - Filename for the Sanity asset
 * @param altText - Alt text for accessibility
 * @returns ImageReference for use in Sanity documents
 */
export async function screenshotFullPage(
  url: string,
  filename: string,
  altText: string
): Promise<ImageReference> {
  return screenshotAndUpload(url, filename, altText, { fullPage: true })
}
