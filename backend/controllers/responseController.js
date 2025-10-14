const Response = require("../models/Response");
const Question = require("../models/Question");
const Result = require("../models/Result");

// SUBMIT RESPONSES
async function submitResponses(req, res) {
  try {
    const { student_id, exam_id, answers } = req.body;

    // Validate input
    if (!student_id || !exam_id || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    let total = 0;

    // Process all responses in parallel
    await Promise.all(
      answers.map(async (ans) => {
        const question = await Question.findByPk(ans.question_id);

        if (!question) {
          throw new Error(`Question ID ${ans.question_id} not found`);
        }

        const correct = question.correct_answer === ans.chosen_answer;
        if (correct) total += question.marks;

        await Response.create({
          student_id,
          exam_id,
          question_id: ans.question_id,
          chosen_answer: ans.chosen_answer,
        });
      })
    );

    // Calculate grade based on marks
    let grade;
    if (total >= 90) grade = "A";
    else if (total >= 75) grade = "B";
    else if (total >= 50) grade = "C";
    else grade = "D";

    // Save result
    const result = await Result.create({
      student_id,
      exam_id,
      marks_obtained: total,
      grade,
    });

    res.status(200).json({
      message: "Responses submitted successfully",
      total,
      grade,
      result,
    });
  } catch (error) {
    console.error("Error submitting responses:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = { submitResponses };
