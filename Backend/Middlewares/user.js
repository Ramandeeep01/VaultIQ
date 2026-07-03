const { verifyToken } = require("../Services/authentication");

function checkAuth(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    req.user = verifyToken(token);
  } catch {
    req.user = null;
  }

  next();
}

function requireAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  next();
}

module.exports = {
  checkAuth,
  requireAuth,
};