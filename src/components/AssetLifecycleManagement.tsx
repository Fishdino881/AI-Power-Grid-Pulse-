import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Settings, Calendar, TrendingUp, AlertCircle, CheckCircle, Clock, DollarSign, BarChart3 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const AssetLifecycleManagement = () => {
  const assetAgeDistribution = [
    { name: '0-10 years', value: 35, color: 'hsl(var(--energy-renewable))' },
    { name: '10-20 years', value: 28, color: 'hsl(var(--primary))' },
    { name: '20-30 years', value: 22, color: 'hsl(var(--energy-solar))' },
    { name: '30+ years', value: 15, color: 'hsl(var(--destructive))' },
  ];

  const replacementForecast = [
    { year: '2024', transformers: 45, lines: 120, switchgear: 28, budget: 12.5 },
    { year: '2025', transformers: 62, lines: 85, switchgear: 35, budget: 15.2 },
    { year: '2026', transformers: 78, lines: 150, switchgear: 42, budget: 18.8 },
    { year: '2027', transformers: 55, lines: 110, switchgear: 38, budget: 14.5 },
    { year: '2028', transformers: 90, lines: 180, switchgear: 55, budget: 22.1 },
  ];

  const assetCategories = [
    { 
      name: 'Transformers', 
      total: 4521, 
      healthy: 3845, 
      atRisk: 520, 
      critical: 156,
      avgAge: 18.5,
      replacementCost: '$245M'
    },
    { 
      name: 'Transmission Lines', 
      total: 12450, 
      healthy: 10890, 
      atRisk: 1200, 
      critical: 360,
      avgAge: 22.3,
      replacementCost: '$890M'
    },
    { 
      name: 'Switchgear', 
      total: 8934, 
      healthy: 7850, 
      atRisk: 850, 
      critical: 234,
      avgAge: 15.8,
      replacementCost: '$156M'
    },
    { 
      name: 'Protection Relays', 
      total: 15670, 
      healthy: 14200, 
      atRisk: 1100, 
      critical: 370,
      avgAge: 12.4,
      replacementCost: '$78M'
    },
  ];

  const maintenanceSchedule = [
    { asset: 'Transformer T-4521', type: 'Oil Testing', date: 'Dec 15, 2024', priority: 'high' },
    { asset: 'Line Section L-847', type: 'Inspection', date: 'Dec 18, 2024', priority: 'medium' },
    { asset: 'Switchgear SG-2341', type: 'Calibration', date: 'Dec 20, 2024', priority: 'low' },
    { asset: 'Relay Panel RP-892', type: 'Firmware Update', date: 'Dec 22, 2024', priority: 'medium' },
  ];

  const getHealthPercentage = (healthy: number, total: number) => ((healthy / total) * 100).toFixed(1);

  return (
    <Card className="glass-panel border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Settings className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-foreground">Asset Lifecycle Management</CardTitle>
              <p className="text-sm text-muted-foreground">Equipment health & replacement planning</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Full Report
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 rounded-lg bg-card/50 border border-border/50 text-center">
            <div className="text-2xl font-bold text-foreground">41,575</div>
            <div className="text-xs text-muted-foreground">Total Assets</div>
          </div>
          <div className="p-3 rounded-lg bg-card/50 border border-border/50 text-center">
            <div className="text-2xl font-bold text-energy-renewable">89.2%</div>
            <div className="text-xs text-muted-foreground">Healthy Condition</div>
          </div>
          <div className="p-3 rounded-lg bg-card/50 border border-border/50 text-center">
            <div className="text-2xl font-bold text-energy-solar">8.9%</div>
            <div className="text-xs text-muted-foreground">At Risk</div>
          </div>
          <div className="p-3 rounded-lg bg-card/50 border border-border/50 text-center">
            <div className="text-2xl font-bold text-destructive">1.9%</div>
            <div className="text-xs text-muted-foreground">Critical</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Age Distribution */}
          <div className="p-4 rounded-lg bg-card/50 border border-border/50">
            <h4 className="text-sm font-medium text-foreground mb-4">Asset Age Distribution</h4>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={assetAgeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {assetAgeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {assetAgeDistribution.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Replacement Forecast */}
          <div className="p-4 rounded-lg bg-card/50 border border-border/50">
            <h4 className="text-sm font-medium text-foreground mb-4">Replacement Budget Forecast</h4>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={replacementForecast}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="budget" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-2 text-xs text-muted-foreground">
              5-Year Total: $83.1M estimated
            </div>
          </div>
        </div>

        <Tabs defaultValue="categories" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-card/50">
            <TabsTrigger value="categories">Asset Categories</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="space-y-3 mt-4">
            {assetCategories.map((category, index) => (
              <div key={index} className="p-4 rounded-lg bg-card/50 border border-border/50">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-foreground">{category.name}</span>
                  <span className="text-sm text-muted-foreground">{category.total.toLocaleString()} units</span>
                </div>
                <div className="mb-3">
                  <div className="flex gap-1 h-3 rounded-full overflow-hidden">
                    <div 
                      className="bg-energy-renewable" 
                      style={{ width: `${(category.healthy / category.total) * 100}%` }}
                    />
                    <div 
                      className="bg-energy-solar" 
                      style={{ width: `${(category.atRisk / category.total) * 100}%` }}
                    />
                    <div 
                      className="bg-destructive" 
                      style={{ width: `${(category.critical / category.total) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div>
                    <span className="text-energy-renewable">{category.healthy.toLocaleString()}</span>
                    <span className="text-muted-foreground ml-1">healthy</span>
                  </div>
                  <div>
                    <span className="text-energy-solar">{category.atRisk.toLocaleString()}</span>
                    <span className="text-muted-foreground ml-1">at risk</span>
                  </div>
                  <div>
                    <span className="text-destructive">{category.critical}</span>
                    <span className="text-muted-foreground ml-1">critical</span>
                  </div>
                  <div className="text-right">
                    <span className="text-foreground">{category.replacementCost}</span>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-3 mt-4">
            {maintenanceSchedule.map((item, index) => (
              <div key={index} className="p-3 rounded-lg bg-card/50 border border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    item.priority === 'high' ? 'bg-destructive/20' :
                    item.priority === 'medium' ? 'bg-energy-solar/20' :
                    'bg-muted'
                  }`}>
                    <Settings className={`h-4 w-4 ${
                      item.priority === 'high' ? 'text-destructive' :
                      item.priority === 'medium' ? 'text-energy-solar' :
                      'text-muted-foreground'
                    }`} />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{item.asset}</div>
                    <div className="text-sm text-muted-foreground">{item.type}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm text-foreground">
                    <Calendar className="h-3 w-3" />
                    {item.date}
                  </div>
                  <Badge variant="outline" className={
                    item.priority === 'high' ? 'text-destructive' :
                    item.priority === 'medium' ? 'text-energy-solar' :
                    'text-muted-foreground'
                  }>
                    {item.priority}
                  </Badge>
                </div>
              </div>
            ))}
            <Button className="w-full" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              View Full Schedule
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AssetLifecycleManagement;
