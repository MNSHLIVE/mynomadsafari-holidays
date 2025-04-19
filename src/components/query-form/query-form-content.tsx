
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { ContactFields } from "./contact-fields";
import { CalendarSelector } from "./calendar-selector";
import { TravelerSelector } from "./traveler-selector";
import { PackageSelector } from "./package-selector";
import { SpecialRequirements } from "./special-requirements";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";

interface QueryFormContentProps {
  destinationName: string;
  onClose: () => void;
}

export const QueryFormContent = ({ destinationName, onClose }: QueryFormContentProps) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!name || !email || !phone) {
      toast.error("Please fill all required fields");
      setIsSubmitting(false);
      return;
    }

    // Here would be the Supabase integration code to store form data

    setTimeout(() => {
      toast.success("Thank you for your inquiry! Our team will contact you shortly.");
      setIsSubmitting(false);
      setIsSubmitted(true);
      // onClose(); - We don't immediately close so user can see the thank you message
    }, 1500);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setTravelDate(undefined);
    setAdults(2);
    setChildren(0);
    setPackageType("");
    setMessage("");
    setIsSubmitted(false);
  };

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
