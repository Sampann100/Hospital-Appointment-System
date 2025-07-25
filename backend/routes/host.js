const express = require("express");
const { signUpPage } = require("../authController/SignUp");
const { loginPage } = require("../authController/Login");
const hostRouter = express.Router();

hostRouter.post("/signup", signUpPage);
hostRouter.post("/login", loginPage);

module.exports = hostRouter;