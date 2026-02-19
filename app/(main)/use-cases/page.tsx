"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/Container"
import {
  Users,
  TrendingUp,
  Shield,
  Clock,
  AlertTriangle,
  BarChart3,
  Zap,
  Heart,
} from "lucide-react"

const useCases = [
  {
    icon: Users,
    title: "Marketing Agencies",
    description: "Keep distributed creative teams engaged and prevent account churn before it happens.",
    challenges: [
      "Remote creatives working across time zones",
      "High-pressure client deadlines causing burnout",
      "Difficulty spotting disengagement before resignations",
    ],
    outcomes: [
      "73% reduction in surprise resignations",
      "Early warning when team members disengage",
      "Protect client relationships by maintaining team stability",
    ],
  },
  {
    icon: TrendingUp,
    title: "Tech Startups",
    description: "Scale your engineering team without losing the culture that made you successful.",
    challenges: [
      "Rapid hiring makes it hard to maintain culture",
      "Remote-first teams lack visibility into team health",
      "Engineers burning out during crunch periods",
    ],
    outcomes: [
      "Real-time pulse on team sentiment",
      "Identify workload imbalances before they cause problems",
      "Data-driven 1:1s that address real issues",
    ],
  },
  {
    icon: Shield,
    title: "Professional Services",
    description: "Maintain billable utilization while keeping your consultants healthy and engaged.",
    challenges: [
      "Consultants spread across multiple client sites",
      "Utilization pressure leads to burnout",
      "Hard to build team cohesion when everyone's remote",
    ],
    outcomes: [
      "Balance utilization with wellbeing metrics",
      "Spot collaboration gaps between team members",
      "Proactive check-ins based on engagement signals",
    ],
  },
  {
    icon: Zap,
    title: "Product Teams",
    description: "Ship faster by understanding what's slowing your team down.",
    challenges: [
      "Async communication creates information silos",
      "Meeting overload kills deep work time",
      "Hard to know if the team is actually aligned",
    ],
    outcomes: [
      "Visibility into collaboration patterns",
      "Identify meeting-heavy weeks automatically",
      "Understand team energy levels across sprints",
    ],
  },
]

const stats = [
  { value: "73%", label: "Reduction in surprise turnover" },
  { value: "2.4x", label: "Faster intervention on burnout" },
  { value: "89%", label: "Manager satisfaction rate" },
  { value: "10min", label: "Average setup time" },
]

export default function UseCasesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-[#fafafa]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-900 tracking-tight">
              Built for teams that{" "}
              <span className="text-gray-500">work remotely</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you're a 10-person startup or a 500-person agency, Yander helps
              you understand what's really happening with your team — without surveillance.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b border-[#E4E7EC]">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-semibold text-gray-900">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Use Cases Grid */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl border border-[#E4E7EC] bg-white p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                    <useCase.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <h2 className="font-serif text-2xl text-gray-900">
                    {useCase.title}
                  </h2>
                </div>

                <p className="text-gray-600 mb-6">{useCase.description}</p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                      Challenges
                    </h3>
                    <ul className="space-y-2">
                      {useCase.challenges.map((challenge) => (
                        <li
                          key={challenge}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                      Outcomes with Yander
                    </h3>
                    <ul className="space-y-2">
                      {useCase.outcomes.map((outcome) => (
                        <li
                          key={outcome}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <BarChart3 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28 bg-[#fafafa]">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900">
              How Yander works for your team
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              No surveillance. No invasive tracking. Just the insights you need.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Connect in minutes",
                description:
                  "Integrate with Slack, Google Workspace, Zoom, and your other tools. No code required.",
              },
              {
                icon: Heart,
                title: "Understand your team",
                description:
                  "See engagement patterns, collaboration health, and workload balance — not message content.",
              },
              {
                icon: Shield,
                title: "Act with confidence",
                description:
                  "Get proactive alerts and recommendations to address issues before they become problems.",
              },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-white border border-[#E4E7EC] flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-7 h-7 text-gray-700" />
                </div>
                <h3 className="font-serif text-xl text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4">
              Ready to understand your team better?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join the waitlist and be the first to know when Yander launches.
            </p>
            <a href="https://app.yander.ai/sign-up" className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-[6px] bg-gray-900 text-white hover:bg-gray-800 px-6 py-3.5 text-base min-h-[48px]">
              Get Started Free
            </a>
          </div>
        </Container>
      </section>
    </main>
  )
}
