"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useWaitlistModal } from "@/components/ui/WaitlistModal";
import { ArrowRight, MapPin, Search } from "lucide-react";

interface Role {
  title: string;
  category: string;
  salaryRange: string;
  regions: string[];
  description: string;
  skills: string[];
  hiredRecently: number;
}

const categories = [
  "All",
  "Engineering",
  "Marketing",
  "Design",
  "Operations",
  "Executive Assistants",
  "Finance",
  "Copywriting",
  "Customer Success",
];

const roles: Role[] = [
  {
    title: "Senior Full Stack Developer",
    category: "Engineering",
    salaryRange: "$36k - $60k/yr",
    regions: ["Brazil", "Argentina", "India"],
    description: "Build and maintain web applications using modern frameworks. Lead technical decisions and mentor junior developers.",
    skills: ["React", "Node.js", "PostgreSQL", "AWS"],
    hiredRecently: 84,
  },
  {
    title: "Senior Media Buyer",
    category: "Marketing",
    salaryRange: "$28k - $48k/yr",
    regions: ["Colombia", "Philippines", "South Africa"],
    description: "Plan and execute paid media campaigns across Google, Meta, and TikTok. Optimize ROAS and manage six-figure ad budgets.",
    skills: ["Google Ads", "Meta Ads", "Analytics", "CRO"],
    hiredRecently: 62,
  },
  {
    title: "Product Designer",
    category: "Design",
    salaryRange: "$30k - $50k/yr",
    regions: ["Brazil", "India", "South Africa"],
    description: "Design end-to-end product experiences from research through high-fidelity prototypes. Own the design system.",
    skills: ["Figma", "Design Systems", "UX Research", "Prototyping"],
    hiredRecently: 45,
  },
  {
    title: "Executive Assistant",
    category: "Executive Assistants",
    salaryRange: "$18k - $30k/yr",
    regions: ["South Africa", "Philippines", "Colombia"],
    description: "Manage executive calendars, travel, communications, and day-to-day operations. Be the right hand to founders and C-suite.",
    skills: ["Calendar Mgmt", "Travel", "Communication", "Notion"],
    hiredRecently: 103,
  },
  {
    title: "Backend Engineer",
    category: "Engineering",
    salaryRange: "$34k - $55k/yr",
    regions: ["India", "Brazil", "Argentina"],
    description: "Design and build APIs, microservices, and data pipelines. Ensure system reliability and performance at scale.",
    skills: ["Python", "Go", "PostgreSQL", "Docker"],
    hiredRecently: 71,
  },
  {
    title: "Performance Marketing Manager",
    category: "Marketing",
    salaryRange: "$30k - $50k/yr",
    regions: ["Colombia", "South Africa", "Philippines"],
    description: "Own the entire paid acquisition funnel. Drive growth through data-driven campaign strategy and budget allocation.",
    skills: ["Paid Social", "SEM", "Attribution", "A/B Testing"],
    hiredRecently: 38,
  },
  {
    title: "Senior Copywriter",
    category: "Copywriting",
    salaryRange: "$24k - $40k/yr",
    regions: ["South Africa", "Philippines", "Colombia"],
    description: "Write high-converting copy for landing pages, email sequences, ads, and brand campaigns. Understand direct response and brand voice.",
    skills: ["Direct Response", "Email", "Landing Pages", "Brand"],
    hiredRecently: 55,
  },
  {
    title: "Operations Manager",
    category: "Operations",
    salaryRange: "$28k - $45k/yr",
    regions: ["Philippines", "South Africa", "Colombia"],
    description: "Streamline business operations, manage processes, and coordinate cross-functional teams. Build SOPs and reporting systems.",
    skills: ["Process Design", "Project Mgmt", "Reporting", "SOPs"],
    hiredRecently: 42,
  },
  {
    title: "Mobile Developer (iOS/Android)",
    category: "Engineering",
    salaryRange: "$36k - $58k/yr",
    regions: ["Brazil", "India", "Argentina"],
    description: "Build and ship native or cross-platform mobile applications. Work closely with design and backend teams.",
    skills: ["React Native", "Swift", "Kotlin", "Firebase"],
    hiredRecently: 33,
  },
  {
    title: "UI/UX Designer",
    category: "Design",
    salaryRange: "$24k - $42k/yr",
    regions: ["Brazil", "Colombia", "India"],
    description: "Create intuitive user interfaces and seamless user experiences. Conduct user research and usability testing.",
    skills: ["Figma", "User Research", "Wireframing", "UI Design"],
    hiredRecently: 51,
  },
  {
    title: "Financial Analyst",
    category: "Finance",
    salaryRange: "$26k - $44k/yr",
    regions: ["South Africa", "India", "Philippines"],
    description: "Build financial models, analyze business performance, and support strategic decision-making with data-driven insights.",
    skills: ["Financial Modeling", "Excel", "Forecasting", "SQL"],
    hiredRecently: 28,
  },
  {
    title: "Customer Success Manager",
    category: "Customer Success",
    salaryRange: "$24k - $40k/yr",
    regions: ["South Africa", "Philippines", "Colombia"],
    description: "Own client relationships, drive retention, and ensure customers achieve their goals. Manage onboarding and QBRs.",
    skills: ["Account Mgmt", "Onboarding", "Retention", "CRM"],
    hiredRecently: 47,
  },
  {
    title: "DevOps Engineer",
    category: "Engineering",
    salaryRange: "$38k - $62k/yr",
    regions: ["India", "Brazil", "Argentina"],
    description: "Build and maintain CI/CD pipelines, infrastructure, and cloud environments. Ensure uptime and security.",
    skills: ["AWS", "Terraform", "Kubernetes", "CI/CD"],
    hiredRecently: 29,
  },
  {
    title: "Content Strategist",
    category: "Copywriting",
    salaryRange: "$22k - $38k/yr",
    regions: ["South Africa", "Philippines", "Colombia"],
    description: "Develop content strategy across blog, social, and email. Plan editorial calendars and measure content performance.",
    skills: ["SEO", "Editorial", "Social Media", "Analytics"],
    hiredRecently: 36,
  },
  {
    title: "Data Analyst",
    category: "Engineering",
    salaryRange: "$28k - $48k/yr",
    regions: ["India", "Brazil", "Philippines"],
    description: "Turn raw data into actionable insights. Build dashboards, run analyses, and support teams with data-driven recommendations.",
    skills: ["SQL", "Python", "Tableau", "Statistics"],
    hiredRecently: 58,
  },
  {
    title: "Graphic Designer",
    category: "Design",
    salaryRange: "$20k - $36k/yr",
    regions: ["Philippines", "Colombia", "South Africa"],
    description: "Create visual assets for marketing, social media, presentations, and brand collateral. Own visual identity execution.",
    skills: ["Photoshop", "Illustrator", "Branding", "Social"],
    hiredRecently: 67,
  },
  {
    title: "Virtual Assistant",
    category: "Executive Assistants",
    salaryRange: "$14k - $24k/yr",
    regions: ["Philippines", "South Africa", "Colombia"],
    description: "Handle administrative tasks, inbox management, scheduling, research, and data entry. Support founders and teams remotely.",
    skills: ["Admin", "Scheduling", "Research", "Data Entry"],
    hiredRecently: 124,
  },
  {
    title: "SEO Specialist",
    category: "Marketing",
    salaryRange: "$22k - $38k/yr",
    regions: ["India", "Philippines", "Colombia"],
    description: "Drive organic growth through technical SEO, content optimization, link building, and keyword strategy.",
    skills: ["Technical SEO", "Content SEO", "Ahrefs", "GSC"],
    hiredRecently: 41,
  },
];

function RoleCard({ role }: { role: Role }) {
  const { openModal } = useWaitlistModal();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200/60 shadow-soft hover:shadow-soft-lg transition-all duration-300 group"
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base font-semibold text-[#0a0a0a] group-hover:text-[#1e1044] transition-colors">
            {role.title}
          </h3>
          <span className="flex-shrink-0 px-2.5 py-1 bg-[#fafafa] border border-gray-200/60 text-xs font-medium text-gray-500">
            Remote
          </span>
        </div>

        {/* Salary */}
        <p className="text-lg font-bold text-[#0a0a0a] mb-3">{role.salaryRange}</p>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
          {role.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {role.skills.map((skill) => (
            <span key={skill} className="px-2 py-0.5 bg-[#fafafa] border border-gray-100 text-[11px] font-medium text-gray-500">
              {skill}
            </span>
          ))}
        </div>

        {/* Regions */}
        <div className="flex items-center gap-1.5 mb-4">
          <MapPin className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-xs text-gray-400">{role.regions.join(", ")}</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-400">{role.hiredRecently} hired recently</span>
          <button
            onClick={openModal}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1e1044] hover:text-[#0a0a0a] transition-colors"
          >
            View details
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function TalentPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { openModal } = useWaitlistModal();

  const filteredRoles = roles.filter((role) => {
    const matchesCategory = activeCategory === "All" || role.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const totalHired = roles.reduce((sum, r) => sum + r.hiredRecently, 0);

  return (
    <section className="pt-24 pb-24 md:pt-32 md:pb-32 bg-[#fafafa] min-h-screen">
      <Container>
        {/* Hero */}
        <div className="max-w-3xl mb-12">
          <h1 className="font-geist font-bold text-3xl sm:text-4xl md:text-5xl tracking-[-0.03em] text-[#0a0a0a] leading-[1.1]">
            Explore available
            <br />
            <span className="text-[#1e1044]">talent.</span>
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-xl">
            These are the roles Yander fills for companies. Pre-vetted, culture-matched professionals across Latin America, Southeast Asia, South Africa, and Eastern Europe.
          </p>

          {/* Stats */}
          <div className="flex items-center gap-8 mt-6">
            <div>
              <p className="text-2xl font-bold text-[#0a0a0a]">{roles.length}</p>
              <p className="text-xs text-gray-400">Role categories</p>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div>
              <p className="text-2xl font-bold text-[#0a0a0a]">{totalHired.toLocaleString()}+</p>
              <p className="text-xs text-gray-400">Hired recently</p>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div>
              <p className="text-2xl font-bold text-[#0a0a0a]">50%</p>
              <p className="text-xs text-gray-400">Average savings</p>
            </div>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="mb-8 space-y-4">
          {/* Search bar */}
          <div className="flex items-center gap-3 bg-white border border-gray-200/60 shadow-soft px-4 py-3 max-w-md">
            <Search className="w-4 h-4 text-gray-300" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search roles or skills..."
              className="flex-1 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none bg-transparent"
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-[#1e1044] text-white"
                    : "bg-white border border-gray-200/60 text-gray-500 hover:text-gray-900 hover:border-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-400">
            Showing <span className="text-gray-700 font-medium">{filteredRoles.length}</span> roles
          </p>
          <button
            onClick={openModal}
            className="text-sm font-medium text-[#1e1044] hover:text-[#0a0a0a] transition-colors"
          >
            Can&apos;t find what you need? Tell us &rarr;
          </button>
        </div>

        {/* Role grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + searchQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredRoles.map((role) => (
              <RoleCard key={role.title} role={role} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredRoles.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 mb-4">No roles found matching your criteria.</p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="text-sm font-medium text-[#1e1044]"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 bg-white border border-gray-200/60 shadow-soft p-8 md:p-12 text-center">
          <h2 className="font-bold text-2xl md:text-3xl text-[#0a0a0a] tracking-[-0.02em]">
            Ready to hire?
          </h2>
          <p className="mt-3 text-base text-gray-500 max-w-md mx-auto">
            Join the waitlist and be the first to access pre-vetted offshore talent through Yander.
          </p>
          <button
            onClick={openModal}
            className="mt-6 inline-flex items-center justify-center gap-2 font-medium bg-[#0a0a0a] text-white hover:bg-[#171717] px-8 py-4 text-base transition-all group"
          >
            Join The Waitlist
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </Container>
    </section>
  );
}
