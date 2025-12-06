import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Power, Shield, CheckCircle, AlertTriangle, Clock, MapPin, Zap, Radio, PlayCircle } from 'lucide-react';
import { useState } from 'react';

const BlackStartCapability = () => {
  const [simulationMode, setSimulationMode] = useState(false);

  const blackStartUnits = [
    {
      name: 'Hydro Station Alpha',
      type: 'Hydroelectric',
      capacity: 450,
      location: 'Region North',
      status: 'ready',
      lastTest: '2024-11-15',
      startupTime: '5 min',
      cranking: 850,
    },
    {
      name: 'Gas Turbine GT-7',
      type: 'Gas Turbine',
      capacity: 200,
      location: 'Region Central',
      status: 'ready',
      lastTest: '2024-11-20',
      startupTime: '15 min',
      cranking: 400,
    },
    {
      name: 'Battery Grid BS-1',
      type: 'Battery Storage',
      capacity: 100,
      location: 'Region South',
      status: 'ready',
      lastTest: '2024-11-28',
      startupTime: '< 1 min',
      cranking: 200,
    },
    {
      name: 'Diesel Gen DG-12',
      type: 'Diesel Generator',
      capacity: 50,
      location: 'Region East',
      status: 'maintenance',
      lastTest: '2024-10-30',
      startupTime: '3 min',
      cranking: 100,
    },
  ];

  const restorationPaths = [
    {
      name: 'Primary Path A',
      coverage: '65%',
      units: ['Hydro Station Alpha', 'Gas Turbine GT-7'],
      estimatedTime: '2h 30m',
      priority: 1,
      status: 'verified',
    },
    {
      name: 'Secondary Path B',
      coverage: '45%',
      units: ['Battery Grid BS-1', 'Gas Turbine GT-7'],
      estimatedTime: '3h 15m',
      priority: 2,
      status: 'verified',
    },
    {
      name: 'Emergency Path C',
      coverage: '30%',
      units: ['Diesel Gen DG-12', 'Battery Grid BS-1'],
      estimatedTime: '4h 00m',
      priority: 3,
      status: 'needs-review',
    },
  ];

  const criticalLoads = [
    { name: 'Hospital Complex A', load: 15, priority: 'critical', status: 'mapped' },
    { name: 'Water Treatment Plant', load: 25, priority: 'critical', status: 'mapped' },
    { name: 'Emergency Services HQ', load: 8, priority: 'critical', status: 'mapped' },
    { name: 'Communications Hub', load: 12, priority: 'high', status: 'mapped' },
    { name: 'Data Center DC-1', load: 45, priority: 'high', status: 'pending' },
  ];

  const systemReadiness = {
    overallScore: 94,
    blackStartUnits: 3,
    totalCapacity: 800,
    crankingCapacity: 1550,
    lastDrill: '2024-11-01',
    nextDrill: '2024-12-15',
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ready':
        return <Badge className="bg-energy-renewable/20 text-energy-renewable">Ready</Badge>;
      case 'maintenance':
        return <Badge className="bg-energy-solar/20 text-energy-solar">Maintenance</Badge>;
      case 'verified':
        return <Badge className="bg-energy-renewable/20 text-energy-renewable">Verified</Badge>;
      case 'needs-review':
        return <Badge className="bg-energy-solar/20 text-energy-solar">Needs Review</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="glass-panel border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-energy-renewable/20">
              <Power className="h-5 w-5 text-energy-renewable" />
            </div>
            <div>
              <CardTitle className="text-foreground">Black Start Capability</CardTitle>
              <p className="text-sm text-muted-foreground">Grid restoration & emergency readiness</p>
            </div>
          </div>
          <Button 
            variant={simulationMode ? "destructive" : "outline"} 
            size="sm"
            onClick={() => setSimulationMode(!simulationMode)}
          >
            <PlayCircle className="h-4 w-4 mr-2" />
            {simulationMode ? 'Stop Simulation' : 'Run Simulation'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Readiness Overview */}
        <div className="p-4 rounded-lg bg-gradient-to-br from-energy-renewable/10 to-transparent border border-energy-renewable/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-energy-renewable" />
              <span className="font-medium text-foreground">System Readiness Score</span>
            </div>
            <span className="text-3xl font-bold text-energy-renewable">{systemReadiness.overallScore}%</span>
          </div>
          <Progress value={systemReadiness.overallScore} className="h-3 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Black Start Units: </span>
              <span className="text-foreground font-medium">{systemReadiness.blackStartUnits} active</span>
            </div>
            <div>
              <span className="text-muted-foreground">Total Capacity: </span>
              <span className="text-foreground font-medium">{systemReadiness.totalCapacity} MW</span>
            </div>
            <div>
              <span className="text-muted-foreground">Last Drill: </span>
              <span className="text-foreground font-medium">{systemReadiness.lastDrill}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Next Drill: </span>
              <span className="text-primary font-medium">{systemReadiness.nextDrill}</span>
            </div>
          </div>
        </div>

        {/* Black Start Units */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            Black Start Units
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {blackStartUnits.map((unit, index) => (
              <div key={index} className="p-3 rounded-lg bg-card/50 border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{unit.name}</span>
                  {getStatusBadge(unit.status)}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Type: </span>
                    <span className="text-foreground">{unit.type}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Capacity: </span>
                    <span className="text-foreground">{unit.capacity} MW</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Startup: </span>
                    <span className="text-foreground">{unit.startupTime}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Cranking: </span>
                    <span className="text-foreground">{unit.cranking} MW</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {unit.location}
                  <span className="ml-auto">Tested: {unit.lastTest}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Restoration Paths */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
            <Radio className="h-4 w-4 text-primary" />
            Restoration Paths
          </h4>
          {restorationPaths.map((path, index) => (
            <div key={index} className={`p-3 rounded-lg border ${
              path.priority === 1 ? 'bg-energy-renewable/5 border-energy-renewable/30' :
              path.priority === 2 ? 'bg-primary/5 border-primary/30' :
              'bg-card/50 border-border/50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">Priority {path.priority}</Badge>
                  <span className="font-medium text-foreground">{path.name}</span>
                </div>
                {getStatusBadge(path.status)}
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground">Coverage: <span className="text-foreground">{path.coverage}</span></span>
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {path.estimatedTime}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{path.units.join(' → ')}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Critical Loads */}
        <div className="p-4 rounded-lg bg-card/50 border border-border/50">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-energy-solar" />
            Critical Load Priority
          </h4>
          <div className="space-y-2">
            {criticalLoads.map((load, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded bg-card/30">
                <div className="flex items-center gap-3">
                  <Badge className={
                    load.priority === 'critical' ? 'bg-destructive/20 text-destructive' :
                    'bg-energy-solar/20 text-energy-solar'
                  }>
                    {load.priority}
                  </Badge>
                  <span className="text-foreground">{load.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{load.load} MW</span>
                  {load.status === 'mapped' ? (
                    <CheckCircle className="h-4 w-4 text-energy-renewable" />
                  ) : (
                    <Clock className="h-4 w-4 text-energy-solar" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1" variant="outline">
            <MapPin className="h-4 w-4 mr-2" />
            View Restoration Map
          </Button>
          <Button className="flex-1" variant="outline">
            <Shield className="h-4 w-4 mr-2" />
            Emergency Protocols
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlackStartCapability;
