const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Student = require("./Student");
const Exam = require("./Exam");
const Question = require("./Question");

const Response = sequelize.define(
  "Response",
  {
    response_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    student_id: { type: DataTypes.INTEGER, references: { model: Student, key: "student_id" } },
    exam_id: { type: DataTypes.INTEGER, references: { model: Exam, key: "exam_id" } },
    question_id: { type: DataTypes.INTEGER, references: { model: Question, key: "question_id" } },
    chosen_answer: { type: DataTypes.STRING(200), allowNull: false },
  },
  { tableName: "response", timestamps: false }
);

module.exports = Response;
