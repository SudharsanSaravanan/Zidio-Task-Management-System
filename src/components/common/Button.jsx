import React from "react";

const Button = ({ children, onClick, className, type = "button", disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2 rounded-md font-semibold transition duration-200 ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
