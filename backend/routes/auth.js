const express = require("express");
const router = express.Router();
const { loginAdmin, loginStudent, registerStudent } = require("../controllers/authController");

// PUBLIC
router.post("/admin/login", loginAdmin);
router.post("/student/register", registerStudent);
router.post("/student/login", loginStudent);

module.exports = router;
