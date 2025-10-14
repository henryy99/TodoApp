import React from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/axios";

const AddTask = ({
  handleNewTaskAdded,
  userId,
}: {
  handleNewTaskAdded: () => void;
  userId: string;
}) => {
  const [newTaskTitle, setNewTaskTitle] = React.useState("");

  const addTask = async () => {
    if (!newTaskTitle.trim()) {
      setNewTaskTitle("");
      toast.error("Task title cannot be empty.");
      return;
    }
    // Logic to add the task goes here
    try {
      await api.post("/tasks", {
        title: newTaskTitle,
        id: userId,
      });
      toast.success("Task added successfully!");
    } catch (error) {
      toast.error("Failed to add task. Please try again.");
      console.error("Error adding task:", error);
    } finally {
      setNewTaskTitle("");
      handleNewTaskAdded();
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTask();
    }
  };
  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Add a new task..."
          className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          variant="gradient"
          size="xl"
          className="px-6"
          onClick={() => {
            addTask();
          }}
          disabled={!newTaskTitle.trim()}
        >
          Add Task <Plus size={5} />
        </Button>
      </div>
    </Card>
  );
};

export default AddTask;
