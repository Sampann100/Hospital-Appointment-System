const mongoose = require("mongoose");

const SignUpSchema = new mongoose.Schema({
  Username: { type: String, require: true },
  Email: { type: String, require: true },
  Password: { type: String, require: true },
  verifyotp: { type: String, default: "" },
  verifyotpExpireAt: { type: Date, default: 0 },
  isAcountVerified: { type: Boolean, default: false },
  resetOtp: { type: String, default: "" },
  resetOtpExpireAt: { type: Date, default: 0 },
});

const SignupModel = mongoose.model("SignupModel", SignUpSchema, "SignUp");

module.exports = SignupModel;
