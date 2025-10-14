import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

type TaskListPaginationProps = {
  handleNext: () => void;
  handlePrev: () => void;
  handlePageChange: (page: number) => void;
  page: number;
  totalPages: number;
};

const TaskListPagination = ({
  handleNext,
  handlePrev,
  handlePageChange,
  page,
  totalPages,
}: TaskListPaginationProps) => {
  const generatePages = () => {
    const pages: (number | string)[] = [1];
    if (totalPages <= 4) {
      for (let i = 2; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page < 2) {
        pages.push(2, 3, "...", totalPages);
      } else if (page >= totalPages - 1) {
        pages.push("...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push("...", page, "...", totalPages);
      }
    }
    return pages;
  };
  const pagesToShow = generatePages();
  return (
    <div className="flex justify-center mt-4">
      <Pagination>
        <PaginationContent>
          {/*Go to previous page */}
          <PaginationItem>
            <PaginationPrevious
              onClick={page === 1 ? undefined : handlePrev}
              className={cn(
                "cursor-pointer",
                page === 1 && "pointer-events-none opacity-50"
              )}
            />
          </PaginationItem>
          {/* Page  */}
          {pagesToShow.map((item, index) => (
            <PaginationItem key={index}>
              {item === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  isActive={page === item}
                  onClick={() => {
                    if (item !== page) handlePageChange(item as number);
                  }}
                  className="cursor-pointer"
                >
                  {item}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* Go to next page */}
          <PaginationItem>
            <PaginationNext
              onClick={page < totalPages ? handleNext : undefined}
              className={cn(
                "cursor-pointer",
                (page === totalPages || pagesToShow.length === 1) &&
                  "pointer-events-none opacity-50"
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TaskListPagination;
