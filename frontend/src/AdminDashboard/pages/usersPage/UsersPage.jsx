import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/dashboardLayout/DashboardLayout";

const UsersPage = () => {
  const navigate = useNavigate();

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      status: "Active",
      joined: "2025-01-20",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Editor",
      status: "Inactive",
      joined: "2024-12-15",
    },
    {
      id: 3,
      name: "David Brown",
      email: "david.brown@example.com",
      role: "Viewer",
      status: "Active",
      joined: "2023-09-10",
    },
  ];

  return (
    <DashboardLayout>
      {/* Header Section */}
      <h1 className="text-2xl font-semibold text-gray-800">Users</h1>
      <p className="text-gray-600 text-sm">
        Manage all users of the system. Add, edit, or deactivate user accounts.
      </p>

      {/* Users Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden mt-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Joined
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.role}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.joined}</td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <button className="text-blue-600 hover:underline mr-3">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Button */}
      <div className="mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
          onClick={() => navigate("/dashboard/users/addUser")}
        >
          Add User
        </button>
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;
