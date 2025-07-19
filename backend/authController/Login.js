const LoginModel = require("../models/Login");
const SignupModel = require("../models/SignUp");
const bcryptjs = require("bcryptjs");

exports.loginPage = async (req, res) => {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      return res
        .status(400)
        .json({ message: "All fields are required!" });
    }

    const existingUser = await LoginModel.findOne({ Email });
    if (existingUser) {
      return res
        .status(200)
        .json({ message: "User already exists!" });
    }

    const signupData = await SignupModel.findOne({ Email });

    if (!signupData) {
      return res
        .status(400)
        .json({ message: "User not found!" });
    }

    const isMatch = await bcryptjs.compare(Password, signupData.Password);

    if (isMatch) {
      const userData = new LoginModel({ Email, Password });
      await userData.save();
      return res.status(201).json({
        message: "Login successful!"
      });
    } else {
      return res
        .status(401)
        .json({ message: "Email or Password is invald!!" });
    }
  }