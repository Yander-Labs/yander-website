export type IntegrationCategory = 'communication' | 'project-management' | 'meeting-import'

export interface Integration {
  name: string
  slug: string
  description: string
  longDescription: string
  logo: string
  category: IntegrationCategory
  categoryLabel: string
  isImportOnly: boolean
  features: string[]
  howItWorks: { step: string; description: string }[]
}

export const categories: { value: IntegrationCategory; label: string; description: string }[] = [
  {
    value: 'communication',
    label: 'Communication',
    description: 'Monitor team and client communication health across your messaging tools.',
  },
  {
    value: 'project-management',
    label: 'Project Management',
    description: 'Track project delivery, workload balance, and team productivity.',
  },
  {
    value: 'meeting-import',
    label: 'Meeting Import',
    description: 'Import meeting recordings and transcripts for sentiment and engagement analysis.',
  },
]

export const integrations: Integration[] = [
  {
    name: 'Slack',
    slug: 'slack',
    description: 'Get real-time team sentiment from Slack messages and channel activity.',
    longDescription:
      'Yander connects to your Slack workspace to analyze communication patterns, team sentiment, and collaboration health. Messages are processed securely to surface engagement trends without exposing private content.',
    logo: '/logos/slack.svg',
    category: 'communication',
    categoryLabel: 'Communication',
    isImportOnly: false,
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
    longDescription:
      'Yander integrates with Gmail to monitor client communication health. Track response times, email frequency, and engagement patterns to ensure no client relationship falls through the cracks.',
    logo: '/logos/gmail.svg',
    category: 'communication',
    categoryLabel: 'Communication',
    isImportOnly: false,
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
    longDescription:
      'Connect your Notion workspace to pull in project statuses, team documentation activity, and task completion data. Yander uses this to build a complete picture of team productivity alongside communication data.',
    logo: '/logos/notion.svg',
    category: 'project-management',
    categoryLabel: 'Project Management',
    isImportOnly: false,
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
    longDescription:
      'Yander syncs with ClickUp to track task completion rates, team workload balance, and project delivery health. Combine project data with communication insights for a complete team performance view.',
    logo: '/logos/clickup.svg',
    category: 'project-management',
    categoryLabel: 'Project Management',
    isImportOnly: false,
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
    longDescription:
      'Integrate Monday.com to bring project board data, timeline progress, and team capacity metrics into Yander. Get a unified view of how your team is performing across both communication and project delivery.',
    logo: '/logos/monday.svg',
    category: 'project-management',
    categoryLabel: 'Project Management',
    isImportOnly: false,
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
    longDescription:
      'Connect Asana to sync project milestones, task assignments, and team workload data. Yander combines this with communication analysis to give you a full picture of team health and project delivery.',
    logo: '/logos/Asana_idgyOBeSXC_1.png',
    category: 'project-management',
    categoryLabel: 'Project Management',
    isImportOnly: false,
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
    longDescription:
      'Yander imports meeting recordings and AI-generated summaries from Fathom. Meeting sentiment, action item completion rates, and participation patterns feed into your team health scores automatically.',
    logo: '/logos/Fathom-Logo-RGB_Black-Cyan.png',
    category: 'meeting-import',
    categoryLabel: 'Meeting Import',
    isImportOnly: true,
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
    longDescription:
      'Connect Fireflies.ai to import meeting transcripts, analytics, and AI-generated insights. Yander uses this data to track meeting effectiveness, team participation, and follow-up completion rates.',
    logo: '/logos/Fireflies.ai_idl8zQaqvT_1.png',
    category: 'meeting-import',
    categoryLabel: 'Meeting Import',
    isImportOnly: true,
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

export function getIntegrationBySlug(slug: string): Integration | undefined {
  return integrations.find((i) => i.slug === slug)
}

export function getIntegrationsByCategory(category: IntegrationCategory): Integration[] {
  return integrations.filter((i) => i.category === category)
}

export function getAllSlugs(): string[] {
  return integrations.map((i) => i.slug)
}
