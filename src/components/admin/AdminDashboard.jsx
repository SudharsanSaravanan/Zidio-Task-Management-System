import React from "react";
import AdminStats from "./AdminStats";
import RecentUsers from "./RecentUsers";
import PendingTasks from "./PendingTasks";
import TaskChart from "./TaskAnalytics";

const AdminDashboard = () => {
  return (
    <div className="flex-1 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* Admin Statistics Section */}
      <AdminStats />

      {/* Grid for Additional Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Recent Users Section */}
        <RecentUsers className="col-span-2" />

        {/* Pending Tasks Section */}
        <PendingTasks />

        {/* Task Completion Chart */}
        <TaskChart />
      </div>
    </div>
  );
};

export default AdminDashboard;


