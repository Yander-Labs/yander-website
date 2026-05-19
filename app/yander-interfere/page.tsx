import { Geist_Mono } from "next/font/google"
import { YanderInterfere } from "@/components/sections/YanderInterfere"
import { WaitlistModalProvider } from "@/components/ui/WaitlistModal"
import { DemoModalProvider } from "@/components/ui/DemoModal"

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-geist-mono",
})

export const metadata = {
  title: "Yander — Interfere-style",
  robots: { index: false, follow: false },
}

export default function YanderInterferePage() {
  return (
    <WaitlistModalProvider>
      <DemoModalProvider>
        <div className={geistMono.variable}>
          <YanderInterfere />
        </div>
      </DemoModalProvider>
    </WaitlistModalProvider>
  )
}
