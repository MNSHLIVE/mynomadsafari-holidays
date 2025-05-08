
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { QueryFormContent } from "./query-form/query-form-content";

interface DestinationQueryFormProps {
  destinationName: string;
  buttonText?: string;
  buttonClassName?: string;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  initialOpen?: boolean;
  onFormSubmitted?: () => void;
  className?: string;
  prefillData?: {
    adults?: number;
    children?: number;
    estimatedPrice?: string;
  };
}

const DestinationQueryForm = ({ 
  destinationName, 
  buttonText = "Enquire Now", 
  buttonClassName,
  buttonVariant = "default", 
  initialOpen = false,
  onFormSubmitted,
  className,
  prefillData
}: DestinationQueryFormProps) => {
  const [open, setOpen] = useState(initialOpen);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmitted = () => {
    setIsLoading(false);
    if (onFormSubmitted) {
      onFormSubmitted();
    }
    // We don't close the dialog here as the QueryFormContent will handle showing the submitted state
  };

  const handleOpenChange = (isOpen: boolean) => {
    // Only allow closing if not currently loading
    if (isLoading && !isOpen) return;
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className={`${buttonClassName} ${className}`} variant={buttonVariant}>
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Enquire about {destinationName}</DialogTitle>
          <DialogDescription>
            Fill in the form below and our travel experts will get back to you with a customized itinerary.
          </DialogDescription>
        </DialogHeader>
        <QueryFormContent 
          destinationName={destinationName} 
          onClose={handleClose}
          prefillData={prefillData}
          onFormSubmitted={handleFormSubmitted}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DestinationQueryForm;
