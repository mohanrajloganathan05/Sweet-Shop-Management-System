
// Admin Middleware
// ==========================
const admin = (req, res, next) => {
    if (req.user && req.user.role === "admin" ) {
      next(); // user is admin → allow route
    } else {
      res.status(403).json({ message: "Admin access required" });
    }
  };
  
  module.exports = { admin };
  