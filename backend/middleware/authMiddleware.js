const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Middleware for authenticating users and verifying roles (if specified)
 * @param {string} role - Optional role restriction ('admin' or 'student')
 */
function authenticate(role) {
  return (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization token missing or invalid" });
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check role if specified
      if (role && decoded.role !== role) {
        return res.status(403).json({ message: "Access denied: insufficient permissions" });
      }

      req.user = decoded; // attach decoded token
      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
      console.error("JWT verification error:", err);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
}

module.exports = { authenticate };
