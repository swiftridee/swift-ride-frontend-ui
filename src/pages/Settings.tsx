
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserContext";
import Navbar from "@/components/Navbar";

const Settings = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [emailPreferences, setEmailPreferences] = useState({
    bookingConfirmations: true,
    promotions: false,
    newsletters: true,
    systemUpdates: true
  });
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    
    // Simulate password change
    setIsLoading(true);
    setTimeout(() => {
      toast.success("Password updated successfully");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      setIsLoading(false);
    }, 1000);
  };
  
  const handleEmailPrefChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setEmailPreferences(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const saveEmailPreferences = () => {
    toast.success("Email preferences updated");
  };

  const handleFeedbackSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    toast.success("Feedback submitted. Thank you!");
    // Reset form
    e.currentTarget.reset();
  };
  
  if (!user) {
    return null; // Don't render anything if not logged in
  }
  
  return (
    <>
      <Helmet>
        <title>Settings - Swift Ride</title>
        <meta name="description" content="Manage your account settings on Swift Ride." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
            
            {/* Change Password Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Change Password</h2>
                <p className="text-gray-600 text-sm mt-1">Update your password to keep your account secure</p>
              </div>
              
              <form onSubmit={handlePasswordSubmit} className="p-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        id="currentPassword"
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        <i className={`fas ${showCurrentPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400`}></i>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        id="newPassword"
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        <i className={`fas ${showNewPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400`}></i>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400`}></i>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Updating...
                      </span>
                    ) : "Update Password"}
                  </button>
                </div>
              </form>
            </div>
            
            {/* General Settings */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold">General Settings</h2>
                <p className="text-gray-600 text-sm mt-1">Manage your email preferences</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Booking Confirmations</h3>
                      <p className="text-sm text-gray-600">Receive emails for booking confirmations and receipts</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="bookingConfirmations"
                        checked={emailPreferences.bookingConfirmations} 
                        onChange={handleEmailPrefChange}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Promotional Emails</h3>
                      <p className="text-sm text-gray-600">Receive emails about discounts and special offers</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="promotions"
                        checked={emailPreferences.promotions} 
                        onChange={handleEmailPrefChange}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Newsletters</h3>
                      <p className="text-sm text-gray-600">Receive monthly newsletter with updates and tips</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="newsletters"
                        checked={emailPreferences.newsletters} 
                        onChange={handleEmailPrefChange}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">System Updates</h3>
                      <p className="text-sm text-gray-600">Receive notifications about system updates and changes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="systemUpdates"
                        checked={emailPreferences.systemUpdates} 
                        onChange={handleEmailPrefChange}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    onClick={saveEmailPreferences}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
            
            {/* Help & Feedback */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Help & Feedback</h2>
                <p className="text-gray-600 text-sm mt-1">We'd love to hear from you</p>
              </div>
              
              <div className="p-6">
                <form onSubmit={handleFeedbackSubmit}>
                  <div className="mb-4">
                    <label htmlFor="feedbackType" className="block text-sm font-medium text-gray-700 mb-1">Feedback Type</label>
                    <select
                      id="feedbackType"
                      name="feedbackType"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    >
                      <option value="general">General Feedback</option>
                      <option value="bug">Report a Bug</option>
                      <option value="feature">Feature Request</option>
                      <option value="complaint">Complaint</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="feedbackMessage" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                    <textarea
                      id="feedbackMessage"
                      name="feedbackMessage"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                      placeholder="Please share your thoughts with us..."
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
                  >
                    Submit Feedback
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Settings;
