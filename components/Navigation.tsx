"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/Button";
import { Container } from "./ui/Container";
import { cn } from "@/lib/utils";
import { ArrowRight, X } from "lucide-react";
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
            <div className="flex items-center justify-center py-2.5 relative">
              <button
                onClick={openModal}
                className="flex items-center gap-2 text-sm font-medium hover:text-gray-200 transition-colors"
              >
                <span>{bannerText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setBannerVisible(false)}
                className="absolute right-0 p-1 hover:bg-white/10 rounded-md transition-colors"
                aria-label="Close banner"
              >
                <X className="w-4 h-4" />
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

            <div className="flex items-center gap-4">
              <Link
                href="/blog"
                className="hidden md:block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
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
          </div>
        </Container>
      </nav>
    </>
  );
}
