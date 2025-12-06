import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Network, GitBranch, Circle, ArrowRight, AlertTriangle, CheckCircle, Layers, RefreshCw } from 'lucide-react';
import { useState } from 'react';

const NetworkTopologyAnalyzer = () => {
  const [analyzing, setAnalyzing] = useState(false);

  const topologyStats = {
    buses: 12450,
    branches: 18920,
    generators: 1834,
    loads: 89234,
    islands: 1,
    meshLoops: 2456,
  };

  const networkLayers = [
    { name: 'Transmission (500kV)', nodes: 145, branches: 234, health: 98.5, status: 'normal' },
    { name: 'Transmission (230kV)', nodes: 456, branches: 678, health: 97.2, status: 'normal' },
    { name: 'Transmission (115kV)', nodes: 892, branches: 1234, health: 96.8, status: 'normal' },
    { name: 'Sub-transmission (69kV)', nodes: 2341, branches: 3456, health: 95.4, status: 'caution' },
    { name: 'Distribution (12kV)', nodes: 8616, branches: 13318, health: 94.2, status: 'normal' },
  ];

  const criticalPaths = [
    { from: 'Gen Station A', to: 'Load Center 1', hops: 4, capacity: 2500, utilization: 78 },
    { from: 'Gen Station B', to: 'Industrial Zone', hops: 3, capacity: 1800, utilization: 85 },
    { from: 'Import Tie', to: 'Metro Area', hops: 6, capacity: 3200, utilization: 62 },
    { from: 'Solar Farm C', to: 'Distribution Hub', hops: 5, capacity: 900, utilization: 45 },
  ];

  const contingencies = [
    { name: 'N-1: Line 500-A', impact: 'Low', violations: 0, status: 'secure' },
    { name: 'N-1: Gen Unit 3', impact: 'Medium', violations: 2, status: 'monitored' },
    { name: 'N-1: Transformer T5', impact: 'Low', violations: 0, status: 'secure' },
    { name: 'N-2: Lines 230-B/C', impact: 'High', violations: 5, status: 'at-risk' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': case 'secure': return 'bg-energy-renewable/20 text-energy-renewable';
      case 'caution': case 'monitored': return 'bg-energy-solar/20 text-energy-solar';
      case 'at-risk': return 'bg-destructive/20 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="glass-panel border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Network className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-foreground">Network Topology Analyzer</CardTitle>
              <p className="text-sm text-muted-foreground">Grid connectivity & path analysis</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setAnalyzing(true);
              setTimeout(() => setAnalyzing(false), 2000);
            }}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${analyzing ? 'animate-spin' : ''}`} />
            Analyze
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Topology Overview */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          <div className="p-3 rounded-lg bg-card/50 border border-border/50 text-center">
            <Circle className="h-4 w-4 mx-auto mb-1 text-primary" />
            <div className="text-lg font-bold text-foreground">{topologyStats.buses.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Buses</div>
          </div>
          <div className="p-3 rounded-lg bg-card/50 border border-border/50 text-center">
            <GitBranch className="h-4 w-4 mx-auto mb-1 text-primary" />
            <div className="text-lg font-bold text-foreground">{topologyStats.branches.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Branches</div>
          </div>
          <div className="p-3 rounded-lg bg-card/50 border border-border/50 text-center">
            <div className="text-lg font-bold text-foreground">{topologyStats.generators.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Generators</div>
          </div>
          <div className="p-3 rounded-lg bg-card/50 border border-border/50 text-center">
            <div className="text-lg font-bold text-foreground">{topologyStats.loads.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Loads</div>
          </div>
          <div className="p-3 rounded-lg bg-card/50 border border-border/50 text-center">
            <div className="text-lg font-bold text-energy-renewable">{topologyStats.islands}</div>
            <div className="text-xs text-muted-foreground">Islands</div>
          </div>
          <div className="p-3 rounded-lg bg-card/50 border border-border/50 text-center">
            <div className="text-lg font-bold text-foreground">{topologyStats.meshLoops.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Mesh Loops</div>
          </div>
        </div>

        {/* Network Layers */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
            <Layers className="h-4 w-4 text-primary" />
            Network Layers
          </h4>
          {networkLayers.map((layer, index) => (
            <div key={index} className="p-3 rounded-lg bg-card/50 border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground">{layer.name}</span>
                <Badge className={getStatusColor(layer.status)}>{layer.status}</Badge>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Progress value={layer.health} className="h-2" />
                </div>
                <span className="text-sm text-foreground w-12">{layer.health}%</span>
                <span className="text-xs text-muted-foreground">
                  {layer.nodes} nodes / {layer.branches} branches
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Critical Paths */}
        <div className="p-4 rounded-lg bg-card/50 border border-border/50">
          <h4 className="text-sm font-medium text-foreground mb-3">Critical Power Paths</h4>
          <div className="space-y-3">
            {criticalPaths.map((path, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-sm text-foreground truncate max-w-24">{path.from}</span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm text-foreground truncate max-w-24">{path.to}</span>
                  <span className="text-xs text-muted-foreground">({path.hops} hops)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20">
                    <Progress value={path.utilization} className="h-2" />
                  </div>
                  <span className={`text-sm w-12 text-right ${
                    path.utilization > 80 ? 'text-destructive' :
                    path.utilization > 60 ? 'text-energy-solar' :
                    'text-energy-renewable'
                  }`}>
                    {path.utilization}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contingency Analysis */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-energy-solar" />
            Contingency Analysis
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {contingencies.map((cont, index) => (
              <div key={index} className={`p-3 rounded-lg border ${
                cont.status === 'at-risk' ? 'bg-destructive/10 border-destructive/30' :
                cont.status === 'monitored' ? 'bg-energy-solar/10 border-energy-solar/30' :
                'bg-card/50 border-border/50'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-foreground text-sm">{cont.name}</span>
                  {cont.status === 'secure' ? (
                    <CheckCircle className="h-4 w-4 text-energy-renewable" />
                  ) : (
                    <AlertTriangle className={`h-4 w-4 ${cont.status === 'at-risk' ? 'text-destructive' : 'text-energy-solar'}`} />
                  )}
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Impact: {cont.impact}</span>
                  <span className={cont.violations > 0 ? 'text-destructive' : 'text-energy-renewable'}>
                    {cont.violations} violations
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkTopologyAnalyzer;
