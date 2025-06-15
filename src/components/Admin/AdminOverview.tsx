
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminOverview = () => {
  // Mock statistics
  const stats = [
    { 
      title: "Total Users", 
      value: "8,249", 
      change: "+12%",
      changeType: "increase",
      icon: "fas fa-users"
    },
    { 
      title: "Active Bookings", 
      value: "432", 
      change: "+7%",
      changeType: "increase",
      icon: "fas fa-calendar-check"
    },
    { 
      title: "Total Vehicles", 
      value: "48", 
      change: "+3",
      changeType: "increase",
      icon: "fas fa-car"
    },
    { 
      title: "Monthly Revenue", 
      value: "PKR 1.2M", 
      change: "+18%",
      changeType: "increase",
      icon: "fas fa-money-bill-wave"
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
                <div className={`p-2 rounded-full ${
                  stat.title === "Total Users" ? "bg-blue-100 text-blue-600" :
                  stat.title === "Active Bookings" ? "bg-green-100 text-green-600" :
                  stat.title === "Total Vehicles" ? "bg-purple-100 text-purple-600" :
                  "bg-amber-100 text-amber-600"
                }`}>
                  <i className={stat.icon}></i>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs flex items-center ${
                stat.changeType === "increase" ? "text-green-600" : "text-red-600"
              }`}>
                <i className={`fas fa-${stat.changeType === "increase" ? "arrow-up" : "arrow-down"} mr-1`}></i>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                      <i className="fas fa-user text-gray-600"></i>
                    </div>
                    <div>
                      <div className="font-medium">User #{10051 + index}</div>
                      <div className="text-xs text-gray-500">Toyota Corolla • 2 Days</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">PKR 15,000</div>
                    <div className="text-xs text-gray-500">2 hours ago</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full text-center text-primary text-sm mt-4 hover:underline">
              View All Bookings
            </button>
          </CardContent>
        </Card>
        
        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Server Uptime</span>
                  <span className="text-sm font-medium">99.9%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "99.9%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Payment Processing</span>
                  <span className="text-sm font-medium">Normal</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "100%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">User Registrations</span>
                  <span className="text-sm font-medium">+25% this week</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Storage Usage</span>
                  <span className="text-sm font-medium">62%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "62%" }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 text-blue-700 text-sm rounded-md">
              <div className="flex items-center">
                <i className="fas fa-info-circle mr-2"></i>
                <span>System maintenance scheduled for May 25, 2025 at 02:00 AM</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
