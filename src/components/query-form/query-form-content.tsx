
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { format } from "date-fns";
import { ContactFields } from "./contact-fields";
import { CalendarSelector } from "./calendar-selector";
import { TravelerSelector } from "./traveler-selector";
import { PackageSelector } from "./package-selector";
import { SpecialRequirements } from "./special-requirements";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";
import { sendEmail } from "@/utils/email";
import { createThankYouEmailHTML } from "@/utils/email-templates";

interface QueryFormContentProps {
  destinationName: string;
  onClose: () => void;
  prefillData?: {
    adults?: number;
    children?: number;
    estimatedPrice?: string;
  };
  onFormSubmitted?: () => void;
}

export const QueryFormContent = ({ 
  destinationName, 
  onClose, 
  prefillData, 
  onFormSubmitted 
}: QueryFormContentProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [travelDate, setTravelDate] = useState<Date | undefined>(undefined);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [packageType, setPackageType] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Apply prefilled data if provided
  useEffect(() => {
    if (prefillData) {
      if (prefillData.adults !== undefined) setAdults(prefillData.adults);
      if (prefillData.children !== undefined) setChildren(prefillData.children);
      if (prefillData.estimatedPrice) {
        setMessage(message => 
          `Estimated price from calculator: ${prefillData.estimatedPrice}\n${message || ""}`.trim()
        );
      }
    }
  }, [prefillData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!name || !email || !phone) {
      toast.error("Please fill all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      // Track success of both email operations
      let emailsSent = true;

      try {
        // Send thank you email to customer
        await sendEmail({
          to: email,
          subject: "Thank you for your travel query - Nomadsafari Holidays",
          html: createThankYouEmailHTML(name, prefillData?.estimatedPrice ? 'quote' : 'query'),
        });
      } catch (error) {
        emailsSent = false;
        console.error('Error sending customer email:', error);
      }

      try {
        // Send notification to admin
        await sendEmail({
          to: "info@mynomadsafariholidays.in",
          subject: `New Travel Query - ${destinationName}`,
          html: `
            <h2>New Travel Query</h2>
            <p><strong>Destination:</strong> ${destinationName}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Travel Date:</strong> ${travelDate ? format(travelDate, "MMMM dd, yyyy") : "Not specified"}</p>
            <p><strong>Number of Travelers:</strong> ${adults} adults, ${children} children</p>
            <p><strong>Package Type:</strong> ${packageType || "Not specified"}</p>
            <p><strong>Special Requirements:</strong> ${message || "None"}</p>
            ${prefillData?.estimatedPrice ? `<p><strong>Estimated Price:</strong> ${prefillData.estimatedPrice}</p>` : ''}
          `
        });
      } catch (error) {
        emailsSent = false;
        console.error('Error sending admin email:', error);
      }

      // Still consider form submission successful even if emails fail
      toast.success("Thank you for your inquiry! Our team will contact you shortly.");
      
      if (!emailsSent) {
        toast.warning("There might be a slight delay in our response due to technical issues.");
      }
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Notify parent component if callback is provided
      if (onFormSubmitted) {
        onFormSubmitted();
      }
    } catch (error) {
      console.error('Error in form submission:', error);
      setIsSubmitting(false);
      toast.error("There was an error sending your inquiry. Please try again or contact us directly by phone.");
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setTravelDate(undefined);
    setAdults(prefillData?.adults || 2);
    setChildren(prefillData?.children || 0);
    setPackageType("");
    setMessage(prefillData?.estimatedPrice ? `Estimated price from calculator: ${prefillData.estimatedPrice}` : "");
    setIsSubmitted(false);
  };

  const formattedTravelDate = travelDate ? format(travelDate, "MMMM dd, yyyy") : "Not specified";

  if (isSubmitted) {
    return (
      <div className="py-6">
        <Alert className="bg-primary/5 border-primary/20">
          <CheckCircle className="h-5 w-5 text-primary" />
          <AlertTitle className="text-lg font-medium mb-2">Thank you for your inquiry!</AlertTitle>
          <AlertDescription className="space-y-4">
            <p>
              We've received your request about {destinationName} and will contact you at {email} within 24 hours with a customized itinerary.
            </p>
            <p>
              <span className="font-medium">Travel Date:</span> {formattedTravelDate}
            </p>
            <p className="text-sm text-muted-foreground">
              If you have any urgent questions, please feel free to contact us directly.
            </p>
            <div className="flex gap-4 mt-4">
              <Button onClick={onClose} variant="outline">Close</Button>
              <Button onClick={resetForm}>Submit Another Inquiry</Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="grid grid-cols-1 gap-4">
        <ContactFields 
          name={name}
          email={email}
          phone={phone}
          setName={setName}
          setEmail={setEmail}
          setPhone={setPhone}
        />
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <CalendarSelector 
              travelDate={travelDate} 
              setTravelDate={setTravelDate} 
            />
          </div>
          <TravelerSelector 
            adults={adults}
            children={children}
            setAdults={setAdults}
            setChildren={setChildren}
          />
        </div>

        <PackageSelector 
          packageType={packageType}
          setPackageType={setPackageType}
        />
        
        <SpecialRequirements 
          message={message}
          setMessage={setMessage}
        />
      </div>
      
      <DialogFooter>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Submitting..." : "Submit Enquiry"}
        </Button>
      </DialogFooter>
    </form>
  );
};
