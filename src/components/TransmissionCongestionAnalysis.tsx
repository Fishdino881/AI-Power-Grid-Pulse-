import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Layers, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const TransmissionCongestionAnalysis = () => {
  const corridorData = [
    { corridor: 'North-South', utilization: 92, limit: 100, cost: 28500, status: 'critical' },
    { corridor: 'East-West', utilization: 78, limit: 100, cost: 15200, status: 'warning' },
    { corridor: 'Central Hub', utilization: 65, limit: 100, cost: 8900, status: 'normal' },
    { corridor: 'Coastal Line', utilization: 88, limit: 100, cost: 22100, status: 'warning' },
    { corridor: 'Mountain Pass', utilization: 45, limit: 100, cost: 3200, status: 'normal' },
  ];

  const congestionMetrics = [
    {
      metric: 'Congested Lines',
      value: '12 of 48',
      percentage: 25,
      icon: Layers,
      color: 'text-red-500',
    },
    {
      metric: 'Congestion Cost',
      value: '$78,900',
      percentage: 100,
      icon: DollarSign,
      color: 'text-yellow-500',
    },
    {
      metric: 'Peak Utilization',
      value: '92%',
      percentage: 92,
      icon: TrendingUp,
      color: 'text-orange-500',
    },
    {
      metric: 'At Risk Corridors',
      value: '4',
      percentage: 8,
      icon: AlertTriangle,
      color: 'text-red-500',
    },
  ];

  const bottlenecks = [
    {
      location: 'North-South Corridor (Line 450)',
      issue: 'Near thermal limit',
      utilization: 92,
      cost: '$28,500/hour',
      solution: 'Redispatch generation or enable parallel path',
      priority: 'critical',
    },
    {
      location: 'Coastal Transmission (Line 203)',
      issue: 'High power flow',
      utilization: 88,
      cost: '$22,100/hour',
      solution: 'Curtail renewable generation or increase import',
      priority: 'high',
    },
    {
      location: 'East-West Link (Line 156)',
      issue: 'Loading above normal',
      utilization: 78,
      cost: '$15,200/hour',
      solution: 'Monitor closely and prepare load relief',
      priority: 'medium',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'normal': return '#22c55e';
      default: return 'hsl(var(--muted))';
    }
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-primary" />
          Transmission Congestion Analysis
        </CardTitle>
        <CardDescription>
          Real-time identification and management of grid bottlenecks
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {congestionMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.metric}
                className="p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`h-5 w-5 ${metric.color}`} />
                  <span className="text-xs text-muted-foreground">{metric.metric}</span>
                </div>
                <div className="text-2xl font-bold text-foreground mb-2">{metric.value}</div>
                <Progress value={metric.percentage} className="h-2" />
              </div>
            );
          })}
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Transmission Corridor Utilization</h4>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={corridorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="corridor" 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
                label={{ value: 'Utilization (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="utilization" name="Utilization %">
                {corridorData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getStatusColor(entry.status)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Critical Bottlenecks & Solutions</h4>
          <div className="space-y-3">
            {bottlenecks.map((bottleneck, index) => (
              <div
                key={index}
                className="p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span className="font-semibold text-sm">{bottleneck.location}</span>
                      <Badge variant={getPriorityVariant(bottleneck.priority)} className="text-xs">
                        {bottleneck.priority}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      <span className="font-medium">Issue:</span> {bottleneck.issue}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-500 mb-1">{bottleneck.utilization}%</div>
                    <div className="text-xs text-muted-foreground">{bottleneck.cost}</div>
                  </div>
                </div>
                <Progress value={bottleneck.utilization} className="h-2 mb-3" />
                <div className="p-3 bg-primary/10 rounded border border-primary/30 text-xs">
                  <div className="font-medium text-primary mb-1">Recommended Action:</div>
                  <div className="text-muted-foreground">{bottleneck.solution}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
            <h4 className="font-semibold mb-3 text-sm">Cost Breakdown</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Congestion Charges:</span>
                <span className="font-medium text-foreground">$78,900</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Redispatch Costs:</span>
                <span className="font-medium text-foreground">$42,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lost Opportunity:</span>
                <span className="font-medium text-foreground">$25,300</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 mt-2">
                <span className="text-muted-foreground font-semibold">Total Impact:</span>
                <span className="font-bold text-foreground">$146,700</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
            <h4 className="font-semibold mb-3 text-sm">Mitigation Actions</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Generator Redispatch:</span>
                <Badge variant="default" className="text-xs">Active</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Load Curtailment:</span>
                <Badge variant="secondary" className="text-xs">Standby</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Parallel Path:</span>
                <Badge variant="default" className="text-xs">Enabled</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phase Shifter:</span>
                <Badge variant="secondary" className="text-xs">Monitoring</Badge>
              </div>
            </div>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
            <h4 className="font-semibold mb-3 text-sm">Today's Summary</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Peak Congestion:</span>
                <span className="font-medium text-foreground">16:30</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-medium text-foreground">3.5 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Affected Load:</span>
                <span className="font-medium text-foreground">1,245 MW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Events:</span>
                <span className="font-medium text-foreground">7</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransmissionCongestionAnalysis;