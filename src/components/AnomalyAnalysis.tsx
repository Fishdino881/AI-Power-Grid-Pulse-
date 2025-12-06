import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Brain, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AnomalyAnalysis = () => {
  const [selectedAnomaly, setSelectedAnomaly] = useState<any>(null);
  const [analysis, setAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const anomalies = [
    {
      id: 1,
      type: 'Demand Spike',
      severity: 'high',
      location: 'Western Grid',
      value: '+32% above forecast',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
    },
    {
      id: 2,
      type: 'Frequency Deviation',
      severity: 'medium',
      location: 'Central Hub',
      value: '59.85 Hz (normal: 60Hz)',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 3,
      type: 'Transmission Loss',
      severity: 'medium',
      location: 'North-South Line',
      value: '8.2% (normal: 5%)',
      timestamp: new Date(Date.now() - 5400000).toISOString(),
    },
  ];

  const analyzeAnomaly = async (anomaly: any) => {
    setSelectedAnomaly(anomaly);
    setIsAnalyzing(true);
    setAnalysis('');

    try {
      const { data, error } = await supabase.functions.invoke('anomaly-analysis', {
        body: { anomalyData: anomaly }
      });

      if (error) throw error;

      setAnalysis(data.analysis);
      toast({
        title: "Analysis Complete",
        description: "AI has identified the root cause",
      });
    } catch (error) {
      console.error('Error analyzing anomaly:', error);
      toast({
        title: "Analysis Failed",
        description: "Could not complete anomaly analysis",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500/20 text-red-500 border-red-500/50';
      case 'medium': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50';
      case 'low': return 'bg-blue-500/20 text-blue-500 border-blue-500/50';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Anomaly Root Cause Analysis
        </CardTitle>
        <CardDescription>
          AI automatically investigates anomalies and suggests probable causes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {anomalies.map((anomaly) => (
            <div
              key={anomaly.id}
              className="p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
              onClick={() => analyzeAnomaly(anomaly)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">{anomaly.type}</span>
                    <Badge variant="outline" className={getSeverityColor(anomaly.severity)}>
                      {anomaly.severity}
                    </Badge>
                  </div>
                  <div className="text-sm space-y-1">
                    <p className="text-muted-foreground">
                      <span className="font-medium">Location:</span> {anomaly.location}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-medium">Value:</span> {anomaly.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(anomaly.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Analyze
                </Button>
              </div>
            </div>
          ))}
        </div>

        {selectedAnomaly && (
          <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border/50 space-y-3">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <h4 className="font-semibold">AI Analysis Results</h4>
            </div>
            
            {isAnalyzing ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : analysis ? (
              <div className="space-y-3">
                <p className="text-sm whitespace-pre-wrap">{analysis}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Click "Analyze" on an anomaly to get AI-powered root cause analysis
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnomalyAnalysis;