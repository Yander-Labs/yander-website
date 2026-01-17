"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, ArrowRight, Loader2 } from "lucide-react";

// Context for modal state
interface WaitlistModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const WaitlistModalContext = createContext<WaitlistModalContextType | undefined>(undefined);

export function useWaitlistModal() {
  const context = useContext(WaitlistModalContext);
  if (!context) {
    throw new Error("useWaitlistModal must be used within a WaitlistModalProvider");
  }
  return context;
}

// Provider component
export function WaitlistModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <WaitlistModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      <WaitlistModal />
    </WaitlistModalContext.Provider>
  );
}

// Modal component
function WaitlistModal() {
  const { isOpen, closeModal } = useWaitlistModal();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address");
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        closeModal();
        setEmail("");
        setStatus("idle");
        router.push("/waitlist-confirmation");
      } else {
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMessage("Network error. Please try again.");
      setStatus("error");
    }
  };

  const handleClose = () => {
    closeModal();
    // Reset state after animation completes
    setTimeout(() => {
      setEmail("");
      setStatus("idle");
      setErrorMessage("");
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-md"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-[#e5e5e5] overflow-hidden mx-4">
              {/* Header */}
              <div className="relative px-6 pt-6 pb-4">
                <button
                  onClick={handleClose}
                  className="absolute right-4 top-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>

                <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>

                <h2 className="font-serif text-2xl text-gray-900 tracking-tight">
                  Join the Waitlist
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Get early access to Yander and be the first to know when we launch.
                </p>
              </div>

              {/* Content */}
              <div className="px-6 pb-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="sr-only">
                        Email address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (status === "error") setStatus("idle");
                          }}
                          placeholder="Enter your work email"
                          className={`w-full px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/20 transition-all ${
                            status === "error"
                              ? "border-red-300 focus:border-red-500"
                              : "border-[#e5e5e5] focus:border-gray-400"
                          }`}
                          disabled={status === "loading"}
                        />
                      </div>
                      {status === "error" && (
                        <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Joining...
                        </>
                      ) : (
                        <>
                          Get Early Access
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-center text-gray-400">
                      No spam, ever. Unsubscribe anytime.
                    </p>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
