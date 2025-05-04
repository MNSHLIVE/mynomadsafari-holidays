
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
    const hostname = "smtp.hostinger.com";
    const port = 465;
    const username = "info@mynomadsafariholidays.in";
    const password = Deno.env.get("SMTP_PASSWORD");
    
    console.log(`[SEND-EMAIL] SMTP Config: ${hostname}:${port}`);
    console.log(`[SEND-EMAIL] SMTP Username: ${username}`);
    
    if (!password) {
      console.error("[SEND-EMAIL] SMTP password not found in environment variables");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "SMTP password not configured",
          error_type: "config_error" 
        }),
        { 
          status: 500, 
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders
          } 
        }
      );
    } else {
      console.log(`[SEND-EMAIL] SMTP Password found with length: ${password.length}`);
    }

    // Connect to SMTP server
    try {
      console.log("[SEND-EMAIL] Initializing SMTP client");
      
      const client = new SMTPClient({
        connection: {
          hostname,
          port,
          tls: true,
          auth: {
            username,
            password,
          },
        },
        debug: true, // Add debug mode to get more verbose logs
      });

      // Build email object
      const emailData = {
        from: from,
        to: to,
        subject: subject,
        content: text || "",
        html: html || "",
        ...(cc && { cc }),
        ...(bcc && { bcc }),
      };
      
      console.log("[SEND-EMAIL] Preparing to send email");

      try {
        // Send email
        console.log("[SEND-EMAIL] Attempting to send email...");
        const sendResult = await client.send(emailData);
        console.log("[SEND-EMAIL] Email sent successfully:", sendResult);
        
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
      } catch (emailError) {
        console.error("[SEND-EMAIL] Error during email sending:", emailError.message);
        console.error("[SEND-EMAIL] Error details:", JSON.stringify(emailError));
        
        // Try to close the connection regardless of error
        try {
          await client.close();
          console.log("[SEND-EMAIL] SMTP connection closed after error");
        } catch (closeError) {
          console.error("[SEND-EMAIL] Error closing SMTP connection:", closeError);
        }
        
        throw emailError; // Rethrow to be caught by outer try/catch
      }
    } catch (sendError) {
      console.error("[SEND-EMAIL] Error during send operation:", sendError.message);
      console.error("[SEND-EMAIL] Error details:", sendError);
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: sendError.message,
          details: JSON.stringify(sendError),
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
        error: error.message,
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
