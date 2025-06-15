
import { Link } from "react-router-dom";

const categoryData = [
  {
    title: "Cars",
    description: "Comfortable cars for personal travel, family trips, and business use.",
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1936&auto=format&fit=crop",
    link: "/cars",
    icon: "fa-car"
  },
  {
    title: "Buses",
    description: "Large capacity buses perfect for groups, events, or corporate transportation.",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2940&auto=format&fit=crop",
    link: "/buses",
    icon: "fa-bus"
  },
  {
    title: "Mini Buses",
    description: "Medium sized buses ideal for moderate groups and tours.",
    image: "https://images.unsplash.com/photo-1586636186520-da88997ce36c?q=80&w=2940&auto=format&fit=crop",
    link: "/minibuses",
    icon: "fa-shuttle-van"
  },
  {
    title: "Coasters",
    description: "Compact and versatile coasters for small to medium sized groups.",
    image: "https://images.unsplash.com/photo-1543984613-f55ca6a1ba35?q=80&w=2805&auto=format&fit=crop",
    link: "/coasters",
    icon: "fa-truck"
  }
];

const VehicleCategories = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Vehicle Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our diverse fleet of well-maintained vehicles to suit your transportation needs.
            We offer competitive rates and flexible rental plans.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categoryData.map((category, index) => (
            <Link to={category.link} key={index} className="block">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                      <i className={`fas ${category.icon}`}></i>
                    </div>
                    <h3 className="text-xl font-semibold ml-3">{category.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="text-primary hover:text-primary-dark font-medium flex items-center">
                    View Vehicles <i className="fas fa-arrow-right ml-2"></i>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehicleCategories;
