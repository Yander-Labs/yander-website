"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/Button";
import { Container } from "./ui/Container";
import { cn } from "@/lib/utils";
import { ArrowRight, X, Menu } from "lucide-react";
import { useWaitlistModal } from "./ui/WaitlistModal";
import { useDemoModal } from "./ui/DemoModal";

interface NavigationProps {
  showBanner?: boolean;
  bannerText?: string;
  bannerLink?: string;
}

export function Navigation({
  showBanner = true,
  bannerText = "Now in early access. Join the waitlist for priority access.",
  bannerLink = "#"
}: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(showBanner);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openModal } = useWaitlistModal();
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
      {/* Announcement Banner */}
      {bannerVisible && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-gray-900 text-white">
          <Container>
            <div className="flex items-center justify-center py-2.5">
              <button
                onClick={openModal}
                className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium hover:text-gray-200 transition-colors"
              >
                <span>{bannerText}</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              </button>
            </div>
          </Container>
        </div>
      )}

      {/* Navigation */}
      <nav
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-200",
          bannerVisible ? "top-[44px]" : "top-0",
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
                  alt="Yander"
                  width={120}
                  height={35}
                  className="h-7 w-auto"
                  priority
                />
              </Link>
              <div className="hidden md:block h-5 w-px bg-gray-200" />
              <span className="hidden md:block text-sm text-gray-500">
                Remote Team Intelligence
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/use-cases"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Use Cases
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Blog
              </Link>
              <Button variant="ghost" size="sm" onClick={openDemoModal}>
                Book a Demo
              </Button>
              <Button variant="primary" size="sm" onClick={openModal}>
                Join Waitlist
              </Button>
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
                href="/use-cases"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Use Cases
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Blog
              </Link>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-[#E4E7EC] space-y-3">
              <Button variant="ghost" size="md" className="w-full justify-center">
                Book a Demo
              </Button>
              <Button
                variant="primary"
                size="md"
                className="w-full justify-center"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openModal();
                }}
              >
                Join Waitlist
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
