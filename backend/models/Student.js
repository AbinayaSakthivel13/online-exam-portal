const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Student = sequelize.define(
  "Student",
  {
    student_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), unique: true, allowNull: false },
    password: { type: DataTypes.STRING(255), allowNull: false },
    department: { type: DataTypes.STRING(50) }
  },
  { tableName: "students", timestamps: false }
);

module.exports = Student;
