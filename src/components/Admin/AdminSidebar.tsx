
import { Link } from "react-router-dom";

interface AdminSidebarProps {
  activeView: string;
  setActiveView: (view: "overview" | "users" | "bookings" | "vehicles") => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const AdminSidebar = ({ activeView, setActiveView, isOpen, toggleSidebar }: AdminSidebarProps) => {
  // Sidebar navigation items
  const navItems = [
    { id: "overview", label: "Dashboard Overview", icon: "fas fa-tachometer-alt" },
    { id: "users", label: "Manage Users", icon: "fas fa-users" },
    { id: "bookings", label: "Manage Bookings", icon: "fas fa-calendar-check" },
    { id: "vehicles", label: "Manage Vehicles", icon: "fas fa-car" }
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      <div 
        className={`fixed inset-0 z-20 transition-opacity ease-linear duration-300 ${
          isOpen ? "opacity-100 block" : "opacity-0 hidden"
        } lg:hidden`}
        onClick={toggleSidebar}
      >
        <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-primary transition duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-0 lg:z-auto`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between h-16 px-6 bg-primary-dark">
          <div className="flex items-center">
            <span className="text-xl font-bold text-white">SwiftRide Admin</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none lg:hidden"
          >
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        {/* Sidebar content */}
        <div className="h-0 flex-1 flex flex-col overflow-y-auto">
          {/* Admin info */}
          <div className="flex items-center px-4 py-6 border-b border-primary-dark">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <i className="fas fa-user-shield text-primary"></i>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Admin</p>
              <p className="text-xs text-white/70">System Administrator</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-6 px-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id as any)}
                className={`flex items-center px-4 py-3 text-sm w-full rounded-md ${
                  activeView === item.id
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <i className={`${item.icon} w-5 h-5 mr-3`}></i>
                {item.label}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="px-3 mt-6">
            <Link
              to="/"
              className="flex items-center px-4 py-3 text-sm w-full rounded-md text-white/70 hover:bg-white/10 hover:text-white"
            >
              <i className="fas fa-sign-out-alt w-5 h-5 mr-3"></i>
              Back to Site
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
