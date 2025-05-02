import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, Loader } from "lucide-react";

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
      // Connect to Supabase
      const response = await fetch('https://yxymecevbjlvshobmqjl.supabase.co/rest/v1/newsletter_subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4eW1lY2V2YmpsdnNob2JtcWpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNzkxODksImV4cCI6MjA2MDY1NTE4OX0.xVKWe5KWyJ5K7-4rVbrvRKmVcsxtsz56Rf962SOJxPM'
        },
        body: JSON.stringify({ email })
      });

      if (!response.ok) throw new Error("Failed to subscribe");

      setIsSubscribed(true);
      setEmail("");
      
      toast({
        title: "Subscribed!",
        description: "You'll receive travel tips and offers.",
      });

    } catch (err) {
      setError("Subscription failed. Try again later.");
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