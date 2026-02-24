import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '..')

const client = createClient({
  projectId: 's3r1d2vt',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

if (!process.env.SANITY_TOKEN) {
  console.error('SANITY_TOKEN environment variable is required')
  process.exit(1)
}

const integrations = [
  {
    name: 'Slack',
    slug: 'slack',
    description: 'Get real-time team sentiment from Slack messages and channel activity.',
    longDescription: 'Yander connects to your Slack workspace to analyze communication patterns, team sentiment, and collaboration health. Messages are processed securely to surface engagement trends without exposing private content.',
    logo: 'slack.svg',
    category: 'communication',
    isImportOnly: false,
    order: 1,
    features: [
      'Channel activity and engagement metrics',
      'Team sentiment analysis from messages',
      'Response time and availability patterns',
      'Collaboration frequency between team members',
      'Communication health scoring',
    ],
    howItWorks: [
      { step: 'Connect Slack', description: 'Authorize Yander to access your Slack workspace with read-only permissions.' },
      { step: 'Select channels', description: 'Choose which channels to monitor for team health insights.' },
      { step: 'Get insights', description: 'Yander analyzes patterns and surfaces actionable team health data in your dashboard.' },
    ],
  },
  {
    name: 'Gmail',
    slug: 'gmail',
    description: 'Track client communication patterns and response times from Gmail.',
    longDescription: 'Yander integrates with Gmail to monitor client communication health. Track response times, email frequency, and engagement patterns to ensure no client relationship falls through the cracks.',
    logo: 'gmail.svg',
    category: 'communication',
    isImportOnly: false,
    order: 2,
    features: [
      'Client response time tracking',
      'Email volume and frequency analysis',
      'Client engagement scoring',
      'Communication gap detection',
      'Relationship health indicators',
    ],
    howItWorks: [
      { step: 'Connect Gmail', description: 'Sign in with Google and grant Yander read-only access to your inbox.' },
      { step: 'Map clients', description: 'Yander automatically identifies client contacts and maps communication threads.' },
      { step: 'Monitor health', description: 'View client communication scores and get alerts when engagement drops.' },
    ],
  },
  {
    name: 'Notion',
    slug: 'notion',
    description: 'Sync project data and team documentation from your Notion workspace.',
    longDescription: 'Connect your Notion workspace to pull in project statuses, team documentation activity, and task completion data. Yander uses this to build a complete picture of team productivity alongside communication data.',
    logo: 'notion.svg',
    category: 'project-management',
    isImportOnly: false,
    order: 3,
    features: [
      'Project status tracking across databases',
      'Task completion rate analysis',
      'Documentation activity monitoring',
      'Team workload distribution insights',
      'Sprint and milestone progress tracking',
    ],
    howItWorks: [
      { step: 'Connect Notion', description: 'Authorize Yander to read your Notion workspace databases and pages.' },
      { step: 'Select databases', description: 'Choose which project databases and pages to sync with Yander.' },
      { step: 'Track progress', description: 'Project health data flows into your Yander dashboard automatically.' },
    ],
  },
  {
    name: 'ClickUp',
    slug: 'clickup',
    description: 'Pull task progress, workload data, and project health from ClickUp.',
    longDescription: 'Yander syncs with ClickUp to track task completion rates, team workload balance, and project delivery health. Combine project data with communication insights for a complete team performance view.',
    logo: 'clickup.svg',
    category: 'project-management',
    isImportOnly: false,
    order: 4,
    features: [
      'Task completion and velocity tracking',
      'Team workload balance analysis',
      'Project deadline monitoring',
      'Sprint burndown insights',
      'Cross-team dependency tracking',
    ],
    howItWorks: [
      { step: 'Connect ClickUp', description: 'Authorize Yander to access your ClickUp workspace with read-only permissions.' },
      { step: 'Select spaces', description: 'Choose which ClickUp spaces and projects to monitor.' },
      { step: 'View performance', description: 'Task and project metrics appear alongside communication data in your dashboard.' },
    ],
  },
  {
    name: 'Monday.com',
    slug: 'monday',
    description: 'Sync board data, timelines, and team workload from Monday.com.',
    longDescription: 'Integrate Monday.com to bring project board data, timeline progress, and team capacity metrics into Yander. Get a unified view of how your team is performing across both communication and project delivery.',
    logo: 'monday.svg',
    category: 'project-management',
    isImportOnly: false,
    order: 5,
    features: [
      'Board and item status tracking',
      'Timeline and deadline monitoring',
      'Team capacity and workload metrics',
      'Automation trigger insights',
      'Cross-board project health scoring',
    ],
    howItWorks: [
      { step: 'Connect Monday.com', description: 'Authorize Yander to read your Monday.com workspace boards and data.' },
      { step: 'Select boards', description: 'Choose which boards and workspaces to sync with Yander.' },
      { step: 'Unified dashboard', description: 'Monday.com project data merges with your team health metrics in Yander.' },
    ],
  },
  {
    name: 'Asana',
    slug: 'asana',
    description: 'Import project milestones, task data, and team workload from Asana.',
    longDescription: 'Connect Asana to sync project milestones, task assignments, and team workload data. Yander combines this with communication analysis to give you a full picture of team health and project delivery.',
    logo: 'asana.svg',
    category: 'project-management',
    isImportOnly: false,
    order: 6,
    features: [
      'Project milestone and task tracking',
      'Team workload and assignment balance',
      'Due date and deadline monitoring',
      'Portfolio-level project health',
      'Goal progress tracking',
    ],
    howItWorks: [
      { step: 'Connect Asana', description: 'Authorize Yander to access your Asana workspace with read-only permissions.' },
      { step: 'Select projects', description: 'Choose which Asana projects and portfolios to monitor.' },
      { step: 'Track delivery', description: 'Project and task metrics flow into your Yander team health dashboard.' },
    ],
  },
  {
    name: 'Fathom',
    slug: 'fathom',
    description: 'Import meeting summaries and action items from Fathom recordings.',
    longDescription: 'Yander imports meeting recordings and AI-generated summaries from Fathom. Meeting sentiment, action item completion rates, and participation patterns feed into your team health scores automatically.',
    logo: 'fathom.svg',
    category: 'meeting-import',
    isImportOnly: true,
    order: 7,
    features: [
      'Meeting summary import',
      'Action item tracking and completion rates',
      'Meeting sentiment analysis',
      'Participation pattern insights',
      'Meeting frequency and duration tracking',
    ],
    howItWorks: [
      { step: 'Connect Fathom', description: 'Link your Fathom account to allow Yander to import meeting data.' },
      { step: 'Auto-import', description: 'Meeting summaries and transcripts are imported automatically after each call.' },
      { step: 'Analyze patterns', description: 'Yander scores meeting health and tracks action item follow-through.' },
    ],
  },
  {
    name: 'Fireflies',
    slug: 'fireflies',
    description: 'Import meeting transcripts and analytics from Fireflies.ai recordings.',
    longDescription: 'Connect Fireflies.ai to import meeting transcripts, analytics, and AI-generated insights. Yander uses this data to track meeting effectiveness, team participation, and follow-up completion rates.',
    logo: 'fireflies.svg',
    category: 'meeting-import',
    isImportOnly: true,
    order: 8,
    features: [
      'Meeting transcript import',
      'Speaker analytics and talk-time ratios',
      'Topic and keyword tracking',
      'Action item extraction and monitoring',
      'Meeting effectiveness scoring',
    ],
    howItWorks: [
      { step: 'Connect Fireflies', description: 'Authorize Yander to access your Fireflies.ai meeting recordings.' },
      { step: 'Sync meetings', description: 'Transcripts and analytics are synced automatically after each recorded meeting.' },
      { step: 'Surface insights', description: 'Meeting data contributes to team health scores and engagement metrics.' },
    ],
  },
]

async function uploadImage(filename) {
  const filepath = resolve(rootDir, 'public', 'logos', filename)
  const buffer = readFileSync(filepath)
  const contentType = filename.endsWith('.svg') ? 'image/svg+xml' : 'image/png'
  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType,
  })
  return asset._id
}

async function seed() {
  console.log('Seeding integrations to Sanity...\n')

  for (const integration of integrations) {
    const existing = await client.fetch(
      `*[_type == "integration" && slug.current == $slug][0]._id`,
      { slug: integration.slug }
    )

    if (existing) {
      console.log(`  ⏭  ${integration.name} already exists (${existing}), skipping`)
      continue
    }

    console.log(`  📤 Uploading logo: ${integration.logo}`)
    const assetId = await uploadImage(integration.logo)

    const doc = {
      _type: 'integration',
      name: integration.name,
      slug: { _type: 'slug', current: integration.slug },
      description: integration.description,
      longDescription: integration.longDescription,
      logo: {
        _type: 'image',
        asset: { _type: 'reference', _ref: assetId },
      },
      category: integration.category,
      isImportOnly: integration.isImportOnly,
      order: integration.order,
      features: integration.features,
      howItWorks: integration.howItWorks.map((step, i) => ({
        _type: 'object',
        _key: `step-${i}`,
        step: step.step,
        description: step.description,
      })),
    }

    const result = await client.create(doc)
    console.log(`  ✅ ${integration.name} created (${result._id})`)
  }

  console.log('\nDone! All integrations seeded.')
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
