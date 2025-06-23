
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

    console.log('Using DeepSeek API via OpenRouter for chat completion');

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

    // Enhanced system prompt for travel assistance and lead generation
    const systemPrompt = `You are an AI travel assistant for MyNomadSafariHolidays, specialized in helping customers plan their perfect trip within their budget.

YOUR EXPERTISE:
- Domestic destinations: Kerala, Rajasthan, Himachal, Goa, Kashmir, Ladakh, Uttarakhand, etc.
- International destinations: Bali, Dubai, Thailand, Singapore, Maldives, etc.
- Package types: Honeymoon, Adventure, Family, Religious tours, Luxury, Budget-friendly
- Travel planning: Itineraries, accommodation, transportation, activities

CONVERSATION GOALS:
1. Help customers plan their ideal trip within budget
2. Naturally collect key information during conversation:
   - Customer name and contact details
   - Preferred destination and travel dates
   - Number of travelers (adults/children)
   - Budget range and special requirements
3. Provide helpful travel advice and recommendations
4. When you have sufficient information, offer to connect them with our travel experts

CURRENT CUSTOMER INFO:
${conversation ? `
Name: ${conversation.visitor_name || 'Not provided'}
Email: ${conversation.visitor_email || 'Not provided'}
Phone: ${conversation.visitor_phone || 'Not provided'}
Travel Date: ${conversation.travel_date || 'Not provided'}
Destination: ${conversation.destination || 'Not provided'}
Adults: ${conversation.adults || 'Not specified'}
Children: ${conversation.children || 'Not specified'}
Special Requests: ${conversation.special_requests || 'None mentioned'}
` : 'New conversation - gathering customer details'}

RESPONSE STYLE:
- Be warm, friendly, and genuinely helpful
- Ask natural questions (not like a form)
- Show your travel expertise
- Keep responses concise but informative (max 150 words)
- Always end with a relevant question to keep the conversation flowing
- When you have enough information, offer WhatsApp connection for personalized service
- Suggest getting a detailed itinerary PDF when appropriate

Remember: You're here to help plan amazing trips within budget, not just collect information!`;

    // Call DeepSeek API via OpenRouter
    console.log('Calling DeepSeek API via OpenRouter...');
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${deepseekApiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://mynomadsafariholidays.in',
        'X-Title': 'MyNomadSafariHolidays Travel Assistant',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.slice(-10) // Keep last 10 messages for context
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    console.log('DeepSeek API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('DeepSeek API error response:', errorText);
      console.error('Response status:', response.status);
      console.error('Response headers:', Object.fromEntries(response.headers.entries()));
      
      // Provide more specific error messages
      if (response.status === 401) {
        throw new Error('DeepSeek API authentication failed - please check API key');
      } else if (response.status === 429) {
        throw new Error('DeepSeek API rate limit exceeded - please try again in a moment');
      } else if (response.status === 403) {
        throw new Error('DeepSeek API access forbidden - please check your account permissions');
      }
      
      throw new Error(`DeepSeek API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    console.log('DeepSeek API response received successfully');

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid DeepSeek API response format:', data);
      throw new Error('Invalid response format from DeepSeek API');
    }

    const aiResponse = data.choices[0].message.content;

    // Add AI response to messages
    messages.push({ role: 'assistant', content: aiResponse, timestamp: new Date().toISOString() });

    // Enhanced lead information extraction
    const messageText = message.toLowerCase();
    const updateData: any = {
      conversation_data: messages,
      updated_at: new Date().toISOString()
    };

    // Extract name (improved patterns)
    if (messageText.includes('my name is') || messageText.includes('i am') || messageText.includes('call me') || messageText.includes('i\'m')) {
      const namePatterns = [
        /(?:my name is|i am|call me|i'm)\s+([a-zA-Z\s]+)/i,
        /(?:myself|hi,?\s+i'm|hello,?\s+i'm)\s+([a-zA-Z\s]+)/i
      ];
      
      for (const pattern of namePatterns) {
        const nameMatch = message.match(pattern);
        if (nameMatch) {
          updateData.visitor_name = nameMatch[1].trim();
          break;
        }
      }
    }

    // Extract email
    const emailMatch = message.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
    if (emailMatch) {
      updateData.visitor_email = emailMatch[0];
    }

    // Extract phone (improved patterns)
    const phonePatterns = [
      /\+?\d{1,3}[-.\s]?\(?\d{3,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/,
      /\b\d{10}\b/,
      /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/
    ];
    
    for (const pattern of phonePatterns) {
      const phoneMatch = message.match(pattern);
      if (phoneMatch) {
        updateData.visitor_phone = phoneMatch[0];
        break;
      }
    }

    // Extract destination (expanded list)
    const destinations = [
      'kerala', 'rajasthan', 'himachal', 'goa', 'bali', 'dubai', 'thailand', 'singapore', 
      'kashmir', 'ladakh', 'manali', 'shimla', 'udaipur', 'jaipur', 'cochin', 'munnar',
      'maldives', 'sri lanka', 'nepal', 'bhutan', 'vietnam', 'malaysia', 'indonesia',
      'uttarakhand', 'rishikesh', 'haridwar', 'darjeeling', 'ooty', 'kodaikanal'
    ];
    
    for (const dest of destinations) {
      if (messageText.includes(dest)) {
        updateData.destination = dest.charAt(0).toUpperCase() + dest.slice(1);
        break;
      }
    }

    // Extract travel dates
    const datePatterns = [
      /(?:in|on)\s+(january|february|march|april|may|june|july|august|september|october|november|december)/i,
      /\b(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})\b/,
      /(?:next|this)\s+(week|month|year)/i
    ];
    
    for (const pattern of datePatterns) {
      if (message.match(pattern)) {
        updateData.travel_date = new Date().toISOString().split('T')[0]; // Placeholder
        break;
      }
    }

    // Extract adults/children count
    const adultsMatch = message.match(/(\d+)\s*(?:adult|person|people)/i);
    if (adultsMatch) {
      updateData.adults = parseInt(adultsMatch[1]);
    }

    const childrenMatch = message.match(/(\d+)\s*(?:child|kid|children)/i);
    if (childrenMatch) {
      updateData.children = parseInt(childrenMatch[1]);
    }

    // Extract budget information
    const budgetMatch = message.match(/budget.*?(\d+(?:,\d+)*(?:\.\d+)?)\s*(?:k|thousand|lakh|lakhs|rupees?|rs\.?|\₹)/i);
    if (budgetMatch) {
      updateData.budget_range = budgetMatch[0];
    }

    // Extract special requests and package types
    const specialRequests = ['honeymoon', 'adventure', 'religious', 'family', 'luxury', 'budget', 'pilgrimage', 'wildlife', 'beach', 'mountain'];
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
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    // Return a helpful fallback response with error context
    let fallbackResponse = "I'm here to help you plan your perfect trip! I can assist you with destinations like Kerala, Rajasthan, Goa, Bali, Dubai, and many more. What destination are you interested in exploring, and what's your travel budget?";
    
    // Add specific guidance based on error type
    if (error.message.includes('rate limit')) {
      fallbackResponse = "I'm experiencing high demand right now. Please try again in a moment, or feel free to contact us directly via WhatsApp for immediate assistance with your travel planning!";
    } else if (error.message.includes('authentication') || error.message.includes('API key')) {
      fallbackResponse = "I'm having technical difficulties right now. Please try again in a few moments, or contact us directly via WhatsApp for immediate assistance with your travel planning!";
    }
    
    return new Response(
      JSON.stringify({ response: fallbackResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
