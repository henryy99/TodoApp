import { filteredType, type FilteredType } from "@/lib/data";
import { Badge } from "./ui/badge";

import { Button } from "./ui/button";
import { Filter } from "lucide-react";

type StatsAndFiltersProps = {
  completedTaskCount?: number;
  activeTaskCount?: number;
  filter?: FilteredType;
  setFilter: (type: FilteredType) => void;
};

const StatsAndFilters = ({
  completedTaskCount = 0,
  activeTaskCount = 0,
  filter = "all",
  setFilter,
}: StatsAndFiltersProps) => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      {/* Stats */}
      <div className="flex gap-3">
        <Badge
          variant="secondary"
          className="bg-white/50 text-accent-foreground border-info/20"
        >
          {activeTaskCount} {filteredType.active}
        </Badge>
        <Badge
          variant="secondary"
          className="bg-white/50 text-success border-success/20"
        >
          {completedTaskCount} {filteredType.completed}
        </Badge>
      </div>
      {/* Filters */}
      <div className="flex flex-col gap-2 sm:flex-row">
        {Object.keys(filteredType).map((type) => (
          <Button
            key={type}
            variant={filter === type ? "gradient" : "ghost"}
            size={"sm"}
            className="capitalize cursor-pointer"
            onClick={() => setFilter(type as FilteredType)}
          >
            <Filter className="size-4" />
            {filteredType[type as FilteredType]}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default StatsAndFilters;
