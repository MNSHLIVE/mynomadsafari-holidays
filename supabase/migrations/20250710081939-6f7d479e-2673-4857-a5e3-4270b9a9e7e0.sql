
-- First, let's clean up any existing admin records and create a fresh admin account
-- This will allow you to login with a new password

-- Clean up existing CRM users (optional - only if you want a fresh start)
DELETE FROM public.crm_users WHERE role IN ('admin', 'super_admin');

-- Clean up any existing OTP verifications
DELETE FROM public.otp_verifications WHERE email LIKE '%admin%';

-- Insert a new admin user (you can change the email to your preferred admin email)
INSERT INTO public.crm_users (
    name,
    email,
    phone,
    role,
    company_name,
    is_active
) VALUES (
    'System Administrator',
    'admin@nomadsafari.com',
    '+91-9999999999',
    'admin',
    'Nomadsafari Holidays',
    true
) ON CONFLICT (email) DO UPDATE SET
    role = 'admin',
    is_active = true,
    updated_at = NOW();

-- Create some sample data for testing
INSERT INTO public.customers (
    first_name,
    last_name,
    email,
    phone,
    country,
    notes
) VALUES 
    ('Rahul', 'Sharma', 'rahul.sharma@example.com', '+91-9876543210', 'India', 'Interested in Kerala packages'),
    ('Priya', 'Patel', 'priya.patel@example.com', '+91-8765432109', 'India', 'Family trip to Goa'),
    ('Amit', 'Kumar', 'amit.kumar@example.com', '+91-7654321098', 'India', 'Business travel requirements'),
    ('Neha', 'Singh', 'neha.singh@example.com', '+91-6543210987', 'India', 'Honeymoon package for Bali')
ON CONFLICT (email) DO NOTHING;

-- Create sample tags
INSERT INTO public.tags (name) VALUES 
    ('VIP Customer'),
    ('Family Trip'),
    ('Business Travel'),
    ('Honeymoon'),
    ('Adventure'),
    ('Luxury')
ON CONFLICT DO NOTHING;

-- Create sample bookings
INSERT INTO public.bookings (
    trip_name,
    destination,
    start_date,
    end_date,
    package_cost,
    status,
    payment_status,
    notes
) VALUES 
    ('Kerala Backwater Cruise', 'Kerala', '2024-02-15', '2024-02-20', 45000, 'confirmed', 'paid', 'Deluxe houseboat package'),
    ('Goa Beach Holiday', 'Goa', '2024-03-01', '2024-03-05', 32000, 'confirmed', 'partial', '5-star beach resort'),
    ('Rajasthan Heritage Tour', 'Rajasthan', '2024-02-25', '2024-03-03', 58000, 'new', 'pending', 'Palace and fort visits'),
    ('Bali Honeymoon Package', 'Bali', '2024-04-10', '2024-04-17', 125000, 'confirmed', 'paid', 'Private villa with spa')
ON CONFLICT DO NOTHING;
