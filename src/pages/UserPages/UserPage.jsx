import React, { useState } from "react";
import UserSidebar from "./UserSidebar";

const UserPage = () => {
  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    deadline: "",
    progress: 0, // Default progress
  });

  // Handle Task Creation
  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim() || !newTask.description.trim()) return;

    const taskId = Date.now().toString(); // Unique ID
    const newTaskItem = { id: taskId, ...newTask };

    setTasks([...tasks, newTaskItem]); // Update state with new task

    // Reset form
    setNewTask({ title: "", description: "", priority: "Medium", deadline: "", progress: 0 });
  };

  // Handle Progress Update
  const updateProgress = (taskId, progress) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, progress: parseInt(progress) } : task))
    );
  };

  // Function to get priority color
  const getPriorityColor = (priority) => {
    if (priority === "High") return "text-red-600 font-bold";
    if (priority === "Medium") return "text-yellow-600 font-bold";
    return "text-green-600 font-bold"; // Low priority
  };

  // Function to get task background color based on progress
  const getTaskBgColor = (progress) => {
    if (progress <= 30) return "bg-red-100 border-red-400";
    if (progress <= 70) return "bg-yellow-100 border-yellow-400";
    return "bg-green-100 border-green-400";
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <UserSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">User Task Management</h1>

        {/* Task Creation Form */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Create a New Task</h2>
          <form onSubmit={handleCreateTask} className="space-y-4">
            <input
              type="text"
              placeholder="Task Title"
              className="w-full p-2 border rounded"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              required
            />
            <textarea
              placeholder="Task Description"
              className="w-full p-2 border rounded"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              required
            />
            <select
              className="w-full p-2 border rounded"
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            >
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={newTask.deadline}
              onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
              required
            />
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
              Add Task
            </button>
          </form>
        </div>

        {/* Task Progress Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.length === 0 ? (
            <p className="text-gray-600">No tasks created yet. Start by adding a task!</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`shadow-md p-4 rounded-md border-l-4 ${getTaskBgColor(task.progress)}`}
              >
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-gray-600">{task.description}</p>

                {/* Priority Display with Color */}
                <span className={`text-sm ${getPriorityColor(task.priority)}`}>
                  Priority: {task.priority}
                </span>

                {/* Deadline Display */}
                <p className="text-sm text-gray-700 mt-1">
                  <span className="font-semibold">Deadline:</span> {task.deadline}
                </p>

                {/* Updated Progress Bar Section */}
                <div className="relative pt-4">
                  <label className="block text-sm font-medium text-gray-700">Progress:</label>
                  
                  {/* Progress Bar Container */}
                  <div className="relative w-full h-4 bg-gray-300 rounded-full overflow-hidden mt-1">
                    <div
                      style={{
                        width: `${task.progress}%`,
                        transition: "width 0.5s ease-in-out",
                      }}
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"
                    ></div>
                  </div>

                  {/* Progress Input Slider */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={task.progress}
                    onChange={(e) => updateProgress(task.id, e.target.value)}
                    className="w-full mt-2 accent-blue-600"
                  />

                  {/* Progress Percentage Display */}
                  <span className="text-sm font-medium text-gray-700">{task.progress}% Completed</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
