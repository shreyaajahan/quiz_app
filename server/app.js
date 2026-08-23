const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const questionRoutes = require("./routes/questionRoutes");
const resultRoutes = require("./routes/resultRoutes");

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/results", resultRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "OK",
    dbReady: require("mongoose").connection.readyState === 1,
  });
});

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});