import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const hideProfileRoutes = ["/", "/login", "/signup"]; 

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [userProfile, setUserProfile] = useState({ name: "User", profilePic: "" });

  useEffect(() => {
    // Fetch user profile from localStorage
    const storedProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (storedProfile) {
      setUserProfile({
        name: storedProfile.name || "User",
        profilePic: storedProfile.profilePic || "",
      });
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setTimeout(() => {
      navigate(userProfile.name !== "User" ? "user/dashboard" : "/");
    }, 350); 
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-blue-600 text-white px-5 py-4 flex justify-between items-center shadow-lg">
      {/* Logo with Image & Text */}
      <Link 
  to={userProfile.name !== "user" ? "user/dashboard" : "/"} 
  onClick={handleLogoClick}
  className="flex items-center text-3xl font-bold tracking-wide hover:opacity-70 transition">
        <img src="/app_icon.png" alt="TaskFlow Logo" className="w-12 h-12 rounded-full mr-2" /> 
        TaskFlow
      </Link>

      <div className="flex items-center gap-4">
        {/* Profile Button (Hidden on Landing/Login/Signup) */}
        {!hideProfileRoutes.includes(location.pathname) && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center bg-white text-blue-600 font-medium px-4 py-2 rounded-lg shadow-md 
                         hover:bg-blue-700 hover:text-white transition-all focus:outline-none"
            >
              {userProfile.profilePic ? (
                <img
                  src={userProfile.profilePic}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover mr-2"
                />
              ) : (
                <FaUserCircle className="text-2xl mr-2" />
              )}
              <span>{userProfile.name}</span> {/* Display user's name */}
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg overflow-hidden">
                <ul className="text-gray-700">
                  <li>
                    <Link
                      to="/user/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
