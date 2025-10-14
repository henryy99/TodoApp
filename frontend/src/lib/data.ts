export const filteredType = {
  all: "all",
  active: "active",
  completed: "completed",
};
export type FilteredType = keyof typeof filteredType;

export type Task = {
  _id: string;
  title: string;
  status: "active" | "completed";
  completedAt: Date | null;
  createdAt: Date;
};

export const options = [
  { value: "today", label: "Today" },
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
  { value: "all", label: "All" },
];

export const visibleTaskLimit = 4;
