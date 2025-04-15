import { useState, useRef, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { MdEdit, MdOutlineLogout, MdSettings, MdFavoriteBorder, MdShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

const ProfileSwitcher = () => {
  const { authUser, updateProfile, isUpdatingProfile, logout } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);

  console.log(authUser)

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={toggleDropdown}
        className="relative flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-all shadow-lg bg-white dark:bg-gray-800 dark:border-gray-600"
      >
        {authUser?.profilePic ? (
          <img
            src={selectedImg || authUser.profilePic}
            alt="User"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <FaUserCircle className="text-4xl text-gray-500 dark:text-gray-400" />
        )}
      </button>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleImageUpload}
      />

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-2xl rounded-xl overflow-hidden transform transition-all duration-200 scale-100 animate-fadeIn backdrop-blur-lg bg-opacity-90">
          {/* Profile Section */}
          <div className="flex flex-col items-center justify-center p-5 border-b border-gray-200 dark:border-gray-700 relative">
            {/* Profile Picture with Edit Icon */}
            <div className="relative w-16 h-16">
              {authUser?.profilePic ? (
                <img
                  src={authUser.profilePic}
                  alt="User"
                  className="w-full h-full rounded-full border-2 border-gray-300 shadow-md"
                />
              ) : (
                <FaUserCircle className="text-5xl text-gray-500 dark:text-gray-400 w-full h-full" />
              )}
              {/* Edit Icon inside the profile picture */}
              <button
                className="absolute bottom-0 right-0 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 p-1 rounded-full shadow-md transition"
                onClick={() => fileInputRef.current.click()} // Click hidden input
                disabled={isUpdatingProfile} // Disable while updating
              >
                <MdEdit className={`text-gray-600 dark:text-gray-300 text-sm ${isUpdatingProfile && 'opacity-50 cursor-not-allowed'}`} />
              </button>
            </div>
            {/* Greeting Text */}
            <p className="mt-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
              Hi, {authUser?.username || 'Guest User'}!
            </p>
          </div>

          {/* Menu Items */}
          <ul className="flex flex-col py-2">
            <MenuItem to="/profile" icon={<FaUserCircle />} text="Profile" />
            <MenuItem to="/orders" icon={<MdShoppingCart />} text="Orders" />
            <MenuItem to="/wishlist" icon={<MdFavoriteBorder />} text="Wishlist" />
            <MenuItem to="/settings" icon={<MdSettings />} text="Settings" />
            <button
              onClick={logout}
              className="flex items-center gap-3 w-full px-5 py-3 text-left hover:bg-red-500 hover:text-white transition-all"
            >
              <MdOutlineLogout className="text-xl" />
              Logout
            </button>
          </ul>
        </div>
      )}
    </div>
  );
};

// Menu Item Component
const MenuItem = ({ to, icon, text }) => (
  <Link
    to={to}
    className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
  >
    <span className="text-xl">{icon}</span>
    {text}
  </Link>
);

export default ProfileSwitcher;
