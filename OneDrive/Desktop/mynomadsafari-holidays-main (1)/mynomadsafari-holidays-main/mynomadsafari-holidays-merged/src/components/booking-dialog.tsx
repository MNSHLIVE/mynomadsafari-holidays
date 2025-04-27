import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookingForm } from "@/components/booking-form";

interface BookingDialogProps {
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  defaultDestination?: string;
  packageName?: string;
  duration?: string;
  buttonText?: string;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  buttonClassName?: string;
}

export function BookingDialog({
  trigger,
  title,
  description = "Fill out the form below and we'll get back to you with the best options for your trip.",
  defaultDestination = "",
  packageName = "",
  duration = "",
  buttonText = "Book Now",
  buttonVariant = "default",
  buttonClassName,
}: BookingDialogProps) {
  // Construct the title based on package details
  const dialogTitle = title || (packageName && duration 
    ? `Book ${packageName} - ${duration}`
    : packageName 
    ? `Book ${packageName}`
    : defaultDestination 
    ? `Book Trip to ${defaultDestination}`
    : "Book Your Tour");

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant={buttonVariant} className={buttonClassName}>
            {buttonText}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <BookingForm 
          defaultDestination={defaultDestination}
          packageName={packageName}
          duration={duration}
        />
      </DialogContent>
    </Dialog>
  );
} 