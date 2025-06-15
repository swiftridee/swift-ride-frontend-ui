
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// Mock bookings data
const BOOKINGS_DATA = [
  { 
    id: "B-10584", 
    user: "Alice Johnson", 
    vehicle: "Toyota Corolla", 
    date: "May 15, 2025", 
    amount: 12500, 
    status: "Confirmed" 
  },
  { 
    id: "B-10583", 
    user: "Bob Smith", 
    vehicle: "Honda City", 
    date: "May 14, 2025", 
    amount: 9800, 
    status: "Pending" 
  },
  { 
    id: "B-10582", 
    user: "Carol Williams", 
    vehicle: "Toyota Hiace", 
    date: "May 12, 2025", 
    amount: 28000, 
    status: "Completed" 
  },
  { 
    id: "B-10581", 
    user: "Dave Brown", 
    vehicle: "Suzuki APV", 
    date: "May 10, 2025", 
    amount: 15000, 
    status: "Cancelled" 
  },
  { 
    id: "B-10580", 
    user: "Eve Davis", 
    vehicle: "Yutong Bus", 
    date: "May 8, 2025", 
    amount: 65000, 
    status: "Confirmed" 
  },
  { 
    id: "B-10579", 
    user: "Frank Miller", 
    vehicle: "BMW 5 Series", 
    date: "May 5, 2025", 
    amount: 32000, 
    status: "Completed" 
  },
  { 
    id: "B-10578", 
    user: "Grace Wilson", 
    vehicle: "Audi A4", 
    date: "May 3, 2025", 
    amount: 28500, 
    status: "Completed" 
  },
];

const AdminBookings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Filter bookings based on search and filters
  const filteredBookings = BOOKINGS_DATA.filter(booking => {
    const matchesSearch = 
      booking.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || booking.status.toLowerCase() === selectedStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Bookings</h2>
        <button className="btn-primary flex items-center">
          <i className="fas fa-plus mr-2"></i> Add Booking
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search bookings..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <i className="fas fa-search text-gray-400"></i>
            </div>
          </div>
          
          {/* Status filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <i className="fas fa-filter text-gray-400"></i>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <i className="fas fa-chevron-down text-gray-400 text-xs"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No bookings found matching your criteria
                </TableCell>
              </TableRow>
            ) : (
              filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>{booking.user}</TableCell>
                  <TableCell>{booking.vehicle}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>PKR {booking.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      booking.status === "Confirmed" ? "bg-blue-100 text-blue-700" :
                      booking.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                      booking.status === "Completed" ? "bg-green-100 text-green-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {booking.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="p-2 hover:bg-gray-100 rounded">
                        <i className="fas fa-ellipsis-v"></i>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer">
                          <i className="fas fa-eye mr-2"></i> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <i className="fas fa-edit mr-2"></i> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <i className="fas fa-receipt mr-2"></i> Generate Invoice
                        </DropdownMenuItem>
                        {booking.status !== "Completed" && booking.status !== "Cancelled" && (
                          <DropdownMenuItem className="cursor-pointer text-green-600">
                            <i className="fas fa-check-circle mr-2"></i> Mark as Completed
                          </DropdownMenuItem>
                        )}
                        {booking.status !== "Cancelled" && (
                          <DropdownMenuItem className="cursor-pointer text-red-600">
                            <i className="fas fa-times-circle mr-2"></i> Cancel Booking
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        
        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredBookings.length}</span> of{" "}
            <span className="font-medium">{BOOKINGS_DATA.length}</span> bookings
          </div>
          <div className="flex space-x-1">
            <button className="px-3 py-1 border rounded text-sm disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 border rounded bg-primary text-white text-sm">
              1
            </button>
            <button className="px-3 py-1 border rounded text-sm">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
