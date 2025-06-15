
const testimonials = [
  {
    content: "Swift Ride provided an excellent service for our corporate event. The bus was clean, driver was punctual, and the booking process was seamless.",
    author: "Ahmed Khan",
    role: "Event Manager",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    content: "I rented a car for a family trip and was impressed by the quality of the vehicle and the competitive pricing. Will definitely use Swift Ride again!",
    author: "Fatima Ahmed",
    role: "Customer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    content: "The minibus we rented was perfect for our university trip. Clean, comfortable, and the driver was very professional. Highly recommended!",
    author: "Hassan Ali",
    role: "University Professor",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience with Swift Ride.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <div className="text-primary text-4xl">
                  <i className="fas fa-quote-left"></i>
                </div>
              </div>
              <p className="text-gray-600 mb-6 text-center">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
