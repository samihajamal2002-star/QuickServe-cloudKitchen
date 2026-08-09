const adminMiddleware = (req, res, next) => {
  // ১. ইউজার অথেন্টিকেটেড কি না চেক
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  // ২. রোল admin, chef অথবা Chef কি না চেক
  const userRole = req.user.role ? req.user.role.toLowerCase() : "";

  if (userRole === "admin" || userRole === "chef" || userRole === "rider" ) {
    next();
  } else {
    return res.status(403).json({
      message: "Access Denied. Require Admin or Chef Role!",
    });
  }
};

module.exports = adminMiddleware;