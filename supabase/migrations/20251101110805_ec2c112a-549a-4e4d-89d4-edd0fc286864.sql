-- Create International Tour Calculator table
CREATE TABLE IF NOT EXISTS public.Trip_Cost_Calculator_International (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Contact Information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  
  -- Trip Details
  destination_name TEXT NOT NULL,
  departure_city TEXT,
  arrival_city TEXT,
  trip_type TEXT DEFAULT 'Round Trip',
  
  -- Travel Dates
  departure_date DATE,
  return_date DATE,
  
  -- Travelers
  adults INTEGER DEFAULT 1,
  children INTEGER DEFAULT 0,
  infants INTEGER DEFAULT 0,
  
  -- Package Details
  nights INTEGER DEFAULT 3,
  hotel_category TEXT DEFAULT '3-Star',
  package_type TEXT,
  
  -- Pricing
  estimated_price TEXT,
  per_person_cost TEXT,
  
  -- Additional Info
  special_requirements TEXT
);

-- Enable RLS
ALTER TABLE public.Trip_Cost_Calculator_International ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (for form submissions)
CREATE POLICY "Allow public inserts to Trip_Cost_Calculator_International"
  ON public.Trip_Cost_Calculator_International
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow authenticated users to view all records (for CRM)
CREATE POLICY "Allow authenticated users to view Trip_Cost_Calculator_International"
  ON public.Trip_Cost_Calculator_International
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Add index on created_at for better query performance
CREATE INDEX idx_trip_cost_calculator_international_created_at 
  ON public.Trip_Cost_Calculator_International(created_at DESC);