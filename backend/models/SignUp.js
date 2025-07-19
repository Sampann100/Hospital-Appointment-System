const mongoose = require("mongoose");

const SignUpSchema = new mongoose.Schema({
  Username: { type: String, require: true },
  Email: { type: String, require: true },
  Password: { type: String, require: true },
});

const SignupModel = mongoose.model("SignupModel", SignUpSchema, "SignUp");

module.exports = SignupModel;
