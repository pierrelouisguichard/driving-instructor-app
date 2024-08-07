const express = require("express");
const Pupil = require("../models/pupilModel");
const {
  getAllPupils,
  getPupil,
  createPupil,
  deletePupil,
  updatePupil,
  sendReport,
} = require("../controllers/pupilController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// middleware which requires with for all routes
router.use(requireAuth);

router.get("/", getAllPupils);

router.get("/:id", getPupil);

router.post("/", createPupil);

router.delete("/:id", deletePupil);

router.patch("/:id", updatePupil);

router.post("/send-report", sendReport);

module.exports = router;
