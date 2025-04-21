
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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
    const sender = from || "Nomadsafari Holidays <info@mynomadsafariholidays.in>";

    console.log(`Sending email to: ${Array.isArray(to) ? to.join(', ') : to}`);
    console.log(`Email subject: ${subject}`);
    console.log(`From address: ${sender}`);
    
    // Check if we have API key
    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      throw new Error("Email service configuration error: Missing API key");
    }
    
    const emailResponse = await resend.emails.send({
      from: sender,
      to,
      subject,
      html,
      text,
      cc,
      bcc,
    });

    console.log("Email send API response:", JSON.stringify(emailResponse));

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
