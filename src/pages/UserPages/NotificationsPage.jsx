import React from "react";
import UserSidebar from "./UserSidebar"; // Adjust path if needed

const NotificationsPage = ({ notifications = [] }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <UserSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
          <h2 className="text-2xl font-bold mb-4 text-center">Notifications</h2>

          {notifications.length === 0 ? (
            <p className="text-gray-500 text-center">No new notifications</p>
          ) : (
            <ul className="space-y-3">
              {notifications.map((message, index) => (
                <li
                  key={index}
                  className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded shadow-sm"
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
