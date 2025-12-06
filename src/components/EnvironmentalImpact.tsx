import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Leaf, Wind, Droplets, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const EnvironmentalImpact = () => {
  const [carbonByHour, setCarbonByHour] = useState([
    { hour: '00:00', emissions: 420, target: 380, offset: 85 },
    { hour: '06:00', emissions: 385, target: 380, offset: 92 },
    { hour: '12:00', emissions: 295, target: 380, offset: 145 },
    { hour: '18:00', emissions: 365, target: 380, offset: 108 },
    { hour: '23:00', emissions: 410, target: 380, offset: 88 }
  ]);

  const curtailmentData = [
    { date: 'Jan 1', solar: 2.3, wind: 1.8, hydro: 0.5 },
    { date: 'Jan 2', solar: 3.1, wind: 2.4, hydro: 0.3 },
    { date: 'Jan 3', solar: 1.8, wind: 3.2, hydro: 0.7 },
    { date: 'Jan 4', solar: 2.9, wind: 2.1, hydro: 0.4 },
    { date: 'Jan 5', solar: 3.5, wind: 1.5, hydro: 0.6 },
    { date: 'Jan 6', solar: 2.1, wind: 2.8, hydro: 0.5 },
    { date: 'Jan 7', solar: 2.7, wind: 2.3, hydro: 0.4 }
  ];

  const waterUsage = [
    { source: 'Coal', usage: 2100, perMwh: 2.1 },
    { source: 'Nuclear', usage: 1850, perMwh: 1.85 },
    { source: 'Gas', usage: 950, perMwh: 0.95 },
    { source: 'Hydro', usage: 450, perMwh: 0.45 },
    { source: 'Solar', usage: 85, perMwh: 0.085 },
    { source: 'Wind', usage: 5, perMwh: 0.005 }
  ];

  const [envMetrics, setEnvMetrics] = useState({
    totalCarbonSaved: 2847,
    waterSaved: 485,
    treesEquivalent: 142500,
    solarGrowth: 8.4
  });

  const airQualityData = [
    { pollutant: 'CO2', current: 420, baseline: 850, reduction: 50.6 },
    { pollutant: 'NOx', current: 12.5, baseline: 45.2, reduction: 72.3 },
    { pollutant: 'SO2', current: 8.3, baseline: 38.7, reduction: 78.5 },
    { pollutant: 'PM2.5', current: 5.2, baseline: 22.8, reduction: 77.2 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setEnvMetrics(prev => ({
        totalCarbonSaved: prev.totalCarbonSaved + Math.floor(Math.random() * 20),
        waterSaved: prev.waterSaved + (Math.random() * 2),
        treesEquivalent: prev.treesEquivalent + Math.floor(Math.random() * 100),
        solarGrowth: Math.max(0, Math.min(15, prev.solarGrowth + (Math.random() - 0.5) * 0.3))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="glass-panel p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Leaf className="w-5 h-5 text-energy-renewable" />
          <h3 className="text-xl font-bold bg-gradient-to-r from-energy-renewable to-status-optimal bg-clip-text text-transparent">
            Environmental Impact Analysis
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">Tracking sustainability and emissions reduction</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="glass-panel p-4 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">CO2 Avoided Today</div>
          <div className="text-2xl font-bold text-energy-renewable">{envMetrics.totalCarbonSaved.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-1">tonnes</div>
        </div>
        <div className="glass-panel p-4 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">Water Saved</div>
          <div className="text-2xl font-bold text-primary">{envMetrics.waterSaved.toFixed(0)}</div>
          <div className="text-xs text-muted-foreground mt-1">million gallons</div>
        </div>
        <div className="glass-panel p-4 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">Trees Equivalent</div>
          <div className="text-2xl font-bold text-status-optimal">{(envMetrics.treesEquivalent / 1000).toFixed(1)}k</div>
          <div className="text-xs text-muted-foreground mt-1">planted & grown 10 yrs</div>
        </div>
        <div className="glass-panel p-4 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">Solar Growth YoY</div>
          <div className="text-2xl font-bold text-energy-solar">{envMetrics.solarGrowth.toFixed(1)}%</div>
          <div className="text-xs text-status-optimal mt-1">↑ capacity increase</div>
        </div>
      </div>

      <Tabs defaultValue="carbon" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="carbon">Carbon</TabsTrigger>
          <TabsTrigger value="curtailment">Curtailment</TabsTrigger>
          <TabsTrigger value="water">Water</TabsTrigger>
          <TabsTrigger value="air">Air Quality</TabsTrigger>
        </TabsList>

        <TabsContent value="carbon" className="space-y-4">
          <div className="glass-panel p-4 rounded-lg">
            <h4 className="font-semibold mb-4">Carbon Intensity Over 24 Hours (gCO2/kWh)</h4>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={carbonByHour}>
                <defs>
                  <linearGradient id="carbonEmissions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--status-critical))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--status-critical))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="carbonOffset" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--energy-renewable))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--energy-renewable))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="target" stroke="hsl(var(--energy-renewable))" strokeDasharray="5 5" name="Target" />
                <Area type="monotone" dataKey="emissions" stroke="hsl(var(--status-critical))" fill="url(#carbonEmissions)" name="Actual Emissions" />
                <Area type="monotone" dataKey="offset" stroke="hsl(var(--energy-renewable))" fill="url(#carbonOffset)" name="Carbon Offset" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="glass-panel p-3 rounded text-center">
                <div className="text-xs text-muted-foreground">Avg Intensity</div>
                <div className="text-xl font-bold">375 g/kWh</div>
              </div>
              <div className="glass-panel p-3 rounded text-center">
                <div className="text-xs text-muted-foreground">Best Hour</div>
                <div className="text-xl font-bold text-energy-renewable">295 g/kWh</div>
              </div>
              <div className="glass-panel p-3 rounded text-center">
                <div className="text-xs text-muted-foreground">vs Target</div>
                <div className="text-xl font-bold text-status-warning">-1.3%</div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="curtailment" className="space-y-4">
          <div className="glass-panel p-4 rounded-lg">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-status-warning" />
              Renewable Energy Curtailment (Wasted GWh)
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={curtailmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" label={{ value: 'GWh', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="solar" stackId="a" fill="hsl(var(--energy-solar))" name="Solar" />
                <Bar dataKey="wind" stackId="a" fill="hsl(var(--energy-wind))" name="Wind" />
                <Bar dataKey="hydro" stackId="a" fill="hsl(var(--primary))" name="Hydro" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between items-center glass-panel p-3 rounded">
                <span className="text-sm">Total Curtailed (7 days)</span>
                <span className="font-bold text-status-warning">16.8 GWh</span>
              </div>
              <div className="flex justify-between items-center glass-panel p-3 rounded">
                <span className="text-sm">Economic Loss</span>
                <span className="font-bold text-status-critical">$672,000</span>
              </div>
              <div className="flex justify-between items-center glass-panel p-3 rounded">
                <span className="text-sm">Storage Could Have Captured</span>
                <span className="font-bold text-energy-renewable">12.4 GWh (74%)</span>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="water" className="space-y-4">
          <div className="glass-panel p-4 rounded-lg">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Droplets className="w-4 h-4 text-primary" />
              Water Consumption by Source (Gallons per MWh)
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={waterUsage} layout="vertical">
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
                <Bar dataKey="usage" fill="hsl(var(--primary))" name="Total Usage (M gal/day)" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4">
              <h5 className="font-semibold text-sm mb-3">Water Intensity (Gallons per MWh)</h5>
              <div className="space-y-2">
                {waterUsage.map((item) => (
                  <div key={item.source} className="flex items-center gap-2">
                    <span className="text-sm w-20">{item.source}</span>
                    <Progress value={(item.perMwh / 2.1) * 100} className="flex-1 h-2" />
                    <span className="text-sm font-medium w-16 text-right">{item.perMwh.toFixed(3)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="air" className="space-y-4">
          <div className="glass-panel p-4 rounded-lg">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Wind className="w-4 h-4 text-energy-wind" />
              Air Quality Impact (Emission Reductions)
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={airQualityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="pollutant" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="current" fill="hsl(var(--status-optimal))" name="Current (g/kWh)" />
                <Bar dataKey="baseline" fill="hsl(var(--status-critical))" name="2010 Baseline (g/kWh)" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              <h5 className="font-semibold text-sm">Reduction Achievements</h5>
              {airQualityData.map((item) => (
                <div key={item.pollutant} className="flex items-center justify-between glass-panel p-2 rounded">
                  <span className="text-sm font-medium">{item.pollutant}</span>
                  <div className="flex items-center gap-2">
                    <Progress value={item.reduction} className="w-32 h-2" />
                    <span className="text-sm font-bold text-status-optimal w-16 text-right">
                      {item.reduction.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default EnvironmentalImpact;
