import { NextRequest, NextResponse } from "next/server";

interface WaitlistRequest {
  email: string;
}

// Handle OPTIONS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

interface LoopsResponse {
  success: boolean;
  id?: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: WaitlistRequest = await request.json();
    const { email } = body;

    console.log("Waitlist signup attempt:", { email: email?.substring(0, 3) + "***" });

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email address is required" },
        { status: 400 }
      );
    }

    const results = {
      loops: { success: false, error: null as string | null },
      sheets: { success: false, error: null as string | null },
    };

    // Log environment status (not the actual values)
    console.log("Env check:", {
      hasLoopsKey: !!process.env.LOOPS_API_KEY,
      hasSheetDb: !!process.env.SHEETDB_API_URL,
    });

    // Send to Loops
    const loopsApiKey = process.env.LOOPS_API_KEY;
    if (loopsApiKey) {
      try {
        const loopsResponse = await fetch(
          "https://app.loops.so/api/v1/contacts/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${loopsApiKey}`,
            },
            body: JSON.stringify({
              email,
              source: "waitlist",
              subscribed: true,
            }),
          }
        );

        const loopsText = await loopsResponse.text();
        console.log("Loops response:", { status: loopsResponse.status, body: loopsText });

        let loopsData: LoopsResponse;
        try {
          loopsData = JSON.parse(loopsText);
        } catch {
          loopsData = { success: false, message: loopsText };
        }

        if (loopsResponse.ok || loopsData.success) {
          results.loops.success = true;
        } else {
          // If contact already exists, treat as success
          if (loopsText.includes("already") || loopsData.message?.includes("already")) {
            results.loops.success = true;
          } else {
            results.loops.error = loopsData.message || "Failed to add to Loops";
          }
        }
      } catch (error) {
        results.loops.error =
          error instanceof Error ? error.message : "Loops API error";
      }
    } else {
      results.loops.error = "Loops API key not configured";
    }

    // Send to Google Sheets via SheetDB
    const sheetDbUrl = process.env.SHEETDB_API_URL;
    if (sheetDbUrl) {
      try {
        const sheetsResponse = await fetch(sheetDbUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: [
              {
                Email: email,
                Source: "waitlist",
                Timestamp: new Date().toISOString(),
              },
            ],
          }),
        });

        if (sheetsResponse.ok) {
          results.sheets.success = true;
        } else {
          const errorData = await sheetsResponse.text();
          results.sheets.error = `SheetDB error: ${errorData}`;
        }
      } catch (error) {
        results.sheets.error =
          error instanceof Error ? error.message : "Google Sheets API error";
      }
    } else {
      results.sheets.error = "SheetDB not configured";
    }

    // Consider success if at least Loops worked (primary destination)
    const overallSuccess = results.loops.success;

    console.log("Waitlist results:", results);

    if (overallSuccess) {
      return NextResponse.json({
        success: true,
        message: "Successfully joined the waitlist",
        details: results,
      });
    } else {
      // Return more specific error for debugging
      const errorMsg = results.loops.error || "Failed to process signup";
      return NextResponse.json(
        {
          success: false,
          error: errorMsg,
          details: results,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
