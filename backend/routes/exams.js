const express = require("express");
const router = express.Router();
const { getExams, createExam } = require("../controllers/examController");
const { authenticate } = require("../middleware/authMiddleware");

// PUBLIC for viewing exams
router.get("/", getExams);

// PROTECTED: only admin can create
router.post("/", authenticate("admin"), createExam);

module.exports = router;
