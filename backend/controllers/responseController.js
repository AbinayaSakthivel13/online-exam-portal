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

    // Build detailed response data
    const details = await Promise.all(
      answers.map(async (ans) => {
        const question = await Question.findByPk(ans.question_id);
        if (!question) {
          throw new Error(`Question ID ${ans.question_id} not found`);
        }

        const correct = question.answer === ans.chosen_answer;
        if (correct) total += question.marks;

        // Save individual response
        await Response.create({
          student_id,
          exam_id,
          question_id: ans.question_id,
          chosen_answer: ans.chosen_answer,
        });

        return {
          qId: ans.question_id,
          selected: ans.chosen_answer,
          correct: question.answer,
          correctBool: correct,
          marks: correct ? question.marks : 0,
        };
      })
    );

    // Save result
    const result = await Result.create({
      student_id,
      exam_id,
      score: total,
      details,
      date: new Date(),
    });

    res.status(200).json({
      message: "Responses submitted successfully",
      total,
      result,
    });
  } catch (error) {
    console.error("Error submitting responses:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = { submitResponses };
