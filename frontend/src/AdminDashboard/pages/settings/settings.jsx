import React, { useState } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DashboardLayout from '../../components/dashboardLayout/DashboardLayout';

const SettingsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [language, setLanguage] = useState('English');

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggle2FA = () => setIs2FAEnabled(!is2FAEnabled);

  return (
    <DashboardLayout>
      <div className='flex'>
        <div className="flex-6 w-screen">
          <div className="min-h-screen flex items-center justify-center">
            <div className=" rounded-lg w-3/4">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold mb-6">Settings</h2>
              </div>

              {/* My Account Section */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold mb-4">My Account</h2>
                <div className="space-y-4">
                  {/* Username */}
                  <div className="flex items-center justify-between">
                    <div className="w-1/2">
                      <label className="block text-gray-600 text-sm font-medium mb-1">Username</label>
                      <input
                        type="text"
                        value="Moqups"
                        disabled
                        className="bg-gray-100 border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700"
                      />
                    </div>
                    <button className="bg-gray-800 text-white px-4 py-2 rounded-lg">Edit</button>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-gray-600 text-sm font-medium mb-1">Email Address</label>
                    <input
                      type="email"
                      value="contact@moqups.com"
                      disabled
                      className="bg-gray-100 border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700"
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-gray-600 text-sm font-medium mb-1">Role</label>
                    <input
                      type="text"
                      value="Product Manager"
                      disabled
                      className="bg-gray-100 border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700"
                    />
                  </div>

                  {/* Change Password */}
                  <button className="bg-gray-800 text-white px-4 py-2 rounded-lg w-full">Change Password</button>

                  {/* Two-Factor Authentication */}
                  <div>
                    <h3 className="text-gray-700 font-medium mb-2">Two-Factor Authentication</h3>
                    <p className="text-gray-500 text-sm mb-4">
                      Enable Two-Factor Authentication to add an extra layer of security to your account.
                    </p>
                    <button className="bg-gray-800 text-white px-4 py-2 rounded-lg">Enable 2FA</button>
                  </div>
                </div>
              </div>

              {/* Appearance Section */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold mb-4">Appearance</h2>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">Dark Mode</span>
                  <button
                    onClick={toggleDarkMode}
                    className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                  >
                    {isDarkMode ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
              </div>

              {/* Privacy & Safety Section */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold mb-4">Privacy & Safety</h2>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">Two-Factor Authentication</span>
                  <button
                    onClick={toggle2FA}
                    className={`px-4 py-2 rounded-lg ${is2FAEnabled ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                  >
                    {is2FAEnabled ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
              </div>

              {/* Language Section */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold mb-4">Language</h2>
                <div className="mb-4">
                  <label className="block text-gray-600 font-medium mb-2">Select Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg p-2"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                  </select>
                </div>
              </div>

              {/* Notifications Section */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold mb-4">Notifications</h2>
                <p className="text-gray-500">
                  Configure how you want to receive notifications from the platform.
                </p>
              </div>

              {/* Billing Section */}
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Billing</h2>
                <p className="text-gray-500">
                  Manage your subscription and payment methods here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
);
};

export default SettingsPage;
