const express = require("express");

const {
  signup,
  login,
  logout,
  currentUser,
} = require("../Controllers/user");

const {
  checkAuth,
  requireAuth,
} = require("../Middlewares/user");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get(
  "/me",
  checkAuth,
  requireAuth,
  currentUser
);

module.exports = router;