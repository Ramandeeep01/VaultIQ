const express = require("express");
const router = express.Router();

const upload = require("../Config/multer");

const {
  createDocument,
  getDocumentsByVault,
  deleteDocument,
} = require("../Controllers/document");

const { checkAuth, requireAuth } = require("../Middlewares/user");

// ---------------- UPLOAD ----------------
router.post(
  "/upload",
  checkAuth,
  requireAuth,
  upload.single("file"),
  createDocument
);

// ---------------- GET ----------------
router.get(
  "/:vaultId",
  checkAuth,
  requireAuth,
  getDocumentsByVault
);

// ---------------- DELETE ----------------
router.delete(
  "/:documentId",
  checkAuth,
  requireAuth,
  deleteDocument
);

module.exports = router;