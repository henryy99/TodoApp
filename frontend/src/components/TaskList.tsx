import TaskEmptyState from "./TaskEmptyState";
import TaskCard from "./TaskCard";
import type { FilteredType, Task } from "@/lib/data";

const TaskList = ({
  filteredTasks,
  filter,
  handleDeleteTask,
}: {
  filteredTasks: Task[];
  filter: FilteredType;
  handleDeleteTask: () => void;
}) => {
  if (!filteredTasks || filteredTasks.length === 0)
    return <TaskEmptyState filter={filter} />;
  return (
    <div className="space-y-3">
      {filteredTasks.map((task, i) => (
        <TaskCard
          key={task._id ?? i}
          task={task as Task}
          index={i}
          handleDeleteTask={handleDeleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
