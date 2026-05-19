"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Calendar, MessageCircle, Users, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/**
 * FeatureCards — a Tailark features-10 adaptation, rebuilt against Yander tokens.
 *
 * Inspiration: wonderful.ai (black surface, balanced serif headline, bracketed
 * corner ornaments). Layout retains the 2-up + 1-wide grid from the original.
 *
 * Mounting: import from a page (e.g. `app/(main)/page.tsx` or a future
 * `/platform` route). Not auto-wired into the existing V2HomePage.
 */
export function FeatureCards() {
  return (
    <section className="bg-[#0A0A0A] py-24 md:py-32 text-white">
      <Container size="wide">
        <SectionHeader />

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCell
            heading="Built for real workflows"
            description="Drop Yander into your hiring pipeline without re-platforming. Sync from your ATS, route candidates through your scoring rubric, and ship offers in the tools your team already uses."
            visual={<WorkflowVisual />}
          />

          <FeatureCell
            heading="Scheduled, end-to-end"
            description="From first screen to signed offer, every interview slot, evaluator, and reminder is choreographed by the agent. You only see the work that needs a human eye."
            visual={<CalendarVisual />}
          />

          <FeatureCell
            wide
            heading="Loops the whole hiring committee"
            description="Inclusion, exclusion, and join logic — the same primitives your team uses on a whiteboard — codified into reusable evaluation policies. Every committee member operates from the same source of truth."
            visual={<CircuitVisual />}
          />
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Section header — wonderful.ai-style balanced serif headline + tagline      */
/* -------------------------------------------------------------------------- */

function SectionHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="max-w-3xl"
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
          [03]
        </span>
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/60">
          The Platform
        </span>
      </div>
      <h2
        className="mt-6 font-serif text-4xl leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl md:text-[64px]"
        style={{ textWrap: "balance" }}
      >
        The hiring agent that meets your team where it already works.
      </h2>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60">
        Three primitives, one platform. Every step from sourcing to offer is
        coordinated by an agent that learned how your team hires — not a generic
        ATS overlay.
      </p>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* FeatureCell — Tailark card shape, Yander surface, bracketed corners        */
/* -------------------------------------------------------------------------- */

interface FeatureCellProps {
  heading: string;
  description: string;
  visual: ReactNode;
  wide?: boolean;
}

function FeatureCell({ heading, description, visual, wide }: FeatureCellProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col bg-[#0A0A0A] p-8 md:p-10",
        wide && "lg:col-span-3 lg:flex-row lg:items-stretch lg:gap-12"
      )}
    >
      <CornerBrackets />

      <div className={cn("flex flex-col", wide && "lg:max-w-sm lg:py-6")}>
        <h3 className="font-serif text-2xl leading-[1.15] tracking-[-0.02em] text-white md:text-[28px]">
          {heading}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/55">
          {description}
        </p>
      </div>

      <div
        className={cn(
          "mt-8 flex flex-1 items-center justify-center",
          wide && "lg:mt-0"
        )}
      >
        {visual}
      </div>
    </div>
  );
}

/* Corner brackets — single SVG, mirrored four ways via absolute positioning. */
function CornerBrackets() {
  const bracket = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 0H6"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
      />
      <path
        d="M0 0V6"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
      />
    </svg>
  );

  return (
    <div className="pointer-events-none absolute inset-3 text-white/30">
      <span className="absolute left-0 top-0">{bracket}</span>
      <span className="absolute right-0 top-0 rotate-90">{bracket}</span>
      <span className="absolute bottom-0 right-0 rotate-180">{bracket}</span>
      <span className="absolute bottom-0 left-0 -rotate-90">{bracket}</span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Visual 1 — workflow rail (replaces Tailark's "DualModeImage")              */
/* -------------------------------------------------------------------------- */

function WorkflowVisual() {
  const rows = [
    { label: "ATS sync", status: "Live", tone: "ok" },
    { label: "Rubric scoring", status: "Running", tone: "active" },
    { label: "Offer letter", status: "Queued", tone: "pending" },
  ] as const;

  return (
    <div className="w-full rounded-md border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center gap-2 border-b border-white/5 pb-3">
        <Users className="h-3.5 w-3.5 text-white/40" strokeWidth={1.5} />
        <span className="font-mono text-[11px] uppercase tracking-wider text-white/40">
          Workflow · Senior Eng
        </span>
      </div>
      <div className="mt-3 space-y-2.5">
        {rows.map((row, i) => (
          <div key={row.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[10px] text-white/30">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-xs text-white/80">{row.label}</span>
            </div>
            <StatusPill status={row.status} tone={row.tone} />
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusPill({
  status,
  tone,
}: {
  status: string;
  tone: "ok" | "active" | "pending";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium",
        tone === "ok" && "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
        tone === "active" && "border-white/30 bg-white/10 text-white",
        tone === "pending" && "border-white/10 bg-white/[0.04] text-white/50"
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          tone === "ok" && "bg-emerald-400",
          tone === "active" && "animate-pulse bg-white",
          tone === "pending" && "bg-white/40"
        )}
      />
      {status}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Visual 2 — interview slot calendar (replaces Tailark's calendar mock)      */
/* -------------------------------------------------------------------------- */

function CalendarVisual() {
  const slots = [
    { day: "MON", date: "12", booked: false },
    { day: "TUE", date: "13", booked: true, label: "Phone screen" },
    { day: "WED", date: "14", booked: true, label: "Onsite loop" },
    { day: "THU", date: "15", booked: false },
    { day: "FRI", date: "16", booked: true, label: "Debrief" },
  ];

  return (
    <div className="w-full rounded-md border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-3.5 w-3.5 text-white/40" strokeWidth={1.5} />
          <span className="font-mono text-[11px] uppercase tracking-wider text-white/40">
            Week 12 · 5 slots
          </span>
        </div>
        <span className="text-[10px] text-white/30">3 booked</span>
      </div>
      <div className="mt-3 grid grid-cols-5 gap-1.5">
        {slots.map((s) => (
          <div
            key={s.date}
            className={cn(
              "rounded border px-2 py-2 text-center",
              s.booked
                ? "border-white/30 bg-white/10"
                : "border-dashed border-white/10 bg-transparent"
            )}
          >
            <div className="font-mono text-[9px] uppercase tracking-wider text-white/40">
              {s.day}
            </div>
            <div className="mt-0.5 text-sm font-medium text-white/90">
              {s.date}
            </div>
            {s.booked && (
              <div className="mt-1 truncate text-[9px] text-white/50">
                {s.label}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
        <span className="flex items-center gap-1.5 text-[10px] text-white/50">
          <MessageCircle className="h-3 w-3" strokeWidth={1.5} />
          Auto-confirms sent
        </span>
        <button className="inline-flex items-center gap-1 text-[10px] font-medium text-white/70 hover:text-white">
          Open <ArrowRight className="h-2.5 w-2.5" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Visual 3 — CircuitVisual replaces the Tailark "Inclusion/Join/Exclusion"   */
/* -------------------------------------------------------------------------- */

function CircuitVisual() {
  return (
    <div className="flex w-full items-center justify-center gap-8 md:gap-12">
      <CircularOp pattern="border" label="Inclusion" />
      <Connector />
      <CircularOp pattern="primary" label="Join" />
      <Connector />
      <CircularOp pattern="none" label="Exclusion" />
    </div>
  );
}

function CircularOp({
  pattern,
  label,
}: {
  pattern: "none" | "border" | "primary";
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={cn(
          "relative flex h-20 w-20 items-center justify-center rounded-full",
          pattern === "none" && "border border-dashed border-white/20",
          pattern === "border" &&
            "border border-white/30 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.06)_0_4px,transparent_4px_8px)]",
          pattern === "primary" && "border border-white/40 bg-white/90"
        )}
      >
        <span
          className={cn(
            "absolute inset-2 rounded-full",
            pattern === "none" && "border border-white/15",
            pattern === "border" && "border border-white/40",
            pattern === "primary" && "border border-black/10"
          )}
        />
      </div>
      <span className="font-mono text-[10px] uppercase tracking-wider text-white/50">
        {label}
      </span>
    </div>
  );
}

function Connector() {
  return (
    <div className="h-px w-8 bg-gradient-to-r from-white/0 via-white/30 to-white/0 md:w-12" />
  );
}
