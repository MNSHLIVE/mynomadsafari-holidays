
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QueryFormContent } from "./query-form/query-form-content";

interface DestinationQueryFormProps {
  destinationName: string;
  className?: string;
  buttonVariant?: "default" | "outline" | "secondary";
  buttonText?: string;
}

const DestinationQueryForm = ({
  destinationName,
  className,
  buttonVariant = "default",
  buttonText = "Enquire Now"
}: DestinationQueryFormProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} className={className}>
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Enquire about {destinationName}</DialogTitle>
          <DialogDescription>
            Fill in your details and we'll get back to you with the best packages
          </DialogDescription>
        </DialogHeader>
        <QueryFormContent 
          destinationName={destinationName}
          onClose={() => setOpen(false)} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default DestinationQueryForm;
