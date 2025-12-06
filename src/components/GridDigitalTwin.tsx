import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Box, Cpu, Network, RefreshCw, Zap, Activity, Database, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';

const GridDigitalTwin = () => {
  const [syncStatus, setSyncStatus] = useState(98.7);
  const [lastSync, setLastSync] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setSyncStatus(prev => Math.min(100, Math.max(95, prev + (Math.random() - 0.5) * 2)));
      setLastSync(new Date());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const twinComponents = [
    { name: 'Transmission Network', nodes: 12450, synced: 12398, accuracy: 99.6, status: 'synced' },
    { name: 'Distribution Grid', nodes: 89234, synced: 88945, accuracy: 99.7, status: 'synced' },
    { name: 'Generation Assets', nodes: 1834, synced: 1830, accuracy: 99.8, status: 'synced' },
    { name: 'Substations', nodes: 4521, synced: 4498, accuracy: 99.5, status: 'synced' },
    { name: 'Smart Meters', nodes: 2340000, synced: 2325600, accuracy: 99.4, status: 'partial' },
    { name: 'SCADA Systems', nodes: 8934, synced: 8934, accuracy: 100, status: 'synced' },
  ];

  const simulationScenarios = [
    { name: 'Peak Load Stress Test', duration: '2h 15m', status: 'completed', result: 'passed' },
    { name: 'Renewable Intermittency', duration: '4h 30m', status: 'running', progress: 67 },
    { name: 'Cascading Failure Analysis', duration: '1h 45m', status: 'queued', result: null },
    { name: 'Cyber Attack Response', duration: '3h 00m', status: 'queued', result: null },
  ];

  const realTimeMetrics = [
    { label: 'Model Accuracy', value: '99.7%', trend: '+0.2%' },
    { label: 'Prediction Horizon', value: '72 hrs', trend: 'stable' },
    { label: 'Data Points/sec', value: '2.4M', trend: '+12%' },
    { label: 'Anomaly Detection', value: '< 100ms', trend: '-15ms' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'synced': return 'bg-energy-renewable/20 text-energy-renewable';
      case 'partial': return 'bg-energy-solar/20 text-energy-solar';
      case 'offline': return 'bg-destructive/20 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="glass-panel border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Box className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-foreground">Grid Digital Twin</CardTitle>
              <p className="text-sm text-muted-foreground">Real-time virtual replica of physical grid</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-energy-renewable/20 text-energy-renewable border-energy-renewable/30">
              <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
              Live Sync
            </Badge>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              3D View
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sync Status */}
        <div className="p-4 rounded-lg bg-card/50 border border-border/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Twin Synchronization</span>
            <span className="text-sm text-muted-foreground">
              Last sync: {lastSync.toLocaleTimeString()}
            </span>
          </div>
          <Progress value={syncStatus} className="h-3 mb-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{syncStatus.toFixed(1)}% synchronized</span>
            <span>2,456,973 nodes active</span>
          </div>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {realTimeMetrics.map((metric, index) => (
            <div key={index} className="p-3 rounded-lg bg-card/50 border border-border/50 text-center">
              <div className="text-lg font-bold text-foreground">{metric.value}</div>
              <div className="text-xs text-muted-foreground">{metric.label}</div>
              <div className="text-xs text-energy-renewable mt-1">{metric.trend}</div>
            </div>
          ))}
        </div>

        <Tabs defaultValue="components" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card/50">
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="simulations">Simulations</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="components" className="space-y-3 mt-4">
            {twinComponents.map((component, index) => (
              <div key={index} className="p-3 rounded-lg bg-card/50 border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-primary" />
                    <span className="font-medium text-foreground">{component.name}</span>
                  </div>
                  <Badge className={getStatusColor(component.status)}>
                    {component.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Total Nodes: </span>
                    <span className="text-foreground">{component.nodes.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Synced: </span>
                    <span className="text-foreground">{component.synced.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Accuracy: </span>
                    <span className="text-energy-renewable">{component.accuracy}%</span>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="simulations" className="space-y-3 mt-4">
            {simulationScenarios.map((scenario, index) => (
              <div key={index} className="p-3 rounded-lg bg-card/50 border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{scenario.name}</span>
                  <Badge variant="outline" className={
                    scenario.status === 'completed' ? 'bg-energy-renewable/20 text-energy-renewable' :
                    scenario.status === 'running' ? 'bg-primary/20 text-primary' :
                    'bg-muted text-muted-foreground'
                  }>
                    {scenario.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Duration: {scenario.duration}</span>
                  {scenario.status === 'running' && (
                    <div className="flex items-center gap-2">
                      <Progress value={scenario.progress} className="w-24 h-2" />
                      <span className="text-foreground">{scenario.progress}%</span>
                    </div>
                  )}
                  {scenario.result && (
                    <span className={scenario.result === 'passed' ? 'text-energy-renewable' : 'text-destructive'}>
                      {scenario.result.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
            ))}
            <Button className="w-full" variant="outline">
              <Cpu className="h-4 w-4 mr-2" />
              Create New Simulation
            </Button>
          </TabsContent>

          <TabsContent value="analytics" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground">Prediction Accuracy</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Load Forecasting</span>
                    <span className="text-energy-renewable">97.8%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Fault Detection</span>
                    <span className="text-energy-renewable">99.2%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Equipment Failure</span>
                    <span className="text-energy-renewable">94.5%</span>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <Network className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground">Model Performance</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Latency</span>
                    <span className="text-foreground">45ms</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Throughput</span>
                    <span className="text-foreground">2.4M pts/s</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Uptime</span>
                    <span className="text-energy-renewable">99.99%</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GridDigitalTwin;
