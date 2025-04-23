
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { formatDateRange } from "./tours-tabs";

interface FilterParams {
  destination?: string;
  travelDates?: { from: Date; to?: Date };
  packageType?: string;
  duration?: string;
  budgetRange?: { min: number; max: number };
}

interface FiltersSectionProps {
  onFilterChange: (filters: FilterParams) => void;
  destinations: string[];
  searchTerm?: string;
  setSearchTerm?: React.Dispatch<React.SetStateAction<string>>;
  selectedDestination?: string;
  setSelectedDestination?: React.Dispatch<React.SetStateAction<string>>;
  selectedDuration?: string;
  setSelectedDuration?: React.Dispatch<React.SetStateAction<string>>;
  uniqueDomesticDestinations?: string[];
  uniqueInternationalDestinations?: string[];
}

const FiltersSection = ({ 
  onFilterChange, 
  destinations,
  searchTerm = "",
  setSearchTerm = () => {},
  selectedDestination = "all",
  setSelectedDestination = () => {},
  selectedDuration = "all",
  setSelectedDuration = () => {}
}: FiltersSectionProps) => {
  const [filters, setFilters] = useState<FilterParams>({});
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to?: Date;
  } | undefined>();

  // Update local filters when props change
  useEffect(() => {
    setFilters({
      ...filters,
      destination: selectedDestination === "all" ? undefined : selectedDestination,
      duration: selectedDuration === "all" ? undefined : selectedDuration
    });
  }, [selectedDestination, selectedDuration]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle destination change
  const handleDestinationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedDestination(value);
  };

  // Handle duration change
  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedDuration(value);
  };

  return (
    <div className="bg-muted/30 p-4 rounded-lg mb-8">
      <h3 className="text-lg font-medium mb-4">Filter Tours</h3>
      
      {/* Search input */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search tours..."
            className="pl-10"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Destination filter */}
        <div>
          <label className="block text-sm font-medium mb-1">Destination</label>
          <select
            className="w-full p-2 bg-background border rounded"
            onChange={handleDestinationChange}
            value={selectedDestination}
          >
            <option value="all">All Destinations</option>
            {destinations.map((destination) => (
              <option key={destination} value={destination}>
                {destination}
              </option>
            ))}
          </select>
        </div>

        {/* Travel dates filter */}
        <div>
          <label className="block text-sm font-medium mb-1">Travel Dates</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateRange && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange ? (
                  formatDateRange(dateRange)
                ) : (
                  <span>Select dates</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={new Date()}
                selected={dateRange}
                onSelect={(range) => {
                  setDateRange(range);
                  const newFilters = {
                    ...filters,
                    travelDates: range
                  };
                  setFilters(newFilters);
                  onFilterChange(newFilters);
                }}
                numberOfMonths={2}
                disabled={(date) => date < new Date()}
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Duration filter */}
        <div>
          <label className="block text-sm font-medium mb-1">Duration</label>
          <select
            className="w-full p-2 bg-background border rounded"
            onChange={handleDurationChange}
            value={selectedDuration}
          >
            <option value="all">Any Duration</option>
            <option value="1-3 days">1-3 days</option>
            <option value="4-7 days">4-7 days</option>
            <option value="8-14 days">8-14 days</option>
            <option value="15+ days">15+ days</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FiltersSection;
