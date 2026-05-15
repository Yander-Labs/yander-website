import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  async redirects() {
    return [
      // Legacy use-cases redirect
      {
        source: "/use-cases",
        destination: "/pulse#use-cases",
        permanent: true,
      },
      // Retire alternate homepage versions — both are noindex'd, but kept as
      // 301s so any external link points to the live homepage.
      { source: "/v1", destination: "/", permanent: true },
      { source: "/v1/:path*", destination: "/", permanent: true },
      { source: "/v2", destination: "/", permanent: true },
      { source: "/v2/:path*", destination: "/", permanent: true },
      // Backward-compat for any old social previews that hit /og-image.png.
      // The new dynamic OG lives at /opengraph-image (Vercel convention).
      {
        source: "/og-image.png",
        destination: "/opengraph-image",
        permanent: false,
      },
      {
        source: "/og-default.jpg",
        destination: "/opengraph-image",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
