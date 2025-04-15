import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { 
  MdDashboard, MdOutlinePerson, MdOutlineLocalShipping, MdCreditCard, MdStore, MdInsertChart, 
  MdOutlineSettingsApplications, MdExitToApp, MdNotificationsNone, MdOutlineAccountCircle 
} from "react-icons/md";
import { RiSettings3Line, RiFileList3Line } from "react-icons/ri";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="flex flex-col bg-white shadow-lg w-40 p-2 h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="flex items-center justify-center mb-2">
        <Link to="/" className="uppercase text-xl font-bold">
          Rich<span className="text-green-500">Field</span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="pl-2 flex-grow">
        <ul className="list-none m-0 p-0 space-y-1">
          <SidebarSection title="MAIN" />
          <SidebarItem to="/dashboard" icon={<MdDashboard />} label="Dashboard" />

          <SidebarSection title="LISTS" />
          <SidebarItem to="/dashboard/users" icon={<MdOutlinePerson />} label="Users" />
          <SidebarItem to="/dashboard/products" icon={<MdStore />} label="Products" />
          <SidebarItem to="/dashboard/orders" icon={<MdCreditCard />} label="Orders" />
          <SidebarItem to="/dashboard/delivery" icon={<MdOutlineLocalShipping />} label="Delivery" />

          <SidebarSection title="USEFUL" />
          <SidebarItem to="/dashboard/stats" icon={<MdInsertChart />} label="Stats" />
          <SidebarItem to="/dashboard/notifications" icon={<MdNotificationsNone />} label="Notifications" />

          <SidebarSection title="SERVICE" />
          <SidebarItem to="/dashboard/systemHealth" icon={<RiSettings3Line />} label="System Health" />
          <SidebarItem to="/dashboard/logs" icon={<RiFileList3Line />} label="Logs" />
          <SidebarItem to="/dashboard/settings" icon={<MdOutlineSettingsApplications />} label="Settings" />

          <SidebarSection title="USER" />
          <SidebarItem to="/dashboard/profile" icon={<MdOutlineAccountCircle />} label="Profile" />
          <SidebarItem to="/dashboard/logout" icon={<MdExitToApp />} label="Logout" />
        </ul>

        {/* Dark Mode Toggle */}
        <div className="flex items-center p-2 mt-4">
          <div
            className="w-5 h-5 rounded-sm border border-indigo-600 cursor-pointer bg-gray-200"
            onClick={() => dispatch({ type: "LIGHT" })}
          ></div>
          <div
            className="w-5 h-5 rounded-sm border border-indigo-600 cursor-pointer mx-1 bg-gray-800"
            onClick={() => dispatch({ type: "DARK" })}
          ></div>
        </div>
      </div>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ to, icon, label }) => (
  <Link to={to} className="flex items-center p-1 cursor-pointer hover:bg-indigo-50 rounded-md">
    <span className="text-green-500 text-lg">{icon}</span>
    <span className="ml-2 text-sm font-semibold text-gray-700">{label}</span>
  </Link>
);

// Sidebar Section Title
const SidebarSection = ({ title }) => (
  <p className="text-xs font-bold text-gray-500 mt-1 mb-1">{title}</p>
);

export default Sidebar;
