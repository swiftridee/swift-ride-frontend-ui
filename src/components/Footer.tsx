
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/components/ui/sonner";

const Footer = () => {
  const [email, setEmail] = useState("");
  const location = useLocation();

  // Don't show footer on auth pages and user account pages
  const hideFooterOn = ["/login", "/signup", "/forgot-password", "/dashboard", "/settings", "/profile"];
  if (hideFooterOn.includes(location.pathname)) {
    return null;
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
    } else {
      toast.error("Please enter a valid email address");
    }
  };

  // Scroll to top function for homepage link
  const scrollToTop = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-6 w-full">
      <div className="content-container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">Swift<span className="text-secondary">Ride</span></h2>
            <p className="text-gray-400 mb-4">
              Swift Ride offers premium vehicle rental services. Book cars, buses, mini buses, and coasters for any occasion.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f text-lg"></i>
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram text-lg"></i>
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter text-lg"></i>
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in text-lg"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Vehicle Categories */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Vehicle Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/cars" className="text-gray-400 hover:text-white transition-colors">Cars</Link>
              </li>
              <li>
                <Link to="/buses" className="text-gray-400 hover:text-white transition-colors">Buses</Link>
              </li>
              <li>
                <Link to="/minibuses" className="text-gray-400 hover:text-white transition-colors">Mini Buses</Link>
              </li>
              <li>
                <Link to="/coasters" className="text-gray-400 hover:text-white transition-colors">Coasters</Link>
              </li>
            </ul>
          </div>
          
          {/* Legal Links */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for updates and special offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-md focus:outline-none text-gray-900 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button 
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-r-md transition duration-300"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-400">
          <p>© 2025 <Link to="/" onClick={scrollToTop} className="hover:text-primary transition-colors">Swift Ride</Link>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
