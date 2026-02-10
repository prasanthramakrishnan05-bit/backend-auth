const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    userId: String,
    fileUrl: String,
    extractedText: String,
    skills: [String],
    summary: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);
