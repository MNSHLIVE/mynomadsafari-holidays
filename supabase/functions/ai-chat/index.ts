
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, sessionId, conversationData } = await req.json();
    console.log('AI Chat request received:', { sessionId, messageLength: message?.length || 0 });

    if (!message || !sessionId) {
      throw new Error('Missing required fields: message or sessionId');
    }

    // Get conversation context to avoid repetition
    const conversationHistory = conversationData || [];
    const userHasDetails = conversationHistory.some(msg => 
      msg.content?.toLowerCase().includes('email') || 
      msg.content?.toLowerCase().includes('phone')
    );

    // Check for user details in database
    const { data: existingConversation } = await supabase
      .from('ai_chat_conversations')
      .select('visitor_name, visitor_email, visitor_phone, destination')
      .eq('session_id', sessionId)
      .single();

    const hasUserDetails = existingConversation?.visitor_name && 
                          existingConversation?.visitor_email && 
                          existingConversation?.visitor_phone;

    // Enhanced context tracking to avoid repetition
    const hasContactDetailsInConversation = conversationHistory.some(msg => 
      msg.content?.toLowerCase().includes('thanks') && 
      msg.content?.toLowerCase().includes('name')
    );

    let aiResponse = '';
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

    if (!geminiApiKey) {
      console.log('GEMINI_API_KEY not found, using optimized fallback responses');
      aiResponse = getOptimizedFallbackResponse(message, hasUserDetails, conversationHistory);
    } else {
      try {
        const contextualPrompt = buildContextualPrompt(message, hasUserDetails, conversationHistory);
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: contextualPrompt
              }]
            }],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 150, // Reduced for shorter responses
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`Gemini API error: ${response.status}`);
        }

        const data = await response.json();
        aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                     getOptimizedFallbackResponse(message, hasUserDetails, conversationHistory);
        
      } catch (apiError) {
        console.error('Gemini API error:', apiError);
        aiResponse = getOptimizedFallbackResponse(message, hasUserDetails, conversationHistory);
      }
    }

    // Store conversation
    try {
      const updatedConversation = [
        ...conversationHistory,
        { role: 'user', content: message, timestamp: new Date().toISOString() },
        { role: 'assistant', content: aiResponse, timestamp: new Date().toISOString() }
      ];

      await supabase
        .from('ai_chat_conversations')
        .upsert({
          session_id: sessionId,
          conversation_data: updatedConversation,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'session_id'
        });
    } catch (dbErr) {
      console.error('Failed to store conversation:', dbErr);
    }

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-chat function:', error);
    
    const fallbackResponse = "Hi! I'm here to help plan your perfect trip. Share your travel destination and I'll provide instant quotes and assistance! 📞 Quick help: Delhi +91-9968682200 | Mumbai +91-7042910449";

    return new Response(JSON.stringify({ response: fallbackResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function buildContextualPrompt(message: string, hasUserDetails: boolean, conversationHistory: any[]): string {
  const recentMessages = conversationHistory.slice(-4).map(msg => `${msg.role}: ${msg.content}`).join('\n');
  
  return `You are a concise travel assistant for MyNomadSafariHolidays. Keep responses under 50 words.

RULES:
- Give short, direct answers only
- Don't repeat information already discussed
- Focus on ONE thing at a time
- If user has details, discuss destinations/packages
- If no details, ask for contact info first
- Always end with WhatsApp numbers for booking

Services: Tours (Domestic/International), Flights, Trains, Visa
WhatsApp: Delhi +91-9968682200, Mumbai +91-7042910449

Recent conversation:
${recentMessages}

User has contact details: ${hasUserDetails ? 'YES' : 'NO'}
Current question: ${message}

Response (max 50 words):`;
}

function getOptimizedFallbackResponse(message: string, hasUserDetails: boolean, conversationHistory: any[]): string {
  const lowerMessage = message.toLowerCase();
  
  // Check if already asked this question recently
  const recentTopics = conversationHistory.slice(-6).map(msg => msg.content?.toLowerCase() || '');
  const hasContactDetailsInConversation = conversationHistory.some(msg => 
    msg.content?.toLowerCase().includes('thanks') && 
    msg.content?.toLowerCase().includes('name')
  );
  
  // Only ask for details if we don't have them AND haven't already thanked them
  if (!hasUserDetails && !hasContactDetailsInConversation) {
    return "Hi! I need your name, email & phone to provide personalized quotes. Share your details and destination interest! 📞 Delhi: +91-9968682200 | Mumbai: +91-7042910449";
  }

  // Avoid repetition - check recent topics
  if (lowerMessage.includes('kerala') && recentTopics.some(topic => topic.includes('kerala'))) {
    return "Ready to book Kerala? Contact our executive: Delhi +91-9968682200 | Mumbai +91-7042910449 for instant confirmation!";
  }

  if (lowerMessage.includes('rajasthan') && recentTopics.some(topic => topic.includes('rajasthan'))) {
    return "Let's finalize your Rajasthan trip! WhatsApp: Delhi +91-9968682200 | Mumbai +91-7042910449";
  }

  // Quick destination responses
  if (lowerMessage.includes('kerala')) {
    return "Kerala 5D: ₹25K-60K per person. Backwaters, hills, beaches included. Book now: Delhi +91-9968682200 | Mumbai +91-7042910449";
  }
  
  if (lowerMessage.includes('rajasthan')) {
    return "Rajasthan 6D: ₹30K-75K per person. Palaces, forts, desert safari. Contact: Delhi +91-9968682200 | Mumbai +91-7042910449";
  }
  
  if (lowerMessage.includes('goa')) {
    return "Goa 4D: ₹20K-45K per person. Beaches, nightlife, water sports. Book: Delhi +91-9968682200 | Mumbai +91-7042910449";
  }
  
  if (lowerMessage.includes('bali')) {
    return "Bali 5D: ₹65K-120K per person. Flights, hotels, activities included. Contact: Delhi +91-9968682200 | Mumbai +91-7042910449";
  }
  
  if (lowerMessage.includes('dubai')) {
    return "Dubai 4D: ₹50K-90K per person. City tour, desert safari included. Book: Delhi +91-9968682200 | Mumbai +91-7042910449";
  }
  
  if (lowerMessage.includes('visa')) {
    return "Visa assistance available for all countries. Documents needed: passport, photos, forms. Apply: Use Visa Form button above!";
  }
  
  if (lowerMessage.includes('flight')) {
    return "Flight bookings: Domestic & International. Best prices guaranteed. Book: Use Flight Booking button or call executives!";
  }

  // Default response for qualified leads
  return "Which destination interests you? Kerala, Rajasthan, Goa, Dubai, or Bali? I'll share instant pricing! Quick booking: Delhi +91-9968682200 | Mumbai +91-7042910449";
}
