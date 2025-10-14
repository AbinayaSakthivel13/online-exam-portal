const Question = require("../models/Question");

// GET ALL QUESTIONS
async function getQuestions(req, res) {
  const questions = await Question.findAll();
  res.json(questions);
}

// CREATE QUESTION
async function createQuestion(req, res) {
  const { question_text, option_a, option_b, option_c, option_d, correct_answer, subject, marks } = req.body;
  const question = await Question.create({ question_text, option_a, option_b, option_c, option_d, correct_answer, subject, marks });
  res.json(question);
}

module.exports = { getQuestions, createQuestion };
