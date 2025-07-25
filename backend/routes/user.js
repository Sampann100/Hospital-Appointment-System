const express = require("express");
const {
  postRegisterPerson,
  getRegisterPerson,
} = require("../Controller/registerPerson");
const {
  postBookAppointment,
  deleteBookAppointment,
  getBookAppointment,
} = require("../Controller/bookAppointment");
const userRouter = express.Router();

userRouter.post("/api/register", postRegisterPerson);
userRouter.get("/api/register", getRegisterPerson);

userRouter.post("/api/bookAppointment", postBookAppointment);
userRouter.delete("/api/bookAppointment/:id", deleteBookAppointment);
userRouter.get("/api/bookAppointment", getBookAppointment);

module.exports = userRouter;
