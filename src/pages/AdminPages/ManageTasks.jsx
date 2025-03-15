import React, { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";

const ManageTasks = () => {
  // Dummy task data
  const [tasks, setTasks] = useState([
    { id: 1, title: "Fix UI bug", username: "John Doe", email: "john@example.com", status: "Pending", priority: "Medium", deadline: "2025-03-20" },
    { id: 2, title: "Update database schema", username: "Jane Smith", email: "jane@example.com", status: "Pending", priority: "High", deadline: "2025-03-22" },
    { id: 3, title: "Deploy new version", username: "Alice Brown", email: "alice@example.com", status: "Completed", priority: "Low", deadline: "2025-03-25" },
  ]);

  const [newTask, setNewTask] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");
  const [newDeadline, setNewDeadline] = useState("");

  // Add a new task
  const addTask = () => {
    if (newTask.trim() === "" || newUsername.trim() === "" || newEmail.trim() === "" || newDeadline.trim() === "") return;
    setTasks([
      ...tasks,
      { id: tasks.length + 1, title: newTask, username: newUsername, email: newEmail, status: "Pending", priority: newPriority, deadline: newDeadline },
    ]);
    setNewTask("");
    setNewUsername("");
    setNewEmail("");
    setNewPriority("Medium");
    setNewDeadline("");
  };

  // ✅ Mark task as completed
  const completeTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: "Completed" } : task
    ));
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Manage Tasks</h1>

        {/* Add Task */}
        <div className="bg-white p-4 shadow rounded-lg mb-4">
          <h2 className="text-lg font-semibold mb-2">Add New Task</h2>
          <div className="flex gap-2">
            <input type="text" className="border p-2 rounded w-full" placeholder="Enter task title..." value={newTask} onChange={(e) => setNewTask(e.target.value)} />
            <input type="text" className="border p-2 rounded w-full" placeholder="Enter username..." value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
            <input type="email" className="border p-2 rounded w-full" placeholder="Enter user email..." value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
            <select className="border p-2 rounded" value={newPriority} onChange={(e) => setNewPriority(e.target.value)}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <input type="date" className="border p-2 rounded" value={newDeadline} onChange={(e) => setNewDeadline(e.target.value)} />
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={addTask}>Add Task</button>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white p-4 shadow rounded-lg mb-4">
          <h2 className="text-lg font-semibold mb-2">Pending Tasks</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">ID</th>
                <th className="p-2">Title</th>
                <th className="p-2">Username</th>
                <th className="p-2">Email</th>
                <th className="p-2">Priority</th>
                <th className="p-2">Deadline</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.filter(task => task.status === "Pending").map(task => (
                <tr key={task.id} className="border-b">
                  <td className="p-2">{task.id}</td>
                  <td className="p-2">{task.title}</td>
                  <td className="p-2">{task.username}</td>
                  <td className="p-2">{task.email}</td>
                  <td className="p-2">{task.priority}</td>
                  <td className="p-2">{task.deadline}</td>
                  <td className="p-2">
                    <button 
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" 
                      onClick={() => completeTask(task.id)}>
                      Mark as Completed
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded ml-2 hover:bg-red-600" onClick={() => deleteTask(task.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Completed Tasks */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Completed Tasks</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">ID</th>
                <th className="p-2">Title</th>
                <th className="p-2">Username</th>
                <th className="p-2">Email</th>
                <th className="p-2">Priority</th>
                <th className="p-2">Deadline</th>
              </tr>
            </thead>
            <tbody>
              {tasks.filter(task => task.status === "Completed").map(task => (
                <tr key={task.id} className="border-b">
                  <td className="p-2">{task.id}</td>
                  <td className="p-2">{task.title}</td>
                  <td className="p-2">{task.username}</td>
                  <td className="p-2">{task.email}</td>
                  <td className="p-2">{task.priority}</td>
                  <td className="p-2">{task.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageTasks;
