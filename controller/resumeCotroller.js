const fs = require("fs");
const pdf = require("pdf-parse");
const Resume = require("../models/resume");
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.uploadResume = async (req, res) => {
  try {
    const fileBuffer = fs.readFileSync(req.file.path);

    const pdfData = await pdf(fileBuffer);

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Extract skills and give a short summary:\n${pdfData.text}`,
        },
      ],
    });

    const resume = await Resume.create({
      userId: req.body.userId,
      fileUrl: req.file.path,
      extractedText: pdfData.text,
      summary: aiResponse.choices[0].message.content,
    });

    res.json({
      message: "Resume uploaded & analysed successfully",
      resume,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
