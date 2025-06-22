
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, sessionId, conversationData } = await req.json();
    
    if (!message || !sessionId) {
      throw new Error('Message and sessionId are required');
    }

    const deepseekApiKey = Deno.env.get('DEEPSEEK_API_KEY');
    if (!deepseekApiKey) {
      console.error('DEEPSEEK_API_KEY not found in environment');
      throw new Error('DeepSeek API key not configured');
    }

    console.log('Using DeepSeek API key:', deepseekApiKey.substring(0, 10) + '...');

    // Get or create conversation record
    let { data: conversation, error: fetchError } = await supabase
      .from('ai_chat_conversations')
      .select('*')
      .eq('session_id', sessionId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching conversation:', fetchError);
    }

    // Build conversation history
    let messages = [];
    if (conversation?.conversation_data) {
      messages = conversation.conversation_data as any[];
    }

    // Add user message
    messages.push({ role: 'user', content: message, timestamp: new Date().toISOString() });

    // Enhanced system prompt for lead generation
    const systemPrompt = `You are an AI travel assistant for MyNomadSafariHolidays, specialized in lead generation through natural conversation. Your primary goal is to gather customer information while providing helpful travel advice.

LEAD INFORMATION TO COLLECT (naturally during conversation):
1. Customer Name
2. Email Address  
3. Phone Number
4. Travel Date (when they want to travel)
5. Destination (where they want to go)
6. Number of Adults
7. Number of Children (and their ages up to 12 years)
8. Special Requests (Honeymoon, Adventure, Religious tours, specific activities)
9. Budget Range

CONVERSATION STYLE:
- Be warm, friendly, and genuinely helpful
- Ask questions naturally, not like a form
- Show expertise in Indian destinations (Kerala, Rajasthan, Himachal, Goa, etc.)
- Also cover international destinations (Bali, Dubai, Thailand, Singapore)
- When you have gathered key information, offer to connect them with a travel expert via WhatsApp

CURRENT LEAD STATUS:
${conversation ? `
Name: ${conversation.visitor_name || 'Not provided'}
Email: ${conversation.visitor_email || 'Not provided'}
Phone: ${conversation.visitor_phone || 'Not provided'}
Travel Date: ${conversation.travel_date || 'Not provided'}
Destination: ${conversation.destination || 'Not provided'}
Adults: ${conversation.adults || 'Not specified'}
Children: ${conversation.children || 'Not specified'}
Special Requests: ${conversation.special_requests || 'None mentioned'}
` : 'New conversation - no details collected yet'}

If you notice the user has provided any of the above information in their message, acknowledge it and ask follow-up questions to complete the profile. When you have enough information, offer WhatsApp connection for personalized assistance.

Keep responses concise and engaging. Always end with a question to keep the conversation flowing.`;

    // Call DeepSeek API with the correct endpoint and model
    console.log('Calling DeepSeek API...');
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${deepseekApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-r1',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.slice(-10) // Keep last 10 messages for context
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    console.log('DeepSeek API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('DeepSeek API error response:', errorText);
      throw new Error(`DeepSeek API error: ${errorText}`);
    }

    const data = await response.json();
    console.log('DeepSeek API response:', data);

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from DeepSeek API');
    }

    const aiResponse = data.choices[0].message.content;

    // Add AI response to messages
    messages.push({ role: 'assistant', content: aiResponse, timestamp: new Date().toISOString() });

    // Extract lead information from the conversation using simple keyword matching
    const messageText = message.toLowerCase();
    const updateData: any = {
      conversation_data: messages,
      updated_at: new Date().toISOString()
    };

    // Extract name
    if (messageText.includes('my name is') || messageText.includes('i am') || messageText.includes('call me')) {
      const nameMatch = message.match(/(?:my name is|i am|call me)\s+([a-zA-Z\s]+)/i);
      if (nameMatch) {
        updateData.visitor_name = nameMatch[1].trim();
      }
    }

    // Extract email
    const emailMatch = message.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
    if (emailMatch) {
      updateData.visitor_email = emailMatch[0];
    }

    // Extract phone
    const phoneMatch = message.match(/\b(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/);
    if (phoneMatch) {
      updateData.visitor_phone = phoneMatch[0];
    }

    // Extract destination
    const destinations = ['kerala', 'rajasthan', 'himachal', 'goa', 'bali', 'dubai', 'thailand', 'singapore', 'kashmir', 'ladakh', 'manali', 'shimla', 'udaipur', 'jaipur'];
    for (const dest of destinations) {
      if (messageText.includes(dest)) {
        updateData.destination = dest.charAt(0).toUpperCase() + dest.slice(1);
        break;
      }
    }

    // Extract adults/children count
    const adultsMatch = message.match(/(\d+)\s*adult/i);
    if (adultsMatch) {
      updateData.adults = parseInt(adultsMatch[1]);
    }

    const childrenMatch = message.match(/(\d+)\s*child/i);
    if (childrenMatch) {
      updateData.children = parseInt(childrenMatch[1]);
    }

    // Extract special requests
    const specialRequests = ['honeymoon', 'adventure', 'religious', 'family', 'luxury', 'budget'];
    for (const request of specialRequests) {
      if (messageText.includes(request)) {
        updateData.package_type = request.charAt(0).toUpperCase() + request.slice(1);
        updateData.special_requests = updateData.special_requests ? 
          `${updateData.special_requests}, ${request}` : request;
      }
    }

    // Update or create conversation record
    if (conversation) {
      const { error: updateError } = await supabase
        .from('ai_chat_conversations')
        .update(updateData)
        .eq('session_id', sessionId);
      
      if (updateError) {
        console.error('Error updating conversation:', updateError);
      }
    } else {
      const { error: insertError } = await supabase
        .from('ai_chat_conversations')
        .insert({
          session_id: sessionId,
          ...updateData
        });
      
      if (insertError) {
        console.error('Error creating conversation:', insertError);
      }
    }

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
