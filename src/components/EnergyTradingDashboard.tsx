import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Badge } from '@/components/ui/badge';

const EnergyTradingDashboard = () => {
  const priceData = [
    { time: '00:00', dayAhead: 45.2, realTime: 46.8, volume: 3200 },
    { time: '04:00', dayAhead: 38.5, realTime: 39.2, volume: 2800 },
    { time: '08:00', dayAhead: 62.3, realTime: 65.1, volume: 4500 },
    { time: '12:00', dayAhead: 78.7, realTime: 82.3, volume: 5200 },
    { time: '16:00', dayAhead: 85.1, realTime: 88.7, volume: 5800 },
    { time: '20:00', dayAhead: 72.4, realTime: 75.2, volume: 4900 },
  ];

  const tradingMetrics = [
    {
      label: 'Current Price',
      value: '$82.50',
      change: '+5.2%',
      trend: 'up',
      description: 'Real-time market price',
    },
    {
      label: 'Day-Ahead Price',
      value: '$78.30',
      change: '+3.1%',
      trend: 'up',
      description: 'Tomorrow\'s forecast',
    },
    {
      label: 'Trading Volume',
      value: '5.2 GWh',
      change: '+12.5%',
      trend: 'up',
      description: 'Last hour volume',
    },
    {
      label: 'Market Spread',
      value: '$4.20',
      change: '-1.8%',
      trend: 'down',
      description: 'Day-ahead vs real-time',
    },
  ];

  const opportunities = [
    {
      type: 'Arbitrage',
      potential: '+$12,450',
      description: 'Price spread between regions',
      confidence: 'high',
    },
    {
      type: 'Peak Shaving',
      potential: '+$8,200',
      description: 'Sell during evening peak',
      confidence: 'medium',
    },
    {
      type: 'Storage Optimization',
      potential: '+$5,600',
      description: 'Charge during low prices',
      confidence: 'high',
    },
  ];

  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          Energy Trading & Market Analytics
        </CardTitle>
        <CardDescription>
          Real-time pricing, arbitrage opportunities, and market insights
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {tradingMetrics.map((metric) => (
            <div
              key={metric.label}
              className="p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
            >
              <div className="text-xs text-muted-foreground mb-1">{metric.label}</div>
              <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
              <div className="flex items-center gap-1">
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span className={`text-xs ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.change}
                </span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">{metric.description}</div>
            </div>
          ))}
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">24-Hour Market Prices</h4>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
                label={{ value: '$/MWh', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Area
                type="monotone"
                dataKey="realTime"
                fill="hsl(var(--primary) / 0.2)"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                name="Real-Time Price"
              />
              <Line 
                type="monotone" 
                dataKey="dayAhead" 
                stroke="hsl(var(--energy-renewable))" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Day-Ahead Price"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Trading Opportunities</h4>
          <div className="space-y-3">
            {opportunities.map((opp, index) => (
              <div
                key={index}
                className="p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <h5 className="font-semibold">{opp.type}</h5>
                    <Badge variant={opp.confidence === 'high' ? 'default' : 'secondary'}>
                      {opp.confidence}
                    </Badge>
                  </div>
                  <span className="text-lg font-bold text-green-500">{opp.potential}</span>
                </div>
                <p className="text-sm text-muted-foreground">{opp.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
            <h4 className="font-semibold mb-2 text-sm">Market Statistics</h4>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>24h High:</span>
                <span className="font-medium text-foreground">$88.70/MWh</span>
              </div>
              <div className="flex justify-between">
                <span>24h Low:</span>
                <span className="font-medium text-foreground">$38.50/MWh</span>
              </div>
              <div className="flex justify-between">
                <span>Avg Price:</span>
                <span className="font-medium text-foreground">$64.20/MWh</span>
              </div>
              <div className="flex justify-between">
                <span>Volatility:</span>
                <span className="font-medium text-foreground">15.3%</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
            <h4 className="font-semibold mb-2 text-sm">Trading Activity</h4>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Total Volume:</span>
                <span className="font-medium text-foreground">126.4 GWh</span>
              </div>
              <div className="flex justify-between">
                <span>Transactions:</span>
                <span className="font-medium text-foreground">1,247</span>
              </div>
              <div className="flex justify-between">
                <span>Active Traders:</span>
                <span className="font-medium text-foreground">89</span>
              </div>
              <div className="flex justify-between">
                <span>Market Share:</span>
                <span className="font-medium text-foreground">12.5%</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnergyTradingDashboard;