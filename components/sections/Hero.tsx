"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Container } from "../ui/Container";
import { useWaitlistModal } from "../ui/WaitlistModal";
import { useDemoModal } from "../ui/DemoModal";
import { ArrowRight, Search } from "lucide-react";

interface Candidate {
  name: string;
  role: string;
  location: string;
  match: number;
  avatar: string;
}

interface SearchQuery {
  text: string;
  filters: string[];
  candidates: Candidate[];
}

const searches: SearchQuery[] = [
  {
    text: "Senior Media Buyer in South America",
    filters: ["Google Ads", "Meta Ads", "Analytics"],
    candidates: [
      { name: "Maria Santos", role: "Senior Media Buyer", location: "São Paulo, Brazil", match: 96, avatar: "/avatars/maria-santos.jpg" },
      { name: "Lucas Ferreira", role: "Performance Marketing Lead", location: "Rio de Janeiro, Brazil", match: 93, avatar: "/avatars/lucas-ferreira.jpg" },
      { name: "Sofia Martinez", role: "Paid Media Strategist", location: "Bogotá, Colombia", match: 89, avatar: "/avatars/sofia-martinez.jpg" },
    ],
  },
  {
    text: "Senior AI Engineer in Southeast Asia",
    filters: ["Python", "PyTorch", "LLMs"],
    candidates: [
      { name: "Raj Patel", role: "Senior ML Engineer", location: "Bangalore, India", match: 97, avatar: "/avatars/raj-patel.jpg" },
      { name: "Miguel Reyes", role: "AI Research Engineer", location: "Manila, Philippines", match: 94, avatar: "/avatars/miguel-reyes.jpg" },
      { name: "Priya Sharma", role: "Senior AI Developer", location: "Hyderabad, India", match: 91, avatar: "/avatars/priya-sharma.jpg" },
    ],
  },
  {
    text: "Executive Assistant in South Africa",
    filters: ["Calendar Mgmt", "Travel", "English"],
    candidates: [
      { name: "James Ndaba", role: "Executive Assistant", location: "Cape Town, South Africa", match: 95, avatar: "/avatars/james-ndaba.jpg" },
      { name: "Lerato Molefe", role: "Senior EA", location: "Johannesburg, South Africa", match: 92, avatar: "/avatars/lerato-molefe.jpg" },
      { name: "David Okonkwo", role: "Operations & EA", location: "Durban, South Africa", match: 88, avatar: "/avatars/david-okonkwo.jpg" },
    ],
  },
];

function useTypewriter(searchList: SearchQuery[]) {
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [phase, setPhase] = useState<"typing" | "showing" | "deleting" | "pause">("typing");

  const currentSearch = searchList[currentSearchIndex];

  const tick = useCallback(() => {
    const fullText = currentSearch.text;

    if (phase === "typing") {
      if (displayText.length < fullText.length) {
        setDisplayText(fullText.slice(0, displayText.length + 1));
      } else {
        setShowResults(true);
        setPhase("showing");
      }
    } else if (phase === "deleting") {
      if (displayText.length > 0) {
        setDisplayText(displayText.slice(0, -1));
      } else {
        setShowResults(false);
        setPhase("pause");
      }
    } else if (phase === "pause") {
      setCurrentSearchIndex((prev) => (prev + 1) % searchList.length);
      setPhase("typing");
    }
  }, [phase, displayText, currentSearch.text, searchList.length]);

  useEffect(() => {
    let delay: number;

    if (phase === "typing") {
      delay = 40 + Math.random() * 30;
    } else if (phase === "showing") {
      delay = 3000;
      const timer = setTimeout(() => setPhase("deleting"), delay);
      return () => clearTimeout(timer);
    } else if (phase === "deleting") {
      delay = 20;
    } else if (phase === "pause") {
      delay = 300;
    } else {
      delay = 50;
    }

    const timer = setTimeout(tick, delay);
    return () => clearTimeout(timer);
  }, [tick, phase]);

  return { displayText, showResults, currentSearch, phase };
}

function CandidateRow({ candidate, index }: { candidate: Candidate; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className="flex items-center gap-3 px-5 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer"
    >
      <Image
        src={candidate.avatar}
        alt={candidate.name}
        width={36}
        height={36}
        className="w-9 h-9 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{candidate.name}</p>
        <p className="text-xs text-gray-400">{candidate.role} · {candidate.location}</p>
      </div>
      <span className="text-xs font-medium text-gray-500">{candidate.match}%</span>
    </motion.div>
  );
}

function InteractiveSearch() {
  const { displayText, showResults, currentSearch } = useTypewriter(searches);
  const [userInput, setUserInput] = useState("");
  const [isUserTyping, setIsUserTyping] = useState(false);
  const { openModal } = useWaitlistModal();

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim()) {
      openModal();
    }
  };

  const handleFocus = () => setIsUserTyping(true);
  const handleBlur = () => {
    if (!userInput) setIsUserTyping(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="bg-white rounded-none border border-gray-200 shadow-soft-lg"
    >
      {/* Search input */}
      <form onSubmit={handleUserSubmit}>
        <div className="flex items-center gap-3 px-5 py-4">
          <Search className="w-5 h-5 text-gray-300 flex-shrink-0" />
          <div className="flex-1 min-w-0 relative">
            {isUserTyping ? (
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onBlur={handleBlur}
                placeholder="Try: Senior Developer in Brazil"
                className="w-full text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none bg-transparent"
                autoFocus
              />
            ) : (
              <div
                onClick={handleFocus}
                className="text-sm text-gray-900 cursor-text h-5 flex items-center"
              >
                {displayText}
                <span className="inline-block w-[2px] h-4 bg-[#0a0a0a] ml-0.5 animate-pulse" />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#0a0a0a] text-white text-sm font-medium hover:bg-[#171717] transition-colors flex-shrink-0"
          >
            Search
          </button>
        </div>
      </form>

      {/* Results area - fixed height */}
      <div className="h-[250px] border-t border-gray-100 relative">
        <AnimatePresence mode="wait">
          {showResults && !isUserTyping && (
            <motion.div
              key={currentSearch.text}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex flex-col"
            >
              {/* Filter pills */}
              <div className="flex items-center gap-2 px-5 py-2.5 border-b border-gray-100 bg-[#fafafa]">
                {currentSearch.filters.map((filter) => (
                  <span key={filter} className="px-2.5 py-1 bg-white text-xs text-gray-500 border border-gray-200">
                    {filter}
                  </span>
                ))}
                <span className="ml-auto text-xs text-gray-400">{currentSearch.candidates.length} results</span>
              </div>

              <div className="flex-1">
                {currentSearch.candidates.map((candidate, index) => (
                  <CandidateRow key={candidate.name} candidate={candidate} index={index} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const { openModal } = useWaitlistModal();
  const { openModal: openDemoModal } = useDemoModal();

  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
      {/* Background - white with purple edges */}
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(ellipse 50% 80% at 0% 50%, rgba(91, 33, 182, 0.08), transparent),
          radial-gradient(ellipse 50% 80% at 100% 50%, rgba(91, 33, 182, 0.08), transparent),
          radial-gradient(ellipse 80% 50% at 50% 0%, rgba(91, 33, 182, 0.06), transparent),
          radial-gradient(ellipse 80% 50% at 50% 100%, rgba(91, 33, 182, 0.06), transparent)
        `,
      }} />

      <Container>
        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-soft mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            <span className="text-sm text-gray-600 font-medium">AI-powered offshore recruiting</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="font-geist font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] text-[#0a0a0a] leading-[1.1]"
          >
            The first AI agent that
            <br />
            <span className="text-[#1e1044]">recruits for you.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
          >
            Tell Yander who you need to hire. It headhunts, vets, and
            presents culture-matched candidates ready to interview.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <button
              onClick={openModal}
              className="inline-flex items-center justify-center gap-2 font-medium rounded-none bg-[#0a0a0a] text-white hover:bg-[#171717] px-8 py-4 text-base min-h-[52px] transition-all group w-full sm:w-auto"
            >
              Join the Waitlist
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={openDemoModal}
              className="inline-flex items-center justify-center font-medium rounded-none bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900 px-8 py-4 text-base min-h-[52px] transition-all w-full sm:w-auto"
            >
              Book a Demo
            </button>
          </motion.div>

          {/* Roles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-2"
          >
            {["Software Engineering", "Performance Marketing", "Copywriting", "Design", "Executive Assistants", "Operations", "& More"].map((role) => (
              <span key={role} className="px-3 py-1.5 bg-white border border-gray-200 text-xs font-medium text-gray-500 hover:text-gray-700 transition-all cursor-default">
                {role}
              </span>
            ))}
          </motion.div>

          {/* Trust line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-gray-400"
          >
            <span className="text-xs">Save up to 50% on salary</span>
            <span className="text-gray-300">·</span>
            <span className="text-xs">Get candidates immediately</span>
            <span className="text-gray-300">·</span>
            <span className="text-xs">Plans from $500/mo</span>
          </motion.div>
        </div>

        {/* Interactive Search - hidden, preserved for future use */}
        {/* <div className="relative mt-16 md:mt-20 max-w-3xl mx-auto">
          <InteractiveSearch />
        </div> */}
      </Container>
    </section>
  );
}
