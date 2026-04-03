export interface SalaryRange {
  low: number;
  median: number;
  high: number;
}

export interface RoleData {
  role: string;
  slug: string;
  salaries: Record<string, SalaryRange>;
}

export const countries = [
  { id: "brazil", label: "Brazil", flag: "🇧🇷" },
  { id: "colombia", label: "Colombia", flag: "🇨🇴" },
  { id: "argentina", label: "Argentina", flag: "🇦🇷" },
  { id: "south-africa", label: "South Africa", flag: "🇿🇦" },
  { id: "serbia", label: "Serbia", flag: "🇷🇸" },
] as const;

// Salaries reflect what you'd pay to attract and retain experienced,
// client-facing talent — above local market averages.
// Sources: PayScale, Howdy, Pnet, Glassdoor, plus first-hand hiring experience.

export const roles: RoleData[] = [
  // ✅ Software Engineer — looks correct
  {
    role: "Software Engineer",
    slug: "software-engineer",
    salaries: {
      "united-states": { low: 71000, median: 98000, high: 141000 },
      brazil: { low: 22000, median: 42000, high: 65000 },
      colombia: { low: 18000, median: 35000, high: 56000 },
      argentina: { low: 28000, median: 48000, high: 72000 },
      "south-africa": { low: 18000, median: 30000, high: 48000 },
      serbia: { low: 20000, median: 35000, high: 58000 },
    },
  },
  // ✅ Senior Software Engineer — looks correct
  {
    role: "Senior Software Engineer",
    slug: "senior-software-engineer",
    salaries: {
      "united-states": { low: 100000, median: 132000, high: 172000 },
      brazil: { low: 35000, median: 60000, high: 95000 },
      colombia: { low: 25000, median: 45000, high: 70000 },
      argentina: { low: 40000, median: 63000, high: 95000 },
      "south-africa": { low: 30000, median: 48000, high: 70000 },
      serbia: { low: 30000, median: 50000, high: 82000 },
    },
  },
  // Adjusted — UI/UX Designer needs bump, especially SA
  {
    role: "UI/UX Designer",
    slug: "ui-ux-designer",
    salaries: {
      "united-states": { low: 58000, median: 83000, high: 123000 },
      brazil: { low: 18000, median: 28000, high: 42000 },
      colombia: { low: 16000, median: 26000, high: 38000 },
      argentina: { low: 18000, median: 30000, high: 45000 },
      "south-africa": { low: 16000, median: 24000, high: 36000 },
      serbia: { low: 16000, median: 26000, high: 40000 },
    },
  },
  // Adjusted — Data Analyst SA low was $5k, unrealistic for good talent
  {
    role: "Data Analyst",
    slug: "data-analyst",
    salaries: {
      "united-states": { low: 51000, median: 70000, high: 95000 },
      brazil: { low: 16000, median: 27000, high: 40000 },
      colombia: { low: 14000, median: 25000, high: 40000 },
      argentina: { low: 18000, median: 32000, high: 50000 },
      "south-africa": { low: 14000, median: 24000, high: 36000 },
      serbia: { low: 16000, median: 26000, high: 40000 },
    },
  },
  // ✅ DevOps Engineer — looks correct
  {
    role: "DevOps Engineer",
    slug: "devops-engineer",
    salaries: {
      "united-states": { low: 76000, median: 115000, high: 162000 },
      brazil: { low: 25000, median: 48000, high: 75000 },
      colombia: { low: 20000, median: 38000, high: 60000 },
      argentina: { low: 30000, median: 52000, high: 78000 },
      "south-africa": { low: 22000, median: 36000, high: 55000 },
      serbia: { low: 22000, median: 40000, high: 65000 },
    },
  },
  // Adjusted — QA Engineer
  {
    role: "QA Engineer",
    slug: "qa-engineer",
    salaries: {
      "united-states": { low: 60000, median: 83000, high: 115000 },
      brazil: { low: 16000, median: 30000, high: 45000 },
      colombia: { low: 14000, median: 26000, high: 40000 },
      argentina: { low: 20000, median: 34000, high: 50000 },
      "south-africa": { low: 16000, median: 26000, high: 38000 },
      serbia: { low: 18000, median: 30000, high: 45000 },
    },
  },
  // Adjusted — Project Manager
  {
    role: "Project Manager",
    slug: "project-manager",
    salaries: {
      "united-states": { low: 56000, median: 83000, high: 123000 },
      brazil: { low: 18000, median: 32000, high: 52000 },
      colombia: { low: 16000, median: 28000, high: 42000 },
      argentina: { low: 22000, median: 38000, high: 55000 },
      "south-africa": { low: 16000, median: 28000, high: 48000 },
      serbia: { low: 18000, median: 30000, high: 42000 },
    },
  },
  // Adjusted — Account Manager
  {
    role: "Account Manager",
    slug: "account-manager",
    salaries: {
      "united-states": { low: 46000, median: 66000, high: 96000 },
      brazil: { low: 16000, median: 28000, high: 48000 },
      colombia: { low: 14000, median: 22000, high: 34000 },
      argentina: { low: 16000, median: 26000, high: 40000 },
      "south-africa": { low: 14000, median: 24000, high: 38000 },
      serbia: { low: 14000, median: 22000, high: 34000 },
    },
  },
  // Adjusted — Customer Support, bumped from $8k medians
  {
    role: "Customer Support",
    slug: "customer-support-representative",
    salaries: {
      "united-states": { low: 29000, median: 39000, high: 55000 },
      brazil: { low: 8000, median: 14000, high: 20000 },
      colombia: { low: 8000, median: 14000, high: 20000 },
      argentina: { low: 10000, median: 16000, high: 24000 },
      "south-africa": { low: 8000, median: 14000, high: 22000 },
      serbia: { low: 10000, median: 15000, high: 22000 },
    },
  },
  // Adjusted — Marketing Manager
  {
    role: "Marketing Manager",
    slug: "marketing-manager",
    salaries: {
      "united-states": { low: 51000, median: 76000, high: 113000 },
      brazil: { low: 18000, median: 28000, high: 42000 },
      colombia: { low: 16000, median: 24000, high: 36000 },
      argentina: { low: 16000, median: 26000, high: 38000 },
      "south-africa": { low: 16000, median: 28000, high: 45000 },
      serbia: { low: 14000, median: 24000, high: 34000 },
    },
  },
  // Adjusted — Media Buyer, Brazil was $14k median (your input: $18-28k)
  {
    role: "Media Buyer",
    slug: "digital-marketing-specialist",
    salaries: {
      "united-states": { low: 44000, median: 59000, high: 78000 },
      brazil: { low: 18000, median: 24000, high: 32000 },
      colombia: { low: 14000, median: 20000, high: 28000 },
      argentina: { low: 16000, median: 22000, high: 32000 },
      "south-africa": { low: 14000, median: 22000, high: 32000 },
      serbia: { low: 12000, median: 20000, high: 28000 },
    },
  },
  // Adjusted — Graphic Designer, $9k median in Brazil unrealistic for good talent
  {
    role: "Graphic Designer",
    slug: "graphic-designer",
    salaries: {
      "united-states": { low: 41000, median: 54000, high: 74000 },
      brazil: { low: 12000, median: 18000, high: 26000 },
      colombia: { low: 16000, median: 22000, high: 30000 },
      argentina: { low: 12000, median: 18000, high: 28000 },
      "south-africa": { low: 10000, median: 16000, high: 26000 },
      serbia: { low: 10000, median: 16000, high: 24000 },
    },
  },
  // Adjusted — Content Writer, $8k median way too low
  {
    role: "Content Writer",
    slug: "content-writer",
    salaries: {
      "united-states": { low: 41000, median: 59000, high: 88000 },
      brazil: { low: 12000, median: 18000, high: 26000 },
      colombia: { low: 10000, median: 16000, high: 24000 },
      argentina: { low: 14000, median: 20000, high: 30000 },
      "south-africa": { low: 12000, median: 18000, high: 26000 },
      serbia: { low: 10000, median: 16000, high: 24000 },
    },
  },
  // Adjusted — Executive Assistant
  {
    role: "Executive Assistant",
    slug: "executive-assistant",
    salaries: {
      "united-states": { low: 47000, median: 68000, high: 94000 },
      brazil: { low: 10000, median: 18000, high: 26000 },
      colombia: { low: 8000, median: 14000, high: 22000 },
      argentina: { low: 10000, median: 16000, high: 24000 },
      "south-africa": { low: 10000, median: 20000, high: 34000 },
      serbia: { low: 10000, median: 16000, high: 22000 },
    },
  },
  // Adjusted — SDR
  {
    role: "Sales Development Rep",
    slug: "sales-development-representative",
    salaries: {
      "united-states": { low: 40000, median: 51000, high: 67000 },
      brazil: { low: 10000, median: 16000, high: 24000 },
      colombia: { low: 8000, median: 14000, high: 22000 },
      argentina: { low: 10000, median: 18000, high: 28000 },
      "south-africa": { low: 10000, median: 18000, high: 28000 },
      serbia: { low: 10000, median: 16000, high: 22000 },
    },
  },
  // Adjusted — Copywriter
  {
    role: "Copywriter",
    slug: "copywriter",
    salaries: {
      "united-states": { low: 42000, median: 63000, high: 92000 },
      brazil: { low: 12000, median: 18000, high: 26000 },
      colombia: { low: 10000, median: 16000, high: 24000 },
      argentina: { low: 14000, median: 22000, high: 34000 },
      "south-africa": { low: 14000, median: 20000, high: 30000 },
      serbia: { low: 10000, median: 16000, high: 24000 },
    },
  },
  // Adjusted — Video Editor
  {
    role: "Video Editor",
    slug: "video-editor",
    salaries: {
      "united-states": { low: 41000, median: 60000, high: 90000 },
      brazil: { low: 12000, median: 18000, high: 26000 },
      colombia: { low: 16000, median: 22000, high: 30000 },
      argentina: { low: 12000, median: 20000, high: 30000 },
      "south-africa": { low: 10000, median: 16000, high: 24000 },
      serbia: { low: 10000, median: 16000, high: 22000 },
    },
  },
  // ✅ Web Developer — mostly fine, slight SA bump
  {
    role: "Web Developer",
    slug: "web-developer",
    salaries: {
      "united-states": { low: 49000, median: 71000, high: 100000 },
      brazil: { low: 16000, median: 26000, high: 38000 },
      colombia: { low: 14000, median: 26000, high: 40000 },
      argentina: { low: 18000, median: 34000, high: 52000 },
      "south-africa": { low: 14000, median: 22000, high: 34000 },
      serbia: { low: 16000, median: 28000, high: 44000 },
    },
  },
  // ✅ Bookkeeper — looks correct
  {
    role: "Bookkeeper",
    slug: "bookkeeper",
    salaries: {
      "united-states": { low: 32000, median: 46000, high: 65000 },
      brazil: { low: 6000, median: 12000, high: 18000 },
      colombia: { low: 6000, median: 10000, high: 16000 },
      argentina: { low: 8000, median: 14000, high: 22000 },
      "south-africa": { low: 8000, median: 16000, high: 24000 },
      serbia: { low: 8000, median: 14000, high: 18000 },
    },
  },
  // Adjusted — Social Media Manager
  {
    role: "Social Media Manager",
    slug: "social-media-manager",
    salaries: {
      "united-states": { low: 40000, median: 60000, high: 88000 },
      brazil: { low: 12000, median: 18000, high: 26000 },
      colombia: { low: 10000, median: 16000, high: 22000 },
      argentina: { low: 14000, median: 22000, high: 32000 },
      "south-africa": { low: 10000, median: 18000, high: 26000 },
      serbia: { low: 10000, median: 16000, high: 22000 },
    },
  },
  // NEW — Creative Strategist
  {
    role: "Creative Strategist",
    slug: "creative-strategist",
    salaries: {
      "united-states": { low: 55000, median: 78000, high: 110000 },
      brazil: { low: 22000, median: 30000, high: 38000 },
      colombia: { low: 20000, median: 28000, high: 36000 },
      argentina: { low: 22000, median: 30000, high: 38000 },
      "south-africa": { low: 20000, median: 28000, high: 36000 },
      serbia: { low: 18000, median: 26000, high: 34000 },
    },
  },
];
