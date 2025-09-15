const jwt = require("jsonwebtoken");
const LoginModel = require("../models/Login");
const SignupModel = require("../models/SignUp");
const bcryptjs = require("bcryptjs");

exports.loginPage = async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const existingUser = await LoginModel.findOne({ Email });

  const signupData = await SignupModel.findOne({ Email });

  if (!signupData) {
    return res.status(400).json({ message: "User not found!" });
  }

  const isMatch = await bcryptjs.compare(Password, signupData.Password);

  if (!isMatch) {
    return res.status(401).json({ message: "Email or Password is invalid!" });
  }

  if (existingUser) {
    return res.status(200).json({ message: "User already exists!" });
  }

  const token = jwt.sign({ id: signupData._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const userData = new LoginModel({ Email, Password });
  await userData.save();
  return res.status(201).json({
    message: "Login successful!",
  });
};
