import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe2, TrendingUp, TrendingDown, RefreshCw, Map, BarChart3, ArrowRightLeft } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Treemap, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface RegionData {
  region: string;
  demand: number;
  capacity: number;
  renewable: number;
  carbonIntensity: number;
  price: number;
  frequency: number;
  reserves: number;
  efficiency: number;
  reliability: number;
  trend: 'up' | 'down' | 'stable';
}

interface PowerFlow {
  from: string;
  to: string;
  amount: number;
  direction: 'export' | 'import';
}

const MultiRegionComparison = () => {
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['West', 'East', 'Central', 'South']);
  const [primaryMetric, setPrimaryMetric] = useState('demand');
  const [isLive, setIsLive] = useState(true);
  const [regionData, setRegionData] = useState<RegionData[]>([
    { region: 'West', demand: 245, capacity: 310, renewable: 45, carbonIntensity: 285, price: 42, frequency: 60.01, reserves: 65, efficiency: 94, reliability: 99.7, trend: 'up' },
    { region: 'East', demand: 312, capacity: 380, renewable: 38, carbonIntensity: 340, price: 55, frequency: 59.98, reserves: 68, efficiency: 91, reliability: 99.5, trend: 'stable' },
    { region: 'Central', demand: 189, capacity: 245, renewable: 52, carbonIntensity: 245, price: 38, frequency: 60.02, reserves: 56, efficiency: 96, reliability: 99.9, trend: 'up' },
    { region: 'South', demand: 278, capacity: 340, renewable: 41, carbonIntensity: 298, price: 48, frequency: 59.99, reserves: 62, efficiency: 92, reliability: 99.6, trend: 'down' },
    { region: 'Northwest', demand: 142, capacity: 185, renewable: 68, carbonIntensity: 185, price: 32, frequency: 60.00, reserves: 43, efficiency: 97, reliability: 99.8, trend: 'up' },
    { region: 'Southwest', demand: 198, capacity: 250, renewable: 58, carbonIntensity: 225, price: 35, frequency: 60.01, reserves: 52, efficiency: 95, reliability: 99.7, trend: 'stable' },
  ]);

  const [powerFlows, setPowerFlows] = useState<PowerFlow[]>([
    { from: 'West', to: 'Central', amount: 12.5, direction: 'export' },
    { from: 'Central', to: 'East', amount: 8.3, direction: 'export' },
    { from: 'South', to: 'East', amount: 15.2, direction: 'export' },
    { from: 'Northwest', to: 'West', amount: 6.8, direction: 'export' },
    { from: 'Southwest', to: 'South', amount: 9.4, direction: 'export' },
  ]);

  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      setRegionData(prev => prev.map(region => ({
        ...region,
        demand: region.demand + (Math.random() - 0.5) * 5,
        renewable: Math.max(0, region.renewable + (Math.random() - 0.5) * 3),
        carbonIntensity: region.carbonIntensity + (Math.random() - 0.5) * 10,
        price: Math.max(0, region.price + (Math.random() - 0.5) * 2),
        frequency: 60 + (Math.random() - 0.5) * 0.05,
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  const filteredData = regionData.filter(r => selectedRegions.includes(r.region));

  const radarData = filteredData.map(region => ({
    region: region.region,
    demand: (region.demand / region.capacity) * 100,
    renewable: region.renewable,
    efficiency: region.efficiency,
    reliability: region.reliability,
    reserves: (region.reserves / region.capacity) * 100,
  }));

  const treemapData = filteredData.map(region => ({
    name: region.region,
    size: region.demand,
    renewable: region.renewable,
  }));

  const COLORS = {
    West: 'hsl(var(--primary))',
    East: 'hsl(var(--energy-gas))',
    Central: 'hsl(var(--energy-renewable))',
    South: 'hsl(var(--energy-nuclear))',
    Northwest: 'hsl(var(--energy-hydro))',
    Southwest: 'hsl(var(--energy-solar))',
  };

  const bestPerformer = filteredData.reduce((best, region) => 
    region.carbonIntensity < best.carbonIntensity ? region : best
  );

  const highestDemand = filteredData.reduce((max, region) => 
    region.demand > max.demand ? region : max
  );

  return (
    <Card className="glass-panel">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Globe2 className="h-5 w-5 text-primary" />
              Multi-Region Grid Comparison
            </CardTitle>
            <CardDescription>
              Real-time synchronized comparison of interconnected grid regions
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant={isLive ? "default" : "outline"} 
              size="sm" 
              onClick={() => setIsLive(!isLive)}
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${isLive ? 'animate-spin' : ''}`} />
              {isLive ? 'Live' : 'Paused'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="comparison" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="comparison">
              <BarChart3 className="h-4 w-4 mr-1" />
              Compare
            </TabsTrigger>
            <TabsTrigger value="radar">
              <Map className="h-4 w-4 mr-1" />
              Radar
            </TabsTrigger>
            <TabsTrigger value="flows">
              <ArrowRightLeft className="h-4 w-4 mr-1" />
              Flows
            </TabsTrigger>
            <TabsTrigger value="heatmap">
              <Globe2 className="h-4 w-4 mr-1" />
              Matrix
            </TabsTrigger>
          </TabsList>

          <TabsContent value="comparison" className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              {regionData.map(region => (
                <Badge
                  key={region.region}
                  variant={selectedRegions.includes(region.region) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    if (selectedRegions.includes(region.region)) {
                      if (selectedRegions.length > 2) {
                        setSelectedRegions(prev => prev.filter(r => r !== region.region));
                      }
                    } else {
                      setSelectedRegions(prev => [...prev, region.region]);
                    }
                  }}
                >
                  {region.region}
                </Badge>
              ))}
            </div>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredData} barGap={0}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
                  <XAxis dataKey="region" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="demand" fill="hsl(var(--primary))" name="Demand (GW)" />
                  <Bar dataKey="renewable" fill="hsl(var(--energy-renewable))" name="Renewable (GW)" />
                  <Bar dataKey="reserves" fill="hsl(var(--muted-foreground))" name="Reserves (GW)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="radar" className="space-y-4">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={[
                  { metric: 'Load Factor', ...Object.fromEntries(filteredData.map(r => [r.region, (r.demand / r.capacity) * 100])) },
                  { metric: 'Renewable %', ...Object.fromEntries(filteredData.map(r => [r.region, r.renewable])) },
                  { metric: 'Efficiency', ...Object.fromEntries(filteredData.map(r => [r.region, r.efficiency])) },
                  { metric: 'Reliability', ...Object.fromEntries(filteredData.map(r => [r.region, r.reliability])) },
                  { metric: 'Reserves', ...Object.fromEntries(filteredData.map(r => [r.region, (r.reserves / r.capacity) * 100])) },
                ]}>
                  <PolarGrid className="stroke-border/50" />
                  <PolarAngleAxis dataKey="metric" className="text-xs" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} className="text-xs" />
                  {filteredData.map((region, idx) => (
                    <Radar
                      key={region.region}
                      name={region.region}
                      dataKey={region.region}
                      stroke={COLORS[region.region as keyof typeof COLORS] || 'hsl(var(--primary))'}
                      fill={COLORS[region.region as keyof typeof COLORS] || 'hsl(var(--primary))'}
                      fillOpacity={0.2}
                    />
                  ))}
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="flows" className="space-y-4">
            <div className="space-y-3">
              {powerFlows.map((flow, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{flow.from}</Badge>
                    <div className="flex items-center gap-1">
                      <div className="h-0.5 w-8 bg-primary" />
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <div className="h-0.5 w-8 bg-primary" />
                    </div>
                    <Badge variant="outline">{flow.to}</Badge>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{flow.amount} GW</p>
                    <p className="text-xs text-muted-foreground">{flow.direction}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-muted/20 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Total interconnection capacity: <span className="font-bold text-foreground">52.2 GW</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Current utilization: <span className="font-bold text-primary">78.4%</span>
              </p>
            </div>
          </TabsContent>

          <TabsContent value="heatmap" className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              <div className="grid grid-cols-7 gap-1 text-xs">
                <div className="p-2"></div>
                {['Demand', 'Renewable', 'Carbon', 'Price', 'Freq', 'Reserve'].map(metric => (
                  <div key={metric} className="p-2 text-center font-medium text-muted-foreground">{metric}</div>
                ))}
              </div>
              {filteredData.map(region => (
                <div key={region.region} className="grid grid-cols-7 gap-1">
                  <div className="p-2 text-xs font-medium flex items-center">{region.region}</div>
                  <div className={`p-2 text-center rounded text-xs ${region.demand / region.capacity > 0.9 ? 'bg-destructive/20 text-destructive' : region.demand / region.capacity > 0.7 ? 'bg-status-warning/20 text-status-warning' : 'bg-status-optimal/20 text-status-optimal'}`}>
                    {((region.demand / region.capacity) * 100).toFixed(0)}%
                  </div>
                  <div className={`p-2 text-center rounded text-xs ${region.renewable > 50 ? 'bg-status-optimal/20 text-status-optimal' : region.renewable > 30 ? 'bg-status-warning/20 text-status-warning' : 'bg-muted/50'}`}>
                    {region.renewable}%
                  </div>
                  <div className={`p-2 text-center rounded text-xs ${region.carbonIntensity < 250 ? 'bg-status-optimal/20 text-status-optimal' : region.carbonIntensity < 300 ? 'bg-status-warning/20 text-status-warning' : 'bg-destructive/20 text-destructive'}`}>
                    {region.carbonIntensity}
                  </div>
                  <div className={`p-2 text-center rounded text-xs ${region.price < 40 ? 'bg-status-optimal/20 text-status-optimal' : region.price < 50 ? 'bg-status-warning/20 text-status-warning' : 'bg-destructive/20 text-destructive'}`}>
                    ${region.price}
                  </div>
                  <div className={`p-2 text-center rounded text-xs ${Math.abs(region.frequency - 60) < 0.02 ? 'bg-status-optimal/20 text-status-optimal' : 'bg-status-warning/20 text-status-warning'}`}>
                    {region.frequency.toFixed(2)}
                  </div>
                  <div className={`p-2 text-center rounded text-xs ${region.reserves > 60 ? 'bg-status-optimal/20 text-status-optimal' : region.reserves > 40 ? 'bg-status-warning/20 text-status-warning' : 'bg-destructive/20 text-destructive'}`}>
                    {region.reserves}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border/50">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Best Performance</p>
            <p className="text-sm font-bold text-energy-renewable flex items-center gap-1">
              {bestPerformer.region} <TrendingUp className="h-3 w-3" />
            </p>
            <p className="text-xs text-muted-foreground">{bestPerformer.carbonIntensity} g/kWh</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Highest Demand</p>
            <p className="text-sm font-bold flex items-center gap-1">
              {highestDemand.region}
            </p>
            <p className="text-xs text-muted-foreground">{highestDemand.demand.toFixed(0)} GW</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Total Generation</p>
            <p className="text-sm font-bold text-primary">
              {filteredData.reduce((acc, r) => acc + r.demand, 0).toFixed(0)} GW
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Avg. Renewable</p>
            <p className="text-sm font-bold text-energy-renewable">
              {(filteredData.reduce((acc, r) => acc + r.renewable, 0) / filteredData.length).toFixed(1)}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MultiRegionComparison;