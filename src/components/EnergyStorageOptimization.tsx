import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Battery, TrendingUp, DollarSign, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const EnergyStorageOptimization = () => {
  const storageData = [
    { hour: '00', soc: 85, price: 42, dispatch: -20, revenue: -840 },
    { hour: '04', soc: 95, price: 38, dispatch: -25, revenue: -950 },
    { hour: '08', soc: 82, price: 58, dispatch: 35, revenue: 2030 },
    { hour: '12', soc: 68, price: 75, dispatch: 45, revenue: 3375 },
    { hour: '16', soc: 45, price: 88, dispatch: 58, revenue: 5104 },
    { hour: '20', soc: 28, price: 72, dispatch: 42, revenue: 3024 },
  ];

  const batteryFleet = [
    {
      id: 'BESS-North',
      capacity: '250 MWh',
      power: '100 MW',
      soc: 78,
      status: 'charging',
      health: 98,
      cycles: 842,
    },
    {
      id: 'BESS-Central',
      capacity: '500 MWh',
      power: '200 MW',
      soc: 45,
      status: 'discharging',
      health: 96,
      cycles: 1205,
    },
    {
      id: 'BESS-South',
      capacity: '150 MWh',
      power: '75 MW',
      soc: 92,
      status: 'standby',
      health: 99,
      cycles: 456,
    },
  ];

  const optimizationMetrics = [
    {
      metric: 'Total Revenue',
      value: '$42,580',
      change: '+15.2%',
      icon: DollarSign,
      color: 'text-green-500',
    },
    {
      metric: 'Avg Efficiency',
      value: '89.5%',
      change: 'Round-trip',
      icon: Zap,
      color: 'text-blue-500',
    },
    {
      metric: 'Arbitrage Profit',
      value: '$18,250',
      change: 'Today',
      icon: TrendingUp,
      color: 'text-green-500',
    },
    {
      metric: 'Fleet SOC',
      value: '72%',
      change: '648 MWh',
      icon: Battery,
      color: 'text-primary',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'charging': return 'default';
      case 'discharging': return 'secondary';
      case 'standby': return 'outline';
      default: return 'destructive';
    }
  };

  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Battery className="h-5 w-5 text-primary" />
          Energy Storage Optimization
        </CardTitle>
        <CardDescription>
          AI-driven battery dispatch for maximum revenue and grid support
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {optimizationMetrics.map((metric) => {
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
                <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{metric.change}</div>
              </div>
            );
          })}
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">24-Hour Dispatch Strategy & Revenue</h4>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={storageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="hour" 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                yAxisId="left"
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
                label={{ value: 'SOC (%)', angle: -90, position: 'insideLeft' }}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
                label={{ value: 'Price ($/MWh)', angle: 90, position: 'insideRight' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <ReferenceLine yAxisId="left" y={50} stroke="#ef4444" strokeDasharray="3 3" label="Target" />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="soc"
                fill="hsl(var(--primary) / 0.2)"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                name="State of Charge (%)"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="price"
                fill="hsl(var(--energy-renewable) / 0.1)"
                stroke="hsl(var(--energy-renewable))"
                strokeWidth={2}
                name="Market Price ($/MWh)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Battery Fleet Status</h4>
          <div className="space-y-3">
            {batteryFleet.map((battery) => (
              <div
                key={battery.id}
                className="p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Battery className="h-5 w-5 text-primary" />
                      <span className="font-semibold">{battery.id}</span>
                      <Badge variant={getStatusColor(battery.status)} className="text-xs">
                        {battery.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <div>Capacity: <span className="font-medium text-foreground">{battery.capacity}</span></div>
                      <div>Power: <span className="font-medium text-foreground">{battery.power}</span></div>
                      <div>Health: <span className="font-medium text-green-500">{battery.health}%</span></div>
                      <div>Cycles: <span className="font-medium text-foreground">{battery.cycles}</span></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary mb-1">{battery.soc}%</div>
                    <div className="text-xs text-muted-foreground">State of Charge</div>
                  </div>
                </div>
                <Progress value={battery.soc} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
            <h4 className="font-semibold mb-3 text-sm">Today's Performance</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Energy Arbitraged:</span>
                <span className="font-medium text-foreground">328 MWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Charge Cycles:</span>
                <span className="font-medium text-foreground">2.3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Avg Buy Price:</span>
                <span className="font-medium text-foreground">$39.50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Avg Sell Price:</span>
                <span className="font-medium text-foreground">$78.20</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
            <h4 className="font-semibold mb-3 text-sm">Grid Services Revenue</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frequency Response:</span>
                <span className="font-medium text-green-500">$8,450</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Peak Shaving:</span>
                <span className="font-medium text-green-500">$12,300</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Voltage Support:</span>
                <span className="font-medium text-green-500">$3,580</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Services:</span>
                <span className="font-medium text-green-500">$24,330</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
            <h4 className="font-semibold mb-3 text-sm">Optimization Status</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">AI Model:</span>
                <Badge variant="default" className="text-xs">Active</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Forecast Accuracy:</span>
                <span className="font-medium text-foreground">94.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Next Dispatch:</span>
                <span className="font-medium text-foreground">12 min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mode:</span>
                <Badge variant="secondary" className="text-xs">Auto</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnergyStorageOptimization;