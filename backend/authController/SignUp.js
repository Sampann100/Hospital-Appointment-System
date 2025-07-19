const SignupModel = require("../models/SignUp");
const bcrypt = require("bcryptjs");

exports.signUpPage = async (req, res, next) => {
  const { Username, Email, Password } = req.body;
  console.log(req.body);
  if (!Username || !Email || !Password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const existingUser = await SignupModel.findOne({ Email });
  if (existingUser) {
    return res.status(200).json({ message: "Sign up successfully!!" });
  }

  bcrypt.hash(Password, 12).then(async (hashedPassword) => {
    const signupDetails = new SignupModel({
      Username,
      Email,
      Password: hashedPassword,
    });
    return await signupDetails
      .save()
      .then(() => {
        return res.status(201).json({ message: "Sign up successfully!!" });
      })
      .catch((err) => {
        console.error("Error during signup:", err);
        return res.status(500).json({ message: "Server error!" });
      });
  });
};