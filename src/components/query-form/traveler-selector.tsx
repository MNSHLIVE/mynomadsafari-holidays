
import { Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TravelerSelectorProps {
  adults: number;
  children: number;
  setAdults: (value: number) => void;
  setChildren: (value: number) => void;
}

export const TravelerSelector = ({ 
  adults, 
  children, 
  setAdults, 
  setChildren 
}: TravelerSelectorProps) => {
  return (
    <div>
      <Label htmlFor="travelers" className="mb-1.5 flex items-center gap-1">
        <Users className="h-4 w-4" />
        Travelers
      </Label>
      <div className="grid grid-cols-2 gap-2">
        <Input
          type="number"
          min="1"
          max="20"
          placeholder="Adults"
          value={adults}
          onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
        />
        <Input
          type="number"
          min="0"
          max="10"
          placeholder="Children"
          value={children}
          onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
        />
      </div>
    </div>
  );
};
