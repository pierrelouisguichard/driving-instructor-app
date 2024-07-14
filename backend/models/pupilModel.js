const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pupilSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    eMail: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pupils", pupilSchema);
