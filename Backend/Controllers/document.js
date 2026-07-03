const Document = require("../Models/document");
const cloudinary = require("../Config/cloudinary");
const { extractTextFromBuffer } = require("../Services/documentExtractor");

// ---------------- CREATE DOCUMENT ----------------
const createDocument = async (req, res) => {
  try {
    const { title, vaultId } = req.body;
    const file = req.file;

    if (!title || !vaultId || !file) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const extractedText = await extractTextFromBuffer(
      file.buffer,
      file.mimetype
    );

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "vaultiq",
          resource_type: "raw",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      stream.end(file.buffer);
    });

    const document = await Document.create({
      title,
      fileUrl: uploadResult.secure_url,
      vault: vaultId,
      extractedText,
    });

    return res.status(201).json(document);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ---------------- GET DOCUMENTS ----------------
const getDocumentsByVault = async (req, res) => {
  try {
    const { vaultId } = req.params;

    const documents = await Document.find({
      vault: vaultId,
    });

    return res.status(200).json(documents);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ---------------- DELETE DOCUMENT ----------------
const deleteDocument = async (req, res) => {
  try {
    const { documentId } = req.params;

    await Document.findByIdAndDelete(documentId);

    return res.json({
      message: "Deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createDocument,
  getDocumentsByVault,
  deleteDocument,
};