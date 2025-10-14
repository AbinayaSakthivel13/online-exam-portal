const Result = require("../models/Result");

// GET ALL RESULTS
async function getResults(req, res) {
  const results = await Result.findAll();
  res.json(results);
}

module.exports = { getResults };
