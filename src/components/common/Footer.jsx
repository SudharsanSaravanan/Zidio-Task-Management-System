import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation(); 

  return (
    <footer className="bg-black p-1 text-white text-center border-t-2 border-gray-700">
      <div className="mb-4">
        {/* Social Media Links */}
        {location.pathname === "/" && (
          <div className="flex justify-center gap-6 mb-4">
            <a
              href="#"
              className="text-white hover:text-purple-500 transition duration-300 transform hover:scale-90"
            >
              <i className="fab fa-facebook-f text-xl"></i>
            </a>
            <a
              href="#"
              className="text-white hover:text-purple-500 transition duration-300 transform hover:scale-90"
            >
              <i className="fab fa-linkedin-in text-xl"></i>
            </a>
            <a
              href="mailto:someone@example.com"
              className="text-white hover:text-purple-500 transition duration-300 transform hover:scale-90"
            >
              <i className="fas fa-envelope text-xl"></i>
            </a>
            <a
              href="#"
              className="text-white hover:text-purple-500 transition duration-300 transform hover:scale-90"
            >
              <i className="fab fa-instagram text-xl"></i>
            </a>
          </div>
        )}
        {/* Footer Text */}
        <p className="text-md">
          &copy; 2025 TaskFlow | All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
