"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar } from "lucide-react";

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

  const openModal = () => setIsOpen(true);
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-xl"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-[#e5e5e5] overflow-hidden mx-4">
              {/* Header */}
              <div className="relative px-6 pt-6 pb-4">
                <button
                  onClick={closeModal}
                  className="absolute right-4 top-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>

                <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>

                <h2 className="font-serif text-2xl text-gray-900 tracking-tight">
                  Book a Demo
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Schedule a 15-minute call to see how Yander can help your remote team.
                </p>
              </div>

              {/* Cal.com Embed */}
              <div className="px-6 pb-6">
                <div className="rounded-lg border border-[#e5e5e5] overflow-hidden bg-gray-50">
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
