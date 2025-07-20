require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const RegisterPersonModel = require("./models/RegisterPerson");
const AppointmentModel = require("./models/Appointment");
const { signUpPage } = require("./authController/SignUp");
const { loginPage } = require("./authController/Login");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Authentication
app.use("/api/auth/signup", signUpPage);
app.use("/api/auth/login", loginPage);

//Registration Person
app.post("/api/register", (req, res, next) => {
  const newPersonData = new RegisterPersonModel(req.body);

  newPersonData
    .save()
    .then(() => {
      res.status(200).json({ message: "Data received." });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/api/register", async (req, res, next) => {
  const data = await RegisterPersonModel.find({});
  res.status(200).json(data);
});

//Appointment booking && Cancelling
app.post("/api/bookAppointment", async (req, res, next) => {
  const { patientId } = req.body;

  const existing = await AppointmentModel.findOne({ patientId });

    if (existing) {
      return res.status(409).json({ message: "Appointment already booked for this patient." });
    }

  const appointment = new AppointmentModel({ patientId });
  appointment.save();
  res.status(200).json({ message: "Appointment booked successfully!" });
});

app.delete("/api/bookAppointment/:id", async (req, res) => {
  const { id } = req.params;

  const deletedAppointment = await AppointmentModel.findByIdAndDelete(id);
  if (!deletedAppointment)
    res.status(404).json("Appointment is not cancelled.");

  res.status(200).json({ message: "Appointment booked successfully!" });
});

app.get("/api/bookAppointment", async (req, res, next) => {
  const data = await AppointmentModel.find().populate("patientId");
  res.status(200).json(data);
});

const PORT = process.env.PORT || 8080;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
