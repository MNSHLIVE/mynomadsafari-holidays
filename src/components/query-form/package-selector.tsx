
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PackageSelectorProps {
  packageType: string;
  setPackageType: (value: string) => void;
}

export const PackageSelector = ({ packageType, setPackageType }: PackageSelectorProps) => {
  return (
    <div>
      <Label htmlFor="packageType" className="mb-1.5 flex items-center gap-1">
        Package Type
      </Label>
      <Select value={packageType} onValueChange={setPackageType}>
        <SelectTrigger id="packageType">
          <SelectValue placeholder="Select package type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Budgeted">Budgeted</SelectItem>
          <SelectItem value="Luxury">Luxury</SelectItem>
          <SelectItem value="Premier">Premier</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
