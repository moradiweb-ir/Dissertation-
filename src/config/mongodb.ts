import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("متصل به MongoDB");
  } catch (error) {
    console.log("خطا در اتصال به MongoDB", error);
  }
};
