/**
 * Seed script for changelog entries.
 * Run with: npx tsx scripts/seed-changelog.ts
 *
 * Requires SANITY_TOKEN environment variable.
 */

import { writeClient, requireWriteAccess } from '../lib/sanity-write'

interface ChangelogEntry {
  _type: 'changelog'
  title: string
  version: string
  slug: { _type: 'slug'; current: string }
  summary: string
  releaseDate: string
  changeTypes: string[]
  isHighlight: boolean
  body: object[]
}

function generateKey(): string {
  return Math.random().toString(36).substring(2, 9)
}

function textBlock(
  text: string,
  style: 'normal' | 'h2' | 'h3' = 'normal'
): object {
  return {
    _type: 'block',
    _key: generateKey(),
    style,
    children: [{ _type: 'span', _key: generateKey(), text, marks: [] }],
    markDefs: []
  }
}

function listBlock(items: string[]): object[] {
  return items.map((text) => ({
    _type: 'block',
    _key: generateKey(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [{ _type: 'span', _key: generateKey(), text, marks: [] }],
    markDefs: []
  }))
}

const changelogEntries: ChangelogEntry[] = [
  // v0.3.0 - Pulse Intelligence
  {
    _type: 'changelog',
    title: 'Pulse Team Intelligence',
    version: '0.3.0',
    slug: { _type: 'slug', current: '0-3-0-pulse-team-intelligence' },
    summary:
      'Monitor team and client health with AI-powered insights across all your communication channels.',
    releaseDate: '2025-12-28',
    changeTypes: ['feature', 'improvement'],
    isHighlight: true,
    body: [
      textBlock('Pulse Dashboard', 'h2'),
      textBlock(
        'Introducing Pulse, your AI-powered team intelligence dashboard. Get real-time visibility into communication patterns, sentiment, and engagement across your entire organization.'
      ),

      textBlock('What You Can Do', 'h3'),
      ...listBlock([
        'Track team health with automatic pulse labels: Healthy, Watch, At Risk, Critical',
        'Monitor communication patterns across Slack, email, meetings, and Notion',
        'View trends over 7, 30, or 90-day windows',
        'Compare metrics against peer baselines',
        'Get proactive alerts when engagement drops'
      ]),

      textBlock('Custom AI Columns', 'h3'),
      textBlock(
        'Create your own metrics using natural language. Ask questions like "How responsive is this person?" or "How engaged are they in team discussions?" and Pulse will analyze communication patterns to give you answers.'
      ),

      textBlock('Evidence-Based Insights', 'h3'),
      textBlock(
        'Every score comes with evidence. Click any metric to see the actual messages, emails, and meeting snippets that informed the assessment. No black boxes — full transparency into how insights are generated.'
      )
    ]
  },

  // v0.2.0 - Meetings & Transcription
  {
    _type: 'changelog',
    title: 'Automatic Meeting Recording & Transcription',
    version: '0.2.0',
    slug: { _type: 'slug', current: '0-2-0-meetings-transcription' },
    summary:
      'Never miss meeting notes again. Yander automatically joins, records, and transcribes your meetings.',
    releaseDate: '2025-12-15',
    changeTypes: ['feature'],
    isHighlight: true,
    body: [
      textBlock('Meeting Intelligence', 'h2'),
      textBlock(
        'Connect your Google Calendar once and Yander handles the rest. Our meeting bot automatically joins your video calls, records the conversation, and delivers accurate transcripts with speaker labels.'
      ),

      textBlock('How It Works', 'h3'),
      ...listBlock([
        'Connect your Google Calendar with one click',
        'Yander automatically schedules recording for meetings with video links',
        'Our bot joins at the start of your meeting',
        'Get transcripts with speaker identification within minutes of the call ending'
      ]),

      textBlock('Meeting Status at a Glance', 'h3'),
      textBlock(
        'Your meetings dashboard shows real-time status for every call: Scheduled, Joining, Live (recording in progress), or Recorded. Past meetings without recordings are clearly marked so you know if something was missed.'
      ),

      textBlock('Easy Export', 'h3'),
      textBlock(
        'Copy transcripts to your clipboard in a clean, readable format. Perfect for pasting into Notion, Google Docs, or sharing with teammates who missed the call.'
      ),

      textBlock('Supported Platforms', 'h3'),
      ...listBlock([
        'Google Meet',
        'Zoom',
        'Microsoft Teams',
        'Slack Huddles'
      ])
    ]
  },

  // v0.1.5 - Voice Assistants
  {
    _type: 'changelog',
    title: 'Voice Assistants & Outbound Calling',
    version: '0.1.5',
    slug: { _type: 'slug', current: '0-1-5-voice-assistants' },
    summary:
      'Make phone calls directly from chat. Create custom voice assistants with 100+ voice options.',
    releaseDate: '2025-12-01',
    changeTypes: ['feature', 'improvement'],
    isHighlight: false,
    body: [
      textBlock('Voice-Powered Workflows', 'h2'),
      textBlock(
        'Your AI assistant can now make phone calls on your behalf. Just type "Call +1 415 555 1234" in chat and watch the magic happen.'
      ),

      textBlock('Create Custom Voice Assistants', 'h3'),
      ...listBlock([
        'Choose from 100+ voices across multiple providers',
        'Customize the assistant\'s personality and speaking style',
        'Set up dynamic prompts with variables like contact name, company, and reason for call',
        'Test voices directly in your browser before deploying'
      ]),

      textBlock('Live Call Transcripts', 'h3'),
      textBlock(
        'Watch call transcripts stream in real-time as the conversation happens. Both sides of the conversation are captured, so you always know what was said.'
      ),

      textBlock('Voice Providers', 'h3'),
      ...listBlock([
        'OpenAI voices',
        'ElevenLabs for ultra-realistic voices',
        'Azure Neural voices',
        'Cartesia, PlayHT, and Deepgram options'
      ])
    ]
  },

  // v0.1.0 - Core Integrations
  {
    _type: 'changelog',
    title: 'Core Integrations & AI Agent',
    version: '0.1.0',
    slug: { _type: 'slug', current: '0-1-0-core-integrations' },
    summary:
      'Connect your tools and let Yander work across them. Gmail, Calendar, Slack, and Notion in one place.',
    releaseDate: '2025-11-06',
    changeTypes: ['feature'],
    isHighlight: true,
    body: [
      textBlock('Your AI-Powered Workspace', 'h2'),
      textBlock(
        'Yander connects to the tools you already use and works across all of them. Ask questions, automate tasks, and get things done without switching apps.'
      ),

      textBlock('Integrations', 'h3'),
      ...listBlock([
        'Gmail — Read, search, and send emails. Set up auto-replies that respond in seconds.',
        'Google Calendar — View your schedule, create events, find free time',
        'Slack — Read messages, search channels, send updates',
        'Notion — Access your pages and databases, search your workspace'
      ]),

      textBlock('Natural Language Interface', 'h3'),
      textBlock(
        'Just describe what you want in plain English. "Find my last email from Sarah about the budget" or "What\'s on my calendar tomorrow?" — Yander understands and takes action.'
      ),

      textBlock('Multi-Tool Workflows', 'h3'),
      textBlock(
        'Need something that spans multiple tools? No problem. Yander can check your calendar, draft an email, look up context in Notion, and post a summary to Slack — all from a single request.'
      ),

      textBlock('Scheduled Automations', 'h3'),
      textBlock(
        'Set up flows that run on a schedule. Daily summaries, weekly reports, or recurring tasks — describe what you want and when, and Yander handles the rest.'
      ),

      textBlock('Gmail Auto-Reply', 'h3'),
      textBlock(
        'Enable auto-reply and Yander will draft intelligent responses to incoming emails within seconds. Replies appear in the original thread, maintaining context and conversation flow.'
      )
    ]
  }
]

async function seedChangelog() {
  console.log('🌱 Seeding changelog entries...\n')

  requireWriteAccess()

  for (const entry of changelogEntries) {
    const docId = `changelog-${entry.slug.current}`

    try {
      // Check if entry already exists
      const existing = await writeClient.fetch(
        `*[_type == "changelog" && _id == $id][0]`,
        { id: docId }
      )

      if (existing) {
        console.log(`⏭️  Skipping ${entry.version}: ${entry.title} (already exists)`)
        continue
      }

      // Create the entry
      await writeClient.create({
        ...entry,
        _id: docId
      })

      console.log(`✅ Created ${entry.version}: ${entry.title}`)
    } catch (error) {
      console.error(`❌ Failed to create ${entry.version}: ${entry.title}`)
      console.error(error)
    }
  }

  console.log('\n✨ Done!')
}

seedChangelog().catch(console.error)
