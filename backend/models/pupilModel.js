const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const skillsSchema = new Schema({
  variable: { type: String, required: true },
  stage: {
    type: String,
    enum: [
      "Introduced",
      "Talk Through",
      "Prompted",
      "Rarely Prompted",
      "Independent",
    ],
    required: true,
  },
});

const pupilSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    eMail: { type: String, required: true },
    notes: { type: String, required: false },
    drivingLicenseChecked: { type: Boolean, required: true },
    eyeSightChecked: { type: Boolean, required: true },
    glassesContactsWorn: { type: Boolean, required: true },
    theoryTestBooked: { type: Boolean, required: true },
    theoryTestPassed: { type: Boolean, required: true },
    practicalTestBooked: { type: Boolean, required: true },
    noviceSkillsList: [skillsSchema],
    intermediateSkillsList: [skillsSchema],
    advancedSkillsList: [skillsSchema],
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pupils", pupilSchema);
