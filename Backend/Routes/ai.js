const express = require("express");
const router = express.Router();

const { chat } = require("../Controllers/ai");
const { checkAuth, requireAuth} = require("../Middlewares/user");

router.post(
  "/chat",
  checkAuth,
  requireAuth,
  chat
);

module.exports = router;