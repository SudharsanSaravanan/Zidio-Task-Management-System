// App.jsx (Main App Component)
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/UserPages/Dashboard";
import ProfilePage from "./pages/UserPages/ProfilePage";
import AdminDashboard from "./pages/AdminPages/Dashboard";
import Users from "./pages/AdminPages/Users";
import AuthProvider from "./contexts/AuthContext";
import NotificationProvider from "./contexts/NotificationContext";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<Users />} />
          </Routes>
          <Footer />
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;