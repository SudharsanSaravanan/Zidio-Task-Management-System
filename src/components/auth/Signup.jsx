import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const role = location.state?.role || "user";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("https://zidio-task-management-backend.onrender.com/api/auth/register", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: role,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate(role === "admin" ? "/admin/dashboard" : "/user/dashboard");
      } else {
        setError("Failed to receive token. Try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create an account. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          {role === "admin" ? "Admin Signup" : "User Signup"}
        </h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <div className="text-center mt-3">
          <p className="text-sm text-gray-600">
            Already have an account? {" "}
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => navigate("/login", { state: { role } })}
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;