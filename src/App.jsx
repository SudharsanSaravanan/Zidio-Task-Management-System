// App.jsx (Main App Component)
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import UserDashboard from "./pages/UserPages/Dashboard";
import ProfilePage from "./pages/UserPages/ProfilePage";
import Dashboard from "./pages/AdminPages/Dashboard";
import UserPage from "./pages/UserPages/UserPage";
import Users from "./pages/AdminPages/Users";
import CalendarPage from "./pages/UserPages/CalendarPage";
import AuthProvider from "./contexts/AuthContext";
import NotificationsPage from "./pages/UserPages/NotificationsPage";
import NotificationProvider from "./contexts/NotificationContext";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import ManageUsers from "./pages/AdminPages/ManageUsers";
import ManageTasks from "./pages/AdminPages/ManageTasks";
import Settings from "./pages/AdminPages/Settings";
import ResetPassword from "./components/auth/ResetPassword";
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
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/userpage" element={<UserPage />} /> 
             <Route path="/user/notifications" element={<NotificationsPage />} />
            <Route path="/user/calendar" element={<CalendarPage />} />
            <Route path="/user/profile" element={<ProfilePage />} />
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
