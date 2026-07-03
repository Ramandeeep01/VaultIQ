const express = require("express");

const router = express.Router();

const { checkAuth, requireAuth } = require("../Middlewares/user");

const { chat, getChats } = require("../Controllers/ai");

// Ask AI
router.post(
  "/",
  checkAuth,
  requireAuth,
  chat
);

// Get all chats of a vault
router.get(
  "/:vaultId",
  checkAuth,
  requireAuth,
  getChats
);

module.exports = router;