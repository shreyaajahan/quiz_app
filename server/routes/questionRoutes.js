const express = require("express");
const Question = require("../models/Question");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();
// Create Question
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const { question, options, correctAnswer } = req.body;

    // Validation
    if (!question || !options || !correctAnswer) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    // Create question
    const newQuestion = await Question.create({
      question,
      options,
      correctAnswer,
    });

    res.status(201).json({
      message: "Question added successfully",
      question: newQuestion,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Get All Questions
router.get("/", protect, async (req, res) => {
  try {
    const questions = await Question.find();

    res.status(200).json({
      message: "Questions fetched successfully",
      questions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Update Question
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const { question, options, correctAnswer } = req.body;

    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      {
        question,
        options,
        correctAnswer,
      },
      {
        new: true,
      }
    );

    if (!updatedQuestion) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    res.status(200).json({
      message: "Question updated successfully",
      question: updatedQuestion,
    });
  } catch (error) {
    if (error.name === "CastError") {
  return res.status(404).json({
    message: "Question not found",
  });
}

res.status(500).json({
  message: "Server Error",
});
  }
});

// Delete Question
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);

    if (!deletedQuestion) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    res.status(200).json({
      message: "Question deleted successfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;