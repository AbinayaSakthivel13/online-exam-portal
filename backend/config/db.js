const { Sequelize } = require("sequelize");
require("dotenv").config();

// Create a Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,   // database name
  process.env.DB_USER,   // username
  process.env.DB_PASS,   // password
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: false
  }
);


// Test the connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.error("Database connection error:", err));

module.exports = sequelize;
