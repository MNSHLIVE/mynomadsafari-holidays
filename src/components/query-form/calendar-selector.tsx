
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface CalendarSelectorProps {
  travelDate: Date | undefined;
  setTravelDate: (date: Date | undefined) => void;
}

export const CalendarSelector = ({ travelDate, setTravelDate }: CalendarSelectorProps) => {
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    setTravelDate(date);
    setCalendarOpen(false);
  };

  const handleCalendarKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setCalendarOpen(true);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission on button click
    setCalendarOpen(true);
  };

  return (
    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button" // Explicitly set type to button to prevent form submission
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !travelDate && "text-muted-foreground"
          )}
          onClick={handleButtonClick}
          onKeyDown={handleCalendarKeyDown}
          tabIndex={0}
          role="combobox"
          aria-expanded={calendarOpen}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {travelDate ? format(travelDate, "PPP") : "Select date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-0" 
        align="start"
        sideOffset={4}
      >
        <Calendar
          mode="single"
          selected={travelDate}
          onSelect={handleDateSelect}
          initialFocus
          disabled={(date) => date < new Date()}
        />
      </PopoverContent>
    </Popover>
  );
};
