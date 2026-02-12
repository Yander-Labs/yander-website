import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Instrument_Serif, Geist } from "next/font/google";
import { CookieBanner } from "@/components/ui/CookieBanner";
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

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
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
  metadataBase: new URL("https://yander.io"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Yander - Build a Stronger Remote Team. Keep Clients Longer.",
    description:
      "Keep a live pulse on engagement, workload, and sentiment without intrusive time tracking.",
    url: "https://yander.io",
    siteName: "Yander",
    images: [
      {
        url: "https://yander.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yander - Remote Team Analytics Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yander - Build a Stronger Remote Team. Keep Clients Longer.",
    description:
      "Keep a live pulse on engagement, workload, and sentiment without intrusive time tracking.",
    images: ["https://yander.io/og-image.png"],
    site: "@yanderlabs",
  },
};

// Organization structured data for SEO
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Yander",
  url: "https://yander.io",
  logo: "https://yander.io/logo.svg",
  description:
    "Remote team intelligence platform that helps organizations understand team engagement, collaboration patterns, and workplace health.",
  sameAs: [
    "https://x.com/yanderlabs",
    "https://www.linkedin.com/company/107590331",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "jordan@yanderlabs.com",
    contactType: "customer service",
  },
};

// WebSite structured data for SEO
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Yander",
  url: "https://yander.io",
  description:
    "Build a stronger remote team. Keep clients longer. Get live insights on engagement, workload, and sentiment.",
  publisher: {
    "@type": "Organization",
    name: "Yander",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} ${geist.variable}`}>
      <head>
        {/* Organization and WebSite Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '693222646617109');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=693222646617109&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* RB2B Tracking */}
        <Script id="reb2b" strategy="afterInteractive">
          {`
            !function(key) {if (window.reb2b) return;window.reb2b = {loaded: true};var s = document.createElement("script");s.async = true;s.src = "https://ddwl4m2hdecbv.cloudfront.net/b/" + key + "/" + key + ".js.gz";document.getElementsByTagName("script")[0].parentNode.insertBefore(s, document.getElementsByTagName("script")[0]);}("0NW1GHZKLEO4");
          `}
        </Script>
        {/* PostHog Analytics */}
        <Script id="posthog" strategy="afterInteractive">
          {`
            !function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init rs ls yi ns us ts ss capture Hi calculateEventProperties vs register register_once register_for_session unregister unregister_for_session gs getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException startExceptionAutocapture stopExceptionAutocapture loadToolbar get_property getSessionProperty fs ds createPersonProfile ps Qr opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing hs debug O cs getPageViewId captureTraceFeedback captureTraceMetric Kr".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
            posthog.init('phc_dAzHw36PZFwzZve4agFL4olF7LsTCaOafb4Tcib5jrk', {
                api_host: 'https://us.i.posthog.com',
                defaults: '2025-11-30',
                person_profiles: 'identified_only',
            })
          `}
        </Script>
      </head>
      {process.env.NODE_ENV === "development" && (
        <Script
          src="https://unpkg.com/react-grab/dist/index.global.js"
          strategy="afterInteractive"
        />
      )}
      <body className="font-sans" suppressHydrationWarning>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
