import React, { useState, useEffect } from "react";

const statusStyles = {
  Pending: "bg-red-200 text-red-800 px-2 py-1 rounded",
  "In Progress": "bg-yellow-200 text-yellow-800 px-2 py-1 rounded",
};

const PendingTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from localStorage
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log("Stored Tasks:", storedTasks); // ✅ Debugging step

    // Filter tasks that are pending
    const filteredTasks = storedTasks.filter((task) => task.progress < 100);

    setTasks(filteredTasks);
  }, []);

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h3 className="text-xl font-semibold mb-2">Pending Tasks</h3>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li key={index} className="flex justify-between items-center border-b py-2">
              <span>{task.title}</span> {/* ✅ Removed Assigned Name */}
              <span className={statusStyles[task.status] || "bg-gray-200 text-gray-800 px-2 py-1 rounded"}>
                {task.status || "Pending"}
              </span>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No pending tasks</li>
        )}
      </ul>
    </div>
  );
};

export default PendingTasks;
