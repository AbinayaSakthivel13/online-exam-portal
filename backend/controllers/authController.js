const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Student = require("../models/Student");
require("dotenv").config();

// Helper to generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "2h" }); // Token valid for 2 hours
};

// ADMIN LOGIN
async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(400).json({ message: "Invalid password" });

    const token = generateToken(admin.admin_id, "admin");
    res.json({ token, admin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// STUDENT REGISTER
async function registerStudent(req, res) {
  try {
    const { name, email, password, department } = req.body;
    const existing = await Student.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const student = await Student.create({ name, email, password: hashed, department });

    const token = generateToken(student.student_id, "student");
    res.json({ token, student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// STUDENT LOGIN
async function loginStudent(req, res) {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ where: { email } });
    if (!student) return res.status(400).json({ message: "Student not found" });

    const valid = await bcrypt.compare(password, student.password);
    if (!valid) return res.status(400).json({ message: "Invalid password" });

    const token = generateToken(student.student_id, "student");
    res.json({ token, student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { loginAdmin, loginStudent, registerStudent };
