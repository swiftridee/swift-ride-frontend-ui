
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Swift Ride</title>
        <meta name="description" content="Privacy policy for Swift Ride vehicle rental services." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last Updated: May 20, 2025
            </p>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">1. Introduction</h2>
              <p>
                At Swift Ride, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and services (collectively, the "Services").
              </p>
              <p>
                Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the Services.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">2. Information We Collect</h2>
              <p>
                2.1. <strong>Personal Information:</strong> We may collect personal information that you provide directly to us, such as:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Name, email address, phone number, and postal address</li>
                <li>Driver's license details and date of birth</li>
                <li>Payment information (credit card details, billing address)</li>
                <li>User account information (username, password)</li>
                <li>Communication preferences</li>
              </ul>
              <p>
                2.2. <strong>Usage Information:</strong> We may automatically collect information about your use of our Services, including:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>IP address, browser type, operating system</li>
                <li>Pages viewed, time spent on pages, links clicked</li>
                <li>Location information (with your consent)</li>
                <li>Device information (device type, mobile network information)</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">3. How We Use Your Information</h2>
              <p>
                We may use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Providing, maintaining, and improving our Services</li>
                <li>Processing and completing transactions</li>
                <li>Sending you technical notices, updates, security alerts, and support messages</li>
                <li>Responding to your comments, questions, and requests</li>
                <li>Personalizing your experience on our Services</li>
                <li>Monitoring and analyzing trends, usage, and activities</li>
                <li>Marketing and advertising purposes</li>
                <li>Detecting, investigating, and preventing fraudulent transactions and other illegal activities</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">4. Sharing Your Information</h2>
              <p>
                We may share your information with:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Service providers who perform services on our behalf</li>
                <li>Professional advisors (lawyers, accountants, insurers)</li>
                <li>Law enforcement, government authorities, or other third parties when required by law</li>
                <li>Business partners with your consent</li>
                <li>In connection with a merger, sale of company assets, financing, or acquisition</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">5. Your Rights and Choices</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Accessing, correcting, updating, or requesting deletion of your information</li>
                <li>Opting out of marketing communications</li>
                <li>Setting browser or device preferences regarding cookies</li>
                <li>Requesting a copy of your personal data</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided in the "Contact Us" section.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">6. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet or electronic storage is completely secure, so we cannot guarantee absolute security.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">7. Data Retention</h2>
              <p>
                We will retain your personal information only for as long as necessary to fulfill the purposes for which we collected it, including for legal, accounting, or reporting requirements.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">8. Children's Privacy</h2>
              <p>
                Our Services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we learn we have collected personal information from a child under 18, we will delete this information.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">9. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold mb-4">10. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
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

export default Privacy;
