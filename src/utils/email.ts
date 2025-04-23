
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
    
    try {
      const { data, error } = await supabase.functions.invoke("send-email", {
        body: {
          ...options,
          from: sender
        }
      });

      if (error) {
        console.error("[EMAIL DEBUG] Error from Supabase function:", error);
        return { 
          success: false, 
          message: `Edge function error: ${error.message || "Unknown error"}`, 
          error 
        };
      }

      if (!data.success) {
        console.error("[EMAIL DEBUG] Function reported failure:", data);
        return { 
          success: false, 
          message: data.message || "Email sending failed in the edge function", 
          error: data.error 
        };
      }
      
      return { success: true, data };
    } catch (error: any) {
      console.error("[EMAIL DEBUG] Function invoke error:", error);
      return { 
        success: false, 
        message: `Function invoke error: ${error.message || "Unknown error"}`, 
        error 
      };
    }
  } catch (error: any) {
    console.error("[EMAIL DEBUG] Top-level email sending error:", error);
    return { 
      success: false, 
      message: `Email sending error: ${error.message || "Unknown error"}`, 
      error 
    };
  }
};
