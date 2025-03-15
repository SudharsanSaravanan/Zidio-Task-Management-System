import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

const UserDashboard = () => {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });

  const [username, setUsername] = useState(
    localStorage.getItem("username") || "User"
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateChart();
  }, [tasks]);

  const addTask = () => {
    const taskName = document.getElementById("taskName").value.trim();
    const taskDeadline = document.getElementById("taskDeadline").value;

    if (taskName && taskDeadline) {
      setTasks([...tasks, { name: taskName, status: "Pending", deadline: taskDeadline }]);
      document.getElementById("taskName").value = "";
      document.getElementById("taskDeadline").value = "";
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleStatus = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, status: task.status === "Pending" ? "Completed" : "Pending" } : task
      )
    );
  };

  const updateChart = () => {
    const pending = tasks.filter((task) => task.status === "Pending").length;
    const completed = tasks.filter((task) => task.status === "Completed").length;

    const ctx = document.getElementById("taskChart");
    if (ctx) {
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Pending", "Completed"],
          datasets: [
            {
              label: "Task Statistics",
              data: [pending, completed],
              backgroundColor: ["#EF4444", "#10B981"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  };

  return (
    <div className="bg-gray-100 p-6">
      {/* Welcome Message */}
      <div className="bg-white p-4 shadow-md rounded-lg mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-700">
          Welcome, <span className="text-blue-600">{username}</span>!
        </h1>
        <p className="text-gray-500">Track your tasks and meet your deadlines.</p>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">User Dashboard</h1>

      {/* Task Input Form */}
      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        <h2 className="text-xl font-bold mb-4">Add New Task</h2>
        <input type="text" id="taskName" placeholder="Task Name" className="border p-2 rounded w-full mb-2" />
        <input type="date" id="taskDeadline" className="border p-2 rounded w-full mb-2" />
        <button onClick={addTask} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Add Task
        </button>
      </div>

      {/* Task Statistics */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold">Pending Tasks</h2>
          <p className="text-3xl font-bold text-red-600">{tasks.filter((task) => task.status === "Pending").length}</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold">Completed Tasks</h2>
          <p className="text-3xl font-bold text-green-600">{tasks.filter((task) => task.status === "Completed").length}</p>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">My Tasks</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Task Name</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Deadline</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td className="border p-2">{task.name}</td>
                <td className={`border p-2 ${task.status === "Completed" ? "text-green-500" : "text-red-500"}`}>
                  {task.status}
                </td>
                <td className="border p-2">{task.deadline}</td>
                <td className="border p-2">
                  <button onClick={() => deleteTask(index)} className="bg-red-500 text-white px-2 py-1 rounded">
                    Delete
                  </button>
                  <button
                    onClick={() => toggleStatus(index)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded ml-2"
                  >
                    Toggle Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Task Analytics Chart */}
      <div className="bg-white p-6 mt-6 shadow-md rounded-lg" style={{ maxWidth: "400px", height: "300px", margin: "auto" }}>
        <h2 className="text-xl font-bold mb-4">Task Analytics</h2>
        <canvas id="taskChart" style={{ maxHeight: "250px" }}></canvas>
      </div>
    </div>
  );
};

export default UserDashboard;
