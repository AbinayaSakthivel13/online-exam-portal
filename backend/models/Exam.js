const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Admin = require("./Admin");

const Exam = sequelize.define(
  "Exam",
  {
    exam_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    exam_name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.STRING(255), allowNull: true },
    exam_date: { type: DataTypes.DATEONLY, allowNull: false },
    duration: { type: DataTypes.INTEGER, allowNull: false }, // in minutes
    total_marks: { type: DataTypes.INTEGER, allowNull: false },
    created_by: { type: DataTypes.INTEGER, references: { model: Admin, key: "admin_id" } }
  },
  { tableName: "exams", timestamps: false }
);

module.exports = Exam;
