const Exam = require("../models/Exam");
const Question = require("../models/Question");

// GET ALL EXAMS
async function getExams(req, res) {
  const exams = await Exam.findAll();
  res.json(exams);
}

// CREATE EXAM
async function createExam(req, res) {
  const { exam_name, exam_date, duration, total_marks, created_by } = req.body;
  const exam = await Exam.create({ exam_name, exam_date, duration, total_marks, created_by });
  res.json(exam);
}

module.exports = { getExams, createExam };
