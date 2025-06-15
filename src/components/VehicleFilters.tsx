
import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";

interface VehicleFiltersProps {
  vehicleType: string;
  brands: string[];
  locations: string[];
  onFilterChange: (filters: any) => void;
}

const VehicleFilters = ({ vehicleType, brands, locations, onFilterChange }: VehicleFiltersProps) => {
  const [filters, setFilters] = useState({
    brands: [] as string[],
    locations: [] as string[],
    priceRange: { min: 5000, max: 150000 },
    sortBy: "default"
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [priceSliderValue, setPriceSliderValue] = useState([5000, 150000]);

  // Brand options based on vehicle type
  const getBrandOptions = () => {
    switch (vehicleType) {
      case "car":
        return ["Toyota", "Honda", "Suzuki", "Hyundai", "Kia", "MG", "BMW", "Audi"];
      case "bus":
        return ["Yutong", "Hino", "Isuzu", "MAN"];
      case "minibus":
        return ["Yutong", "Hino", "Isuzu", "MAN"];
      case "coaster":
        return ["Toyota Coaster", "Higer Coaster", "Yutong Coaster"];
      default:
        return brands;
    }
  };

  const locationOptions = [
    "Karachi", "Lahore", "Faisalabad", "Rawalpindi", "Islamabad",
    "Gujranwala", "Peshawar", "Multan", "Sialkot", "Quetta",
    "Bahawalpur", "Sargodha", "Mardan", "Gujrat", "Sheikhupura"
  ];

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleBrandChange = (brand: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      brands: checked 
        ? [...prev.brands, brand]
        : prev.brands.filter(b => b !== brand)
    }));
  };

  const handleLocationChange = (location: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      locations: checked 
        ? [...prev.locations, location]
        : prev.locations.filter(l => l !== location)
    }));
  };

  const handlePriceSliderChange = (value: number[]) => {
    setPriceSliderValue(value);
    setFilters(prev => ({
      ...prev,
      priceRange: { min: value[0], max: value[1] }
    }));
  };

  const handleSortChange = (sortValue: string) => {
    setFilters(prev => ({
      ...prev,
      sortBy: prev.sortBy === sortValue ? "default" : sortValue
    }));
  };

  const clearFilters = () => {
    const resetFilters = {
      brands: [] as string[],
      locations: [] as string[],
      priceRange: { min: 5000, max: 150000 },
      sortBy: "default"
    };
    setFilters(resetFilters);
    setPriceSliderValue([5000, 150000]);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-primary hover:text-primary-dark mb-4"
        >
          Clear All Filters
        </button>
      </div>

      {/* Sort By */}
      <div>
        <label className="form-label font-medium mb-3 block">Sort By</label>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="sortBy"
              checked={filters.sortBy === "price_low_high"}
              onChange={(e) => handleSortChange(e.target.checked ? "price_low_high" : "default")}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 mr-2"
            />
            <span className="text-sm">Low to High</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="sortBy"
              checked={filters.sortBy === "price_high_low"}
              onChange={(e) => handleSortChange(e.target.checked ? "price_high_low" : "default")}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 mr-2"
            />
            <span className="text-sm">High to Low</span>
          </label>
        </div>
      </div>

      {/* Brands Filter - Inline Row */}
      <div>
        <label className="form-label font-medium mb-3 block">Brands</label>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {getBrandOptions().map(brand => (
            <label key={brand} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={(e) => handleBrandChange(brand, e.target.checked)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mr-2"
              />
              <span className="text-sm whitespace-nowrap">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Locations Filter - Inline Row */}
      <div>
        <label className="form-label font-medium mb-3 block">Locations</label>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {locationOptions.map(location => (
            <label key={location} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.locations.includes(location)}
                onChange={(e) => handleLocationChange(location, e.target.checked)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mr-2"
              />
              <span className="text-sm whitespace-nowrap">{location}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <label className="form-label font-medium mb-3 block">Price Range (PKR)</label>
        <div className="space-y-4">
          <div className="px-2">
            <Slider
              value={priceSliderValue}
              onValueChange={handlePriceSliderChange}
              max={150000}
              min={5000}
              step={1000}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>PKR {priceSliderValue[0].toLocaleString()}</span>
            <span>PKR {priceSliderValue[1].toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filters - Fixed height, no scroll */}
      <div className="hidden lg:block lg:w-72 flex-shrink-0">
        <div className="sticky top-24 bg-white p-6 rounded-lg shadow-md">
          <FilterContent />
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full bg-primary text-white py-3 px-4 rounded-lg flex items-center justify-between"
        >
          <span>Filters</span>
          <i className={`fas fa-chevron-${showMobileFilters ? "up" : "down"}`}></i>
        </button>

        {/* Mobile Filters Dropdown */}
        {showMobileFilters && (
          <div className="mt-4 bg-white p-4 rounded-lg shadow-md border">
            <FilterContent />
          </div>
        )}
      </div>
    </>
  );
};

export default VehicleFilters;
