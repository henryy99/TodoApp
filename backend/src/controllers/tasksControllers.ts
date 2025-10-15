import type { Request, Response } from "express";
import Task from "../models/Task.js";

export const getAllTasks = async (req: Request, res: Response) => {
  const { filter = "today", id } = req.query;
  const now = new Date();
  let startDate: Date | null = null;

  switch (filter) {
    case "today":
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case "week":
      const firstDayOfWeek =
        now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0); // Adjust when day is Sunday
      startDate = new Date(now.getFullYear(), now.getMonth(), firstDayOfWeek);
      break;
    case "month":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case "all":
    default:
      startDate = null;
      break;
  }

  const query = startDate
    ? { createdAt: { $gte: startDate }, user_id: { $eq: id } }
    : {};
  try {
    const result = await Task.aggregate([
      { $match: query },
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          active: [{ $match: { status: "active" } }, { $count: "count" }],
          completed: [{ $match: { status: "completed" } }, { $count: "count" }],
        },
      },
    ]);
    const tasks = result[0].tasks;
    const activeCount = result[0].active[0]?.count || 0;
    const completedCount = result[0].completed[0]?.count || 0;

    res.status(200).json({ tasks, activeCount, completedCount });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, id } = req.body;
    const task = new Task({ title, user_id: id });
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { title, status, completedAt } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, status, completedAt },

      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(deletedTask);
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
