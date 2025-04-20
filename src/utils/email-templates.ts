
/**
 * Creates HTML for thank you emails based on the form type
 * @param name Recipient's name
 * @param formType The type of form submitted ('contact', 'query', etc.)
 * @returns HTML string for the email
 */
export const createThankYouEmailHTML = (name: string, formType: 'contact' | 'query' | 'subscription') => {
  const subject = formType === 'contact' 
    ? 'Thank you for contacting us!' 
    : formType === 'query'
    ? 'Thank you for your travel query!'
    : 'Thank you for subscribing!';

  const message = formType === 'contact'
    ? 'We have received your message and our team will get back to you within 24 hours.'
    : formType === 'query'
    ? 'We have received your travel query and our expert team will prepare a customized itinerary for you shortly.'
    : 'You are now subscribed to our newsletter. Get ready for exclusive travel deals and inspiring destinations!';

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://mynomadsafariholidays.in/lovable-uploads/3e515213-741f-498e-add3-8b8f70b7fe4c.png" alt="My Nomadsafari Holidays" style="max-width: 150px;">
      </div>
      
      <h1 style="color: #2A9D8F; margin-top: 0;">${subject}</h1>
      <p>Dear ${name},</p>
      <p>${message}</p>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h2 style="color: #2A9D8F; margin-top: 0; font-size: 18px;">What happens next?</h2>
        <p>
          ${formType === 'contact' || formType === 'query' 
            ? 'One of our travel experts will review your information and contact you via email or phone to discuss your requirements in more detail.' 
            : 'You will start receiving our newsletter with the latest travel deals, destination guides, and travel tips.'}
        </p>
      </div>
      
      <p>If you have any urgent queries, please feel free to contact us directly:</p>
      <p>Mumbai: +91 9968682200<br>Delhi: +91 7042910449<br>Email: info@mynomadsafariholidays.in</p>
      
      <p>Thank you for choosing My Nomadsafari Holidays!</p>
      <p>Warm regards,<br>The Nomadsafari Team</p>
      
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #888; font-size: 12px;">
        <p>© ${new Date().getFullYear()} My Nomadsafari Holidays. All rights reserved.</p>
      </div>
    </div>
  `;
};
