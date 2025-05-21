function doPost(e) {
  try {
    // Log the incoming request
    Logger.log("Received request");
    Logger.log("Request contents:", e.postData.contents);

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    // Log the parsed data
    Logger.log("Parsed data:", data);

    // Flatten the data structure
    const row = [
      data.timestamp, // timestamp
      data.demographics.name,
      data.demographics.specialty,
      data.demographics.otherSpecialty,
      data.demographics.trainingStatus,
      data.demographics.otherTrainingStatus,
      data.demographics.experience,
      data.demographics.used3DSlicer,
      data.demographics.slicerFamiliarity,
      // SUS questions
      data.sus.q1 || "",
      data.sus.q2 || "",
      data.sus.q3 || "",
      data.sus.q4 || "",
      data.sus.q5 || "",
      data.sus.q6 || "",
      data.sus.q7 || "",
      data.sus.q8 || "",
      data.sus.q9 || "",
      data.sus.q10 || "",
      // NASA-TLX without depth guide
      data.nasaTlx.withoutDepthGuide[0] || 0,
      data.nasaTlx.withoutDepthGuide[1] || 0,
      data.nasaTlx.withoutDepthGuide[2] || 0,
      data.nasaTlx.withoutDepthGuide[3] || 0,
      data.nasaTlx.withoutDepthGuide[4] || 0,
      data.nasaTlx.withoutDepthGuide[5] || 0,
      // NASA-TLX with depth guide
      data.nasaTlx.withDepthGuide[0] || 0,
      data.nasaTlx.withDepthGuide[1] || 0,
      data.nasaTlx.withDepthGuide[2] || 0,
      data.nasaTlx.withDepthGuide[3] || 0,
      data.nasaTlx.withDepthGuide[4] || 0,
      data.nasaTlx.withDepthGuide[5] || 0,
      // Depth Guide feedback
      data.depthGuide.usefulness || 0,
      data.depthGuide.helpWithBLines || "",
      data.depthGuide.moreVariationWithout || "",
      data.depthGuide.shouldBeIncluded || "",
      data.depthGuide.additionalFeedback || "",
    ];

    // Add the row to the sheet
    sheet.appendRow(row);
    Logger.log("Row added successfully");

    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({
        result: "success",
        message: "Survey submitted successfully",
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Log the error
    Logger.log("Error in doPost:", error);
    Logger.log("Error stack:", error.stack);

    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({
        result: "error",
        message: error.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle CORS preflight requests
function doOptions(e) {
  return ContentService.createTextOutput("").setMimeType(
    ContentService.MimeType.TEXT
  );
}
