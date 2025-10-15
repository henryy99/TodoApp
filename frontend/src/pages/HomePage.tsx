import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import React, { useEffect } from "react";
import { visibleTaskLimit, type Task } from "@/lib/data";
import { toast } from "sonner";

import api from "@/lib/axios";
import Nav from "@/components/Nav";
import { useUser } from "@/context/UserContext";
const HomePage = () => {
  const [tasksBuffer, setTasksBuffer] = React.useState<Task[]>([]);
  const [activeCount, setActiveCount] = React.useState(0);
  const [completedCount, setCompletedCount] = React.useState(0);
  const [filter, setFilter] = React.useState<"all" | "active" | "completed">(
    "all"
  );
  const [dateQuery, setDateQuery] = React.useState("today");
  const [page, setPage] = React.useState(1);
  const { state } = useUser();
  const userId = state.user?._id;

  // Fetch tasks from the backend
  const fetchTasks = React.useCallback(async () => {
    try {
      const res = await api.get(`/tasks?id=${userId}&filter=${dateQuery}`);

      setTasksBuffer(res.data.tasks);
      setActiveCount(res.data.activeCount);
      setCompletedCount(res.data.completedCount);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to fetch task");
    }
  }, [dateQuery, userId]); // ✅ include dependencies here

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);
  // Filter tasks based on the selected filter
  const filteredTasks = React.useMemo(() => {
    if (filter === "all") return tasksBuffer;
    return tasksBuffer.filter((task) => task.status === filter);
  }, [filter, tasksBuffer]);

  // Handler to refresh tasks after adding a new task
  const handleTasksChange = () => {
    fetchTasks();
  };
  //Handle next page
  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };
  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const visibleTask = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );
  if (visibleTask.length === 0) handlePrevPage();
  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

  return (
    <div className="min-h-screen w-full bg-[#fefcff] relative">
      {/* Dreamy Sky Pink Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
        }}
      />
      {/* Your Content/Components */}
      <div className="container pt-8 mx-auto z-10 relative">
        <Nav />
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          {/* Header */}
          <Header />
          {/* Add Task */}
          <AddTask
            handleNewTaskAdded={handleTasksChange}
            userId={userId as string}
          />
          {/* Stats and Filters */}
          <StatsAndFilters
            activeTaskCount={activeCount}
            completedTaskCount={completedCount}
            filter={filter}
            setFilter={setFilter}
          />
          {/* Task List */}
          <TaskList
            filteredTasks={visibleTask}
            filter={filter}
            handleDeleteTask={handleTasksChange}
          />
          {/* Date Time Filter  and Task List Pagination*/}
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
            <TaskListPagination
              handleNext={handleNextPage}
              handlePrev={handlePrevPage}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
          </div>
          {/* Footer */}
          <Footer
            activeTasksCount={activeCount}
            completedTasksCount={completedCount}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
