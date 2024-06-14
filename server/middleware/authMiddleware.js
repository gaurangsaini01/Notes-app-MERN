const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token from the "Bearer <token>" string

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "Token is not valid" });
    }

    req.user = decoded; // Store decoded user information in request object
    next();
  });
}

module.exports = auth;
