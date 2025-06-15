import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

const Navbar = () => {
  const { user, logout } = useUser();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [vehicleDropdownOpen, setVehicleDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const vehicleDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Enhanced outside click handling for mobile menu
  useOnClickOutside(mobileMenuRef, (event) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.mobile-menu-button')) {
      setMobileMenuOpen(false);
      setVehicleDropdownOpen(false);
    }
  });

  useOnClickOutside(vehicleDropdownRef, () => setVehicleDropdownOpen(false));
  useOnClickOutside(profileDropdownRef, () => setProfileDropdownOpen(false));

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Enhanced route change handling
  useEffect(() => {
    setMobileMenuOpen(false);
    setVehicleDropdownOpen(false);
    setProfileDropdownOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    setMobileMenuOpen(false);
  };

  // Improved toggle handlers
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (mobileMenuOpen) {
      setVehicleDropdownOpen(false);
      setProfileDropdownOpen(false);
    }
  };

  const toggleVehicleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVehicleDropdownOpen(!vehicleDropdownOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-white/90 py-4"
      }`}
    >
      <div className="w-full">
        <div className="w-full max-w-none px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">Swift<span className="text-secondary">Ride</span></span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={`nav-link ${location.pathname === "/" ? "active-nav-link" : ""}`}>
                Home
              </Link>
              
              {/* Desktop Vehicle Dropdown */}
              <div className="relative group" ref={vehicleDropdownRef}>
                <button 
                  className={`nav-link flex items-center ${["/cars", "/buses", "/minibuses", "/coasters"].includes(location.pathname) ? "active-nav-link" : ""}`}
                  onClick={toggleVehicleDropdown}
                >
                  Vehicles <i className={`fas fa-chevron-${vehicleDropdownOpen ? "up" : "down"} ml-1 text-xs transition-transform duration-200`}></i>
                </button>
                <div className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ${vehicleDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}>
                  <Link to="/cars" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setVehicleDropdownOpen(false)}>Cars</Link>
                  <Link to="/buses" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setVehicleDropdownOpen(false)}>Buses</Link>
                  <Link to="/minibuses" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setVehicleDropdownOpen(false)}>Mini Buses</Link>
                  <Link to="/coasters" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setVehicleDropdownOpen(false)}>Coasters</Link>
                </div>
              </div>
              
              <Link to="/about" className={`nav-link ${location.pathname === "/about" ? "active-nav-link" : ""}`}>
                About Us
              </Link>
              <Link to="/contact" className={`nav-link ${location.pathname === "/contact" ? "active-nav-link" : ""}`}>
                Contact
              </Link>
            </div>

            {/* Desktop Search and Auth */}
            <div className="hidden md:flex items-center space-x-4">
              <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none focus:outline-none text-sm w-32 lg:w-auto"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="ml-2 text-gray-600">
                  <i className="fas fa-search"></i>
                </button>
              </form>

              {user ? (
                <div className="relative" ref={profileDropdownRef}>
                  <button
                    onClick={toggleProfileDropdown}
                    className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                    <span>{user.name.split(" ")[0]}</span>
                    <i className={`fas fa-chevron-${profileDropdownOpen ? "up" : "down"} text-xs transition-transform duration-200`}></i>
                  </button>
                  
                  <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ${profileDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setProfileDropdownOpen(false)}>Profile</Link>
                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setProfileDropdownOpen(false)}>Dashboard</Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setProfileDropdownOpen(false)}>Settings</Link>
                    <button 
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-gray-100 transition-colors"
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i> Logout
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <Link to="/login" className="text-primary hover:text-primary-dark font-medium">
                    Login
                  </Link>
                  <Link to="/signup" className="btn-primary">
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="mobile-menu-button md:hidden text-gray-700 focus:outline-none z-50 relative"
              aria-label="Toggle mobile menu"
            >
              <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"} text-xl transition-all duration-200`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Sliding Panel */}
        <div 
          ref={mobileMenuRef}
          className={`md:hidden fixed top-0 right-0 w-[80%] h-screen bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Mobile Menu Content */}
          <div className="flex flex-col h-full">
            {/* User Profile Section - Only show if logged in */}
            {user && (
              <div className="p-6 bg-primary/5 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <span className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Search Bar */}
            <div className="p-6 border-b border-gray-200">
              <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-full px-4 py-3">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none focus:outline-none text-sm w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="ml-2 text-gray-600">
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-6">
                <Link to="/" 
                  className={`block py-3 text-lg ${location.pathname === "/" ? "text-primary font-medium" : "text-gray-700"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>

                {/* Mobile Vehicle Dropdown */}
                <div>
                  <button 
                    onClick={toggleVehicleDropdown}
                    className="flex items-center justify-between w-full py-3 text-left text-lg"
                  >
                    <span className={`${["/cars", "/buses", "/minibuses", "/coasters"].includes(location.pathname) ? "text-primary font-medium" : "text-gray-700"}`}>
                      Vehicles
                    </span>
                    <i className={`fas fa-chevron-${vehicleDropdownOpen ? "up" : "down"} text-sm transition-transform duration-200`}></i>
                  </button>
                  
                  <div className={`pl-6 space-y-3 overflow-hidden transition-all duration-200 ${vehicleDropdownOpen ? "max-h-64 opacity-100 mt-3" : "max-h-0 opacity-0"}`}>
                    <Link to="/cars" className="block py-2 text-gray-600 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>Cars</Link>
                    <Link to="/buses" className="block py-2 text-gray-600 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>Buses</Link>
                    <Link to="/minibuses" className="block py-2 text-gray-600 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>Mini Buses</Link>
                    <Link to="/coasters" className="block py-2 text-gray-600 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>Coasters</Link>
                  </div>
                </div>

                <Link to="/about" 
                  className={`block py-3 text-lg ${location.pathname === "/about" ? "text-primary font-medium" : "text-gray-700"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link to="/contact" 
                  className={`block py-3 text-lg ${location.pathname === "/contact" ? "text-primary font-medium" : "text-gray-700"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Auth Section */}
            <div className="p-6 border-t border-gray-200">
              {user ? (
                <div className="space-y-4">
                  <Link 
                    to="/profile" 
                    className="w-full text-left py-3 text-lg text-gray-700 hover:text-primary flex items-center transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <i className="fas fa-user mr-3 w-6"></i> Profile
                  </Link>
                  <Link 
                    to="/dashboard" 
                    className="w-full text-left py-3 text-lg text-gray-700 hover:text-primary flex items-center transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <i className="fas fa-tachometer-alt mr-3 w-6"></i> Dashboard
                  </Link>
                  <Link 
                    to="/settings" 
                    className="w-full text-left py-3 text-lg text-gray-700 hover:text-primary flex items-center transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <i className="fas fa-cog mr-3 w-6"></i> Settings
                  </Link>
                  <div className="pt-4 border-t border-gray-200">
                    <button 
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left py-3 text-lg text-red-600 hover:text-red-800 flex items-center transition-colors"
                    >
                      <i className="fas fa-sign-out-alt mr-3 w-6"></i> Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link to="/login" 
                    className="block w-full py-4 text-center bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-lg font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link to="/signup" 
                    className="block w-full py-4 text-center bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-colors text-lg font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Overlay for mobile menu */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
