require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const AppointmentModel = require("./models/Appointment");
const hostRouter = require("./routes/host");
const userRouter = require("./routes/user");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Authentication
app.use("/api/auth", hostRouter);

//Registration Person
app.use("/user", userRouter);

const PORT = process.env.PORT || 8080;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
