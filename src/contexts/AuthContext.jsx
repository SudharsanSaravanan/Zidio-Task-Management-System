import React, { createContext, useState } from "react";

// Create the authentication context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold user data
  const [user, setUser] = useState(null);

  // Function to log in the user
  const login = (userData) => setUser(userData);

  // Function to log out the user
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
