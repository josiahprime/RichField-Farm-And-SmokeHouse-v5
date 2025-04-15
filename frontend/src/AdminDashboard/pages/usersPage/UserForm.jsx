import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";

const UserForm = ({ isEdit }) => {
    const navigate = useNavigate();
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-8 bg-gray-50 min-h-screen">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-2xl font-bold mb-6">
              {isEdit ? "Edit User" : "Add New User"}
            </h1>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="flex flex-col">
                <label htmlFor="name" className="text-gray-600 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Enter full name"
                />
              </div>
              {/* Email */}
              <div className="flex flex-col">
                <label htmlFor="email" className="text-gray-600 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Enter email"
                />
              </div>
              {/* Role */}
              <div className="flex flex-col">
                <label htmlFor="role" className="text-gray-600 font-medium">
                  Role
                </label>
                <select
                  id="role"
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
              {/* Phone */}
              <div className="flex flex-col">
                <label htmlFor="phone" className="text-gray-600 font-medium">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Enter phone number"
                />
              </div>
              {/* Password (only for Add User) */}
              {!isEdit && (
                <div className="flex flex-col">
                  <label
                    htmlFor="password"
                    className="text-gray-600 font-medium"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter password"
                  />
                </div>
              )}
              {/* Profile Picture */}
              <div className="flex flex-col">
                <label
                  htmlFor="profilePicture"
                  className="text-gray-600 font-medium"
                >
                  Profile Picture
                </label>
                <input
                  type="file"
                  id="profilePicture"
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
            </form>
            {/* Buttons */}
            <div className="flex justify-end mt-6 space-x-4">
              <button
                type="button"
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
              >
                {isEdit ? "Save Changes" : "Add User"}
              </button>
            </div>
            <button
            type="button"
            onClick={() => navigate("/dashboard/users")}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Back to Users
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
