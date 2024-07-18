const express = require("express");
const Pupil = require("../models/pupilModel");
const {
  getAllPupils,
  getPupil,
  createPupil,
  deletePupil,
  updatePupil,
} = require("../controllers/pupilController");

const router = express.Router();

router.get("/", getAllPupils);

router.get("/:id", getPupil);

router.post("/", createPupil);

router.delete("/:id", deletePupil);

router.patch("/:id", updatePupil);

module.exports = router;
