import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col">
      {/* Hero Section */}
      <div className="relative pt-24 pb-20 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl md:text-7xl leading-tight animate-fade-in-up">
          <span className="block">Welcome to</span>
          <span className="block text-blue-600">TaskFlow</span>
        </h1>
        <p className="mt-5 max-w-2xl mx-auto text-lg text-gray-600 sm:text-xl">
          Boost productivity, streamline workflow, and collaborate in real-time.
        </p>
      </div>

      {/* Role Selection Section */}
      <div className="py-16 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900">Choose Your Role</h2>
        <p className="mt-3 text-center text-gray-600 max-w-2xl mx-auto">
          Select how you'd like to use TaskFlow to get started.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
          {["user", "admin"].map((role) => (
            <div
              key={role}
              className="bg-white shadow-lg rounded-lg p-8 text-center hover:shadow-2xl transition-transform transform hover:-translate-y-2"
            >
              <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full ${role === "user" ? "bg-blue-100" : "bg-indigo-100"}`}>
                <svg className="h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={role === "user" ? "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" : "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"}/>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 capitalize mt-5">{role === "user" ? "Team Member" : "Administrator"}</h3>
              <p className="mt-3 text-gray-600">
                {role === "user"
                  ? "Create tasks, track progress, and collaborate with your team."
                  : "Manage users, verify tasks, and oversee team operations."}
              </p>
              <div className="mt-6 space-y-4">
                <button
                  onClick={() => navigate("/signup", { state: { role } })}
                  className="w-full py-3 text-white text-lg font-medium rounded-md shadow-md bg-blue-600 hover:bg-blue-700 transition"
                >
                  Sign Up as {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
                <button
                  onClick={() => navigate("/login", { state: { role } })}
                  className="w-full py-3 border border-gray-300 text-gray-700 text-lg font-medium rounded-md shadow-md hover:bg-gray-100 transition"
                >
                  Log In as {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Features that power your productivity</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage tasks effectively.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              { title: "Task Management", description: "Create, organize, and prioritize tasks efficiently." },
              { title: "Time Tracking", description: "Monitor task time and boost productivity." },
              { title: "Team Collaboration", description: "Work together seamlessly on shared projects." },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;