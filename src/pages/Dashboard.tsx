
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import Navbar from "@/components/Navbar";
import { mockBookings } from "@/data/mockData";
import { Booking } from "@/types";

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [bookings, setBookings] = useState<{
    upcoming: Booking[];
    completed: Booking[];
    cancelled: Booking[];
  }>({
    upcoming: [],
    completed: [],
    cancelled: []
  });
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  
  // Load bookings
  useEffect(() => {
    if (user) {
      // Filter mock bookings by status
      const upcoming = mockBookings.filter(booking => booking.status === "upcoming");
      const completed = mockBookings.filter(booking => booking.status === "completed");
      const cancelled = mockBookings.filter(booking => booking.status === "cancelled");
      
      setBookings({ upcoming, completed, cancelled });
    }
  }, [user]);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <>
      <Helmet>
        <title>Dashboard - Swift Ride</title>
        <meta name="description" content="Manage your Swift Ride bookings and view your booking history." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-20 pb-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="border-b border-gray-200 p-6">
                <h1 className="text-2xl font-bold">Your Dashboard</h1>
                <p className="text-gray-600 mt-2">Manage your bookings and view your booking history</p>
              </div>
              
              {/* Dashboard Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                <div className="bg-primary/10 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-600 text-sm">Upcoming Bookings</p>
                      <h3 className="text-2xl font-bold text-primary">{bookings.upcoming.length}</h3>
                    </div>
                    <div className="text-primary text-3xl">
                      <i className="fas fa-calendar-alt"></i>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-100 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-600 text-sm">Completed Trips</p>
                      <h3 className="text-2xl font-bold text-green-600">{bookings.completed.length}</h3>
                    </div>
                    <div className="text-green-600 text-3xl">
                      <i className="fas fa-check-circle"></i>
                    </div>
                  </div>
                </div>
                
                <div className="bg-red-100 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-600 text-sm">Cancelled Bookings</p>
                      <h3 className="text-2xl font-bold text-red-600">{bookings.cancelled.length}</h3>
                    </div>
                    <div className="text-red-600 text-3xl">
                      <i className="fas fa-times-circle"></i>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Booking Tabs */}
              <div className="p-6">
                <div className="border-b border-gray-200 mb-6">
                  <nav className="flex space-x-8">
                    <button
                      className={`pb-4 px-1 ${
                        activeTab === "upcoming"
                          ? "border-b-2 border-primary font-medium text-primary"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => setActiveTab("upcoming")}
                    >
                      Upcoming Bookings
                    </button>
                    <button
                      className={`pb-4 px-1 ${
                        activeTab === "completed"
                          ? "border-b-2 border-primary font-medium text-primary"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => setActiveTab("completed")}
                    >
                      Completed Bookings
                    </button>
                    <button
                      className={`pb-4 px-1 ${
                        activeTab === "cancelled"
                          ? "border-b-2 border-primary font-medium text-primary"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => setActiveTab("cancelled")}
                    >
                      Cancelled Bookings
                    </button>
                  </nav>
                </div>
                
                {/* Booking Cards */}
                <div className="space-y-6">
                  {bookings[activeTab as keyof typeof bookings].length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-5xl text-gray-300 mb-4">
                        <i className={`fas ${
                          activeTab === "upcoming" ? "fa-calendar-alt" :
                          activeTab === "completed" ? "fa-check-circle" : "fa-times-circle"
                        }`}></i>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">No {activeTab} bookings</h3>
                      <p className="text-gray-600 mb-6">
                        {activeTab === "upcoming"
                          ? "You don't have any upcoming bookings."
                          : activeTab === "completed"
                          ? "You haven't completed any bookings yet."
                          : "You don't have any cancelled bookings."}
                      </p>
                      {activeTab === "upcoming" && (
                        <Link to="/cars" className="btn-primary">
                          Book a Vehicle
                        </Link>
                      )}
                    </div>
                  ) : (
                    bookings[activeTab as keyof typeof bookings].map((booking) => (
                      <div key={booking.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row justify-between">
                          <div className="mb-4 md:mb-0">
                            <div className="flex items-center mb-2">
                              <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                                booking.status === "upcoming" ? "bg-primary" :
                                booking.status === "completed" ? "bg-green-500" : "bg-red-500"
                              }`}></span>
                              <h3 className="text-lg font-semibold">{booking.vehicleBrand} {booking.vehicleName}</h3>
                            </div>
                            
                            <div className="space-y-2 text-gray-600">
                              <p>
                                <i className="fas fa-map-marker-alt text-gray-400 mr-2"></i>
                                {booking.pickupLocation} to {booking.dropLocation}
                              </p>
                              <p>
                                <i className="fas fa-calendar-alt text-gray-400 mr-2"></i>
                                {formatDate(booking.pickupDateTime)} - {formatDate(booking.returnDateTime)}
                              </p>
                              <p>
                                <i className="fas fa-clock text-gray-400 mr-2"></i>
                                {booking.rentalPlan === "12hour" ? "12 Hours" : 
                                 booking.rentalPlan === "2day" ? "2 Days" : "3 Days"}
                                {booking.withDriver ? " with driver" : " without driver"}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col justify-between">
                            <div className="text-right">
                              <p className="text-gray-500 text-sm">Total Price</p>
                              <p className="text-xl font-bold text-primary">PKR {booking.totalPrice.toLocaleString()}</p>
                            </div>
                            
                            <div className="mt-4 flex justify-end">
                              {booking.status === "upcoming" && (
                                <button
                                  className="text-red-500 hover:text-red-700 text-sm"
                                  onClick={() => alert("In a real app, this would cancel the booking")}
                                >
                                  <i className="fas fa-times-circle mr-1"></i> Cancel Booking
                                </button>
                              )}
                              {booking.status === "completed" && (
                                <button
                                  className="text-primary hover:text-primary-dark text-sm"
                                  onClick={() => alert("In a real app, this would open a booking receipt")}
                                >
                                  <i className="fas fa-receipt mr-1"></i> View Receipt
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
