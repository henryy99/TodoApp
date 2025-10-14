const Footer = ({ completedTasksCount = 0, activeTasksCount = 0 }) => {
  return (
    <>
      {completedTasksCount + activeTasksCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {completedTasksCount > 0 && (
              <>
                {completedTasksCount} completed task(s).
                {activeTasksCount > 0
                  ? `Just ${activeTasksCount} task(s) left to do`
                  : ` Nothing left to do! 🎉`}
              </>
            )}
            {completedTasksCount === 0 &&
              activeTasksCount > 0 &&
              `${activeTasksCount} task(s) to do. Let's get started!`}
          </p>
        </div>
      )}{" "}
    </>
  );
};

export default Footer;
