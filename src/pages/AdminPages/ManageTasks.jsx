import React, { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";

const ManageTasks = () => {
  // Dummy task data
  const [tasks, setTasks] = useState([
    { id: 1, title: "Fix UI bug", status: "Pending" },
    { id: 2, title: "Update database schema", status: "In Progress" },
    { id: 3, title: "Deploy new version", status: "Completed" },
  ]);

  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  // Add a new task
  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { id: tasks.length + 1, title: newTask, status: "Pending" }]);
    setNewTask("");
  };

  // Start editing a task
  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditedTask(task.title);
  };

  // Save edited task
  const saveTask = (id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, title: editedTask } : task)));
    setEditingTask(null);
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
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
          <div className="flex">
            <input
              type="text"
              className="border p-2 rounded w-full"
              placeholder="Enter task title..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-600"
              onClick={addTask}
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Task List</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">ID</th>
                <th className="p-2">Title</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-b">
                  {editingTask === task.id ? (
                    <>
                      <td className="p-2">{task.id}</td>
                      <td className="p-2">
                        <input
                          type="text"
                          className="border p-1 rounded w-full"
                          value={editedTask}
                          onChange={(e) => setEditedTask(e.target.value)}
                        />
                      </td>
                      <td className="p-2">{task.status}</td>
                      <td className="p-2">
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                          onClick={() => saveTask(task.id)}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-400 text-white px-3 py-1 rounded ml-2 hover:bg-gray-500"
                          onClick={() => setEditingTask(null)}
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-2">{task.id}</td>
                      <td className="p-2">{task.title}</td>
                      <td className="p-2">{task.status}</td>
                      <td className="p-2">
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                          onClick={() => startEditing(task)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded ml-2 hover:bg-red-600"
                          onClick={() => deleteTask(task.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {tasks.length === 0 && <p className="text-gray-500 text-center mt-4">No tasks found.</p>}
        </div>
      </div>
    </div>
  );
};

export default ManageTasks;
