const express = require("express");
const router = express.Router();
const { submitResponses } = require("../controllers/responseController");
const { authenticate } = require("../middleware/authMiddleware");

// PROTECTED: only student can submit exam
router.post("/", authenticate("student"), submitResponses);

module.exports = router;
