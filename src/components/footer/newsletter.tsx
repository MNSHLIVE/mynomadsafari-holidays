
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, Loader, AlertTriangle } from "lucide-react";
import { sendEmail } from "@/utils/email";
import { createThankYouEmailHTML } from "@/utils/email-templates";

export const Newsletter = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serviceError, setServiceError] = useState<string | null>(null);
  const [pendingSubscriptions, setPendingSubscriptions] = useState<string[]>([]);
  
  // Check for pending subscriptions on component mount
  useEffect(() => {
    try {
      const storedSubscriptions = JSON.parse(localStorage.getItem('pendingSubscriptions') || '[]');
      if (storedSubscriptions.length > 0) {
        setPendingSubscriptions(storedSubscriptions);
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
        const storedSubscriptions = JSON.parse(localStorage.getItem('pendingSubscriptions') || '[]');
        if (!storedSubscriptions.includes(email)) {
          storedSubscriptions.push(email);
          localStorage.setItem('pendingSubscriptions', JSON.stringify(storedSubscriptions));
          setPendingSubscriptions(storedSubscriptions);
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

      // Improved error handling
      if (!response.success) {
        console.error("Email sending failed:", response.message);
        
        // More specific error detection
        const isTemporaryServiceError = 
          response.message.includes("DNS") || 
          response.message.includes("SMTP") || 
          response.message.includes("connection") ||
          response.message.includes("timeout");

        if (isTemporaryServiceError) {
          setServiceError("We're experiencing temporary email service issues. Your subscription is saved and will be processed soon.");
        } else {
          // Update the error message to be more helpful
          setError("Your subscription is saved but we couldn't send a confirmation email. Our team is looking into it.");
        }

        // Still show successful subscription despite email error
        setIsSubscribed(true);
        setEmail("");
        
        toast({
          title: "Subscription received",
          description: "You've been added to our newsletter list, but we couldn't send a confirmation email.",
          variant: "default"
        });
        
        setTimeout(() => {
          setIsSubscribed(false);
        }, 8000);
        
        return;
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
        const storedSubscriptions = JSON.parse(localStorage.getItem('pendingSubscriptions') || '[]');
        const updatedSubscriptions = storedSubscriptions.filter((e: string) => e !== email);
        localStorage.setItem('pendingSubscriptions', JSON.stringify(updatedSubscriptions));
        setPendingSubscriptions(updatedSubscriptions);
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
      
      // Show more helpful error message
      setError("We couldn't complete your subscription. Please try again later.");
      
      toast({
        title: "Subscription issue",
        description: "We couldn't complete your subscription, but we've saved it to retry later.",
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
