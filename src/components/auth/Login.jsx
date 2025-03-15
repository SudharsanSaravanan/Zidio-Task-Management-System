import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
// import { useLayoutEffect } from "react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");

  // Extract role from state or default to "user"
  const role = location.state?.role;

  // navabar visibility is false
//   useLayoutEffect(() => {
//     setNavbar(false);
// })

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await login(email, password);

  //     // Redirect based on role
  //     if (role === "admin") {
  //       navigate("/admin/dashboard");
  //     } else {
  //       navigate("/user/dashboard");
  //     }
  //   } catch (err) {
  //     setError("Invalid email or password");
  //   }
  // };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
        //console.log("Attempting to log in with:", email, password); // ✅ Debugging step

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password,role}),
        });

        const data = await response.json();
        //console.log("Login Response:", data); // Check what backend is returning

        if (!response.ok) {
            setError(data.message || "Invalid credentials");
            return;
        }

        // Save token in local storage or context
        localStorage.setItem("token", data.token);
      //  console.log("Token stored:", data.token);

        // Redirect based on role
        if (data.role === "admin") {
            navigate("/admin/dashboard");
        } else {
            navigate("/user/dashboard");
        }
    } catch (err) {
      //  console.error("Login error:", err);
        setError("Server error, please try again.");
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          {role === "admin" ? "Admin Login" : "User Login"}
        </h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <div>
            <label className="block text-gray-600 text-sm">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/*login navigates to user and admin dashboard */}
           <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-3">
          <a href="/forgot-password" className="text-blue-500 text-sm hover:underline">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
