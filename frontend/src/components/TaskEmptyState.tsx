import { Circle } from "lucide-react";
import { Card } from "./ui/card";

const TaskEmptyState = ({ filter }: { filter: string }) => {
  return (
    <Card className="p-8 text-center bg-gradient-card shadow-custom-md border-0">
      <div className="space-y-3">
        <Circle className="size-12 mx-auto text-muted-foreground" />
        <div>
          <h3 className="font-medium text-foreground">
            {filter === "active"
              ? "No task is active"
              : filter === "completed"
              ? "No task is completed"
              : "There is no task now"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {filter === "all"
              ? "Add a task to start"
              : "Change to All to see all task"}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TaskEmptyState;
