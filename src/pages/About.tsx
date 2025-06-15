
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Swift Ride</title>
        <meta name="description" content="Learn more about Swift Ride - Pakistan's premium vehicle rental service offering cars, buses, mini buses, and coasters." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-20 pb-16">
        {/* Hero Section */}
        <section className="bg-gray-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">About Swift Ride</h1>
              <p className="text-xl text-gray-300">
                Pakistan's premium vehicle rental service, providing quality transportation solutions since 2020.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-600 mb-6">
                  Swift Ride was founded in 2020 with a simple mission: to provide reliable, high-quality vehicle rental services to the people of Pakistan. What started as a small fleet of cars has now grown into a comprehensive service offering cars, buses, mini buses, and coasters.
                </p>
                <p className="text-gray-600">
                  Our founder, Ahmed Khan, identified a gap in the market for a transparent, customer-focused vehicle rental service. Today, Swift Ride has become synonymous with quality, reliability, and excellent customer service in the transportation industry.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2940&auto=format&fit=crop"
                  alt="Swift Ride fleet" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Mission & Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Our Mission & Values</h2>
              <p className="text-gray-600">
                At Swift Ride, we are guided by our commitment to excellence, integrity, and customer satisfaction. These core values shape everything we do.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-primary text-3xl mb-4">
                  <i className="fas fa-star"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in every aspect of our service, from the quality of our vehicles to the professionalism of our staff.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-primary text-3xl mb-4">
                  <i className="fas fa-handshake"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">Integrity</h3>
                <p className="text-gray-600">
                  We operate with honesty and transparency in all our dealings, ensuring that our customers always know exactly what they're getting.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-primary text-3xl mb-4">
                  <i className="fas fa-heart"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">Customer Focus</h3>
                <p className="text-gray-600">
                  Our customers are at the heart of everything we do. We continuously strive to exceed their expectations and provide exceptional service.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Team */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Meet Our Leadership Team</h2>
              <p className="text-gray-600">
                Our success is driven by our dedicated team of professionals who are passionate about providing the best service.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3" 
                    alt="Ahmed Khan" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Ahmed Khan</h3>
                <p className="text-primary">Founder & CEO</p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3" 
                    alt="Fatima Ali" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Fatima Ali</h3>
                <p className="text-primary">Operations Director</p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3" 
                    alt="Hassan Ahmed" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Hassan Ahmed</h3>
                <p className="text-primary">Fleet Manager</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Achievements */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Our Achievements</h2>
              <p className="text-gray-600">
                Over the years, we've grown significantly and achieved important milestones that have established us as a leader in the vehicle rental industry.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl text-primary font-bold mb-2">250+</div>
                <p className="text-gray-600">Vehicles in Fleet</p>
              </div>
              
              <div>
                <div className="text-4xl text-primary font-bold mb-2">15,000+</div>
                <p className="text-gray-600">Happy Customers</p>
              </div>
              
              <div>
                <div className="text-4xl text-primary font-bold mb-2">10</div>
                <p className="text-gray-600">Cities Covered</p>
              </div>
              
              <div>
                <div className="text-4xl text-primary font-bold mb-2">5+</div>
                <p className="text-gray-600">Years of Excellence</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default About;
