require("dotenv").config();

const Pupil = require("../models/pupilModel");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();

const getAllPupils = async (req, res) => {
  try {
    const pupils = await Pupil.find({}).sort({ createdAt: -1 });

    res.status(200).json(pupils);
  } catch (error) {
    console.error("Errorr fetching pupils:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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
  try {
    const {
      firstName,
      lastName,
      eMail,
      noviceSkillsList,
      intermediateSkillsList,
      advancedSkillsList,
    } = req.body;
    const pupil = new Pupil({
      firstName,
      lastName,
      eMail,
      noviceSkillsList,
      intermediateSkillsList,
      advancedSkillsList,
    });
    await pupil.save();
    res.status(201).json(pupil);
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
    return res.status(400).json({ error: "Invalid Pupil ID" });
  }

  try {
    const pupil = await Pupil.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!pupil) {
      return res.status(404).json({ error: "Pupil Not Found" });
    }

    res.status(200).json(pupil);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the pupil" });
  }
};

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendReport = async (req, res) => {
  const { to, subject, html } = req.body;

  if (!to || !subject || !html) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await transporter.sendMail({
      from: "pierrelguichard@hotmail.com",
      to,
      subject,
      html,
    });
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

module.exports = {
  getAllPupils,
  getPupil,
  createPupil,
  deletePupil,
  updatePupil,
  sendReport,
};
