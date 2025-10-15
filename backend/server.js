const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/db");

// --- ✅ Import models (for associations) --- //
const Admin = require("./models/Admin");
const Student = require("./models/Student");
const Exam = require("./models/Exam");
const Question = require("./models/Question");
const Response = require("./models/Response");
const Result = require("./models/Result");

// --- ✅ Import routes --- //
const authRoutes = require("./routes/auth");
const questionRoutes = require("./routes/questions");
const examRoutes = require("./routes/exams");
const responseRoutes = require("./routes/responses");
const resultRoutes = require("./routes/results");

const app = express();
app.use(cors());
app.use(express.json());

// --- ✅ Model Associations --- //
Exam.belongsTo(Admin, { foreignKey: "created_by" });
Response.belongsTo(Student, { foreignKey: "student_id" });
Response.belongsTo(Exam, { foreignKey: "exam_id" });
Response.belongsTo(Question, { foreignKey: "question_id" });
Result.belongsTo(Student, { foreignKey: "student_id" });
Result.belongsTo(Exam, { foreignKey: "exam_id" });

// Optional bidirectional relations (recommended)
Admin.hasMany(Exam, { foreignKey: "created_by" });
Student.hasMany(Response, { foreignKey: "student_id" });
Exam.hasMany(Response, { foreignKey: "exam_id" });
Question.hasMany(Response, { foreignKey: "question_id" });
Student.hasMany(Result, { foreignKey: "student_id" });
Exam.hasMany(Result, { foreignKey: "exam_id" });

// --- ✅ Routes --- //
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/responses", responseRoutes);
app.use("/api/results", resultRoutes);

// --- ✅ Root route --- //
app.get("/", (req, res) => {
  res.send("Online Exam System API Running 🚀");
});

// --- ✅ Database Connection --- //
sequelize.authenticate()
  .then(() => {
    console.log("✅ Database connected successfully");

    // Sync models (recommended for first-time setup)
    sequelize.sync({ alter: true })
      .then(() => console.log("✅ Database synced"))
      .catch((err) => console.error("❌ Sync error:", err));
  })
  .catch((err) => console.error("❌ DB connection error:", err));

// --- ✅ Start Server --- //
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
