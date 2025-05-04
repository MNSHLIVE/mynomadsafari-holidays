
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, Loader } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { sendEmail } from "@/utils/email";
import { createAdminNotificationEmailHTML } from "@/utils/email-templates";

export const Newsletter = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    
    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to Supabase database
      const { error: dbError } = await supabase
        .from('newsletter_subscribers')
        .insert({ email });

      if (dbError) {
        console.error('[Newsletter] Database error:', dbError);
        throw new Error("Failed to subscribe: " + dbError.message);
      }
      
      console.log('[Newsletter] Successfully added to database');
      
      // Send email notification to admin
      try {
        const emailResult = await sendEmail({
          to: "info@mynomadsafariholidays.in",
          subject: "New Newsletter Subscription",
          html: createAdminNotificationEmailHTML('Newsletter Subscription', { email }),
        });
        
        if (emailResult.success) {
          console.log('[Newsletter] Admin notification email sent successfully');
        } else {
          console.error('[Newsletter] Admin notification email failed:', emailResult.message);
        }
      } catch (emailError) {
        console.error('[Newsletter] Error sending admin notification:', emailError);
      }

      setIsSubscribed(true);
      setEmail("");
      
      toast({
        title: "Subscribed!",
        description: "You'll receive travel tips and offers.",
      });

    } catch (err) {
      console.error('[Newsletter] Error:', err);
      setError("Subscription failed. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Newsletter</h3>
      <p className="text-sm text-muted-foreground">
        Subscribe for travel tips and offers.
      </p>
      
      {isSubscribed ? (
        <Alert className="bg-primary/5 border-primary/20">
          <CheckCircle className="h-5 w-5 text-primary" />
          <AlertTitle>Thank you!</AlertTitle>
          <AlertDescription>
            You're now subscribed.
          </AlertDescription>
        </Alert>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <Input 
            type="email" 
            placeholder="Your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={error ? "border-destructive" : ""}
          />
          {error && <p className="text-xs text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Loader className="animate-spin mr-2" /> : null}
            Subscribe
          </Button>
        </form>
      )}
    </div>
  );
};
