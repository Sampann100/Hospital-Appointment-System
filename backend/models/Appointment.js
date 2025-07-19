const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "RegisterPerson" },
  bookedAt: { type: Date, default: Date.now },
});

const AppointmentModel = mongoose.model("Appointment", AppointmentSchema);

module.exports = AppointmentModel;
