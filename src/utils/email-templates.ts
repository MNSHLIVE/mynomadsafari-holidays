
// Create HTML email templates for various types of emails

export const createThankYouEmailHTML = (name: string, type: 'query' | 'quote' | 'subscription' | 'contact' | 'ticket' | 'visa' = 'query') => {
  // Create title and message based on type
  let title: string;
  let message: string;
  
  switch (type) {
    case 'quote':
      title = 'Thank You for Your Quote Request';
      message = 'We\'ve received your quote request and will get back to you within 24 hours.';
      break;
    case 'subscription':
      title = 'Thank You for Subscribing';
      message = 'We\'ve added you to our newsletter and will keep you updated with the latest travel deals.';
      break;
    case 'contact':
      title = 'Thank You for Contacting Us';
      message = 'We\'ve received your message and will get back to you as soon as possible.';
      break;
    case 'ticket':
      title = 'Thank You for Your Ticket Request';
      message = 'We\'ve received your ticket request and will get back to you within 24 hours.';
      break;
    case 'visa':
      title = 'Thank You for Your Visa Query';
      message = 'We\'ve received your visa application query and will get back to you within 24 hours.';
      break;
    default:
      title = 'Thank You for Your Inquiry';
      message = 'We\'ve received your inquiry and will get back to you within 24 hours.';
  }

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2A9D8F;">${title}</h1>
      <p>Dear ${name},</p>
      <p>Thank you for choosing Nomadsafari Holidays! ${message}</p>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p>Our team is reviewing your request and will prepare a personalized response for you.</p>
        <p>If you have any urgent questions in the meantime, feel free to contact us directly:</p>
        <p><strong>Phone:</strong> +91-9829080100</p>
        <p><strong>Email:</strong> info@mynomadsafariholidays.in</p>
      </div>
      
      <p>We look forward to helping you plan an unforgettable journey!</p>
      <p>Warm regards,<br>Nomadsafari Holidays Team</p>
    </div>
  `;
};

// Add other email templates as needed
export const createAdminNotificationEmailHTML = (formType: string, details: Record<string, any>) => {
  const detailsHTML = Object.entries(details)
    .map(([key, value]) => {
      // Format the key name to be more readable
      const formattedKey = key
        .replace(/_/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      return `<p><strong>${formattedKey}:</strong> ${value || 'Not specified'}</p>`;
    })
    .join('');

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2A9D8F;">New ${formType} Submission</h1>
      <p>A new ${formType} form has been submitted on your website.</p>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h2 style="color: #2A9D8F; margin-top: 0;">Form Details</h2>
        ${detailsHTML}
      </div>
      
      <p>Please review this submission and take appropriate action.</p>
      <p>This is an automated notification from your website.</p>
    </div>
  `;
};

// Plain text fallback for email clients that don't support HTML
export const createPlainTextEmail = (content: string): string => {
  // Simple conversion that removes HTML tags
  return content.replace(/<[^>]*>?/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
};
