const Pupil = require("../models/pupilModel");
const mongoose = require("mongoose");

const getAllPupils = async (req, res) => {
  const pupils = await Pupil.find({}).sort({ createdAt: -1 });

  res.status(200).json(pupils);
};

const getPupil = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid Pupil ID" });
  }

  const pupil = await Pupil.findById(id);

  if (!pupil) {
    return res.status(404).json({ error: "Pupil Not Found." });
  }

  res.status(200).json(pupil);
};

const createPupil = async (req, res) => {
  const { firstName, lastName, eMail } = req.body;

  try {
    const pupil = await Pupil.create({ firstName, lastName, eMail });
    res.status(200).json(pupil);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePupil = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid Pupil ID" });
  }

  const pupil = await Pupil.findOneAndDelete({ _id: id });

  if (!pupil) {
    return res.status(404).json({ error: "Pupil Not Found." });
  }

  res.status(200).json(pupil);
};

const updatePupil = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid Pupil ID" });
  }

  const pupil = await Pupil.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!pupil) {
    return res.status(404).json({ error: "Pupil Not Found." });
  }

  res.status(200).json(pupil);
};

module.exports = {
  getAllPupils,
  getPupil,
  createPupil,
  deletePupil,
  updatePupil,
};
