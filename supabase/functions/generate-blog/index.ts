
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
    const { topic, keywords } = await req.json();
    
    if (!topic) {
      throw new Error('Topic is required');
    }

    const deepseekApiKey = Deno.env.get('DEEPSEEK_API_KEY');
    if (!deepseekApiKey) {
      throw new Error('DeepSeek API key not configured');
    }

    // Create blog generation request
    const { data: blogRequest, error: insertError } = await supabase
      .from('blog_generation_requests')
      .insert({
        topic,
        keywords: keywords || [],
        status: 'generating'
      })
      .select()
      .single();

    if (insertError) {
      throw new Error(`Error creating blog request: ${insertError.message}`);
    }

    // Generate blog content using DeepSeek
    const systemPrompt = `You are an expert travel blog writer for MyNomadSafariHolidays. Create engaging, SEO-optimized blog content about travel destinations and experiences.

WRITING STYLE:
- Engaging and informative
- Include practical travel tips
- Mention specific destinations we serve
- Add call-to-actions for booking
- Use storytelling elements
- Include relevant keywords naturally
- Make it shareable on social media

DESTINATIONS TO FOCUS ON:
- Domestic: Kerala, Rajasthan, Himachal Pradesh, Goa, Kashmir, Ladakh
- International: Bali, Dubai, Thailand, Singapore, Maldives
- Religious: Char Dham, Golden Temple, Varanasi, Tirupati
- Adventure: Trekking, Wildlife Safaris, Water Sports

Create a comprehensive blog post (800-1200 words) with:
1. Catchy headline
2. Introduction
3. Main content with subheadings
4. Practical tips
5. Call-to-action
6. Meta description for SEO`;

    const userPrompt = `Write a travel blog post about: ${topic}
    
    ${keywords && keywords.length > 0 ? `Include these keywords naturally: ${keywords.join(', ')}` : ''}
    
    Make it engaging, informative, and promotional for MyNomadSafariHolidays tour packages.`;

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${deepseekApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.8,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`DeepSeek API error: ${error}`);
    }

    const data = await response.json();
    const blogContent = data.choices[0].message.content;

    // Update blog request with generated content
    const { error: updateError } = await supabase
      .from('blog_generation_requests')
      .update({
        content: blogContent,
        status: 'completed'
      })
      .eq('id', blogRequest.id);

    if (updateError) {
      console.error('Error updating blog request:', updateError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        content: blogContent,
        blogId: blogRequest.id 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-blog function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
