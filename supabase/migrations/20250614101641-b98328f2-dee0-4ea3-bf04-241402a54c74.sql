
-- Add new columns to tour_package_requests for enhanced calculator fields
ALTER TABLE public.tour_package_requests
  ADD COLUMN departure_city TEXT,
  ADD COLUMN arrival_city TEXT,
  ADD COLUMN departure_date DATE,
  ADD COLUMN return_date DATE,
  ADD COLUMN trip_type TEXT;
