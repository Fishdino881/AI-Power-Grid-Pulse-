import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Activity, Zap, Database } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const GridResilienceScore = () => {
  const overallScore = 87;
  
  const resilienceMetrics = [
    {
      category: 'Redundancy',
      score: 92,
      icon: Database,
      description: 'Backup capacity and alternative routes',
      status: 'excellent',
    },
    {
      category: 'Stability',
      score: 85,
      icon: Activity,
      description: 'Frequency and voltage regulation',
      status: 'good',
    },
    {
      category: 'Recovery',
      score: 78,
      icon: Zap,
      description: 'Mean time to restore service',
      status: 'good',
    },
    {
      category: 'Protection',
      score: 94,
      icon: Shield,
      description: 'Cybersecurity and physical security',
      status: 'excellent',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-500';
      case 'good': return 'text-blue-500';
      case 'fair': return 'text-yellow-500';
      case 'poor': return 'text-red-500';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'excellent': return 'default';
      case 'good': return 'secondary';
      case 'fair': return 'outline';
      case 'poor': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Grid Resilience Score
        </CardTitle>
        <CardDescription>
          Comprehensive assessment of grid stability and recovery capabilities
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center p-6 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg border border-primary/30">
          <div className="text-6xl font-bold text-primary mb-2">{overallScore}</div>
          <div className="text-sm text-muted-foreground mb-3">Overall Resilience Score</div>
          <Badge variant="default" className="text-sm">Excellent Performance</Badge>
        </div>

        <div className="space-y-4">
          {resilienceMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.category}
                className="p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-primary/10 ${getStatusColor(metric.status)}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{metric.category}</h4>
                      <p className="text-xs text-muted-foreground">{metric.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground mb-1">{metric.score}</div>
                    <Badge variant={getStatusBadge(metric.status)} className="text-xs">
                      {metric.status}
                    </Badge>
                  </div>
                </div>
                <Progress value={metric.score} className="h-2" />
              </div>
            );
          })}
        </div>

        <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
          <h4 className="font-semibold mb-2">Recent Improvements</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Added 2 backup transmission lines (+5% redundancy)
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Upgraded cybersecurity protocols (+8% protection)
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Deployed predictive maintenance system (+3% recovery)
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default GridResilienceScore;