const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Exam = require("./Exam");

const Question = sequelize.define(
  "Question",
  {
    question_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    exam_id: { type: DataTypes.INTEGER, references: { model: Exam, key: "exam_id" } },
    question_text: { type: DataTypes.TEXT, allowNull: false },
    option_a: { type: DataTypes.STRING(255), allowNull: false },
    option_b: { type: DataTypes.STRING(255), allowNull: false },
    option_c: { type: DataTypes.STRING(255), allowNull: false },
    option_d: { type: DataTypes.STRING(255), allowNull: false },
    answer: { type: DataTypes.STRING(1), allowNull: false }, // 'a', 'b', 'c', 'd'
    marks: { type: DataTypes.INTEGER, defaultValue: 1 }
  },
  { tableName: "questions", timestamps: false }
);

module.exports = Question;
