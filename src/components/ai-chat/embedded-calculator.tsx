
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Calculator } from 'lucide-react';
import { format } from 'date-fns';

interface EmbeddedCalculatorProps {
  onCalculate: (data: any) => void;
  onClose: () => void;
}

const EmbeddedCalculator: React.FC<EmbeddedCalculatorProps> = ({ onCalculate, onClose }) => {
  const [destination, setDestination] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [hotelCategory, setHotelCategory] = useState('3-star');
  const [packageType, setPackageType] = useState('standard');

  const destinations = [
    'Kerala', 'Rajasthan', 'Himachal', 'Goa', 'Kashmir', 'Ladakh',
    'Bali', 'Dubai', 'Thailand', 'Singapore', 'Maldives'
  ];

  const calculateCost = () => {
    if (!destination || !departureDate || !returnDate) {
      return;
    }

    const days = Math.ceil((returnDate.getTime() - departureDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Base costs per person per day
    const baseCosts: { [key: string]: number } = {
      'Kerala': 3500, 'Rajasthan': 4000, 'Himachal': 3000, 'Goa': 2500,
      'Kashmir': 4500, 'Ladakh': 5000, 'Bali': 6000, 'Dubai': 8000,
      'Thailand': 5500, 'Singapore': 9000, 'Maldives': 12000
    };

    const hotelMultiplier = {
      '2-star': 0.8, '3-star': 1.0, '4-star': 1.4, '5-star': 2.0
    };

    const packageMultiplier = {
      'budget': 0.9, 'standard': 1.0, 'luxury': 1.5, 'premium': 2.0
    };

    const baseCost = baseCosts[destination] || 3500;
    const totalCost = baseCost * days * adults * 
                     hotelMultiplier[hotelCategory as keyof typeof hotelMultiplier] * 
                     packageMultiplier[packageType as keyof typeof packageMultiplier];

    const calculatedData = {
      destination,
      adults,
      children,
      departureDate: format(departureDate, 'yyyy-MM-dd'),
      returnDate: format(returnDate, 'yyyy-MM-dd'),
      days,
      hotelCategory,
      packageType,
      totalCost: Math.round(totalCost),
      perPersonCost: Math.round(totalCost / adults)
    };

    onCalculate(calculatedData);
  };

  return (
    <div className="w-full max-h-[400px] overflow-y-auto">
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Quick Cost Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
        <div>
          <Label htmlFor="destination">Destination</Label>
          <Select value={destination} onValueChange={setDestination}>
            <SelectTrigger>
              <SelectValue placeholder="Select destination" />
            </SelectTrigger>
            <SelectContent>
              {destinations.map((dest) => (
                <SelectItem key={dest} value={dest}>{dest}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="adults" className="text-xs">Adults</Label>
            <Input
              type="number"
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              min="1"
              max="20"
              className="h-8 text-sm"
            />
          </div>
          <div>
            <Label htmlFor="children" className="text-xs">Children</Label>
            <Input
              type="number"
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              min="0"
              max="10"
              className="h-8 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs">Departure Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal h-8 text-xs">
                  <CalendarIcon className="mr-1 h-3 w-3" />
                  {departureDate ? format(departureDate, "MMM dd") : "Select"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={departureDate || undefined}
                  onSelect={(date) => setDepartureDate(date || null)}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label className="text-xs">Return Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal h-8 text-xs">
                  <CalendarIcon className="mr-1 h-3 w-3" />
                  {returnDate ? format(returnDate, "MMM dd") : "Select"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={returnDate || undefined}
                  onSelect={(date) => setReturnDate(date || null)}
                  disabled={(date) => date < (departureDate || new Date())}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs">Hotel Category</Label>
            <Select value={hotelCategory} onValueChange={setHotelCategory}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2-star">2-Star</SelectItem>
                <SelectItem value="3-star">3-Star</SelectItem>
                <SelectItem value="4-star">4-Star</SelectItem>
                <SelectItem value="5-star">5-Star</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">Package Type</Label>
            <Select value={packageType} onValueChange={setPackageType}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="budget">Budget</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button onClick={calculateCost} className="flex-1 h-8 text-xs">
            Calculate Cost
          </Button>
          <Button variant="outline" onClick={onClose} className="h-8 text-xs">
            Close
          </Button>
        </div>
      </CardContent>
    </Card>
    </div>
  );
};

export default EmbeddedCalculator;
