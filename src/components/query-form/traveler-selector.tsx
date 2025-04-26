
import { Users, Plus, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
  const handleIncrement = (type: 'adults' | 'children') => {
    if (type === 'adults' && adults < 20) {
      setAdults(adults + 1);
    } else if (type === 'children' && children < 10) {
      setChildren(children + 1);
    }
  };

  const handleDecrement = (type: 'adults' | 'children') => {
    if (type === 'adults' && adults > 1) {
      setAdults(adults - 1);
    } else if (type === 'children' && children > 0) {
      setChildren(children - 1);
    }
  };

  return (
    <div>
      <Label htmlFor="travelers" className="mb-1.5 flex items-center gap-1">
        <Users className="h-4 w-4" />
        Travelers
      </Label>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-r-none"
            onClick={() => handleDecrement('adults')}
            disabled={adults <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            min="1"
            max="20"
            className="rounded-none text-center"
            value={adults}
            onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
            onClick={(e) => (e.target as HTMLInputElement).select()}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-l-none"
            onClick={() => handleIncrement('adults')}
            disabled={adults >= 20}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-r-none"
            onClick={() => handleDecrement('children')}
            disabled={children <= 0}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            min="0"
            max="10"
            className="rounded-none text-center"
            value={children}
            onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
            onClick={(e) => (e.target as HTMLInputElement).select()}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-l-none"
            onClick={() => handleIncrement('children')}
            disabled={children >= 10}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

