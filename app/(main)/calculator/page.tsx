import { CalculatorClient } from "./CalculatorClient";
import { SchemaJsonLd } from "@/components/seo/SchemaJsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/page-metadata";
import { SITE_URL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Remote Hiring Cost Calculator — Compare Global Salaries | Yander",
  description:
    "Estimate annual savings hiring globally. Compare US/UK/Canada salaries against Brazil, Mexico, Philippines, India, Serbia, Poland, and South Africa for 40+ roles.",
  path: "/calculator",
  ogImageAlt: "Yander Remote Hiring Cost Calculator",
});

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Yander Remote Hiring Cost Calculator",
  description:
    "A free tool to compare salaries for the same role across multiple countries and estimate annual savings from global hiring.",
  url: `${SITE_URL}/calculator`,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function CalculatorPage() {
  return (
    <>
      <SchemaJsonLd schema={calculatorSchema} />
      <Container>
        <Breadcrumbs
          className="pt-32"
          items={[{ name: "Home", href: "/" }, { name: "Calculator" }]}
        />
      </Container>
      <CalculatorClient />
    </>
  );
}
