import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: "Yander - Build a Stronger Remote Team. Keep Clients Longer.",
  description:
    "Yander keeps a live pulse on engagement, workload, and sentiment without intrusive time tracking, so you can build a high-performing team and protect your client relationships.",
  keywords: [
    "remote team management",
    "employee engagement",
    "team analytics",
    "burnout prevention",
    "retention",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      {process.env.NODE_ENV === "development" && (
        <Script
          src="https://unpkg.com/react-grab/dist/index.global.js"
          strategy="afterInteractive"
        />
      )}
      <body className="font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
