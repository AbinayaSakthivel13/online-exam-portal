const express = require("express");
const router = express.Router();
const { getQuestions, createQuestion } = require("../controllers/questionController");
const { authenticate } = require("../middleware/authMiddleware");

// PUBLIC for viewing questions
router.get("/", getQuestions);

// PROTECTED: only admin can create
router.post("/", authenticate("admin"), createQuestion);

module.exports = router;
