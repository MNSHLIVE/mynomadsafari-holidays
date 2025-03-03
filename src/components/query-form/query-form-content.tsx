
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { ContactFields } from "./contact-fields";
import { CalendarSelector } from "./calendar-selector";
import { TravelerSelector } from "./traveler-selector";
import { PackageSelector } from "./package-selector";
import { SpecialRequirements } from "./special-requirements";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!name || !email || !phone) {
      toast.error("Please fill all required fields");
      setIsSubmitting(false);
      return;
    }

    setTimeout(() => {
      toast.success("Thank you for your inquiry! Our team will contact you shortly.");
      setIsSubmitting(false);
      onClose();
      resetForm();
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
  };

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
