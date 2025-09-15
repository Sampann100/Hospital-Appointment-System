const express = require("express");
const {
  signUpPage,
  sendVerifyOtp,
  verifyEmail,
  isAuthenticated,
  resetPassword,
  sendPasswordResetOtp,
} = require("../authController/SignUp");
const { loginPage } = require("../authController/Login");
const { logout } = require("../authController/Logout");
const { default: userAuth } = require("../middleware/userAuth");
const hostRouter = express.Router();

hostRouter.post("/signup", signUpPage);
hostRouter.post("/login", loginPage);
hostRouter.post("/logout", logout);
hostRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
hostRouter.post("/verify-account", userAuth, verifyEmail);
hostRouter.post("/is-auth", userAuth, isAuthenticated);
hostRouter.post("/send-reset-otp", sendPasswordResetOtp);
hostRouter.post("/reset-password", resetPassword);

module.exports = hostRouter;
