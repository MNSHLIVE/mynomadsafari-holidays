
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Linkedin, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { sendEmail } from "@/utils/email";
import { createThankYouEmailHTML } from "@/utils/email-templates";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Footer = () => {
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
      // Send thank you email to subscriber
      await sendEmail({
        to: email,
        subject: "Welcome to My Nomadsafari Holidays Newsletter!",
        html: createThankYouEmailHTML("Traveler", 'subscription'),
      });

      // Send notification to admin
      await sendEmail({
        to: "info@mynomadsafariholidays.in",
        subject: "New Newsletter Subscription",
        html: `
          <h2>New Newsletter Subscriber</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        `
      });

      toast({
        title: "Subscribed successfully!",
        description: "You'll now receive our latest travel updates.",
      });
      
      // Show thank you message
      setIsSubscribed(true);
      
      // Reset form
      setEmail("");
      
      // Hide thank you message after 8 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 8000);
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
    <footer className="bg-muted/50 dark:bg-muted/20 mt-20">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/3e515213-741f-498e-add3-8b8f70b7fe4c.png" 
                alt="My Nomadsafari Holidays" 
                className="h-10 w-auto"
              />
              <h3 className="font-bold text-lg text-primary">My Nomadsafari Holidays</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Your one-stop travel expert helping you explore the world your way since 2010.
            </p>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/mynomadsafari/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary"
                >
                  <Instagram className="h-6 w-6" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a
                  href="https://www.facebook.com/mynomadsafari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary"
                >
                  <Facebook className="h-6 w-6" />
                  <span className="sr-only">Facebook</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/devandeshpande/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary"
                >
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "/about" },
                { label: "Destinations", href: "/destinations" },
                { label: "Tours", href: "/tours" },
                { label: "Visa Services", href: "/visa" },
                { label: "Blog", href: "/blog" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Contact Us</h3>
            <ul className="space-y-3">
              {/* Mumbai Office */}
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold">Mumbai Office:</span><br />
                  My Nomadsafari Holidays, 102 T.V Tower Badlapur East, Thane, Mumbai - 421503
                </div>
              </li>
              {/* Delhi Office */}
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold">Delhi Office:</span><br />
                  My Nomadsafari Holidays, Dwarka Sec 3, New Delhi - 110078<br />
                  Contact: Deven Deshpande
                </div>
              </li>
              {/* Phone Numbers */}
              <li className="flex items-start space-x-3">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <a href="tel:+919968682200" className="block hover:text-primary transition-colors">Mumbai: +91 9968682200</a>
                  <a href="tel:+917042910449" className="block hover:text-primary transition-colors">Delhi: +91 7042910449</a>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <a 
                  href="mailto:info@mynomadsafariholidays.in"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  info@mynomadsafariholidays.in
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
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
        </div>

        <div className="border-t border-border mt-10 pt-6 text-center">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4 text-sm text-muted-foreground">
            <Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/refund" className="hover:text-primary transition-colors">Refund Policy</Link>
            <Link to="/faq" className="hover:text-primary transition-colors">FAQs</Link>
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} My Nomadsafari Holidays. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
