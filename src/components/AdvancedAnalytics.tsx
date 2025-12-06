import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, TrendingDown, Activity, Zap, DollarSign, Leaf, AlertCircle, Clock, Target, Gauge } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AdvancedAnalytics = () => {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
  
  // Historical demand data
  const demandData = [
    { time: '00:00', demand: 145.2, renewable: 45.2, forecast: 148.1 },
    { time: '04:00', demand: 132.8, renewable: 38.6, forecast: 135.2 },
    { time: '08:00', demand: 168.5, renewable: 72.4, forecast: 171.3 },
    { time: '12:00', demand: 195.3, renewable: 98.7, forecast: 192.8 },
    { time: '16:00', demand: 201.4, renewable: 87.3, forecast: 198.6 },
    { time: '20:00', demand: 188.7, renewable: 52.1, forecast: 191.2 },
    { time: '23:59', demand: 156.4, renewable: 41.8, forecast: 159.7 },
  ];

  // Carbon intensity over time
  const carbonData = [
    { hour: '00', intensity: 420, target: 380 },
    { hour: '06', intensity: 385, target: 380 },
    { hour: '12', intensity: 295, target: 380 },
    { hour: '18', intensity: 365, target: 380 },
    { hour: '24', intensity: 410, target: 380 },
  ];

  // Regional performance
  const regionalData = [
    { region: 'California', renewable: 68, efficiency: 94, capacity: 45.2 },
    { region: 'Texas', renewable: 42, efficiency: 91, capacity: 62.8 },
    { region: 'New York', renewable: 55, efficiency: 89, capacity: 38.4 },
    { region: 'Arizona', renewable: 72, efficiency: 96, capacity: 28.9 },
    { region: 'Oregon', renewable: 81, efficiency: 93, capacity: 22.3 },
  ];

  // Cost analysis
  const costData = [
    { source: 'Solar', cost: 32, emission: 0 },
    { source: 'Wind', cost: 38, emission: 0 },
    { source: 'Nuclear', cost: 45, emission: 12 },
    { source: 'Gas', cost: 58, emission: 490 },
    { source: 'Coal', cost: 52, emission: 820 },
    { source: 'Hydro', cost: 28, emission: 24 },
  ];

  // Grid stability metrics
  const stabilityData = [
    { metric: 'Frequency', value: 99.2, target: 95, max: 100 },
    { metric: 'Voltage', value: 97.8, target: 95, max: 100 },
    { metric: 'Load Balance', value: 94.5, target: 90, max: 100 },
    { metric: 'Reserve Margin', value: 88.3, target: 85, max: 100 },
    { metric: 'Response Time', value: 92.1, target: 90, max: 100 },
  ];

  // Anomaly detection
  const [anomalies, setAnomalies] = useState([
    { time: '14:23', type: 'spike', severity: 'medium', message: 'Unusual demand spike in California grid', confidence: 87 },
    { time: '16:45', type: 'drop', severity: 'low', message: 'Wind generation 8% below forecast', confidence: 92 },
    { time: '18:12', type: 'pattern', severity: 'high', message: 'Abnormal frequency fluctuation detected', confidence: 95 },
  ]);

  // Performance benchmarks
  const benchmarkData = [
    { name: 'Jan', efficiency: 89, renewable: 42, uptime: 99.2 },
    { name: 'Feb', efficiency: 91, renewable: 45, uptime: 99.5 },
    { name: 'Mar', efficiency: 90, renewable: 48, uptime: 99.1 },
    { name: 'Apr', efficiency: 92, renewable: 51, uptime: 99.7 },
    { name: 'May', efficiency: 93, renewable: 54, uptime: 99.6 },
    { name: 'Jun', efficiency: 94, renewable: 56, uptime: 99.8 },
  ];

  // Correlation data for heat map
  const correlationData = [
    { x: 'Temp', y: 'Demand', value: 0.89 },
    { x: 'Temp', y: 'Solar', value: 0.76 },
    { x: 'Temp', y: 'Wind', value: -0.23 },
    { x: 'Wind Speed', y: 'Demand', value: 0.12 },
    { x: 'Wind Speed', y: 'Solar', value: -0.31 },
    { x: 'Wind Speed', y: 'Wind', value: 0.94 },
    { x: 'Time', y: 'Demand', value: 0.67 },
    { x: 'Time', y: 'Solar', value: 0.88 },
    { x: 'Time', y: 'Wind', value: 0.15 },
  ];

  const getCorrelationColor = (value: number) => {
    if (value > 0.7) return 'hsl(var(--status-optimal))';
    if (value > 0.4) return 'hsl(var(--energy-renewable))';
    if (value > 0) return 'hsl(var(--primary))';
    if (value > -0.4) return 'hsl(var(--status-warning))';
    return 'hsl(var(--status-critical))';
  };

  const [metrics, setMetrics] = useState({
    avgEfficiency: 92.4,
    peakDemand: 201.4,
    renewablePercentage: 48.3,
    carbonSaved: 2847,
    costPerMWh: 42.5,
    gridReliability: 99.7,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        avgEfficiency: prev.avgEfficiency + (Math.random() - 0.5) * 0.2,
        peakDemand: prev.peakDemand + (Math.random() - 0.5) * 2,
        renewablePercentage: Math.min(100, Math.max(0, prev.renewablePercentage + (Math.random() - 0.5) * 0.5)),
        carbonSaved: prev.carbonSaved + Math.floor(Math.random() * 10),
        costPerMWh: prev.costPerMWh + (Math.random() - 0.5) * 0.3,
        gridReliability: Math.min(100, Math.max(95, prev.gridReliability + (Math.random() - 0.5) * 0.05)),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="glass-panel p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-energy-renewable bg-clip-text text-transparent">
          Advanced Analytics & Insights
        </h3>
        <p className="text-sm text-muted-foreground">Deep dive into grid performance metrics</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="glass-panel p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Avg Efficiency</span>
            <Activity className="w-4 h-4 text-status-optimal" />
          </div>
          <div className="text-2xl font-bold">{metrics.avgEfficiency.toFixed(1)}%</div>
          <div className="flex items-center gap-1 text-xs text-status-optimal mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>+2.3% vs last week</span>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Peak Demand</span>
            <Zap className="w-4 h-4 text-status-warning" />
          </div>
          <div className="text-2xl font-bold">{metrics.peakDemand.toFixed(1)} GW</div>
          <div className="flex items-center gap-1 text-xs text-status-warning mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>+5.2% vs forecast</span>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Renewable Mix</span>
            <Leaf className="w-4 h-4 text-energy-renewable" />
          </div>
          <div className="text-2xl font-bold">{metrics.renewablePercentage.toFixed(1)}%</div>
          <div className="flex items-center gap-1 text-xs text-energy-renewable mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>+12.8% YoY</span>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Carbon Saved</span>
            <Leaf className="w-4 h-4 text-energy-renewable" />
          </div>
          <div className="text-2xl font-bold">{metrics.carbonSaved} t</div>
          <div className="flex items-center gap-1 text-xs text-energy-renewable mt-1">
            <span>Today's offset</span>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Avg Cost</span>
            <DollarSign className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-bold">${metrics.costPerMWh.toFixed(2)}</div>
          <div className="flex items-center gap-1 text-xs text-status-optimal mt-1">
            <TrendingDown className="w-3 h-3" />
            <span>-3.1% vs avg</span>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Reliability</span>
            <Activity className="w-4 h-4 text-status-optimal" />
          </div>
          <div className="text-2xl font-bold">{metrics.gridReliability.toFixed(2)}%</div>
          <div className="flex items-center gap-1 text-xs text-status-optimal mt-1">
            <span>Uptime target: 99.5%</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="demand" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
          <TabsTrigger value="demand">Demand</TabsTrigger>
          <TabsTrigger value="carbon">Carbon</TabsTrigger>
          <TabsTrigger value="regional">Regional</TabsTrigger>
          <TabsTrigger value="cost">Cost</TabsTrigger>
          <TabsTrigger value="stability">Stability</TabsTrigger>
          <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="demand" className="space-y-4">
          <div className="glass-panel p-4 rounded-lg">
            <h4 className="font-semibold mb-4">Demand vs Renewable Generation</h4>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={demandData}>
                <defs>
                  <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRenewable" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--energy-renewable))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--energy-renewable))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="demand" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorDemand)" name="Total Demand (GW)" />
                <Area type="monotone" dataKey="renewable" stroke="hsl(var(--energy-renewable))" fillOpacity={1} fill="url(#colorRenewable)" name="Renewable (GW)" />
                <Line type="monotone" dataKey="forecast" stroke="hsl(var(--status-warning))" strokeDasharray="5 5" name="Forecast" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="carbon" className="space-y-4">
          <div className="glass-panel p-4 rounded-lg">
            <h4 className="font-semibold mb-4">Carbon Intensity Tracking</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={carbonData}>
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
                <Line type="monotone" dataKey="intensity" stroke="hsl(var(--status-warning))" strokeWidth={2} name="CO2 Intensity (g/kWh)" />
                <Line type="monotone" dataKey="target" stroke="hsl(var(--energy-renewable))" strokeDasharray="5 5" name="Target" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="regional" className="space-y-4">
          <div className="glass-panel p-4 rounded-lg">
            <h4 className="font-semibold mb-4">Regional Performance Comparison</h4>
            <div className="space-y-4">
              {regionalData.map((region) => (
                <div key={region.region} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{region.region}</span>
                    <span className="text-sm text-muted-foreground">{region.capacity} GW capacity</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Renewable %</span>
                        <span className="text-energy-renewable font-medium">{region.renewable}%</span>
                      </div>
                      <Progress value={region.renewable} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Efficiency</span>
                        <span className="text-status-optimal font-medium">{region.efficiency}%</span>
                      </div>
                      <Progress value={region.efficiency} className="h-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="cost" className="space-y-4">
          <div className="glass-panel p-4 rounded-lg">
            <h4 className="font-semibold mb-4">Cost & Emissions Analysis</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="source" stroke="hsl(var(--muted-foreground))" />
                <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="cost" fill="hsl(var(--primary))" name="Cost ($/MWh)" />
                <Bar yAxisId="right" dataKey="emission" fill="hsl(var(--status-critical))" name="CO2 Emissions (g/kWh)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="stability" className="space-y-4">
          <div className="glass-panel p-4 rounded-lg">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Gauge className="w-4 h-4" />
              Grid Stability Indicators
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={stabilityData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="metric" stroke="hsl(var(--muted-foreground))" />
                <PolarRadiusAxis stroke="hsl(var(--muted-foreground))" />
                <Radar name="Current" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                <Radar name="Target" dataKey="target" stroke="hsl(var(--energy-renewable))" fill="hsl(var(--energy-renewable))" fillOpacity={0.3} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
            
            <div className="mt-4 space-y-3">
              {stabilityData.map((item) => (
                <div key={item.metric} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.metric}</span>
                  <div className="flex items-center gap-2 flex-1 max-w-xs ml-4">
                    <Progress value={item.value} className="h-2" />
                    <span className="text-xs font-medium min-w-[3rem] text-right">{item.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-4 rounded-lg">
            <h4 className="font-semibold mb-4">Correlation Heat Map</h4>
            <div className="grid grid-cols-3 gap-2">
              {correlationData.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-lg text-center transition-all hover:scale-105"
                  style={{ backgroundColor: getCorrelationColor(item.value) + '40' }}
                >
                  <div className="text-xs font-medium opacity-90">{item.x} × {item.y}</div>
                  <div className="text-lg font-bold mt-1">{item.value.toFixed(2)}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Correlation coefficients: 1.0 = perfect positive, -1.0 = perfect negative
            </p>
          </div>
        </TabsContent>

        <TabsContent value="anomalies" className="space-y-4">
          <div className="glass-panel p-4 rounded-lg">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Real-Time Anomaly Detection
            </h4>
            <div className="space-y-3">
              {anomalies.map((anomaly, idx) => (
                <div 
                  key={idx}
                  className={`p-4 rounded-lg border-l-4 ${
                    anomaly.severity === 'high' ? 'border-status-critical bg-status-critical/10' :
                    anomaly.severity === 'medium' ? 'border-status-warning bg-status-warning/10' :
                    'border-primary bg-primary/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">{anomaly.time}</span>
                      <Badge variant={anomaly.severity === 'high' ? 'destructive' : 'outline'}>
                        {anomaly.type}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">{anomaly.confidence}% confidence</span>
                  </div>
                  <p className="text-sm">{anomaly.message}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-4 rounded-lg">
            <h4 className="font-semibold mb-4">Anomaly Pattern Analysis</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 glass-panel rounded-lg">
                <div className="text-2xl font-bold text-status-critical">12</div>
                <div className="text-xs text-muted-foreground mt-1">Critical Events</div>
                <div className="text-xs text-status-critical mt-1">Last 24h</div>
              </div>
              <div className="text-center p-3 glass-panel rounded-lg">
                <div className="text-2xl font-bold text-status-warning">38</div>
                <div className="text-xs text-muted-foreground mt-1">Warnings</div>
                <div className="text-xs text-status-warning mt-1">Last 24h</div>
              </div>
              <div className="text-center p-3 glass-panel rounded-lg">
                <div className="text-2xl font-bold text-primary">94.2%</div>
                <div className="text-xs text-muted-foreground mt-1">Detection Rate</div>
                <div className="text-xs text-status-optimal mt-1">Accuracy</div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="glass-panel p-4 rounded-lg">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Target className="w-4 h-4" />
              6-Month Performance Trends
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={benchmarkData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="efficiency" stroke="hsl(var(--primary))" strokeWidth={2} name="Efficiency %" />
                <Line type="monotone" dataKey="renewable" stroke="hsl(var(--energy-renewable))" strokeWidth={2} name="Renewable %" />
                <Line type="monotone" dataKey="uptime" stroke="hsl(var(--status-optimal))" strokeWidth={2} name="Uptime %" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass-panel p-4 rounded-lg">
              <h5 className="font-semibold mb-3 text-sm">Monthly Improvements</h5>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Efficiency</span>
                  <span className="text-sm font-bold text-status-optimal flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +5.6%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Renewable Mix</span>
                  <span className="text-sm font-bold text-energy-renewable flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +14.2%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Cost Reduction</span>
                  <span className="text-sm font-bold text-status-optimal flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" />
                    -8.3%
                  </span>
                </div>
              </div>
            </div>

            <div className="glass-panel p-4 rounded-lg">
              <h5 className="font-semibold mb-3 text-sm">Key Benchmarks</h5>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">vs. Industry Avg</span>
                  <span className="text-sm font-bold text-status-optimal">+12.4%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">vs. Q1 Target</span>
                  <span className="text-sm font-bold text-status-optimal">+6.8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Rank (National)</span>
                  <span className="text-sm font-bold text-primary">#3 of 52</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AdvancedAnalytics;
