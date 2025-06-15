
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Book Your Next Ride?
          </h2>
          <p className="text-white/90 text-lg md:text-xl mb-8">
            Choose from our extensive fleet of cars, buses, mini buses, and coasters.
            Whether for personal travel, family trips, corporate events, or special occasions,
            we have the perfect vehicle for your needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/cars" className="btn-secondary text-lg px-8 py-3">
              Explore Vehicles
            </Link>
            <Link to="/contact" className="bg-white text-primary hover:bg-gray-100 py-3 px-8 rounded-md transition duration-300 font-medium text-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
