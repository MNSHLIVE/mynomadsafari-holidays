import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

interface ChatInterfaceProps {
  onClose: () => void;
}

const ChatInterface = ({ onClose }: ChatInterfaceProps) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [travelers, setTravelers] = useState("");
  const [budget, setBudget] = useState("");
  const [dates, setDates] = useState("");
  const [message, setMessage] = useState("");

  const destinations = [
    "Thailand",
    "Dubai",
    "Singapore",
    "Bali",
    "Malaysia",
    "Maldives",
    "Europe",
    "Kashmir",
    "Ladakh",
    "Goa",
    "Kerala",
    "Andaman",
  ];

  const budgetRanges = [
    "Below ₹50,000",
    "₹50,000 - ₹1,00,000",
    "₹1,00,000 - ₹2,00,000",
    "Above ₹2,00,000"
  ];

  const handleContinue = () => {
    if (step < 5) setStep(step + 1);
    else handleSubmit();
  };

  const handleSubmit = () => {
    // Format the message for WhatsApp
    const whatsappMessage = encodeURIComponent(
      `Hi, I'm interested in planning a trip!\n\n` +
      `Name: ${name}\n` +
      `Destination: ${destination}\n` +
      `Travelers: ${travelers}\n` +
      `Budget: ${budget}\n` +
      `Travel Dates: ${dates}\n` +
      `Additional Message: ${message}`
    );

    // WhatsApp business number
    const phoneNumber = "919968682200";

    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, '_blank');
    onClose();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="font-medium">Welcome! Let's start planning your dream vacation.</h3>
            <div>
              <Label htmlFor="name">What's your name?</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="mt-1.5"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="font-medium">Hi {name}! Where would you like to travel?</h3>
            <Select value={destination} onValueChange={setDestination}>
              <SelectTrigger>
                <SelectValue placeholder="Choose destination" />
              </SelectTrigger>
              <SelectContent>
                {destinations.map((dest) => (
                  <SelectItem key={dest} value={dest}>
                    {dest}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="font-medium">How many travelers?</h3>
            <Input
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              placeholder="e.g., 2 adults, 1 child"
            />
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="font-medium">What's your budget range?</h3>
            <Select value={budget} onValueChange={setBudget}>
              <SelectTrigger>
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                {budgetRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h3 className="font-medium">When are you planning to travel?</h3>
            <Input
              value={dates}
              onChange={(e) => setDates(e.target.value)}
              placeholder="e.g., March 2024 or flexible"
            />
            <div>
              <Label htmlFor="message">Any specific requirements?</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your preferences..."
                className="mt-1.5"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return name.trim().length > 0;
      case 2:
        return destination.trim().length > 0;
      case 3:
        return travelers.trim().length > 0;
      case 4:
        return budget.trim().length > 0;
      case 5:
        return dates.trim().length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Plan Your Trip</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="p-6">
        {renderStep()}
        
        <div className="mt-6 flex justify-between items-center">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
            >
              Back
            </Button>
          )}
          <Button
            className={step === 1 ? "w-full" : ""}
            onClick={handleContinue}
            disabled={!isStepValid()}
          >
            {step === 5 ? "Connect on WhatsApp" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface; 