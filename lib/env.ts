/**
 * Environment variable loader for standalone scripts.
 *
 * Import this at the top of any script that runs outside Next.js
 * to automatically load variables from .env.local:
 *
 * ```typescript
 * import '@/lib/env'
 * // or
 * import '../lib/env'
 * ```
 *
 * Next.js automatically loads .env.local during `npm run dev` and `npm run build`,
 * so this is only needed for standalone scripts run with `npx tsx`.
 */

import { config } from 'dotenv'
import { resolve } from 'path'

// Load .env.local from project root
config({ path: resolve(process.cwd(), '.env.local') })

// Also try .env as fallback
config({ path: resolve(process.cwd(), '.env') })
