import React from "react";

const RecentUsers = () => {
  const users = [
    { name: "Alice Johnson", email: "alice@example.com", date: "2025-03-10" },
    { name: "Bob Smith", email: "bob@example.com", date: "2025-03-09" },
    { name: "Charlie Brown", email: "charlie@example.com", date: "2025-03-08" },
  ];

  return (
    <div className="bg-white p-4 shadow rounded-lg col-span-2">
      <h3 className="text-xl font-semibold mb-4">Recent Users</h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left border border-gray-200">Name</th>
              <th className="p-2 text-left border border-gray-200">Email</th>
              <th className="p-2 text-left border border-gray-200">Date</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-2 border border-gray-200">{user.name}</td>
                <td className="p-2 border border-gray-200">{user.email}</td>
                <td className="p-2 border border-gray-200">{user.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentUsers;
