
// This edge function handles email sending through SMTP
// It receives email details and sends them through the configured SMTP server

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
    
    const hostname = Deno.env.get("SMTP_HOSTNAME") || "smtp.hostinger.com";
    const port = parseInt(Deno.env.get("SMTP_PORT") || "465");
    const username = Deno.env.get("SMTP_USERNAME") || "info@mynomadsafariholidays.in";
    const password = Deno.env.get("SMTP_PASSWORD") || "";
    
    console.log(`[SEND-EMAIL] SMTP Config: ${hostname}:${port}`);
    console.log(`[SEND-EMAIL] SMTP Username: ${username}`);
    
    // Check if credentials are available
    if (!password) {
      console.error("[SEND-EMAIL] ERROR: SMTP Password is missing");
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "SMTP credentials are incomplete. Please check Supabase Edge Function Secrets."
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
      },
    });

    console.log("[SEND-EMAIL] SMTP client configured");

    // Send the email
    await client.send({
      from: from,
      to: to,
      subject: subject,
      content: text || "",
      html: html || "",
      ...(cc && { cc }),
      ...(bcc && { bcc }),
    });
    
    console.log("[SEND-EMAIL] Email sent successfully");
    
    // Close the connection
    await client.close();
    
    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully' }),
      { 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        } 
      }
    );
    
  } catch (error) {
    console.error("[SEND-EMAIL] Error:", error);
    
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
        details: errorDetails
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
