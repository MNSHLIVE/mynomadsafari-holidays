
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, Loader, AlertTriangle, Info } from "lucide-react";
import { sendEmail } from "@/utils/email";
import { createThankYouEmailHTML } from "@/utils/email-templates";

export const Newsletter = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serviceError, setServiceError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  
  // Check for pending subscriptions on component mount
  useEffect(() => {
    try {
      const pendingSubscriptions = JSON.parse(localStorage.getItem('pendingSubscriptions') || '[]');
      if (pendingSubscriptions.length > 0) {
        setDebugInfo(`${pendingSubscriptions.length} pending subscription(s) saved locally`);
      }
    } catch (e) {
      console.error("Failed to read pending subscriptions:", e);
    }
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setServiceError(null);
    setDebugInfo(null);
    
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // First, save to localStorage as a precaution
      try {
        const pendingSubscriptions = JSON.parse(localStorage.getItem('pendingSubscriptions') || '[]');
        if (!pendingSubscriptions.includes(email)) {
          pendingSubscriptions.push(email);
          localStorage.setItem('pendingSubscriptions', JSON.stringify(pendingSubscriptions));
        }
      } catch (e) {
        console.error("Failed to save to pending subscriptions:", e);
      }

      // Attempt to send welcome email
      const response = await sendEmail({
        to: email,
        subject: "Welcome to My Nomadsafari Holidays Newsletter!",
        html: createThankYouEmailHTML("Traveler", 'subscription'),
      });

      // Check if the email was actually sent successfully
      if (!response.success) {
        setDebugInfo(`Error details: ${response.message}`);
        throw new Error(response.message || "Failed to send email");
      }

      // Only attempt to send admin notification if the first email succeeded
      await sendEmail({
        to: "info@mynomadsafariholidays.in",
        subject: "New Newsletter Subscription",
        html: `
          <h2>New Newsletter Subscriber</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        `
      });

      setIsSubscribed(true);
      setEmail("");
      setError(null);
      
      // Remove from pending subscriptions if successful
      try {
        const pendingSubscriptions = JSON.parse(localStorage.getItem('pendingSubscriptions') || '[]');
        const updatedSubscriptions = pendingSubscriptions.filter((e: string) => e !== email);
        localStorage.setItem('pendingSubscriptions', JSON.stringify(updatedSubscriptions));
      } catch (e) {
        console.error("Failed to update pending subscriptions:", e);
      }
      
      setTimeout(() => {
        setIsSubscribed(false);
      }, 8000);

      toast({
        title: "Subscribed successfully!",
        description: "You'll now receive our latest travel updates.",
      });
    } catch (error: any) {
      console.error("Error subscribing to newsletter:", error);
      
      // Determine if the error is related to email service availability
      if (error.message?.includes("DNS resolution") || 
          error.message?.includes("SMTP") || 
          error.message?.includes("Edge Function")) {
        setServiceError("Our email service is currently unavailable. We've saved your request and will subscribe you when service resumes.");
      } else {
        setError("Failed to subscribe. Please try again later.");
      }
      
      toast({
        title: "Subscription failed",
        description: "There was an error processing your subscription. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Newsletter</h3>
      <p className="text-sm text-muted-foreground">
        Subscribe to get special offers and travel tips.
      </p>
      
      {isSubscribed ? (
        <Alert className="bg-primary/5 border-primary/20">
          <CheckCircle className="h-5 w-5 text-primary" />
          <AlertTitle className="text-sm font-medium">Thank you for subscribing!</AlertTitle>
          <AlertDescription className="text-xs">
            You'll now receive our latest travel updates and special offers.
          </AlertDescription>
        </Alert>
      ) : serviceError ? (
        <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <AlertTitle className="text-sm font-medium">Email Service Notice</AlertTitle>
          <AlertDescription className="text-xs">
            {serviceError}
          </AlertDescription>
        </Alert>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="space-y-1">
            <Input 
              type="email" 
              placeholder="Your email address" 
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              className={`bg-background ${error ? 'border-destructive' : ''}`}
              disabled={isSubmitting}
            />
            {error && (
              <p className="text-xs text-destructive">{error}</p>
            )}
            {debugInfo && (
              <Alert className="mt-2 py-2 text-xs bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
                <Info className="h-4 w-4 text-blue-500" />
                <AlertDescription className="text-xs">
                  {debugInfo}
                </AlertDescription>
              </Alert>
            )}
          </div>
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Subscribing...
              </>
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>
      )}
    </div>
  );
};
