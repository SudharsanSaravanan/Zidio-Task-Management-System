import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract token from URL
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  
  // Extract role from state or default to "user"
  const role = location.state?.role || "user";

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://zidio-task-management-backend.onrender.com/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Password reset successful! Please log in.");
      } else {
        setError(data.message || "Failed to reset password.");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Set a New Password</h2>
        
        {message && (
          <div className="text-green-500 text-sm text-center">
            {message}
            <div className="flex justify-center gap-4 mt-3">
              <button
                onClick={() => navigate("/login", { state: { role: "user" } })}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                User Login
              </button>
              <button
                onClick={() => navigate("/login", { state: { role: "admin" } })}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Admin Login
              </button>
            </div>
          </div>
        )}
        
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm">New Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm">Confirm Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
