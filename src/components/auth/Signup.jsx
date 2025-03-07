import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    try {
      await register(name, email, password);
      alert("Account created successfully!");
      navigate("/dashboard");
    } catch (err) {
      alert("Failed to create an account. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-gray-900 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <input 
            type="text" placeholder="Full Name" required 
            className="w-full p-2 border rounded"
            value={name} onChange={(e) => setName(e.target.value)}
          />
          <input 
            type="email" placeholder="Email Address" required 
            className="w-full p-2 border rounded"
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" placeholder="Password" required 
            className="w-full p-2 border rounded"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
          <input 
            type="password" placeholder="Confirm Password" required 
            className="w-full p-2 border rounded"
            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Sign Up</button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-600">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
