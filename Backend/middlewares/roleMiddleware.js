const roleMiddleware = (role) => (req, res, next) => {  // we provide role as a argument
    if (role.includes(req.user.role)) {    // req.user -> came from authMiddleware
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }
  };
  
  module.exports = roleMiddleware;