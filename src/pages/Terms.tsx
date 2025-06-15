
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions - Swift Ride</title>
        <meta name="description" content="Terms and conditions for using Swift Ride vehicle rental services." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last Updated: May 20, 2025
            </p>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the Swift Ride website, mobile applications, or any services provided by Swift Ride (collectively, the "Services"), you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our Services.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">2. Eligibility</h2>
              <p>
                To use our Services, you must be at least 18 years old and possess a valid driver's license. You must provide accurate, complete, and up-to-date information during the registration process and keep your account information updated.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">3. Account Registration</h2>
              <p>
                When you create an account with Swift Ride, you are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">4. Rental Terms</h2>
              <p>
                4.1. <strong>Booking and Cancellation:</strong> All bookings are subject to vehicle availability. Cancellation policies vary by vehicle type and rental duration. Cancellations made 48 hours before the scheduled pickup time will receive a full refund. Cancellations within 48 hours may be subject to a cancellation fee.
              </p>
              <p>
                4.2. <strong>Vehicle Pickup and Return:</strong> You agree to pick up and return the vehicle at the agreed-upon time and location. Late returns may result in additional charges.
              </p>
              <p>
                4.3. <strong>Vehicle Use:</strong> You agree to use the vehicle only for lawful purposes and in accordance with all applicable traffic laws and regulations. Off-road driving and racing are strictly prohibited.
              </p>
              <p>
                4.4. <strong>Damages:</strong> You are responsible for any damage to the vehicle during the rental period. Swift Ride offers optional insurance coverage at additional cost.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">5. Payment Terms</h2>
              <p>
                5.1. <strong>Rates and Charges:</strong> The total rental fee will be disclosed at the time of booking. Additional charges may apply for late returns, damages, or extra services.
              </p>
              <p>
                5.2. <strong>Payment Methods:</strong> Swift Ride accepts major credit cards, debit cards, and other payment methods as specified on our website or mobile application.
              </p>
              <p>
                5.3. <strong>Security Deposit:</strong> A security deposit may be required at the time of pickup and will be refunded upon the vehicle's satisfactory return.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">6. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Swift Ride shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our Services.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">7. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless Swift Ride, its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from your use of the Services or violation of these Terms.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">8. Modifications to Terms</h2>
              <p>
                Swift Ride reserves the right to modify these Terms & Conditions at any time. We will notify users of significant changes via email or through a notice on our website or mobile application. Your continued use of the Services after such modifications constitutes your acceptance of the updated terms.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">9. Governing Law</h2>
              <p>
                These Terms & Conditions shall be governed by and construed in accordance with the laws of Pakistan, without regard to its conflict of law provisions.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold mb-4">10. Contact Us</h2>
              <p>
                If you have any questions about these Terms & Conditions, please contact us at:
              </p>
              <address className="not-italic">
                Swift Ride<br />
                General Bus Stand Faisalabad, Pakistan<br />
                Email: contactswiftride@gmail.com<br />
                Phone: +92 (21) 1234-5678
              </address>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Terms;
