/**
 * Create two SEO-optimized blog posts:
 * 1. Remote Onboarding - First 90 Days
 * 2. Async vs Sync Communication
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 's3r1d2vt',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

function generateKey() {
  return Math.random().toString(36).slice(2, 14);
}

function createTextBlock(text, style = 'normal') {
  return {
    _type: 'block',
    _key: generateKey(),
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: generateKey(), text, marks: [] }],
  };
}

function createListBlock(items, listType = 'bullet') {
  return items.map(item => ({
    _type: 'block',
    _key: generateKey(),
    style: 'normal',
    listItem: listType,
    level: 1,
    markDefs: [],
    children: [{ _type: 'span', _key: generateKey(), text: item, marks: [] }],
  }));
}

const posts = [
  {
    _id: 'post-first-90-days-remote-onboarding',
    _type: 'post',
    title: 'The First 90 Days: A Data-Driven Approach to Remote Onboarding That Prevents Early Turnover',
    slug: { _type: 'slug', current: 'first-90-days-remote-onboarding-prevent-turnover' },
    author: { _type: 'reference', _ref: 'author-yander-team' },
    categories: [
      { _type: 'reference', _ref: 'category-best-practices', _key: generateKey() },
      { _type: 'reference', _ref: 'category-remote-leadership', _key: generateKey() },
    ],
    publishedAt: new Date().toISOString(),
    excerpt: '20% of employee turnover happens within the first 45 days. For remote hires, that number climbs even higher. Here\'s the engagement-focused framework for onboarding that actually works.',
    readTime: 9,
    seo: {
      metaTitle: 'Remote Onboarding: Data-Driven First 90 Days | Yander',
      metaDescription: '20% of turnover happens in the first 45 days. Learn the data-driven remote onboarding framework that prevents early resignations and builds lasting engagement.',
      keywords: ['remote onboarding', 'employee onboarding', 'first 90 days', 'new hire retention', 'remote employee engagement'],
    },
    body: [
      createTextBlock('The Onboarding Crisis No One Talks About', 'h2'),
      createTextBlock('Here\'s a stat that should keep every remote leader up at night: 20% of employee turnover happens within the first 45 days of employment. For remote hires, some studies suggest that number can reach 30%.'),
      createTextBlock('The math is brutal. You spent months recruiting, interviewing, and negotiating. You invested in equipment, accounts, and training. Then, before the new hire even finishes their first quarter, they\'re gone—often without any clear warning signs.'),
      createTextBlock('The problem isn\'t that remote onboarding is inherently broken. It\'s that most companies are still using onboarding playbooks designed for office environments, then wondering why remote employees feel disconnected, confused, and ultimately—disengaged.'),

      createTextBlock('Why Traditional Onboarding Fails Remote Employees', 'h2'),
      createTextBlock('In-office onboarding relies heavily on osmosis. New hires absorb culture by overhearing conversations, watching how people interact, and picking up unwritten norms through observation. They can tap a colleague on the shoulder when confused. They see the facial expressions that signal "this meeting is actually important" vs. "this is optional."'),
      createTextBlock('Remote onboarding strips away all of these ambient signals. What\'s left is often a series of disconnected video calls, a flood of Slack channels, and a mountain of documentation that no one has time to read.'),
      createTextBlock('The result is predictable:'),
      ...createListBlock([
        'Role ambiguity: New hires don\'t understand what success actually looks like',
        'Social isolation: They haven\'t formed the relationships that create belonging',
        'Information overload: They\'re drowning in content without context',
        'Invisible struggles: Managers can\'t see when someone is floundering',
      ]),

      createTextBlock('The First 90 Days Framework', 'h2'),
      createTextBlock('Effective remote onboarding isn\'t about cramming more content into the first week. It\'s about creating structured engagement touchpoints that build connection, clarity, and confidence over time.'),

      createTextBlock('Days 1-7: Foundation Week', 'h3'),
      createTextBlock('The first week sets the tone for everything that follows. Your goals here are simple: make them feel welcome, give them early wins, and establish communication patterns.'),
      createTextBlock('Critical actions:', 'normal'),
      ...createListBlock([
        'Pre-arrival setup: Equipment, accounts, and access configured before day one',
        'Welcome ritual: A team video call specifically to welcome them (not a regular meeting they join)',
        'Onboarding buddy assignment: Someone outside their direct team who checks in daily',
        'First deliverable: A small, achievable task they can complete by Friday',
        'Manager 1:1 cadence: Daily 15-minute check-ins during week one',
      ]),
      createTextBlock('Watch for: Response time patterns. New hires who take hours to respond to simple messages may be struggling with overwhelm or unclear on expectations. Those who respond instantly to everything may be anxious about making mistakes.'),

      createTextBlock('Days 8-30: Integration Month', 'h3'),
      createTextBlock('Week two through four is when most disengagement seeds are planted. The initial excitement fades, real work begins, and new hires start comparing their experience to expectations.'),
      createTextBlock('Critical actions:', 'normal'),
      ...createListBlock([
        'Cross-functional introductions: Scheduled video calls with key stakeholders',
        'Shadow sessions: Observing (camera off) how experienced team members work',
        'First feedback loop: Formal check-in on how onboarding is going',
        'Project ownership: Transition from tasks to owning a small project end-to-end',
        'Reduce check-in frequency: Move from daily to 2-3x weekly 1:1s',
      ]),
      createTextBlock('Watch for: Meeting participation patterns. Are they asking questions? Using their camera? Contributing to async discussions? Declining participation signals integration isn\'t working.'),

      createTextBlock('Days 31-60: Contribution Phase', 'h3'),
      createTextBlock('Month two is about building confidence through meaningful contribution. The new hire should be producing real value and feeling like part of the team.'),
      createTextBlock('Critical actions:', 'normal'),
      ...createListBlock([
        'Increased autonomy: Reduce oversight while maintaining support',
        'Peer feedback: Input from colleagues, not just their manager',
        'Role clarity check: Documented expectations reviewed and refined',
        'Social connections: Verify they\'ve built relationships outside their immediate team',
        'Weekly 1:1s: Standard cadence established',
      ]),
      createTextBlock('Watch for: After-hours activity. New hires who suddenly start working late or on weekends may be struggling with workload or feeling pressure to prove themselves. Both are red flags.'),

      createTextBlock('Days 61-90: Ownership Quarter', 'h3'),
      createTextBlock('By day 90, successful new hires should be operating with the same level of autonomy as established team members. This phase is about validating integration and addressing any lingering gaps.'),
      createTextBlock('Critical actions:', 'normal'),
      ...createListBlock([
        '90-day review: Formal assessment of performance and fit',
        'Career conversation: Early discussion of growth path and development',
        'Onboarding retrospective: What worked? What would they change?',
        'Buddy graduation: Formal end to structured buddy support',
        'Full team integration: They\'re now a resource for others, not just a learner',
      ]),
      createTextBlock('Watch for: Engagement trend direction. Is their participation increasing, stable, or declining? The trajectory matters more than the absolute level.'),

      createTextBlock('The Metrics That Actually Matter', 'h2'),
      createTextBlock('Most companies measure onboarding success with surveys—"How was your first week?"—and get predictably positive responses. New hires are optimistic and hesitant to criticize. By the time dissatisfaction surfaces in feedback, it\'s often too late.'),
      createTextBlock('Better signals come from behavioral data:'),
      ...createListBlock([
        'Time to first contribution: How quickly are they producing value?',
        'Communication velocity: Are they increasing participation over time?',
        'Cross-team connections: Have they built relationships outside their immediate team?',
        'Response patterns: Are they engaged and accessible, or fading into the background?',
        'Meeting behavior: Camera on, questions asked, active participation?',
      ]),

      createTextBlock('The Manager\'s Early Warning System', 'h2'),
      createTextBlock('New hire disengagement rarely announces itself. Instead, it appears as subtle shifts that are easy to miss when you\'re busy with everything else.'),
      createTextBlock('Signs that warrant immediate attention:'),
      ...createListBlock([
        'Declining response times: They used to reply quickly; now it takes hours',
        'Reduced visibility: Less presence in Slack, fewer contributions to discussions',
        'Meeting withdrawal: Camera off, no questions, shorter contributions',
        'Deadline issues: Missing or barely meeting commitments',
        'Isolation patterns: Not reaching out to colleagues for help or connection',
      ]),
      createTextBlock('When you spot these patterns, don\'t wait for the next scheduled 1:1. Reach out directly, specifically, and with genuine curiosity rather than concern. "I noticed you\'ve been quieter this week—everything going okay?" opens doors. "I\'m concerned about your engagement" closes them.'),

      createTextBlock('Building Onboarding That Scales', 'h2'),
      createTextBlock('The framework above works for individual hires, but what about teams that are growing quickly? The answer isn\'t to automate the human elements—it\'s to systematize them.'),
      ...createListBlock([
        'Documentation: Every recurring onboarding question should become searchable content',
        'Buddy network: Train multiple people to serve as onboarding buddies',
        'Milestone templates: Standardize 30/60/90 day checkpoints',
        'Signal monitoring: Track engagement metrics across all new hires',
        'Feedback loops: Regular retrospectives that improve the process',
      ]),

      createTextBlock('The Investment That Pays for Itself', 'h2'),
      createTextBlock('Replacing an employee costs 50-200% of their annual salary. For a team of 50 with 15% turnover, that\'s 7-8 replacements per year. If even half of those leave within the first year—and poor onboarding is a factor—you\'re looking at hundreds of thousands in preventable costs.'),
      createTextBlock('The alternative is investing in onboarding that works. Not more videos, not longer checklists, but structured engagement that builds connection from day one and monitors for problems before they become resignations.'),
      createTextBlock('Your new hires want to succeed. They accepted your offer because they believed in the opportunity. The only question is whether your onboarding process will support that belief—or slowly erode it until they start looking elsewhere.'),
    ],
  },
  {
    _id: 'post-async-sync-communication-balance',
    _type: 'post',
    title: 'Async vs. Sync: Finding Your Remote Team\'s Communication Sweet Spot',
    slug: { _type: 'slug', current: 'async-sync-remote-team-communication-balance' },
    author: { _type: 'reference', _ref: 'author-yander-team' },
    categories: [
      { _type: 'reference', _ref: 'category-best-practices', _key: generateKey() },
      { _type: 'reference', _ref: 'category-team-insights', _key: generateKey() },
    ],
    publishedAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    excerpt: 'The async-first gospel has a dirty secret: it doesn\'t work for everyone. Here\'s how to analyze your team\'s communication patterns and find the balance that actually drives engagement.',
    readTime: 8,
    seo: {
      metaTitle: 'Async vs Sync Communication: Remote Team Balance | Yander',
      metaDescription: 'Learn how to balance async and sync communication in remote teams. Discover communication pattern analysis that drives engagement without meeting overload.',
      keywords: ['async communication', 'synchronous communication', 'remote team communication', 'Slack best practices', 'meeting culture'],
    },
    body: [
      createTextBlock('The Async Myth', 'h2'),
      createTextBlock('Somewhere along the way, "async-first" became the assumed best practice for remote teams. The argument sounds compelling: asynchronous communication respects time zones, enables deep work, creates documentation, and eliminates meeting bloat.'),
      createTextBlock('There\'s just one problem: async-first doesn\'t work for every team, every role, or every situation. And when companies adopt it as dogma rather than strategy, the result is often worse than what they were trying to escape.'),
      createTextBlock('I\'ve seen teams where async-first led to 48-hour response times on urgent questions. I\'ve seen creative teams struggle because brainstorming over Slack threads feels like shouting into a void. I\'ve seen new hires spiral into anxiety because they couldn\'t get a simple question answered in real-time.'),
      createTextBlock('The goal isn\'t async. The goal is effective communication. And that requires understanding what each mode does well—and when to use it.'),

      createTextBlock('Understanding the Spectrum', 'h2'),
      createTextBlock('Communication isn\'t binary. Between pure async (an email you\'ll check whenever) and pure sync (a real-time conversation), there\'s a spectrum:'),
      ...createListBlock([
        'Pure async: Email, project management comments, documentation',
        'Near-async: Slack messages with no response expectation',
        'Expected async: Slack messages with same-day response norms',
        'Near-sync: Slack huddles, quick calls, "got a minute?" pings',
        'Pure sync: Scheduled meetings, video calls, real-time collaboration',
      ]),
      createTextBlock('Most remote teams operate across this entire spectrum throughout the day. The question isn\'t which mode to use—it\'s when to use each one.'),

      createTextBlock('When Async Works Best', 'h2'),
      createTextBlock('Asynchronous communication excels in specific contexts:'),

      createTextBlock('Information sharing', 'h3'),
      createTextBlock('Updates, announcements, and status reports don\'t need real-time discussion. Writing them async creates a record, allows people to process at their own pace, and doesn\'t require coordinating schedules.'),

      createTextBlock('Deep thinking', 'h3'),
      createTextBlock('Complex problems often benefit from time to reflect. Async allows people to think before responding, leading to more thoughtful contributions. The pressure of real-time conversation can push people toward quick answers rather than good ones.'),

      createTextBlock('Cross-timezone collaboration', 'h3'),
      createTextBlock('When team members are 8+ hours apart, sync communication means someone is always working outside normal hours. Async enables collaboration without requiring anyone to take a midnight call.'),

      createTextBlock('Documentation', 'h3'),
      createTextBlock('Async communication naturally creates searchable records. Decisions made in Slack threads or project comments can be referenced later. Decisions made in video calls often disappear unless someone takes notes.'),

      createTextBlock('When Sync Works Best', 'h2'),
      createTextBlock('But synchronous communication has its own strengths that async can\'t replicate:'),

      createTextBlock('Relationship building', 'h3'),
      createTextBlock('Trust, rapport, and psychological safety are built through real-time interaction. The micro-expressions, tone of voice, and natural flow of conversation create connection that text cannot. Teams that never talk synchronously often feel like groups of strangers working in parallel.'),

      createTextBlock('Complex discussions', 'h3'),
      createTextBlock('Some conversations require rapid back-and-forth: clarifying misunderstandings, exploring ideas, working through disagreements. What takes 5 minutes on a call can become a 3-day Slack thread with increasing frustration.'),

      createTextBlock('Urgent matters', 'h3'),
      createTextBlock('When something is genuinely time-sensitive, waiting for async responses creates real problems. Emergencies, critical bugs, and time-bound decisions need immediate attention.'),

      createTextBlock('Emotional conversations', 'h3'),
      createTextBlock('Feedback, concerns, and sensitive topics are almost always better handled in real-time. Text strips emotional nuance and creates opportunities for misinterpretation. The conversation that feels harsh in Slack might feel supportive on a call.'),

      createTextBlock('Finding Your Team\'s Balance', 'h2'),
      createTextBlock('The right mix of async and sync varies by team, function, and even individual. Here\'s how to find yours:'),

      createTextBlock('Audit Current Patterns', 'h3'),
      createTextBlock('Before changing anything, understand what\'s actually happening. Look at:'),
      ...createListBlock([
        'Average response times in async channels',
        'Time spent in meetings per week',
        'Types of conversations happening in each medium',
        'Where frustration or delays are occurring',
        'How different team members prefer to communicate',
      ]),

      createTextBlock('Identify Mismatches', 'h3'),
      createTextBlock('Problems often stem from using the wrong medium for the situation:'),
      ...createListBlock([
        'Long Slack threads that should have been a 10-minute call',
        'Meetings for updates that could have been written posts',
        'Urgent requests lost in async channels',
        'Relationship building attempts via emoji reactions',
        'Complex feedback delivered over text',
      ]),

      createTextBlock('Set Explicit Norms', 'h3'),
      createTextBlock('Most teams never discuss how to communicate—they just do it. Making norms explicit reduces friction:'),
      ...createListBlock([
        'Response time expectations by channel',
        'When to use meetings vs. async discussion',
        'How to signal urgency (and what qualifies as urgent)',
        'Camera expectations for video calls',
        'Core hours when sync availability is expected',
      ]),

      createTextBlock('Communication Patterns as Engagement Signals', 'h2'),
      createTextBlock('How your team communicates reveals more than what they\'re communicating about. Patterns in communication behavior are leading indicators of engagement, collaboration, and potential problems.'),
      createTextBlock('Healthy patterns to look for:'),
      ...createListBlock([
        'Balanced participation: Multiple people contributing, not just a few voices',
        'Cross-functional interaction: Communication flowing between teams, not just within',
        'Appropriate escalation: Moving from async to sync when needed',
        'Response reliability: Consistent response times within agreed norms',
        'Proactive sharing: People volunteering information, not just responding',
      ]),
      createTextBlock('Warning patterns that suggest problems:'),
      ...createListBlock([
        'Declining participation: People going quiet in channels they used to engage with',
        'Sync avoidance: Camera always off, declining optional meetings, never initiating calls',
        'Communication silos: Teams that never interact with other teams',
        'Response delays: Increasing time to respond to direct questions',
        'Off-hours activity: Communication patterns shifting to nights and weekends',
      ]),

      createTextBlock('The Individual Factor', 'h2'),
      createTextBlock('One size doesn\'t fit all. People have genuine preferences and needs:'),
      ...createListBlock([
        'Introverts often thrive with async: time to think, no performance pressure',
        'Extroverts may struggle: need real-time energy and interaction',
        'New employees need more sync: questions, context, relationship building',
        'Experienced team members can handle more async: established relationships and context',
        'Some roles need real-time access: support, sales, urgent response functions',
      ]),
      createTextBlock('The best teams accommodate these differences rather than forcing uniformity. A developer who does their best work with headphones on and Slack notifications off needs different norms than a customer success manager who needs to respond quickly to client messages.'),

      createTextBlock('Practical Implementation', 'h2'),
      createTextBlock('If your team\'s communication feels broken, here\'s a starting framework:'),

      createTextBlock('Establish communication channels by purpose', 'h3'),
      ...createListBlock([
        '#team-general: Async, non-urgent team discussion',
        '#team-urgent: Near-sync, same-hour response expected',
        'Direct messages: Personal, flexible response time',
        'Huddles/quick calls: Sync, for anything taking more than 3 back-and-forths',
        'Scheduled meetings: Sync, for relationship building and complex discussions',
      ]),

      createTextBlock('Define response time expectations', 'h3'),
      ...createListBlock([
        'Urgent channel: 30 minutes during core hours',
        'General channel: Same business day',
        'Direct messages: Within 4 hours during work hours',
        'Email: 24-48 hours unless marked urgent',
      ]),

      createTextBlock('Protect focus time', 'h3'),
      ...createListBlock([
        'No-meeting blocks: 2-4 hours daily for deep work',
        'Notification expectations: Okay to batch-check, not required to be always-on',
        'Status indicators: Use them to signal availability',
      ]),

      createTextBlock('The Goal Is Clarity, Not Dogma', 'h2'),
      createTextBlock('The async vs. sync debate misses the point. Neither mode is inherently better. What matters is that everyone understands when to use each one, and that the team\'s communication patterns support engagement rather than undermining it.'),
      createTextBlock('Monitor your team\'s communication not to surveil, but to understand. When participation drops, response times increase, or patterns shift, those are signals worth investigating. Not because someone is slacking—but because they might be struggling, disconnected, or burning out.'),
      createTextBlock('The teams that get communication right aren\'t the ones that achieve async purity or meeting perfection. They\'re the ones that stay flexible, keep talking about how they talk, and adjust when something isn\'t working.'),
    ],
  },
];

async function createPosts() {
  console.log('Creating 2 new blog posts...\n');

  for (const post of posts) {
    try {
      // Check if slug already exists
      const existingCount = await client.fetch(
        `count(*[_type == "post" && slug.current == $slug])`,
        { slug: post.slug.current }
      );

      if (existingCount > 0) {
        console.log(`⚠️  Slug already exists: ${post.slug.current}`);
        console.log(`   Skipping: ${post.title}\n`);
        continue;
      }

      // Create the post
      const result = await client.create(post);
      console.log(`✅ Created: ${post.title}`);
      console.log(`   Slug: ${post.slug.current}`);
      console.log(`   ID: ${result._id}\n`);
    } catch (error) {
      console.error(`❌ Failed to create: ${post.title}`);
      console.error(`   Error: ${error.message}\n`);
    }
  }

  console.log('Done!');
}

createPosts();
