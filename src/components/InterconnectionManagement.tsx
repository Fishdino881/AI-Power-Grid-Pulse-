import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link2, ArrowLeftRight, TrendingUp, TrendingDown, Globe, Zap, Clock, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useState, useEffect } from 'react';

const InterconnectionManagement = () => {
  const [netInterchange, setNetInterchange] = useState(245);

  useEffect(() => {
    const interval = setInterval(() => {
      setNetInterchange(prev => prev + (Math.random() - 0.5) * 20);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const interconnections = [
    {
      name: 'Eastern Interconnect',
      partner: 'Region B',
      capacity: 2500,
      currentFlow: 1850,
      direction: 'export',
      status: 'normal',
      schedule: 1800,
    },
    {
      name: 'Western Tie',
      partner: 'Region C',
      capacity: 1800,
      currentFlow: 950,
      direction: 'import',
      status: 'normal',
      schedule: 1000,
    },
    {
      name: 'Northern Link',
      partner: 'Region D',
      capacity: 1200,
      currentFlow: 1150,
      direction: 'export',
      status: 'congested',
      schedule: 1100,
    },
    {
      name: 'Southern Path',
      partner: 'Region E',
      capacity: 800,
      currentFlow: 0,
      direction: 'none',
      status: 'maintenance',
      schedule: 0,
    },
  ];

  const interchangeHistory = [
    { time: '08:00', scheduled: 200, actual: 215 },
    { time: '10:00', scheduled: 350, actual: 380 },
    { time: '12:00', scheduled: 500, actual: 485 },
    { time: '14:00', scheduled: 400, actual: 425 },
    { time: '16:00', scheduled: 250, actual: 245 },
    { time: '18:00', scheduled: 150, actual: 160 },
  ];

  const scheduleQueue = [
    { time: '15:00', type: 'Export', amount: 500, partner: 'Region B', status: 'confirmed' },
    { time: '16:00', type: 'Import', amount: 300, partner: 'Region C', status: 'pending' },
    { time: '17:00', type: 'Export', amount: 200, partner: 'Region D', status: 'confirmed' },
  ];

  const inadvertentEnergy = {
    current: -45.2,
    monthToDate: 128.5,
    target: 0,
    trend: 'improving',
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'normal':
        return <Badge className="bg-energy-renewable/20 text-energy-renewable">Normal</Badge>;
      case 'congested':
        return <Badge className="bg-energy-solar/20 text-energy-solar">Congested</Badge>;
      case 'maintenance':
        return <Badge className="bg-muted text-muted-foreground">Maintenance</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="glass-panel border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Link2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-foreground">Interconnection Management</CardTitle>
              <p className="text-sm text-muted-foreground">Tie line flows & interchange scheduling</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Net Interchange</div>
            <div className={`text-xl font-bold ${netInterchange >= 0 ? 'text-energy-renewable' : 'text-destructive'}`}>
              {netInterchange >= 0 ? '+' : ''}{netInterchange.toFixed(0)} MW
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Interconnection Lines */}
        <div className="space-y-3">
          {interconnections.map((ic, index) => (
            <div key={index} className={`p-4 rounded-lg border ${
              ic.status === 'congested' ? 'bg-energy-solar/5 border-energy-solar/30' :
              ic.status === 'maintenance' ? 'bg-muted/20 border-border/50' :
              'bg-card/50 border-border/50'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-primary" />
                  <div>
                    <span className="font-medium text-foreground">{ic.name}</span>
                    <span className="text-sm text-muted-foreground ml-2">↔ {ic.partner}</span>
                  </div>
                </div>
                {getStatusBadge(ic.status)}
              </div>
              <div className="mb-2">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Flow</span>
                  <div className="flex items-center gap-2">
                    {ic.direction === 'export' && <TrendingUp className="h-3 w-3 text-energy-renewable" />}
                    {ic.direction === 'import' && <TrendingDown className="h-3 w-3 text-primary" />}
                    <span className="text-foreground">{ic.currentFlow} / {ic.capacity} MW</span>
                  </div>
                </div>
                <Progress value={(ic.currentFlow / ic.capacity) * 100} className="h-2" />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  Direction: <span className={
                    ic.direction === 'export' ? 'text-energy-renewable' :
                    ic.direction === 'import' ? 'text-primary' :
                    'text-muted-foreground'
                  }>{ic.direction.toUpperCase()}</span>
                </span>
                <span className="text-muted-foreground">
                  Schedule: {ic.schedule} MW
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Interchange Chart */}
        <div className="p-4 rounded-lg bg-card/50 border border-border/50">
          <h4 className="text-sm font-medium text-foreground mb-3">Scheduled vs Actual Interchange</h4>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={interchangeHistory}>
                <defs>
                  <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Area type="monotone" dataKey="scheduled" stroke="hsl(var(--muted-foreground))" fill="none" strokeDasharray="5 5" />
                <Area type="monotone" dataKey="actual" stroke="hsl(var(--primary))" fill="url(#actualGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Schedule Queue */}
          <div className="p-4 rounded-lg bg-card/50 border border-border/50">
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Schedule Queue
            </h4>
            <div className="space-y-2">
              {scheduleQueue.map((schedule, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded bg-card/30 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{schedule.time}</span>
                    <Badge variant="outline" className={
                      schedule.type === 'Export' ? 'text-energy-renewable' : 'text-primary'
                    }>
                      {schedule.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-foreground">{schedule.amount} MW</span>
                    <span className={`text-xs ${
                      schedule.status === 'confirmed' ? 'text-energy-renewable' : 'text-energy-solar'
                    }`}>
                      {schedule.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inadvertent Energy */}
          <div className="p-4 rounded-lg bg-card/50 border border-border/50">
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <ArrowLeftRight className="h-4 w-4 text-primary" />
              Inadvertent Energy
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Current Hour</span>
                <span className={`font-medium ${inadvertentEnergy.current < 0 ? 'text-destructive' : 'text-energy-renewable'}`}>
                  {inadvertentEnergy.current} MWh
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Month to Date</span>
                <span className="font-medium text-energy-renewable">+{inadvertentEnergy.monthToDate} MWh</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Trend</span>
                <Badge className="bg-energy-renewable/20 text-energy-renewable">
                  {inadvertentEnergy.trend}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <Button className="w-full" variant="outline">
          <Zap className="h-4 w-4 mr-2" />
          Schedule New Transaction
        </Button>
      </CardContent>
    </Card>
  );
};

export default InterconnectionManagement;
