import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { VehicleType, RentalPlan } from "@/types";
import { calculatePrice } from "@/utils/pricing";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserContext";
import { carsData, busesData, coastersData, miniBusesData } from "@/data/mockData";
import { majorCities, timeOptions } from "@/data/locationData";

const BookingPage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [vehicle, setVehicle] = useState<VehicleType | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    pickupLocation: "",
    dropLocation: "",
    pickupDate: "",
    pickupTime: "",
    returnDate: "",
    returnTime: "",
    rentalPlan: searchParams.get("plan") || "12hour",
    withDriver: searchParams.get("driver") === "true",
    notes: ""
  });
  
  // Shared Ride State
  const [enableSharedRide, setEnableSharedRide] = useState(false);
  const [sharedRiderInfo, setSharedRiderInfo] = useState({
    name: "",
    phone: "",
    email: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Find the vehicle data
  useEffect(() => {
    setLoading(true);
    // Combine all vehicle data
    const allVehicles = [...carsData, ...busesData, ...miniBusesData, ...coastersData];
    const foundVehicle = allVehicles.find(v => v.id === id);
    
    if (foundVehicle) {
      setVehicle(foundVehicle);
    } else {
      toast.error("Vehicle not found");
      navigate("/");
    }
    
    setLoading(false);
  }, [id, navigate]);
  
  // Calculate price based on selected options
  const calculateTotalPrice = () => {
    if (!vehicle) return 0;
    return calculatePrice(
      vehicle.category, 
      formData.rentalPlan as RentalPlan, 
      formData.withDriver
    );
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleDriverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ 
      ...prev, 
      withDriver: e.target.value === "with" 
    }));
  };

  const handleSharedRiderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSharedRiderInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSharedRideToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnableSharedRide(e.target.checked);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.fullName || !formData.email || !formData.phone || 
        !formData.pickupLocation || !formData.dropLocation || 
        !formData.pickupDate || !formData.pickupTime || 
        !formData.returnDate || !formData.returnTime) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Validate shared rider info if shared ride is enabled
    if (enableSharedRide && (!sharedRiderInfo.name || !sharedRiderInfo.phone)) {
      toast.error("Please fill in all shared rider information");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Booking successful! Redirecting to payment...");
      
      // In a real app, you'd store the booking info and redirect to payment
      setIsSubmitting(false);
      navigate("/dashboard");
    }, 1500);
  };

  // Check if vehicle category supports shared rides
  const isSharedRideSupported = vehicle?.category ? ["car", "minibus", "coaster"].includes(vehicle.category) : false;
  
  // Calculate price per rider
  const getPricePerRider = () => {
    const totalPrice = calculateTotalPrice();
    return enableSharedRide ? totalPrice / 2 : totalPrice;
  };
  
  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-24 pb-16 min-h-screen bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="w-full flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  if (!vehicle) {
    return (
      <>
        <Navbar />
        <main className="pt-24 pb-16 min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Vehicle Not Found</h2>
            <p className="mb-8">Sorry, we couldn't find the vehicle you're looking for.</p>
            <button 
              onClick={() => navigate(-1)} 
              className="btn-primary"
            >
              Go Back
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>Book {vehicle.brand} {vehicle.name} - Swift Ride</title>
        <meta name="description" content={`Book the ${vehicle.brand} ${vehicle.name} for your trip. Choose your rental plan and driver option.`} />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm mb-6">
              <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-primary">
                <i className="fas fa-arrow-left mr-2"></i> Back
              </button>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-700">Booking</span>
            </div>
            
            {/* Vehicle Details */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="relative h-64 md:h-80">
                <img 
                  src={vehicle.image} 
                  alt={`${vehicle.brand} ${vehicle.name}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                  <h1 className="text-3xl font-bold text-white">{vehicle.brand} {vehicle.name}</h1>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center">
                    <i className="fas fa-map-marker-alt text-primary mr-2"></i>
                    <span>{vehicle.location}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <i className="fas fa-users text-primary mr-2"></i>
                    <span>{vehicle.seats} Seats</span>
                  </div>
                  
                  <div className="flex items-center">
                    <i className="fas fa-tag text-primary mr-2"></i>
                    <span>{vehicle.category.charAt(0).toUpperCase() + vehicle.category.slice(1)}</span>
                  </div>
                </div>
                
                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {vehicle.features.map((feature, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Pricing Options */}
                <div className="border-t border-gray-200 pt-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Rental Options</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 mb-2">Rental Plan</label>
                      <div className="relative">
                        <select
                          name="rentalPlan"
                          value={formData.rentalPlan}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="12hour">12 Hour</option>
                          <option value="2day">2 Day</option>
                          <option value="3day">3 Day</option>
                          <option value="1week">1 Week</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Driver Option</label>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="driverOption"
                            value="with"
                            checked={formData.withDriver}
                            onChange={handleDriverChange}
                            className="text-primary focus:ring-primary"
                          />
                          <span>With Driver</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="driverOption"
                            value="without"
                            checked={!formData.withDriver}
                            onChange={handleDriverChange}
                            className="text-primary focus:ring-primary"
                          />
                          <span>Without Driver</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Price Breakdown */}
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold mb-4">Price Breakdown</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Base Price ({formData.rentalPlan === "12hour" ? "12 Hours" : 
                                        formData.rentalPlan === "2day" ? "2 Days" : "3 Days"})</span>
                      <span>PKR {calculatePrice(vehicle.category, formData.rentalPlan as RentalPlan, false).toLocaleString()}</span>
                    </div>
                    
                    {formData.withDriver && (
                      <div className="flex justify-between">
                        <span>Driver Fee</span>
                        <span>+ PKR {(calculateTotalPrice() - calculatePrice(vehicle.category, formData.rentalPlan as RentalPlan, false)).toLocaleString()}</span>
                      </div>
                    )}
                    
                    <div className="border-t border-gray-300 pt-3 flex justify-between font-bold">
                      <span>{enableSharedRide ? "Total (for both riders)" : "Total"}</span>
                      <span className="text-primary text-xl">PKR {calculateTotalPrice().toLocaleString()}</span>
                    </div>
                    
                    {enableSharedRide && (
                      <div className="bg-blue-50 p-3 rounded border border-blue-100">
                        <div className="flex justify-between text-blue-800 font-medium">
                          <span>Your share (50%):</span>
                          <span>PKR {getPricePerRider().toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-blue-600 mt-1">The total cost will be split equally between both riders</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Booking Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Complete Your Booking</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Personal Information */}
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="fullName">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  {/* Shared Ride Option - Only for supported vehicles */}
                  {isSharedRideSupported && (
                    <div>
                      <label className="block text-gray-700 mb-2">Ride Sharing</label>
                      <div className="flex items-center space-x-2">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={enableSharedRide}
                            onChange={handleSharedRideToggle}
                            className="sr-only peer"
                          />
                          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-primary-200 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          <span className="ml-3 text-sm font-medium text-gray-900">Enable Ride Share</span>
                        </label>
                      </div>
                    </div>
                  )}
                  
                  {/* Location Information */}
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="pickupLocation">Pickup Location</label>
                    <select
                      id="pickupLocation"
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">Select Pickup Location</option>
                      {majorCities.map((city) => (
                        <option key={`pickup-${city}`} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="dropLocation">Drop-off Location</label>
                    <select
                      id="dropLocation"
                      name="dropLocation"
                      value={formData.dropLocation}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">Select Drop-off Location</option>
                      {majorCities.map((city) => (
                        <option key={`dropoff-${city}`} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Date and Time - Change to dropdown for time */}
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="pickupDate">Pickup Date</label>
                    <input
                      type="date"
                      id="pickupDate"
                      name="pickupDate"
                      value={formData.pickupDate}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="pickupTime">Pickup Time</label>
                    <select
                      id="pickupTime"
                      name="pickupTime"
                      value={formData.pickupTime}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">Select Pickup Time</option>
                      {timeOptions.map((time) => (
                        <option key={`pickup-time-${time}`} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="returnDate">Return Date</label>
                    <input
                      type="date"
                      id="returnDate"
                      name="returnDate"
                      value={formData.returnDate}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      min={formData.pickupDate || new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="returnTime">Return Time</label>
                    <select
                      id="returnTime"
                      name="returnTime"
                      value={formData.returnTime}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">Select Return Time</option>
                      {timeOptions.map((time) => (
                        <option key={`return-time-${time}`} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Shared Rider Fields - Show when shared ride is enabled */}
                {enableSharedRide && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                    <h3 className="font-medium text-blue-800 mb-3">Co-rider Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2" htmlFor="coRiderName">Co-rider Name</label>
                        <input
                          type="text"
                          id="coRiderName"
                          name="name"
                          value={sharedRiderInfo.name}
                          onChange={handleSharedRiderChange}
                          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2" htmlFor="coRiderPhone">Co-rider Phone</label>
                        <input
                          type="tel"
                          id="coRiderPhone"
                          name="phone"
                          value={sharedRiderInfo.phone}
                          onChange={handleSharedRiderChange}
                          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-gray-700 mb-2" htmlFor="coRiderEmail">Co-rider Email (Optional)</label>
                        <input
                          type="email"
                          id="coRiderEmail"
                          name="email"
                          value={sharedRiderInfo.email}
                          onChange={handleSharedRiderChange}
                          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <p className="text-sm text-blue-600 mt-2">
                          The total cost will be split equally (50%) between both riders.
                          Both will receive booking confirmation.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Notes */}
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2" htmlFor="notes">Additional Notes (optional)</label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  ></textarea>
                </div>
                
                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full md:w-auto md:px-12 py-3 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Processing...
                      </>
                    ) : (
                      <>
                        Confirm & Proceed to Payment
                        <i className="fas fa-arrow-right ml-2"></i>
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

export default BookingPage;
