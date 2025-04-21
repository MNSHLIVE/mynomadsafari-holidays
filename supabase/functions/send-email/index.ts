
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { SMTPClient } from "npm:emailjs@4.0.3";

// Initialize Resend if API key is available
const resendApiKey = Deno.env.get("RESEND_API_KEY");
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Initialize SMTP if SMTP settings are available
const smtpHost = Deno.env.get("SMTP_HOST");
const smtpPort = Deno.env.get("SMTP_PORT");
const smtpUser = Deno.env.get("SMTP_USER");
const smtpPassword = Deno.env.get("SMTP_PASSWORD");
const smtpSecure = Deno.env.get("SMTP_SECURE") === "true";

// Default email sender
const defaultSender = Deno.env.get("DEFAULT_SENDER") || "Nomadsafari Holidays <info@mynomadsafariholidays.in>";

// Check if SMTP is configured
const isSmtpConfigured = smtpHost && smtpPort && smtpUser && smtpPassword;

// Create SMTP client if configured
let smtpClient: SMTPClient | null = null;
if (isSmtpConfigured) {
  try {
    smtpClient = new SMTPClient({
      host: smtpHost,
      port: parseInt(smtpPort!),
      user: smtpUser,
      password: smtpPassword,
      ssl: smtpSecure,
    });
    console.log("SMTP client configured successfully");
  } catch (error) {
    console.error("Error configuring SMTP client:", error);
  }
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  text?: string;
  cc?: string | string[];
  bcc?: string | string[];
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, html, from, text, cc, bcc }: EmailRequest = await req.json();

    // Default sender if not provided
    const sender = from || defaultSender;

    console.log(`Sending email to: ${Array.isArray(to) ? to.join(', ') : to}`);
    console.log(`Email subject: ${subject}`);
    console.log(`From address: ${sender}`);
    
    // Determine which email method to use
    const useSmtp = isSmtpConfigured && smtpClient;
    const useResend = resend !== null;
    
    if (!useSmtp && !useResend) {
      console.error("No email sending method available. Configure either SMTP or Resend API.");
      throw new Error("Email service configuration error: No sending method available");
    }
    
    let emailResponse;
    
    // Try to send email using the available method
    if (useSmtp) {
      console.log("Using SMTP for email delivery...");
      
      // Format recipients for SMTP
      const toAddresses = Array.isArray(to) ? to.join(',') : to;
      const ccAddresses = cc ? (Array.isArray(cc) ? cc.join(',') : cc) : undefined;
      const bccAddresses = bcc ? (Array.isArray(bcc) ? bcc.join(',') : bcc) : undefined;
      
      // Send email via SMTP
      emailResponse = await smtpClient!.sendAsync({
        from: sender,
        to: toAddresses,
        cc: ccAddresses,
        bcc: bccAddresses,
        subject: subject,
        text: text || "",
        attachment: [{ data: html, alternative: true }],
      });
      
      console.log("SMTP email sent:", emailResponse);
    } else {
      console.log("Using Resend API for email delivery...");
      
      // Send email via Resend API
      emailResponse = await resend!.emails.send({
        from: sender,
        to,
        subject,
        html,
        text,
        cc,
        bcc,
      });
      
      console.log("Resend API response:", JSON.stringify(emailResponse));
    }

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    
    // Try to get more details if available
    if (error.response) {
      console.error("Response error data:", error.response.data);
    }
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
