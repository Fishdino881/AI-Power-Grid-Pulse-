import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Zap, TrendingDown, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const VoltageStabilityAnalysis = () => {
  const voltageData = [
    { bus: 'Bus-1', voltage: 1.02, limit: 1.05, lower: 0.95, status: 'normal' },
    { bus: 'Bus-2', voltage: 0.98, limit: 1.05, lower: 0.95, status: 'normal' },
    { bus: 'Bus-3', voltage: 1.04, limit: 1.05, lower: 0.95, status: 'normal' },
    { bus: 'Bus-4', voltage: 0.93, limit: 1.05, lower: 0.95, status: 'warning' },
    { bus: 'Bus-5', voltage: 1.01, limit: 1.05, lower: 0.95, status: 'normal' },
    { bus: 'Bus-6', voltage: 0.96, limit: 1.05, lower: 0.95, status: 'normal' },
  ];

  const timeSeriesData = [
    { time: '00:00', bus1: 1.02, bus4: 0.94, bus6: 0.97 },
    { time: '04:00', bus1: 1.01, bus4: 0.93, bus6: 0.96 },
    { time: '08:00', bus1: 1.03, bus4: 0.92, bus6: 0.98 },
    { time: '12:00', bus1: 1.04, bus4: 0.93, bus6: 0.99 },
    { time: '16:00', bus1: 1.03, bus4: 0.94, bus6: 0.98 },
    { time: '20:00', bus1: 1.02, bus4: 0.93, bus6: 0.97 },
  ];

  const stabilityMetrics = [
    {
      metric: 'Voltage Stability Index',
      value: '0.87',
      status: 'Good',
      percentage: 87,
      icon: Activity,
      color: 'text-green-500',
    },
    {
      metric: 'Critical Buses',
      value: '1/6',
      status: 'Monitor',
      percentage: 83,
      icon: AlertTriangle,
      color: 'text-yellow-500',
    },
    {
      metric: 'Reactive Reserve',
      value: '245 MVAr',
      status: 'Adequate',
      percentage: 68,
      icon: Zap,
      color: 'text-blue-500',
    },
    {
      metric: 'Var Margin',
      value: '32%',
      status: 'Healthy',
      percentage: 75,
      icon: TrendingDown,
      color: 'text-green-500',
    },
  ];

  const criticalBuses = [
    {
      bus: 'Bus-4 (Western)',
      voltage: '0.93 pu',
      issue: 'Below minimum threshold',
      action: 'Increase reactive support',
      severity: 'high',
    },
    {
      bus: 'Bus-12 (Industrial)',
      voltage: '0.94 pu',
      issue: 'Heavy load condition',
      action: 'Monitor capacitor banks',
      severity: 'medium',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'default';
      case 'warning': return 'secondary';
      case 'critical': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Voltage Stability Analysis
        </CardTitle>
        <CardDescription>
          Real-time monitoring of voltage levels and stability margins across the grid
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {stabilityMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.metric}
                className="p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`h-5 w-5 ${metric.color}`} />
                  <Badge variant="outline" className="text-xs">
                    {metric.status}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground mb-1">{metric.metric}</div>
                <div className="text-2xl font-bold text-foreground mb-2">{metric.value}</div>
                <Progress value={metric.percentage} className="h-2" />
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-semibold mb-3">Bus Voltage Levels</h4>
            <div className="space-y-2">
              {voltageData.map((bus) => (
                <div
                  key={bus.bus}
                  className="p-3 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm">{bus.bus}</span>
                    <Badge variant={getStatusColor(bus.status)} className="text-xs">
                      {bus.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Voltage:</span>
                    <span className="font-medium">{bus.voltage} pu</span>
                  </div>
                  <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-primary rounded-full"
                      style={{ width: `${(bus.voltage / bus.limit) * 100}%` }}
                    />
                    <div
                      className="absolute top-0 bottom-0 w-px bg-red-500"
                      style={{ left: `${(bus.lower / bus.limit) * 100}%` }}
                    />
                    <div
                      className="absolute top-0 bottom-0 w-px bg-red-500"
                      style={{ left: `100%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{bus.lower} pu</span>
                    <span>{bus.limit} pu</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">24-Hour Voltage Trends</h4>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                  domain={[0.9, 1.1]}
                  label={{ value: 'Voltage (pu)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <ReferenceLine y={1.05} stroke="#ef4444" strokeDasharray="3 3" label="Upper Limit" />
                <ReferenceLine y={0.95} stroke="#ef4444" strokeDasharray="3 3" label="Lower Limit" />
                <Line 
                  type="monotone" 
                  dataKey="bus1" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={false}
                  name="Bus-1"
                />
                <Line 
                  type="monotone" 
                  dataKey="bus4" 
                  stroke="#eab308" 
                  strokeWidth={2}
                  dot={false}
                  name="Bus-4 (Critical)"
                />
                <Line 
                  type="monotone" 
                  dataKey="bus6" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  dot={false}
                  name="Bus-6"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Critical Conditions & Actions</h4>
          <div className="space-y-2">
            {criticalBuses.map((bus, index) => (
              <div
                key={index}
                className="p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <span className="font-semibold text-sm">{bus.bus}</span>
                      <Badge variant={bus.severity === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                        {bus.severity}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span className="font-medium">Voltage:</span>
                        <span>{bus.voltage}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span className="font-medium">Issue:</span>
                        <span>{bus.issue}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 bg-primary/10 rounded border border-primary/30 text-xs">
                    <div className="font-medium text-primary mb-1">Recommended Action:</div>
                    <div className="text-muted-foreground">{bus.action}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
            <h4 className="font-semibold mb-2 text-sm">Reactive Power</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Generation:</span>
                <span className="font-medium text-foreground">820 MVAr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Load:</span>
                <span className="font-medium text-foreground">575 MVAr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reserve:</span>
                <span className="font-medium text-foreground">245 MVAr</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
            <h4 className="font-semibold mb-2 text-sm">Compensation Devices</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Capacitors:</span>
                <Badge variant="default" className="text-xs">12 Active</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">SVCs:</span>
                <Badge variant="default" className="text-xs">4 Active</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">STATCOMs:</span>
                <Badge variant="default" className="text-xs">2 Active</Badge>
              </div>
            </div>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
            <h4 className="font-semibold mb-2 text-sm">System Status</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stability Margin:</span>
                <span className="font-medium text-green-500">Good</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Weak Buses:</span>
                <span className="font-medium text-foreground">2 of 48</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Auto Control:</span>
                <Badge variant="default" className="text-xs">Enabled</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoltageStabilityAnalysis;