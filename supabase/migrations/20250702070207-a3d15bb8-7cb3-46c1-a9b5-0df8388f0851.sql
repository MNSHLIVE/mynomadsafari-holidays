
-- Create user profiles table for CRM users
CREATE TABLE public.crm_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'staff',
  company_name TEXT DEFAULT 'Nomadsafari Holidays',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create OTP verification table
CREATE TABLE public.otp_verifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  phone TEXT,
  otp_code TEXT NOT NULL,
  otp_type TEXT NOT NULL CHECK (otp_type IN ('email', 'sms')),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_verified BOOLEAN DEFAULT false,
  attempts INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create CRM activity logs for security tracking
CREATE TABLE public.crm_activity_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.crm_users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  table_name TEXT,
  record_id UUID,
  old_data JSONB,
  new_data JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.crm_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.otp_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_activity_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for CRM Users
CREATE POLICY "Users can view their own profile" 
  ON public.crm_users 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all users" 
  ON public.crm_users 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.crm_users 
      WHERE user_id = auth.uid() 
      AND role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Users can update their own profile" 
  ON public.crm_users 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS Policies for OTP (allow temporary access for verification)
CREATE POLICY "Users can access their OTP" 
  ON public.otp_verifications 
  FOR ALL 
  USING (true); -- Temporary access for verification process

-- RLS Policies for Activity Logs
CREATE POLICY "Users can view their own activity" 
  ON public.crm_activity_logs 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.crm_users 
      WHERE id = crm_activity_logs.user_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all activity" 
  ON public.crm_activity_logs 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.crm_users 
      WHERE user_id = auth.uid() 
      AND role IN ('admin', 'super_admin')
    )
  );

-- Add indexes for performance
CREATE INDEX idx_crm_users_email ON public.crm_users(email);
CREATE INDEX idx_crm_users_user_id ON public.crm_users(user_id);
CREATE INDEX idx_otp_email ON public.otp_verifications(email);
CREATE INDEX idx_otp_expires ON public.otp_verifications(expires_at);
CREATE INDEX idx_activity_logs_user ON public.crm_activity_logs(user_id);
CREATE INDEX idx_activity_logs_created ON public.crm_activity_logs(created_at);

-- Function to clean expired OTPs
CREATE OR REPLACE FUNCTION clean_expired_otps()
RETURNS void AS $$
BEGIN
  DELETE FROM public.otp_verifications 
  WHERE expires_at < NOW() - INTERVAL '1 hour';
END;
$$ LANGUAGE plpgsql;

-- Trigger for updating updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_crm_users_updated_at 
    BEFORE UPDATE ON public.crm_users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
