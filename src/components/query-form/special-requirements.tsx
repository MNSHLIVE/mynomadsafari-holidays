
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface SpecialRequirementsProps {
  message: string;
  setMessage: (value: string) => void;
}

export const SpecialRequirements = ({ message, setMessage }: SpecialRequirementsProps) => {
  return (
    <div>
      <Label htmlFor="message" className="mb-1.5">
        Special Requirements
      </Label>
      <Textarea
        id="message"
        placeholder="Tell us about any specific requirements or questions"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="resize-none"
        rows={3}
      />
    </div>
  );
};
