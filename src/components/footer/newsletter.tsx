
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";
import { sendEmail } from "@/utils/email";
import { createThankYouEmailHTML } from "@/utils/email-templates";

export const Newsletter = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
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
      
      setTimeout(() => {
        setIsSubscribed(false);
      }, 8000);

      toast({
        title: "Subscribed successfully!",
        description: "You'll now receive our latest travel updates.",
      });
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      
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
          <Input 
            type="email" 
            placeholder="Your email address" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-background"
          />
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      )}
    </div>
  );
};
