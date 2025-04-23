import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  text?: string;
  cc?: string | string[];
  bcc?: string | string[];
}

export const sendEmail = async (options: EmailOptions) => {
  try {
    // Ensure a consistent sender email
    const sender = options.from || "Nomadsafari Holidays <info@mynomadsafariholidays.in>";
    
    console.log('[EMAIL] Sending email:', {
      to: options.to,
      subject: options.subject,
      from: sender,
    });
    
    const { data, error } = await supabase.functions.invoke("send-email", {
      body: {
        ...options,
        from: sender
      }
    });

    if (error) {
      console.error("[EMAIL] Error from edge function:", error);
      throw error;
    }

    console.log('[EMAIL] Response from edge function:', data);
    
    if (!data.success) {
      console.error("[EMAIL] Edge function reported failure:", data);
      throw new Error(data.message || "Email sending failed");
    }
    
    return data;
  } catch (error) {
    console.error("[EMAIL] Failed to send email:", error);
    
    // Show a toast notification about the email issue
    toast.error(
      "Email delivery is temporarily unavailable. Our team has been notified about this issue."
    );
    
    // Try to log the error for debugging
    try {
      console.log("[EMAIL] Email that failed to send:", JSON.stringify({
        to: options.to,
        subject: options.subject,
        from: options.from || "Nomadsafari Holidays <info@mynomadsafariholidays.in>"
      }));
    } catch (logError) {
      console.error("[EMAIL] Failed to log email details:", logError);
    }
    
    throw error;
  }
};

export const sendBookingConfirmation = async (
  customerEmail: string, 
  customerName: string, 
  bookingDetails: {
    tripName: string;
    startDate: string;
    endDate: string;
    destination: string;
    packageCost: string;
    bookingId: string;
  }
) => {
  const { tripName, startDate, endDate, destination, packageCost, bookingId } = bookingDetails;
  
  return sendEmail({
    to: customerEmail,
    subject: `Booking Confirmation - ${tripName}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2A9D8F;">Booking Confirmation</h1>
        <p>Dear ${customerName},</p>
        <p>Thank you for choosing Nomadsafari Holidays! We're excited to confirm your booking.</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h2 style="color: #2A9D8F; margin-top: 0;">Booking Details</h2>
          <p><strong>Booking ID:</strong> ${bookingId}</p>
          <p><strong>Trip:</strong> ${tripName}</p>
          <p><strong>Destination:</strong> ${destination}</p>
          <p><strong>Travel Period:</strong> ${startDate} to ${endDate}</p>
          <p><strong>Package Cost:</strong> ${packageCost}</p>
        </div>
        
        <p>A representative will contact you shortly with more details about your upcoming trip.</p>
        <p>If you have any questions, please don't hesitate to contact us.</p>
        
        <p>Safe travels!</p>
        <p>Warm regards,<br>Nomadsafari Holidays Team</p>
      </div>
    `,
  });
};

export const sendPaymentReminder = async (
  customerEmail: string, 
  customerName: string, 
  paymentDetails: {
    tripName: string;
    dueDate: string;
    amountDue: string;
    bookingId: string;
  }
) => {
  const { tripName, dueDate, amountDue, bookingId } = paymentDetails;
  
  return sendEmail({
    to: customerEmail,
    subject: `Payment Reminder for ${tripName}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2A9D8F;">Payment Reminder</h1>
        <p>Dear ${customerName},</p>
        <p>This is a friendly reminder regarding the pending payment for your upcoming trip.</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h2 style="color: #2A9D8F; margin-top: 0;">Payment Details</h2>
          <p><strong>Booking ID:</strong> ${bookingId}</p>
          <p><strong>Trip:</strong> ${tripName}</p>
          <p><strong>Amount Due:</strong> ${amountDue}</p>
          <p><strong>Due Date:</strong> ${dueDate}</p>
        </div>
        
        <p>Please ensure the payment is made before the due date to avoid any issues with your booking.</p>
        <p>If you have already made the payment, please disregard this message.</p>
        
        <p>Thank you for choosing Nomadsafari Holidays!</p>
        <p>Warm regards,<br>Nomadsafari Holidays Team</p>
      </div>
    `,
  });
};

export const sendItinerary = async (
  customerEmail: string, 
  customerName: string, 
  itineraryDetails: {
    tripName: string;
    startDate: string;
    endDate: string;
    destination: string;
    itineraryHtml: string;
    bookingId: string;
  }
) => {
  const { tripName, startDate, endDate, destination, itineraryHtml, bookingId } = itineraryDetails;
  
  return sendEmail({
    to: customerEmail,
    subject: `Your Itinerary for ${tripName}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2A9D8F;">Your Travel Itinerary</h1>
        <p>Dear ${customerName},</p>
        <p>We're pleased to share your detailed itinerary for your upcoming trip.</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h2 style="color: #2A9D8F; margin-top: 0;">Trip Details</h2>
          <p><strong>Booking ID:</strong> ${bookingId}</p>
          <p><strong>Trip:</strong> ${tripName}</p>
          <p><strong>Destination:</strong> ${destination}</p>
          <p><strong>Travel Period:</strong> ${startDate} to ${endDate}</p>
        </div>
        
        <h2 style="color: #2A9D8F;">Detailed Itinerary</h2>
        ${itineraryHtml}
        
        <p>We recommend saving or printing this itinerary for your reference during the trip.</p>
        <p>If you have any questions about your itinerary, please contact us.</p>
        
        <p>We look forward to making your trip memorable!</p>
        <p>Warm regards,<br>Nomadsafari Holidays Team</p>
      </div>
    `,
  });
};
