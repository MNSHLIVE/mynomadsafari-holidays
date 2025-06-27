
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize Supabase client
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

    // Check if we have Gemini API key
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    let aiResponse = '';

    if (!geminiApiKey) {
      console.log('GEMINI_API_KEY not found, using fallback responses');
      aiResponse = getFallbackResponse(message);
    } else {
      // Use Gemini API
      console.log('Using Gemini API for response generation');
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are a helpful travel assistant for MyNomadSafariHolidays, India's premier travel company. You help customers plan trips to domestic and international destinations.

Company Services:
- Domestic Tours: Kerala, Rajasthan, Goa, Himachal, Kashmir, Golden Triangle
- International Tours: Bali, Dubai, Thailand, Singapore, Maldives, Europe
- Religious Tours: Char Dham, Vaishno Devi, Golden Temple, South India temples
- Honeymoon Packages with romantic arrangements
- Adventure Tours: Trekking, Safari, Water sports
- Flight/Train Bookings & Visa Assistance

Important Instructions:
1. Be helpful and friendly
2. Ask for travel dates, destination preferences, and group size
3. Provide cost estimates when asked
4. Encourage users to use the Trip Calculator for exact quotes
5. Mention WhatsApp contact for booking: Delhi +91-9968682200, Mumbai +91-7042910449
6. Keep responses conversational and not too long
7. Always ask for user details (name, email, phone) before providing detailed quotes

Customer Query: ${message}`
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500,
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`Gemini API error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || getFallbackResponse(message);
        console.log('Gemini API response received successfully');
      } catch (apiError) {
        console.error('Gemini API error:', apiError);
        aiResponse = getFallbackResponse(message);
      }
    }

    // Store conversation in database
    try {
      const updatedConversation = [
        ...(conversationData || []),
        { role: 'user', content: message, timestamp: new Date().toISOString() },
        { role: 'assistant', content: aiResponse, timestamp: new Date().toISOString() }
      ];

      const { error: dbError } = await supabase
        .from('ai_chat_conversations')
        .upsert({
          session_id: sessionId,
          conversation_data: updatedConversation,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'session_id'
        });

      if (dbError) {
        console.error('Database storage error:', dbError);
      } else {
        console.log('Conversation stored successfully in database');
      }
    } catch (dbErr) {
      console.error('Failed to store conversation:', dbErr);
    }

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-chat function:', error);
    
    const fallbackResponse = `I'm here to help you plan your perfect trip! 🌟

While I'm experiencing a brief technical issue, you can still:

1. **Use Trip Calculator** - Get instant cost estimates
2. **Contact Our Executives**:
   - Delhi Office: +91-9968682200
   - Mumbai Office: +91-7042910449

Popular destinations we cover:
🇮🇳 **Domestic**: Kerala, Rajasthan, Goa, Himachal
🌍 **International**: Bali, Dubai, Thailand, Singapore

What destination interests you most?`;

    return new Response(JSON.stringify({ response: fallbackResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('kerala') || lowerMessage.includes('backwater')) {
    return `I'd be happy to help you plan your Kerala trip! 🌴

Kerala is one of our most popular destinations with:
- Beautiful backwaters in Alleppey & Kumarakom
- Hill stations like Munnar & Wayanad
- Beach destinations like Kovalam & Varkala
- Cultural experiences in Kochi & Thekkady

For a 6-day Kerala package, costs typically range from ₹25,000 to ₹60,000 per person depending on:
- Hotel category (3★ to 5★)
- Season (peak/off-peak)
- Inclusions (meals, activities)

To get exact quotes with your details, please use our Trip Calculator above or share your contact details so I can provide personalized assistance!`;

  } else if (lowerMessage.includes('rajasthan') || lowerMessage.includes('jaipur') || lowerMessage.includes('udaipur')) {
    return `Rajasthan is perfect for heritage and cultural tours! 🏰

Popular Rajasthan destinations:
- Jaipur (Pink City) - Amber Fort, City Palace
- Udaipur (City of Lakes) - Lake Palace, Jagdish Temple  
- Jodhpur (Blue City) - Mehrangarh Fort
- Jaisalmer (Golden City) - Desert Safari, Sam Dunes

A 7-day Rajasthan heritage tour typically costs ₹30,000 to ₹75,000 per person based on accommodation and season.

Please share your name, email, and phone number so I can provide you with detailed quotes and personalized itineraries!`;

  } else if (lowerMessage.includes('international') || lowerMessage.includes('bali') || lowerMessage.includes('dubai') || lowerMessage.includes('thailand')) {
    return `Great choice for international travel! ✈️

Our popular international packages:
🏝️ Bali (4-6 days): ₹45,000 - ₹85,000 per person
🏙️ Dubai (4-5 days): ₹40,000 - ₹70,000 per person  
🇹🇭 Thailand (5-7 days): ₹50,000 - ₹90,000 per person
🇸🇬 Singapore (4-5 days): ₹55,000 - ₹95,000 per person

Prices include flights, hotels, transfers & sightseeing.

To proceed with booking, I'll need your contact details. Please use the "Your Details" button above to share your information!`;

  } else if (lowerMessage.includes('budget') || lowerMessage.includes('cheap') || lowerMessage.includes('affordable')) {
    return `We have excellent budget-friendly options! 💰

Budget Tour Suggestions:
🏔️ Himachal (Manali-Shimla): ₹15,000 - ₹25,000
🏖️ Goa: ₹12,000 - ₹22,000
🏛️ Golden Triangle (Delhi-Agra-Jaipur): ₹18,000 - ₹30,000
⛰️ Uttarakhand (Rishikesh-Haridwar): ₹14,000 - ₹24,000

These include accommodation, meals, transfers & sightseeing.

Please share your contact details using the "Your Details" button so I can customize these packages for you!`;

  } else if (lowerMessage.includes('honeymoon') || lowerMessage.includes('romantic')) {
    return `Perfect for a romantic getaway! 💕

Top Honeymoon Destinations:
🏝️ Kerala Backwaters: ₹35,000 - ₹65,000 (5-6 days)
🏰 Rajasthan Heritage: ₹40,000 - ₹80,000 (6-7 days)
🏔️ Kashmir: ₹30,000 - ₹60,000 (5-6 days)
🌊 Goa Beach: ₹25,000 - ₹45,000 (4-5 days)
🏝️ Bali International: ₹65,000 - ₹1,20,000 (5-6 days)

All packages include romantic dinners, couple activities & premium stays.

To create your perfect honeymoon itinerary, please share your details using the "Your Details" button above!`;

  } else {
    return `Welcome to MyNomadSafariHolidays! 🌟 I'm here to help you plan your perfect trip.

I can assist you with:
🇮🇳 **Domestic Tours**: Kerala, Rajasthan, Goa, Himachal, Kashmir
🌍 **International**: Bali, Dubai, Thailand, Singapore, Maldives  
🙏 **Religious Tours**: Char Dham, Golden Temple, South India temples
💕 **Honeymoon Packages**: Romantic destinations with special arrangements
🎒 **Adventure Tours**: Trekking, Safari, Water sports

Popular Services:
✈️ Flight & Train Bookings
🛂 Visa Assistance  
🏨 Hotel Reservations
🚌 Transportation

To get started, please:
1. Click "Your Details" to share your contact information
2. Use "Trip Calculator" for instant cost estimates
3. Tell me your preferred destination and travel dates

What destination interests you most?`;
  }
}
