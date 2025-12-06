import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, Zap, TrendingUp, Gauge } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const GridPerformanceMetrics = () => {
  // Hourly demand patterns (24 hours)
  const [hourlyDemand, setHourlyDemand] = useState([
    { hour: '00:00', residential: 85, commercial: 45, industrial: 120 },
    { hour: '03:00', residential: 70, commercial: 20, industrial: 115 },
    { hour: '06:00', residential: 95, commercial: 60, industrial: 125 },
    { hour: '09:00', residential: 110, commercial: 140, industrial: 135 },
    { hour: '12:00', residential: 105, commercial: 160, industrial: 140 },
    { hour: '15:00', residential: 115, commercial: 155, industrial: 145 },
    { hour: '18:00', residential: 145, commercial: 120, industrial: 140 },
    { hour: '21:00', residential: 130, commercial: 80, industrial: 130 },
    { hour: '23:00', residential: 95, commercial: 55, industrial: 125 },
  ]);

  // Grid frequency stability
  const [frequencyData, setFrequencyData] = useState([
    { time: '00:00', frequency: 60.01, threshold: 60.0, limit: 60.05 },
    { time: '04:00', frequency: 59.99, threshold: 60.0, limit: 60.05 },
    { time: '08:00', frequency: 60.02, threshold: 60.0, limit: 60.05 },
    { time: '12:00', frequency: 60.01, threshold: 60.0, limit: 60.05 },
    { time: '16:00', frequency: 59.98, threshold: 60.0, limit: 60.05 },
    { time: '20:00', frequency: 60.00, threshold: 60.0, limit: 60.05 },
    { time: '23:59', frequency: 60.01, threshold: 60.0, limit: 60.05 },
  ]);

  // Transmission losses by region
  const lossData = [
    { region: 'California', losses: 4.2, efficiency: 95.8 },
    { region: 'Texas', losses: 5.8, efficiency: 94.2 },
    { region: 'New York', losses: 4.5, efficiency: 95.5 },
    { region: 'Arizona', losses: 3.8, efficiency: 96.2 },
    { region: 'Oregon', losses: 3.2, efficiency: 96.8 },
    { region: 'Nevada', losses: 4.9, efficiency: 95.1 },
  ];

  // Load balancing metrics
  const [loadBalance, setLoadBalance] = useState({
    phase1: 97.2,
    phase2: 98.5,
    phase3: 96.8,
    neutral: 2.1,
  });

  // Voltage distribution
  const voltageDistribution = [
    { range: '110-115V', count: 145 },
    { range: '115-118V', count: 892 },
    { range: '118-120V', count: 2845 },
    { range: '120-122V', count: 3124 },
    { range: '122-125V', count: 1245 },
    { range: '125-130V', count: 234 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadBalance(prev => ({
        phase1: Math.min(100, Math.max(90, prev.phase1 + (Math.random() - 0.5) * 0.5)),
        phase2: Math.min(100, Math.max(90, prev.phase2 + (Math.random() - 0.5) * 0.5)),
        phase3: Math.min(100, Math.max(90, prev.phase3 + (Math.random() - 0.5) * 0.5)),
        neutral: Math.max(0, Math.min(5, prev.neutral + (Math.random() - 0.5) * 0.2)),
      }));

      setFrequencyData(prev => prev.map(item => ({
        ...item,
        frequency: 60.0 + (Math.random() - 0.5) * 0.04
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="glass-panel p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-energy-renewable bg-clip-text text-transparent">
            Grid Performance Metrics
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">Detailed power grid operational metrics</p>
      </div>

      <Tabs defaultValue="demand" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="demand">Demand Patterns</TabsTrigger>
          <TabsTrigger value="frequency">Frequency</TabsTrigger>
          <TabsTrigger value="losses">Transmission</TabsTrigger>
          <TabsTrigger value="voltage">Voltage</TabsTrigger>
        </TabsList>

        <TabsContent value="demand" className="space-y-4">
          <div className="glass-panel p-4 rounded-lg">
            <h4 className="font-semibold mb-4">24-Hour Demand by Sector</h4>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={hourlyDemand}>
                <defs>
                  <linearGradient id="residential" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="commercial" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--energy-renewable))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--energy-renewable))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="industrial" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--status-warning))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--status-warning))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" label={{ value: 'GW', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="residential" stackId="1" stroke="hsl(var(--primary))" fill="url(#residential)" name="Residential (GW)" />
                <Area type="monotone" dataKey="commercial" stackId="1" stroke="hsl(var(--energy-renewable))" fill="url(#commercial)" name="Commercial (GW)" />
                <Area type="monotone" dataKey="industrial" stackId="1" stroke="hsl(var(--status-warning))" fill="url(#industrial)" name="Industrial (GW)" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="text-center glass-panel p-3 rounded">
                <div className="text-xs text-muted-foreground">Peak Residential</div>
                <div className="text-xl font-bold text-primary">145 GW</div>
                <div className="text-xs text-muted-foreground">18:00</div>
              </div>
              <div className="text-center glass-panel p-3 rounded">
                <div className="text-xs text-muted-foreground">Peak Commercial</div>
                <div className="text-xl font-bold text-energy-renewable">160 GW</div>
                <div className="text-xs text-muted-foreground">12:00</div>
              </div>
              <div className="text-center glass-panel p-3 rounded">
                <div className="text-xs text-muted-foreground">Peak Industrial</div>
                <div className="text-xl font-bold text-status-warning">145 GW</div>
                <div className="text-xs text-muted-foreground">15:00</div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="frequency" className="space-y-4">
          <div className="glass-panel p-4 rounded-lg">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Gauge className="w-4 h-4" />
              Grid Frequency Stability (Hz)
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={frequencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis domain={[59.95, 60.05]} stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => value.toFixed(3) + ' Hz'}
                />
                <Legend />
                <Line type="monotone" dataKey="limit" stroke="hsl(var(--status-critical))" strokeDasharray="5 5" name="Critical Limit" />
                <Line type="monotone" dataKey="threshold" stroke="hsl(var(--energy-renewable))" strokeDasharray="3 3" name="Target" />
                <Line type="monotone" dataKey="frequency" stroke="hsl(var(--primary))" strokeWidth={2} name="Actual Frequency" />
              </LineChart>
            </ResponsiveContainer>
            
            <div className="mt-4 space-y-3">
              <h5 className="font-semibold text-sm">Phase Load Balance</h5>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Phase 1</span>
                    <span className="font-medium">{loadBalance.phase1.toFixed(1)}%</span>
                  </div>
                  <Progress value={loadBalance.phase1} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Phase 2</span>
                    <span className="font-medium">{loadBalance.phase2.toFixed(1)}%</span>
                  </div>
                  <Progress value={loadBalance.phase2} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Phase 3</span>
                    <span className="font-medium">{loadBalance.phase3.toFixed(1)}%</span>
                  </div>
                  <Progress value={loadBalance.phase3} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Neutral Current</span>
                    <span className="font-medium text-status-optimal">{loadBalance.neutral.toFixed(1)}%</span>
                  </div>
                  <Progress value={loadBalance.neutral} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="losses" className="space-y-4">
          <div className="glass-panel p-4 rounded-lg">
            <h4 className="font-semibold mb-4">Transmission Losses by Region</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={lossData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="region" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" label={{ value: '%', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="losses" fill="hsl(var(--status-critical))" name="Loss %" />
                <Bar dataKey="efficiency" fill="hsl(var(--status-optimal))" name="Efficiency %" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="glass-panel p-3 rounded">
                <div className="text-xs text-muted-foreground mb-1">National Avg Loss</div>
                <div className="text-2xl font-bold text-status-critical">4.4%</div>
                <div className="text-xs text-muted-foreground mt-1">~15.2 GW wasted</div>
              </div>
              <div className="glass-panel p-3 rounded">
                <div className="text-xs text-muted-foreground mb-1">Best Performer</div>
                <div className="text-2xl font-bold text-status-optimal">Oregon</div>
                <div className="text-xs text-energy-renewable mt-1">3.2% loss rate</div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="voltage" className="space-y-4">
          <div className="glass-panel p-4 rounded-lg">
            <h4 className="font-semibold mb-4">Voltage Distribution Across Grid Nodes</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={voltageDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" label={{ value: 'Node Count', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" name="Nodes" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div className="glass-panel p-3 rounded">
                <div className="text-xs text-muted-foreground">Mean Voltage</div>
                <div className="text-xl font-bold">120.8V</div>
              </div>
              <div className="glass-panel p-3 rounded">
                <div className="text-xs text-muted-foreground">Std Deviation</div>
                <div className="text-xl font-bold">±2.4V</div>
              </div>
              <div className="glass-panel p-3 rounded">
                <div className="text-xs text-muted-foreground">Compliance</div>
                <div className="text-xl font-bold text-status-optimal">99.2%</div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default GridPerformanceMetrics;
