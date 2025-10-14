const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Admin = sequelize.define(
  "Admin",
  {
    admin_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), unique: true, allowNull: false },
    password: { type: DataTypes.STRING(255), allowNull: false }
  },
  { tableName: "admins", timestamps: false }
);

module.exports = Admin;
