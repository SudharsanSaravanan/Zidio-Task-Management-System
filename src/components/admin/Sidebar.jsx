import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChartPie, FaUsers, FaTasks, FaCog } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  // Sidebar menu items with icons
  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: <FaChartPie /> },
    { path: "/admin/manage-users", label: "Manage Users", icon: <FaUsers /> },
    { path: "/admin/manage-tasks", label: "Manage Tasks", icon: <FaTasks /> },
    { path: "/admin/settings", label: "Settings", icon: <FaCog /> },
  ];

  return (
    <div className="w-64 min-h-screen p-6 bg-gray-900 text-white glassmorphism border-r border-gray-700">
      <h2 className="text-2xl font-extrabold text-center text-gray-100 tracking-wide mb-6">⚙️ Admin Panel</h2>

      <ul className="space-y-3">
        {menuItems.map(({ path, label, icon }) => (
          <li key={path}>
            <Link
              to={path}
              className={`flex items-center gap-3 py-3 px-5 rounded-lg transition-all duration-200 text-lg font-medium ${
                location.pathname === path
                  ? "bg-blue-600 shadow-lg transform scale-105"
                  : "hover:bg-blue-700 hover:scale-105 transition"
              }`}
            >
              <span className="text-xl">{icon}</span>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
