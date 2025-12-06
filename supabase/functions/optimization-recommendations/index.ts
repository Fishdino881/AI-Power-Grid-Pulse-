import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { gridData } = body;
    
    // Input validation
    if (!gridData || typeof gridData !== 'object') {
      return new Response(
        JSON.stringify({ error: 'Invalid request: gridData object required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Sanitize grid data - only accept expected numeric/string fields
    const sanitizedData = {
      totalLoad: typeof gridData.totalLoad === 'number' ? Math.min(Math.max(gridData.totalLoad, 0), 1000000) : 0,
      renewablePercentage: typeof gridData.renewablePercentage === 'number' ? Math.min(Math.max(gridData.renewablePercentage, 0), 100) : 0,
      carbonIntensity: typeof gridData.carbonIntensity === 'number' ? Math.min(Math.max(gridData.carbonIntensity, 0), 10000) : 0,
      frequency: typeof gridData.frequency === 'number' ? Math.min(Math.max(gridData.frequency, 45), 75) : 60,
      gridStress: typeof gridData.gridStress === 'number' ? Math.min(Math.max(gridData.gridStress, 0), 100) : 50,
      region: typeof gridData.region === 'string' ? gridData.region.slice(0, 50) : 'Unknown',
    };

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = `You are an AI optimization specialist for power grid management.
Based on current grid conditions, generate 3-5 specific, actionable optimization recommendations.

Consider:
- Load balancing opportunities
- Renewable energy utilization
- Demand response potential
- Storage optimization
- Transmission efficiency
- Cost reduction strategies
- Carbon emission reduction

Format each recommendation with:
1. Title (brief, actionable)
2. Description (2-3 sentences)
3. Estimated impact (High/Medium/Low)
4. Implementation complexity (Easy/Moderate/Complex)
5. Estimated savings or improvement (specific metric)

Return recommendations as a JSON array.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Current grid data: Load: ${sanitizedData.totalLoad}MW, Renewable: ${sanitizedData.renewablePercentage}%, Carbon Intensity: ${sanitizedData.carbonIntensity}g/kWh, Frequency: ${sanitizedData.frequency}Hz, Grid Stress: ${sanitizedData.gridStress}%, Region: ${sanitizedData.region}. Generate optimization recommendations.` }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to generate recommendations' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const recommendations = data.choices?.[0]?.message?.content || 'Unable to generate recommendations';

    return new Response(JSON.stringify({ recommendations }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in optimization-recommendations function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
