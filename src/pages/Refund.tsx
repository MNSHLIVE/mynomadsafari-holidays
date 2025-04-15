
import React from "react";
import { Helmet } from "react-helmet";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

const Refund = () => {
  return (
    <>
      <Helmet>
        <title>Refund Policy | My Nomadsafari Holidays</title>
        <meta 
          name="description" 
          content="Learn about the refund policy for bookings made with My Nomadsafari Holidays." 
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
            <BreadcrumbLink>Refund Policy</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <h1 className="text-3xl font-bold mb-8">Refund Policy</h1>

        <div className="prose prose-lg max-w-none">
          <p>
            At My Nomadsafari Holidays, we understand that plans can change. This Refund Policy outlines 
            the terms and conditions for refunds when you cancel a booking with us.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">1. Cancellation and Refund Schedule</h2>
          <p>
            The following refund schedule applies to all tour packages unless specified otherwise at the time of booking:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li><strong>Cancellation more than 30 days before departure:</strong> 75% refund of the total amount paid</li>
            <li><strong>Cancellation 15-29 days before departure:</strong> 50% refund of the total amount paid</li>
            <li><strong>Cancellation 7-14 days before departure:</strong> 25% refund of the total amount paid</li>
            <li><strong>Cancellation less than 7 days before departure:</strong> No refund</li>
          </ul>
          <p>
            Please note that certain promotional offers, special deals, or custom packages may have different
            cancellation and refund terms, which will be communicated at the time of booking.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">2. Refund Process</h2>
          <p>
            To request a refund, please contact our customer service team via email at refunds@mynomadsafari.com
            or call us at +1 (555) 123-4567. Please include your booking reference number and the reason for cancellation.
          </p>
          <p>
            Once your refund request is approved:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Refunds for credit card payments will be processed back to the original credit card used for booking.</li>
            <li>Refunds for bank transfers will be processed to the bank account provided by you.</li>
            <li>Processing time for refunds is typically 7-14 business days, depending on your payment method and financial institution.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">3. Non-Refundable Items</h2>
          <p>
            The following items are generally non-refundable:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Travel insurance premiums</li>
            <li>Visa application fees</li>
            <li>Processing fees charged by payment gateways</li>
            <li>Any service fees or charges explicitly marked as non-refundable at the time of booking</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">4. Cancellation by My Nomadsafari Holidays</h2>
          <p>
            In the rare event that we need to cancel a tour due to unforeseen circumstances, natural disasters,
            insufficient participation, or any other reason, we will offer you:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>A full refund of all amounts paid, or</li>
            <li>The option to book an alternative tour (any price difference will be either charged or refunded accordingly)</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">5. Changes to Bookings</h2>
          <p>
            If you need to make changes to your booking, such as changing the date or destination:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Changes made more than 30 days before departure may be accommodated without penalty, subject to availability.</li>
            <li>Changes made within 30 days of departure may incur a change fee of up to 20% of the tour cost.</li>
            <li>If the new booking is more expensive, you will need to pay the difference.</li>
            <li>If the new booking is less expensive, the difference may be provided as a travel credit for future use.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">6. Force Majeure</h2>
          <p>
            In cases of force majeure (such as natural disasters, pandemics, war, civil unrest, or other
            extraordinary circumstances beyond our control), our standard refund policy may be modified.
            We will strive to offer reasonable alternatives or credits for future travel.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">7. Special Circumstances</h2>
          <p>
            We understand that emergencies happen. In case of serious illness, injury, or bereavement
            that prevents you from traveling, please contact us as soon as possible with supporting documentation.
            We will review each case individually and may offer more favorable refund terms at our discretion.
          </p>

          <p className="mt-8">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}
          </p>
        </div>
      </div>
    </>
  );
};

export default Refund;
