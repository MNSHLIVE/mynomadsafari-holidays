
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface FiltersSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedDestination: string;
  setSelectedDestination: (destination: string) => void;
  selectedDuration: string;
  setSelectedDuration: (duration: string) => void;
  uniqueDomesticDestinations: string[];
  uniqueInternationalDestinations: string[];
}

const FiltersSection = ({
  searchTerm,
  setSearchTerm,
  selectedDestination,
  setSelectedDestination,
  selectedDuration,
  setSelectedDuration,
  uniqueDomesticDestinations,
  uniqueInternationalDestinations,
}: FiltersSectionProps) => {
  return (
    <div className="mb-8 bg-muted/30 p-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Input
            placeholder="Search destinations, activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>
        
        <Select
          value={selectedDestination}
          onValueChange={setSelectedDestination}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Destination" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Destinations</SelectItem>
              <Tabs defaultValue="domestic">
                <TabsList className="mb-2">
                  <TabsTrigger value="domestic">Domestic</TabsTrigger>
                  <TabsTrigger value="international">International</TabsTrigger>
                </TabsList>
                <TabsContent value="domestic">
                  {uniqueDomesticDestinations.map((dest) => (
                    <SelectItem key={dest} value={dest}>
                      {dest}
                    </SelectItem>
                  ))}
                </TabsContent>
                <TabsContent value="international">
                  {uniqueInternationalDestinations.map((dest) => (
                    <SelectItem key={dest} value={dest}>
                      {dest}
                    </SelectItem>
                  ))}
                </TabsContent>
              </Tabs>
            </SelectGroup>
          </SelectContent>
        </Select>
        
        <Select
          value={selectedDuration}
          onValueChange={setSelectedDuration}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Durations</SelectItem>
            <SelectItem value="short">Short Tours (3-4 Nights)</SelectItem>
            <SelectItem value="long">Long Tours (6-8 Nights)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FiltersSection;
