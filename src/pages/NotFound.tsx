
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - Swift Ride</title>
        <meta name="description" content="The page you're looking for cannot be found." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-20 pb-16 bg-gray-50 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-9xl font-bold text-primary mb-6">404</div>
            <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
            <p className="text-gray-600 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/" className="btn-primary">
                Back to Home
              </Link>
              <Link to="/contact" className="btn-outline">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default NotFound;
