const express = require("express");
const router = express.Router();
const { getResults } = require("../controllers/resultController");
const { authenticate } = require("../middleware/authMiddleware");

// PROTECTED: only admin can get all results
router.get("/", authenticate(), getResults);

module.exports = router;
