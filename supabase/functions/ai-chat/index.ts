
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

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      console.error('GEMINI_API_KEY not found in environment');
      throw new Error('Gemini API key not configured');
    }

    console.log('Using Google Gemini 1.5 Flash API for chat completion');

    // Check cache first
    const cacheKey = `${message.toLowerCase().trim()}`;
    const { data: cachedResponse } = await supabase
      .from('cached_responses')
      .select('response_text')
      .eq('query_hash', cacheKey)
      .single();

    let aiResponse = '';

    if (cachedResponse) {
      console.log('Using cached response');
      aiResponse = cachedResponse.response_text;
    } else {
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

      // Enhanced system prompt for travel assistance
      const systemPrompt = `You are an AI travel assistant for MyNomadSafariHolidays, specialized in creating perfect travel experiences within budget.

YOUR EXPERTISE:
- Domestic destinations: Kerala, Rajasthan, Himachal, Goa, Kashmir, Ladakh, Uttarakhand, etc.
- International destinations: Bali, Dubai, Thailand, Singapore, Maldives, etc.
- Package types: Honeymoon, Adventure, Family, Religious tours, Luxury, Budget-friendly
- Travel planning: Itineraries, accommodation, transportation, activities

CONVERSATION GOALS:
1. Help customers plan their ideal trip within budget
2. Guide them to use our Trip Calculator for accurate costing
3. Collect trip details naturally during conversation:
   - Preferred destination and travel dates
   - Number of travelers (adults/children)
   - Budget range and special requirements
4. Provide helpful travel advice and recommendations
5. Offer to generate detailed itinerary with costing when ready

CURRENT CUSTOMER INFO:
${conversation ? `
Travel Date: ${conversation.travel_date || 'Not provided'}
Destination: ${conversation.destination || 'Not provided'}
Adults: ${conversation.adults || 'Not specified'}
Children: ${conversation.children || 'Not specified'}
Special Requests: ${conversation.special_requests || 'None mentioned'}
` : 'New conversation - gathering trip details'}

RESPONSE STYLE:
- Be warm, friendly, and genuinely helpful
- Ask natural questions about their travel preferences
- Show your travel expertise with specific recommendations
- Keep responses concise but informative (max 150 words)
- Guide users to our Trip Calculator for accurate pricing
- Always end with a relevant question to keep conversation flowing
- When you have trip details, offer to create detailed itinerary PDF
- Mention that our Trip Calculator gives instant cost estimates

TRIP CALCULATOR GUIDANCE:
When users ask about costs, guide them to use our Trip Calculator:
"I recommend using our Trip Calculator for accurate cost estimates. You can find it on our website - it gives instant pricing for domestic and international tours based on your specific requirements like destination, dates, number of travelers, and hotel category. Would you like me to help you gather the details needed for the calculator?"

Remember: You're here to help plan amazing trips within budget and guide users to our tools for accurate pricing!

User message: ${message}`;

      // Call Google Gemini 1.5 Flash API
      console.log('Calling Google Gemini 1.5 Flash API...');
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: systemPrompt }]
          }]
        }),
      });

      console.log('Gemini API response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Gemini API error response:', errorText);
        console.error('Response status:', response.status);
        
        if (response.status === 401) {
          throw new Error('Gemini API authentication failed - please check API key');
        } else if (response.status === 429) {
          throw new Error('Gemini API rate limit exceeded - please try again in a moment');
        } else if (response.status === 403) {
          throw new Error('Gemini API access forbidden - please check your account permissions');
        }
        
        throw new Error(`Gemini API error (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      console.log('Gemini API response received successfully');

      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
        console.error('Invalid Gemini API response format:', data);
        throw new Error('Invalid response format from Gemini API');
      }

      aiResponse = data.candidates[0].content.parts[0].text;

      // Cache the response
      await supabase
        .from('cached_responses')
        .insert({
          query_hash: cacheKey,
          response_text: aiResponse,
          api_source: 'gemini'
        });
    }

    // Add AI response to messages
    const messages = conversation?.conversation_data as any[] || [];
    messages.push({ role: 'user', content: message, timestamp: new Date().toISOString() });
    messages.push({ role: 'assistant', content: aiResponse, timestamp: new Date().toISOString() });

    // Extract trip information
    const messageText = message.toLowerCase();
    const updateData: any = {
      conversation_data: messages,
      updated_at: new Date().toISOString()
    };

    // Extract destination
    const destinations = [
      'kerala', 'rajasthan', 'himachal', 'goa', 'bali', 'dubai', 'thailand', 'singapore', 
      'kashmir', 'ladakh', 'manali', 'shimla', 'udaipur', 'jaipur', 'cochin', 'munnar',
      'maldives', 'sri lanka', 'nepal', 'bhutan', 'vietnam', 'malaysia', 'indonesia',
      'uttarakhand', 'rishikesh', 'haridwar', 'darjeeling', 'ooty', 'kodaikanal', 'bangalore'
    ];
    
    for (const dest of destinations) {
      if (messageText.includes(dest)) {
        updateData.destination = dest.charAt(0).toUpperCase() + dest.slice(1);
        break;
      }
    }

    // Extract travel dates, adults/children count, budget
    const datePatterns = [
      /(?:in|on)\s+(january|february|march|april|may|june|july|august|september|october|november|december)/i,
      /\b(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})\b/,
      /(?:next|this)\s+(week|month|year)/i
    ];
    
    for (const pattern of datePatterns) {
      if (message.match(pattern)) {
        updateData.travel_date = new Date().toISOString().split('T')[0];
        break;
      }
    }

    const adultsMatch = message.match(/(\d+)\s*(?:adult|person|people)/i);
    if (adultsMatch) {
      updateData.adults = parseInt(adultsMatch[1]);
    }

    const childrenMatch = message.match(/(\d+)\s*(?:child|kid|children)/i);
    if (childrenMatch) {
      updateData.children = parseInt(childrenMatch[1]);
    }

    const budgetMatch = message.match(/budget.*?(\d+(?:,\d+)*(?:\.\d+)?)\s*(?:k|thousand|lakh|lakhs|rupees?|rs\.?|\₹)/i);
    if (budgetMatch) {
      updateData.budget_range = budgetMatch[0];
    }

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
    
    let fallbackResponse = "I'm here to help you plan your perfect trip! I can assist you with destinations like Kerala, Rajasthan, Goa, Bali, Dubai, and many more. For accurate pricing, I recommend using our Trip Calculator. What destination interests you?";
    
    if (error.message.includes('rate limit')) {
      fallbackResponse = "I'm experiencing high demand right now. Please try again in a moment, or use our Trip Calculator for instant cost estimates while I recover!";
    } else if (error.message.includes('authentication') || error.message.includes('API key')) {
      fallbackResponse = "I'm having technical difficulties. Please try our Trip Calculator for instant cost estimates while I get back online!";
    }
    
    return new Response(
      JSON.stringify({ response: fallbackResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
