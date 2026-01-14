"use client";

import { AnimatedSection, StaggerContainer, StaggerItem } from "../ui/AnimatedSection";
import { Container } from "../ui/Container";
import { SectionLabel } from "../ui/SectionLabel";
import { X, BarChart3, Shield, Check, Lock, Eye, Keyboard, Camera, ShieldCheck } from "lucide-react";

const privacyFeatures = [
  "No screenshots, keystroke logging, or webcam monitoring",
  "Focuses on trends and scores, not reading private messages",
  "Clear, role-based access so only the right leaders see sensitive insights",
];

const blockedItems = [
  { icon: Camera, label: "Screenshots", sublabel: "Never captured" },
  { icon: Keyboard, label: "Keystrokes", sublabel: "Never logged" },
  { icon: Eye, label: "Webcam", sublabel: "Never accessed" },
];

const allowedItems = [
  { icon: BarChart3, label: "Patterns Only", sublabel: "Aggregated insights" },
  { icon: Lock, label: "Role-Based Access", sublabel: "Protected data" },
];

function ShieldVisual() {
  return (
    <div className="relative flex items-center justify-center py-8">
      {/* Outer glow */}
      <div className="absolute w-48 h-48 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full blur-3xl" />

      {/* Shield container */}
      <div className="relative">
        {/* Shield SVG */}
        <svg width="180" height="200" viewBox="0 0 200 220" fill="none" className="drop-shadow-2xl">
          <defs>
            <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="shieldInnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d1fae5" />
              <stop offset="100%" stopColor="#a7f3d0" />
            </linearGradient>
          </defs>

          {/* Shield shape */}
          <path
            d="M100 10 L180 40 L180 100 C180 160 140 200 100 210 C60 200 20 160 20 100 L20 40 L100 10Z"
            fill="url(#shieldGradient)"
            stroke="#059669"
            strokeWidth="2"
          />

          {/* Inner shield */}
          <path
            d="M100 30 L160 52 L160 95 C160 145 130 175 100 185 C70 175 40 145 40 95 L40 52 L100 30Z"
            fill="url(#shieldInnerGradient)"
            opacity="0.5"
          />

          {/* Checkmark */}
          <path
            d="M70 105 L90 125 L130 85"
            stroke="white"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>

        {/* Floating blocked items */}
        <div className="absolute -left-6 top-2 animate-bounce" style={{ animationDuration: "3s" }}>
          <div className="bg-white rounded-xl p-2 shadow-lg border border-red-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center">
                <Camera className="w-3 h-3 text-red-500" />
              </div>
              <X className="w-3.5 h-3.5 text-red-500" />
            </div>
          </div>
        </div>

        <div className="absolute -right-6 top-10 animate-bounce" style={{ animationDuration: "3.5s", animationDelay: "200ms" }}>
          <div className="bg-white rounded-xl p-2 shadow-lg border border-red-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center">
                <Keyboard className="w-3 h-3 text-red-500" />
              </div>
              <X className="w-3.5 h-3.5 text-red-500" />
            </div>
          </div>
        </div>

        <div className="absolute -left-2 bottom-12 animate-bounce" style={{ animationDuration: "4s", animationDelay: "400ms" }}>
          <div className="bg-white rounded-xl p-2 shadow-lg border border-red-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center">
                <Eye className="w-3 h-3 text-red-500" />
              </div>
              <X className="w-3.5 h-3.5 text-red-500" />
            </div>
          </div>
        </div>

        {/* Allowed items */}
        <div className="absolute -right-2 bottom-6 animate-bounce" style={{ animationDuration: "3.2s", animationDelay: "600ms" }}>
          <div className="bg-white rounded-xl p-2 shadow-lg border border-emerald-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center">
                <BarChart3 className="w-3 h-3 text-emerald-600" />
              </div>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PrivacyFirst() {
  return (
    <section className="py-20 md:py-28 divider-dashed">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Visual - Shield */}
          <AnimatedSection direction="left">
            <div className="flex flex-col items-center">
              <ShieldVisual />

              {/* Legend below shield */}
              <div className="mt-4 flex items-center gap-6 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-gray-500">Blocked</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-gray-500">Allowed</span>
                </div>
              </div>

              {/* Data categories */}
              <div className="mt-6 grid grid-cols-2 gap-3 w-full max-w-sm">
                {/* Blocked */}
                <div className="bg-red-50/50 rounded-xl p-4 border border-red-100">
                  <p className="text-[10px] font-semibold text-red-600 uppercase tracking-wider mb-3">
                    Never Collected
                  </p>
                  <div className="space-y-2">
                    {blockedItems.map((item) => (
                      <div key={item.label} className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-red-100 flex items-center justify-center">
                          <X className="w-3 h-3 text-red-500" />
                        </div>
                        <span className="text-xs text-gray-600">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Allowed */}
                <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100">
                  <p className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider mb-3">
                    What We Analyze
                  </p>
                  <div className="space-y-2">
                    {allowedItems.map((item) => (
                      <div key={item.label} className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-emerald-100 flex items-center justify-center">
                          <Check className="w-3 h-3 text-emerald-600" />
                        </div>
                        <span className="text-xs text-gray-600">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection direction="right" delay={0.2}>
            <SectionLabel number="05">Privacy First</SectionLabel>
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-5 leading-tight">
              Built for Trust, Not Surveillance
            </h2>
            <p className="text-base text-gray-500 mb-8 leading-relaxed">
              Yander is designed to support managers and protect employees. It
              analyzes patterns in how work gets done, not every keystroke on a
              laptop.
            </p>

            <StaggerContainer className="space-y-4 mb-8">
              {privacyFeatures.map((feature) => (
                <StaggerItem key={feature}>
                  <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-[#E4E7EC] hover:border-emerald-200 hover:shadow-md transition-all duration-200">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-sm text-gray-600 pt-1.5">{feature}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Trust badge */}
            <div className="inline-flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl border border-emerald-100">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Your team&apos;s trust matters</p>
                <p className="text-xs text-gray-500">Privacy-first by design</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
