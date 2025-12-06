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
    const { anomalyData } = body;
    
    // Input validation
    if (!anomalyData || typeof anomalyData !== 'object') {
      return new Response(
        JSON.stringify({ error: 'Invalid request: anomalyData object required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Sanitize anomaly data - only accept expected fields with length limits
    const sanitizedData = {
      id: typeof anomalyData.id === 'number' ? anomalyData.id : 0,
      type: typeof anomalyData.type === 'string' ? anomalyData.type.slice(0, 100) : 'Unknown',
      severity: typeof anomalyData.severity === 'string' ? anomalyData.severity.slice(0, 20) : 'unknown',
      location: typeof anomalyData.location === 'string' ? anomalyData.location.slice(0, 100) : 'Unknown',
      value: typeof anomalyData.value === 'string' ? anomalyData.value.slice(0, 100) : 'N/A',
      timestamp: typeof anomalyData.timestamp === 'string' ? anomalyData.timestamp.slice(0, 50) : new Date().toISOString(),
    };

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = `You are an expert power grid analyst specializing in anomaly detection and root cause analysis. 
Analyze the provided anomaly data and determine the most likely root causes. Consider:
- Historical patterns and trends
- Equipment health and maintenance records
- Weather conditions and seasonal factors
- Market conditions and demand patterns
- Interconnection issues
- Generation mix changes

Provide a clear, concise analysis with:
1. Primary root cause (most likely)
2. Contributing factors
3. Recommended actions
4. Confidence level (0-100%)

Keep the response under 200 words, focused on actionable insights.`;

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
          { role: 'user', content: `Analyze this anomaly: Type: ${sanitizedData.type}, Severity: ${sanitizedData.severity}, Location: ${sanitizedData.location}, Value: ${sanitizedData.value}, Time: ${sanitizedData.timestamp}` }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to analyze anomaly' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const analysis = data.choices?.[0]?.message?.content || 'Unable to generate analysis';

    return new Response(JSON.stringify({ analysis }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in anomaly-analysis function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
