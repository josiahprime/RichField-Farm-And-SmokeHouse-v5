import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DashboardLayout from "../../components/dashboardLayout/DashboardLayout";

const Orders = () => {
  const chartData = [
    { name: "Beverages", Orders: 12 },
    { name: "Snacks", Orders: 19 },
    { name: "Bakery", Orders: 8 },
    { name: "Dairy", Orders: 15 },
    { name: "Fruits", Orders: 10 },
  ];

  return (
    <DashboardLayout>
      <div className="flex">
        <div className="flex-6 w-screen">
          {/* Main Content */}
          <div className="bg-gray-50 min-h-screen p-6">
            <div className="max-w-7xl mx-auto space-y-6">

              {/* Summary Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white shadow rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
                  <p className="text-2xl font-semibold text-gray-800">102</p>
                </div>
                <div className="bg-white shadow rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500">Pending Orders</h3>
                  <p className="text-2xl font-semibold text-yellow-500">12</p>
                </div>
                <div className="bg-white shadow rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500">Delivered Orders</h3>
                  <p className="text-2xl font-semibold text-green-500">78</p>
                </div>
                <div className="bg-white shadow rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500">Canceled Orders</h3>
                  <p className="text-2xl font-semibold text-red-500">8</p>
                </div>
              </div>

              {/* Search and Filter Bar */}
              <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
                <input
                  type="text"
                  placeholder="Search by Order ID or Customer"
                  className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md"
                />
                <select className="p-2 border border-gray-300 rounded-md">
                  <option value="">Filter by Status</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="canceled">Canceled</option>
                </select>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Add New Order
                </button>
              </div>

              {/* Orders Table */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Current Orders</h3>
                <div className="overflow-x-auto">
                  <table className="w-full table-auto border-collapse border border-gray-200">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-200 p-2">Order ID</th>
                        <th className="border border-gray-200 p-2">Customer</th>
                        <th className="border border-gray-200 p-2">Status</th>
                        <th className="border border-gray-200 p-2">Amount</th>
                        <th className="border border-gray-200 p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <tr key={index} className="text-center">
                          <td className="border border-gray-200 p-2">#32474{index}</td>
                          <td className="border border-gray-200 p-2">Customer {index + 1}</td>
                          <td className="border border-gray-200 p-2">
                            {index % 2 === 0 ? (
                              <span className="text-green-600">Completed</span>
                            ) : (
                              <span className="text-yellow-600">Pending</span>
                            )}
                          </td>
                          <td className="border border-gray-200 p-2">$150.{index}</td>
                          <td className="border border-gray-200 p-2">
                            <button className="text-blue-600">Details</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Chart Section */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Order Stats by Category</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="Orders" fill="#4F46E5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Orders;
