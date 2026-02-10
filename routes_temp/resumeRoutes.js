const express = require("express");
const upload = require("../middleware/multer");
const { uploadResume } = require("../controller/resumeCotroller");

const router = express.Router();

router.post("/upload", upload.single("resume"), uploadResume);

module.exports = router;
