"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const COOKIE_CONSENT_KEY = "yander-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:right-auto z-[400] max-w-sm animate-fade-in-up">
      <div className="bg-white border border-[#E4E7EC] rounded-xl shadow-elevated p-4">
        <p className="text-sm text-gray-600 leading-relaxed">
          We use cookies to improve your experience and for analytics.{" "}
          <Link
            href="/privacy-policy"
            className="text-gray-900 underline hover:no-underline"
          >
            Privacy Policy
          </Link>
        </p>
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={accept}
            className="px-4 py-1.5 text-sm font-medium bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Accept
          </button>
          <button
            onClick={decline}
            className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
