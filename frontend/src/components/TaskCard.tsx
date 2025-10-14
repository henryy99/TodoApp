import { type Task } from "@/lib/data";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Calendar,
  CheckCircle2,
  Circle,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Input } from "./ui/input";
import { toast } from "sonner";
import api from "@/lib/axios";
import React from "react";

// Handle Enter key for editing task title
const TaskCard = ({
  task,
  index,
  handleDeleteTask,
}: {
  task: Task;
  index: number;
  handleDeleteTask: () => void;
}) => {
  //State for editing task title
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedTitle, setEditedTitle] = React.useState(task.title || "");
  //Function to delete task
  const deleteTask = async (taskId: string) => {
    // Logic to delete the task goes here
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success("Task deleted successfully!");
      handleDeleteTask();
    } catch (error) {
      toast.error("Failed to delete task. Please try again.");
      console.error("Error deleting task:", error);
    }
  };
  //Function to update task title
  const updateTask = async () => {
    if (!editedTitle.trim()) {
      toast.error("Task title cannot be empty.");
      return;
    }
    if (editedTitle === task.title) {
      setIsEditing(false);
      return;
    }
    try {
      await api.put(`/tasks/${task._id}`, {
        title: editedTitle,
      });
      toast.success("Task changed to '" + editedTitle + "' successfully!");
      handleDeleteTask(); // Update the task list
    } catch (error) {
      toast.error("Failed to update task. Please try again.");
      console.error("Error updating task:", error);
      setEditedTitle(task.title || ""); // Revert to original title on error
    } finally {
      setIsEditing(false);
    }
  };
  //Function to toggle task completion status
  const toggleTaskStatus = async () => {
    try {
      await api.put(`/tasks/${task._id}`, {
        status: task.status === "completed" ? "active" : "completed",
        completedAt:
          task.status === "completed" ? null : new Date().toISOString(),
      });
      toast.success(
        `Task ${task.title} marked as ${
          task.status === "completed" ? "active" : "completed"
        } `
      );
      handleDeleteTask(); // Update the task list
    } catch (error) {
      toast.error("Failed to update task status. Please try again.");
      console.error("Error updating task status:", error);
    }
  };
  //Function to handle Enter key for editing task title
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateTask();
    }
  };

  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === "completed" && "opacity-75"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/*Check button */}
      <div className="flex items-center gap-4">
        <Button
          variant={"ghost"}
          size={"icon"}
          className={cn(
            "flex-shrink-0 size-8 rounded-full transition-all duration-200",
            task.status === "completed"
              ? "text-success hover:text-success/80"
              : "text-muted-foreground hover:text-primary"
          )}
          onClick={toggleTaskStatus}
        >
          {task.status === "completed" ? <CheckCircle2 /> : <Circle />}
        </Button>

        {/* Task title and date */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <Input
              placeholder="What to do?"
              className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => {
                setIsEditing(false);
                setEditedTitle(task.title || "");
              }}
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200",
                task.status === "completed"
                  ? "line-through text-muted-foreground"
                  : "text-foreground"
              )}
            >
              {task.title}
            </p>
          )}

          <div className="flex items-center gap-2 mt-1">
            <Calendar className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleString()}
            </span>
            {task.completedAt && (
              <>
                <span className="text-xs text-muted-foreground">-</span>
                <Calendar className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {new Date(task.completedAt).toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>
        {/* Edit and Delete buttons */}
        <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
            onClick={() => setIsEditing(true)}
          >
            <SquarePen className="size-4" />
          </Button>

          <Button
            variant={"ghost"}
            size={"icon"}
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
            onClick={() => {
              deleteTask(task._id);
            }}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
