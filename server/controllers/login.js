const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
require("dotenv").config();

async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No Account Found ,Please signup first",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password",
      });
    }
    const payload = {
      id: user._id.toString(),
      email: user.email,
    };
    let token;
    try {
      token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Some token issue",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Couldn't Login Properly",
    });
  }
}
module.exports = login;
