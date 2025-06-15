
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VehicleCard from "@/components/VehicleCard";
import VehicleFilters from "@/components/VehicleFilters";
import { carsData } from "@/data/mockData";
import { VehicleType } from "@/types";

const Cars = () => {
  const [filteredVehicles, setFilteredVehicles] = useState<VehicleType[]>(carsData);
  const [loading, setLoading] = useState(true);
  
  // Extract unique brands and locations
  const brands = [...new Set(carsData.map(car => car.brand))];
  const locations = [...new Set(carsData.map(car => car.location))];
  
  // Apply filters with new checkbox-based logic
  const handleFilterChange = (filters: any) => {
    let filtered = [...carsData];
    
    // Apply brand filter (multiple selections)
    if (filters.brands && filters.brands.length > 0) {
      filtered = filtered.filter(car => 
        filters.brands.some((brand: string) => 
          car.brand.toLowerCase().includes(brand.toLowerCase())
        )
      );
    }
    
    // Apply location filter (multiple selections)
    if (filters.locations && filters.locations.length > 0) {
      filtered = filtered.filter(car => 
        filters.locations.some((location: string) => 
          car.location.toLowerCase().includes(location.toLowerCase())
        )
      );
    }
    
    // Apply price filter
    if (filters.priceRange) {
      filtered = filtered.filter(car => 
        car.pricePerDay >= filters.priceRange.min && 
        car.pricePerDay <= filters.priceRange.max
      );
    }
    
    // Apply sorting
    if (filters.sortBy === "price_low_high") {
      filtered.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (filters.sortBy === "price_high_low") {
      filtered.sort((a, b) => b.pricePerDay - a.pricePerDay);
    }
    
    setFilteredVehicles(filtered);
  };
  
  // Simulate loading
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  
  return (
    <>
      <Helmet>
        <title>Cars for Rent - Swift Ride</title>
        <meta name="description" content="Browse and book our selection of quality cars for rent. Choose from brands like Toyota, Honda, BMW, Audi, and more." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-20 pb-16 bg-gray-50 min-h-screen w-full">
        <div className="content-container mx-auto animate-fade-in">
          <div className="py-8">
            <h1 className="text-3xl font-bold mb-2">Cars for Rent</h1>
            <p className="text-gray-600 mb-6">
              Choose from our selection of comfortable, reliable cars for your travel needs.
              We offer a range of models from top brands like Toyota, Honda, BMW, and more.
            </p>
            
            <div className="lg:flex gap-6">
              {/* Filters */}
              <VehicleFilters 
                vehicleType="car"
                brands={brands}
                locations={locations}
                onFilterChange={handleFilterChange}
              />
              
              {/* Results */}
              <div className="w-full">
                {loading ? (
                  <div className="py-12 text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    <p className="mt-4 text-gray-600">Loading cars...</p>
                  </div>
                ) : filteredVehicles.length === 0 ? (
                  <div className="py-12 text-center">
                    <div className="text-3xl text-gray-400 mb-4">
                      <i className="fas fa-search"></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No cars found</h3>
                    <p className="text-gray-600">
                      Try adjusting your filters to find available cars.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredVehicles.map((car) => (
                      <VehicleCard key={car.id} vehicle={car} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Cars;
