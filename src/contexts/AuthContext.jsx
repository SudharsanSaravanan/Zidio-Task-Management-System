import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signup = (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser({ email });
        localStorage.setItem("user", JSON.stringify({ email }));
        resolve();
      }, 1000);
    });
  };

  const login = (email) => {
    setUser({ email });
    localStorage.setItem("user", JSON.stringify({ email }));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
