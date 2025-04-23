
// Create HTML email templates for various types of emails

export const createThankYouEmailHTML = (name: string, type: 'query' | 'quote' = 'query') => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2A9D8F;">Thank You for Your ${type === 'quote' ? 'Quote Request' : 'Inquiry'}</h1>
      <p>Dear ${name},</p>
      <p>Thank you for choosing Nomadsafari Holidays! We've received your ${type === 'quote' ? 'quote request' : 'inquiry'} and will get back to you within 24 hours.</p>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p>Our travel experts are reviewing your request and will prepare a personalized response for you.</p>
        <p>If you have any urgent questions in the meantime, feel free to contact us directly:</p>
        <p><strong>Phone:</strong> +91-9829080100</p>
        <p><strong>Email:</strong> info@mynomadsafariholidays.in</p>
      </div>
      
      <p>We look forward to helping you plan an unforgettable journey!</p>
      <p>Warm regards,<br>Nomadsafari Holidays Team</p>
    </div>
  `;
};
