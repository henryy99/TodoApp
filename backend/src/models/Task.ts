import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    status: { type: String, enum: ["active", "completed"], default: "active" },
    completedAt: { type: Date, default: null },
    user_id: { type: String, required: true },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
