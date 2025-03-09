import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/"); // Redirect to Landing Page after logout
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center shadow-lg">
      {/* Landing Page Link */}
      <Link to="/" className="text-2xl font-semibold tracking-wide hover:opacity-90 transition">
        TaskFlow.
      </Link>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-white text-blue-600 font-medium px-5 py-2 rounded-lg 
                   hover:bg-blue-700 hover:text-white transition-all shadow-md 
                   hover:shadow-lg focus:outline-none"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
