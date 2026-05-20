"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "./ui/Container";
import { TrackedLink } from "./ui/TrackedLink";
import { TrackedButton } from "./ui/TrackedButton";
import { CTAButtons, DemoButton, GetStartedButton } from "./ui/CTAButtons";
import { cn } from "@/lib/utils";
import { X, Menu, ChevronDown } from "lucide-react";
import { useDemoModal } from "./ui/DemoModal";

const productLinks = [
  {
    label: "Yander AI Recruiter",
    href: "/",
    description: "AI sourcing and vetting for global hires.",
  },
  {
    label: "Yander Pulse",
    href: "/pulse",
    description: "Real-time team performance intelligence.",
  },
  {
    label: "Integrations",
    href: "/integrations",
    description: "Slack, Notion, ClickUp, and more.",
  },
  {
    label: "Cost Calculator",
    href: "/calculator",
    description: "Compare global hiring costs.",
  },
];

const resourcesLinks = [
  {
    label: "Blog",
    href: "/blog",
    description: "AI recruiting and global hiring insights.",
  },
  {
    label: "Compare",
    href: "/compare",
    description: "Yander vs other hiring tools.",
  },
  {
    label: "Changelog",
    href: "/changelog",
    description: "Every product release.",
  },
  {
    label: "Remote Hiring Playbook",
    href: "/remote-hiring-playbook",
    description: "Free 2026 guide.",
  },
];

function DesktopDropdown({
  label,
  items,
}: {
  label: string;
  items: { label: string; href: string; description: string }[];
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-[13px] font-medium text-[#171717]/60 transition-colors hover:text-[#171717]"
      >
        {label}
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 transition-transform",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>
      <div
        className={cn(
          "absolute left-0 top-full pt-3 min-w-[280px] transition-all duration-150",
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-1 pointer-events-none",
        )}
      >
        <div className="bg-white border border-[rgba(0,0,0,0.06)] rounded-lg shadow-elevated overflow-hidden">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-3 hover:bg-[#F7F7F6] transition-colors group"
            >
              <span className="block text-sm font-medium text-[#171717] group-hover:text-[#171717]/70">
                {item.label}
              </span>
              <span className="block text-xs text-[#171717]/50 mt-0.5">
                {item.description}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openModal: openDemoModal } = useDemoModal();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navigation */}
      <nav
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-200 top-0",
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-[rgba(0,0,0,0.06)] py-3"
            : "bg-transparent py-5",
        )}
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Left: Logo + primary links */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center text-[#171717]">
                <Image
                  src="/logo.svg"
                  alt="Yander"
                  width={120}
                  height={35}
                  className="h-7 w-auto"
                  priority
                />
              </Link>
              <div className="hidden md:flex items-center gap-1">
                <DesktopDropdown label="Product" items={productLinks} />
                <Link
                  href="/pricing"
                  className="rounded-md px-3 py-1.5 text-[13px] font-medium text-[#171717]/60 transition-colors hover:text-[#171717]"
                >
                  Pricing
                </Link>
                <DesktopDropdown label="Resources" items={resourcesLinks} />
                <Link
                  href="/about"
                  className="rounded-md px-3 py-1.5 text-[13px] font-medium text-[#171717]/60 transition-colors hover:text-[#171717]"
                >
                  About
                </Link>
              </div>
            </div>

            {/* Right: CTAs — uses canonical site-wide CTA pair */}
            <div className="hidden md:flex items-center">
              <CTAButtons ctaLocation="nav" />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 -mr-2 text-[#171717]/60 hover:text-[#171717] hover:bg-[#F7F7F6] rounded-md transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </Container>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[70] md:hidden transition-opacity duration-300",
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-[320px] max-w-[85vw] bg-white shadow-xl transition-transform duration-300 ease-out overflow-y-auto",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex flex-col h-full">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-[rgba(0,0,0,0.06)]">
              <span className="text-sm font-semibold text-[#171717]">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 -mr-2 text-[#171717]/50 hover:text-[#171717] hover:bg-[#F7F7F6] rounded-md transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 p-4 space-y-1 overflow-y-auto">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-[#171717]/70 hover:text-[#171717] hover:bg-[#F7F7F6] rounded-md transition-colors"
              >
                Home
              </Link>
              <p className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-[#171717]/40">
                Product
              </p>
              {productLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm font-medium text-[#171717]/70 hover:text-[#171717] hover:bg-[#F7F7F6] rounded-md transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 mt-2 text-sm font-medium text-[#171717]/70 hover:text-[#171717] hover:bg-[#F7F7F6] rounded-md transition-colors"
              >
                Pricing
              </Link>
              <p className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-[#171717]/40">
                Resources
              </p>
              {resourcesLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm font-medium text-[#171717]/70 hover:text-[#171717] hover:bg-[#F7F7F6] rounded-md transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 mt-2 text-sm font-medium text-[#171717]/70 hover:text-[#171717] hover:bg-[#F7F7F6] rounded-md transition-colors"
              >
                About
              </Link>
            </div>

            {/* Drawer Footer — mobile CTAs (full-width, stacked) using
                canonical site-wide CTA pair via the single-button variants. */}
            <div className="p-4 border-t border-[rgba(0,0,0,0.06)] space-y-3">
              <DemoButton
                ctaLocation="nav_mobile"
                className="w-full justify-center"
                onClick={() => setMobileMenuOpen(false)}
              />
              <GetStartedButton
                ctaLocation="nav_mobile"
                className="w-full justify-center"
                onClick={() => setMobileMenuOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
