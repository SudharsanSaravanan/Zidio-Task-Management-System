import React, { useState, useEffect } from "react";
import UserSidebar from "./UserSidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(""); // ✅ Store logged-in user
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    deadline: "",
    progress: 0,
  });

  useEffect(() => {
    // ✅ Fetch logged-in user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setLoggedInUser(storedUser?.name || "Unknown User");

    // ✅ Fetch stored tasks
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Handle Task Creation
  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim() || !newTask.description.trim()) return;

    const taskId = Date.now().toString();
    
    // ✅ Assign task to logged-in user
    const newTaskItem = { 
      id: taskId, 
      ...newTask, 
      assignedTo: loggedInUser // ✅ Store assigned user
    };

    const updatedTasks = [...tasks, newTaskItem];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    toast.success("Task added successfully!", { icon: "✅" });

    setNewTask({ title: "", description: "", priority: "Medium", deadline: "", progress: 0 });
  };

  // Handle Task Deletion
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    toast.error("Task removed successfully!", { icon: "🗑️" });
  };

  // Handle Progress Update
  const updateProgress = (taskId, progress) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, progress: parseInt(progress) } : task
    );

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Function to get priority color
  const getPriorityColor = (priority) => {
    if (priority === "High") return "text-red-600 font-bold";
    if (priority === "Medium") return "text-yellow-600 font-bold";
    return "text-green-600 font-bold"; // Low priority
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <UserSidebar />

      <div className="flex-1 p-6">
        <h1 className="text-4xl font-bold mb-6 text-center w-full">
          <span>🎯</span> 
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            User Task Management
          </span>
        </h1>

        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

        {/* Task Creation Box */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg mb-8 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create a New Task</h2>
          <form onSubmit={handleCreateTask} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Task Title</label>
              <input
                type="text"
                placeholder="Enter task title"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                placeholder="Enter task description"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                required
              />
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                >
                  <option value="High">🔥 High Priority</option>
                  <option value="Medium">⚡ Medium Priority</option>
                  <option value="Low">✅ Low Priority</option>
                </select>
              </div>

              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">Deadline</label>
                <input
                  type="date"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  value={newTask.deadline}
                  onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all"
            >
              ➕ Add Task
            </button>
          </form>
        </div>

        {/* Task List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.length === 0 ? (
            <p className="text-gray-600">No tasks created yet. Start by adding a task!</p>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className="bg-white shadow-md p-4 rounded-md border-l-4 border-blue-400">
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-gray-600">{task.description}</p>

                <span className={`text-sm ${getPriorityColor(task.priority)}`}>
                  Priority: {task.priority}
                </span>

                <p className="text-sm text-gray-700 mt-1">
                  <span className="font-semibold">Assigned To:</span> {task.assignedTo}
                </p>

                <p className="text-sm text-gray-700 mt-1">
                  <span className="font-semibold">Deadline:</span> {task.deadline}
                </p>

                {/* Task Progress */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Progress:</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={task.progress}
                    onChange={(e) => updateProgress(task.id, e.target.value)}
                    className="w-full mt-2 accent-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-700">{task.progress}% Completed</span>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="mt-4 w-full bg-red-600 text-white p-2 rounded-lg font-semibold hover:bg-red-700 transition-all"
                >
                  🗑️ Delete Task
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
