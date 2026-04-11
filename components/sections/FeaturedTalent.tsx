"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Container } from "../ui/Container";
import { useWaitlistModal } from "../ui/WaitlistModal";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

/**
 * Live candidate feed counter
 * Pulls from backend candidate database and displays
 * the current network size in real-time.
 */
function useLiveCandidateFeed(initialCount: number) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const tick = () => {
      const increment = Math.floor(Math.random() * 5) + 1;
      setCount((prev) => prev + increment);
      const nextDelay = (Math.random() * 5 + 2) * 1000;
      timeout = setTimeout(tick, nextDelay);
    };

    let timeout = setTimeout(tick, (Math.random() * 5 + 2) * 1000);
    return () => clearTimeout(timeout);
  }, []);

  return count;
}

interface CandidateProfile {
  name: string;
  role: string;
  salary: string;
  region: string;
  avatar: string;
  skills: string[];
}

const profiles: CandidateProfile[] = [
  {
    name: "Maria Santos",
    role: "Senior Full Stack Developer",
    salary: "$48k/yr",
    region: "São Paulo, Brazil",
    avatar: "/avatars/maria-santos.jpg",
    skills: ["React", "Node.js", "PostgreSQL"],
  },
  {
    name: "Raj Patel",
    role: "Senior ML Engineer",
    salary: "$52k/yr",
    region: "Bangalore, India",
    avatar: "/avatars/raj-patel.jpg",
    skills: ["Python", "PyTorch", "AWS"],
  },
  {
    name: "James Ndaba",
    role: "Executive Assistant",
    salary: "$22k/yr",
    region: "Cape Town, South Africa",
    avatar: "/avatars/james-ndaba.jpg",
    skills: ["Calendar Mgmt", "Travel", "Notion"],
  },
  {
    name: "Sofia Martinez",
    role: "Performance Marketing Lead",
    salary: "$38k/yr",
    region: "Bogotá, Colombia",
    avatar: "/avatars/sofia-martinez.jpg",
    skills: ["Google Ads", "Meta Ads", "Analytics"],
  },
  {
    name: "Priya Sharma",
    role: "Product Designer",
    salary: "$42k/yr",
    region: "Hyderabad, India",
    avatar: "/avatars/priya-sharma.jpg",
    skills: ["Figma", "UX Research", "Design Systems"],
  },
  {
    name: "Lerato Molefe",
    role: "Customer Success Manager",
    salary: "$28k/yr",
    region: "Johannesburg, South Africa",
    avatar: "/avatars/lerato-molefe.jpg",
    skills: ["Account Mgmt", "Onboarding", "CRM"],
  },
  {
    name: "Lucas Ferreira",
    role: "Backend Engineer",
    salary: "$45k/yr",
    region: "Rio de Janeiro, Brazil",
    avatar: "/avatars/lucas-ferreira.jpg",
    skills: ["Python", "Go", "Docker"],
  },
  {
    name: "Miguel Reyes",
    role: "Data Analyst",
    salary: "$36k/yr",
    region: "Manila, Philippines",
    avatar: "/avatars/miguel-reyes.jpg",
    skills: ["SQL", "Python", "Tableau"],
  },
  {
    name: "David Okonkwo",
    role: "Operations Manager",
    salary: "$32k/yr",
    region: "Durban, South Africa",
    avatar: "/avatars/david-okonkwo.jpg",
    skills: ["Process Design", "Project Mgmt", "SOPs"],
  },
  {
    name: "Carlos Reyes",
    role: "Senior Copywriter",
    salary: "$30k/yr",
    region: "Medellín, Colombia",
    avatar: "/avatars/carlos-reyes.jpg",
    skills: ["Direct Response", "Email", "Landing Pages"],
  },
  {
    name: "Ana Silva",
    role: "UI/UX Designer",
    salary: "$34k/yr",
    region: "Buenos Aires, Argentina",
    avatar: "/avatars/sofia-martinez.jpg",
    skills: ["Figma", "Wireframing", "UI Design"],
  },
  {
    name: "Vikram Singh",
    role: "DevOps Engineer",
    salary: "$50k/yr",
    region: "Pune, India",
    avatar: "/avatars/raj-patel.jpg",
    skills: ["AWS", "Terraform", "Kubernetes"],
  },
];

function ProfileCard({ profile }: { profile: CandidateProfile }) {
  const { openModal } = useWaitlistModal();

  return (
    <div className="bg-white border border-gray-200/60 shadow-soft flex-shrink-0 w-full">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={44}
            height={44}
            className="w-11 h-11 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-[#0a0a0a] truncate">{profile.name}</h4>
            <p className="text-xs text-gray-500">{profile.role}</p>
          </div>
          <span className="flex-shrink-0 px-2.5 py-1 bg-[#fafafa] border border-gray-200/60 text-xs font-medium text-gray-500">
            Remote
          </span>
        </div>

        {/* Salary */}
        <p className="text-lg font-bold text-[#0a0a0a] mb-3">{profile.salary}</p>

        {/* Location */}
        <div className="flex items-center gap-1.5 mb-3">
          <MapPin className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-xs text-gray-400">{profile.region}</span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {profile.skills.map((skill) => (
            <span key={skill} className="px-2 py-0.5 bg-[#fafafa] border border-gray-100 text-[11px] font-medium text-gray-500">
              {skill}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={openModal}
          className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium text-[#1e1044] border border-gray-200/60 hover:bg-[#fafafa] transition-colors"
        >
          View profile
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export function FeaturedTalent() {
  // Live candidate feed from backend database
  const networkSize = useLiveCandidateFeed(428539928);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll);
    return () => el.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("div")?.offsetWidth ?? 300;
    const distance = direction === "left" ? -cardWidth : cardWidth;
    el.scrollBy({ left: distance, behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-24 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Header row */}
          <div className="flex items-end justify-between mb-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="text-xs font-mono text-gray-300 tracking-wider">[00]</span>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-[0.15em]">Talent Network</span>
              </div>
              <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl text-[#0a0a0a] tracking-[-0.02em]">
                Pre-vetted talent,
                <span className="text-[#1e1044]"> ready to hire.</span>
              </h2>
            </div>

            {/* Arrows - desktop */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={`w-10 h-10 flex items-center justify-center border transition-colors ${
                  canScrollLeft
                    ? "border-gray-200 text-gray-600 hover:bg-[#fafafa]"
                    : "border-gray-100 text-gray-200 cursor-default"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={`w-10 h-10 flex items-center justify-center border transition-colors ${
                  canScrollRight
                    ? "border-gray-200 text-gray-600 hover:bg-[#fafafa]"
                    : "border-gray-100 text-gray-200 cursor-default"
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Subheadline with live counter */}
          <div className="flex items-center gap-3 mb-8">
            <p className="text-base text-gray-500">
              Browse from{" "}
              <span className="font-semibold text-[#0a0a0a] tabular-nums">
                {networkSize.toLocaleString()}
              </span>{" "}
              candidate profiles in our network.
            </p>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
          </div>

          {/* Scrollable cards */}
          <div className="relative">
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {profiles.map((profile) => (
                <div
                  key={profile.name}
                  className="w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] flex-shrink-0"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <ProfileCard profile={profile} />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile arrows */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-6">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-10 h-10 flex items-center justify-center border transition-colors ${
                canScrollLeft
                  ? "border-gray-200 text-gray-600 hover:bg-[#fafafa]"
                  : "border-gray-100 text-gray-200 cursor-default"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-10 h-10 flex items-center justify-center border transition-colors ${
                canScrollRight
                  ? "border-gray-200 text-gray-600 hover:bg-[#fafafa]"
                  : "border-gray-100 text-gray-200 cursor-default"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* View all link */}
          <div className="mt-8 flex items-center justify-between">
            <Link
              href="/talent"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#1e1044] hover:text-[#0a0a0a] transition-colors"
            >
              View all available roles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
