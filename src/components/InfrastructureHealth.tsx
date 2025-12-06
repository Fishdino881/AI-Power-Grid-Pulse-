import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Wrench, AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const InfrastructureHealth = () => {
  const [equipmentHealth, setEquipmentHealth] = useState([
    { component: 'Transformers', health: 94, mtbf: 12500, nextMaint: 45 },
    { component: 'Transmission Lines', health: 88, mtbf: 8200, nextMaint: 28 },
    { component: 'Circuit Breakers', health: 96, mtbf: 15000, nextMaint: 67 },
    { component: 'Generators', health: 91, mtbf: 10800, nextMaint: 38 },
    { component: 'Substations', health: 93, mtbf: 11200, nextMaint: 52 },
    { component: 'Capacitor Banks', health: 89, mtbf: 9500, nextMaint: 31 }
  ]);

  const maintenanceSchedule = [
    { date: 'Week 1', planned: 12, predicted: 3, emergency: 1 },
    { date: 'Week 2', planned: 15, predicted: 2, emergency: 0 },
    { date: 'Week 3', planned: 8, predicted: 4, emergency: 2 },
    { date: 'Week 4', planned: 18, predicted: 3, emergency: 1 },
    { date: 'Week 5', planned: 10, predicted: 5, emergency: 0 },
    { date: 'Week 6', planned: 14, predicted: 2, emergency: 1 }
  ];

  const assetAge = [
    { range: '0-5 years', count: 245, condition: 'Excellent' },
    { range: '5-10 years', count: 387, condition: 'Good' },
    { range: '10-15 years', count: 428, condition: 'Fair' },
    { range: '15-20 years', count: 312, condition: 'Fair' },
    { range: '20-25 years', count: 189, condition: 'Poor' },
    { range: '25+ years', count: 94, condition: 'Critical' }
  ];

  const [reliabilityMetrics, setReliabilityMetrics] = useState({
    saidi: 124.5,
    saifi: 1.42,
    caidi: 87.7,
    availability: 99.97
  });

  const performanceRadar = [
    { metric: 'Reliability', score: 95, benchmark: 90 },
    { metric: 'Efficiency', score: 92, benchmark: 88 },
    { metric: 'Safety', score: 98, benchmark: 95 },
    { metric: 'Maintenance', score: 88, benchmark: 85 },
    { metric: 'Capacity', score: 91, benchmark: 87 },
    { metric: 'Age', score: 76, benchmark: 80 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setEquipmentHealth(prev => prev.map(item => ({
        ...item,
        health: Math.min(100, Math.max(75, item.health + (Math.random() - 0.5) * 0.5)),
        nextMaint: Math.max(0, item.nextMaint - 1)
      })));

      setReliabilityMetrics(prev => ({
        saidi: Math.max(100, prev.saidi + (Math.random() - 0.5) * 2),
        saifi: Math.max(1, prev.saifi + (Math.random() - 0.5) * 0.05),
        caidi: Math.max(70, prev.caidi + (Math.random() - 0.5) * 1.5),
        availability: Math.min(100, Math.max(99.9, prev.availability + (Math.random() - 0.5) * 0.01))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getHealthColor = (health: number) => {
    if (health >= 95) return 'text-status-optimal';
    if (health >= 85) return 'text-energy-renewable';
    if (health >= 75) return 'text-status-warning';
    return 'text-status-critical';
  };

  const getHealthBadge = (health: number) => {
    if (health >= 95) return { variant: 'default' as const, label: 'Excellent' };
    if (health >= 85) return { variant: 'outline' as const, label: 'Good' };
    if (health >= 75) return { variant: 'secondary' as const, label: 'Fair' };
    return { variant: 'destructive' as const, label: 'Attention' };
  };

  return (
    <Card className="glass-panel p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Wrench className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-energy-renewable bg-clip-text text-transparent">
            Infrastructure Health & Maintenance
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">Predictive maintenance and asset management</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="glass-panel p-4 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">SAIDI</div>
          <div className="text-2xl font-bold">{reliabilityMetrics.saidi.toFixed(1)}</div>
          <div className="text-xs text-muted-foreground mt-1">minutes/year</div>
        </div>
        <div className="glass-panel p-4 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">SAIFI</div>
          <div className="text-2xl font-bold">{reliabilityMetrics.saifi.toFixed(2)}</div>
          <div className="text-xs text-muted-foreground mt-1">interruptions/year</div>
        </div>
        <div className="glass-panel p-4 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">CAIDI</div>
          <div className="text-2xl font-bold">{reliabilityMetrics.caidi.toFixed(1)}</div>
          <div className="text-xs text-muted-foreground mt-1">minutes</div>
        </div>
        <div className="glass-panel p-4 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">Availability</div>
          <div className="text-2xl font-bold text-status-optimal">{reliabilityMetrics.availability.toFixed(2)}%</div>
          <div className="text-xs text-status-optimal mt-1">↑ 0.03% vs target</div>
        </div>
      </div>

      <Tabs defaultValue="health" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="health">Equipment Health</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="assets">Asset Age</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="health" className="space-y-4">
          <div className="glass-panel p-4 rounded-lg">
            <h4 className="font-semibold mb-4">Equipment Health Status</h4>
            <div className="space-y-4">
              {equipmentHealth.map((item) => {
                const badge = getHealthBadge(item.health);
                return (
                  <div key={item.component} className="glass-panel p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.component}</span>
                        <Badge variant={badge.variant}>{badge.label}</Badge>
                      </div>
                      <span className={`text-xl font-bold ${getHealthColor(item.health)}`}>
                        {item.health.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={item.health} className="h-2 mb-3" />
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">MTBF:</span>
                        <span className="font-medium">{item.mtbf.toLocaleString()}h</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Next Maint:</span>
                        <span className="font-medium">{item.nextMaint} days</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <div className="glass-panel p-4 rounded-lg">
            <h4 className="font-semibold mb-4">6-Week Maintenance Forecast</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={maintenanceSchedule}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="planned" fill="hsl(var(--primary))" name="Planned" />
                <Bar dataKey="predicted" fill="hsl(var(--status-warning))" name="Predicted" />
                <Bar dataKey="emergency" fill="hsl(var(--status-critical))" name="Emergency" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="glass-panel p-3 rounded text-center">
                <div className="text-xs text-muted-foreground">Total Planned</div>
                <div className="text-2xl font-bold text-primary">77</div>
                <div className="text-xs text-muted-foreground mt-1">next 6 weeks</div>
              </div>
              <div className="glass-panel p-3 rounded text-center">
                <div className="text-xs text-muted-foreground">AI Predicted</div>
                <div className="text-2xl font-bold text-status-warning">19</div>
                <div className="text-xs text-muted-foreground mt-1">additional needed</div>
              </div>
              <div className="glass-panel p-3 rounded text-center">
                <div className="text-xs text-muted-foreground">Emergency Risk</div>
                <div className="text-2xl font-bold text-status-critical">5</div>
                <div className="text-xs text-muted-foreground mt-1">high probability</div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="assets" className="space-y-4">
          <div className="glass-panel p-4 rounded-lg">
            <h4 className="font-semibold mb-4">Asset Age Distribution</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={assetAge}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" name="Asset Count" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              <h5 className="font-semibold text-sm mb-3">Condition Assessment</h5>
              {assetAge.map((item) => (
                <div key={item.range} className="flex items-center justify-between glass-panel p-2 rounded">
                  <span className="text-sm">{item.range}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      item.condition === 'Excellent' ? 'default' :
                      item.condition === 'Good' ? 'outline' :
                      item.condition === 'Fair' ? 'secondary' :
                      'destructive'
                    }>
                      {item.condition}
                    </Badge>
                    <span className="text-sm font-medium w-16 text-right">{item.count} units</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="glass-panel p-4 rounded-lg">
            <h4 className="font-semibold mb-4">Infrastructure Performance Radar</h4>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={performanceRadar}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="metric" stroke="hsl(var(--muted-foreground))" />
                <PolarRadiusAxis stroke="hsl(var(--muted-foreground))" />
                <Radar name="Current Score" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                <Radar name="Industry Benchmark" dataKey="benchmark" stroke="hsl(var(--energy-renewable))" fill="hsl(var(--energy-renewable))" fillOpacity={0.3} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="glass-panel p-3 rounded">
                <div className="text-xs text-muted-foreground mb-1">Overall Score</div>
                <div className="text-2xl font-bold text-primary">90.0</div>
                <div className="text-xs text-status-optimal mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +3.2 vs benchmark
                </div>
              </div>
              <div className="glass-panel p-3 rounded">
                <div className="text-xs text-muted-foreground mb-1">Improvement Focus</div>
                <div className="text-lg font-bold text-status-warning">Asset Age</div>
                <div className="text-xs text-muted-foreground mt-1">-4 pts vs benchmark</div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default InfrastructureHealth;
