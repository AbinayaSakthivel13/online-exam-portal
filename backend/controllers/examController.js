const Exam = require("../models/Exam");
const Question = require("../models/Question");

// GET ALL EXAMS
async function getExams(req, res) {
  const exams = await Exam.findAll();
  res.json(exams);
}

// GET EXAM BY ID
async function getExamById(req, res) {
  const exam = await Exam.findByPk(req.params.id);
  if (!exam) return res.status(404).json({ message: "Exam not found" });
  res.json(exam);
}

// CREATE EXAM
async function createExam(req, res) {
  const { exam_name, exam_date, duration, total_marks, created_by } = req.body;
  const exam = await Exam.create({ exam_name, exam_date, duration, total_marks, created_by });
  res.json(exam);
}

module.exports = { getExams, createExam, getExamById };

