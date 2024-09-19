const mongoose = require("mongoose");
exports.dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Error occured while connecting DB:", error);
    process.exit(1);
  }
};
