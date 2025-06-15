
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center w-full">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      
      {/* Background image - Updated with responsive sizing */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full object-cover md:h-[550px]"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" 
        }}
      ></div>
      
      {/* Content */}
      <div className="content-container mx-auto relative z-20 py-24 w-full">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 font-poppins text-white drop-shadow-lg">
            Premium Vehicle Rentals for Every Occasion
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 drop-shadow-md">
            Swift Ride offers premium car, bus, and coaster rentals for all your travel needs in Pakistan.
            Book online today for a seamless transportation experience.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/cars" 
              className="btn-primary px-6 py-3 text-lg hover:scale-105 transition-transform duration-300 shadow-lg"
              aria-label="Book a ride now"
            >
              Book Now
              <i className="fas fa-arrow-right ml-2"></i>
            </Link>
            <Link 
              to="/cars" 
              className="bg-white text-primary hover:bg-gray-100 px-6 py-3 text-lg rounded-md transition-all duration-300 font-medium hover:scale-105 shadow-lg"
              aria-label="Explore available vehicles"
            >
              Explore Vehicles
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
