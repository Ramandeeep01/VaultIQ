const pdf = require("pdf-parse");
const mammoth = require("mammoth");
const Tesseract = require("tesseract.js");

async function extractTextFromBuffer(buffer, mimeType) {
  try {
    // ---------------- PDF ----------------
    if (mimeType === "application/pdf") {
      try {
        const data = await pdf(buffer);

        if (data.text && data.text.trim().length > 0) {
          return data.text;
        }

        return "";
      } catch (err) {
        return "";
      }
    }

    // ---------------- DOCX ----------------
    if (
      mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const data = await mammoth.extractRawText({
        buffer,
      });

      return data.value || "";
    }

    // ---------------- IMAGE ----------------
    if (mimeType.startsWith("image/")) {
      const result = await Tesseract.recognize(buffer, "eng");
      return result.data.text || "";
    }

    // ---------------- TXT ----------------
    if (mimeType === "text/plain") {
      return buffer.toString("utf8");
    }

    return "";
  } catch (err) {
    return "";
  }
}

module.exports = {
  extractTextFromBuffer,
};