/**
 * Google Apps Script Webhook for Waitlist Form
 *
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1dPIZX6hJf68BHr1SlLqW1HDOV7Xf9uVUTlm09Zwpazw/edit
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code and paste this entire script
 * 4. Click "Deploy" > "New deployment"
 * 5. Select type: "Web app"
 * 6. Set "Execute as": "Me"
 * 7. Set "Who has access": "Anyone"
 * 8. Click "Deploy" and authorize the app
 * 9. Copy the Web app URL
 * 10. Add it to your .env.local file as GOOGLE_SHEETS_WEBHOOK_URL
 *
 * SHEET SETUP:
 * Make sure your sheet has these headers in Row 1:
 * A1: Email | B1: Source | C1: Timestamp
 */

function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);

    // Get the active spreadsheet and first sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Append the new row (Email, Source, Timestamp)
    sheet.appendRow([
      data.email || '',
      data.source || 'waitlist',
      data.timestamp || new Date().toISOString()
    ]);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing)
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'Webhook is active' }))
    .setMimeType(ContentService.MimeType.JSON);
}
