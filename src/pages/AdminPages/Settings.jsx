import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";

const Settings = () => {
  // Load stored admin profile data
  const [profile, setProfile] = useState(() => {
    const savedProfile = JSON.parse(localStorage.getItem("adminProfile"));
    return (
      savedProfile || {
        name: "Admin User",
        email: "admin@example.com",
        profilePic: "",
        role: "Admin",
      }
    );
  });

  const [imagePreview, setImagePreview] = useState(profile.profilePic);
  const [password, setPassword] = useState("");
  const [activityLog, setActivityLog] = useState(() => {
    return JSON.parse(localStorage.getItem("adminActivityLog")) || [];
  });

  // Handle input change
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProfile({ ...profile, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Save profile data to localStorage and log activity
  const saveSettings = () => {
    localStorage.setItem("adminProfile", JSON.stringify(profile));

    const newLog = `Updated profile on ${new Date().toLocaleString()}`;
    const updatedLog = [newLog, ...activityLog.slice(0, 4)]; // Keep latest 5 logs
    localStorage.setItem("adminActivityLog", JSON.stringify(updatedLog));
    setActivityLog(updatedLog);

    alert("Profile updated successfully!");
    window.location.reload(); // Refresh to reflect changes in navbar
  };

  // Change password (dummy for now)
  const handleChangePassword = () => {
    if (!password) return alert("Please enter a new password!");
    alert("Password changed successfully! (This is a dummy feature for now)");
    setPassword("");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin Settings</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Settings */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Profile Settings</h2>

            {/* Profile Picture */}
            <div className="flex justify-center mb-4">
              <label
                htmlFor="profilePic"
                className="cursor-pointer relative w-28 h-28 border-4 border-gray-300 rounded-full flex items-center justify-center bg-gray-200"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Admin Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-gray-600">Upload</span>
                )}
              </label>
              <input type="file" id="profilePic" accept="image/*" onChange={handleImageChange} className="hidden" />
            </div>

            {/* Profile Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Role</label>
                <select
                  name="role"
                  value={profile.role}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <option value="Admin">Admin</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={saveSettings}
              className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Save Profile
            </button>
          </div>

          {/* Change Password */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Change Password</h2>

            <div>
              <label className="block text-sm font-medium">New Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <button
              onClick={handleChangePassword}
              className="mt-4 w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
            >
              Change Password
            </button>
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-white p-6 shadow-lg rounded-lg mt-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-2 text-gray-600">
            {activityLog.length > 0 ? (
              activityLog.map((log, index) => (
                <li key={index} className="p-2 bg-gray-100 rounded-lg">
                  {log}
                </li>
              ))
            ) : (
              <p>No recent activity.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Settings;
