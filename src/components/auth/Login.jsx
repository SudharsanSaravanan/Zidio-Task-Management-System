import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  
  const role = location.state?.role;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, role }),
        });

        const data = await response.json();
        if (!response.ok) {
            setError(data.message || "Invalid credentials");
            return;
        }

        localStorage.setItem("token", data.token);

        if (data.role === "admin") {
            navigate("/admin/dashboard");
        } else {
            navigate("/user/dashboard");
        }
    } catch (err) {
        setError("Server error, please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md transform transition duration-300 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {role === "admin" ? "Admin Login" : "User Login"}
        </h2>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-md hover:opacity-90 transition duration-200 shadow-md"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <span
            className="text-blue-600 text-sm hover:underline cursor-pointer"
            onClick={() => navigate("/forgot-password", { state: { role } })}
          >
            Forgot Password?
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;