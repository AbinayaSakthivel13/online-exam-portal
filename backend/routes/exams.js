const express = require("express");
const router = express.Router();
const { getExams, createExam, getExamById } = require("../controllers/examController");

// GET all exams
router.get("/", getExams);

// GET exam by ID
router.get("/:id", getExamById);

// POST create exam
router.post("/", createExam);

module.exports = router;
