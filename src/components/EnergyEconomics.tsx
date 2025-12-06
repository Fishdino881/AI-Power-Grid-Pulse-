import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const EnergyEconomics = () => {
  // Real-time pricing data
  const [marketPrices, setMarketPrices] = useState([
    { time: '00:00', spotPrice: 42, dayAhead: 45, forecast: 44 },
    { time: '06:00', spotPrice: 38, dayAhead: 40, forecast: 39 },
    { time: '12:00', spotPrice: 65, dayAhead: 68, forecast: 67 },
    { time: '18:00', spotPrice: 82, dayAhead: 85, forecast: 84 },
    { time: '23:00', spotPrice: 52, dayAhead: 55, forecast: 53 },
  ]);

  // Peak vs off-peak comparison
  const peakComparison = [
    { period: 'Off-Peak\n(0-6h)', demand: 145, cost: 38, renewable: 48 },
    { period: 'Mid-Peak\n(6-12h)', demand: 215, cost: 52, renewable: 62 },
    { period: 'Peak\n(12-18h)', demand: 285, cost: 72, renewable: 58 },
    { period: 'Evening\n(18-24h)', demand: 245, cost: 65, renewable: 45 },
  ];

  // Generation cost breakdown by source
  const generationCosts = [
    { source: 'Solar', capex: 45, opex: 8, fuel: 0, total: 53, lcoe: 32 },
    { source: 'Wind', capex: 52, opex: 12, fuel: 0, total: 64, lcoe: 38 },
    { source: 'Nuclear', capex: 95, opex: 28, fuel: 12, total: 135, lcoe: 45 },
    { source: 'Gas', capex: 35, opex: 15, fuel: 48, total: 98, lcoe: 58 },
    { source: 'Coal', capex: 42, opex: 22, fuel: 38, total: 102, lcoe: 52 },
    { source: 'Hydro', capex: 68, opex: 8, fuel: 0, total: 76, lcoe: 28 },
  ];

  // Revenue streams
  const revenueBreakdown = [
    { month: 'Jan', energy: 245, capacity: 85, ancillary: 28 },
    { month: 'Feb', energy: 238, capacity: 82, ancillary: 26 },
    { month: 'Mar', energy: 265, capacity: 88, ancillary: 30 },
    { month: 'Apr', energy: 278, capacity: 92, ancillary: 32 },
    { month: 'May', energy: 295, capacity: 98, ancillary: 35 },
    { month: 'Jun', energy: 312, capacity: 102, ancillary: 38 },
  ];

  const [economics, setEconomics] = useState({
    totalRevenue: 852,
    totalCost: 645,
    profit: 207,
    margin: 24.3,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketPrices(prev => prev.map(item => ({
        ...item,
        spotPrice: Math.max(20, item.spotPrice + (Math.random() - 0.5) * 5),
      })));

      setEconomics(prev => ({
        totalRevenue: prev.totalRevenue + (Math.random() - 0.5) * 10,
        totalCost: prev.totalCost + (Math.random() - 0.5) * 5,
        profit: prev.profit + (Math.random() - 0.5) * 5,
        margin: ((prev.profit / prev.totalRevenue) * 100),
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="glass-panel p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-energy-renewable bg-clip-text text-transparent">
            Energy Economics & Markets
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">Financial metrics and market dynamics</p>
      </div>

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="glass-panel p-4 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">Total Revenue</div>
          <div className="text-2xl font-bold">${economics.totalRevenue.toFixed(0)}M</div>
          <div className="flex items-center gap-1 text-xs text-status-optimal mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>+8.2%</span>
          </div>
        </div>
        <div className="glass-panel p-4 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">Operating Cost</div>
          <div className="text-2xl font-bold">${economics.totalCost.toFixed(0)}M</div>
          <div className="flex items-center gap-1 text-xs text-status-optimal mt-1">
            <TrendingDown className="w-3 h-3" />
            <span>-3.1%</span>
          </div>
        </div>
        <div className="glass-panel p-4 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">Net Profit</div>
          <div className="text-2xl font-bold text-status-optimal">${economics.profit.toFixed(0)}M</div>
          <div className="flex items-center gap-1 text-xs text-status-optimal mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>+15.7%</span>
          </div>
        </div>
        <div className="glass-panel p-4 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">Profit Margin</div>
          <div className="text-2xl font-bold">{economics.margin.toFixed(1)}%</div>
          <Badge variant="outline" className="text-xs mt-1">Target: 22%</Badge>
        </div>
      </div>

      <Tabs defaultValue="pricing" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="pricing">Market Prices</TabsTrigger>
          <TabsTrigger value="peak">Peak Analysis</TabsTrigger>
          <TabsTrigger value="costs">Generation Costs</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="pricing" className="space-y-4">
          <div className="glass-panel p-4 rounded-lg">
            <h4 className="font-semibold mb-4">Real-Time Market Pricing ($/MWh)</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={marketPrices}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" label={{ value: '$/MWh', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="spotPrice" stroke="hsl(var(--primary))" strokeWidth={3} name="Spot Price" />
                <Line type="monotone" dataKey="dayAhead" stroke="hsl(var(--energy-renewable))" strokeWidth={2} strokeDasharray="5 5" name="Day-Ahead" />
                <Line type="monotone" dataKey="forecast" stroke="hsl(var(--status-warning))" strokeWidth={2} strokeDasharray="3 3" name="Forecast" />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div className="glass-panel p-3 rounded">
                <div className="text-xs text-muted-foreground">Current Spot</div>
                <div className="text-xl font-bold text-primary">${marketPrices[marketPrices.length - 1].spotPrice.toFixed(2)}</div>
                <div className="text-xs text-status-optimal mt-1">per MWh</div>
              </div>
              <div className="glass-panel p-3 rounded">
                <div className="text-xs text-muted-foreground">Peak Today</div>
                <div className="text-xl font-bold text-status-critical">$82.00</div>
                <div className="text-xs text-muted-foreground mt-1">at 18:00</div>
              </div>
              <div className="glass-panel p-3 rounded">
                <div className="text-xs text-muted-foreground">Volatility</div>
                <div className="text-xl font-bold text-status-warning">±$18.50</div>
                <div className="text-xs text-muted-foreground mt-1">±22.6%</div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="peak" className="space-y-4">
          <div className="glass-panel p-4 rounded-lg">
            <h4 className="font-semibold mb-4">Peak vs Off-Peak Comparison</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={peakComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="period" stroke="hsl(var(--muted-foreground))" />
                <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" label={{ value: 'GW', angle: -90, position: 'insideLeft' }} />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" label={{ value: '$/MWh', angle: 90, position: 'insideRight' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="demand" fill="hsl(var(--primary))" name="Demand (GW)" />
                <Bar yAxisId="right" dataKey="cost" fill="hsl(var(--status-critical))" name="Avg Cost ($/MWh)" />
                <Bar yAxisId="left" dataKey="renewable" fill="hsl(var(--energy-renewable))" name="Renewable (GW)" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between items-center glass-panel p-2 rounded">
                <span>Peak Demand Premium:</span>
                <span className="font-bold text-status-critical">+89% vs Off-Peak</span>
              </div>
              <div className="flex justify-between items-center glass-panel p-2 rounded">
                <span>Renewable Penetration:</span>
                <span className="font-bold text-energy-renewable">54.2% average</span>
              </div>
              <div className="flex justify-between items-center glass-panel p-2 rounded">
                <span>Cost Optimization Potential:</span>
                <span className="font-bold text-primary">$28M annually</span>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="costs" className="space-y-4">
          <div className="glass-panel p-4 rounded-lg">
            <h4 className="font-semibold mb-4">Generation Cost Breakdown ($/MWh)</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={generationCosts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="source" type="category" stroke="hsl(var(--muted-foreground))" width={80} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="capex" stackId="a" fill="hsl(var(--primary))" name="Capital" />
                <Bar dataKey="opex" stackId="a" fill="hsl(var(--energy-renewable))" name="Operating" />
                <Bar dataKey="fuel" stackId="a" fill="hsl(var(--status-critical))" name="Fuel" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4">
              <h5 className="font-semibold text-sm mb-2">Levelized Cost of Energy (LCOE)</h5>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {generationCosts.map(item => (
                  <div key={item.source} className="glass-panel p-2 rounded text-center">
                    <div className="text-xs text-muted-foreground">{item.source}</div>
                    <div className="text-lg font-bold">${item.lcoe}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <div className="glass-panel p-4 rounded-lg">
            <h4 className="font-semibold mb-4">Revenue Streams (6-Month Trend)</h4>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueBreakdown}>
                <defs>
                  <linearGradient id="energy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="capacity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--energy-renewable))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--energy-renewable))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="ancillary" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--status-optimal))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--status-optimal))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" label={{ value: '$M', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="energy" stackId="1" stroke="hsl(var(--primary))" fill="url(#energy)" name="Energy Sales ($M)" />
                <Area type="monotone" dataKey="capacity" stackId="1" stroke="hsl(var(--energy-renewable))" fill="url(#capacity)" name="Capacity Payments ($M)" />
                <Area type="monotone" dataKey="ancillary" stackId="1" stroke="hsl(var(--status-optimal))" fill="url(#ancillary)" name="Ancillary Services ($M)" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="glass-panel p-3 rounded text-center">
                <div className="text-xs text-muted-foreground">Energy Sales</div>
                <div className="text-xl font-bold text-primary">72.5%</div>
                <div className="text-xs text-muted-foreground mt-1">of total revenue</div>
              </div>
              <div className="glass-panel p-3 rounded text-center">
                <div className="text-xs text-muted-foreground">Capacity</div>
                <div className="text-xl font-bold text-energy-renewable">23.8%</div>
                <div className="text-xs text-muted-foreground mt-1">of total revenue</div>
              </div>
              <div className="glass-panel p-3 rounded text-center">
                <div className="text-xs text-muted-foreground">Ancillary</div>
                <div className="text-xl font-bold text-status-optimal">3.7%</div>
                <div className="text-xs text-muted-foreground mt-1">of total revenue</div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default EnergyEconomics;
