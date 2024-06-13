const User = require("../models/User.js");
const bcrypt = require("bcrypt")
async function signup(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Empty Fields",
      });
    }
    //search in DB if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists , Please Login",
      });
    }
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password,10)
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Error in Hashing Password, Try Again",
      });
    }
    const createdUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.status(200).json({
      success:true,
      message:'User created successfully'
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
module.exports = signup;
