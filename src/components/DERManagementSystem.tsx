import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Network, Zap, Battery, Sun, Car } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const DERManagementSystem = () => {
  const derAssets = [
    { name: 'Rooftop Solar', value: 2450, color: '#eab308', icon: Sun },
    { name: 'Home Batteries', value: 890, color: '#3b82f6', icon: Battery },
    { name: 'EV Chargers', value: 1230, color: '#22c55e', icon: Car },
    { name: 'Small Wind', value: 340, color: '#06b6d4', icon: Zap },
  ];

  const totalDER = derAssets.reduce((sum, asset) => sum + asset.value, 0);

  const derMetrics = [
    {
      metric: 'Active DERs',
      value: '4,910',
      change: '+125 today',
      percentage: 95,
      status: 'operational',
    },
    {
      metric: 'Total Capacity',
      value: '892 MW',
      change: '+12 MW',
      percentage: 78,
      status: 'online',
    },
    {
      metric: 'Grid Support',
      value: '156 MW',
      change: '18% of peak',
      percentage: 18,
      status: 'active',
    },
    {
      metric: 'Response Time',
      value: '0.8s',
      change: 'Avg dispatch',
      percentage: 92,
      status: 'excellent',
    },
  ];

  const aggregationZones = [
    {
      zone: 'Residential North',
      assets: 1245,
      capacity: '235 MW',
      status: 'online',
      utilization: 68,
      priority: 'high',
    },
    {
      zone: 'Commercial District',
      assets: 890,
      capacity: '412 MW',
      status: 'online',
      utilization: 82,
      priority: 'critical',
    },
    {
      zone: 'Industrial Park',
      assets: 456,
      capacity: '156 MW',
      status: 'online',
      utilization: 45,
      priority: 'medium',
    },
    {
      zone: 'Suburban East',
      assets: 2319,
      capacity: '89 MW',
      status: 'online',
      utilization: 34,
      priority: 'low',
    },
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'online': return 'default';
      case 'operational': return 'secondary';
      case 'offline': return 'destructive';
      default: return 'outline';
    }
  };

  const getPriorityColor = (priority: string) => {
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
          <Network className="h-5 w-5 text-primary" />
          Distributed Energy Resources (DER)
        </CardTitle>
        <CardDescription>
          Managing 4,910+ solar panels, batteries, and EV chargers across the grid
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {derMetrics.map((metric) => (
            <div
              key={metric.metric}
              className="p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{metric.metric}</span>
                <Badge variant="outline" className="text-xs">
                  {metric.status}
                </Badge>
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
              <div className="text-xs text-muted-foreground mb-2">{metric.change}</div>
              <Progress value={metric.percentage} className="h-2" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-semibold mb-3">DER Asset Distribution</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={derAssets}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {derAssets.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-3">
              {derAssets.map((asset) => {
                const Icon = asset.icon;
                return (
                  <div key={asset.name} className="flex items-center gap-2 text-xs">
                    <Icon className="h-4 w-4" style={{ color: asset.color }} />
                    <span className="text-muted-foreground">{asset.name}:</span>
                    <span className="font-medium">{asset.value}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Aggregation Zones</h4>
            <div className="space-y-3">
              {aggregationZones.map((zone) => (
                <div
                  key={zone.zone}
                  className="p-3 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Network className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-sm">{zone.zone}</span>
                    </div>
                    <div className="flex gap-1">
                      <Badge variant={getPriorityColor(zone.priority)} className="text-xs">
                        {zone.priority}
                      </Badge>
                      <Badge variant={getStatusVariant(zone.status)} className="text-xs">
                        {zone.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                    <div className="text-muted-foreground">
                      Assets: <span className="font-medium text-foreground">{zone.assets}</span>
                    </div>
                    <div className="text-muted-foreground">
                      Capacity: <span className="font-medium text-foreground">{zone.capacity}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Utilization</span>
                      <span className="font-medium">{zone.utilization}%</span>
                    </div>
                    <Progress value={zone.utilization} className="h-1.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
            <h4 className="font-semibold mb-2 text-sm">Current Dispatch</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Solar Export:</span>
                <span className="font-medium text-foreground">+82 MW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Battery Discharge:</span>
                <span className="font-medium text-foreground">+45 MW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">EV V2G:</span>
                <span className="font-medium text-foreground">+29 MW</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
            <h4 className="font-semibold mb-2 text-sm">Grid Services</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frequency Support:</span>
                <Badge variant="default" className="text-xs">Active</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Voltage Regulation:</span>
                <Badge variant="default" className="text-xs">Active</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Peak Shaving:</span>
                <Badge variant="secondary" className="text-xs">Standby</Badge>
              </div>
            </div>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
            <h4 className="font-semibold mb-2 text-sm">Forecasted Availability</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Next Hour:</span>
                <span className="font-medium text-foreground">168 MW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Peak Today:</span>
                <span className="font-medium text-foreground">245 MW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Confidence:</span>
                <span className="font-medium text-foreground">94%</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DERManagementSystem;