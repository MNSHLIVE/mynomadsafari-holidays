
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  text?: string;
  cc?: string | string[];
  bcc?: string | string[];
}

export const sendEmail = async (options: EmailOptions) => {
  try {
    // Ensure a consistent sender email
    const sender = options.from || "Nomadsafari Holidays <info@mynomadsafariholidays.in>";
    
    console.log('[EMAIL DEBUG] Sending email:', {
      to: options.to,
      subject: options.subject,
      from: sender,
      htmlLength: options.html.length
    });
    
    // Add plain text version if not provided
    if (!options.text && options.html) {
      options.text = options.html.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim();
    }
    
    const { data, error } = await supabase.functions.invoke("send-email", {
      body: {
        ...options,
        from: sender
      }
    });

    if (error) {
      console.error("[EMAIL DEBUG] Error from edge function:", error);
      throw error;
    }

    console.log('[EMAIL DEBUG] Full response from edge function:', JSON.stringify(data, null, 2));
    
    if (!data.success) {
      console.error("[EMAIL DEBUG] Edge function reported failure:", data);
      throw new Error(data.message || "Email sending failed");
    }
    
    toast.success("Email sent successfully!", {
      description: `Sent to: ${Array.isArray(options.to) ? options.to.join(', ') : options.to}`
    });
    
    return data;
  } catch (error) {
    console.error("[EMAIL DEBUG] Comprehensive email sending error:", error);
    
    toast.error(
      "Email delivery encountered an issue", {
        description: "Our team has been notified and will investigate"
      }
    );
    
    throw error;
  }
};
