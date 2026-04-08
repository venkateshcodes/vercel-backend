const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  let token;

  // ✅ Check if header exists and starts with Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request
      req.user = decoded;

      next();
    } catch (error) {
      return res.status(401).json({ msg: "Invalid token" });
    }
  } else {
    return res.status(401).json({ msg: "No token" });
  }
};