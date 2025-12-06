import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Power, AlertTriangle, Shield, Layers, Clock, Users, Zap, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const LoadSheddingManager = () => {
  const [systemStatus, setSystemStatus] = useState<'normal' | 'alert' | 'emergency'>('normal');

  const sheddingTiers = [
    { tier: 1, load: 250, feeders: 45, customers: 12500, priority: 'Non-essential', status: 'armed', auto: true },
    { tier: 2, load: 450, feeders: 78, customers: 28400, priority: 'Commercial', status: 'armed', auto: true },
    { tier: 3, load: 680, feeders: 112, customers: 45200, priority: 'Residential B', status: 'armed', auto: false },
    { tier: 4, load: 890, feeders: 145, customers: 62800, priority: 'Residential A', status: 'standby', auto: false },
    { tier: 5, load: 1200, feeders: 189, customers: 89500, priority: 'Critical Support', status: 'standby', auto: false },
  ];

  const systemMetrics = {
    totalCapacity: 8500,
    currentLoad: 7650,
    reserve: 850,
    reservePercent: 10,
    frequencyTrigger: 59.5,
    currentFrequency: 60.01,
  };

  const recentEvents = [
    { time: '2024-11-15 14:23', action: 'Tier 1 Armed', reason: 'Reserve below 12%', auto: true },
    { time: '2024-11-14 18:45', action: 'Tier 2 Executed', reason: 'Frequency drop', load: 450, duration: '12 min' },
    { time: '2024-11-12 09:12', action: 'System Restored', reason: 'Reserve recovered', auto: true },
  ];

  const protectedLoads = [
    { name: 'Hospitals & Medical', load: 180, feeders: 12, status: 'protected' },
    { name: 'Emergency Services', load: 45, feeders: 8, status: 'protected' },
    { name: 'Water Treatment', load: 95, feeders: 6, status: 'protected' },
    { name: 'Communications', load: 65, feeders: 15, status: 'protected' },
  ];

  const loadPercentage = (systemMetrics.currentLoad / systemMetrics.totalCapacity) * 100;

  return (
    <Card className="glass-panel border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              systemStatus === 'emergency' ? 'bg-destructive/20' :
              systemStatus === 'alert' ? 'bg-energy-solar/20' :
              'bg-energy-renewable/20'
            }`}>
              <Power className={`h-5 w-5 ${
                systemStatus === 'emergency' ? 'text-destructive' :
                systemStatus === 'alert' ? 'text-energy-solar' :
                'text-energy-renewable'
              }`} />
            </div>
            <div>
              <CardTitle className="text-foreground">Load Shedding Manager</CardTitle>
              <p className="text-sm text-muted-foreground">Emergency load management & UFLS</p>
            </div>
          </div>
          <Badge className={
            systemStatus === 'emergency' ? 'bg-destructive/20 text-destructive' :
            systemStatus === 'alert' ? 'bg-energy-solar/20 text-energy-solar' :
            'bg-energy-renewable/20 text-energy-renewable'
          }>
            <Shield className="h-3 w-3 mr-1" />
            {systemStatus.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* System Status */}
        <div className="p-4 rounded-lg bg-gradient-to-br from-card/80 to-card/40 border border-border/50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-foreground">System Load Status</span>
            <span className="text-lg font-bold text-foreground">
              {systemMetrics.currentLoad.toLocaleString()} / {systemMetrics.totalCapacity.toLocaleString()} MW
            </span>
          </div>
          <Progress value={loadPercentage} className={`h-4 mb-2 ${loadPercentage > 90 ? '[&>div]:bg-destructive' : ''}`} />
          <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Reserve</div>
              <div className={`text-lg font-bold ${systemMetrics.reservePercent < 10 ? 'text-destructive' : 'text-energy-renewable'}`}>
                {systemMetrics.reserve} MW ({systemMetrics.reservePercent}%)
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Frequency</div>
              <div className="text-lg font-bold text-foreground">{systemMetrics.currentFrequency} Hz</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground">UFLS Trigger</div>
              <div className="text-lg font-bold text-energy-solar">{systemMetrics.frequencyTrigger} Hz</div>
            </div>
          </div>
        </div>

        {/* Shedding Tiers */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
            <Layers className="h-4 w-4 text-primary" />
            Load Shedding Tiers
          </h4>
          {sheddingTiers.map((tier, index) => (
            <div key={index} className={`p-3 rounded-lg border ${
              tier.status === 'armed' ? 'bg-energy-solar/5 border-energy-solar/30' :
              'bg-card/50 border-border/50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="font-mono">Tier {tier.tier}</Badge>
                  <span className="font-medium text-foreground">{tier.priority}</span>
                </div>
                <div className="flex items-center gap-2">
                  {tier.auto && <Badge variant="outline" className="text-xs">AUTO</Badge>}
                  <Badge className={
                    tier.status === 'armed' ? 'bg-energy-solar/20 text-energy-solar' :
                    'bg-muted text-muted-foreground'
                  }>
                    {tier.status}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Zap className="h-3 w-3 text-muted-foreground" />
                  <span className="text-foreground">{tier.load} MW</span>
                </div>
                <div className="text-muted-foreground">{tier.feeders} feeders</div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3 text-muted-foreground" />
                  <span className="text-foreground">{tier.customers.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Protected Loads */}
        <div className="p-4 rounded-lg bg-energy-renewable/5 border border-energy-renewable/20">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Shield className="h-4 w-4 text-energy-renewable" />
            Protected Critical Loads
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {protectedLoads.map((load, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded bg-card/30">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-energy-renewable" />
                  <span className="text-sm text-foreground">{load.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{load.load} MW</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Events */}
        <div className="p-4 rounded-lg bg-card/50 border border-border/50">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            Recent Events
          </h4>
          <div className="space-y-2">
            {recentEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded bg-card/30 text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground font-mono">{event.time}</span>
                  <span className="text-foreground">{event.action}</span>
                  {event.auto && <Badge variant="outline" className="text-xs">AUTO</Badge>}
                </div>
                <span className="text-muted-foreground">{event.reason}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1" variant="outline">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Manual Override
          </Button>
          <Button className="flex-1" variant="outline">
            <Shield className="h-4 w-4 mr-2" />
            Test Sequence
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadSheddingManager;
