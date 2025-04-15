import React from "react";
import { AiOutlineMail, AiOutlinePhone, AiOutlineEdit } from "react-icons/ai";
import { useAuthStore } from '../../../store/useAuthStore'
import DashboardLayout from '../../components/dashboardLayout/DashboardLayout'


import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Dummy User Data
const user = {
  name: "josiah prime",
  email: "choujiakimichi02@gmail.com",
  phone: "+1 234 567 890",
  role: "Admin",
  joined: "2023-08-15",
  profilePicture: "/person2.jpg",
  stats: [
    { label: "Total Logins", value: 120 },
    { label: "Projects Managed", value: 35 },
    { label: "Tasks Completed", value: 145 },
  ],
};

// Recharts Data
const taskData = [
  { name: "Completed Tasks", value: 145 },
  { name: "Pending Tasks", value: 30 },
  { name: "Overdue Tasks", value: 15 },
];

const monthlyData = [
  { month: "Jan", projects: 5 },
  { month: "Feb", projects: 8 },
  { month: "Mar", projects: 12 },
  { month: "Apr", projects: 7 },
  { month: "May", projects: 10 },
  { month: "Jun", projects: 15 },
];



const Profile = () => {
  const {authUser} = useAuthStore()
  console.log(authUser)
  return (
    <DashboardLayout>
      <div className="flex">
        <div className="flex-6 w-screen">
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-700 shadow-md text-center py-6 px-4 rounded-2xl bg-white/40 hover:bg-white">
              User Profile
            </h1>

            {/* Profile Header Section */}
            <div className="mt-6 bg-white p-6 rounded-lg shadow-lg border flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
              <img
                src={authUser.profilePic}
                alt="Profile"
                className="w-32 h-32 rounded-full shadow-md object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{authUser.username}</h2>
                <p className="text-gray-600 text-sm mt-2">Role: {authUser.role}</p>
                <p className="text-gray-600 text-sm">Joined: {authUser.createdAt}</p>
                <div className="mt-4 flex items-center space-x-4">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                    <AiOutlineEdit />
                    <span>Edit Profile</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="mt-6 bg-white p-6 rounded-lg shadow-lg border">
              <h2 className="text-xl font-semibold text-gray-600 mb-4">Contact Information</h2>
              <div className="flex flex-col space-y-3">
                <p className="flex items-center space-x-2">
                  <AiOutlineMail className="text-green-500" />
                  <span>{authUser.email}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <AiOutlinePhone className="text-green-500" />
                  <span>{authUser.phone || 'none'}</span>
                </p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {user.stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg border text-center"
                >
                  <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                  <p className="text-gray-600 mt-2">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pie Chart */}
              <div className="bg-white p-6 rounded-lg shadow-lg border">
                <h2 className="text-xl font-semibold text-gray-600 mb-4 text-center">
                  Task Breakdown
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={taskData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      fill="#8884d8"
                    >
                      {taskData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Bar Chart */}
              <div className="bg-white p-6 rounded-lg shadow-lg border">
                <h2 className="text-xl font-semibold text-gray-600 mb-4 text-center">
                  Monthly Projects
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="projects" fill="#82ca9d" />
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

export default Profile;
