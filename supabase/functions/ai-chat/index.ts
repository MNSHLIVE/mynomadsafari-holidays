
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
                text: `You are a helpful travel assistant for MyNomadSafariHolidays, India's premier travel company. You help customers with comprehensive travel services.

Company Services:
- Domestic Tours: Kerala, Rajasthan, Goa, Himachal, Kashmir, Golden Triangle
- International Tours: Bali, Dubai, Thailand, Singapore, Maldives, Europe
- Religious Tours: Char Dham, Vaishno Devi, Golden Temple, South India temples
- Honeymoon Packages with romantic arrangements
- Adventure Tours: Trekking, Safari, Water sports
- Flight Bookings (Domestic & International)
- Train & Bus Bookings
- Visa Assistance for all countries
- Hotel Bookings & Travel Insurance

Important Instructions:
1. Be helpful and friendly
2. For tour packages: Ask for travel dates, destination preferences, and group size
3. For flights/trains: Ask departure city, destination, travel dates, and passenger count
4. For visa assistance: Ask destination country, nationality, and travel purpose
5. Provide cost estimates when asked
6. Encourage users to use forms for specific services (Visa Form, Flight Booking, Train Booking)
7. Mention WhatsApp contact for booking: Delhi +91-9968682200, Mumbai +91-7042910449
8. Keep responses conversational and not too long
9. Always ask for user details (name, email, phone) before providing detailed quotes

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
    
    const fallbackResponse = `I'm here to help you with all your travel needs! 🌟

**Our Services:**
🏖️ **Tour Packages** - Domestic & International destinations
✈️ **Flight Bookings** - Best deals on domestic & international flights
🚂 **Train & Bus Bookings** - Convenient travel across India
🛂 **Visa Services** - Complete visa assistance for all countries
🏨 **Hotel Bookings** - Comfortable stays worldwide

**Contact Our Executives:**
📞 Delhi Office: +91-9968682200
📞 Mumbai Office: +91-7042910449

Use the service buttons below or tell me what you're looking for!`;

    return new Response(JSON.stringify({ response: fallbackResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('visa')) {
    return `I can help you with visa services! 🛂

**Visa Services We Offer:**
• Tourist Visas - All countries
• Business Visas
• Student Visas
• Work Permits
• Transit Visas

**Required Documents:**
✓ Valid passport (min 6 months validity)
✓ Passport photos
✓ Application forms
✓ Supporting documents (varies by country)

**Popular Destinations:**
🇺🇸 USA - Tourist/Business Visa
🇬🇧 UK - Standard Visitor Visa
🇨🇦 Canada - Visitor Visa
🇦🇺 Australia - Tourist Visa
🇪🇺 Schengen - Europe Multi-country

Click "Visa Form" button to start your application or contact our executives for personalized assistance!`;

  } else if (lowerMessage.includes('flight')) {
    return `I can help you with flight bookings! ✈️

**Flight Services:**
🛫 **Domestic Flights** - All Indian cities
🌍 **International Flights** - Worldwide destinations
💼 **Corporate Bookings** - Business travel solutions
👥 **Group Bookings** - Special rates for groups

**Popular Routes:**
• Delhi ↔ Mumbai, Bangalore, Chennai
• International: Dubai, Bangkok, Singapore, London

**Benefits:**
✅ Best fare guarantee
✅ 24/7 customer support
✅ Easy cancellation/rescheduling
✅ Seat selection & meal preferences

Click "Flight Booking" button to check availability and prices, or tell me your travel dates and destinations!`;

  } else if (lowerMessage.includes('train') || lowerMessage.includes('bus')) {
    return `I can help you with train and bus bookings! 🚂🚌

**Train Services:**
🚄 All Indian Railways bookings
🎫 Tatkal & Premium Tatkal tickets
🛏️ AC/Non-AC class options
👥 Group bookings available

**Bus Services:**
🚌 Volvo, Sleeper, Semi-sleeper buses
🌃 Overnight journeys
🏙️ Inter-city & Inter-state travel

**Popular Routes:**
• Delhi - Mumbai, Bangalore, Chennai, Kolkata
• Golden Quadrilateral routes
• Hill station connections

**Features:**
✅ Instant confirmation
✅ E-tickets via email/SMS
✅ Cancellation protection
✅ Seat selection

Click "Train Booking" button to book your journey or share your travel details with me!`;

  } else if (lowerMessage.includes('kerala') || lowerMessage.includes('backwater')) {
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
    return `Welcome to MyNomadSafariHolidays! 🌟 I'm here to help you with all your travel needs.

**Our Complete Services:**
🏖️ **Tour Packages**: Kerala, Rajasthan, Goa, Himachal, Kashmir, International destinations
✈️ **Flight Bookings**: Domestic & International with best prices
🚂 **Train & Bus**: Comfortable travel across India
🛂 **Visa Services**: Complete assistance for all countries
🏨 **Hotel Bookings**: Comfortable stays worldwide
💕 **Honeymoon Packages**: Romantic destinations with special arrangements
🎒 **Adventure Tours**: Trekking, Safari, Water sports

**Quick Actions:**
• Click "Your Details" to share contact information
• Use "Trip Calculator" for instant cost estimates
• Use service buttons for specific bookings (Visa, Flight, Train)
• Contact executives directly via WhatsApp

What can I help you with today?`;
  }
}
