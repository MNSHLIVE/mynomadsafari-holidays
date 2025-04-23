
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.4.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Parse the request body to get email details
    const data = await req.json();
    const { 
      from = "Nomadsafari Holidays <info@mynomadsafariholidays.in>",
      to, 
      subject, 
      html, 
      text, 
      cc, 
      bcc 
    } = data;
    
    console.log(`[SEND-EMAIL] Request received`);
    console.log(`[SEND-EMAIL] To: ${Array.isArray(to) ? to.join(', ') : to}`);
    console.log(`[SEND-EMAIL] Subject: ${subject}`);
    
    // Get SMTP configuration from environment variables
    const hostname = Deno.env.get("SMTP_HOSTNAME") || "smtp.hostinger.com";
    const port = parseInt(Deno.env.get("SMTP_PORT") || "465");
    const username = Deno.env.get("SMTP_USERNAME") || "info@mynomadsafariholidays.in";
    const password = Deno.env.get("SMTP_PASSWORD") || "";
    
    console.log(`[SEND-EMAIL] SMTP Config: ${hostname}:${port}`);
    console.log(`[SEND-EMAIL] SMTP Username: ${username}`);
    
    // Enhanced error handling for missing credentials
    if (!password) {
      console.error("[SEND-EMAIL] ERROR: SMTP Password is missing");
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "SMTP credentials are incomplete. Please check Supabase Edge Function Secrets.",
          error_type: "missing_credentials"
        }),
        { 
          status: 500, 
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders
          } 
        }
      );
    }

    try {
      // Log Hostinger-specific configuration
      console.log("[SEND-EMAIL] Initializing SMTP client with Hostinger configuration");
      
      // Set up the SMTP client with environment variables
      const client = new SMTPClient({
        connection: {
          hostname,
          port,
          tls: true,
          auth: {
            username,
            password,
          },
          // Add debug mode for more detailed logging
          debug: true,
        },
      });

      console.log("[SEND-EMAIL] SMTP client configured");

      // Build email object with detailed logging
      const emailData = {
        from: from,
        to: to,
        subject: subject,
        content: text || "",
        html: html || "",
        ...(cc && { cc }),
        ...(bcc && { bcc }),
      };
      
      console.log("[SEND-EMAIL] Preparing to send email with data:", JSON.stringify({
        from: emailData.from,
        to: emailData.to,
        subject: emailData.subject,
        hasContent: !!emailData.content,
        hasHtml: !!emailData.html,
        hasCC: !!cc,
        hasBCC: !!bcc
      }));

      // Send the email
      const sendResult = await client.send(emailData);
      
      console.log("[SEND-EMAIL] Email sent successfully with result:", sendResult);
      
      // Close the connection
      await client.close();
      console.log("[SEND-EMAIL] SMTP connection closed");
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Email sent successfully',
          details: sendResult
        }),
        { 
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders
          } 
        }
      );
    } catch (smtpError) {
      // Detailed SMTP error logging
      console.error("[SEND-EMAIL] SMTP Error:", smtpError);
      console.error("[SEND-EMAIL] SMTP Error stack:", smtpError.stack);
      
      // Log additional details that might be helpful for debugging
      if (smtpError.code) {
        console.error("[SEND-EMAIL] SMTP Error code:", smtpError.code);
      }
      
      // Check for specific Hostinger-related errors
      let errorDetails = smtpError.message;
      if (smtpError.message.includes("authentication")) {
        errorDetails = "Authentication failed: Please check your SMTP username and password";
      } else if (smtpError.message.includes("connection")) {
        errorDetails = "Connection error: Please check your SMTP hostname and port";
      }
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Failed to send email through SMTP", 
          error: errorDetails,
          error_type: "smtp_error"
        }),
        { 
          status: 500, 
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders
          } 
        }
      );
    }
    
  } catch (error) {
    console.error("[SEND-EMAIL] General error:", error);
    
    // Get more details about the error
    let errorMessage = error.message || "Unknown error";
    let errorDetails;
    
    try {
      errorDetails = JSON.stringify(error, Object.getOwnPropertyNames(error));
    } catch (e) {
      errorDetails = "Could not stringify error";
    }
    
    console.error("[SEND-EMAIL] Error details:", errorDetails);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage,
        details: errorDetails,
        error_type: "general_error"
      }),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        } 
      }
    );
  }
});
