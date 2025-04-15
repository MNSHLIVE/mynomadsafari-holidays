
import React from "react";
import { Helmet } from "react-helmet";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | My Nomadsafari Holidays</title>
        <meta 
          name="description" 
          content="Read the terms and conditions for booking travel services with My Nomadsafari Holidays." 
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
            <BreadcrumbLink>Terms & Conditions</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <h1 className="text-3xl font-bold mb-8">Terms & Conditions</h1>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-xl font-semibold mt-8 mb-4">1. Booking and Payment</h2>
          <p>
            Welcome to My Nomadsafari Holidays. These terms and conditions govern your use of our services
            and website. By making a booking or using our services, you agree to comply with these terms.
          </p>
          <p>
            <strong>1.1 Booking Confirmation:</strong> A booking is confirmed upon receipt of a deposit payment
            of 25% of the total tour cost, unless otherwise specified.
          </p>
          <p>
            <strong>1.2 Payment Schedule:</strong> The balance payment is due 30 days prior to the start of
            the tour. For bookings made within 30 days of departure, full payment is required at the time of booking.
          </p>
          <p>
            <strong>1.3 Payment Methods:</strong> We accept payments via bank transfer, credit card, and
            online payment gateways. All payments are to be made in the currency specified in the invoice.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">2. Cancellation Policy</h2>
          <p>
            <strong>2.1 Cancellation by Client:</strong> Cancellations must be communicated in writing.
            The following cancellation charges apply:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>More than 30 days before departure: 25% of the total tour cost</li>
            <li>15-29 days before departure: 50% of the total tour cost</li>
            <li>7-14 days before departure: 75% of the total tour cost</li>
            <li>Less than 7 days before departure or no-show: 100% of the total tour cost</li>
          </ul>
          <p>
            <strong>2.2 Cancellation by Company:</strong> My Nomadsafari Holidays reserves the right to cancel
            any tour due to unforeseen circumstances, natural disasters, or inadequate participation. In such cases,
            a full refund will be provided or alternative tour options will be offered.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">3. Travel Insurance</h2>
          <p>
            We strongly recommend that all clients obtain comprehensive travel insurance to cover cancellation,
            medical expenses, personal accident, personal baggage, money, and public liability. Such insurance should
            cover the full duration of the tour.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">4. Travel Documents and Responsibilities</h2>
          <p>
            <strong>4.1 Documents:</strong> Clients are responsible for ensuring they have valid passports,
            visas, and other necessary travel documents. My Nomadsafari Holidays is not liable for any loss or
            expense due to the client's failure to obtain proper documentation.
          </p>
          <p>
            <strong>4.2 Client Responsibility:</strong> Clients agree to accept the authority and decisions of
            our employees, tour leaders, and agents while on tour. If, in the opinion of such persons, the health,
            level of fitness, or conduct of a client at any time before or after departure appears likely to
            endanger the safe, comfortable, or happy progress of a tour, the client may be excluded from all or
            part of the tour without refund.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">5. Limitation of Liability</h2>
          <p>
            My Nomadsafari Holidays acts as an agent for transportation companies, hotels, and other service
            providers and cannot be held liable for any injury, damage, loss, accident, delay, or irregularity
            that may be caused by defect of any vehicle or the negligence or default of any company or person engaged
            in carrying out the arrangements of the tour.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">6. Force Majeure</h2>
          <p>
            My Nomadsafari Holidays shall not be liable for any loss, damage, or expense resulting from war or
            terrorist activities (threatened or actual), civil unrest, industrial action, natural or nuclear
            disasters, fire, adverse weather conditions, technical problems with transport, closure or congestion
            of airports or ports, pandemics or epidemics, or other circumstances amounting to force majeure.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">7. Company Information</h2>
          <p>
            My Nomadsafari Holidays is registered under the laws of [Country] with registration number [Registration Number].
            Our registered office is located at [Full Address].
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">8. Governing Law</h2>
          <p>
            These terms and conditions shall be governed by and construed in accordance with the laws of [Country].
            Any disputes arising under these terms and conditions shall be subject to the exclusive jurisdiction of the
            courts of [Country].
          </p>

          <p className="mt-8">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}
          </p>
        </div>
      </div>
    </>
  );
};

export default Terms;
