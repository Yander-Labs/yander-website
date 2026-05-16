"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { useDemoModal } from "@/components/ui/DemoModal";
import { ArrowRight, Search, MapPin, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { CaseStudyHayes } from "@/components/sections/CaseStudyHayes";

// ─── Design tokens (Cal.com inspired) ───
const t = {
  charcoal: "#242424",
  midnight: "#111111",
  midGray: "#898989",
  lightGray: "#f5f5f5",
  white: "#ffffff",
  accent: "#1e1044", // Deep purple
  // Multi-layered shadow system
  shadowCard: "rgba(19,19,22,0.7) 0px 1px 5px -4px, rgba(34,42,53,0.08) 0px 0px 0px 1px, rgba(34,42,53,0.05) 0px 4px 8px",
  shadowCardHover: "rgba(19,19,22,0.7) 0px 2px 8px -4px, rgba(34,42,53,0.1) 0px 0px 0px 1px, rgba(34,42,53,0.08) 0px 8px 16px",
  shadowButton: "rgba(19,19,22,0.7) 0px 1px 5px -4px, rgba(34,42,53,0.08) 0px 0px 0px 1px, rgba(255,255,255,0.15) 0px 2px 0px inset",
};

// ─── Live candidate feed ───
function useLiveCandidateFeed() {
  const baseCount = 428539928;
  const baseTime = new Date("2026-04-10T00:00:00Z").getTime();
  const ratePerMs = 0.0007;
  const getCount = () => Math.floor(baseCount + (Date.now() - baseTime) * ratePerMs);
  const [count, setCount] = useState(getCount);

  useEffect(() => {
    const tick = () => {
      setCount(getCount());
      timeout = setTimeout(tick, (Math.random() * 5 + 2) * 1000);
    };
    let timeout = setTimeout(tick, (Math.random() * 5 + 2) * 1000);
    return () => clearTimeout(timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return count;
}

// ─── Typewriter for search demo ───
const searchQueries = [
  "Senior Full Stack Developer in Brazil",
  "Performance Marketing Lead, anywhere",
  "Product Designer in the UK",
  "Executive Assistant in Philippines",
  "Senior Software Engineer in the US",
];

function useTypewriter() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");

  const tick = useCallback(() => {
    const full = searchQueries[index];
    if (phase === "typing") {
      if (text.length < full.length) setText(full.slice(0, text.length + 1));
      else setPhase("pause");
    } else if (phase === "deleting") {
      if (text.length > 0) setText(text.slice(0, -1));
      else { setIndex((i) => (i + 1) % searchQueries.length); setPhase("typing"); }
    }
  }, [phase, text, index]);

  useEffect(() => {
    if (phase === "pause") {
      const t = setTimeout(() => setPhase("deleting"), 2500);
      return () => clearTimeout(t);
    }
    const delay = phase === "typing" ? 45 + Math.random() * 25 : 18;
    const t = setTimeout(tick, delay);
    return () => clearTimeout(t);
  }, [tick, phase]);

  return text;
}

// ─── Candidate profiles ───
interface Profile {
  name: string; role: string; salary: string; region: string; avatar: string; skills: string[];
}

const profiles: Profile[] = [
  { name: "Sarah Chen", role: "Senior Full Stack Engineer", salary: "$135k/yr", region: "San Francisco, USA", avatar: "/avatars/Sarah-chen.png", skills: ["React", "TypeScript", "AWS"] },
  { name: "Lucas Ferreira", role: "Senior Backend Engineer", salary: "$58k/yr", region: "São Paulo, Brazil", avatar: "/avatars/lucas-ferreira.jpg", skills: ["Python", "Go", "PostgreSQL"] },
  { name: "Marcus Johnson", role: "Senior Product Designer", salary: "$95k/yr", region: "Toronto, Canada", avatar: "/avatars/marcus-johnson.png", skills: ["Figma", "Design Systems"] },
  { name: "Sofia Martinez", role: "Performance Marketing Lead", salary: "$38k/yr", region: "Bogotá, Colombia", avatar: "/avatars/sofia-martinez.jpg", skills: ["Google Ads", "Meta Ads"] },
  { name: "Raj Patel", role: "Senior ML Engineer", salary: "$52k/yr", region: "Bangalore, India", avatar: "/avatars/raj-patel.jpg", skills: ["Python", "PyTorch", "AWS"] },
  { name: "Lerato Molefe", role: "Customer Success Manager", salary: "$28k/yr", region: "Johannesburg, South Africa", avatar: "/avatars/lerato-molefe.jpg", skills: ["Onboarding", "CRM"] },
  { name: "Emily Rodriguez", role: "Senior Copywriter", salary: "$85k/yr", region: "Austin, USA", avatar: "/avatars/emily-rodriguez.png", skills: ["Direct Response", "Brand"] },
  { name: "Priya Sharma", role: "Product Designer", salary: "$42k/yr", region: "Hyderabad, India", avatar: "/avatars/priya-sharma.jpg", skills: ["Figma", "UX Research"] },
];

// ─── Feature data ───
const features = [
  { num: "01", title: "AI-Powered Sourcing", body: "Our agent analyzes your job requirements and surfaces candidates that match on skills, experience, and work style. Not keyword matching. Real understanding of who you need." },
  { num: "02", title: "Culture Fit Assessment", body: "Candidates complete structured assessments that help you evaluate remote work readiness, communication style, self-management, and collaboration preferences." },
  { num: "03", title: "Candidate Evaluation Tools", body: "Structured resume reviews, skills assessments, and personality profiles. Candidates are organized by relevance so you can focus your time on the best fits." },
  { num: "04", title: "Candidate Assessment Forms", body: "Already getting inbound candidates? Send them to a Yander assessment form. They complete structured evaluations so you can review organized, comparable profiles." },
];

// ─── How it works ───
const steps = [
  { num: "01", title: "Tell Yander who you need", body: "Paste a job description or build one with Yander. Define the role, skills, budget, and the culture you want." },
  { num: "02", title: "AI does the heavy lifting", body: "Yander's agent searches global talent pools, surfaces qualified candidates, and runs structured assessments to help you evaluate them." },
  { num: "03", title: "Interview the best candidates", body: "Every person you talk to has been sourced, assessed, and organized by relevance to your needs. You make the final call." },
];

// ─── Components ───

function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <Link
      href="/pricing"
      className="block bg-white flex-shrink-0 w-full cursor-pointer transition-shadow duration-200 border border-gray-200"
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#d4d4d4"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = ""; }}
    >
      <div className="p-3.5">
        <div className="flex items-start gap-2.5 mb-2.5">
          <Image src={profile.avatar} alt={profile.name} width={36} height={36} className="w-9 h-9 rounded-full object-cover" />
          <div className="flex-1 min-w-0">
            <h4 className="text-[13px] font-semibold truncate" style={{ color: t.charcoal }}>{profile.name}</h4>
            <p className="text-[11px] truncate" style={{ color: t.midGray }}>{profile.role}</p>
          </div>
        </div>
        <p className="text-sm font-bold mb-2" style={{ color: t.charcoal }}>{profile.salary}</p>
        <div className="flex items-center gap-1 mb-2">
          <MapPin className="w-3 h-3" style={{ color: "#d4d4d4" }} />
          <span className="text-[11px] truncate" style={{ color: t.midGray }}>{profile.region}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {profile.skills.slice(0, 2).map((s) => (
            <span key={s} className="px-1.5 py-0.5 text-[10px] font-medium rounded-none" style={{ color: t.midGray, backgroundColor: t.lightGray }}>{s}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}

function TalentSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const check = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 0);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    check();
    el.addEventListener("scroll", check);
    return () => el.removeEventListener("scroll", check);
  }, [check]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const w = el.querySelector("div")?.offsetWidth ?? 300;
    el.scrollBy({ left: dir === "left" ? -w : w, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth py-1 -my-1" style={{ scrollSnapType: "x mandatory" }}>
        {profiles.map((p) => (
          <div key={p.name} className="w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)] flex-shrink-0" style={{ scrollSnapAlign: "start" }}>
            <ProfileCard profile={p} />
          </div>
        ))}
      </div>
      {/* Arrows */}
      <div className="flex items-center gap-2 mt-6 justify-end">
        <button onClick={() => scroll("left")} disabled={!canLeft}
          className={`w-10 h-10 flex items-center justify-center rounded-none transition-colors ${canLeft ? "hover:bg-gray-100" : ""}`}
          style={{ boxShadow: canLeft ? t.shadowCard : "none", opacity: canLeft ? 1 : 0.3 }}>
          <ChevronLeft className="w-5 h-5" style={{ color: t.charcoal }} />
        </button>
        <button onClick={() => scroll("right")} disabled={!canRight}
          className={`w-10 h-10 flex items-center justify-center rounded-none transition-colors ${canRight ? "hover:bg-gray-100" : ""}`}
          style={{ boxShadow: canRight ? t.shadowCard : "none", opacity: canRight ? 1 : 0.3 }}>
          <ChevronRight className="w-5 h-5" style={{ color: t.charcoal }} />
        </button>
      </div>
    </div>
  );
}

function StickyFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setActiveIndex(Math.min(features.length - 1, Math.floor(latest * features.length)));
  });

  return (
    <section ref={containerRef} className="relative" style={{ height: `${features.length * 100}vh`, backgroundColor: t.lightGray }}>
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        <div className="pt-24 pb-10">
          <Container>
            <p className="text-xs font-medium uppercase tracking-[0.15em] mb-4" style={{ color: t.midGray }}>Platform</p>
            <h2 className="font-geist font-bold text-3xl md:text-4xl lg:text-[48px] leading-[1.1] tracking-tight" style={{ color: t.charcoal }}>
              Every step of hiring, handled.
            </h2>
            {/* Tabs */}
            <div className="flex mt-10 border-b" style={{ borderColor: "rgba(34,42,53,0.08)" }}>
              {features.map((f, i) => (
                <div key={f.num} className={`flex-1 pb-3 text-center text-sm font-medium transition-all border-b-2 ${
                  i === activeIndex ? "border-current" : "border-transparent"
                }`} style={{ color: i === activeIndex ? t.accent : t.midGray }}>
                  <span className="hidden sm:inline">{f.title}</span>
                  <span className="sm:hidden">{f.num}</span>
                </div>
              ))}
            </div>
          </Container>
        </div>

        <div className="flex-1 relative">
          {features.map((f, i) => (
            <motion.div key={f.num} className="absolute inset-0 px-4"
              style={{ opacity: useTransform(scrollYProgress,
                [Math.max(0, (i - 0.3) / features.length), i / features.length, (i + 0.7) / features.length, Math.min(1, (i + 1) / features.length)],
                [0, 1, 1, i === features.length - 1 ? 1 : 0]) }}>
              <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
                  <div>
                    <span className="text-xs font-mono tracking-wider" style={{ color: "#d4d4d4" }}>{f.num}</span>
                    <h3 className="mt-3 font-geist font-bold text-2xl md:text-3xl tracking-tight" style={{ color: t.charcoal }}>{f.title}</h3>
                    <p className="mt-4 text-base leading-relaxed max-w-md" style={{ color: t.midGray }}>{f.body}</p>
                  </div>
                  <div className="p-8 rounded-none" style={{ backgroundColor: t.white, boxShadow: t.shadowCard }}>
                    {i === 0 && (
                      <div className="space-y-4">
                        {[{ label: "Technical skills", score: 96 }, { label: "Experience", score: 92 }, { label: "Communication", score: 88 }, { label: "Culture fit", score: 94 }].map((item) => (
                          <div key={item.label}>
                            <div className="flex justify-between mb-1.5">
                              <span className="text-sm" style={{ color: t.midGray }}>{item.label}</span>
                              <span className="text-sm font-medium" style={{ color: t.charcoal }}>{item.score}%</span>
                            </div>
                            <div className="h-1.5 rounded-full" style={{ backgroundColor: t.lightGray }}>
                              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${item.score}%`, backgroundColor: t.accent }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {i === 1 && (
                      <div className="space-y-3">
                        {["Remote work readiness", "Communication style", "Work ethic alignment", "Team collaboration", "Self-management"].map((trait) => (
                          <div key={trait} className="flex items-center justify-between py-2 border-b" style={{ borderColor: t.lightGray }}>
                            <span className="text-sm" style={{ color: t.midGray }}>{trait}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs" style={{ color: "#d4d4d4" }}>Passed</span>
                              <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: t.lightGray }}>
                                <Check className="w-3 h-3" style={{ color: t.charcoal }} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {i === 2 && (
                      <div className="space-y-3">
                        {["Resume review", "Skills assessment", "Personality profile", "Culture fit report", "Ready for your review"].map((step, si) => (
                          <div key={step} className="flex items-center gap-3 py-2">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: si < 4 ? t.lightGray : "transparent", border: si === 4 ? `2px solid ${t.charcoal}` : "none" }}>
                              {si < 4 ? <Check className="w-3 h-3" style={{ color: t.charcoal }} /> : <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: t.accent }} />}
                            </div>
                            <span className="text-sm" style={{ color: si === 4 ? t.charcoal : t.midGray, fontWeight: si === 4 ? 500 : 400 }}>{step}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {i === 3 && (
                      <div>
                        {[{ field: "Personal details", pct: 100 }, { field: "Work experience", pct: 100 }, { field: "Technical assessment", pct: 100 }, { field: "Culture & personality", pct: 75 }].map((item) => (
                          <div key={item.field} className="mb-4">
                            <div className="flex justify-between mb-1.5">
                              <span className="text-sm" style={{ color: t.midGray }}>{item.field}</span>
                              <span className="text-xs" style={{ color: "#d4d4d4" }}>{item.pct}%</span>
                            </div>
                            <div className="h-1.5 rounded-full" style={{ backgroundColor: t.lightGray }}>
                              <div className="h-full rounded-full" style={{ width: `${item.pct}%`, backgroundColor: t.accent }} />
                            </div>
                          </div>
                        ))}
                        <div className="pt-4 border-t flex justify-between items-center" style={{ borderColor: t.lightGray }}>
                          <span className="text-sm" style={{ color: t.midGray }}>Overall progress</span>
                          <span className="text-lg font-bold" style={{ color: t.charcoal }}>94%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Container>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main page ───

export function V2HomePage() {
  const { openModal: openDemoModal } = useDemoModal();
  const networkSize = useLiveCandidateFeed();
  const typewriterText = useTypewriter();

  return (
    <main>
      {/* ── Hero ── */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-28" style={{ backgroundColor: t.white }}>
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="font-geist font-bold text-[40px] sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.1] tracking-tight"
              style={{ color: t.charcoal }}
            >
              The first AI agent that{" "}
              <span style={{ color: t.accent }}>recruits for you.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-lg md:text-xl leading-relaxed max-w-xl mx-auto"
              style={{ color: t.midGray }}
            >
              Tell Yander who you need to hire. It headhunts, evaluates, and presents culture-matched candidates ready to interview.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <Link href="/pricing"
                className="inline-flex items-center justify-center gap-2 font-medium text-white px-8 py-4 text-base min-h-[52px] rounded-none transition-opacity hover:opacity-80 group w-full sm:w-auto"
                style={{ backgroundColor: t.accent, boxShadow: t.shadowButton }}>
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <button onClick={openDemoModal}
                className="inline-flex items-center justify-center font-medium px-8 py-4 text-base min-h-[52px] rounded-none transition-shadow w-full sm:w-auto"
                style={{ color: t.charcoal, backgroundColor: t.white, boxShadow: t.shadowCard }}>
                Book a Demo
              </button>
            </motion.div>

            {/* Role pills */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {["Software Engineering", "Performance Marketing", "Copywriting", "Design", "Executive Assistants", "Operations", "& More"].map((role) => (
                <span key={role} className="px-3 py-1.5 text-xs font-medium"
                  style={{ color: t.midGray, backgroundColor: t.lightGray }}>
                  {role}
                </span>
              ))}
            </motion.div>
          </div>

        </Container>
      </section>

      {/* ── Talent slider ── */}
      <section className="py-20 md:py-24" style={{ backgroundColor: t.white }}>
        <Container>
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="font-geist font-bold text-2xl md:text-3xl lg:text-[40px] tracking-tight" style={{ color: t.charcoal }}>
                Top talent, <span style={{ color: t.accent }}>ready to hire.</span>
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-3 mb-8">
            <p className="text-base" style={{ color: t.midGray }}>
              Access{" "}
              <span className="font-semibold tabular-nums" style={{ color: t.charcoal }}>{networkSize.toLocaleString()}</span>{" "}
              candidate profiles in our network.
            </p>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
          </div>
          <TalentSlider />
        </Container>
      </section>

      {/* ── How it works ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: t.lightGray }}>
        <Container>
          <div className="text-center mb-20">
            <p className="text-xs font-medium uppercase tracking-[0.15em] mb-4" style={{ color: t.midGray }}>How it works</p>
            <h2 className="font-geist font-bold text-3xl md:text-4xl lg:text-[48px] leading-[1.1] tracking-tight" style={{ color: t.charcoal }}>
              From job post to interview.<br />
              <span style={{ color: t.accent }}>No recruiters needed.</span>
            </h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {steps.map((step, i) => (
              <motion.div key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="p-8 md:p-10 rounded-none"
                style={{ backgroundColor: t.white, boxShadow: t.shadowCard }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono" style={{ color: "#d4d4d4" }}>{step.num}</span>
                  <div className="h-px flex-1" style={{ backgroundColor: t.lightGray }} />
                </div>
                <h3 className="font-geist font-bold text-xl md:text-2xl tracking-tight" style={{ color: t.charcoal }}>{step.title}</h3>
                <p className="mt-3 text-base leading-relaxed max-w-lg" style={{ color: t.midGray }}>{step.body}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Features (sticky scroll) ── */}
      <StickyFeatures />

      {/* ── Cost comparison ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: t.white }}>
        <Container>
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] mb-4" style={{ color: t.midGray }}>Why Yander</p>
              <h2 className="font-geist font-bold text-3xl md:text-4xl lg:text-[48px] leading-[1.1] tracking-tight" style={{ color: t.charcoal }}>
                Fill roles faster.<br />
                <span style={{ color: t.accent }}>For less.</span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed max-w-md" style={{ color: t.midGray }}>
                AI sourcing reaches candidates outside your hiring funnel — more qualified people, faster, at a fraction of traditional cost.
              </p>
              <div className="mt-10 space-y-5">
                {[
                  { title: "More candidates", body: "AI surfaces passive talent your inbound and network would never reach." },
                  { title: "Faster", body: "Interview-ready candidates land in your inbox within days, not weeks." },
                  { title: "Cost-effective", body: "Free to start. Paid plans from $89/mo. No placement fees, ever." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex-shrink-0 w-1 self-stretch" style={{ backgroundColor: t.accent }} />
                    <div>
                      <p className="text-sm font-semibold" style={{ color: t.charcoal }}>{item.title}</p>
                      <p className="mt-1 text-sm leading-relaxed max-w-sm" style={{ color: t.midGray }}>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-col sm:flex-row items-start gap-3">
                <Link href="/pricing"
                  className="inline-flex items-center justify-center gap-2 font-medium text-white px-8 py-4 text-base min-h-[52px] rounded-none transition-opacity hover:opacity-80 group w-full sm:w-auto"
                  style={{ backgroundColor: t.accent, boxShadow: t.shadowButton }}>
                  Get Started Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link href="/pricing"
                  className="inline-flex items-center justify-center font-medium px-8 py-4 text-base min-h-[52px] rounded-none transition-shadow w-full sm:w-auto"
                  style={{ color: t.charcoal, backgroundColor: t.white, boxShadow: t.shadowCard }}>
                  See full pricing
                </Link>
              </div>
            </div>
            <div className="p-8 rounded-none" style={{ backgroundColor: t.lightGray }}>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { val: "Free", label: "200 candidates to try" },
                  { val: "$89/mo", label: "Pro · 500 candidates/mo" },
                  { val: "$249/mo", label: "Max · Unlimited candidates" },
                  { val: "$0", label: "Placement fees, ever" },
                ].map((s) => (
                  <div key={s.label} className="p-5 rounded-none" style={{ backgroundColor: t.white, boxShadow: t.shadowCard }}>
                    <p className="text-2xl font-bold" style={{ color: t.charcoal }}>{s.val}</p>
                    <p className="text-xs mt-1" style={{ color: t.midGray }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Case study: Hayes Media ── */}
      <CaseStudyHayes />

      {/* ── Bottom CTA ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: t.accent }}>
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-geist font-bold text-3xl md:text-4xl lg:text-[48px] leading-[1.1] tracking-tight text-white">
              Hires your funnel can&apos;t reach.
            </h2>
            <p className="mt-6 text-lg leading-relaxed max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
              AI sourcing brings in qualified candidates outside your network. More options, faster, more cost-effective to fill roles. Start free with your first 200 sourced candidates.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/pricing"
                className="inline-flex items-center justify-center gap-2 font-medium px-8 py-4 text-base min-h-[52px] rounded-none transition-opacity hover:opacity-90 group w-full sm:w-auto"
                style={{ backgroundColor: t.white, color: t.charcoal }}>
                Get Started Free <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <button onClick={openDemoModal}
                className="inline-flex items-center justify-center font-medium px-8 py-4 text-base min-h-[52px] rounded-none transition-colors text-white border border-white/20 hover:bg-white/10 w-full sm:w-auto">
                Book a Demo
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: t.white }}>
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-geist font-bold text-3xl md:text-4xl lg:text-[48px] tracking-tight" style={{ color: t.charcoal }}>
                Your questions, answered.
              </h2>
            </div>
            <div className="rounded-none" style={{ boxShadow: t.shadowCard }}>
              <FAQ />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

// ─── FAQ accordion ───
const faqs = [
  { q: "Why use Yander to hire?", a: "Yander is AI sourcing software. Our agent surfaces qualified candidates outside your inbound and network, helps you evaluate them with structured assessments, and gets you interview-ready people in days. Used by hiring teams and recruiters alike. Start free with your first 200 candidates — paid plans from $89/month." },
  { q: "What countries do you source from?", a: "We source candidates worldwide — including the US, Canada, UK, Australia, South America, Europe, South Africa, and Southeast Asia. Whether you want premium native-English expertise or cost-effective talent (where you can save 40-70% versus US rates), our AI surfaces strong candidates wherever they are." },
  { q: "How does the AI sourcing work?", a: "You provide a job description or build one with Yander. Our AI agent searches talent pools and surfaces candidates that match on technical skills, experience, and company culture. Candidates complete structured assessments so you can evaluate them efficiently." },
  { q: "How fast do I get candidates?", a: "Most roles have candidates ready for your review within days. The AI agent works continuously. No waiting on a recruiter's schedule." },
  { q: "How much does Yander cost?", a: "Free to start — your first 200 sourced candidates are on us. Pro is $89/month for 500 sourced candidates per month, and Max is $249/month for unlimited. No placement fees, no contracts, cancel anytime." },
  { q: "Is Yander available now?", a: "Yes. Get started free with your first 200 sourced candidates — no credit card required. Paid plans start at $89/month." },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div className="px-6 md:px-8">
      {faqs.map((faq, i) => (
        <div key={i} className="border-b last:border-b-0" style={{ borderColor: t.lightGray }}>
          <button onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full py-6 flex items-center justify-between text-left group">
            <span className="text-base font-medium pr-8 transition-colors group-hover:opacity-60" style={{ color: t.charcoal }}>{faq.q}</span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
              style={{ backgroundColor: openIndex === i ? t.charcoal : t.lightGray }}>
              <svg className={`w-4 h-4 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                style={{ color: openIndex === i ? t.white : t.midGray }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }} className="overflow-hidden">
                <p className="pb-6 text-sm leading-relaxed pr-12 max-w-2xl" style={{ color: t.midGray }}>{faq.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
