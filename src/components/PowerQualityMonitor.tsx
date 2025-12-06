import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Zap, Radio, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const PowerQualityMonitor = () => {
  const frequencyData = [
    { time: '00:00', frequency: 60.02, voltage: 238.5, thd: 2.1 },
    { time: '04:00', frequency: 59.98, voltage: 239.2, thd: 1.8 },
    { time: '08:00', frequency: 60.01, voltage: 237.8, thd: 2.3 },
    { time: '12:00', frequency: 59.96, voltage: 240.1, thd: 2.0 },
    { time: '16:00', frequency: 60.03, voltage: 236.9, thd: 2.5 },
    { time: '20:00', frequency: 59.99, voltage: 239.5, thd: 1.9 },
  ];

  const qualityMetrics = [
    {
      name: 'Frequency Stability',
      value: '59.99 Hz',
      target: '60.00 Hz',
      deviation: '-0.01 Hz',
      status: 'excellent',
      icon: Radio,
      percentage: 99.8,
    },
    {
      name: 'Voltage Regulation',
      value: '238.8 V',
      target: '240.0 V',
      deviation: '-1.2 V',
      status: 'good',
      icon: Zap,
      percentage: 99.5,
    },
    {
      name: 'Harmonic Distortion',
      value: '2.1%',
      target: '<3.0%',
      deviation: 'Within limits',
      status: 'excellent',
      icon: Activity,
      percentage: 70,
    },
    {
      name: 'Power Factor',
      value: '0.97',
      target: '>0.95',
      deviation: '+0.02',
      status: 'excellent',
      icon: TrendingDown,
      percentage: 97,
    },
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'excellent': return 'default';
      case 'good': return 'secondary';
      case 'fair': return 'outline';
      default: return 'destructive';
    }
  };

  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Power Quality Monitor
        </CardTitle>
        <CardDescription>
          Real-time voltage, frequency, and harmonic distortion tracking
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {qualityMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.name}
                className="p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <h4 className="text-sm font-semibold">{metric.name}</h4>
                  </div>
                  <Badge variant={getStatusVariant(metric.status)}>
                    {metric.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-foreground">{metric.value}</span>
                    <span className="text-xs text-muted-foreground">Target: {metric.target}</span>
                  </div>
                  <Progress value={metric.percentage} className="h-2" />
                  <p className="text-xs text-muted-foreground">{metric.deviation}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">24-Hour Quality Trends</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={frequencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                yAxisId="left"
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
                domain={[59.9, 60.1]}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
                domain={[235, 242]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="frequency" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))', r: 3 }}
                name="Frequency (Hz)"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="voltage" 
                stroke="hsl(var(--energy-renewable))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--energy-renewable))', r: 3 }}
                name="Voltage (V)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
          <h4 className="font-semibold mb-2">Quality Alerts (Last 24h)</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total Events</span>
              <Badge variant="outline">3</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Voltage Sags</span>
              <Badge variant="outline">1</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Frequency Deviations</span>
              <Badge variant="outline">2</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Average Duration</span>
              <span className="font-medium">0.3s</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PowerQualityMonitor;