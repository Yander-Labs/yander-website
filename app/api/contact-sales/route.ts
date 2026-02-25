import { NextRequest, NextResponse } from "next/server";

interface ContactSalesRequest {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  companySize: string;
  message?: string;
}

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  "https://yander.io",
  "https://www.yander.io",
  "https://yander-website.vercel.app",
  process.env.NODE_ENV === "development" ? "http://localhost:3001" : "",
].filter(Boolean);

function getCorsHeaders(origin: string | null) {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

// Handle OPTIONS preflight
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");
  return new NextResponse(null, {
    status: 200,
    headers: getCorsHeaders(origin),
  });
}

// Escape HTML entities to prevent XSS in email templates
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  try {
    const body: ContactSalesRequest = await request.json();
    const { firstName, lastName, email, companyName, companySize, message } = body;

    if (!firstName || !lastName || !email || !companyName || !companySize) {
      return NextResponse.json(
        { error: "All required fields must be filled out." },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400, headers: corsHeaders }
      );
    }

    // Sanitize all user input for HTML email
    const safeName = `${escapeHtml(firstName)} ${escapeHtml(lastName)}`;
    const safeEmail = escapeHtml(email);
    const safeCompany = escapeHtml(companyName);
    const safeSize = escapeHtml(companySize);
    const safeMessage = message ? escapeHtml(message) : "";

    // Send notification email via Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: "Yander <noreply@yanderlabs.com>",
            to: "jordan@yanderlabs.com",
            subject: `Enterprise inquiry from ${safeName} at ${safeCompany}`,
            html: `
              <h2>New Enterprise Inquiry</h2>
              <table style="border-collapse:collapse;width:100%;max-width:500px">
                <tr><td style="padding:8px 12px;font-weight:600;color:#374151">Name</td><td style="padding:8px 12px">${safeName}</td></tr>
                <tr style="background:#f9fafb"><td style="padding:8px 12px;font-weight:600;color:#374151">Email</td><td style="padding:8px 12px"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
                <tr><td style="padding:8px 12px;font-weight:600;color:#374151">Company</td><td style="padding:8px 12px">${safeCompany}</td></tr>
                <tr style="background:#f9fafb"><td style="padding:8px 12px;font-weight:600;color:#374151">Size</td><td style="padding:8px 12px">${safeSize}</td></tr>
                ${safeMessage ? `<tr><td style="padding:8px 12px;font-weight:600;color:#374151">Message</td><td style="padding:8px 12px">${safeMessage}</td></tr>` : ""}
              </table>
            `,
          }),
        });
      } catch (err) {
        console.error("Resend error:", err);
      }
    }

    // Also add to Loops CRM
    const loopsKey = process.env.LOOPS_API_KEY;
    if (loopsKey) {
      try {
        await fetch("https://app.loops.so/api/v1/contacts/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loopsKey}`,
          },
          body: JSON.stringify({
            email,
            firstName,
            lastName,
            source: "enterprise-inquiry",
            subscribed: true,
            userGroup: "enterprise",
            companyName,
            companySize,
          }),
        });
      } catch (err) {
        console.error("Loops error:", err);
      }
    }

    // Log to SheetDB as backup
    const sheetDbUrl = process.env.SHEETDB_API_URL;
    if (sheetDbUrl) {
      try {
        await fetch(sheetDbUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: [
              {
                Name: `${firstName} ${lastName}`,
                Email: email,
                Company: companyName,
                "Company Size": companySize,
                Message: message || "",
                Source: "enterprise-inquiry",
                Timestamp: new Date().toISOString(),
              },
            ],
          }),
        });
      } catch (err) {
        console.error("SheetDB error:", err);
      }
    }

    return NextResponse.json({ success: true }, { headers: corsHeaders });
  } catch (error) {
    console.error("Contact sales API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500, headers: corsHeaders }
    );
  }
}
