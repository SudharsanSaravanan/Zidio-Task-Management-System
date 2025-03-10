const statusStyles = {
    "Pending": "bg-red-200 text-red-800 px-2 py-1 rounded",
    "In Progress": "bg-yellow-200 text-yellow-800 px-2 py-1 rounded",
  };
  
  const PendingTasks = () => {
    const tasks = [
      { name: "Fix login issue", user: "Alice", status: "Pending" },
      { name: "Update dashboard UI", user: "Bob", status: "In Progress" },
      { name: "Database migration", user: "Charlie", status: "Pending" },
    ];
  
    return (
      <div className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Pending Tasks</h3>
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className="flex justify-between items-center border-b py-2">
              <span>{task.name} - {task.user}</span>
              <span className={statusStyles[task.status]}>{task.status}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default PendingTasks;
  