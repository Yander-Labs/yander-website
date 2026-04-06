"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// Context for modal state
interface DemoModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const DemoModalContext = createContext<DemoModalContextType | undefined>(undefined);

export function useDemoModal() {
  const context = useContext(DemoModalContext);
  if (!context) {
    throw new Error("useDemoModal must be used within a DemoModalProvider");
  }
  return context;
}

// Provider component
export function DemoModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    if (typeof window !== "undefined" && window.posthog) {
      window.posthog.capture("book_demo_clicked");
    }
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  return (
    <DemoModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      <DemoModal />
    </DemoModalContext.Provider>
  );
}

// Modal component
function DemoModal() {
  const { isOpen, closeModal } = useDemoModal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-xl"
          >
            <div className="bg-white rounded-none shadow-soft-lg border border-gray-200/60 overflow-hidden mx-4">
              {/* Header */}
              <div className="relative px-6 pt-6 pb-4">
                <button
                  onClick={closeModal}
                  className="absolute right-4 top-4 p-2 rounded-none hover:bg-gray-100 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>

                <h2 className="font-geist font-bold text-2xl text-[#0a0a0a] tracking-[-0.02em]">
                  Book a Demo
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Schedule a 15-minute call to see how Yander can help you hire.
                </p>
              </div>

              {/* Cal.com Embed */}
              <div className="px-6 pb-6">
                <div className="border border-gray-200/60 overflow-hidden bg-[#fafafa]">
                  <iframe
                    src="https://cal.com/jordanyander/15min?embed=true&theme=light"
                    width="100%"
                    height="450"
                    frameBorder="0"
                    className="bg-white"
                    title="Book a demo with Yander"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
