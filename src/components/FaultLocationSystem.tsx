import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Crosshair, MapPin, Clock, Zap, AlertTriangle, CheckCircle, Radio, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useState, useEffect } from 'react';

const FaultLocationSystem = () => {
  const [activeFaults, setActiveFaults] = useState(3);

  const recentFaults = [
    {
      id: 'FLT-2024-847',
      type: 'Single Line-to-Ground',
      location: 'Line 230-A, Mile 45.2',
      distance: '45.2 mi',
      accuracy: '±0.3 mi',
      timestamp: '14:23:45',
      status: 'located',
      current: 12500,
      duration: '0.08s',
    },
    {
      id: 'FLT-2024-846',
      type: 'Three Phase',
      location: 'Line 115-C, Mile 23.8',
      distance: '23.8 mi',
      accuracy: '±0.2 mi',
      timestamp: '13:45:12',
      status: 'cleared',
      current: 28400,
      duration: '0.12s',
    },
    {
      id: 'FLT-2024-845',
      type: 'Line-to-Line',
      location: 'Line 69-D, Mile 12.1',
      distance: '12.1 mi',
      accuracy: '±0.4 mi',
      timestamp: '12:18:33',
      status: 'investigating',
      current: 8900,
      duration: '0.15s',
    },
  ];

  const faultWaveform = Array.from({ length: 50 }, (_, i) => ({
    time: i * 2,
    ia: i < 15 ? Math.sin(i * 0.5) * 100 : Math.sin(i * 0.5) * 100 + (Math.random() - 0.5) * 500,
    ib: i < 15 ? Math.sin(i * 0.5 + 2.09) * 100 : Math.sin(i * 0.5 + 2.09) * 100,
    ic: i < 15 ? Math.sin(i * 0.5 + 4.19) * 100 : Math.sin(i * 0.5 + 4.19) * 100,
  }));

  const faultStatistics = {
    totalToday: 12,
    avgLocationTime: '2.3s',
    accuracy: 98.7,
    mttr: '45 min',
  };

  const faultTypes = [
    { type: 'SLG (A-G)', count: 156, percentage: 62 },
    { type: 'Line-to-Line', count: 52, percentage: 21 },
    { type: 'Double L-G', count: 28, percentage: 11 },
    { type: 'Three Phase', count: 15, percentage: 6 },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'located':
        return <Badge className="bg-energy-renewable/20 text-energy-renewable">Located</Badge>;
      case 'cleared':
        return <Badge className="bg-primary/20 text-primary">Cleared</Badge>;
      case 'investigating':
        return <Badge className="bg-energy-solar/20 text-energy-solar">Investigating</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="glass-panel border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/20">
              <Crosshair className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <CardTitle className="text-foreground">Fault Location System</CardTitle>
              <p className="text-sm text-muted-foreground">Precise fault detection & analysis</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-energy-solar/20 text-energy-solar">
            <Radio className="h-3 w-3 mr-1 animate-pulse" />
            {activeFaults} Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-lg bg-card/50 border border-border/50 text-center">
            <div className="text-xl font-bold text-foreground">{faultStatistics.totalToday}</div>
            <div className="text-xs text-muted-foreground">Faults Today</div>
          </div>
          <div className="p-3 rounded-lg bg-card/50 border border-border/50 text-center">
            <div className="text-xl font-bold text-primary">{faultStatistics.avgLocationTime}</div>
            <div className="text-xs text-muted-foreground">Avg Location Time</div>
          </div>
          <div className="p-3 rounded-lg bg-card/50 border border-border/50 text-center">
            <div className="text-xl font-bold text-energy-renewable">{faultStatistics.accuracy}%</div>
            <div className="text-xs text-muted-foreground">Location Accuracy</div>
          </div>
          <div className="p-3 rounded-lg bg-card/50 border border-border/50 text-center">
            <div className="text-xl font-bold text-foreground">{faultStatistics.mttr}</div>
            <div className="text-xs text-muted-foreground">Avg MTTR</div>
          </div>
        </div>

        {/* Fault Waveform */}
        <div className="p-4 rounded-lg bg-card/50 border border-border/50">
          <h4 className="text-sm font-medium text-foreground mb-3">Latest Fault Waveform</h4>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={faultWaveform}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <ReferenceLine x={30} stroke="hsl(var(--destructive))" strokeDasharray="5 5" label="Fault" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Line type="monotone" dataKey="ia" stroke="hsl(var(--destructive))" strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="ib" stroke="hsl(var(--energy-solar))" strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="ic" stroke="hsl(var(--primary))" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2 text-xs">
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-destructive" />Phase A</span>
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-energy-solar" />Phase B</span>
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-primary" />Phase C</span>
          </div>
        </div>

        {/* Recent Faults */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Recent Fault Events</h4>
          {recentFaults.map((fault, index) => (
            <div key={index} className="p-4 rounded-lg bg-card/50 border border-border/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-primary">{fault.id}</span>
                  <Badge variant="outline">{fault.type}</Badge>
                </div>
                {getStatusBadge(fault.status)}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-foreground">{fault.distance}</span>
                  <span className="text-muted-foreground">({fault.accuracy})</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="h-3 w-3 text-destructive" />
                  <span className="text-foreground">{fault.current.toLocaleString()} A</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-foreground">{fault.duration}</span>
                </div>
                <div className="text-muted-foreground text-right">{fault.timestamp}</div>
              </div>
              <div className="text-xs text-muted-foreground mt-2">{fault.location}</div>
            </div>
          ))}
        </div>

        {/* Fault Type Distribution */}
        <div className="p-4 rounded-lg bg-card/50 border border-border/50">
          <h4 className="text-sm font-medium text-foreground mb-3">Fault Type Distribution (30 days)</h4>
          <div className="space-y-2">
            {faultTypes.map((type, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground">{type.type}</span>
                  <span className="text-muted-foreground">{type.count} ({type.percentage}%)</span>
                </div>
                <Progress value={type.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full" variant="outline">
          <Target className="h-4 w-4 mr-2" />
          View Fault Map
        </Button>
      </CardContent>
    </Card>
  );
};

export default FaultLocationSystem;
