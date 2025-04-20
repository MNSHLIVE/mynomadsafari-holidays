
export const createThankYouEmailHTML = (name: string, formType: 'contact' | 'query') => {
  const logoUrl = "https://mynomadsafariholidays.in/MNSH-LOGO/3e515213-741f-498e-add3-8b8f70b7fe4c.png";
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <img src="${logoUrl}" alt="Nomadsafari Holidays Logo" style="max-width: 200px; height: auto;" />
      </div>
      
      <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h1 style="color: #2A9D8F; margin-bottom: 20px; text-align: center;">Thank You for Reaching Out!</h1>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333333;">Dear ${name},</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333333;">
          ${formType === 'contact' 
            ? 'Thank you for contacting Nomadsafari Holidays. We have received your message and appreciate your interest in our services.' 
            : 'Thank you for your travel query with Nomadsafari Holidays. We have received your request and are excited to help plan your upcoming journey.'}
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333333;">
          Our team will review your ${formType === 'contact' ? 'message' : 'travel requirements'} and get back to you within 24 hours with a detailed response${formType === 'query' ? ' and personalized travel suggestions' : ''}.
        </p>
        
        <div style="margin: 30px 0; padding: 20px; background-color: #f8f9fa; border-radius: 6px;">
          <h2 style="color: #2A9D8F; font-size: 18px; margin-bottom: 15px;">Contact Information</h2>
          <p style="margin: 5px 0; color: #666666;">
            <strong>Phone:</strong> +91 9968682200 (Mumbai) | +91 7042910449 (Delhi)
          </p>
          <p style="margin: 5px 0; color: #666666;">
            <strong>Email:</strong> info@mynomadsafariholidays.in
          </p>
          <p style="margin: 5px 0; color: #666666;">
            <strong>Website:</strong> www.mynomadsafariholidays.in
          </p>
        </div>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333333;">
          We look forward to being part of your travel journey!
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333333;">
          Best regards,<br />
          Team Nomadsafari Holidays
        </p>
      </div>
      
      <div style="text-align: center; margin-top: 20px; color: #666666; font-size: 12px;">
        <p>© ${new Date().getFullYear()} Nomadsafari Holidays. All rights reserved.</p>
      </div>
    </div>
  `;
};
