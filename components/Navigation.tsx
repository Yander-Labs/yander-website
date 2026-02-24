"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/Button";
import { Container } from "./ui/Container";
import { cn } from "@/lib/utils";
import { X, Menu } from "lucide-react";
import { useDemoModal } from "./ui/DemoModal";

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
            ? "bg-white/95 backdrop-blur-md border-b border-[#E4E7EC] py-3"
            : "bg-transparent py-5"
        )}
      >
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center text-gray-900">
                <Image
                  src="/logo.svg"
                  alt="Yander - Remote Team Intelligence"
                  width={120}
                  height={35}
                  className="h-7 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/pricing"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Pricing
              </Link>
              <Button variant="ghost" size="sm" onClick={openDemoModal}>
                Book a Demo
              </Button>
              <a href="https://app.yander.ai/sign-up?plan=starter&billing=monthly" className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-[6px] bg-gray-900 text-white hover:bg-gray-800 px-4 py-2.5 text-sm min-h-[44px]">
                Get Started Free
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 -mr-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
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
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
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
            "absolute top-0 right-0 h-full w-[280px] max-w-[85vw] bg-white shadow-xl transition-transform duration-300 ease-out",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col h-full">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#E4E7EC]">
              <span className="text-sm font-semibold text-gray-900">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 -mr-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 p-4 space-y-2">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Home
              </Link>
              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Pricing
              </Link>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-[#E4E7EC] space-y-3">
              <Button variant="ghost" size="md" className="w-full justify-center">
                Book a Demo
              </Button>
              <a
                href="https://app.yander.ai/sign-up?plan=starter&billing=monthly"
                className="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-[6px] bg-gray-900 text-white hover:bg-gray-800 px-5 py-3 text-sm min-h-[44px] w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started Free
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
