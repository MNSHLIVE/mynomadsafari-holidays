
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
import { CheckCircle, Loader } from "lucide-react";
import { sendEmail } from "@/utils/email";
import { createThankYouEmailHTML, createAdminNotificationEmailHTML } from "@/utils/email-templates";
import { supabase } from "@/integrations/supabase/client";

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
  const [formError, setFormError] = useState<string | null>(null);

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
    setFormError(null);

    if (!name || !email || !phone) {
      setFormError("Please fill all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      let formSubmitted = true;

      const requestData = {
        name,
        email,
        phone,
        destination_name: destinationName,
        travel_date: travelDate ? format(travelDate, "yyyy-MM-dd") : null,
        adults,
        children,
        package_type: packageType || null,
        special_requirements: message || null,
        estimated_price: prefillData?.estimatedPrice || null
      };
      
      console.log('[FORM] Submitting tour package request:', requestData);

      try {
        const { error, data } = await supabase.from('tour_package_requests').insert(requestData).select();
        
        if (error) {
          console.error('[FORM] Error saving to Supabase:', error);
          formSubmitted = false;
          throw new Error(`Database error: ${error.message}`);
        } else {
          console.log('[FORM] Successfully saved form data to Supabase:', data);
        }
      } catch (dbError: any) {
        console.error('[FORM] Exception when saving to Supabase:', dbError);
        formSubmitted = false;
        throw new Error(`Failed to save your request: ${dbError.message}`);
      }

      const formattedDate = travelDate 
        ? format(travelDate, "MMMM dd, yyyy") 
        : "Not specified";

      const emailDetails = {
        name,
        email,
        phone,
        destination: destinationName,
        "travel date": formattedDate,
        travelers: `${adults} adults, ${children} children`,
        "package type": packageType || "Not specified",
        "special requirements": message || "None",
        ...(prefillData?.estimatedPrice ? { "estimated price": prefillData.estimatedPrice } : {})
      };

      // First send notification to admin
      try {
        const adminEmailResult = await sendEmail({
          to: "info@mynomadsafariholidays.in",
          subject: `New Travel Query - ${destinationName}`,
          html: createAdminNotificationEmailHTML('Tour Package Request', emailDetails)
        });
        
        if (adminEmailResult.success) {
          console.log('[FORM] Notification email sent to admin successfully');
        } else {
          console.error('[FORM] Admin email sending failed:', adminEmailResult.message);
        }
      } catch (error) {
        console.error('[FORM] Error sending admin email:', error);
      }

      // Then send confirmation to customer
      try {
        const customerEmailResult = await sendEmail({
          to: email,
          subject: "Thank you for your travel query - Nomadsafari Holidays",
          html: createThankYouEmailHTML(name, prefillData?.estimatedPrice ? 'quote' : 'query'),
        });
        
        if (customerEmailResult.success) {
          console.log('[FORM] Thank you email sent to customer successfully');
        } else {
          console.error('[FORM] Customer email sending failed:', customerEmailResult.message);
        }
      } catch (error) {
        console.error('[FORM] Error sending customer email:', error);
      }

      toast.success("Thank you for your inquiry! Our team will contact you shortly.");
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      if (onFormSubmitted) {
        onFormSubmitted();
      }
    } catch (error: any) {
      console.error('[FORM] Error in form submission:', error);
      setIsSubmitting(false);
      setFormError(error.message || "There was an error sending your inquiry. Please try again.");
      toast.error("Submission Error", {
        description: error.message || "Please try again or contact us directly by phone."
      });
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
    setFormError(null);
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
            <p>
              <span className="font-medium">Travel Date:</span> {travelDate ? format(travelDate, "MMMM dd, yyyy") : "Not specified"}
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
      {formError && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}
      
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
          {isSubmitting ? <Loader className="animate-spin mr-2 h-4 w-4" /> : null}
          {isSubmitting ? "Submitting..." : "Submit Enquiry"}
        </Button>
      </DialogFooter>
    </form>
  );
};
