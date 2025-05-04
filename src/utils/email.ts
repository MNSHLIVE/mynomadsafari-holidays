
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
      console.log('[EMAIL DEBUG] Invoking Supabase send-email function');
      
      const { data, error } = await supabase.functions.invoke("send-email", {
        body: {
          ...options,
          from: sender
        }
      });

      console.log('[EMAIL DEBUG] Function invocation result:', { data, error });

      if (error) {
        console.error("[EMAIL DEBUG] Error from Supabase function:", error);
        
        // Log more detailed error for debugging
        if (error.message) console.error("[EMAIL DEBUG] Error message:", error.message);
        if (error.context) console.error("[EMAIL DEBUG] Error context:", error.context);
        
        toast.error("Email Delivery Issue", {
          description: "We've saved your information but couldn't send an email confirmation"
        });
        
        return { 
          success: false, 
          message: `Edge function error: ${error.message || "Unknown error"}`, 
          error 
        };
      }

      if (!data || !data.success) {
        console.error("[EMAIL DEBUG] Function reported failure:", data);
        toast.warning("Email Service Notice", {
          description: "Your information is saved but the email service is temporarily unavailable"
        });
        return { 
          success: false, 
          message: data?.message || "Email sending failed in the edge function", 
          error: data?.error 
        };
      }
      
      return { success: true, data };
    } catch (error: any) {
      console.error("[EMAIL DEBUG] Function invoke error:", error);
      
      // Log more detailed error information
      console.error("[EMAIL DEBUG] Error name:", error.name);
      console.error("[EMAIL DEBUG] Error message:", error.message);
      console.error("[EMAIL DEBUG] Error stack:", error.stack);
      
      toast.success("Action Completed", {
        description: "Your information has been saved successfully"
      });
      
      return { 
        success: false, 
        message: `Function invoke error: ${error.message || "Unknown error"}`, 
        error 
      };
    }
  } catch (error: any) {
    console.error("[EMAIL DEBUG] Top-level email sending error:", error);
    
    // Log more detailed error information
    console.error("[EMAIL DEBUG] Error name:", error.name);
    console.error("[EMAIL DEBUG] Error message:", error.message);
    console.error("[EMAIL DEBUG] Error stack:", error.stack);
    
    toast.info("Action Completed", {
      description: "Your information has been saved but email confirmation is delayed"
    });
    
    return { 
      success: false, 
      message: `Email sending error: ${error.message || "Unknown error"}`, 
      error 
    };
  }
};
