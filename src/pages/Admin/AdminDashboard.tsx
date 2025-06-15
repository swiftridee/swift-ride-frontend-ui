
import { useState } from "react";
import { Helmet } from "react-helmet";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import AdminHeader from "@/components/Admin/AdminHeader";
import AdminOverview from "@/components/Admin/AdminOverview";
import AdminUsers from "@/components/Admin/AdminUsers";
import AdminBookings from "@/components/Admin/AdminBookings";
import AdminVehicles from "@/components/Admin/AdminVehicles";

type AdminView = "overview" | "users" | "bookings" | "vehicles";

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState<AdminView>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Toggle sidebar for mobile view
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Content based on active view
  const renderContent = () => {
    switch (activeView) {
      case "overview":
        return <AdminOverview />;
      case "users":
        return <AdminUsers />;
      case "bookings":
        return <AdminBookings />;
      case "vehicles":
        return <AdminVehicles />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Swift Ride</title>
        <meta name="description" content="Admin dashboard for Swift Ride vehicle rental system" />
      </Helmet>

      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <AdminSidebar
          activeView={activeView}
          setActiveView={setActiveView}
          isOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <AdminHeader toggleSidebar={toggleSidebar} />
          
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
