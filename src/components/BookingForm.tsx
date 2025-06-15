
import { useState } from "react";
import { DatePicker } from "./DatePicker";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pickupCity: "",
    destinationCity: "",
    pickupDate: undefined as Date | undefined,
    returnDate: undefined as Date | undefined,
    passengers: 1,
    shareRide: false,
    coRiderName: "",
    coRiderPhone: "",
    coRiderEmail: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking form submitted:", formData);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Book Your Ride</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="example@gmail.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="03xx-xxxxxxx"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        {/* Travel Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="pickupCity" className="block text-sm font-medium text-gray-700 mb-2">
              Pickup City *
            </label>
            <select
              id="pickupCity"
              name="pickupCity"
              value={formData.pickupCity}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select pickup city</option>
              <option value="Karachi">Karachi</option>
              <option value="Lahore">Lahore</option>
              <option value="Faisalabad">Faisalabad</option>
              <option value="Rawalpindi">Rawalpindi</option>
              <option value="Islamabad">Islamabad</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="destinationCity" className="block text-sm font-medium text-gray-700 mb-2">
              Destination City *
            </label>
            <select
              id="destinationCity"
              name="destinationCity"
              value={formData.destinationCity}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select destination city</option>
              <option value="Karachi">Karachi</option>
              <option value="Lahore">Lahore</option>
              <option value="Faisalabad">Faisalabad</option>
              <option value="Rawalpindi">Rawalpindi</option>
              <option value="Islamabad">Islamabad</option>
            </select>
          </div>
        </div>

        {/* Date Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pickup Date *
            </label>
            <DatePicker
              selected={formData.pickupDate}
              onSelect={(date) => setFormData(prev => ({ ...prev, pickupDate: date }))}
              placeholder="Select pickup date"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Return Date
            </label>
            <DatePicker
              selected={formData.returnDate}
              onSelect={(date) => setFormData(prev => ({ ...prev, returnDate: date }))}
              placeholder="Select return date (optional)"
              disabled={!formData.pickupDate}
            />
          </div>
        </div>

        <div>
          <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-2">
            Number of Passengers
          </label>
          <select
            id="passengers"
            name="passengers"
            value={formData.passengers}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <option key={num} value={num}>{num} Passenger{num > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>

        {/* Share Ride Option */}
        <div className="border-t pt-6">
          <div className="flex items-center space-x-3 mb-4">
            <input
              type="checkbox"
              id="shareRide"
              name="shareRide"
              checked={formData.shareRide}
              onChange={handleInputChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="shareRide" className="text-sm font-medium text-gray-700">
              Share Booking with Co-Rider
            </label>
          </div>
          
          {/* Co-Rider Information - Fixed spacing for mobile */}
          {formData.shareRide && (
            <div className="space-y-4 pl-0 md:pl-7">
              <div className="space-y-4">
                <div>
                  <label htmlFor="coRiderName" className="block text-sm font-medium text-gray-700 mb-2">
                    Co-rider Name *
                  </label>
                  <input
                    type="text"
                    id="coRiderName"
                    name="coRiderName"
                    value={formData.coRiderName}
                    onChange={handleInputChange}
                    placeholder="Enter co-rider full name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required={formData.shareRide}
                  />
                </div>
                
                <div>
                  <label htmlFor="coRiderPhone" className="block text-sm font-medium text-gray-700 mb-2">
                    Co-rider Phone *
                  </label>
                  <input
                    type="tel"
                    id="coRiderPhone"
                    name="coRiderPhone"
                    value={formData.coRiderPhone}
                    onChange={handleInputChange}
                    placeholder="03xx-xxxxxxx"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required={formData.shareRide}
                  />
                </div>
                
                <div>
                  <label htmlFor="coRiderEmail" className="block text-sm font-medium text-gray-700 mb-2">
                    Co-rider Email *
                  </label>
                  <input
                    type="email"
                    id="coRiderEmail"
                    name="coRiderEmail"
                    value={formData.coRiderEmail}
                    onChange={handleInputChange}
                    placeholder="co-rider@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required={formData.shareRide}
                  />
                </div>
              </div>
              
              <p className="text-xs text-gray-500 leading-relaxed">
                Share your booking details with a co-rider for split costs and coordination.
              </p>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary-dark transition-colors duration-200 font-medium"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
