const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Student = require("./Student");
const Exam = require("./Exam");

const Result = sequelize.define(
  "Result",
  {
    result_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    student_id: { type: DataTypes.INTEGER, references: { model: Student, key: "student_id" } },
    exam_id: { type: DataTypes.INTEGER, references: { model: Exam, key: "exam_id" } },
    score: { type: DataTypes.INTEGER, defaultValue: 0 },
    details: { type: DataTypes.JSON, allowNull: false },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  },
  { tableName: "results", timestamps: false }
);

module.exports = Result;
