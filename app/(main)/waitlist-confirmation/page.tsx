import { CheckCircle } from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "You're on the list! | Yander",
  description: "Thank you for joining the Yander waitlist.",
  other: {
    offer: "Yander",
  },
};

export default function WaitlistConfirmationPage() {
  return (
    <>
      <Script
        src="https://d15dfsr886zcp9.cloudfront.net/thankYou_script.js"
        strategy="afterInteractive"
      />
      <section className="min-h-[80vh] flex items-center justify-center py-20">
      <Container size="narrow">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>

          <h1 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4">
            You&apos;re on the list!
          </h1>

          <p className="text-base text-gray-500 mb-8 max-w-md mx-auto">
            We&apos;ll notify you when Yander is ready. Check your inbox for a confirmation.
          </p>

          <Link href="/">
            <Button variant="secondary" size="lg">
              Back to Home
            </Button>
          </Link>
        </div>
      </Container>
    </section>
    </>
  );
}
