const jwt = require("jsonwebtoken");

// @desc Middleware to proteect routes
const auth = (req, res, next) => {
  // Check if auth header is available
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Authentication invalid" });
  }

  // Extract the token from header
  const token = authHeader.split(" ")[1];

  try {
    // Veerify if token is using secret key
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user's information (from the token payload) to the request object
    req.user = { userId: payload.userId, username: payload.username };
    next(); // Proceed to next middleware or handler
  } catch (error) {
    console.error("JWT verification failed ======", error.message);
    return res.status(401).json({ msg: "Authentication invalid or token expired" });
  }
}

module.exports = auth;