const jwt = require("jsonwebtoken");
const SignupModel = require("../models/SignUp");
const bcrypt = require("bcryptjs");
const { default: transporter } = require("../config/nodemailer");

exports.signUpPage = async (req, res, next) => {
  const { Username, Email, Password } = req.body;

  if (!Username || !Email || !Password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const existingUser = await SignupModel.findOne({ Email });
  if (existingUser) {
    return res.status(200).json({ message: "User already exists!" });
  }

  const hashedPassword = await bcrypt.hash(Password, 12);

  const signupDetails = new SignupModel({
    Username,
    Email,
    Password: hashedPassword,
  });

  const token = jwt.sign({ id: signupDetails._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  //user automation mail is sended
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: Email,
    subject: "Welcome yo Sampann",
    text: `Welcome to our website. your account has been created with email id: ${Email}`,
  };

  await transporter.sendMail(mailOptions);

  signupDetails.save().then(() => {
    return res.status(201).json({ message: "Sign up successfully!!" });
  });
};

//send verification otp to user email
exports.sendVerifyOtp = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await SignupModel.findById(userId);
    if (user.isAcountVerified) {
      return res.json({ success: false, message: "Account already verified" });
    }
    const otp = String(Math.floor(Math.random() * (99999 - 10000) + 10000));

    user.verifyotp = otp;
    user.verifyotpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();
    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.Email,
      subject: "Welcome yo Sampann",
      text: `Your OTP is ${otp}`,
    };
    await transporter.sendMail(mailOption);

    res.json({ success: true, message: "otp is sended." });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

exports.verifyEmail = async (req, res, next) => {
  const userId = req.userId;
  const { otp } = req.body;

  if (!userId || !otp) {
    return res.json({ success: false, message: "Missing Details" });
  }
  const user = await SignupModel.findById(userId);
  if (!user) return res.json({ success: false, message: "User not found" });

  if (!user.verifyotp || user.verifyotp !== otp)
    return res.json({ success: false, message: "Invalid OTP." });

  if (user.verifyotpExpireAt < Date.now())
    return res.json({ success: false, message: "OTP is expired." });

  user.isAcountVerified = true;
  user.verifyotp = "";
  user.verifyotpExpireAt = 0;

  await user.save();

  return res.json({ success: true, message: "Account is verified." });
};

exports.isAuthenticated = (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res.json({ success: false, message: "User not authenticated" });

  try {
    return res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

exports.sendPasswordResetOtp = async (req, res) => {
  const { Email } = req.body;
  if (!Email) return res.json({ success: false, message: "Email is required" });

  const user = await SignupModel.findOne({ Email });
  if (!user) return res.json({ success: false, message: "User not found" });

  const otp = String(Math.floor(Math.random() * (99999 - 10000) + 10000));

  user.resetOtp = otp;
  user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

  
  const mailOption = {
    from: process.env.SENDER_EMAIL,
    to: Email,
    subject: "Password Reset OTP",
    text: `Your OTP for password reset is ${otp}`,
  };
  
  await transporter.sendMail(mailOption);
  await user.save();
  
  res.json({ success: true, message: "OTP sent to your email" });
};

exports.resetPassword = async (req, res, next) => {
  const { Email, otp, newPassword } = req.body;

  if (!Email || !otp || !newPassword)
    return res.json({ success: false, message: "All fields are required" });

  const user = await SignupModel.findOne({ Email });
  if (!user) return res.json({ success: false, message: "User not found" });

  console.log(user.resetOtp, otp);

  if (!user.resetOtp || user.resetOtp !== otp)
    return res.json({ success: false, message: "Invalid OTP." });

  if (user.resetOtpExpireAt < Date.now())
    return res.json({ success: false, message: "OTP is expired." });

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  user.Password = hashedPassword;
  user.resetOtp = "";
  user.resetOtpExpireAt = 0;

  await user.save();

  res.json({ success: true, message: "Password reset successfully" });
};
