import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract role from state or default to "user"
  const role = location.state?.role || "user";

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("https://zidio-task-management-backend.onrender.com/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }), // Include role in the request
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Reset link sent successfully. Check your email.");
        setTimeout(() => navigate("/login", { state: { role } }), 3000);
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-500">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          {role === "admin" ? "Admin Password Recovery" : "Reset Your Password"}
        </h2>
        {message && <p className="text-green-500 text-sm text-center">{message}</p>}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <div className="text-center mt-3">
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate("/login", { state: { role } })}
          >
            Log in
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;