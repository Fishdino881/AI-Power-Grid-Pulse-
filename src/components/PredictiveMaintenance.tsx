import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const PredictiveMaintenance = () => {
  const maintenanceItems = [
    {
      id: 1,
      equipment: 'Transformer T-450',
      location: 'Western Substation',
      priority: 'high',
      predictedFailure: '7 days',
      confidence: 92,
      issue: 'Temperature anomaly detected',
      recommendation: 'Schedule inspection within 48 hours',
    },
    {
      id: 2,
      equipment: 'Circuit Breaker CB-203',
      location: 'Central Hub',
      priority: 'medium',
      predictedFailure: '21 days',
      confidence: 78,
      issue: 'Increased operating cycles',
      recommendation: 'Plan replacement in next maintenance window',
    },
    {
      id: 3,
      equipment: 'Generator G-12',
      location: 'Northern Plant',
      priority: 'low',
      predictedFailure: '45 days',
      confidence: 65,
      issue: 'Minor vibration increase',
      recommendation: 'Monitor closely, schedule diagnostic',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wrench className="h-5 w-5 text-primary" />
          Predictive Maintenance Scheduler
        </CardTitle>
        <CardDescription>
          AI-powered equipment failure prediction and maintenance optimization
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {maintenanceItems.map((item) => (
          <div
            key={item.id}
            className="p-4 border border-border/50 rounded-lg space-y-3 hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold">{item.equipment}</h4>
                  <Badge variant={getPriorityColor(item.priority)}>
                    {item.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  <span className="font-medium">Location:</span> {item.location}
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  <span className="font-medium">Issue:</span> {item.issue}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                  <Clock className="h-4 w-4" />
                  <span>{item.predictedFailure}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span>{item.confidence}% confidence</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Risk Level</span>
                <span className="font-medium">{item.confidence}%</span>
              </div>
              <Progress value={item.confidence} className="h-2" />
            </div>

            <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-md border border-primary/20">
              <AlertCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-foreground">{item.recommendation}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PredictiveMaintenance;