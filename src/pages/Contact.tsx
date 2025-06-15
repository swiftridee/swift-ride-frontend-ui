
import { useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@/components/ui/sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <>
      <Helmet>
        <title>Contact Us - Swift Ride</title>
        <meta name="description" content="Get in touch with Swift Ride. Contact our team for bookings, inquiries, or support." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-20 pb-16">
        {/* Hero Section */}
        <div className="bg-primary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Have questions or need assistance? Our team is ready to help you with any inquiries regarding our vehicle rental services.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 h-full">
                <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full text-primary mr-4">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Our Location</h3>
                      <p className="text-gray-600">Swift Ride, Sargodha Road, Near Crescent Textile Mills, Faisalabad</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full text-primary mr-4">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email Us</h3>
                      <p className="text-gray-600">
                        <a href="mailto:contactswiftride@gmail.com" className="hover:text-primary transition-colors">contactswiftride@gmail.com</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full text-primary mr-4">
                      <i className="fas fa-phone-alt"></i>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Call Us</h3>
                      <p className="text-gray-600">
                        <a href="tel:+92-21-1234-5678" className="hover:text-primary transition-colors">+92 (21) 1234-5678</a>
                      </p>
                      <p className="text-gray-600">
                        <a href="tel:+92-309-1234567" className="hover:text-primary transition-colors">+92 309 1234567</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full text-primary mr-4">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Working Hours</h3>
                      <p className="text-gray-600">Monday - Saturday: 9:00 AM - 10:00 PM</p>
                      <p className="text-gray-600">Sunday: 10:00 AM - 8:00 PM</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Follow Us</h3>
                    <div className="flex space-x-4">
                      <a href="https://facebook.com" className="bg-gray-200 hover:bg-primary hover:text-white text-gray-700 p-2 rounded-full transition-colors" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="https://twitter.com" className="bg-gray-200 hover:bg-primary hover:text-white text-gray-700 p-2 rounded-full transition-colors" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="https://instagram.com" className="bg-gray-200 hover:bg-primary hover:text-white text-gray-700 p-2 rounded-full transition-colors" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a href="https://linkedin.com" className="bg-gray-200 hover:bg-primary hover:text-white text-gray-700 p-2 rounded-full transition-colors" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                      placeholder="Enter message subject"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                      placeholder="Enter your message"
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary py-2 px-6 flex items-center"
                    >
                      {isSubmitting ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <i className="fas fa-paper-plane ml-2"></i>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          {/* Google Map */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-6">Our Location</h2>
            <div className="h-96 rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2734.488285553182!2d73.08629206842288!3d31.449741938139816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39224205235bcd5b%3A0x8337c12ad0853b0a!2sAl-Halal%20Travels!5e1!3m2!1sen!2s!4v1748013935923!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Swift Ride Location"
              ></iframe>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Contact;
