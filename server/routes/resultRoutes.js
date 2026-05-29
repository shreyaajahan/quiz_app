const express = require("express");
const router = express.Router();

const Result = require("../models/Result");
const { protect } = require("../middleware/authMiddleware");

// Save Result
router.post("/", protect, async (req, res) => {
  try {
    const { score, totalQuestions } = req.body;

    const result = await Result.create({
  user: req.user.id,
  score,
  totalQuestions,
});

    res.status(201).json({
      message: "Result saved successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});
// Get User History
router.get("/history", protect, async (req, res) => {
  try {
    const results = await Result.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      results,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});
// Leaderboard
router.get("/leaderboard", protect, async (req, res) => {
  try {
    const leaderboard = await Result.aggregate([
      {
        $sort: {
          score: -1
        }
      },
      {
        $group: {
          _id: "$user",
          highestScore: { $first: "$score" },
          totalQuestions: { $first: "$totalQuestions" }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user"
      },
      {
        $sort: {
          highestScore: -1
        }
      },
      {
        $limit: 10
      }
    ]);

    res.status(200).json({
      results: leaderboard
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }
});
module.exports = router;