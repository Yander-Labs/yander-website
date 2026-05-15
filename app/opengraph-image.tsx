import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Yander — The First AI Agent That Recruits For You";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default OG image for any route that doesn't ship its own.
// Vercel serves this at /opengraph-image automatically; for legacy references
// to /og-image.png and /og-default.jpg we keep this in sync.
export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #fafaf7 0%, #ffffff 60%, #f5f1ea 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "30px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "#0a0a0a",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              background: "#0a0a0a",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            Y
          </div>
          Yander
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#0a0a0a",
              maxWidth: "950px",
            }}
          >
            The first AI agent that recruits for you.
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#525252",
              lineHeight: 1.3,
              maxWidth: "850px",
            }}
          >
            Headhunts, vets, and presents culture-matched candidates worldwide. No placement fees.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "20px",
            color: "#737373",
          }}
        >
          <span>yander.ai</span>
          <span style={{ display: "flex", gap: "24px" }}>
            <span>US</span>
            <span>·</span>
            <span>UK</span>
            <span>·</span>
            <span>LatAm</span>
            <span>·</span>
            <span>EU</span>
            <span>·</span>
            <span>SEA</span>
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
