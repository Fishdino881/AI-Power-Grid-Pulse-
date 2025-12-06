import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, TrendingUp, TrendingDown, Gauge, Zap, AlertTriangle, Radio } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts';
import { useState, useEffect } from 'react';

const FrequencyRegulationMonitor = () => {
  const [currentFrequency, setCurrentFrequency] = useState(60.00);
  const [frequencyHistory, setFrequencyHistory] = useState<Array<{ time: string; frequency: number }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newFreq = 60 + (Math.random() - 0.5) * 0.08;
      setCurrentFrequency(newFreq);
      
      setFrequencyHistory(prev => {
        const newHistory = [...prev, {
          time: new Date().toLocaleTimeString(),
          frequency: newFreq,
        }];
        return newHistory.slice(-30);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const regulationResources = [
    { name: 'Battery Storage A', capacity: 150, deployed: 45, type: 'fast', status: 'active' },
    { name: 'Gas Peaker Unit 3', capacity: 200, deployed: 0, type: 'spinning', status: 'standby' },
    { name: 'Hydro Unit 7', capacity: 300, deployed: 120, type: 'spinning', status: 'active' },
    { name: 'Battery Storage B', capacity: 100, deployed: 30, type: 'fast', status: 'active' },
    { name: 'Demand Response Pool', capacity: 500, deployed: 0, type: 'demand', status: 'available' },
  ];

  const aceData = [
    { time: '14:00', ace: 15 },
    { time: '14:05', ace: -8 },
    { time: '14:10', ace: 22 },
    { time: '14:15', ace: -12 },
    { time: '14:20', ace: 5 },
    { time: '14:25', ace: -18 },
    { time: '14:30', ace: 10 },
    { time: '14:35', ace: -5 },
    { time: '14:40', ace: 8 },
    { time: '14:45', ace: -2 },
  ];

  const controlPerformance = {
    cps1: 185.4,
    cps2: 98.2,
    baal: { low: 59.95, high: 60.05, current: currentFrequency },
  };

  const getFrequencyStatus = (freq: number) => {
    if (freq >= 59.97 && freq <= 60.03) return { status: 'Normal', color: 'text-energy-renewable', bg: 'bg-energy-renewable/20' };
    if (freq >= 59.95 && freq <= 60.05) return { status: 'Caution', color: 'text-energy-solar', bg: 'bg-energy-solar/20' };
    return { status: 'Alert', color: 'text-destructive', bg: 'bg-destructive/20' };
  };

  const freqStatus = getFrequencyStatus(currentFrequency);

  return (
    <Card className="glass-panel border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-foreground">Frequency Regulation Monitor</CardTitle>
              <p className="text-sm text-muted-foreground">Real-time grid frequency & AGC status</p>
            </div>
          </div>
          <Badge className={`${freqStatus.bg} ${freqStatus.color}`}>
            <Radio className="h-3 w-3 mr-1 animate-pulse" />
            {freqStatus.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Frequency Display */}
        <div className="p-6 rounded-lg bg-gradient-to-br from-card/80 to-card/40 border border-border/50 text-center">
          <div className="text-xs text-muted-foreground mb-2">System Frequency</div>
          <div className={`text-5xl font-bold font-mono ${freqStatus.color}`}>
            {currentFrequency.toFixed(3)}
            <span className="text-2xl ml-1">Hz</span>
          </div>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Target</div>
              <div className="text-lg font-medium text-foreground">60.000 Hz</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Deviation</div>
              <div className={`text-lg font-medium ${currentFrequency >= 60 ? 'text-energy-renewable' : 'text-destructive'}`}>
                {currentFrequency >= 60 ? '+' : ''}{((currentFrequency - 60) * 1000).toFixed(1)} mHz
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Trend</div>
              <div className="text-lg font-medium text-foreground flex items-center justify-center">
                {currentFrequency >= 60 ? (
                  <TrendingUp className="h-5 w-5 text-energy-renewable" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-destructive" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Frequency Chart */}
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={frequencyHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={9} hide />
              <YAxis 
                domain={[59.9, 60.1]} 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={10}
                tickFormatter={(v) => v.toFixed(2)}
              />
              <ReferenceLine y={60} stroke="hsl(var(--primary))" strokeDasharray="5 5" />
              <ReferenceLine y={60.05} stroke="hsl(var(--destructive))" strokeDasharray="3 3" opacity={0.5} />
              <ReferenceLine y={59.95} stroke="hsl(var(--destructive))" strokeDasharray="3 3" opacity={0.5} />
              <Line 
                type="monotone" 
                dataKey="frequency" 
                stroke="hsl(var(--energy-renewable))" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Control Performance */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 rounded-lg bg-card/50 border border-border/50 text-center">
            <div className="text-xs text-muted-foreground mb-1">CPS1 Score</div>
            <div className="text-xl font-bold text-energy-renewable">{controlPerformance.cps1}%</div>
            <div className="text-xs text-muted-foreground">Target: 100%</div>
          </div>
          <div className="p-3 rounded-lg bg-card/50 border border-border/50 text-center">
            <div className="text-xs text-muted-foreground mb-1">CPS2 Score</div>
            <div className="text-xl font-bold text-energy-renewable">{controlPerformance.cps2}%</div>
            <div className="text-xs text-muted-foreground">Target: 90%</div>
          </div>
          <div className="p-3 rounded-lg bg-card/50 border border-border/50 text-center">
            <div className="text-xs text-muted-foreground mb-1">BAAL Status</div>
            <div className="text-xl font-bold text-energy-renewable">OK</div>
            <div className="text-xs text-muted-foreground">{controlPerformance.baal.low}-{controlPerformance.baal.high}</div>
          </div>
        </div>

        {/* ACE Chart */}
        <div className="p-4 rounded-lg bg-card/50 border border-border/50">
          <h4 className="text-sm font-medium text-foreground mb-3">Area Control Error (ACE)</h4>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={aceData}>
                <defs>
                  <linearGradient id="acePositive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--energy-renewable))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--energy-renewable))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={9} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <ReferenceLine y={0} stroke="hsl(var(--muted-foreground))" />
                <Area 
                  type="monotone" 
                  dataKey="ace" 
                  stroke="hsl(var(--primary))" 
                  fill="url(#acePositive)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regulation Resources */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Regulation Resources</h4>
          {regulationResources.map((resource, index) => (
            <div key={index} className="p-3 rounded-lg bg-card/50 border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Zap className={`h-4 w-4 ${resource.status === 'active' ? 'text-energy-renewable' : 'text-muted-foreground'}`} />
                  <span className="font-medium text-foreground">{resource.name}</span>
                </div>
                <Badge variant="outline" className={
                  resource.status === 'active' ? 'bg-energy-renewable/20 text-energy-renewable' :
                  resource.status === 'standby' ? 'bg-energy-solar/20 text-energy-solar' :
                  'bg-muted text-muted-foreground'
                }>
                  {resource.status}
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <Progress value={(resource.deployed / resource.capacity) * 100} className="flex-1 h-2" />
                <span className="text-xs text-muted-foreground w-24 text-right">
                  {resource.deployed}/{resource.capacity} MW
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FrequencyRegulationMonitor;
