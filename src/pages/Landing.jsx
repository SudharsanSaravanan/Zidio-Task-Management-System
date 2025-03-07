import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900">Welcome to TaskFlow</h1>
      <p className="mt-4 text-gray-600">Manage your tasks efficiently with ease.</p>
      <div className="mt-6 space-x-4">
        <Link to="/signup" className="px-6 py-2 bg-blue-500 text-white rounded-lg">Sign Up</Link>
        <Link to="/login" className="px-6 py-2 bg-gray-500 text-white rounded-lg">Log In</Link>
      </div>
    </div>
  );
};

export default Landing;
