"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, type Variants } from "framer-motion"
import { useDemoModal } from "@/components/ui/DemoModal"
import { useWaitlistModal } from "@/components/ui/WaitlistModal"
import {
  ChevronDown,
  ArrowUpRight,
  Check,
  Plus,
  Search,
  Users,
  Briefcase,
  BarChart3,
  Sparkles,
  MessageSquare,
  Mail,
  FileText,
  Shield,
  Twitter,
  Linkedin,
  Globe,
  Star,
  Send,
  TrendingUp,
  Building2,
} from "lucide-react"
import { cn } from "@/lib/utils"

const INK = {
  primary: "text-[#171717]",
  secondary: "text-[#171717]/60",
  tertiary: "text-[#171717]/40",
  disabled: "text-[#171717]/30",
}
const BORDER = "border-[rgba(0,0,0,0.06)]"
const PANEL = "bg-[#F7F7F6]"

/**
 * Interfere "screenshot floating off paper" shadow — multi-stop drops
 * decreasing in blur, plus a 0.5px hairline border. Six layers stacked.
 */
const MOCKUP_SHADOW =
  "shadow-[0_149px_199px_rgba(0,0,0,0.07),0_70px_96px_rgba(0,0,0,0.05),0_35px_48px_rgba(0,0,0,0.04),0_17px_24px_rgba(0,0,0,0.03),0_8px_12px_rgba(0,0,0,0.02),0_4px_6px_rgba(0,0,0,0.015),inset_0_0_0_0.5px_rgba(0,0,0,0.04)]"

/**
 * Accent wrapper — kept as a semantic component for accent phrases, but
 * renders inline with the surrounding text. No italic, no font swap.
 * Single-typeface aesthetic (Inter throughout).
 */
function AccentSerif({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <span className={className}>{children}</span>
}

/* ──────────────────── ENTRANCE ANIMATIONS ──────────────────── */

const EASE_OUT: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98]

// Words start visible — animation is a "land softer" polish, never blocks paint.
const wordVariants: Variants = {
  hidden: { opacity: 0.55, y: 8, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE_OUT },
  },
}

const fadeUp: Variants = {
  hidden: { opacity: 0.6, y: 10, filter: "blur(2px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE_OUT },
  },
}

/**
 * AnimatedWords — splits a string into words and staggers each through
 * the wordVariants entrance. Wrap in a motion container with stagger.
 * Even at "hidden" state, content is readable (opacity 0.55) so the
 * page never paints blank.
 */
function AnimatedWords({
  children,
  delay = 0,
  className,
}: {
  children: string
  delay?: number
  className?: string
}) {
  const words = children.split(" ")
  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.035, delayChildren: delay }}
      style={{ display: "inline" }}
    >
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          variants={wordVariants}
          className="inline-block whitespace-pre"
          style={{ willChange: "transform, opacity, filter" }}
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.span>
  )
}

/**
 * Highlighted word with mono superscript — Interfere's signature
 * three-step-pitch treatment.
 */
function HighlightWord({
  children,
  num,
  tone,
}: {
  children: React.ReactNode
  num: string
  tone: "blue" | "gray"
}) {
  return (
    <span
      className={cn(
        "relative inline-flex items-baseline gap-1 rounded px-1.5 leading-[1.1]",
        tone === "blue" && "bg-[#dbeafe] text-[#1e3a8a]",
        tone === "gray" && "bg-[#eef0ed] text-[#171717]",
      )}
    >
      <span>{children}</span>
      <span
        className="inline-block font-[var(--font-geist-mono)] text-[10px] font-normal opacity-60"
        style={{ transform: "translateY(-0.55em)" }}
      >
        {num}
      </span>
    </span>
  )
}

export function YanderInterfere() {
  return (
    <div
      className="relative min-h-screen overflow-x-clip bg-white text-[#171717] antialiased"
      style={{
        fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
        fontWeight: 500,
        letterSpacing: "-0.011em",
      }}
    >
      <Nav />
      <main className="relative">
        <TopGradientWash />
        <Hero />
        <CandidateMockup />
        <LogoStrip />
        <ThreeStepPitch />
        <PreviewCards />
        <PullQuote />
        <FeatureSource />
        <FeatureEvaluate />
        <FeatureRetain />
        <ChangelogSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}

/* ─────────────────────────────── NAV ─────────────────────────────── */

function Nav() {
  const navItems = [
    { label: "Pulse", href: "/pulse" },
    { label: "Customers", href: "/customers" },
    { label: "Pricing", href: "/pricing" },
    { label: "Changelog", href: "/changelog" },
  ]
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[rgba(0,0,0,0.06)] bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1240px] items-center justify-between px-6">
        <Link href="/" aria-label="Yander" className="flex items-center gap-2">
          <YanderMark className="h-5 w-5 text-[#171717]" />
          <span className="text-[15px] font-medium tracking-tight text-[#171717]">
            Yander
          </span>
        </Link>
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-[13px] font-medium text-[#171717]/60 transition-colors hover:text-[#171717]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1.5">
          <NavCta href="/pricing" variant="ghost" kbd="L">
            Login
          </NavCta>
          <NavCta href="/pricing" variant="solid" kbd="G">
            Get started
          </NavCta>
        </div>
      </div>
    </header>
  )
}

function NavCta({
  children,
  kbd,
  variant,
  href,
}: {
  children: React.ReactNode
  kbd?: string
  variant: "ghost" | "solid"
  href: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-8 items-center gap-2 rounded-md px-4 text-[13px] font-medium transition-colors",
        variant === "ghost" && "text-[#171717]/60 hover:bg-[#0a1d08]/5 hover:text-[#171717]",
        variant === "solid" && "bg-[#171717] text-white hover:bg-[#000]",
      )}
    >
      <span>{children}</span>
      {kbd && (
        <kbd
          className={cn(
            "inline-grid h-4 min-w-4 place-items-center rounded-sm px-1 font-[var(--font-geist-mono)] text-[10px] font-medium uppercase",
            variant === "ghost" && "bg-black/[0.06] text-[#171717]/45",
            variant === "solid" && "bg-white/15 text-white/70",
          )}
        >
          {kbd}
        </kbd>
      )}
    </Link>
  )
}

function YanderMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 184 185"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M183.463 81.6945C183.463 79.3197 181.538 77.3945 179.163 77.3945H176.3C173.925 77.3945 172 75.4694 172 73.0945V54.4621C172 52.0873 170.075 50.1621 167.7 50.1621H166.983C164.608 50.1621 162.683 48.2369 162.683 45.8621V25.7951C162.683 23.4203 160.757 21.4951 158.383 21.4951H139.032C136.658 21.4951 134.732 19.5699 134.732 17.1951V16.2658C134.732 13.891 132.807 11.9658 130.432 11.9658H110.365C107.991 11.9658 106.065 10.0406 106.065 7.66583V4.29999C106.065 1.92517 104.14 0 101.765 0H81.6994C79.3246 0 77.3994 1.92517 77.3994 4.29999V7.66583C77.3994 10.0406 75.4742 11.9658 73.0994 11.9658H53.7492C51.3744 11.9658 49.4492 13.891 49.4492 16.2658V17.1951C49.4492 19.5699 47.524 21.4951 45.1492 21.4951H25.8C23.4252 21.4951 21.5 23.4203 21.5 25.7951V45.8621C21.5 48.2369 19.5748 50.1621 17.2 50.1621H12.9006C10.5258 50.1621 8.60059 52.0873 8.60059 54.4621V72.3826C8.60059 74.7574 6.67511 76.6826 4.30029 76.6826C1.92548 76.6826 0 78.6078 0 80.9826V101.05C0 103.424 1.92517 105.35 4.29999 105.35H24.367C26.7418 105.35 28.667 103.424 28.667 101.05V83.1281C28.667 80.7533 30.5925 78.8281 32.9673 78.8281C35.3421 78.8281 37.2676 76.903 37.2676 74.5281V54.4621C37.2676 52.0873 39.1927 50.1621 41.5676 50.1621H45.866C48.2408 50.1621 50.166 48.2369 50.166 45.8621V44.9318C50.166 42.557 52.0912 40.6318 54.466 40.6318H73.8162C76.191 40.6318 78.1162 38.7067 78.1162 36.3318V32.966C78.1162 30.5912 80.0414 28.666 82.4162 28.666H101.765C104.14 28.666 106.065 30.5912 106.065 32.966V36.3318C106.065 38.7067 107.991 40.6318 110.365 40.6318H129.716C132.09 40.6318 134.016 42.557 134.016 44.9318V45.8621C134.016 48.2369 135.941 50.1621 138.316 50.1621H139.033C141.408 50.1621 143.333 52.0873 143.333 54.4621V74.5281C143.333 76.903 145.258 78.8281 147.633 78.8281H150.497C152.872 78.8281 154.797 80.7533 154.797 83.1281V101.762C154.797 104.136 156.722 106.062 159.097 106.062H179.163C181.538 106.062 183.463 104.136 183.463 101.762V81.6945Z"
        fill="currentColor"
      />
      <path
        d="M183.463 103.182C183.463 105.557 181.538 107.482 179.163 107.482H176.3C173.925 107.482 172 109.407 172 111.782V130.428C172 132.803 170.075 134.728 167.7 134.728H166.983C164.608 134.728 162.683 136.653 162.683 139.028V159.095C162.683 161.47 160.757 163.395 158.383 163.395H139.032C136.658 163.395 134.732 165.32 134.732 167.695C134.732 170.069 132.807 171.995 130.433 171.995H110.365C107.991 171.995 106.065 173.92 106.065 176.294V179.874C106.065 182.249 104.14 184.174 101.765 184.174H81.6994C79.3246 184.174 77.3994 182.249 77.3994 179.874V176.294C77.3994 173.92 75.4742 171.995 73.0994 171.995H53.749C51.3743 171.995 49.4492 170.069 49.4492 167.695C49.4492 165.32 47.5241 163.395 45.1494 163.395H25.8C23.4252 163.395 21.5 161.47 21.5 159.095V139.028C21.5 136.653 19.5748 134.728 17.2 134.728H16.4846C14.1097 134.728 12.1846 132.803 12.1846 130.428V111.791C12.1846 109.416 10.2594 107.491 7.88458 107.491H4.29999C1.92517 107.491 0 105.565 0 103.191V83.1246C0 80.7498 1.92517 78.8246 4.29999 78.8246H24.367C26.7418 78.8246 28.667 80.7498 28.667 83.1246V101.762C28.667 104.137 30.5922 106.062 32.967 106.062H36.5506C38.9254 106.062 40.8506 107.987 40.8506 110.362V130.428C40.8506 132.803 42.7758 134.728 45.1506 134.728H45.866C48.2408 134.728 50.166 136.653 50.166 139.028C50.166 141.403 52.0912 143.328 54.466 143.328H73.8162C76.191 143.328 78.1162 145.254 78.1162 147.628V151.207C78.1162 153.582 80.0414 155.507 82.4162 155.507H101.765C104.14 155.507 106.065 153.582 106.065 151.207V147.628C106.065 145.254 107.991 143.328 110.365 143.328H129.716C132.09 143.328 134.016 141.403 134.016 139.028C134.016 136.653 135.941 134.728 138.316 134.728H139.033C141.408 134.728 143.333 132.803 143.333 130.428V110.362C143.333 107.987 145.258 106.062 147.633 106.062H150.497C152.872 106.062 154.797 104.137 154.797 101.762V83.1158C154.797 80.741 156.722 78.8158 159.097 78.8158H179.163C181.538 78.8158 183.463 80.741 183.463 83.1158V103.182Z"
        fill="currentColor"
      />
    </svg>
  )
}

/* ─────────────────────────────── HERO ─────────────────────────────── */

function Hero() {
  const { openModal: openDemoModal } = useDemoModal()
  return (
    <section className="relative">
      <div className="relative mx-auto max-w-[1240px] px-6 pt-24 pb-10 lg:pt-32 lg:pb-14">
        <div className="grid items-end gap-10 lg:grid-cols-2 lg:gap-12">
          <h1 className="text-balance font-medium leading-[0.95] tracking-[-0.025em] text-[#171717] text-[clamp(2.5rem,6vw,3.625rem)]">
            <AnimatedWords>The first AI agent that</AnimatedWords>
            <br />
            <AccentSerif className="text-[1.08em]">
              <AnimatedWords delay={0.25}>recruits for you</AnimatedWords>
            </AccentSerif>
          </h1>
          <div className="flex flex-col items-start gap-6 lg:items-end">
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ delay: 0.55, duration: 0.7, ease: EASE_OUT }}
              className="max-w-md text-[15px] leading-relaxed text-[#171717]/60 lg:text-right"
            >
              Tell Yander who you need to hire. It headhunts, evaluates, and
              presents culture-matched candidates ready to interview — in days,
              not weeks.
            </motion.p>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ delay: 0.7, duration: 0.7, ease: EASE_OUT }}
              className="flex items-center gap-3"
            >
              <button
                onClick={openDemoModal}
                className="inline-flex h-10 items-center rounded-md border border-[rgba(0,0,0,0.08)] bg-white px-6 text-[13.5px] font-medium text-[#171717] transition-colors hover:border-[#171717]/30"
              >
                Book a demo
              </button>
              <Link
                href="/pricing"
                className="inline-flex h-10 items-center rounded-md bg-[#171717] px-6 text-[13.5px] font-medium text-white transition-colors hover:bg-black"
              >
                Get started free
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── GRADIENT WASHES ─────────────────────────── */

/**
 * Top-level ambient gradient wash. Reverse-engineered from interfere.com's
 * exact recipe (UI-Grabber dump 2026-05-19):
 *
 *   background-image: linear-gradient(90deg,
 *     rgba(255, 59, 0, 0.2)    0%,
 *     rgba(246, 0, 157, 0.2)  38%,
 *     rgba(151, 62, 198, 0.2) 71%,
 *     rgba(0, 142, 255, 0.2) 100%);
 *   filter: blur(50px);
 *   border-radius: 300px;
 *
 * Sits BEHIND the candidate mockup card. Peeks around the card edges.
 */
function TopGradientWash() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-0 overflow-hidden"
      style={{ height: "1500px" }}
      aria-hidden
    >
      {/* Subtle vertical shell-to-page wash — barely-there warm cream tint */}
      <div className="absolute inset-x-0 top-0 h-[800px] bg-gradient-to-b from-[#fefaf6] from-50% to-transparent" />

      {/* The signature rainbow bar — orange → pink → purple → blue at 20% opacity,
          50px blur, very wide & rounded so it reads as an ambient glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-[300px]"
        style={{
          top: "560px",
          width: "1700px",
          height: "780px",
          backgroundImage:
            "linear-gradient(90deg, rgba(255,59,0,0.20) 0%, rgba(246,0,157,0.20) 38%, rgba(151,62,198,0.20) 71%, rgba(0,142,255,0.20) 100%)",
          filter: "blur(50px)",
        }}
      />

      {/* Clean fade-to-white at the very bottom so the next section starts cold */}
      <div className="absolute inset-x-0 bottom-0 h-[140px] bg-gradient-to-b from-transparent to-white" />
    </div>
  )
}

// MockupGradientWash is no longer needed — TopGradientWash spans both
function MockupGradientWash() {
  return null
}

/* ─────────────────────────── CANDIDATE MOCKUP ─────────────────────────── */

function CandidateMockup() {
  return (
    <section className="relative">
      <MockupGradientWash />
      <motion.div
        initial={{ opacity: 0.7, y: 16, filter: "blur(2px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, delay: 0.4, ease: EASE_OUT }}
        className="relative mx-auto max-w-[1240px] px-6 pb-24"
      >
        <div
          className={cn(
            "overflow-hidden rounded-2xl border border-[rgba(0,0,0,0.06)] bg-[#fafaf9]",
            MOCKUP_SHADOW,
          )}
        >
          <div className="flex">
            <MiniRail />
            <div className="flex min-w-0 flex-1 flex-col">
              <CandidateTopBar />
              <div className="grid min-w-0 grid-cols-[1fr_320px]">
                <CandidateMain />
                <CandidateMeta />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function CandidateTopBar() {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[rgba(0,0,0,0.06)] bg-white px-4 py-2.5 text-[12.5px]">
      <div className="flex items-center gap-2 text-[#171717]/60">
        <button
          aria-label="Toggle sidebar"
          className="grid h-6 w-6 place-items-center rounded text-[#171717]/45 hover:bg-[#0a0a0a]/5 hover:text-[#171717]"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true">
            <rect x="2" y="3" width="12" height="10" rx="1" />
            <path d="M6 3v10" />
          </svg>
        </button>
        <button className="flex items-center gap-1.5 hover:text-[#171717]">
          <Briefcase className="h-3.5 w-3.5" /> Pipeline
        </button>
        <span className="text-[#171717]/30">›</span>
        <span className="text-[#171717]">Senior Engineer — São Paulo</span>
      </div>
      <div className="flex items-center gap-3">
        <AvatarStack />
        <button className="inline-flex items-center gap-1.5 rounded-md border border-[rgba(0,0,0,0.08)] bg-white px-2.5 py-1 text-[12px] text-[#171717]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Available
        </button>
        <button className="grid h-7 w-7 place-items-center rounded-md border border-[rgba(0,0,0,0.08)] bg-white text-[#171717]/45 hover:text-[#171717]">
          ⋯
        </button>
      </div>
    </div>
  )
}

function MiniRail() {
  const items = [
    { Icon: Briefcase, label: "Pipeline", active: true },
    { Icon: MessageSquare, label: "Messages" },
    { Icon: Users, label: "Candidates" },
    { Icon: BarChart3, label: "Pulse" },
    { Icon: FileText, label: "Notes" },
  ]
  return (
    <aside className="flex w-12 flex-col items-center border-r border-[rgba(0,0,0,0.06)] bg-white pt-3 pb-2.5">
      {/* Yander brand mark at top, in a darker tile */}
      <div className="grid h-7 w-7 place-items-center rounded-md bg-[#171717] text-white">
        <YanderMark className="h-3.5 w-3.5" />
      </div>

      {/* Main nav */}
      <div className="mt-4 flex flex-col items-center gap-1">
        {items.map(({ Icon, active, label }, i) => (
          <button
            key={i}
            aria-label={label}
            className={cn(
              "grid h-7 w-7 place-items-center rounded-md text-[#171717]/45 transition-colors",
              active ? "bg-black/[0.05] text-[#171717]" : "hover:bg-black/[0.04] hover:text-[#171717]",
            )}
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        ))}
      </div>

      {/* Help icon pinned to the bottom */}
      <div className="mt-auto">
        <button
          aria-label="Help"
          className="grid h-7 w-7 place-items-center rounded-full border border-[rgba(0,0,0,0.08)] bg-white text-[#171717]/55 transition-colors hover:text-[#171717]"
        >
          <span className="font-[var(--font-geist-mono)] text-[11px]">?</span>
        </button>
      </div>
    </aside>
  )
}

function CandidateMain() {
  return (
    <div className="flex min-w-0 flex-col bg-white">
      <div className="px-10 py-8">
        {/* Large icon block — matches Interfere's key-icon at top of issue */}
        <div className="grid h-14 w-14 place-items-center rounded-lg bg-black/[0.04] text-[#171717]/50">
          <BriefcaseIcon className="h-6 w-6" />
        </div>

        {/* ID label (mono, muted) */}
        <p className="mt-7 font-[var(--font-geist-mono)] text-[12px] text-[#171717]/45">
          #C-2814
        </p>

        {/* Big bold title */}
        <h3 className="mt-1 text-[22px] font-semibold tracking-tight text-[#171717]">
          Senior Engineer — São Paulo
        </h3>

        {/* Description paragraph — narrow column like Interfere */}
        <p className="mt-3 max-w-xl text-[13.5px] leading-relaxed text-[#171717]/65">
          Yander surfaced Maria from the LatAm passive talent pool after a
          spike in qualified matches against your job scorecard. She&apos;s
          shipped payment infrastructure at two Series B startups.
        </p>

        <Tabs />

        <CandidateActivity />

        {/* Comment input row — mirrors Interfere's "Leave a comment / Send" */}
        <div className="mt-6 flex items-center justify-between gap-3 rounded-lg border border-[rgba(0,0,0,0.08)] bg-white px-3.5 py-2">
          <span className="text-[13.5px] text-[#171717]/40">Leave a comment</span>
          <button className="rounded-md bg-black/[0.04] px-3 py-1 text-[12.5px] font-medium text-[#171717]/40">
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <path d="M3 13h18" />
    </svg>
  )
}

function SuggestionCard() {
  return (
    <div className="mt-7 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-gradient-to-br from-[#FFF7ED] to-white p-5">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid h-7 w-7 place-items-center rounded-md bg-[#E05000]/10 text-[#E05000]">
          <Sparkles className="h-3.5 w-3.5" />
        </span>
        <div className="flex-1">
          <p className="font-[var(--font-geist-mono)] text-[10.5px] uppercase tracking-[0.18em] text-[#E05000]">
            Yander suggests
          </p>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#171717]">
            Send Maria a founder-screen invite for{" "}
            <span className="font-medium">Tue 21st, 10:00 AM SP / 09:00 AM ET</span>.
            She&apos;s scored above bar on every rubric so far.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <button className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#171717] px-3.5 text-[12.5px] font-medium text-white hover:bg-black">
              <Send className="h-3 w-3" /> Send invite
            </button>
            <button className="inline-flex h-8 items-center rounded-md border border-[rgba(0,0,0,0.08)] bg-white px-3.5 text-[12.5px] font-medium text-[#171717]/60 transition-colors hover:border-[#171717]/30 hover:text-[#171717]">
              Edit
            </button>
            <span className="ml-auto font-[var(--font-geist-mono)] text-[10.5px] uppercase tracking-[0.14em] text-[#171717]/40">
              Auto-decline in 24h
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function AvatarStack() {
  const avatars = [
    { tone: "indigo" as const, letter: "J" },
    { tone: "amber" as const, letter: "L" },
    { tone: "rose" as const, letter: "P" },
    { tone: "emerald" as const, letter: "K" },
  ]
  return (
    <div className="flex -space-x-1.5">
      {avatars.map((a, i) => (
        <span
          key={i}
          className={cn(
            "grid h-6 w-6 place-items-center rounded-full border-[1.5px] border-white text-[10px] font-medium",
            a.tone === "indigo" && "bg-indigo-100 text-[#312e81]",
            a.tone === "amber" && "bg-amber-100 text-[#78350f]",
            a.tone === "rose" && "bg-rose-100 text-[#9f1239]",
            a.tone === "emerald" && "bg-emerald-100 text-[#14532d]",
          )}
        >
          {a.letter}
        </span>
      ))}
      <span className="grid h-6 w-6 place-items-center rounded-full border-[1.5px] border-white bg-black/[0.05] text-[10px] font-medium text-[#171717]/55">
        +2
      </span>
    </div>
  )
}

function Tabs() {
  const tabs = [
    { label: "Activity", active: true },
    { label: "Assessment" },
    { label: "Skills" },
    { label: "Messages" },
  ]
  return (
    <div className="mt-8 flex items-center gap-7 border-b border-[rgba(0,0,0,0.06)]">
      {tabs.map((t) => (
        <button
          key={t.label}
          className={cn(
            "relative pb-3 text-[13.5px] font-medium tracking-[-0.01em] transition-colors",
            t.active
              ? "text-[#171717]"
              : "text-[#171717]/45 hover:text-[#171717]/75",
          )}
        >
          {t.label}
          {t.active && (
            <span className="absolute -bottom-px left-0 right-0 h-[1.5px] rounded-full bg-[#171717]" />
          )}
        </button>
      ))}
    </div>
  )
}

function CandidateActivity() {
  return (
    <div className="mt-5 space-y-4 text-[13.5px]">
      <ActivityRow
        icon={<Sparkles className="h-3.5 w-3.5 text-[#E05000]" />}
        title="Yander sourced this candidate"
        time="2 hrs ago"
        body="Matched against your job scorecard for Senior Engineer. Skills: TypeScript, Postgres, distributed systems. Culture: async-first, ownership-driven."
      />
      <ActivityRow
        icon={<Check className="h-3.5 w-3.5 text-[#15803d]" />}
        title="Assessment complete"
        time="1 hr ago"
        body={
          <>
            Structured async assessment scored <strong className="text-[#171717]">9.2 / 10</strong>. Strong
            signal on systems design and written communication.
          </>
        }
      />
      <ActivityMeta
        icon={<MiniAvatar tone="amber" letter="L" />}
        text={
          <>
            <span className="text-[#171717]">Luke Shiels</span> shortlisted for{" "}
            <span className="text-[#171717]">Senior Engineer — São Paulo</span>
          </>
        }
        time="32 min ago"
      />
      <ActivityMeta
        icon={<MiniAvatar tone="indigo" letter="J" />}
        text={
          <>
            <span className="text-[#171717]">Jordan Hayes</span> reviewed assessment
          </>
        }
        time="14 min ago"
      />
      {/* Comment block — wrapped in a soft bordered card like Interfere */}
      <div>
        <div className="flex items-center gap-2.5 text-[12.5px] text-[#171717]/60">
          <MiniAvatar tone="amber" letter="L" />
          <span className="text-[#171717]">Luke Shiels</span>
          <span>commented</span>
          <span className="text-[#171717]/30">·</span>
          <span className="text-[#171717]/40">30 min ago</span>
        </div>
        <div className="mt-1.5 ml-8 rounded-md border border-[rgba(0,0,0,0.06)] bg-white px-3.5 py-2.5 text-[13.5px] text-[#171717]">
          Strongest candidate this week — let&apos;s move her into the founder
          screen.
        </div>
      </div>

      {/* Faded AI-suggestion item — mirrors Interfere's "Suggesting a fix..." */}
      <div className="opacity-45">
        <div className="flex items-center gap-2.5 text-[12.5px]">
          <Sparkles className="h-3.5 w-3.5 text-[#E05000]" />
          <span className="text-[#171717]/70">Yander suggests a next step…</span>
        </div>
        <p className="mt-1.5 max-w-2xl pl-6 text-[13.5px] text-[#171717]/60">
          Send Maria a founder-screen invite for Tue 21st, 10:00 AM SP / 09:00 AM
          ET. She&apos;s scored above bar on every rubric so far.
        </p>
      </div>
    </div>
  )
}

function ActivityRow({
  icon,
  title,
  time,
  body,
}: {
  icon: React.ReactNode
  title: string
  time: string
  body: React.ReactNode
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-1 grid h-5 w-5 place-items-center rounded-full bg-[#f5f5f4]">{icon}</div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2 text-[12.5px]">
          <span className="font-medium text-[#171717]">{title}</span>
          <span className="text-[#171717]/40">{time}</span>
        </div>
        <p className="text-[13.5px] leading-relaxed text-[#171717]/60">{body}</p>
      </div>
    </div>
  )
}

function ActivityMeta({
  icon,
  text,
  time,
}: {
  icon: React.ReactNode
  text: React.ReactNode
  time: string
}) {
  return (
    <div className="flex items-center gap-3 text-[12.5px] text-[#171717]/60">
      {icon}
      <span>{text}</span>
      <span className="text-[#171717]/30">·</span>
      <span className="text-[#171717]/40">{time}</span>
    </div>
  )
}

function MiniAvatar({
  tone,
  letter,
}: {
  tone: "amber" | "indigo" | "rose" | "emerald"
  letter: string
}) {
  const tones = {
    amber: "bg-amber-100 text-[#4a3212]",
    indigo: "bg-indigo-100 text-[#171717]/60",
    rose: "bg-rose-100 text-[#8a3a3a]",
    emerald: "bg-emerald-100 text-[#14532d]",
  }
  return (
    <span
      className={cn(
        "grid h-5 w-5 place-items-center rounded-full text-[10px] font-medium",
        tones[tone],
      )}
    >
      {letter}
    </span>
  )
}

function CandidateMeta() {
  return (
    <aside className="flex flex-col border-l border-[rgba(0,0,0,0.06)] bg-white">
      <MetaGroup>
        <MetaRow label="Title">
          <span>Senior Engineer — São Paulo</span>
        </MetaRow>
        <MetaRow label="ID">
          <span className="font-[var(--font-geist-mono)] text-[12.5px]">
            # C-2814
          </span>
        </MetaRow>
        <MetaRow label="Match">
          <span className="flex items-center gap-1.5">
            <MatchBars />
            <span>High</span>
          </span>
        </MetaRow>
        <MetaRow label="Recruiter">
          <span className="flex items-center gap-1.5">
            <MiniAvatar tone="amber" letter="L" />
            Luke Shiels
          </span>
        </MetaRow>
        <MetaRow label="Status">
          <span className="flex items-center gap-1.5">
            <span className="relative grid h-3 w-3 place-items-center">
              <span className="block h-2 w-2 rounded-full bg-amber-400" />
            </span>
            Active
          </span>
        </MetaRow>
        <MetaRow label="Source">
          <span className="flex items-center gap-1.5">
            <span className="grid h-3.5 w-3.5 place-items-center rounded-sm bg-[#E05000]/15">
              <Sparkles className="h-2.5 w-2.5 text-[#E05000]" />
            </span>
            Yander
          </span>
        </MetaRow>
      </MetaGroup>

      <Divider />

      <MetaGroup>
        <MetaRow label="First contact">
          <span>2 hrs ago</span>
        </MetaRow>
        <MetaRow label="Last activity">
          <span>Just now</span>
        </MetaRow>
        <MetaRow label="Response time">
          <span>14 min</span>
        </MetaRow>
      </MetaGroup>

      <Divider />

      <div className="px-6 py-5">
        <p className="font-[var(--font-geist-mono)] text-[10.5px] uppercase tracking-[0.18em] text-[#171717]/40">
          Pipeline health
        </p>
        <p className="mt-3 text-[32px] font-medium leading-none tracking-[-0.025em] text-[#171717]">
          12 / 145
        </p>
        <p className="mt-2 text-[12.5px] text-[#171717]/50">
          qualified · last 7 days
        </p>
        <PipelineChart />
      </div>
    </aside>
  )
}

function MatchBars() {
  return (
    <span className="inline-flex items-end gap-px">
      <span className="h-1.5 w-0.5 rounded-sm bg-[#171717]" />
      <span className="h-2.5 w-0.5 rounded-sm bg-[#171717]" />
      <span className="h-3 w-0.5 rounded-sm bg-[#171717]" />
    </span>
  )
}

function MetaGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2.5 px-6 py-5">{children}</div>
}

function MetaRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-[80px_1fr] items-center gap-4 text-[13px]">
      <span className="text-[#171717]/45">{label}</span>
      <span className="truncate text-right text-[#171717]">{children}</span>
    </div>
  )
}

function Divider() {
  return <div className="border-t border-[rgba(0,0,0,0.06)]" />
}

function PipelineChart() {
  return (
    <div className="mt-4">
      <svg viewBox="0 0 300 110" className="w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="pipe-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#15803d" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#15803d" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* "Now" vertical guide */}
        <line x1="180" y1="6" x2="180" y2="100" stroke="rgba(0,0,0,0.06)" />
        {/* "Hire" milestone marker — same pattern as Interfere's "Fix" label */}
        <line
          x1="235"
          y1="6"
          x2="235"
          y2="100"
          stroke="rgba(0,0,0,0.10)"
          strokeDasharray="2 3"
        />
        <path
          d="M 0 90 C 30 85, 60 80, 90 70 S 140 50, 180 28 L 180 100 L 0 100 Z"
          fill="url(#pipe-fill)"
        />
        <path
          d="M 0 90 C 30 85, 60 80, 90 70 S 140 50, 180 28"
          fill="none"
          stroke="#15803d"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M 180 28 C 210 40, 240 50, 300 65"
          fill="none"
          stroke="#15803d"
          strokeOpacity="0.4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="3 3"
        />
        <circle cx="180" cy="28" r="3" fill="#15803d" />
        <circle cx="180" cy="28" r="6" fill="#15803d" fillOpacity="0.25" />
      </svg>
      <div className="relative mt-2 font-[var(--font-geist-mono)] text-[10px] text-[#171717]/40">
        <div className="flex justify-between">
          <span>W-2</span>
          <span>W-1</span>
          <span className="text-[#171717]/65">Now</span>
          <span className="text-[#171717]/35">Hire</span>
          <span>W+1</span>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────── LOGO STRIP ─────────────────────────────── */

function LogoStrip() {
  const logos = [
    "LoudFace",
    "Hayes Media",
    "KS Media",
    "Pacific IQ",
    "AcquisitionX",
    "ConversionLabs",
    "Hunter Digital",
    "VisCap Media",
    "SkaleOS",
    "Magna",
    "Brand Lux Media",
  ]
  // Duplicate the list so the marquee can loop seamlessly
  const trackLogos = [...logos, ...logos]
  return (
    <section className="bg-white py-14">
      <div className="relative flex items-center gap-8 overflow-hidden">
        {/* Left caption pill — same vertical row as the marquee */}
        <div className="z-10 shrink-0 pl-8 lg:pl-16">
          <span className="inline-flex items-center rounded-md border border-[rgba(0,0,0,0.08)] bg-white px-3 py-1.5 text-[12px] font-medium tracking-[-0.01em] text-[#171717]/65 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
            Trusted by
          </span>
        </div>
        <div
          className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_94%,transparent)]"
        >
          <div
            className="flex w-max gap-14 will-change-transform"
            style={{ animation: "yi-marquee 38s linear infinite" }}
          >
            {trackLogos.map((logo, i) => (
              <span
                key={i}
                className="flex h-7 items-center whitespace-nowrap text-[20px] font-medium tracking-[-0.02em] text-[#171717]/85"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes yi-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}

/* ─────────────────────────────── THREE-STEP PITCH ─────────────────────────────── */

function ThreeStepPitch() {
  return (
    <section className="py-28 lg:py-36">
      <div className="mx-auto max-w-[1100px] px-6">
        <motion.p
          initial={{ opacity: 0.7, y: 12, filter: "blur(2px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="text-balance text-[#171717] text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.45] tracking-[-0.02em]"
        >
          Yander <HighlightWord num="01" tone="gray">sources</HighlightWord>{" "}
          qualified candidates,{" "}
          <HighlightWord num="02" tone="blue">evaluates</HighlightWord> culture fit,
          and delivers <HighlightWord num="03" tone="gray">interview-ready</HighlightWord>{" "}
          people in days, not weeks.
        </motion.p>
      </div>
    </section>
  )
}

/* ─────────────────────────── PREVIEW CARDS ─────────────────────────── */

function PreviewCards() {
  const cards = [
    {
      num: "01",
      title: "Source talent your funnel can't reach.",
      body: "Yander continuously surfaces passive candidates across 428M profiles and routes the strongest matches into your inbox.",
      visual: <PreviewInboxMini />,
    },
    {
      num: "02",
      title: "Evaluate without the busywork.",
      body: "Replace 30-minute screening calls with structured async assessments. Yander scores against your rubric and explains why.",
      visual: <PreviewAssessmentMini />,
    },
    {
      num: "03",
      title: "See problems before they leave.",
      body: "Pulse turns daily tool activity into team-health signals — quit-risk, workload spikes, engagement drops — flagged in Slack.",
      visual: <PreviewPulseMini />,
    },
  ]
  return (
    <section className="pb-24 lg:pb-32">
      <div className="mx-auto max-w-[1240px] px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.12 }}
          className="grid gap-6 md:grid-cols-3"
        >
          {cards.map((c) => (
            <motion.div
              key={c.num}
              variants={fadeUp}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[rgba(0,0,0,0.06)] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.025),0_18px_48px_-20px_rgba(0,0,0,0.10)] transition-shadow hover:shadow-[0_1px_2px_rgba(0,0,0,0.03),0_28px_60px_-20px_rgba(0,0,0,0.14)]"
            >
              <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[#fafaf9] to-white [mask-image:linear-gradient(to_bottom,black_60%,transparent)]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(255,180,140,0.15),transparent_55%)]" />
                {c.visual}
              </div>
              <div className="-mt-4 flex flex-col gap-2 p-7">
                <p className="font-[var(--font-geist-mono)] text-[11px] uppercase tracking-[0.18em] text-[#171717]/40">
                  {c.num}
                </p>
                <h3 className="text-[17px] font-medium leading-snug tracking-[-0.02em] text-[#171717]">
                  {c.title}
                </h3>
                <p className="text-[14px] leading-[1.6] text-[#171717]/60">
                  {c.body}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ──── Preview mini-mockups (wireframe style, Interfere pattern) ──── */
/* Each shows a different Yander app surface with skeleton placeholders
   and exactly ONE highlighted element drawing the eye. No rotation. */

function SkeletonBar({
  w = "100%",
  tone = "default",
}: {
  w?: string
  tone?: "default" | "muted"
}) {
  return (
    <span
      className="block h-2 rounded-full"
      style={{
        width: w,
        background: tone === "muted" ? "rgba(0,0,0,0.04)" : "rgba(0,0,0,0.07)",
      }}
    />
  )
}

// Card 1 — Wireframe candidate inbox with ONE highlighted lead
function PreviewInboxMini() {
  return (
    <div className="absolute inset-x-5 top-5 origin-top rounded-lg border border-[rgba(0,0,0,0.06)] bg-white p-3 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
      <div className="flex gap-3">
        {/* Mini icon rail */}
        <div className="flex w-3 flex-col items-center gap-1.5 pt-0.5">
          <span className="block h-2.5 w-2.5 rounded-sm bg-black/15" />
          <span className="block h-2.5 w-2.5 rounded-sm bg-black/[0.06]" />
          <span className="block h-2.5 w-2.5 rounded-sm bg-black/[0.06]" />
          <span className="block h-2.5 w-2.5 rounded-sm bg-black/[0.06]" />
          <span className="block h-2.5 w-2.5 rounded-sm bg-black/[0.06]" />
        </div>
        {/* Main inbox area */}
        <div className="flex flex-1 flex-col gap-2.5">
          <SkeletonBar w="50%" />
          <SkeletonBar w="35%" tone="muted" />
          {/* THE highlighted item — Interfere uses an orange-tinted pill here */}
          <div className="mt-1.5 inline-flex w-fit items-center gap-1.5 rounded border border-[#f59e0b]/40 bg-[#fef3c7]/60 px-2 py-1 font-[var(--font-geist-mono)] text-[9px] uppercase tracking-[0.12em] text-[#92400e]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f59e0b]" />
            C-2814 · Maria Santos
          </div>
          <SkeletonBar w="65%" tone="muted" />
          <SkeletonBar w="42%" tone="muted" />
        </div>
      </div>
    </div>
  )
}

// Card 2 — Candidate-detail wireframe with two status pills at the bottom
function PreviewAssessmentMini() {
  return (
    <div className="absolute inset-x-5 top-5 origin-top rounded-lg border border-[rgba(0,0,0,0.06)] bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-[var(--font-geist-mono)] text-[10px] text-[#171717]/40">
          #C-2814
        </span>
        <span className="h-4 w-4 rounded-full bg-black/[0.08]" />
      </div>
      <div className="mb-3 flex items-center gap-1.5">
        <span className="grid h-4 w-4 place-items-center rounded-md bg-black/[0.06] text-[10px]">
          ⌘
        </span>
        <span className="text-[11px] font-medium text-[#171717]">
          Senior Engineer · candidate review
        </span>
      </div>
      <div className="mb-4 space-y-1.5">
        <SkeletonBar w="100%" />
        <SkeletonBar w="80%" tone="muted" />
        <SkeletonBar w="55%" tone="muted" />
      </div>
      <div className="flex gap-1.5">
        <span className="inline-flex items-center gap-1 rounded-md border border-black/[0.07] bg-white px-2 py-0.5 text-[10px] font-medium text-[#171717]/65">
          <Sparkles className="h-2.5 w-2.5 text-[#E05000]" />
          Assessing…
        </span>
        <span className="inline-flex items-center gap-1 rounded-md border border-black/[0.07] bg-white px-2 py-0.5 text-[10px] font-medium text-[#171717]/65">
          <svg viewBox="0 0 16 16" className="h-2.5 w-2.5 fill-current text-[#171717]/45" aria-hidden="true">
            <rect x="2" y="10" width="2" height="3" />
            <rect x="7" y="6" width="2" height="7" />
            <rect x="12" y="2" width="2" height="11" />
          </svg>
          High match
        </span>
      </div>
    </div>
  )
}

// Card 3 — Pulse Slack-alert wireframe — interfere uses code; we use a Slack-style alert (Pulse posts to Slack)
function PreviewPulseMini() {
  return (
    <div className="absolute inset-x-5 top-5 origin-top rounded-lg border border-[rgba(0,0,0,0.06)] bg-white p-3 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
      <div className="mb-2.5 flex items-center gap-1.5 font-[var(--font-geist-mono)] text-[9px] uppercase tracking-[0.14em] text-[#171717]/40">
        <span className="grid h-3 w-3 place-items-center rounded-sm bg-[#4a154b]/85 text-[8px] text-white">
          #
        </span>
        team-pulse · just now
      </div>

      {/* Yander bot message — the HIGHLIGHTED row */}
      <div className="flex items-start gap-2">
        <span className="grid h-5 w-5 shrink-0 place-items-center rounded bg-[#E05000]/15 text-[10px] text-[#E05000]">
          <Sparkles className="h-2.5 w-2.5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px]">
            <span className="font-semibold text-[#171717]">Yander</span>
            <span className="ml-1 text-[#171717]/40">9:08 AM</span>
          </p>
          <p className="mt-1 text-[10.5px] leading-snug text-[#171717]/85">
            <span className="rounded bg-[#fef3c7] px-1 py-px text-[#92400e]">
              Quit-risk
            </span>{" "}
            elevated for Emily — workload up 28%.
          </p>
        </div>
      </div>

      {/* Two skeleton-only follow-ups */}
      <div className="mt-2.5 flex items-start gap-2 opacity-70">
        <span className="h-5 w-5 shrink-0 rounded-full bg-rose-100" />
        <div className="flex-1 space-y-1 pt-0.5">
          <SkeletonBar w="40%" />
          <SkeletonBar w="80%" tone="muted" />
        </div>
      </div>
      <div className="mt-2 flex items-start gap-2 opacity-50">
        <span className="h-5 w-5 shrink-0 rounded-full bg-emerald-100" />
        <div className="flex-1 space-y-1 pt-0.5">
          <SkeletonBar w="35%" />
          <SkeletonBar w="60%" tone="muted" />
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────── FEATURE SECTIONS ─────────────────────────────── */

function CapabilityLink({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#"
      className="group inline-flex items-center gap-1.5 self-start tracking-[-0.005em] transition-colors hover:text-[#171717]"
    >
      <span>{children}</span>
      <span className="text-[#171717]/30 transition-all group-hover:translate-x-0.5 group-hover:text-[#171717]/50">
        ↗
      </span>
    </a>
  )
}

function FeatureFrame({
  num,
  eyebrow,
  title,
  body,
  chips,
  capabilityLabel,
  reverse,
  visual,
}: {
  num: string
  eyebrow: string
  title: React.ReactNode
  body: string
  chips: string[]
  capabilityLabel?: string
  reverse?: boolean
  visual: React.ReactNode
}) {
  // Split chips into 2 columns for the categorized list pattern
  const half = Math.ceil(chips.length / 2)
  const colA = chips.slice(0, half)
  const colB = chips.slice(half)
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.08 }}
          className={cn(
            "grid items-start gap-12 lg:grid-cols-2 lg:gap-16",
            reverse && "lg:[&>div:first-child]:order-2",
          )}
        >
          <motion.div variants={fadeUp} className="lg:pt-8">
            <p className="font-[var(--font-geist-mono)] text-[12px] text-[#171717]/40">
              {num}
            </p>
            <h2 className="mt-3 text-balance font-medium text-[#171717] text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.08] tracking-[-0.025em]">
              {title}
            </h2>
            <p className="mt-5 max-w-md text-[15.5px] leading-[1.55] text-[#171717]/65">
              {body}
            </p>

            {/* Categorized capabilities list — Interfere's pattern */}
            <div className="mt-12">
              <p className="border-t border-[rgba(0,0,0,0.08)] pt-5 text-[14px] font-medium tracking-[-0.01em] text-[#171717]">
                {capabilityLabel ?? eyebrow}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 text-[14px] text-[#171717]/65">
                {colA.map((c) => (
                  <CapabilityLink key={c}>{c}</CapabilityLink>
                ))}
                {colB.map((c) => (
                  <CapabilityLink key={c}>{c}</CapabilityLink>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div variants={fadeUp}>{visual}</motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function FeatureSource() {
  const chips = [
    "AI Sourcing",
    "Global Networks",
    "Passive Talent",
    "Skills Matching",
    "Salary Bands",
    "Work-Style Fit",
  ]
  return (
    <FeatureFrame
      num="01"
      eyebrow="Source"
      capabilityLabel="Global sourcing"
      title={
        <>
          Source talent your funnel{" "}
          <AccentSerif>can&apos;t reach.</AccentSerif>
        </>
      }
      body="AI sourcing surfaces passive candidates across 428 million profiles. Real understanding of skills, work style, and culture — not keyword matching."
      chips={chips}
      visual={<InboxMockup />}
    />
  )
}

function FeatureEvaluate() {
  const chips = [
    "Culture Fit",
    "Async Assessments",
    "Communication",
    "Remote Readiness",
    "Self-Management",
    "Reference Checks",
  ]
  return (
    <FeatureFrame
      num="02"
      eyebrow="Evaluate"
      capabilityLabel="Structured evaluation"
      reverse
      title={
        <>
          Evaluate without the{" "}
          <AccentSerif>busywork.</AccentSerif>
        </>
      }
      body="Structured async assessments replace 30-minute screening calls. Yander runs the whole loop — you review when there's a signal worth your time."
      chips={chips}
      visual={<DiffMockup />}
    />
  )
}

function FeatureRetain() {
  const chips = [
    "Quit-Risk Scores",
    "Workload Signals",
    "Slack Alerts",
    "No Surveys",
    "Privacy-First",
    "Async Q&A",
  ]
  return (
    <FeatureFrame
      num="03"
      eyebrow="Retain"
      capabilityLabel="Pulse signals"
      title={
        <>
          See problems{" "}
          <AccentSerif>before they leave.</AccentSerif>
        </>
      }
      body="Yander Pulse turns daily tool activity into team-health signals. Quit-risk, workload spikes, and engagement drops — surfaced before they cost you a hire."
      chips={chips}
      visual={<PulseMockup />}
    />
  )
}

/* ─────────────────────────── Feature mockups ─────────────────────────── */

function InboxMockup() {
  const groups = [
    {
      title: "NEW LEADS",
      count: 6,
      tone: "text-[#78350f] bg-amber-50",
      rows: [
        { id: "C-2814", name: "Maria Santos", role: "Senior Engineer", match: "96%", region: "BR" },
        { id: "C-2813", name: "Raj Patel", role: "ML Engineer", match: "94%", region: "IN" },
      ],
    },
    {
      title: "SHORTLISTED",
      count: 3,
      tone: "text-[#1e40af] bg-blue-50",
      rows: [
        { id: "C-2790", name: "Lucas Ferreira", role: "Backend Engineer", match: "92%", region: "BR" },
        { id: "C-2788", name: "Priya Sharma", role: "Product Designer", match: "89%", region: "IN" },
      ],
    },
    {
      title: "INTERVIEWED",
      count: 4,
      tone: "text-[#14532d] bg-emerald-50",
      rows: [
        { id: "C-2701", name: "Sofia Martinez", role: "Performance Marketing", match: "91%", region: "CO" },
      ],
    },
  ]
  return (
    <div
      className={cn(
        "rotate-[1.5deg] overflow-hidden rounded-2xl border border-[rgba(0,0,0,0.06)] bg-white",
        MOCKUP_SHADOW,
      )}
    >
      <div className="flex items-center gap-2 border-b border-[rgba(0,0,0,0.06)] bg-[#fafaf9] px-4 py-2.5 font-[var(--font-geist-mono)] text-[11px] uppercase tracking-[0.14em] text-[#171717]/45">
        <Users className="h-3.5 w-3.5" /> Candidate inbox · senior engineer
      </div>
      <div className="divide-y divide-[rgba(0,0,0,0.06)]">
        {groups.map((g) => (
          <div key={g.title}>
            <div className="flex items-center justify-between bg-[#fafaf9] px-4 py-2 font-[var(--font-geist-mono)] text-[10px] tracking-wider">
              <span className={cn("inline-flex items-center gap-1.5 rounded px-1.5 py-0.5", g.tone)}>
                {g.title} <span className="opacity-60">{g.count}</span>
              </span>
              <span className="text-[#171717]/40">Sort: Match score ↓</span>
            </div>
            {g.rows.map((row) => (
              <div
                key={row.id}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[#fafaf9]"
              >
                <span className="font-[var(--font-geist-mono)] text-[10.5px] text-[#171717]/40 w-12 shrink-0">
                  {row.id}
                </span>
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-rose-200 to-amber-200 text-[9px] font-medium text-[#5a3a1a]">
                  {row.name.split(" ").map((s) => s[0]).join("")}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-[13px] font-medium text-[#171717]">
                    {row.name}
                  </p>
                  <p className="truncate text-[11.5px] text-[#171717]/45">{row.role}</p>
                </div>
                <span className="font-[var(--font-geist-mono)] text-[11px] text-[#171717]/45">{row.region}</span>
                <span className="font-[var(--font-geist-mono)] text-[12px] text-[#15803d]">{row.match}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Non-technical assessment-dashboard mockup — shows what an evaluator
 * actually sees when reviewing a candidate. Score, rubric breakdown,
 * trait observations. No code.
 */
function DiffMockup() {
  const rubric = [
    { label: "Systems thinking", score: 9, note: "Designed checkout pipeline at scale" },
    { label: "Communication", score: 8, note: "Concise written answers, strong structure" },
    { label: "Ownership", score: 9, note: "Shipped under-budget, kept docs current" },
    { label: "Remote readiness", score: 9, note: "5 yrs async-first" },
  ]
  return (
    <div
      className={cn(
        "-rotate-[1deg] overflow-hidden rounded-2xl border border-[rgba(0,0,0,0.06)] bg-white",
        MOCKUP_SHADOW,
      )}
    >
      <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.06)] bg-[#fafaf9] px-5 py-3">
        <div className="flex items-center gap-2 text-[12.5px]">
          <Sparkles className="h-3.5 w-3.5 text-[#E05000]" />
          <span className="font-medium text-[#171717]">Async assessment</span>
          <span className="text-[#171717]/40">·</span>
          <span className="text-[#171717]/55">Senior Engineer</span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2 py-0.5 text-[11.5px] font-medium text-[#15803d]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Completed · 38 min
        </span>
      </div>

      <div className="grid grid-cols-[1fr_auto] items-end gap-6 border-b border-[rgba(0,0,0,0.06)] px-5 py-5">
        <div>
          <p className="font-[var(--font-geist-mono)] text-[10.5px] uppercase tracking-[0.18em] text-[#171717]/40">
            Overall match
          </p>
          <p className="mt-1 text-[42px] font-medium leading-none tracking-[-0.03em] text-[#171717]">
            9.2 <span className="text-[#171717]/35 text-[24px]">/ 10</span>
          </p>
          <p className="mt-2 text-[12.5px] text-[#171717]/60">
            Above bar on every rubric. Recommended for founder screen.
          </p>
        </div>
        <div className="text-right">
          <p className="font-[var(--font-geist-mono)] text-[10.5px] uppercase tracking-[0.18em] text-[#171717]/40">
            Percentile
          </p>
          <p className="mt-1 font-[var(--font-geist-mono)] text-[20px] text-[#15803d]">
            Top 4%
          </p>
        </div>
      </div>

      <div className="space-y-3 px-5 py-4">
        {rubric.map((r) => (
          <div key={r.label} className="flex items-center gap-4">
            <div className="w-32 shrink-0">
              <p className="text-[12.5px] font-medium text-[#171717]">{r.label}</p>
              <p className="truncate text-[11px] text-[#171717]/50">{r.note}</p>
            </div>
            <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-[#0a0a0a]/[0.05]">
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-emerald-500/85"
                style={{ width: `${r.score * 10}%` }}
              />
            </div>
            <span className="w-6 shrink-0 text-right font-[var(--font-geist-mono)] text-[12px] text-[#171717]">
              {r.score}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-[rgba(0,0,0,0.06)] bg-[#fafaf9] px-5 py-3 text-[12px]">
        <span className="text-[#171717]/55">Scored automatically · reviewed by Luke</span>
        <span className="flex items-center gap-2 text-[#171717]">
          <button className="rounded-md border border-[rgba(0,0,0,0.08)] bg-white px-2.5 py-1 text-[12px] font-medium text-[#171717]/70 hover:text-[#171717]">
            View transcript
          </button>
          <button className="rounded-md bg-[#171717] px-2.5 py-1 text-[12px] font-medium text-white hover:bg-black">
            Send to interview
          </button>
        </span>
      </div>
    </div>
  )
}

function PulseMockup() {
  const team = [
    { name: "Sarah Chen", role: "Designer", score: 9, trend: "up" as const, tone: "rose" as const },
    { name: "Marcus Johnson", role: "Strategist", score: 8, trend: "up" as const, tone: "amber" as const },
    { name: "Emily Rodriguez", role: "PM", score: 5, trend: "down" as const, tone: "indigo" as const },
    { name: "Ryan Peters", role: "Media Buyer", score: 9, trend: "up" as const, tone: "emerald" as const },
  ]
  return (
    <div
      className={cn(
        "rotate-[1deg] overflow-hidden rounded-2xl border border-[rgba(0,0,0,0.06)] bg-white",
        MOCKUP_SHADOW,
      )}
    >
      <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.06)] bg-[#fafaf9] px-4 py-2.5">
        <span className="font-[var(--font-geist-mono)] text-[11px] uppercase tracking-[0.14em] text-[#171717]/45">
          Pulse · This week
        </span>
        <span className="inline-flex items-center gap-1.5 font-[var(--font-geist-mono)] text-[10.5px] text-[#4a3212]">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          1 quit-risk flag
        </span>
      </div>
      <div className="divide-y divide-[rgba(0,0,0,0.06)]">
        {team.map((m) => (
          <div key={m.name} className="flex items-center gap-3 px-4 py-3">
            <MiniAvatar tone={m.tone} letter={m.name[0]} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium text-[#171717]">
                {m.name}
              </p>
              <p className="truncate text-[11.5px] text-[#171717]/45">{m.role}</p>
            </div>
            <div className="flex items-center gap-2 font-[var(--font-geist-mono)] text-[12px]">
              <span
                className={cn(
                  m.score >= 8 && "text-[#15803d]",
                  m.score >= 6 && m.score < 8 && "text-[#b45309]",
                  m.score < 6 && "text-[#b91c1c]",
                )}
              >
                {m.score}.0
              </span>
              <TrendingUp
                className={cn(
                  "h-3.5 w-3.5",
                  m.trend === "up" ? "text-[#15803d]" : "rotate-180 text-[#b91c1c]",
                )}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-[rgba(0,0,0,0.06)] bg-[#fafaf9] px-4 py-3">
        <div className="flex items-start gap-2 text-[12.5px] text-[#171717]/60">
          <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#E05000]" />
          <p>
            <span className="text-[#171717]">Emily</span> dropped 3 points since
            last week. Workload up 28%. <span className="text-[#E05000] underline-offset-2 hover:underline">View signal →</span>
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────── PULL QUOTE ─────────────────────────────── */

function PullQuote() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1240px] px-6">
        <motion.div
          initial={{ opacity: 0.7, y: 16, filter: "blur(2px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="relative overflow-hidden rounded-3xl border border-[rgba(0,0,0,0.06)] px-6 py-20 lg:py-28"
        >
          {/* Layered peach + lavender gradient backdrop */}
          <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFE9D8] via-white to-[#E8DCFF]" />
            <div className="absolute -left-20 top-0 h-full w-[40%] bg-[radial-gradient(ellipse_at_center,rgba(255,180,140,0.45),transparent_70%)]" />
            <div className="absolute -right-20 bottom-0 h-full w-[40%] bg-[radial-gradient(ellipse_at_center,rgba(195,170,255,0.40),transparent_70%)]" />
          </div>

          <div className="relative mx-auto max-w-[820px] text-center">
            <p
              className="text-balance text-[clamp(1.5rem,2.4vw,1.75rem)] leading-[1.45] text-[#171717]"
              style={{ fontWeight: 500 }}
            >
              &ldquo;Every hour I spent screening résumés was an hour I wasn&apos;t
              building.{" "}
              <span className="text-[#171717]/35">
                Yander gives founders their time back.&rdquo;
              </span>
            </p>
            <div className="mt-10 flex items-center justify-center gap-3">
              <span className="relative">
                <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-rose-200 to-amber-200 text-[13px] font-medium text-[#5a3a1a]">
                  AB
                </span>
                <span className="absolute -bottom-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full bg-[#171717] text-white ring-2 ring-white">
                  <YanderMark className="h-2.5 w-2.5" />
                </span>
              </span>
              <div className="text-left">
                <p className="text-[14px] font-medium text-[#171717]">Arnel Bukva</p>
                <p className="text-[12.5px] text-[#171717]/55">Founder, Loudface</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function EnvelopeFlourish() {
  // Two-envelope flap pattern that mirrors Interfere's quote panel.
  // Hairline strokes only — no fills — so the gradient backdrop reads first.
  return (
    <svg
      viewBox="0 0 1200 480"
      className="absolute inset-0 h-full w-full text-[#171717]/[0.06]"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Left envelope */}
      <g stroke="currentColor" strokeWidth="1" fill="none" strokeLinejoin="round">
        <rect x="40" y="60" width="420" height="280" rx="14" />
        <path d="M40 60 L250 220 L460 60" />
        <path d="M40 340 L250 220 L460 340" />
      </g>
      {/* Right envelope */}
      <g stroke="currentColor" strokeWidth="1" fill="none" strokeLinejoin="round">
        <rect x="740" y="140" width="420" height="280" rx="14" />
        <path d="M740 140 L950 300 L1160 140" />
        <path d="M740 420 L950 300 L1160 420" />
      </g>
      {/* Subtle diagonals — depth */}
      <g stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.5">
        <path d="M40 60 L460 340" />
        <path d="M460 60 L40 340" />
        <path d="M740 140 L1160 420" />
        <path d="M1160 140 L740 420" />
      </g>
    </svg>
  )
}

/* ─────────────────────────────── SECURITY ─────────────────────────────── */

function SecuritySection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1240px] px-6">
        <p className="font-[var(--font-geist-mono)] text-[11px] uppercase tracking-[0.22em] text-[#171717]/40">
          Security
        </p>
        <h2 className="mt-4 max-w-2xl text-balance font-medium text-[#171717] text-[clamp(2rem,3.6vw,2.75rem)] leading-[1.05] tracking-[-0.02em]">
          Secure by design.{" "}
          <AccentSerif>Safe by default.</AccentSerif>
        </h2>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <SecurityCard
            icon={<Shield className="h-5 w-5" />}
            title="SOC 2 Type II"
            body="Independently audited controls covering security, availability, and confidentiality. Annual reports available on request."
          />
          <SecurityCard
            icon={<Shield className="h-5 w-5" />}
            title="GDPR & ISO 27001"
            body="Candidate data is stored in-region with full audit trails. Sub-processors are reviewed annually and documented in our DPA."
          />
        </div>
      </div>
    </section>
  )
}

function SecurityCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode
  title: string
  body: string
}) {
  return (
    <div className="rounded-2xl border border-[rgba(0,0,0,0.06)] bg-white p-7 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
      <div className="grid h-9 w-9 place-items-center rounded-md bg-[#f5f5f4] text-[#171717]">
        {icon}
      </div>
      <h3 className="mt-5 text-[18px] font-semibold tracking-tight text-[#171717]">
        {title}
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-[#171717]/60">{body}</p>
    </div>
  )
}

/* ─────────────────────────────── CHANGELOG ─────────────────────────────── */

function ChangelogSection() {
  const releases = [
    {
      date: "May 14 2026",
      title: "Quit-risk predictions in Pulse",
      body: "Pulse now flags employees with elevated quit-risk 4–6 weeks before they typically resign. Trained on signals from 12k+ knowledge-worker months.",
      preview: <PreviewChart />,
    },
    {
      date: "Apr 28 2026",
      title: "Slack-first outreach",
      body: "Candidates can be sourced, evaluated, and shortlisted without leaving Slack. Yander posts thread updates and waits for your approval.",
      preview: <PreviewSlack />,
    },
    {
      date: "Apr 12 2026",
      title: "Async skill assessments",
      body: "Replace your 30-minute screening calls with structured assessments scored on a 10-point rubric. Default rubrics ship for engineering, design, marketing, and ops.",
      preview: <PreviewRubric />,
    },
  ]
  return (
    <section className="border-t border-[rgba(0,0,0,0.06)] bg-[#fafaf9] py-24 lg:py-32">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="font-[var(--font-geist-mono)] text-[11px] uppercase tracking-[0.22em] text-[#171717]/40">
              Changelog
            </p>
            <h2 className="mt-4 text-balance font-medium text-[#171717] text-[clamp(2rem,3.6vw,2.75rem)] leading-[1.05] tracking-[-0.02em]">
              The <AccentSerif>Latest</AccentSerif>
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-1 text-[13px] font-medium text-[#171717]/60 hover:text-[#171717]"
          >
            See all releases <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mt-12 divide-y divide-[rgba(0,0,0,0.07)]">
          {releases.map((r) => (
            <div
              key={r.title}
              className="grid items-start gap-6 py-7 lg:grid-cols-[140px_1fr_220px] lg:gap-12"
            >
              <p className="font-[var(--font-geist-mono)] text-[12px] uppercase tracking-[0.14em] text-[#171717]/45">
                {r.date}
              </p>
              <div>
                <h3 className="text-[17px] font-medium tracking-tight text-[#171717]">
                  {r.title}
                </h3>
                <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[#171717]/60">
                  {r.body}
                </p>
              </div>
              <div className="overflow-hidden rounded-lg border border-[rgba(0,0,0,0.06)] bg-white p-3">
                {r.preview}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* Inline mini-previews — small visuals that hint at what each release ships */

function PreviewChart() {
  return (
    <div>
      <div className="flex items-center justify-between font-[var(--font-geist-mono)] text-[9px] uppercase tracking-[0.14em] text-[#171717]/40">
        <span>Quit-risk</span>
        <span className="text-[#4a3212]">1 flag</span>
      </div>
      <svg viewBox="0 0 220 60" className="mt-2 h-12 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="cl-chart" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 0 48 C 30 46, 60 42, 90 36 S 140 22, 180 12 L 220 8 L 220 60 L 0 60 Z"
          fill="url(#cl-chart)"
        />
        <path
          d="M 0 48 C 30 46, 60 42, 90 36 S 140 22, 180 12 L 220 8"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="180" cy="12" r="2.5" fill="#F59E0B" />
        <circle cx="180" cy="12" r="5" fill="#F59E0B" fillOpacity="0.2" />
      </svg>
      <div className="mt-1 flex justify-between font-[var(--font-geist-mono)] text-[9px] text-[#171717]/30">
        <span>W-4</span>
        <span>W-2</span>
        <span>Now</span>
      </div>
    </div>
  )
}

function PreviewSlack() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 font-[var(--font-geist-mono)] text-[9px] uppercase tracking-[0.14em] text-[#171717]/40">
        <span className="h-1.5 w-1.5 rounded-full bg-[#4A154B]" />
        <span>#hiring · 2 new</span>
      </div>
      <div className="space-y-1.5 text-[10.5px]">
        <div className="flex items-start gap-2">
          <span className="grid h-4 w-4 shrink-0 place-items-center rounded bg-amber-100 text-[8px] font-medium text-[#4a3212]">
            Y
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[#171717]">
              <span className="font-medium">Yander</span>{" "}
              <span className="text-[#171717]/40">10:42</span>
            </p>
            <p className="truncate text-[#171717]/60">2 candidates shortlisted for review.</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span className="grid h-4 w-4 shrink-0 place-items-center rounded bg-rose-100 text-[8px] font-medium text-[#8a3a3a]">
            P
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[#171717]">
              <span className="font-medium">Paul</span>{" "}
              <span className="text-[#171717]/40">10:43</span>
            </p>
            <p className="truncate text-[#171717]/60">Approve · move to founder screen</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function PreviewRubric() {
  const rows = [
    { label: "Systems", score: 9 },
    { label: "Comms", score: 8 },
    { label: "Autonomy", score: 9 },
  ]
  return (
    <div>
      <div className="flex items-center justify-between font-[var(--font-geist-mono)] text-[9px] uppercase tracking-[0.14em] text-[#171717]/40">
        <span>Rubric · senior</span>
        <span className="text-[#15803d]">9.2</span>
      </div>
      <div className="mt-2 space-y-1.5">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-2">
            <span className="w-14 shrink-0 text-[10px] text-[#171717]/60">{r.label}</span>
            <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-[#0a1d08]/5">
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-emerald-500/80"
                style={{ width: `${r.score * 10}%` }}
              />
            </div>
            <span className="w-6 shrink-0 text-right font-[var(--font-geist-mono)] text-[10px] text-[#171717]">
              {r.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────── FINAL CTA ─────────────────────────────── */

function FinalCTA() {
  const { openModal: openDemoModal } = useDemoModal()
  return (
    <section className="py-28 lg:py-36">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.12 }}
        className="mx-auto max-w-[1240px] px-6 text-center"
      >
        <motion.h2
          variants={fadeUp}
          className="mx-auto max-w-3xl text-balance font-medium text-[#171717] text-[clamp(2.5rem,5.2vw,3.625rem)] leading-[0.97] tracking-[-0.02em]"
        >
          The first AI agent that{" "}
          <AccentSerif>recruits for you.</AccentSerif>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-[#171717]/60"
        >
          Free to start. Paid plans from $89/mo. No placement fees, ever.
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="mt-9 flex items-center justify-center gap-3"
        >
          <button
            onClick={openDemoModal}
            className="inline-flex h-11 items-center rounded-md border border-[rgba(0,0,0,0.08)] bg-white px-6 text-[14px] font-medium text-[#171717] transition-colors hover:border-[#171717]/30"
          >
            Book a demo
          </button>
          <Link
            href="/pricing"
            className="inline-flex h-11 items-center rounded-md bg-[#171717] px-6 text-[14px] font-medium text-white transition-colors hover:bg-black"
          >
            Get started free
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ─────────────────────────────── FOOTER ─────────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-[rgba(0,0,0,0.06)] bg-[#fafaf9]">
      <div className="mx-auto max-w-[1240px] px-6 py-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-[13px] text-[#171717]/60">
            <span>Ask about Yander on</span>
            <a
              href="#"
              className="rounded border border-[rgba(0,0,0,0.08)] bg-white px-2 py-1 font-[var(--font-geist-mono)] text-[11px] hover:bg-[#f5f5f4]"
            >
              X
            </a>
            <a
              href="#"
              className="rounded border border-[rgba(0,0,0,0.08)] bg-white px-2 py-1 font-[var(--font-geist-mono)] text-[11px] hover:bg-[#f5f5f4]"
            >
              LinkedIn
            </a>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,0,0,0.06)] bg-white px-3 py-1.5 text-[12px] text-[#171717]/60">
            <span className="relative grid place-items-center">
              <span className="absolute h-2 w-2 animate-ping rounded-full bg-emerald-500/40" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            All systems operational
          </span>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-2">
              <YanderMark className="h-5 w-5 text-[#171717]" />
              <span className="text-[14px] font-medium tracking-tight text-[#171717]">
                Yander
              </span>
            </div>
            <p className="mt-3 max-w-xs text-[12.5px] leading-relaxed text-[#171717]/45">
              The AI agent for hiring and retaining global teams. Built in San
              Francisco for remote-first companies.
            </p>
          </div>
          <FooterCol
            title="Company"
            items={["Pulse", "Pricing", "Customers", "Changelog", "Contact", "Roadmap"]}
          />
          <FooterCol title="Legal" items={["Privacy", "Terms", "Cookie Policy", "DPA"]} />
          <FooterCol title="Social" items={["X", "LinkedIn", "Discord"]} />
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(0,0,0,0.06)] pt-6">
          <p className="font-[var(--font-geist-mono)] text-[10.5px] uppercase tracking-[0.18em] text-[#171717]/45">
            © 2026 Yander Labs, Inc.
          </p>
          <p className="font-[var(--font-geist-mono)] text-[10.5px] uppercase tracking-[0.18em] text-[#171717]/30">
            Hires your funnel can&apos;t reach.
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="font-[var(--font-geist-mono)] text-[10.5px] uppercase tracking-[0.18em] text-[#171717]/40">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5 text-[13px] text-[#171717]/60">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="hover:text-[#171717]">
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
