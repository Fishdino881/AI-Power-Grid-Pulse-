import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Clock, Users, MapPin, Zap, CheckCircle, Radio, Wrench } from 'lucide-react';
import { useState, useEffect } from 'react';

const OutageManagementSystem = () => {
  const [activeOutages, setActiveOutages] = useState(7);

  const outageEvents = [
    {
      id: 'OUT-2024-1847',
      type: 'Unplanned',
      cause: 'Equipment Failure',
      location: 'North District - Sector 4B',
      customersAffected: 12450,
      startTime: '14:23',
      estimatedRestore: '17:30',
      status: 'crew-dispatched',
      progress: 45,
      priority: 'critical',
    },
    {
      id: 'OUT-2024-1846',
      type: 'Unplanned',
      cause: 'Weather - Lightning Strike',
      location: 'East Grid - Substation E7',
      customersAffected: 8230,
      startTime: '13:45',
      estimatedRestore: '16:00',
      status: 'crew-onsite',
      progress: 70,
      priority: 'high',
    },
    {
      id: 'OUT-2024-1845',
      type: 'Planned',
      cause: 'Scheduled Maintenance',
      location: 'Industrial Zone - Line 12',
      customersAffected: 340,
      startTime: '09:00',
      estimatedRestore: '15:00',
      status: 'in-progress',
      progress: 85,
      priority: 'low',
    },
    {
      id: 'OUT-2024-1844',
      type: 'Unplanned',
      cause: 'Vehicle Accident',
      location: 'Highway 7 - Pole 2847',
      customersAffected: 2100,
      startTime: '12:15',
      estimatedRestore: '14:45',
      status: 'crew-onsite',
      progress: 90,
      priority: 'medium',
    },
  ];

  const systemStats = {
    totalCustomers: 2340000,
    customersAffected: 23120,
    averageRestoreTime: '2h 15m',
    crewsDeployed: 24,
    plannedOutages: 3,
    unplannedOutages: 4,
  };

  const recentRestores = [
    { id: 'OUT-2024-1843', customers: 5600, duration: '1h 45m', cause: 'Tree Contact' },
    { id: 'OUT-2024-1842', customers: 890, duration: '45m', cause: 'Fuse Blown' },
    { id: 'OUT-2024-1841', customers: 3200, duration: '2h 10m', cause: 'Transformer Issue' },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; className: string }> = {
      'crew-dispatched': { label: 'Crew Dispatched', className: 'bg-energy-solar/20 text-energy-solar' },
      'crew-onsite': { label: 'Crew On Site', className: 'bg-primary/20 text-primary' },
      'in-progress': { label: 'In Progress', className: 'bg-energy-renewable/20 text-energy-renewable' },
      'assessing': { label: 'Assessing', className: 'bg-muted text-muted-foreground' },
    };
    const config = statusConfig[status] || statusConfig['assessing'];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-destructive border-destructive/50 bg-destructive/10';
      case 'high': return 'text-energy-solar border-energy-solar/50 bg-energy-solar/10';
      case 'medium': return 'text-primary border-primary/50 bg-primary/10';
      default: return 'text-muted-foreground border-border bg-muted/10';
    }
  };

  return (
    <Card className="glass-panel border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/20">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <CardTitle className="text-foreground">Outage Management System</CardTitle>
              <p className="text-sm text-muted-foreground">Real-time outage tracking & restoration</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-destructive/20 text-destructive border-destructive/30">
            <Radio className="h-3 w-3 mr-1 animate-pulse" />
            {activeOutages} Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* System Overview */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          <div className="p-3 rounded-lg bg-card/50 border border-border/50 text-center">
            <Users className="h-4 w-4 mx-auto mb-1 text-primary" />
            <div className="text-lg font-bold text-foreground">{(systemStats.customersAffected / 1000).toFixed(1)}K</div>
            <div className="text-xs text-muted-foreground">Affected</div>
          </div>
          <div className="p-3 rounded-lg bg-card/50 border border-border/50 text-center">
            <Clock className="h-4 w-4 mx-auto mb-1 text-energy-solar" />
            <div className="text-lg font-bold text-foreground">{systemStats.averageRestoreTime}</div>
            <div className="text-xs text-muted-foreground">Avg Restore</div>
          </div>
          <div className="p-3 rounded-lg bg-card/50 border border-border/50 text-center">
            <Wrench className="h-4 w-4 mx-auto mb-1 text-energy-renewable" />
            <div className="text-lg font-bold text-foreground">{systemStats.crewsDeployed}</div>
            <div className="text-xs text-muted-foreground">Crews Out</div>
          </div>
          <div className="p-3 rounded-lg bg-card/50 border border-border/50 text-center">
            <AlertTriangle className="h-4 w-4 mx-auto mb-1 text-destructive" />
            <div className="text-lg font-bold text-foreground">{systemStats.unplannedOutages}</div>
            <div className="text-xs text-muted-foreground">Unplanned</div>
          </div>
          <div className="p-3 rounded-lg bg-card/50 border border-border/50 text-center">
            <Zap className="h-4 w-4 mx-auto mb-1 text-primary" />
            <div className="text-lg font-bold text-foreground">{systemStats.plannedOutages}</div>
            <div className="text-xs text-muted-foreground">Planned</div>
          </div>
          <div className="p-3 rounded-lg bg-card/50 border border-border/50 text-center">
            <CheckCircle className="h-4 w-4 mx-auto mb-1 text-energy-renewable" />
            <div className="text-lg font-bold text-foreground">99.01%</div>
            <div className="text-xs text-muted-foreground">Reliability</div>
          </div>
        </div>

        {/* Active Outages */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Active Outage Events</h4>
          {outageEvents.map((outage) => (
            <div key={outage.id} className={`p-4 rounded-lg border ${getPriorityColor(outage.priority)}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={outage.type === 'Unplanned' ? 'text-destructive' : 'text-primary'}>
                    {outage.type}
                  </Badge>
                  <span className="font-mono text-sm text-foreground">{outage.id}</span>
                </div>
                {getStatusBadge(outage.status)}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Cause: </span>
                  <span className="text-foreground">{outage.cause}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-foreground truncate">{outage.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3 text-muted-foreground" />
                  <span className="text-foreground">{outage.customersAffected.toLocaleString()} customers</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-foreground">ETA: {outage.estimatedRestore}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Progress value={outage.progress} className="flex-1 h-2" />
                <span className="text-sm text-foreground font-medium">{outage.progress}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Restorations */}
        <div className="p-4 rounded-lg bg-card/50 border border-border/50">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-energy-renewable" />
            Recently Restored
          </h4>
          <div className="space-y-2">
            {recentRestores.map((restore, index) => (
              <div key={index} className="flex items-center justify-between text-sm p-2 rounded bg-energy-renewable/5">
                <span className="font-mono text-muted-foreground">{restore.id}</span>
                <span className="text-foreground">{restore.customers.toLocaleString()} customers</span>
                <span className="text-muted-foreground">{restore.cause}</span>
                <span className="text-energy-renewable">{restore.duration}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1" variant="outline">
            <MapPin className="h-4 w-4 mr-2" />
            View Outage Map
          </Button>
          <Button className="flex-1" variant="outline">
            <Radio className="h-4 w-4 mr-2" />
            Dispatch Center
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OutageManagementSystem;
