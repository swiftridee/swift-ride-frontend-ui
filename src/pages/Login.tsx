
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserContext";

const Login = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Demo users
      if (formData.email === "user@example.com" && formData.password === "password") {
        login({
          id: "user123",
          name: "Demo User",
          email: formData.email,
          role: "user"
        });
        toast.success("Login successful!");
        navigate("/");
      } else if (formData.email === "admin@example.com" && formData.password === "password") {
        login({
          id: "admin123",
          name: "Admin User",
          email: formData.email,
          role: "admin"
        });
        toast.success("Admin login successful!");
        navigate("/admin");
      } else {
        toast.error("Invalid email or password");
      }
      
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <>
      <Helmet>
        <title>Login - Swift Ride</title>
        <meta name="description" content="Login to your Swift Ride account to book vehicles and manage your reservations." />
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 sm:p-8">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <span className="text-3xl font-bold text-primary">Swift<span className="text-secondary">Ride</span></span>
            </Link>
            <h1 className="text-2xl font-bold mt-6 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Login to your account to continue</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-gray-400"></i>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-gray-400"></i>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400`}></i>
                </button>
              </div>
              <div className="flex justify-end mt-1">
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-2 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Logging in...
                  </>
                ) : "Login"}
              </button>
            </div>
            
            <p className="text-center text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
