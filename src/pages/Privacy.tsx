
import React from "react";
import { Helmet } from "react-helmet";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | My Nomadsafari Holidays</title>
        <meta 
          name="description" 
          content="Read about how My Nomadsafari Holidays protects and handles your personal data." 
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <Breadcrumb className="mb-8">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>Privacy Policy</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

        <div className="prose prose-lg max-w-none">
          <p>
            At My Nomadsafari Holidays, we are committed to protecting your privacy and ensuring the security
            of your personal information. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you visit our website or use our services.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
          <p>
            We may collect personal information that you provide directly to us when you:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Make a booking or reservation</li>
            <li>Create an account on our website</li>
            <li>Sign up for our newsletter</li>
            <li>Contact us via email, phone, or contact form</li>
            <li>Participate in surveys or promotions</li>
          </ul>
          <p>
            The types of personal information we may collect include:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Name, email address, phone number, and postal address</li>
            <li>Payment information (credit card details, billing address)</li>
            <li>Passport details and other identification information</li>
            <li>Travel preferences and special requirements</li>
            <li>Information about your bookings and purchases</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
          <p>
            We may use the information we collect for various purposes, including to:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Process your bookings and provide requested services</li>
            <li>Communicate with you about your bookings or inquiries</li>
            <li>Send you marketing communications and newsletters</li>
            <li>Improve our website, services, and customer experience</li>
            <li>Comply with legal obligations and resolve disputes</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">3. Information Sharing and Disclosure</h2>
          <p>
            We may share your personal information with:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Service providers (hotels, airlines, tour operators) necessary to fulfill your booking</li>
            <li>Payment processors to handle transactions</li>
            <li>Business partners with whom we offer co-branded services or promotions</li>
            <li>Legal authorities when required by law or to protect our rights</li>
          </ul>
          <p>
            We do not sell or rent your personal information to third parties for their marketing purposes
            without your explicit consent.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">4. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against
            unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
            over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">5. Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>The right to access, correct, or delete your personal information</li>
            <li>The right to restrict or object to our processing of your personal information</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent at any time</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information provided in the "Contact Us" section.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">6. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and collect
            certain information. Cookies are small data files that are stored on your device. You can
            instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">7. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by
            posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p>
            Email: info@mynomadsafari.com<br />
            Phone: +1 (555) 123-4567<br />
            Address: 123 Travel Street, Wanderlust City, 10001
          </p>

          <p className="mt-8">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}
          </p>
        </div>
      </div>
    </>
  );
};

export default Privacy;
