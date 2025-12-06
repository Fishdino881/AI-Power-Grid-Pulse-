import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Shield, Zap, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const PredictiveAlerts = () => {
  const predictions = [
    {
      id: 1,
      title: 'Peak Demand Surge',
      description: 'Demand expected to exceed 280 GW within next 4 hours',
      probability: 85,
      timeframe: '4 hours',
      severity: 'high',
      icon: TrendingUp,
      recommendation: 'Activate demand response programs and reserve capacity',
    },
    {
      id: 2,
      title: 'Renewable Generation Drop',
      description: 'Wind generation forecasted to decrease by 40% due to weather',
      probability: 72,
      timeframe: '6 hours',
      severity: 'medium',
      icon: Zap,
      recommendation: 'Prepare backup generation sources and adjust market positions',
    },
    {
      id: 3,
      title: 'Grid Stability Risk',
      description: 'Frequency instability predicted during evening peak',
      probability: 68,
      timeframe: '8 hours',
      severity: 'medium',
      icon: Shield,
      recommendation: 'Increase spinning reserves and monitor frequency closely',
    },
    {
      id: 4,
      title: 'Transmission Congestion',
      description: 'North-South corridor likely to reach capacity limits',
      probability: 91,
      timeframe: '2 hours',
      severity: 'high',
      icon: AlertCircle,
      recommendation: 'Reroute power flows and consider load shedding in constrained areas',
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500/20 text-red-500 border-red-500/50';
      case 'medium': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50';
      case 'low': return 'bg-blue-500/20 text-blue-500 border-blue-500/50';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getProgressColor = (probability: number) => {
    if (probability >= 80) return 'bg-red-500';
    if (probability >= 60) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Predictive Alerts
        </CardTitle>
        <CardDescription>
          AI predicts potential issues before they occur with confidence scores
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {predictions.map((prediction) => {
          const Icon = prediction.icon;
          return (
            <div
              key={prediction.id}
              className="p-4 border border-border/50 rounded-lg space-y-3 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold">{prediction.title}</h4>
                    <p className="text-sm text-muted-foreground">{prediction.description}</p>
                  </div>
                </div>
                <Badge variant="outline" className={getSeverityColor(prediction.severity)}>
                  {prediction.severity}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Confidence Level</span>
                  <span className="font-bold">{prediction.probability}%</span>
                </div>
                <Progress 
                  value={prediction.probability} 
                  className="h-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Expected In</p>
                  <p className="font-semibold">{prediction.timeframe}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Action Required</p>
                  <p className="font-semibold text-primary">Yes</p>
                </div>
              </div>

              <div className="pt-3 border-t border-border/50">
                <p className="text-xs text-muted-foreground mb-1">Recommended Action:</p>
                <p className="text-sm">{prediction.recommendation}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default PredictiveAlerts;