
const features = [
  {
    icon: "fa-check-circle",
    title: "Quality Vehicles",
    description: "Our fleet consists of well-maintained, modern vehicles for a safe and comfortable experience."
  },
  {
    icon: "fa-dollar-sign",
    title: "Competitive Rates",
    description: "We offer competitive pricing with transparent fees and no hidden charges."
  },
  {
    icon: "fa-clock",
    title: "Flexible Durations",
    description: "Choose from 12-hour rentals, 2-day, or 3-day plans based on your needs."
  },
  {
    icon: "fa-user-tie",
    title: "Professional Drivers",
    description: "Our experienced drivers are professional, punctual, and familiar with all routes."
  },
  {
    icon: "fa-shield-alt",
    title: "Insurance Coverage",
    description: "All our vehicles come with comprehensive insurance for your peace of mind."
  },
  {
    icon: "fa-headset",
    title: "24/7 Support",
    description: "Our customer support team is available around the clock to assist you."
  }
];

const FeatureSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Swift Ride?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We strive to provide the best vehicle rental experience with quality service and vehicles.
            Here's what sets us apart from the competition.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-gray-50">
              <div className="text-primary text-3xl mb-4">
                <i className={`fas ${feature.icon}`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
