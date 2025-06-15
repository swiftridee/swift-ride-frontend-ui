
import { useState } from "react";
import { Link } from "react-router-dom";

interface AdminHeaderProps {
  toggleSidebar: () => void;
}

const AdminHeader = ({ toggleSidebar }: AdminHeaderProps) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* Hamburger menu */}
            <button
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-gray-700 focus:outline-none lg:hidden"
            >
              <i className="fas fa-bars text-lg"></i>
            </button>
            
            {/* Page title */}
            <h1 className="ml-4 text-xl font-medium text-gray-800">Admin Dashboard</h1>
          </div>
          
          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="p-1 text-gray-400 hover:text-gray-500 focus:outline-none">
              <span className="sr-only">View notifications</span>
              <div className="relative">
                <i className="fas fa-bell text-lg"></i>
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white w-4 h-4 flex items-center justify-center rounded-full">3</span>
              </div>
            </button>
            
            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                  <i className="fas fa-user-shield text-sm"></i>
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin User</span>
                <i className="fas fa-chevron-down text-xs text-gray-500"></i>
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Your Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Settings
                  </Link>
                  <Link
                    to="/"
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Sign out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
