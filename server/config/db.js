const mongoose = require("mongoose");

const connectDB = async (attempt = 0) => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("DB Connection Error:", error.message);

    const delay = Math.min(30000, 5000 * (attempt + 1));
    console.log(`Retrying MongoDB connection in ${delay / 1000} seconds...`);

    setTimeout(() => {
      connectDB(attempt + 1);
    }, delay);
  }
};

module.exports = connectDB;