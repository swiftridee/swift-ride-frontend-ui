
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

// Mock vehicles data
const VEHICLES_DATA = [
  { 
    id: "V-1001", 
    name: "Toyota Corolla", 
    type: "Car", 
    location: "Islamabad", 
    seating: 5, 
    pricePerDay: 5000, 
    status: "Available" 
  },
  { 
    id: "V-1002", 
    name: "Honda Civic", 
    type: "Car", 
    location: "Lahore", 
    seating: 5, 
    pricePerDay: 5500, 
    status: "Booked" 
  },
  { 
    id: "V-1003", 
    name: "Toyota Hiace", 
    type: "Coaster", 
    location: "Karachi", 
    seating: 14, 
    pricePerDay: 12000, 
    status: "Available" 
  },
  { 
    id: "V-1004", 
    name: "Yutong ZK6122H9", 
    type: "Bus", 
    location: "Islamabad", 
    seating: 55, 
    pricePerDay: 25000, 
    status: "Available" 
  },
  { 
    id: "V-1005", 
    name: "BMW 5 Series", 
    type: "Car", 
    location: "Lahore", 
    seating: 5, 
    pricePerDay: 15000, 
    status: "Maintenance" 
  },
  { 
    id: "V-1006", 
    name: "Hino RK8J", 
    type: "Bus", 
    location: "Karachi", 
    seating: 60, 
    pricePerDay: 28000, 
    status: "Booked" 
  },
  { 
    id: "V-1007", 
    name: "Toyota Coaster", 
    type: "Coaster", 
    location: "Islamabad", 
    seating: 22, 
    pricePerDay: 14000, 
    status: "Available" 
  },
];

const AdminVehicles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Filter vehicles based on search and filters
  const filteredVehicles = VEHICLES_DATA.filter(vehicle => {
    const matchesSearch = 
      vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === "all" || vehicle.type.toLowerCase() === selectedType.toLowerCase();
    const matchesStatus = selectedStatus === "all" || vehicle.status.toLowerCase() === selectedStatus.toLowerCase();
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Vehicles</h2>
        <button className="btn-primary flex items-center">
          <i className="fas fa-plus mr-2"></i> Add Vehicle
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search vehicles..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <i className="fas fa-search text-gray-400"></i>
            </div>
          </div>
          
          {/* Type filter */}
          <div className="relative">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
            >
              <option value="all">All Types</option>
              <option value="car">Car</option>
              <option value="bus">Bus</option>
              <option value="minibus">Mini Bus</option>
              <option value="coaster">Coaster</option>
            </select>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <i className="fas fa-car text-gray-400"></i>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <i className="fas fa-chevron-down text-gray-400 text-xs"></i>
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
              <option value="available">Available</option>
              <option value="booked">Booked</option>
              <option value="maintenance">Maintenance</option>
            </select>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <i className="fas fa-circle text-gray-400 text-xs"></i>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <i className="fas fa-chevron-down text-gray-400 text-xs"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicles Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Seating</TableHead>
              <TableHead>Price/Day</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVehicles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  No vehicles found matching your criteria
                </TableCell>
              </TableRow>
            ) : (
              filteredVehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell className="font-medium">{vehicle.id}</TableCell>
                  <TableCell>{vehicle.name}</TableCell>
                  <TableCell>{vehicle.type}</TableCell>
                  <TableCell>{vehicle.location}</TableCell>
                  <TableCell>{vehicle.seating}</TableCell>
                  <TableCell>PKR {vehicle.pricePerDay.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      vehicle.status === "Available" ? "bg-green-100 text-green-700" :
                      vehicle.status === "Booked" ? "bg-blue-100 text-blue-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {vehicle.status}
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
                        <DropdownMenuItem className="cursor-pointer text-yellow-600">
                          <i className="fas fa-tools mr-2"></i> Mark for Maintenance
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-red-600">
                          <i className="fas fa-trash-alt mr-2"></i> Remove
                        </DropdownMenuItem>
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
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredVehicles.length}</span> of{" "}
            <span className="font-medium">{VEHICLES_DATA.length}</span> vehicles
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

export default AdminVehicles;
