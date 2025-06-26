
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

interface ItineraryRequest {
  customerName: string;
  email: string;
  phone: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  adults: number;
  children: number;
  totalCost: number;
  perPersonCost: number;
  hotelCategory: string;
  packageType: string;
  specialRequests?: string;
  sessionId?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const itineraryData: ItineraryRequest = await req.json();
    
    console.log('Generating PDF itinerary for:', itineraryData.customerName);

    // Generate PDF content as HTML (we'll use HTML-to-PDF conversion)
    const htmlContent = generateItineraryHTML(itineraryData);
    
    // Store itinerary request in database for CRM
    const { data: itinerary, error: insertError } = await supabase
      .from('tour_package_requests')
      .insert({
        name: itineraryData.customerName,
        email: itineraryData.email,
        phone: itineraryData.phone,
        destination_name: itineraryData.destination,
        departure_date: itineraryData.departureDate,
        return_date: itineraryData.returnDate,
        travel_date: itineraryData.departureDate,
        adults: itineraryData.adults,
        children: itineraryData.children,
        package_type: itineraryData.packageType,
        special_requirements: itineraryData.specialRequests,
        estimated_price: `₹${itineraryData.totalCost.toLocaleString()}`,
        trip_type: 'Package Tour'
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error storing itinerary request:', insertError);
    }

    // Update AI chat conversation if sessionId provided
    if (itineraryData.sessionId) {
      await supabase
        .from('ai_chat_conversations')
        .update({ 
          lead_status: 'itinerary_generated',
          visitor_name: itineraryData.customerName,
          visitor_email: itineraryData.email,
          visitor_phone: itineraryData.phone
        })
        .eq('session_id', itineraryData.sessionId);
    }

    // Send email with itinerary
    const emailResult = await supabase.functions.invoke('send-email', {
      body: {
        to: itineraryData.email,
        cc: ['info@mynomadsafariholidays.in'],
        subject: `Your Travel Itinerary - ${itineraryData.destination} Package`,
        html: htmlContent,
        text: `Dear ${itineraryData.customerName},\n\nThank you for your interest in our ${itineraryData.destination} package. Please find your detailed itinerary attached.\n\nTotal Cost: ₹${itineraryData.totalCost.toLocaleString()}\nPer Person: ₹${itineraryData.perPersonCost.toLocaleString()}\n\nWe'll contact you shortly to finalize the details.\n\nBest regards,\nMyNomadSafariHolidays Team`
      }
    });

    console.log('Email sent result:', emailResult);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Itinerary generated and sent successfully',
        itineraryId: itinerary?.id,
        emailSent: !emailResult.error
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-itinerary-pdf function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

function generateItineraryHTML(data: ItineraryRequest): string {
  const travelDays = calculateDays(data.departureDate, data.returnDate);
  
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Travel Itinerary - ${data.destination}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
        .header { text-align: center; border-bottom: 3px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
        .logo { font-size: 32px; font-weight: bold; color: #2563eb; margin-bottom: 10px; }
        .company-tagline { font-size: 16px; color: #666; font-style: italic; margin-bottom: 15px; }
        .company-info { font-size: 14px; color: #666; }
        .customer-info { background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
        .itinerary-section { margin-bottom: 30px; }
        .section-title { font-size: 20px; font-weight: bold; color: #2563eb; border-bottom: 2px solid #93c5fd; padding-bottom: 5px; margin-bottom: 15px; }
        .day-item { background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 15px; margin-bottom: 15px; }
        .day-title { font-weight: bold; color: #1e40af; margin-bottom: 8px; }
        .cost-breakdown { background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 20px; margin-bottom: 30px; }
        .cost-item { display: flex; justify-content: space-between; margin-bottom: 8px; }
        .total-cost { font-size: 18px; font-weight: bold; color: #2563eb; border-top: 2px solid #2563eb; padding-top: 10px; margin-top: 15px; }
        .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #666; }
        .contact-info { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 6px; padding: 15px; margin: 20px 0; }
        .confirmation-section { background: #dcfce7; border: 1px solid #16a34a; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
        .confirmation-title { font-size: 18px; font-weight: bold; color: #15803d; margin-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #e2e8f0; }
        th { background-color: #f1f5f9; font-weight: bold; }
        .company-contacts { background: #f1f5f9; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 15px; }
        .contact-item { text-align: center; }
        .contact-label { font-weight: bold; color: #2563eb; margin-bottom: 5px; }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">🌍 MyNomadSafariHolidays</div>
        <div class="company-tagline">Creating Unforgettable Travel Experiences Within Your Budget</div>
        <div class="company-info">
            Your Trusted Travel Partner Since Years<br>
            Domestic & International Tour Specialists
        </div>
    </div>

    <div class="customer-info">
        <h2>Travel Itinerary & Cost Estimate</h2>
        <table>
            <tr><td><strong>Customer Name:</strong></td><td>${data.customerName}</td></tr>
            <tr><td><strong>Email:</strong></td><td>${data.email}</td></tr>
            <tr><td><strong>Phone:</strong></td><td>${data.phone}</td></tr>
            <tr><td><strong>Destination:</strong></td><td>${data.destination}</td></tr>
            <tr><td><strong>Travel Dates:</strong></td><td>${formatDate(data.departureDate)} to ${formatDate(data.returnDate)}</td></tr>
            <tr><td><strong>Duration:</strong></td><td>${travelDays} Days / ${travelDays - 1} Nights</td></tr>
            <tr><td><strong>Travelers:</strong></td><td>${data.adults} Adults${data.children > 0 ? ' + ' + data.children + ' Children' : ''}</td></tr>
            <tr><td><strong>Package Type:</strong></td><td>${data.packageType}</td></tr>
            <tr><td><strong>Hotel Category:</strong></td><td>${data.hotelCategory}</td></tr>
        </table>
    </div>

    <div class="cost-breakdown">
        <div class="section-title">💰 Package Cost Breakdown</div>
        <div class="cost-item">
            <span>Base Package Cost (${data.adults} Adults${data.children > 0 ? ' + ' + data.children + ' Children' : ''}):</span>
            <span><strong>₹${data.totalCost.toLocaleString()}</strong></span>
        </div>
        <div class="cost-item">
            <span>Cost Per Person:</span>
            <span><strong>₹${data.perPersonCost.toLocaleString()}</strong></span>
        </div>
        <div class="total-cost">
            <div class="cost-item">
                <span>Total Package Investment:</span>
                <span>₹${data.totalCost.toLocaleString()}</span>
            </div>
        </div>
        <p style="margin-top: 15px; font-size: 14px; color: #666;">
            * This is an estimated cost based on your selected preferences. Final pricing may vary based on availability and seasonal factors.
        </p>
    </div>

    <div class="itinerary-section">
        <div class="section-title">📋 Detailed Day-wise Itinerary</div>
        ${generateDayWiseItinerary(data.destination, travelDays)}
    </div>

    <div class="itinerary-section">
        <div class="section-title">🏨 Package Inclusions</div>
        <div class="day-item">
            <ul>
                <li>Accommodation in ${data.hotelCategory} hotels with daily breakfast</li>
                <li>All transfers and sightseeing by private air-conditioned vehicle</li>
                <li>Professional English-speaking tour guide</li>
                <li>All entrance fees to monuments and attractions as per itinerary</li>
                <li>Complimentary airport transfers</li>
                <li>24/7 customer support throughout your journey</li>
                <li>All applicable taxes and service charges</li>
            </ul>
        </div>
    </div>

    <div class="itinerary-section">
        <div class="section-title">❌ Package Exclusions</div>
        <div class="day-item">
            <ul>
                <li>Domestic/International flight tickets (can be arranged separately)</li>
                <li>Lunch and dinner (unless specifically mentioned)</li>
                <li>Personal expenses, laundry, telephone calls, and tips</li>
                <li>Travel insurance (highly recommended)</li>
                <li>Camera fees at monuments (where applicable)</li>
                <li>Any activities not mentioned in the itinerary</li>
                <li>GST (as applicable)</li>
            </ul>
        </div>
    </div>

    ${data.specialRequests ? `
    <div class="itinerary-section">
        <div class="section-title">📝 Special Requests</div>
        <div class="day-item">
            ${data.specialRequests}
        </div>
    </div>
    ` : ''}

    <div class="confirmation-section">
        <div class="confirmation-title">Ready to Confirm Your Dream Trip?</div>
        <p>If you are satisfied with this itinerary and costing, please send us your confirmation email at:</p>
        <h3 style="color: #2563eb; margin: 10px 0;">info@mynomadsafariholidays.in</h3>
        <p>Our travel experts will contact you within 2 hours to finalize all arrangements and process your booking.</p>
    </div>

    <div class="company-contacts">
        <div class="section-title">📞 Contact Our Travel Experts</div>
        <div class="contact-grid">
            <div class="contact-item">
                <div class="contact-label">Delhi Office</div>
                <div>📱 WhatsApp: +91-9968682200</div>
                <div>📧 Email: info@mynomadsafariholidays.in</div>
            </div>
            <div class="contact-item">
                <div class="contact-label">Mumbai Office</div>
                <div>📱 WhatsApp: +91-7042910449</div>
                <div>📧 Email: info@mynomadsafariholidays.in</div>
            </div>
        </div>
        <div style="text-align: center; margin-top: 15px;">
            <strong>Website:</strong> www.mynomadsafariholidays.in
        </div>
    </div>

    <div class="contact-info">
        <strong>🤝 What Happens Next?</strong><br>
        1. Send confirmation email to info@mynomadsafariholidays.in<br>
        2. Our expert will call you within 2 hours<br>
        3. Finalize dates, customize itinerary if needed<br>
        4. Make advance payment to secure your booking<br>
        5. Receive complete travel documents before departure
    </div>

    <div class="footer">
        <p><strong>MyNomadSafariHolidays</strong> - Your Dreams, Our Expertise, Perfect Journeys</p>
        <p>This is a preliminary itinerary and cost estimate. Final details and pricing will be confirmed upon booking.</p>
        <p>Generated on: ${new Date().toLocaleDateString('en-IN', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        })} | Document ID: ${data.sessionId || 'PDF-' + Date.now()}</p>
    </div>
</body>
</html>`;
}

function generateDayWiseItinerary(destination: string, days: number): string {
  const itineraries: { [key: string]: string[] } = {
    'kerala': [
      'Arrival in Cochin - Check-in to hotel, visit Chinese Fishing Nets, explore Fort Kochi',
      'Cochin to Munnar - Drive through scenic tea plantations, visit Cheeyappara Waterfalls',
      'Munnar sightseeing - Tea Museum, Mattupetty Dam, Echo Point, Kundala Lake',
      'Munnar to Thekkady - Spice plantation visit, Periyar Wildlife Sanctuary',
      'Thekkady to Alleppey - Houseboat check-in, cruise through backwaters',
      'Alleppey to Cochin - Departure'
    ],
    'rajasthan': [
      'Arrival in Jaipur - Check-in, visit Hawa Mahal, local markets',
      'Jaipur sightseeing - Amber Fort, City Palace, Jantar Mantar',
      'Jaipur to Jodhpur - Drive to Blue City, visit Mehrangarh Fort',
      'Jodhpur to Jaisalmer - Golden city arrival, Jaisalmer Fort',
      'Jaisalmer - Sam Sand Dunes, camel safari, cultural evening',
      'Jaisalmer to Udaipur - City of Lakes, City Palace',
      'Udaipur sightseeing - Lake Pichola boat ride, Jagdish Temple, departure'
    ],
    'goa': [
      'Arrival in Goa - Check-in to beach resort, relax at Calangute Beach',
      'North Goa - Baga Beach, Anjuna Beach, Fort Aguada, water sports',
      'South Goa - Colva Beach, Palolem Beach, spice plantation visit',
      'Old Goa - Basilica of Bom Jesus, Se Cathedral, Dona Paula',
      'Leisure day - Beach activities, shopping, local cuisine',
      'Departure - Last-minute shopping, departure'
    ]
  };

  const defaultItinerary = [
    `Arrival in ${destination} - Airport pickup, hotel check-in, local orientation`,
    `${destination} sightseeing - Major attractions and landmarks`,
    `Cultural exploration - Local markets, traditional experiences`,
    `Adventure activities - Based on destination specialties`,
    `Leisure time - Relaxation and optional activities`,
    `Departure - Check-out and airport transfer`
  ];

  const dayPlan = itineraries[destination.toLowerCase()] || defaultItinerary;
  
  let itineraryHtml = '';
  for (let i = 0; i < Math.min(days, 6); i++) {
    const dayNumber = i + 1;
    const activities = dayPlan[i] || `Day ${dayNumber} - Sightseeing and local experiences`;
    
    itineraryHtml += `
      <div class="day-item">
        <div class="day-title">Day ${dayNumber}:</div>
        <div>${activities}</div>
      </div>
    `;
  }
  
  return itineraryHtml;
}

function calculateDays(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1; // Include both start and end dates
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}
