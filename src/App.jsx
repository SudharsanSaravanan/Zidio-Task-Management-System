// App.jsx (Main App Component)
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import UserDashboard from "./pages/UserPages/Dashboard";
import ProfilePage from "./pages/UserPages/ProfilePage";
import Dashboard from "./pages/AdminPages/Dashboard";
import Users from "./pages/AdminPages/Users";
import AuthProvider from "./contexts/AuthContext";
import NotificationProvider from "./contexts/NotificationContext";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import ManageUsers from "./pages/AdminPages/ManageUsers";
import ManageTasks from "./pages/AdminPages/ManageTasks";
import Settings from "./pages/AdminPages/Settings";
function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/manage-users" element={<ManageUsers />} />
<Route path="/admin/manage-tasks" element={<ManageTasks />} />
<Route path="/admin/settings" element={<Settings />} />
          </Routes>
          <Footer />
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
