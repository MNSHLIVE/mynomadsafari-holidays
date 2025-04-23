
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, Loader } from "lucide-react";
import { sendEmail } from "@/utils/email";
import { createThankYouEmailHTML } from "@/utils/email-templates";

export const Newsletter = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    
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
      await sendEmail({
        to: email,
        subject: "Welcome to My Nomadsafari Holidays Newsletter!",
        html: createThankYouEmailHTML("Traveler", 'subscription'),
      });

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
      
      setTimeout(() => {
        setIsSubscribed(false);
      }, 8000);

      toast({
        title: "Subscribed successfully!",
        description: "You'll now receive our latest travel updates.",
      });
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      
      setError("Failed to subscribe. Please try again later.");
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
