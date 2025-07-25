const AppointmentModel = require("../models/Appointment");

exports.postBookAppointment =  async (req, res, next) => {
  const { patientId } = req.body;

  const existing = await AppointmentModel.findOne({ patientId });

    if (existing) {
      return res.status(409).json({ message: "Appointment already booked for this patient." });
    }

  const appointment = new AppointmentModel({ patientId });
  appointment.save();
  res.status(200).json({ message: "Appointment booked successfully!" });
};

exports.deleteBookAppointment = async (req, res) => {
  const { id } = req.params;

  const deletedAppointment = await AppointmentModel.findByIdAndDelete(id);
  if (!deletedAppointment)
    res.status(404).json("Appointment is not cancelled.");

  res.status(200).json({ message: "Appointment booked successfully!" });
};

exports.getBookAppointment = async (req, res, next) => {
  const data = await AppointmentModel.find().populate("patientId");
  res.status(200).json(data);
}