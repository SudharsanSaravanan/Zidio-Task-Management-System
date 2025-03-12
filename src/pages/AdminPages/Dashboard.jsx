import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import AdminStats from "../../components/admin/AdminStats"; 
import RecentUsers from "../../components/admin/RecentUsers";
import PendingTasks from "../../components/admin/PendingTasks";
import TaskChart from "../../components/admin/TaskAnalytics"; 

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>

        {/* Admin Statistics */}
        <AdminStats />

        {/* Dashboard Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <RecentUsers className="col-span-2" />
          <PendingTasks />
          <TaskChart />
        </div>

        {/* Recent Activity Section */}
        <div className="mt-6 bg-white p-4 shadow rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Recent Activity</h3>
          <p className="text-gray-600">No recent updates...</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
