import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const OptimizationRecommendations = () => {
  const [recommendations, setRecommendations] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const sampleGridData = {
    totalDemand: 245,
    renewableGeneration: 45,
    conventionalGeneration: 200,
    carbonIntensity: 285,
    transmissionLosses: 5.8,
    frequencyDeviation: -0.05,
    price: 42,
  };

  const generateRecommendations = async () => {
    setIsGenerating(true);
    setRecommendations('');

    try {
      const { data, error } = await supabase.functions.invoke('optimization-recommendations', {
        body: { gridData: sampleGridData }
      });

      if (error) throw error;

      setRecommendations(data.recommendations);
      toast({
        title: "Recommendations Generated",
        description: "AI has analyzed current grid conditions",
      });
    } catch (error) {
      console.error('Error generating recommendations:', error);
      toast({
        title: "Generation Failed",
        description: "Could not generate recommendations",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          AI Optimization Recommendations
        </CardTitle>
        <CardDescription>
          AI suggests grid optimization strategies based on current and predicted conditions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Get AI-powered recommendations to optimize grid performance
          </p>
          <Button 
            onClick={generateRecommendations} 
            disabled={isGenerating}
            size="sm"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
            Generate
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground">Demand</p>
            <p className="text-lg font-bold">{sampleGridData.totalDemand} GW</p>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground">Renewable</p>
            <p className="text-lg font-bold text-energy-renewable">{sampleGridData.renewableGeneration} GW</p>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground">Carbon</p>
            <p className="text-lg font-bold">{sampleGridData.carbonIntensity} g/kWh</p>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground">Losses</p>
            <p className="text-lg font-bold">{sampleGridData.transmissionLosses}%</p>
          </div>
        </div>

        {isGenerating ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-3">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
              <p className="text-sm text-muted-foreground">Analyzing grid conditions...</p>
            </div>
          </div>
        ) : recommendations ? (
          <div className="space-y-4">
            <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Optimization Strategy</h4>
              </div>
              <div className="text-sm whitespace-pre-wrap space-y-4">
                {recommendations}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-border/50 rounded-lg">
            <Lightbulb className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              Click "Generate" to get AI-powered optimization recommendations
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OptimizationRecommendations;