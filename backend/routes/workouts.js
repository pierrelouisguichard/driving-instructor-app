const express = require("express");
const Pupil = require("../models/pupilModel");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ mssg: "GET all workouts" });
});

router.get("/:id", (req, res) => {
  res.json({ mssg: "GET a single workout" });
});

router.post("/", async (req, res) => {
  const { firstName, lastName, eMail } = req.body;
  try {
    const pupil = await Pupil.create({ firstName, lastName, eMail });
    res.status(200).json(pupil);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", (req, res) => {
  res.json({ mssg: "DELETE a workout" });
});

router.patch("/:id", (req, res) => {
  res.json({ mssg: "UPDATE a workout" });
});

module.exports = router;
