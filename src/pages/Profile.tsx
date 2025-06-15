import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { provinces, cities, locationData } from "@/data/locationData";
import { UserProfile } from "@/types";

const Profile = () => {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    dob: "",
    gender: "male",
    cnic: "",
    province: "",
    city: "",
    postalCode: ""
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      // Populate form with user data if available
      if (user.profile) {
        setFormData(prev => ({
          ...prev,
          ...user.profile,
        }));
        
        // Set available cities based on province
        if (user.profile.province) {
          setAvailableCities(locationData[user.profile.province as keyof typeof locationData] || []);
        }
      }
    }
  }, [user, navigate]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Format CNIC with dashes
    if (name === "cnic") {
      const cnic = value.replace(/[^0-9]/g, "").substring(0, 13);
      if (cnic.length <= 13) {
        let formattedCNIC = "";
        if (cnic.length > 5) {
          formattedCNIC = cnic.substring(0, 5) + "-";
          if (cnic.length > 12) {
            formattedCNIC += cnic.substring(5, 12) + "-" + cnic.substring(12);
          } else {
            formattedCNIC += cnic.substring(5);
          }
        } else {
          formattedCNIC = cnic;
        }
        setFormData(prev => ({ ...prev, cnic: formattedCNIC }));
      }
      return;
    }
    
    // Handle province change to update city dropdown
    if (name === "province") {
      setFormData(prev => ({ ...prev, [name]: value, city: "" }));
      setAvailableCities(locationData[value as keyof typeof locationData] || []);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that province and city are selected
    if (!formData.province) {
      toast.error("Please select a province");
      return;
    }
    
    if (!formData.city) {
      toast.error("Please select a city");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (user) {
        updateUser({
          profile: formData
        });
        toast.success("Profile updated successfully");
      }
      setIsLoading(false);
    }, 1000);
  };
  
  if (!user) {
    return null;
  }
  
  return (
    <>
      <Helmet>
        <title>Your Profile - Swift Ride</title>
        <meta name="description" content="Edit your user profile on Swift Ride." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold">Your Profile</h1>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6">
                <div className="flex items-center space-x-8 mb-8">
                  <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold">{user.name.charAt(0)}</span>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-gray-100"
                      disabled
                    />
                    <p className="mt-1 text-xs text-gray-500">Contact support to change your email</p>
                  </div>
                  
                  {/* Date of Birth */}
                  <div>
                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                  
                  {/* Gender */}
                  <div>
                    <span className="block text-sm font-medium text-gray-700 mb-1">Gender</span>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          checked={formData.gender === "male"}
                          onChange={handleChange}
                          className="text-primary focus:ring-primary"
                        />
                        <span className="ml-2">Male</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          checked={formData.gender === "female"}
                          onChange={handleChange}
                          className="text-primary focus:ring-primary"
                        />
                        <span className="ml-2">Female</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* CNIC */}
                  <div>
                    <label htmlFor="cnic" className="block text-sm font-medium text-gray-700">CNIC (with dashes)</label>
                    <input
                      type="text"
                      id="cnic"
                      name="cnic"
                      value={formData.cnic}
                      onChange={handleChange}
                      placeholder="00000-0000000-0"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                  
                  {/* Province */}
                  <div>
                    <label htmlFor="province" className="block text-sm font-medium text-gray-700">Province <span className="text-red-500">*</span></label>
                    <select
                      id="province"
                      name="province"
                      value={formData.province}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      required
                    >
                      <option value="">Select Province</option>
                      {provinces.map(province => (
                        <option key={province} value={province}>{province}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* City - Updated with dynamic options based on province */}
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City <span className="text-red-500">*</span></label>
                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      disabled={!formData.province}
                      required
                    >
                      <option value="">Select City</option>
                      {availableCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    {!formData.province && (
                      <p className="mt-1 text-xs text-gray-500">Please select a province first</p>
                    )}
                  </div>
                  
                  {/* Postal Code */}
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary flex items-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save"></i>
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Profile;
