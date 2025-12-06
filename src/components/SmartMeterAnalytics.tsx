import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Gauge, Wifi, WifiOff, Activity, TrendingUp, AlertTriangle, Zap, BarChart3 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useState, useEffect } from 'react';

const SmartMeterAnalytics = () => {
  const [liveReads, setLiveReads] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveReads(prev => prev + Math.floor(Math.random() * 500) + 200);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const meterStats = {
    total: 2340000,
    online: 2298600,
    offline: 41400,
    communicating: 99.2,
    dataQuality: 99.8,
  };

  const readingVolume = [
    { hour: '00:00', reads: 145000 },
    { hour: '04:00', reads: 142000 },
    { hour: '08:00', reads: 234000 },
    { hour: '12:00', reads: 289000 },
    { hour: '16:00', reads: 312000 },
    { hour: '20:00', reads: 276000 },
  ];

  const meterTypes = [
    { type: 'Residential', count: 1890000, percentage: 80.8 },
    { type: 'Commercial', count: 380000, percentage: 16.2 },
    { type: 'Industrial', count: 65000, percentage: 2.8 },
    { type: 'Street Lighting', count: 5000, percentage: 0.2 },
  ];

  const alerts = [
    { type: 'Tamper Detected', count: 23, severity: 'high' },
    { type: 'Communication Lost', count: 156, severity: 'medium' },
    { type: 'Voltage Anomaly', count: 89, severity: 'medium' },
    { type: 'Reverse Flow', count: 12, severity: 'low' },
  ];

  const consumptionPatterns = [
    { pattern: 'Normal', percentage: 94.2, color: 'hsl(var(--energy-renewable))' },
    { pattern: 'High Usage', percentage: 3.8, color: 'hsl(var(--energy-solar))' },
    { pattern: 'Low Usage', percentage: 1.5, color: 'hsl(var(--primary))' },
    { pattern: 'Anomalous', percentage: 0.5, color: 'hsl(var(--destructive))' },
  ];

  return (
    <Card className="glass-panel border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Gauge className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-foreground">Smart Meter Analytics</CardTitle>
              <p className="text-sm text-muted-foreground">Advanced metering infrastructure insights</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-energy-renewable/20 text-energy-renewable">
            <Activity className="h-3 w-3 mr-1 animate-pulse" />
            {liveReads.toLocaleString()} reads/min
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Fleet Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="p-3 rounded-lg bg-card/50 border border-border/50 text-center">
            <div className="text-xl font-bold text-foreground">{(meterStats.total / 1000000).toFixed(2)}M</div>
            <div className="text-xs text-muted-foreground">Total Meters</div>
          </div>
          <div className="p-3 rounded-lg bg-card/50 border border-border/50 text-center">
            <div className="flex items-center justify-center gap-1">
              <Wifi className="h-4 w-4 text-energy-renewable" />
              <span className="text-xl font-bold text-energy-renewable">{(meterStats.online / 1000000).toFixed(2)}M</span>
            </div>
            <div className="text-xs text-muted-foreground">Online</div>
          </div>
          <div className="p-3 rounded-lg bg-card/50 border border-border/50 text-center">
            <div className="flex items-center justify-center gap-1">
              <WifiOff className="h-4 w-4 text-destructive" />
              <span className="text-xl font-bold text-destructive">{(meterStats.offline / 1000).toFixed(1)}K</span>
            </div>
            <div className="text-xs text-muted-foreground">Offline</div>
          </div>
          <div className="p-3 rounded-lg bg-card/50 border border-border/50 text-center">
            <div className="text-xl font-bold text-energy-renewable">{meterStats.communicating}%</div>
            <div className="text-xs text-muted-foreground">Comm Rate</div>
          </div>
          <div className="p-3 rounded-lg bg-card/50 border border-border/50 text-center">
            <div className="text-xl font-bold text-energy-renewable">{meterStats.dataQuality}%</div>
            <div className="text-xs text-muted-foreground">Data Quality</div>
          </div>
        </div>

        {/* Reading Volume Chart */}
        <div className="p-4 rounded-lg bg-card/50 border border-border/50">
          <h4 className="text-sm font-medium text-foreground mb-3">Reading Volume (24hr)</h4>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={readingVolume}>
                <defs>
                  <linearGradient id="meterGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickFormatter={(v) => `${v/1000}K`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Area type="monotone" dataKey="reads" stroke="hsl(var(--primary))" fill="url(#meterGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Meter Types */}
          <div className="p-4 rounded-lg bg-card/50 border border-border/50">
            <h4 className="text-sm font-medium text-foreground mb-3">Meter Distribution</h4>
            <div className="space-y-3">
              {meterTypes.map((type, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground">{type.type}</span>
                    <span className="text-muted-foreground">{type.count.toLocaleString()} ({type.percentage}%)</span>
                  </div>
                  <Progress value={type.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          {/* Consumption Patterns */}
          <div className="p-4 rounded-lg bg-card/50 border border-border/50">
            <h4 className="text-sm font-medium text-foreground mb-3">Consumption Patterns</h4>
            <div className="space-y-3">
              {consumptionPatterns.map((pattern, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pattern.color }} />
                    <span className="text-foreground">{pattern.pattern}</span>
                  </div>
                  <span className="font-medium text-foreground">{pattern.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="p-4 rounded-lg bg-card/50 border border-border/50">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-energy-solar" />
            Active Meter Alerts
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {alerts.map((alert, index) => (
              <div key={index} className={`p-3 rounded-lg border ${
                alert.severity === 'high' ? 'bg-destructive/10 border-destructive/30' :
                alert.severity === 'medium' ? 'bg-energy-solar/10 border-energy-solar/30' :
                'bg-muted/50 border-border/50'
              }`}>
                <div className="text-lg font-bold text-foreground">{alert.count}</div>
                <div className="text-xs text-muted-foreground">{alert.type}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartMeterAnalytics;
