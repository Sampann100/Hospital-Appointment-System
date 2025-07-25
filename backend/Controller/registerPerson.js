const RegisterPersonModel = require("../models/RegisterPerson");

exports.postRegisterPerson = (req, res, next) => {
  const newPersonData = new RegisterPersonModel(req.body);

  newPersonData
    .save()
    .then(() => {
      res.status(200).json({ message: "Data received." });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getRegisterPerson = async (req, res, next) => {
  const data = await RegisterPersonModel.find({});
  res.status(200).json(data);
};
