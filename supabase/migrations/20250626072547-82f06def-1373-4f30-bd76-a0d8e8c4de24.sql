
-- Create table for caching API responses
CREATE TABLE public.cached_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  query_hash TEXT NOT NULL UNIQUE,
  response_text TEXT NOT NULL,
  api_source TEXT DEFAULT 'gemini',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + INTERVAL '24 hours')
);

-- Add index for faster lookups
CREATE INDEX idx_cached_responses_query_hash ON public.cached_responses(query_hash);
CREATE INDEX idx_cached_responses_expires_at ON public.cached_responses(expires_at);

-- Enable RLS for security
ALTER TABLE public.cached_responses ENABLE ROW LEVEL SECURITY;

-- Allow public access for caching (since it's for lead generation)
CREATE POLICY "Allow public cache access" 
  ON public.cached_responses 
  FOR ALL 
  USING (true);

-- Create cleanup function to remove expired cache entries
CREATE OR REPLACE FUNCTION cleanup_expired_cache()
RETURNS void AS $$
BEGIN
  DELETE FROM public.cached_responses WHERE expires_at < now();
END;
$$ LANGUAGE plpgsql;
