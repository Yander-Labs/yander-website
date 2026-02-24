"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const companySizes = [
  "1–25 employees",
  "25–50 employees",
  "50–100 employees",
  "100–250 employees",
  "250+ employees",
];

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactSalesForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      companyName: (form.elements.namedItem("companyName") as HTMLInputElement).value,
      companySize: (form.elements.namedItem("companySize") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact-sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Something went wrong");
      }

      setStatus("success");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[16px] border border-[#e5e5e5] shadow-card p-8 md:p-10 text-center"
      >
        <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
          <Check className="w-6 h-6 text-emerald-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          We&apos;ll be in touch
        </h3>
        <p className="text-sm text-gray-500 max-w-sm mx-auto">
          Thanks for reaching out. A member of our team will get back to you
          within one business day.
        </p>
      </motion.div>
    );
  }

  const inputClasses =
    "w-full px-4 py-3 rounded-lg border border-[#e5e5e5] bg-white text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-400 transition-all";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-[16px] border border-[#e5e5e5] shadow-card p-6 md:p-8 space-y-5"
    >
      {/* Name row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1.5">
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            className={inputClasses}
            placeholder="Jane"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1.5">
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            className={inputClasses}
            placeholder="Smith"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputClasses}
          placeholder="jane@company.com"
        />
      </div>

      {/* Company name */}
      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1.5">
          Company name
        </label>
        <input
          id="companyName"
          name="companyName"
          type="text"
          required
          className={inputClasses}
          placeholder="Acme Inc."
        />
      </div>

      {/* Company size */}
      <div>
        <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-1.5">
          Company size
        </label>
        <select
          id="companySize"
          name="companySize"
          required
          defaultValue=""
          className={cn(inputClasses, "appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23737373%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-10")}
        >
          <option value="" disabled>
            Select company size
          </option>
          {companySizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
          How can we help?{" "}
          <span className="text-gray-400 font-normal">Optional</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={cn(inputClasses, "resize-none")}
          placeholder="Tell us about your team and what you're looking for..."
        />
      </div>

      {/* Error */}
      {status === "error" && (
        <p className="text-sm text-red-500">{errorMessage}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 rounded-[6px] px-5 py-3 text-sm min-h-[44px] w-full bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Contact Sales
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
