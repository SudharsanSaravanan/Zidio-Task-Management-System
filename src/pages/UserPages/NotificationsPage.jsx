import React, { useEffect, useState } from "react";
import UserSidebar from "./UserSidebar"; 

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let newNotifications = [];

    storedTasks.forEach((task) => {
      const taskDate = new Date(task.deadline);
      taskDate.setHours(0, 0, 0, 0);

      // 🔴 Deadline is today
      if (taskDate.getTime() === today.getTime()) {
        newNotifications.push(`🚨 Task "${task.title}" is due today!`);
      }

      // ⏳ Deadline is tomorrow
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      if (taskDate.getTime() === tomorrow.getTime()) {
        newNotifications.push(`⏳ Task "${task.title}" is due tomorrow!`);
      }
    });

    setNotifications(newNotifications);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <UserSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
          <h2 className="text-2xl font-bold mb-4 text-center">📢 Notifications</h2>

          {notifications.length === 0 ? (
            <p className="text-gray-500 text-center">No new notifications</p>
          ) : (
            <ul className="space-y-3">
              {notifications.map((message, index) => (
                <li
                  key={index}
                  className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded shadow-sm text-gray-800"
                >
                  {message}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
