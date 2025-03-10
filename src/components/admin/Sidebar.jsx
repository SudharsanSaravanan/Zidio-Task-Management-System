import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <ul>
        <li className="mb-2">
          <Link to="/admin/dashboard" className="block py-2 px-4 hover:bg-gray-700 rounded">
            Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/admin/manage-users" className="block py-2 px-4 hover:bg-gray-700 rounded">
            Manage Users
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/admin/manage-tasks" className="block py-2 px-4 hover:bg-gray-700 rounded">
            Manage Tasks
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/admin/settings" className="block py-2 px-4 hover:bg-gray-700 rounded">
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
