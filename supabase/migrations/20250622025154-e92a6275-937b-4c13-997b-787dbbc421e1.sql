
-- Create table to store AI chat conversations and lead data
CREATE TABLE public.ai_chat_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  visitor_name TEXT,
  visitor_email TEXT,
  visitor_phone TEXT,
  travel_date DATE,
  destination TEXT,
  adults INTEGER DEFAULT 1,
  children INTEGER DEFAULT 0,
  children_ages INTEGER[],
  special_requests TEXT,
  package_type TEXT, -- honeymoon, adventure, family, religious, etc.
  budget_range TEXT,
  conversation_data JSONB DEFAULT '[]'::jsonb,
  lead_status TEXT DEFAULT 'new',
  whatsapp_handoff BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for blog content generation tracking
CREATE TABLE public.blog_generation_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  topic TEXT NOT NULL,
  keywords TEXT[],
  content TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Add indexes for better performance
CREATE INDEX idx_ai_chat_session_id ON public.ai_chat_conversations(session_id);
CREATE INDEX idx_ai_chat_lead_status ON public.ai_chat_conversations(lead_status);
CREATE INDEX idx_ai_chat_created_at ON public.ai_chat_conversations(created_at);
CREATE INDEX idx_blog_generation_status ON public.blog_generation_requests(status);

-- Add RLS policies (public access for lead generation)
ALTER TABLE public.ai_chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_generation_requests ENABLE ROW LEVEL SECURITY;

-- Allow public access for chat conversations (lead generation)
CREATE POLICY "Allow public chat conversations" 
  ON public.ai_chat_conversations 
  FOR ALL 
  USING (true);

-- Restrict blog generation to authenticated users only
CREATE POLICY "Allow authenticated blog generation" 
  ON public.blog_generation_requests 
  FOR ALL 
  USING (auth.role() = 'authenticated');

-- Add trigger to update updated_at
CREATE TRIGGER update_ai_chat_conversations_updated_at
  BEFORE UPDATE ON public.ai_chat_conversations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
