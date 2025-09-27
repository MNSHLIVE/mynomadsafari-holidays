
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
    console.log(`[SEND-EMAIL] Request received at ${new Date().toISOString()}`);
    
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
    
    // Fixed SMTP configuration
    const hostname = "smtp.hostinger.com";
    const port = 465;
    const username = "info@mynomadsafariholidays.in";
    const password = Deno.env.get("SMTP_PASSWORD");
    
    console.log(`[SEND-EMAIL] SMTP Config: ${hostname}:${port}`);
    
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

    let client: SMTPClient | null = null;

    try {
      console.log("[SEND-EMAIL] Initializing SMTP client");
      
      // Create SMTP client with explicit TLS settings
      client = new SMTPClient({
        connection: {
          hostname,
          port,
          tls: true,
          auth: {
            username,
            password,
          },
        },
        pool: false, // Disable connection pooling to ensure fresh connections
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
      
      console.log("[SEND-EMAIL] Prepared email data object");

      // Send email with explicit timing logs
      console.log(`[SEND-EMAIL] Starting email send at ${new Date().toISOString()}`);
      console.log("[SEND-EMAIL] Using credentials:", { username, passwordLength: password.length });
      
      const sendStartTime = Date.now();
      const sendResult = await client.send(emailData);
      const sendDuration = Date.now() - sendStartTime;
      
      console.log(`[SEND-EMAIL] Email sent successfully in ${sendDuration}ms:`, sendResult);
      
      // Close the connection
      console.log(`[SEND-EMAIL] Closing SMTP connection at ${new Date().toISOString()}`);
      await client.close();
      console.log("[SEND-EMAIL] SMTP connection closed successfully");
      
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
    } catch (emailError: any) {
      console.error(`[SEND-EMAIL] Error during email sending at ${new Date().toISOString()}:`, emailError.message);
      console.error("[SEND-EMAIL] Error details:", JSON.stringify(emailError, Object.getOwnPropertyNames(emailError)));
      
      // Try to close the connection regardless of error
      if (client) {
        try {
          await client.close();
          console.log("[SEND-EMAIL] SMTP connection closed after error");
        } catch (closeError) {
          console.error("[SEND-EMAIL] Error closing SMTP connection:", closeError);
        }
      }
      
      // Return detailed error information
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: emailError.message,
          details: JSON.stringify(emailError, Object.getOwnPropertyNames(emailError)),
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
    
  } catch (error: any) {
    console.error(`[SEND-EMAIL] General error at ${new Date().toISOString()}:`, error);
    
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
