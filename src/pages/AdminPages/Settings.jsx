import React, { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";

const Settings = () => {
  // User profile state
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@example.com",
    password: "",
  });

  // Theme state (light/dark mode toggle)
  const [darkMode, setDarkMode] = useState(false);

  // Handle input change for profile settings
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle theme toggle
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Save settings function (Dummy for now)
  const saveSettings = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Settings</h1>

        {/* Profile Settings */}
        <div className="bg-white p-4 shadow rounded-lg mb-4">
          <h2 className="text-lg font-semibold mb-2">Profile Settings</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium">Name:</label>
              <input
                type="text"
                name="name"
                className="border p-2 rounded w-full"
                value={profile.name}
                onChange={handleProfileChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email:</label>
              <input
                type="email"
                name="email"
                className="border p-2 rounded w-full"
                value={profile.email}
                onChange={handleProfileChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">New Password:</label>
              <input
                type="password"
                name="password"
                className="border p-2 rounded w-full"
                value={profile.password}
                onChange={handleProfileChange}
                placeholder="Enter new password"
              />
            </div>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="bg-white p-4 shadow rounded-lg mb-4">
          <h2 className="text-lg font-semibold mb-2">Theme Settings</h2>
          <div className="flex items-center">
            <label className="mr-4">Dark Mode:</label>
            <button
              className={`px-4 py-2 rounded ${
                darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
              }`}
              onClick={toggleTheme}
            >
              {darkMode ? "Enabled" : "Disabled"}
            </button>
          </div>
        </div>

        {/* Save Settings Button */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={saveSettings}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
 