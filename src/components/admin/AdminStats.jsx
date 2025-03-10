import React from "react";

const AdminStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total Users */}
      <div className="bg-white p-4 shadow rounded-lg text-center">
        <h3 className="text-lg font-semibold">Total Users</h3>
        <p className="text-3xl font-bold text-blue-600">120</p>
      </div>

      {/* Pending Tasks */}
      <div className="bg-white p-4 shadow rounded-lg text-center">
        <h3 className="text-lg font-semibold">Pending Tasks</h3>
        <p className="text-3xl font-bold text-red-600">25</p>
      </div>

      {/* Completed Tasks */}
      <div className="bg-white p-4 shadow rounded-lg text-center">
        <h3 className="text-lg font-semibold">Completed Tasks</h3>
        <p className="text-3xl font-bold text-green-600">85</p>
      </div>
    </div>
  );
};

export default AdminStats;

