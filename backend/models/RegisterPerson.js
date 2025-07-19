const mongoose = require("mongoose");

const RegisterPersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  gender: { type: String, required: true },
  isPatient: { type: Boolean, require: true },
});

const RegisterPersonModel = mongoose.model(
  "RegisterPerson",
  RegisterPersonSchema,
  "registerperson"
);

module.exports = RegisterPersonModel;
