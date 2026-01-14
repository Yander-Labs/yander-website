import { createClient } from '@sanity/client'

// Token should be provided via environment variable or Sanity CLI auth
const client = createClient({
  projectId: 's3r1d2vt',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN, // Run: SANITY_TOKEN=your_token node scripts/seed-blog-content.mjs
  useCdn: false,
})

// Helper to create a block of text
const block = (text, style = 'normal') => ({
  _type: 'block',
  _key: Math.random().toString(36).substring(7),
  style,
  children: [{ _type: 'span', _key: Math.random().toString(36).substring(7), text, marks: [] }],
  markDefs: [],
})

// Helper to create a block with marks
const blockWithMarks = (children, style = 'normal') => ({
  _type: 'block',
  _key: Math.random().toString(36).substring(7),
  style,
  children: children.map(child => ({
    _type: 'span',
    _key: Math.random().toString(36).substring(7),
    text: child.text,
    marks: child.marks || [],
  })),
  markDefs: [],
})

// Categories
const categories = [
  {
    _type: 'category',
    _id: 'category-remote-leadership',
    title: 'Remote Leadership',
    slug: { _type: 'slug', current: 'remote-leadership' },
    description: 'Insights and strategies for leading distributed and remote teams effectively.',
    color: 'blue',
  },
  {
    _type: 'category',
    _id: 'category-team-insights',
    title: 'Team Insights',
    slug: { _type: 'slug', current: 'team-insights' },
    description: 'Data-driven insights into team dynamics, engagement, and performance.',
    color: 'emerald',
  },
  {
    _type: 'category',
    _id: 'category-best-practices',
    title: 'Best Practices',
    slug: { _type: 'slug', current: 'best-practices' },
    description: 'Proven frameworks and strategies for improving team engagement and retention.',
    color: 'purple',
  },
]

// Author
const author = {
  _type: 'author',
  _id: 'author-yander-team',
  name: 'Yander Team',
  slug: { _type: 'slug', current: 'yander-team' },
  role: 'Employee Engagement Experts',
  bio: 'The Yander team helps remote leaders understand and improve team engagement through data-driven insights. We believe in privacy-first approaches that support both managers and employees.',
}

// Blog Post 1: The Trillion-Dollar Blind Spot
const post1 = {
  _type: 'post',
  _id: 'post-trillion-dollar-blind-spot',
  title: "The Trillion-Dollar Blind Spot: Why Remote Leaders Can't See Disengagement Until It's Too Late",
  slug: { _type: 'slug', current: 'trillion-dollar-blind-spot-remote-disengagement' },
  author: { _type: 'reference', _ref: 'author-yander-team' },
  categories: [{ _type: 'reference', _ref: 'category-remote-leadership', _key: 'cat1' }],
  publishedAt: new Date().toISOString(),
  excerpt: "Gallup estimates disengagement costs U.S. businesses $1 trillion annually. For remote teams, the problem is worse: traditional engagement signals disappear when you can't see your team in person. Here's why surprise resignations keep catching leaders off guard.",
  readTime: 8,
  body: [
    block("Last Tuesday, your top media buyer submitted her two-week notice. You had no idea anything was wrong. She'd been hitting her targets, attending meetings, responding to Slack messages. There were no obvious red flags—at least, none you could see."),
    block("If this scenario sounds familiar, you're not alone. Across marketing agencies and remote-first companies, leaders are blindsided by resignations from employees they thought were thriving."),
    block("Here's the paradox: remote workers actually report higher engagement than their in-office peers. According to Gallup, 31% of fully remote employees feel engaged at work, compared to just 19% of on-site workers. Yet remote teams experience turnover rates as high as 60%."),
    block("The problem isn't that remote employees are less engaged. It's that disengagement is invisible until it's too late."),

    block("The Visibility Gap: Why Remote Disengagement Hides in Plain Sight", "h2"),
    block("In a traditional office, you notice things. The colleague who used to grab coffee with the team now eats lunch at their desk. The usually enthusiastic contributor who's gone quiet in meetings. The subtle shift in body language when someone's stressed or checked out."),
    block("Remote work eliminates these signals entirely. Your team members exist as Slack avatars and video thumbnails. They can mask disengagement behind timely message responses and meeting attendance. A camera turned off becomes normalized. A terse reply gets attributed to being busy."),
    block("Research shows that 83% of workers feel some degree of burnout—but here's the troubling part: many don't recognize it themselves. Employees often mistake burnout for normal work stress, interpreting it as a natural adaptation to work pressures. They don't realize they're disengaging until they're already polishing their resumes."),
    block("This creates a dangerous dynamic. By the time disengagement manifests in ways you can see—missed deadlines, declining quality, withdrawal from team activities—the employee has often mentally checked out. The resignation letter is already written in their head."),

    block("The Real Cost of Invisible Turnover", "h2"),
    block("The financial impact of this visibility gap is staggering."),
    block("Gallup estimates that employee disengagement costs U.S. businesses nearly $1 trillion annually in voluntary turnover alone. Globally, 9% of GDP is lost every year to disengaged workers who aren't contributing at full capacity."),
    block("For individual companies, the math is painful. Replacing an employee costs between 1.5 to 2 times their annual salary when you factor in recruiting, onboarding, and the productivity ramp-up period. For specialized roles in marketing agencies—senior strategists, experienced media buyers, creative directors—that number can be even higher."),
    block("But the costs go beyond direct replacement expenses."),

    block("The Ripple Effect on Client Relationships", "h3"),
    block("In agency environments, turnover creates client relationship damage that's hard to quantify. When an account manager leaves, they take institutional knowledge with them: the client's preferences, the history of past campaigns, the unwritten rules of the relationship."),
    block("New hires need months to rebuild that context. During that transition, client satisfaction dips. Deliverables slip. Relationships that took years to build can erode in weeks."),
    block("The data backs this up: disengaged workers cause 49% more errors and have 37% higher absenteeism than their engaged counterparts. For client-facing roles, those errors and absences directly impact the relationships that drive your business."),

    block("Why Traditional Engagement Methods Fail Remote Teams", "h2"),
    block("Most companies try to address engagement with familiar tools: annual surveys, regular one-on-ones, pulse checks. These methods worked reasonably well in office environments. They fail systematically for remote teams."),

    block("Annual surveys are retrospective, not predictive", "h3"),
    block("By the time you conduct an annual engagement survey, analyze the results, and implement changes, disengaged employees have had months to find new opportunities. The survey captures a snapshot of sentiment that's already outdated by the time you act on it."),

    block("One-on-ones rely on self-reporting", "h3"),
    block("Even the best managers struggle to surface honest feedback in one-on-ones. Employees fear being perceived as complainers or as not committed to the team. They minimize concerns, especially when those concerns might reflect on their own performance or suggest they're thinking about leaving."),

    block("Pulse surveys suffer from fatigue", "h3"),
    block("While pulse surveys aim to capture more frequent data, response rates typically decline over time. Worse, the employees who stop responding are often the ones you most need to hear from—those who are disengaged enough to skip another survey request."),

    block("The Reactive Trap", "h3"),
    block("There's a fundamental problem with all these approaches: they're reactive. You're asking employees to tell you how they feel, rather than observing signals that reveal how they're actually doing."),
    block("Here's a critical insight: managers are responsible for 70% of the variance in team engagement. That means you have enormous influence over whether your team stays engaged or drifts away. But you can't manage what you can't see."),

    block("What Remote Leaders Are Getting Wrong", "h2"),
    block("After talking with hundreds of remote team leaders, we've identified three common misconceptions that contribute to the visibility gap."),

    block("Mistake 1: Assuming message responsiveness equals engagement", "h3"),
    block("A team member who responds quickly to Slack messages seems engaged. But response time is a measure of availability, not investment. Someone can reply promptly to every message while being completely checked out from the work itself."),

    block("Mistake 2: Treating attendance as participation", "h3"),
    block("Showing up to meetings doesn't mean someone is present. Remote workers can easily multitask during video calls, muting themselves to work on other things, offering occasional nods and brief comments to appear involved."),

    block("Mistake 3: Confusing quiet with content", "h3"),
    block("In an office, a suddenly quiet employee is noticeable. Remotely, silence blends into the background. The team member who stops initiating conversations or contributing ideas doesn't create visible absence—they simply fade from attention."),

    block("From Reactive to Proactive: A Different Approach", "h2"),
    block("The good news is that disengagement doesn't happen overnight. There are signals—patterns in how people work, communicate, and collaborate—that appear weeks or even months before someone decides to leave."),
    block("The challenge is that these signals exist in data most leaders never look at: response time trends, meeting participation patterns, communication volume changes, sentiment shifts in written messages."),
    block("In our next article, we'll break down the 7 digital signals that predict remote employee disengagement—and how to spot them in your team's Slack messages, email patterns, and meeting behaviors."),
    block("The visibility gap doesn't have to stay invisible. With the right approach, you can see what's happening on your team before it becomes a resignation letter on your desk."),
    block("This is exactly why we built Yander: to make the invisible visible, without surveillance. We believe managers deserve to understand their team's health, and employees deserve support before burnout takes hold."),
  ],
}

// Blog Post 2: 7 Digital Signals
const post2 = {
  _type: 'post',
  _id: 'post-7-digital-signals',
  title: "7 Digital Signals That Predict Remote Employee Resignation (Before They Even Know It)",
  slug: { _type: 'slug', current: '7-digital-signals-predict-remote-resignation' },
  author: { _type: 'reference', _ref: 'author-yander-team' },
  categories: [{ _type: 'reference', _ref: 'category-team-insights', _key: 'cat1' }],
  publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  excerpt: "You can't walk past their desk, but you can still see the patterns. Here are 7 data-driven signals that appear weeks before a resignation—and the framework for spotting them in Slack, email, and calendars.",
  readTime: 10,
  body: [
    block("In our previous article, we explored the trillion-dollar blind spot: why remote leaders consistently miss signs of disengagement until employees are already headed out the door. The visibility gap is real, but it's not insurmountable."),
    block("Here's what we've learned: disengagement leaves digital breadcrumbs. Even when employees don't realize they're checking out, their behavior changes in measurable ways. These signals appear in the tools your team uses every day—Slack, email, calendar, project management systems."),
    block("The key is knowing what to look for."),
    block("We've identified seven signals that consistently predict disengagement and resignation risk. They fall into three categories: Communication Signals, Participation Signals, and Work Pattern Signals. Let's break them down."),

    block("Communication Signals", "h2"),
    block("How people communicate reveals more than what they say. Changes in communication patterns often precede changes in commitment."),

    block("Signal 1: Response Time Drift", "h3"),
    block("What it looks like: A gradual increase in time-to-respond over days or weeks. Someone who used to reply within minutes now takes hours. The delay isn't dramatic enough to trigger concern, but the trend is clear when you look at the data."),
    block("Why it matters: Response time reflects priority. When work feels meaningful and connected to their goals, employees naturally stay responsive. When they're mentally checking out, work communications drift down the priority list."),
    block("How to spot it: Compare baseline response times (their typical pattern over the past few months) to recent averages. Look for a consistent upward trend, not just isolated slow days."),

    block("Signal 2: Communication Volume Changes", "h3"),
    block("What it looks like: A notable drop in message initiation—not just responses, but proactive communication. The employee who used to share ideas, flag issues, and participate in team channels goes quiet."),
    block("Why it matters: Engaged employees contribute. They share observations, ask questions, offer help. When someone stops initiating communication, they're withdrawing from the team's collaborative ecosystem."),
    block("A nuanced pattern to watch: volume spikes followed by sudden drops. This often indicates frustration (the spike—trying to fix problems or express concerns) followed by resignation (the drop—giving up on being heard)."),

    block("Signal 3: Sentiment Shift in Written Communication", "h3"),
    block("What it looks like: Messages become shorter, more transactional. Positive language decreases. Enthusiasm markers—exclamation points, emoji, expressions of excitement—fade away. The tone shifts from collaborative to perfunctory."),
    block("Why it matters: Language reflects emotional state. When someone's heart isn't in their work, their writing becomes functional rather than engaged. They communicate to complete tasks, not to connect with colleagues."),
    block("Important note: This is about pattern analysis, not reading private messages. The signal comes from aggregate trends in communication style, not surveillance of individual conversations."),

    block("Participation Signals", "h2"),
    block("Beyond one-on-one communication, participation in team activities reveals engagement levels."),

    block("Signal 4: Meeting Engagement Decline", "h3"),
    block("What it looks like: Cameras stay off more frequently. Speaking contributions decrease. Joining late and leaving early becomes a pattern. When they do speak, contributions are shorter and less substantive."),
    block("Why it matters: Meetings are the most visible form of remote participation. They require active presence and engagement. When someone mentally checks out, meetings are often where it shows first—because meetings are where it's hardest to hide."),
    block("Watch for: Changes from their baseline behavior. Someone who always kept their camera on now doesn't. Someone who contributed ideas now only answers direct questions."),

    block("Signal 5: Collaboration Withdrawal", "h3"),
    block("What it looks like: Fewer comments on shared documents. Reduced participation in team channels. Less interaction with colleagues outside of direct work requirements. A shift from team channels to private DMs."),
    block("Why it matters: Isolation precedes resignation. As employees mentally prepare to leave, they naturally withdraw from team relationships. The investment in collaboration feels pointless when you don't plan to be around to see it through."),
    block("The DM shift is particularly telling: employees who move communication from public channels to private messages are often avoiding visibility—hiding their reduced engagement from the broader team."),

    block("Work Pattern Signals", "h2"),
    block("How people structure their work reveals their relationship with it."),

    block("Signal 6: Schedule Fragmentation", "h3"),
    block("What it looks like: Work spread across unusual hours. Inconsistent availability patterns. Activity bursts at odd times followed by extended silence during core hours."),
    block("Why it matters: This signal can indicate two different problems. Fragmented schedules sometimes reflect overwork and impending burnout—people working at all hours because they can't keep up. Other times, they indicate under-engagement—people doing the minimum required, spread out to create an appearance of activity."),
    block("Context matters: A sudden shift to erratic hours, in either direction from someone's baseline, warrants attention."),

    block("Signal 7: Output Consistency Changes", "h3"),
    block("What it looks like: More missed deadlines. Longer completion times for similar tasks. Lower quality work requiring more revisions. Tasks that used to be routine now seem to create friction."),
    block("Why it matters: This is often the last signal before resignation—and unfortunately, the one most managers wait to see. By the time output visibly declines, disengagement has usually been building for weeks or months."),
    block("Research shows disengaged workers cause 49% more errors than engaged colleagues. But waiting for errors to accumulate means waiting too long. Output decline is a lagging indicator; the earlier signals give you more time to intervene."),

    block("The Early Detection Framework", "h2"),
    block("Spotting these signals requires a systematic approach. Here's a framework for implementation."),

    block("Create baselines for each team member", "h3"),
    block("People are different. An introvert's communication pattern looks different from an extrovert's. Someone in a client-facing role has different meeting loads than someone in a production role. The signal isn't in absolute numbers—it's in deviation from that person's normal pattern."),

    block("Look for patterns over 2-4 weeks, not single instances", "h3"),
    block("Everyone has off days. A slow response or a missed deadline isn't a signal. But when multiple signals appear consistently over several weeks, something is changing."),

    block("Combine multiple signals for higher confidence", "h3"),
    block("Any single signal might have an innocent explanation. But when response times drift AND meeting participation drops AND communication volume decreases—that combination tells a story."),

    block("Avoiding false positives", "h3"),
    block("Life events cause temporary pattern changes. New projects create unusual workloads. Personal circumstances affect availability. The goal isn't to trigger an intervention at the first sign of change—it's to start a conversation when patterns suggest something worth exploring."),

    block("What to Do When You Spot the Signs", "h2"),
    block("Detection without action is useless. When signals suggest disengagement, here's how to respond."),

    block("Don't wait. Earlier intervention has higher success rates. The longer disengagement persists, the harder it is to reverse. A conversation in week two is more effective than a conversation in month three."),
    block("Lead with curiosity, not concern. Don't say 'I've noticed you seem disengaged.' Instead: 'I wanted to check in—how are things going? Is there anything making your work harder than it should be?'"),
    block("Ask about workload, growth, and blockers. Research shows lack of visible career progression is the top driver of remote employee attrition. People don't just leave bad situations—they leave situations that feel stagnant."),
    block("Focus on support, not surveillance. The goal is to help, not to catch. Employees who feel supported through difficult periods become more loyal. Employees who feel watched become more determined to leave."),

    block("From Detection to Prevention", "h2"),
    block("These seven signals create an early warning system for disengagement. But manually tracking them across a team is time-consuming—especially as teams grow."),
    block("The question becomes: what if you could automate this detection while respecting privacy? What if pattern analysis happened in the background, surfacing insights without reading private messages or monitoring keystrokes?"),
    block("In our final article in this series, we'll explore how leading remote teams are building proactive engagement systems—and the technology that makes it possible without becoming surveillance."),
    block("The signals are there. The question is whether you're equipped to see them."),
  ],
}

// Blog Post 3: Building a Proactive Engagement System
const post3 = {
  _type: 'post',
  _id: 'post-proactive-engagement-system',
  title: "Building a Proactive Engagement System for Remote Teams: A Complete Framework",
  slug: { _type: 'slug', current: 'proactive-engagement-system-remote-teams' },
  author: { _type: 'reference', _ref: 'author-yander-team' },
  categories: [{ _type: 'reference', _ref: 'category-best-practices', _key: 'cat1' }],
  publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  excerpt: "Stop reacting to resignations and start preventing them. Here's the complete framework for building a proactive engagement system—including the 30% retention improvement playbook used by leading remote teams.",
  readTime: 12,
  body: [
    block("This is the final article in our three-part series on remote team engagement. In the first article, we explored the trillion-dollar blind spot—why disengagement remains invisible in remote environments until it's too late. In the second, we identified seven digital signals that predict resignation before it happens."),
    block("Now it's time to put it all together. How do you move from reactive management—responding to problems after they surface—to proactive engagement that prevents problems before they start?"),
    block("The stakes are significant. Companies that implement proactive engagement systems report retention improvements of 30% or more. But the approach matters as much as the intent. Done wrong, proactive monitoring becomes surveillance. Done right, it becomes support."),
    block("Here's the complete framework."),

    block("The Proactive Engagement Mindset Shift", "h2"),
    block("Before diving into tactics, let's establish the mental model that makes proactive engagement work."),
    block("The traditional approach looks like this: Notice performance drop → Investigate what's wrong → Intervene to fix it. By the time this cycle completes, you're often too late. The employee has mentally moved on."),
    block("The proactive approach inverts this: Monitor patterns continuously → Notice trends early → Intervene while there's still time to help."),
    block("This isn't about catching problems. It's about supporting people."),

    block("Why Managers Are 70% of the Equation", "h3"),
    block("Research consistently shows that managers are responsible for approximately 70% of the variance in team engagement. This sounds like pressure, but it's actually good news. It means you have direct control over the biggest lever in your team's engagement."),
    block("The shift isn't from 'trusting employees' to 'monitoring employees.' It's from 'hoping things are okay' to 'ensuring things are okay.' Proactive engagement is a management responsibility, not a surveillance program."),

    block("The Four Pillars of Proactive Engagement", "h2"),
    block("Effective proactive engagement rests on four foundational elements. Miss any one of them, and the system becomes either ineffective or counterproductive."),

    block("Pillar 1: Continuous Signal Monitoring", "h3"),
    block("Remember the seven signals from our previous article: response time drift, communication volume changes, sentiment shifts, meeting engagement decline, collaboration withdrawal, schedule fragmentation, and output consistency changes."),
    block("Proactive engagement requires monitoring these signals continuously—not as a one-time check, but as an ongoing practice. The goal is to spot trends as they emerge, not to catch problems after they've calcified."),
    block("The privacy-first approach: This is about patterns, not content. You're tracking aggregate behaviors—how quickly someone responds on average, how their meeting participation trends over time, whether their communication volume is changing. You're not reading their messages or monitoring their screens."),
    block("Manual vs. tool-assisted: In small teams, a thoughtful manager can track these signals through observation and regular check-ins. As teams grow, this becomes unsustainable. Tools that automate pattern detection while respecting privacy allow you to scale proactive engagement across larger organizations."),

    block("Pillar 2: Regular Rhythms of Connection", "h3"),
    block("Signal monitoring identifies problems. Human connection solves them. You need both."),
    block("Weekly one-on-ones remain essential, but they need flexibility. Rigid agendas can prevent real conversations. Build space for open-ended discussion: 'What's on your mind?' 'What's making your work harder than it should be?' 'What would make next week better than this week?'"),
    block("Beyond one-on-ones, create touchpoints that don't require meetings. Async check-ins via shared documents or video updates. Virtual coffee pairings that connect people across the team. Recognition moments that acknowledge contributions publicly."),
    block("Career development conversations deserve special attention. Research shows that lack of visible career progression is the top driver of attrition for remote employees. Quarterly conversations focused specifically on growth—not performance, growth—signal that you're invested in their future."),

    block("Pillar 3: Workload Visibility and Balance", "h3"),
    block("Burnout and disengagement are closely linked. When 83% of workers report feeling some degree of burnout, and 52% say burnout directly impacts their engagement, workload management becomes an engagement issue."),
    block("Create transparency in project allocation. When team members can see how work is distributed—not just their own, but across the team—imbalances become visible and discussable. This isn't about surveillance; it's about fairness."),
    block("Build safe ways to signal overload. Employees often hide overwork because they fear being seen as incapable. Create explicit channels for flagging capacity issues without stigma. 'I can do this, but something else will need to move' should be an acceptable response."),
    block("Track leading indicators of overwork: after-hours activity, weekend work, vacation time taken vs. available. When the data shows someone consistently working beyond sustainable levels, don't wait for burnout—intervene proactively."),

    block("Pillar 4: Psychological Safety at a Distance", "h3"),
    block("Psychological safety—the belief that you can speak up without punishment—is harder to build remotely. You can't rely on casual interactions to build trust. The relationship has to be intentional."),
    block("Leaders go first with vulnerability. Share your own challenges, uncertainties, and mistakes. When leaders model openness, it signals that openness is safe."),
    block("Create explicit space for concerns. Not just in one-on-ones, but in team settings. Anonymous feedback channels can surface issues that people wouldn't raise directly."),
    block("Respond to concerns visibly. When someone raises an issue and you address it publicly (without attribution if they prefer anonymity), you demonstrate that speaking up leads to change."),

    block("The Implementation Playbook", "h2"),
    block("Theory is nice. Execution is everything. Here's a phased approach to implementing proactive engagement in your team."),

    block("Week 1-2: Baseline and Audit", "h3"),
    block("Start by assessing your current state. What engagement practices do you have in place? What signals are you currently tracking (even informally)? Where are the gaps in your visibility?"),
    block("Choose 2-3 signals from the seven we identified to start tracking. Don't try to monitor everything at once. Pick signals that are easy to observe in your team's existing tools and that feel most relevant to your context."),
    block("If you don't have regular one-on-ones, establish them now. If you do, review their structure. Are they creating space for honest conversation, or have they become status updates?"),

    block("Week 3-4: Quick Wins", "h3"),
    block("Implement one new connection rhythm. This could be a team async update, a recognition channel, or virtual coffee pairings. Start small—you can expand later."),
    block("Address any immediately visible concerns. If your baseline audit revealed obvious issues—someone showing multiple warning signals, workload clearly imbalanced—don't wait to address them."),
    block("Communicate the why to your team. Proactive engagement works better when people understand the intent. 'I want to make sure I'm supporting everyone effectively, so I'm going to be more intentional about checking in on how things are going.'"),

    block("Month 2-3: System Building", "h3"),
    block("Formalize your signal monitoring. Whether manual or tool-assisted, create a consistent practice of reviewing engagement signals on a regular cadence—weekly or biweekly."),
    block("Develop an escalation framework. What happens when signals suggest concern? Who has conversations? What's the tone and approach? Document this so it becomes consistent."),
    block("Pilot with one team before scaling. If you manage multiple teams or work in a larger organization, prove the approach works in one context before rolling it out more broadly."),

    block("Quarter 2 and Beyond: Optimization", "h3"),
    block("Review retention data. Compare the period after implementation to before. Are you seeing improvements? If not, why not?"),
    block("Gather feedback on what's working. Ask your team: Do the new connection rhythms help? Do one-on-ones feel more valuable? What would make this better?"),
    block("Iterate based on evidence. Proactive engagement isn't a fixed system—it's an evolving practice. What works for your team today may need adjustment as the team grows or changes."),

    block("Technology's Role: Enhancement, Not Replacement", "h2"),
    block("A note on tools. Technology can dramatically improve the scalability and consistency of proactive engagement. But it can also undermine the entire approach if implemented poorly."),

    block("What to look for in engagement technology", "h3"),
    block("Privacy-first design. The tool should analyze patterns, not content. No reading of private messages, no keystroke logging, no screenshot monitoring. If a tool requires surveillance to function, it's the wrong tool."),
    block("Pattern-based insights. You want aggregated trends and risk scores, not invasive monitoring. A good tool tells you 'Sarah's engagement signals have shifted over the past three weeks'—not 'Here's what Sarah said in her DMs.'"),
    block("Role-based access controls. Different people need different levels of visibility. A CEO needs different insights than a team lead. The tool should support appropriate access at each level."),
    block("Integration with existing tools. You don't want to add new workflows or platforms. The best engagement tools work with Slack, email, and calendars your team already uses."),

    block("The human element remains central", "h3"),
    block("Technology surfaces signals. Humans build relationships. Never forget which one actually solves the problem."),
    block("The goal of automation isn't to replace manager judgment—it's to free up manager time. If you're saving 8 hours per month on manual monitoring, reinvest those hours in actual connection with your team."),
    block("This is exactly why we built Yander. We believe managers deserve visibility into team health, and employees deserve support before burnout takes hold. Our approach monitors patterns—not content—to surface insights that help managers be more effective, not more intrusive."),

    block("Measuring Success", "h2"),
    block("How do you know if your proactive engagement system is working? Track these metrics."),
    block("Retention rate is the ultimate outcome metric. But it's lagging—by the time retention improves, you've been doing things right for months."),
    block("Time-to-intervention measures how early you're catching issues. Are you having supportive conversations in week two, or week twelve?"),
    block("Regrettable vs. non-regrettable turnover distinguishes between departures you want to prevent and those that are neutral or positive. Not all turnover is bad, but losing your best people is always costly."),
    block("Engagement survey trends show whether sentiment is improving over time. While surveys have limitations, they still provide useful directional data."),
    block("Manager confidence in team pulse is a qualitative but important indicator. Do managers feel like they understand their team, or are they guessing?"),

    block("The Proactive Leader Advantage", "h2"),
    block("Here's the bottom line: teams with proactive engagement systems outperform on every metric that matters. They retain more of their best people. They catch problems earlier. They create environments where people want to stay and contribute."),
    block("The approach we've outlined across this three-part series isn't complicated, but it requires intentionality. You have to choose to see what's happening on your team, even when remote work makes it easy to assume everything's fine."),
    block("To recap the series:"),
    block("The visibility problem is real. Remote work removes the signals that traditionally alerted us to disengagement. Without intentional effort, you won't see trouble until it's too late."),
    block("Signals exist if you know where to look. Communication patterns, participation trends, and work behaviors reveal engagement shifts weeks before they become resignations."),
    block("Proactive systems work. Continuous monitoring, regular connection rhythms, workload visibility, and psychological safety combine to create environments where disengagement is caught and addressed early."),
    block("The trillion-dollar blind spot doesn't have to stay blind. With the right approach and the right tools, you can build a team where the best people want to stay—because they feel seen, supported, and valued."),
    block("If you're ready to make the invisible visible while keeping privacy first, Yander might be right for your team. We'd love to show you how it works."),
  ],
}

async function seedContent() {
  console.log('Starting content seed...')

  const transaction = client.transaction()

  // Create or replace categories
  console.log('Creating categories...')
  for (const category of categories) {
    transaction.createOrReplace(category)
  }

  // Create or replace author
  console.log('Creating author...')
  transaction.createOrReplace(author)

  // Create or replace posts
  console.log('Creating blog posts...')
  transaction.createOrReplace(post1)
  transaction.createOrReplace(post2)
  transaction.createOrReplace(post3)

  // Commit the transaction
  console.log('Committing transaction...')
  const result = await transaction.commit()

  console.log('Content seeded successfully!')
  console.log('Created:')
  console.log('- 3 categories (Remote Leadership, Team Insights, Best Practices)')
  console.log('- 1 author (Yander Team)')
  console.log('- 3 blog posts')

  return result
}

seedContent()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Error seeding content:', err)
    process.exit(1)
  })
