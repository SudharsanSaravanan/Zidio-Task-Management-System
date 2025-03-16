import React from "react";
import { Link, useLocation } from "react-router-dom";

const UserSidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">User Panel</h2>

      <ul className="space-y-3">
        {[
          { path: "/user/dashboard", label: "Dashboard" },
          { path: "/user/userpage", label: "View Tasks" },
          { path: "/user/calendar", label: "Calendar" },
          { path: "/user/notifications", label: "Notifications" },
          { path: "/user/profile", label: "Profile" },
        ].map(({ path, label }) => (
          <li key={path}>
            <Link
              to={path}
              className={`block py-3 px-4 rounded transition duration-200 ${
                location.pathname === path ? "bg-blue-700" : "hover:bg-blue-700"
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSidebar;
