
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

// Mock user data
const USERS_DATA = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Customer", status: "Active", joined: "Jan 15, 2024" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Customer", status: "Inactive", joined: "Mar 3, 2024" },
  { id: 3, name: "Carol Williams", email: "carol@example.com", role: "Customer", status: "Active", joined: "Feb 22, 2024" },
  { id: 4, name: "Dave Brown", email: "dave@example.com", role: "Admin", status: "Active", joined: "Dec 10, 2023" },
  { id: 5, name: "Eve Davis", email: "eve@example.com", role: "Customer", status: "Active", joined: "Apr 5, 2024" },
  { id: 6, name: "Frank Miller", email: "frank@example.com", role: "Customer", status: "Blocked", joined: "Jan 30, 2024" },
  { id: 7, name: "Grace Wilson", email: "grace@example.com", role: "Customer", status: "Active", joined: "Mar 18, 2024" },
  { id: 8, name: "Hank Moore", email: "hank@example.com", role: "Customer", status: "Active", joined: "Feb 5, 2024" },
];

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Filter users based on search and filters
  const filteredUsers = USERS_DATA.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = selectedRole === "all" || user.role.toLowerCase() === selectedRole.toLowerCase();
    const matchesStatus = selectedStatus === "all" || user.status.toLowerCase() === selectedStatus.toLowerCase();
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Users</h2>
        <button className="btn-primary flex items-center">
          <i className="fas fa-plus mr-2"></i> Add User
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <i className="fas fa-search text-gray-400"></i>
            </div>
          </div>
          
          {/* Role filter */}
          <div className="relative">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <i className="fas fa-user-tag text-gray-400"></i>
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="blocked">Blocked</option>
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

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No users found matching your criteria
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-2">
                        {user.name.charAt(0)}
                      </div>
                      {user.name}
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.role === "Admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                    }`}>
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === "Active" ? "bg-green-100 text-green-700" :
                      user.status === "Inactive" ? "bg-yellow-100 text-yellow-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>{user.joined}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="p-2 hover:bg-gray-100 rounded">
                        <i className="fas fa-ellipsis-v"></i>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer">
                          <i className="fas fa-eye mr-2"></i> View
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <i className="fas fa-edit mr-2"></i> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-red-600">
                          <i className="fas fa-trash-alt mr-2"></i> Delete
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
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredUsers.length}</span> of{" "}
            <span className="font-medium">{USERS_DATA.length}</span> users
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

export default AdminUsers;
