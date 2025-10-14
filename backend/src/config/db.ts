import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING || "");
    console.log("MongoDB connected");
  } catch (err) {
    console.log("Error connecting to MongoDB", err);
    process.exit(1); //exit when error
  }
};
export default connectDB;
